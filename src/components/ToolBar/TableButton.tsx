import { useMemo, useState } from "react";
import { CircleButton } from "../CircleButton";
import Icon from "../Icon";
import Menu from "../Menu";
import Modal from "../Modal";
import PopOver from "../Popover";
import RollTable from "../RollTable";
import { useTables } from "../../context/TablesContext";
import TableForm from "./TableForm";

type ActiveModalState =
  | { type: "none" }
  | { type: "create" }
  | { type: "table"; tableId: number };

function TablePopoverTrigger() {
  const triggerProps = PopOver.useTrigger();
  const { isOpen } = PopOver.useControls();

  return (
    <CircleButton
      aria-expanded={isOpen}
      aria-label="Table Manager"
      title="Table Manager"
      type="button"
      {...triggerProps}
    >
      <Icon name="table" />
    </CircleButton>
  );
}

function TableMenu({
  onNewTable,
  onOpenTable,
}: {
  onNewTable: () => void;
  onOpenTable: (tableId: number) => void;
}) {
  const { close } = PopOver.useControls();
  const { getTables } = useTables();
  const tables = getTables();

  return (
    <Menu onAction={close}>
      <Menu.Item onClick={onNewTable}>New Table</Menu.Item>
      {tables.length === 0 ? (
        <Menu.Item isDisabled onClick={() => {}}>
          No Tables Yet
        </Menu.Item>
      ) : (
        tables.map((table) => (
          <Menu.Item key={table.id} onClick={() => onOpenTable(table.id)}>
            {table.name}
          </Menu.Item>
        ))
      )}
    </Menu>
  );
}

export default function TableButton() {
  const { deleteTable, getTableById } = useTables();
  const [activeModal, setActiveModal] = useState<ActiveModalState>({
    type: "none",
  });

  const selectedTable = useMemo(() => {
    if (activeModal.type !== "table") {
      return undefined;
    }

    return getTableById(activeModal.tableId);
  }, [activeModal, getTableById]);

  const closeModal = () => {
    setActiveModal({ type: "none" });
  };

  const openNewTableModal = () => {
    setActiveModal({ type: "create" });
  };

  const openTableModal = (tableId: number) => {
    setActiveModal({ type: "table", tableId });
  };

  const modalTitle =
    activeModal.type === "create"
      ? "New Table"
      : (selectedTable?.name ?? "Table");

  return (
    <>
      <div className="table-button-popover">
        <PopOver placement="below">
          <TablePopoverTrigger />
          <PopOver.Body>
            <TableMenu
              onNewTable={openNewTableModal}
              onOpenTable={openTableModal}
            />
          </PopOver.Body>
        </PopOver>
      </div>

      <Modal
        isOpen={activeModal.type !== "none"}
        onClose={closeModal}
        title={modalTitle}
      >
        {activeModal.type === "create" ? (
          <TableForm onClose={closeModal} />
        ) : (
          <>
            {selectedTable ? (
              <RollTable
                onDelete={() => {
                  deleteTable(selectedTable.id);
                  closeModal();
                }}
                table={selectedTable}
              />
            ) : null}
          </>
        )}
      </Modal>
    </>
  );
}
