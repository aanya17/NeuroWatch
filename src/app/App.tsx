import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import Gait from "./pages/Gait";
import VoiceAnalysis from "./pages/VoiceAnalysis";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/gait" element={<Gait />} />
        <Route path="/voice" element={<VoiceAnalysis />} />
      </Routes>
    </Router>
  );
}

export default App;
