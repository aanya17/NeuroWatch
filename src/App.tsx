import { BrowserRouter, Routes, Route } from "react-router-dom";
import Signup from "./app/pages/Signup";
import Dashboard from "./app/pages/Dashboard";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Signup />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </BrowserRouter>
  );
}
