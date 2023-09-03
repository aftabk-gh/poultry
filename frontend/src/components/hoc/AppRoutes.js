import { Navigate, Route, Routes } from "react-router-dom";
import Dashboard from "../../pages/dashboard/dashboard";
import Bryler from "../../pages/bryler/bryler";
import Medicine from "../../pages/medicine/medicine";
import Layer from "../../pages/layer/layer";
import Farm from "../../pages/farms/farms";
import Flock from "../../pages/flock/flock";
import Settings from "../../pages/settings/settings";
import Layout from "../shared/layout/layout";
import FlockDetail from "../../pages/flockDetail/flockDetail";
import Login from "../../pages/login/login";
import Signup from "../../pages/signUp/signUp";
import ProtectedRoute from "./ProtectedRoute";
import FarmDetail from "@src/pages/farms/farmDetail";
import Feed from "@src/pages/feed/feed";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <Layout />
          </ProtectedRoute>
        }
      >
        <Route index element={<Dashboard />} />
        <Route path="/bryler" element={<Bryler />} />
        <Route path="/farms" element={<Farm />} />
        <Route path="/farms/:id" element={<FarmDetail />} />
        <Route path="/farms/:farmId/flocks" element={<Flock />} />
        <Route path="/farms/:farmId/medicine" element={<Medicine />} />
        <Route path="/farms/:farmId/feed" element={<Feed />} />
        <Route path="/farms/:farmId/flocks/:id" element={<FlockDetail />} />
        <Route path="/layer" element={<Layer />} />
        <Route path="/medicine" element={<Medicine />} />
        <Route path="/settings" element={<Settings />} />
      </Route>
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};
export default AppRoutes;
