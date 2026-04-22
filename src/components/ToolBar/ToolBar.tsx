import TableButton from "./TableButton";
import { Tools } from "../ActionTray";
import { GithubLink } from "../CircleButton";
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
