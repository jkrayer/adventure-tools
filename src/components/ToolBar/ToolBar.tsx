import TableButton from "./TableButton";
import { GithubLink } from "../CircleButton";
import { Tools } from "../ActionTray";
import packageJson from "../../../package.json";

export default function ToolBar() {
  return (
    <Tools>
      <span style={{ fontSize: "0.625rem", textAlign: "center" }}>
        {packageJson.version}
      </span>
      <GithubLink />
      <TableButton />
    </Tools>
  );
}
