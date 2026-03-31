import DungeonTimeTracker from "./components/DungeonTimeTracker/DungeonTimeTracker";
import ActionTray from "./components/ActionTray";
import Players from "./components/Players";
import "./App.css";

function App() {
  return (
    <div className="App">
      <Players />
      <ActionTray>
        <DungeonTimeTracker />
      </ActionTray>
    </div>
  );
}

export default App;
