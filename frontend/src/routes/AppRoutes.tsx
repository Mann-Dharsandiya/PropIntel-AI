 import { Suspense, lazy } from "react";
import { Routes, Route } from "react-router-dom";

import Layout from "@/components/layout/Layout";
import { Loading } from "@/components/common/Loading";

const LandingPage = lazy(() => import("@/pages/LandingPage"));
const LoginPage = lazy(() => import("@/pages/LoginPage"));
const RegisterPage = lazy(() => import("@/pages/RegisterPage"));
const DashboardPage = lazy(() => import("@/pages/DashboardPage"));

const PropertyListPage = lazy(
  () => import("@/pages/PropertyListPage")
);

const PropertyDetailsPage = lazy(
  () => import("@/pages/PropertyDetailsPage")
);

const PricePredictionPage = lazy(
  () => import("@/pages/PricePredictionPage")
);

const NotFoundPage = lazy(
  () => import("@/pages/NotFoundPage")
);

export default function AppRoutes() {
  return (
    <Suspense fallback={<Loading label="Loading page" />}>
      <Routes>
        <Route element={<Layout />}>

          <Route path="/" element={<LandingPage />} />

          <Route path="/login" element={<LoginPage />} />

          <Route
            path="/register"
            element={<RegisterPage />}
          />

          <Route
            path="/dashboard"
            element={<DashboardPage />}
          />

          <Route
            path="/properties"
            element={<PropertyListPage />}
          />

          <Route
            path="/properties/:id"
            element={<PropertyDetailsPage />}
          />

          {/* AI Prediction */}
          <Route
            path="/predict-price"
            element={<PricePredictionPage />}
          />

          <Route
            path="*"
            element={<NotFoundPage />}
          />

        </Route>
      </Routes>
    </Suspense>
  );
}