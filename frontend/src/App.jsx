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
import DoctorDashboard from "./Doctor/Dashboard";
import DoctorCases from "./Doctor/Cases";
import Cases from "./Doctor/Cases";
import UpdateCase from "./Doctor/UpdateCase";
import NewCases from "./Doctor/NewCases";
import Profile from "./Doctor/Setting";
import DoctorPricing from "./Doctor/DoctorPricing";
import ClientChat from "./Doctor/ClientChat";
import QuestionAnswer from "./Doctor/QuestionAnswer";
import HelpandFAQ from "./Doctor/Help&FAQ";
import ForgotPassword from "./components/pages/ForgotPassword";
import ResetPassword from "./components/pages/ResetPassword";
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
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route
          path="/register"
          element={<Register />}
        />

        <Route
          path="/admin/pricing"
          element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <Pricing />
            </ProtectedRoute>
          }
        />

        <Route
          path="/notifications/all"
          element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <AllNotifications />
            </ProtectedRoute>
          }
        />


        <Route
          path="/admin/dashboard"
          element={
            <ProtectedRoute
              allowedRoles={["admin"]}
            >
              <Dashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/recent-case"
          element={
            <ProtectedRoute
              allowedRoles={["admin", "doctor"]}
            >
              <RecentCases />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/all-doctors"
          element={
            <ProtectedRoute
              allowedRoles={["admin"]}
            >
              <AllDoctors />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/chats"
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
          path="/client/chatclient"
          element={
            <ProtectedRoute
              allowedRoles={[
                "doctor", "admin"
              ]}
            >
              <ClientChat />
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
          path="/client/pricing"
          element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <DoctorPricing />
            </ProtectedRoute>
          }
        />
        <Route
          path="/add-price"
          element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <UpdatePrice />
            </ProtectedRoute>
          }
        />

        <Route
          path="/update-price/:id"
          element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <UpdatePrice />
            </ProtectedRoute>
          }
        />
        <Route
          path="/category"
          element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <Category />
            </ProtectedRoute>
          }
        />
        <Route
          path="/client/dashboard"
          element={
            <ProtectedRoute allowedRoles={["admin", "doctor"]}>
              <DoctorDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/client/cases"
          element={
            <ProtectedRoute allowedRoles={["admin", "doctor"]}>
              <DoctorCases />
            </ProtectedRoute>
          }
        />
        <Route
          path="/client/new-cases"
          element={<NewCases />}
        />

        <Route
          path="/client/setting"
          element={<Profile />}
        />

        <Route
          path="/client/update-case/:caseId"
          element={<UpdateCase />}
        />
        <Route
          path="/client/questions-answers"
          element={<QuestionAnswer />}
        />
        <Route path="/client/help-faq"
          element={<HelpandFAQ />} />
      </Routes>

    </BrowserRouter >
  );
}

export default App;