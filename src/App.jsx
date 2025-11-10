import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Signup from "./components/Signup";
import PasswordChecker from "./components/PasswordChecker";
import PasswordGenerator from "./components/PasswordGenerator";
import BreachChecker from "./components/BreachChecker";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/check" element={<PasswordChecker />} />
      <Route path="/generate" element={<PasswordGenerator />} />
      <Route path="/breach" element={<BreachChecker />} />
    </Routes>
  );
}

export default App;
