import "./App.css";
import { CircleButton } from "./components/CircleButton";
import Card from "./components/Card";

function App() {
  return (
    <div className="App">
      <CircleButton title="Click me" />
      <Card>
        <Card.Header>
          Dell Graybeard <Card.Sub>(Jeff)</Card.Sub>
        </Card.Header>
        <Card.Meter />
      </Card>
    </div>
  );
}

export default App;
