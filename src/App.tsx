import * as Tray from "./components/ActionTray";
import Characters from "./components/Characters/Characters.tsx";
import LocalhostCharacterSeed from "./components/Characters/LocalhostCharacterSeed";
import { GithubLink } from "./components/CircleButton";
import DungeonTimeTracker from "./components/DungeonTimeTracker/DungeonTimeTracker";
import { CharactersProvider } from "./context/CharactersContext";
import packageJson from "../package.json";

function App() {
  return (
    <CharactersProvider>
      <LocalhostCharacterSeed />
      <Tray.Characters>
        <Characters />
      </Tray.Characters>
      <Tray.Tools>
        <span style={{ fontSize: "0.625rem", textAlign: "center" }}>
          {packageJson.version}
        </span>
        <GithubLink />
      </Tray.Tools>
      <Tray.Actions>
        <DungeonTimeTracker />
      </Tray.Actions>
    </CharactersProvider>
  );
}

export default App;
