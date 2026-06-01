import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";

import Login from "./components/pages/Login";
import Register from "./components/pages/Register";
import Dashboard from "./components/pages/Dashboard";
import Chat from "./components/pages/Chat";
import ChatWindow from "./components/pages/ChatWindow";
import RecentCases from "./components/pages/RecentCases";
import AllDoctors from "./components/pages/AllDoctors";
import ProtectedRoute from "./components/ProtectRoute";
import Pricing from "./components/pages/Pricing";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* Public Routes */}
        <Route
          path="/"
          element={<Register />}
        />

        <Route
          path="/login"
          element={<Login />}
        />

        <Route
          path="/register"
          element={<Register />}
        />
        <Route path="/pricing" element={<Pricing />} />

        {/* Protected Routes */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/recent-case"
          element={
            <ProtectedRoute>
              <RecentCases />
            </ProtectedRoute>
          }
        />

        <Route
          path="/all-doctors"
          element={
            <ProtectedRoute>
              <AllDoctors />
            </ProtectedRoute>
          }
        />

        <Route
          path="/chats"
          element={
            <ProtectedRoute>
              <Chat />
            </ProtectedRoute>
          }
        />

        <Route
          path="/chat/:id"
          element={
            <ProtectedRoute>
              <ChatWindow />
            </ProtectedRoute>
          }
        />

      </Routes>
    </BrowserRouter>
  );
}

export default App;