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
import AllNotifications from "./components/pages/AllNotifications";
import UpdatePrice from "./components/pages/UpdatePrice";
import Category from "./components/pages/Category";

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
        <Route path="/pricing" element={<Pricing />} />
        <Route path="/notifications/all"
          element={<AllNotifications />} />
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
        <Route
          path="/add-price"
          element={
            <ProtectedRoute>
              <UpdatePrice />
            </ProtectedRoute>
          }
        />
        <Route
          path="/update-price/:id"
          element={
            <ProtectedRoute>
              <UpdatePrice />
            </ProtectedRoute>
          }
        />
        <Route
          path="/category"
          element={
            <ProtectedRoute>
              <Category />
            </ProtectedRoute>
          }
        />

      </Routes>
    </BrowserRouter>
  );
}

export default App;