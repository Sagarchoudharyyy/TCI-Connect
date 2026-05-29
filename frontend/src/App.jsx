import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./components/pages/Login";
import Register from "./components/pages/Register";
import Dashboard from "./components/pages/Dashboard";
import Chat from "./components/pages/Chat";
import ProtectedRoute from "./components/ProtectRoute";
import Sidebar from "./components/Sidebar";
import OrdersTable from "./components/OrdersTable";
import RecentCases from "./components/pages/RecentCases";
import AllDoctors from "./components/pages/AllDoctors";
import ChatWindow from "./components/pages/ChatWindow";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Register />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/register" element={<Register />} />
<<<<<<< HEAD
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
=======
        <Route path="/recent-case" element={<ProtectedRoute><RecentCases /></ProtectedRoute>} />
        <Route path="/all-doctors" element={<ProtectedRoute><AllDoctors /></ProtectedRoute>} />
        <Route path="/chats" element={<ProtectedRoute><Chat /></ProtectedRoute>} />
        <Route path="/chat/:id" element={<ChatWindow />} />
        <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
>>>>>>> fb516ac07a9fac60e0f410552ca1b88d63df56bd
      </Routes>
    </BrowserRouter >
  );
}


export default App;