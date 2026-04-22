import * as Tray from "./components/ActionTray";
import Characters from "./components/Characters/Characters.tsx";
import DungeonTimeTracker from "./components/DungeonTimeTracker/DungeonTimeTracker";
import WelcomeSeedModal from "./components/WelcomeSeedModal";
import { CharactersProvider } from "./context/CharactersContext";
import { TablesProvider } from "./context/TablesContext";
import ToolBar from "./components/ToolBar/ToolBar";

function App() {
  return (
    <TablesProvider>
      <CharactersProvider>
        <WelcomeSeedModal />
        <Tray.Characters>
          <Characters />
        </Tray.Characters>
        <ToolBar />
        <Tray.Actions>
          <DungeonTimeTracker />
        </Tray.Actions>
      </CharactersProvider>
    </TablesProvider>
  );
}

export default App;
