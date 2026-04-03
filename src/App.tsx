import ActionTray, { CharacterTray, ToolTray } from "./components/ActionTray";
import Characters from "./components/Characters/Characters.tsx";
import { GithubLink } from "./components/CircleButton";
import DungeonTimeTracker from "./components/DungeonTimeTracker/DungeonTimeTracker";
import { CharactersProvider } from "./context/CharactersContext";
import packageJson from "../package.json";

function App() {
  return (
    <CharactersProvider>
      <CharacterTray>
        <Characters />
      </CharacterTray>
      <ToolTray>
        <span style={{ fontSize: "0.625rem", textAlign: "center" }}>
          {packageJson.version}
        </span>
        <GithubLink />
      </ToolTray>
      <ActionTray>
        <DungeonTimeTracker />
      </ActionTray>
    </CharactersProvider>
  );
}

export default App;
