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
