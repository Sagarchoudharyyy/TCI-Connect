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
import Profile from "./Doctor/Profile";
import DoctorPricing from "./Doctor/DoctorPricing";
import ClientChat from "./Doctor/ClientChat";
import QuestionAnswer from "./Doctor/QuestionAnswer";
import HelpandFAQ from "./Doctor/Help&FAQ";
import ViewCaseDetail from "./components/pages/ViewCaseDetail";
import ForgotPassword from "./components/pages/ForgotPassword";
import ResetPassword from "./components/pages/ResetPassword";
import ChangePassword from "./Doctor/ChangePassword";
import RGPDpolicy from "./Doctor/RGPDpolicy";
import UploadPreview from "./components/pages/UploadPreview";
import UserDetails from "./components/pages/UserDetails";
import HOME from "./design-part/html/HOME";
import About from "./design-part/html/About";
import LabService from "./design-part/html/LabService";
import SubmitCase from "./design-part/html/SubmitCase";
import ClinicalSupport from "./design-part/html/ClinicalSupport";
import PricingUI from "./design-part/html/PricingUI";
import OurSolutions from "./design-part/html/OurSolutions";
import CONTACTUS from "./design-part/html/Contact-Us";


function App() {
  return (
    <BrowserRouter>
      <Routes>

        <Route
          path="/"
          element={<HOME />}
        />

        <Route
          path="/lab-services"
          element={<LabService />}
        />
        <Route
          path="/submit-case"
          element={<SubmitCase />}
        />
        <Route
          path="/clinical-support"
          element={<ClinicalSupport />}
        />
        <Route
          path="/pricing"
          element={<PricingUI />}
        />
        <Route
          path="/our-solutions"
          element={< OurSolutions />}
        />
        <Route
          path="/contact-us"
          element={< CONTACTUS />}
        />




        <Route path="/about-us" element={<About />} />

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
        <Route path="/change-password" element={<ChangePassword />} />
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
              allowedRoles={["admin"]}
            >
              <RecentCases />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/view-case/:id"
          element={
            <ProtectedRoute
              allowedRoles={["admin"]}
            >
              <ViewCaseDetail />
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
          path="/admin/user-details/:id"
          element={
            <ProtectedRoute
              allowedRoles={["admin"]}
            >
              <UserDetails />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/chats"
          element={
            <ProtectedRoute
              allowedRoles={[
                "admin"

              ]}
            >
              <Chat />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/upload-preview/:id"
          element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <UploadPreview />
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
            <ProtectedRoute allowedRoles={["doctor"]}>
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
            <ProtectedRoute allowedRoles={["doctor"]}>
              <DoctorDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/client/cases"
          element={
            <ProtectedRoute allowedRoles={["doctor"]}>
              <DoctorCases />
            </ProtectedRoute>
          }
        />
        <Route
          path="/client/new-cases"
          element={
            <ProtectedRoute allowedRoles={["doctor"]}>
              <NewCases />
            </ProtectedRoute>}
        />

        <Route
          path="/client/setting"
          element={
            <ProtectedRoute allowedRoles={["doctor"]}>
              <Profile />
            </ProtectedRoute>}
        />
        <Route path="/client/rgpd-policy"
          element={
            <ProtectedRoute allowedRoles={["doctor"]}>
              <RGPDpolicy />
            </ProtectedRoute>}
        />
        <Route
          path="/client/update-case/:caseId"
          element={
            <ProtectedRoute allowedRoles={["doctor"]}>
              <UpdateCase />
            </ProtectedRoute>}
        />
        <Route
          path="/client/questions-answers"
          element={
            <ProtectedRoute allowedRoles={["doctor"]}>
              <QuestionAnswer />
            </ProtectedRoute>}
        />
        <Route path="/client/help-faq"
          element={
            <ProtectedRoute allowedRoles={["doctor"]}>
              <HelpandFAQ />
            </ProtectedRoute>}
        />
      </Routes>
    </BrowserRouter >
  );
}

export default App;