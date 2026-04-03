import { useEffect, useId, type ReactNode } from "react";

type ModalRenderControls = {
  close: () => void;
};

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  header?: ReactNode | ((controls: ModalRenderControls) => ReactNode);
  title?: ReactNode;
  children: ReactNode | ((controls: ModalRenderControls) => ReactNode);
};

const openModalStack: string[] = [];

function addToStack(modalId: string) {
  if (!openModalStack.includes(modalId)) {
    openModalStack.push(modalId);
  }
}

function removeFromStack(modalId: string) {
  const idx = openModalStack.lastIndexOf(modalId);
  if (idx !== -1) {
    openModalStack.splice(idx, 1);
  }
}

function getTopModalId(): string | undefined {
  return openModalStack[openModalStack.length - 1];
}

function Modal({ isOpen, onClose, header, title, children }: ModalProps) {
  const modalId = useId();

  useEffect(() => {
    if (!isOpen) {
      removeFromStack(modalId);
      return;
    }

    addToStack(modalId);

    return () => {
      removeFromStack(modalId);
    };
  }, [isOpen, modalId]);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== "Escape") {
        return;
      }

      if (getTopModalId() !== modalId) {
        return;
      }

      event.preventDefault();
      onClose();
    };

    window.addEventListener("keydown", onKeyDown);

    return () => {
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [isOpen, modalId, onClose]);

  if (!isOpen) {
    return null;
  }

  const resolvedHeader =
    typeof header === "function" ? header({ close: onClose }) : header;

  return (
    <div className="overlay">
      <div aria-modal="true" className="modal" role="dialog">
        <div className="modal-header">
          {resolvedHeader ?? (
            <>
              <div>{title}</div>
              <button
                aria-label="Close modal"
                onClick={onClose}
                style={{
                  border: "none",
                  background: "transparent",
                  cursor: "pointer",
                  fontSize: "1rem",
                  lineHeight: 1,
                }}
                type="button"
              >
                X
              </button>
            </>
          )}
        </div>
        <div className="modal-content">
          {typeof children === "function"
            ? children({ close: onClose })
            : children}
        </div>
      </div>
    </div>
  );
}

export default Modal;
