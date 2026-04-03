import PopOver from "../../Popover";

export default function CharacterOptionsTrigger() {
  const triggerProps = PopOver.useTrigger();
  const { isOpen } = PopOver.useControls();

  return (
    <button
      aria-expanded={isOpen}
      aria-label="Character options"
      className={`btn btn-overlay ${isOpen ? "open" : ""}`}
      type="button"
      {...triggerProps}
    >
      <span className="btn-overly-menu-line top" />
      <span className="btn-overly-menu-line middle" />
      <span className="btn-overly-menu-line bottom" />
    </button>
  );
}
