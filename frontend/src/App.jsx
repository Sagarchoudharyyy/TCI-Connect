import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./components/pages/Login";
import Dashboard from "./components/pages/Dashboard";
import Register from "./components/pages/Register";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        <Route
          path="/"
          element={<Login />}
        />

        <Route
          path="/login"
          element={<Login />}
        />

        <Route
          path="/register"
          element={<Register />}
        />

        <Route
          path="/dashboard"
          element={<Dashboard />}
        />

      </Routes>
    </BrowserRouter>
  );
}

export default App;