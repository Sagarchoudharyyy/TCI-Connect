import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./components/pages/Login";
import Register from "./components/pages/Register";
import Dashboard from "./components/pages/Dashboard";
import Chat from "./components/pages/Chat";
import ProtectedRoute from "./components/ProtectRoute";
import Sidebar from "./components/Sidebar";
import OrdersTable from "./components/OrdersTable";
import RecentCases from "./components/pages/RecentCases";
import AllDoctor from "./components/pages/AllDoctors";
import AllDoctors from "./components/pages/AllDoctors";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Register />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/chat" element={<Chat />} />
        <Route path="/recent-case" element={<RecentCases />} />
        <Route path="/all-doctors" element={<ProtectedRoute>
          <AllDoctors />
        </ProtectedRoute>} />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter >
  );
}

export default App;