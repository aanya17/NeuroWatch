import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { Login } from "./app/pages/Login";
import { Signup } from "./app/pages/Signup";
import { Dashboard } from "./app/pages/Dashboard";
import { Gait } from "./app/pages/Gait";
import { VoiceAnalysis } from "./app/pages/Voice";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/gait" element={<Gait />} />
        <Route path="/voice" element={<VoiceAnalysis />} />
      </Routes>
    </Router>
  );
}

export default App;
