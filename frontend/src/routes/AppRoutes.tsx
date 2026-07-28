 import { Suspense, lazy } from "react";
import { Routes, Route } from "react-router-dom";

import Layout from "@/components/layout/Layout";
import { Loading } from "@/components/common/Loading";

const LandingPage = lazy(() => import("@/pages/LandingPage"));
const LoginPage = lazy(() => import("@/pages/LoginPage"));
const RegisterPage = lazy(() => import("@/pages/RegisterPage"));

const ForgotPasswordPage = lazy(
  () => import("../pages/ForgotPasswordPage")
);

const ResetPasswordPage = lazy(
  () => import("../pages/ResetPasswordPage")
);

const VerifyEmailPage = lazy(
  () => import("@/pages/VerifyEmailPage")
);

const ResendVerificationPage = lazy(
  () => import("@/pages/ResendVerificationPage")
);

const DashboardPage = lazy(() => import("@/pages/DashboardPage"));
const ProfilePage = lazy(() => import("@/pages/ProfilePage"));
const FavoritesPage = lazy(() => import("@/pages/FavoritesPage"));
const PropertyListPage = lazy(() => import("@/pages/PropertyListPage"));
const PropertyDetailsPage = lazy(() => import("@/pages/PropertyDetailsPage"));
const PricePredictionPage = lazy(() => import("@/pages/PricePredictionPage"));
const RecommendationPage = lazy(() => import("@/pages/RecommendationPage"));
const LocalityPage = lazy(() => import("@/pages/LocalityPage"));
const CompareLocalitiesPage = lazy(() => import("@/pages/CompareLocalitiesPage"));
const NotFoundPage = lazy(() => import("@/pages/NotFoundPage"));

export default function AppRoutes() {
  return (
    <Suspense fallback={<Loading label="Loading page..." />}>
      <Routes>
        <Route element={<Layout />}>

          <Route path="/" element={<LandingPage />} />

          <Route path="/login" element={<LoginPage />} />

          <Route path="/register" element={<RegisterPage />} />

          <Route
            path="/forgot-password"
            element={<ForgotPasswordPage />}
          />

          <Route
            path="/reset-password/:token"
            element={<ResetPasswordPage />}
          />

          {/* Email Verification */}

          <Route
            path="/verify-email/:token"
            element={<VerifyEmailPage />}
          />

          <Route
            path="/resend-verification"
            element={<ResendVerificationPage />}
          />

          {/* Protected */}

          <Route path="/dashboard" element={<DashboardPage />} />

          <Route path="/profile" element={<ProfilePage />} />

          <Route path="/favorites" element={<FavoritesPage />} />

          <Route
            path="/properties"
            element={<PropertyListPage />}
          />

          <Route
            path="/properties/:id"
            element={<PropertyDetailsPage />}
          />

          <Route
            path="/predict-price"
            element={<PricePredictionPage />}
          />

          <Route
            path="/recommendation"
            element={<RecommendationPage />}
          />

          <Route
            path="/locality"
            element={<LocalityPage />}
          />

          <Route
            path="/compare-localities"
            element={<CompareLocalitiesPage />}
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