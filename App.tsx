import { useState } from "react";
import { ModeProvider } from "./contexts/ModeContext";
import { ModeSelection } from "./components/ModeSelection";
import { Dashboard } from "./components/Dashboard";

function App() {
  const [screen, setScreen] = useState<"modes" | "dashboard">("modes");

  return (
    <ModeProvider>
      {screen === "modes" && (
        <ModeSelection onContinue={() => setScreen("dashboard")} />
      )}

      {screen === "dashboard" && (
        <Dashboard onReset={() => setScreen("modes")} />
      )}
    </ModeProvider>
  );
}

export default App;
