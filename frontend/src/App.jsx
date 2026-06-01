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

function App() {
  return (
    <BrowserRouter>
      <Routes>

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

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute
              allowedRoles={["admin", "doctor"]}
            >
              <Dashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/recent-case"
          element={
            <ProtectedRoute
              allowedRoles={["admin", "doctor"]}
            >
              <RecentCases />
            </ProtectedRoute>
          }
        />

        <Route
          path="/all-doctors"
          element={
            <ProtectedRoute
              allowedRoles={["admin", "doctor"]}
            >
              <AllDoctors />
            </ProtectedRoute>
          }
        />

        <Route
          path="/chats"
          element={
            <ProtectedRoute
              allowedRoles={[
                "admin",
                "doctor"
              ]}
            >
              <Chat />
            </ProtectedRoute>
          }
        />

        <Route
          path="/chat/:id"
          element={
            <ProtectedRoute
              allowedRoles={[
                "admin",
                "doctor"
              ]}
            >
              <ChatWindow />
            </ProtectedRoute>
          }
        />

      </Routes>
    </BrowserRouter>
  );
}

export default App;