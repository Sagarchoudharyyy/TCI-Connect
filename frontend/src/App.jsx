import { BrowserRouter, Routes, Route } from "react-router-dom";
<<<<<<< HEAD

=======
>>>>>>> 75c79750a65a0f2f9a3a0f26de93aeb20fbf6d8e
import Login from "./components/pages/Login";
import Register from "./components/pages/Register";
import Dashboard from "./components/pages/Dashboard";
import Register from "./components/pages/Register";

function App() {
  return (
    <BrowserRouter>
      <Routes>
<<<<<<< HEAD

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

=======
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
>>>>>>> 75c79750a65a0f2f9a3a0f26de93aeb20fbf6d8e
      </Routes>
    </BrowserRouter>
  );
}

export default App;