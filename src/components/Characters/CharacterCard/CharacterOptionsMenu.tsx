import Menu from "../../Menu";
import PopOver from "../../Popover";

type CharacterOptionsMenuProps = {
  link: string;
  onDelete: () => void;
  onEdit: () => void;
};

export default function CharacterOptionsMenu({
  link,
  onDelete,
  onEdit,
}: CharacterOptionsMenuProps) {
  const { close } = PopOver.useControls();

  return (
    <Menu onAction={close}>
      <Menu.Item as="a" href={link} rel="noopener noreferrer" target="_blank">
        Open Rules
      </Menu.Item>
      <Menu.Item onClick={onEdit}>Edit Character</Menu.Item>
      <Menu.Item intent="danger" onAction={onDelete}>
        Remove Character
      </Menu.Item>
    </Menu>
  );
}
