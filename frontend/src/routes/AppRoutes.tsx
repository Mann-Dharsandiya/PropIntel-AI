 import {
  Suspense,
  lazy,
} from "react";

import {
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import Layout from "@/components/layout/Layout";

import {
  Loading,
} from "@/components/common/Loading";

import {
  PortfolioProvider,
} from "@/context/PortfolioContext";

// =========================================================
// PUBLIC PAGES
// =========================================================

const LandingPage = lazy(
  () =>
    import(
      "@/pages/LandingPage"
    )
);

const LoginPage = lazy(
  () =>
    import(
      "@/pages/LoginPage"
    )
);

const RegisterPage = lazy(
  () =>
    import(
      "@/pages/RegisterPage"
    )
);

const ForgotPasswordPage = lazy(
  () =>
    import(
      "@/pages/ForgotPasswordPage"
    )
);

const ResetPasswordPage = lazy(
  () =>
    import(
      "@/pages/ResetPasswordPage"
    )
);

const VerifyEmailPage = lazy(
  () =>
    import(
      "@/pages/VerifyEmailPage"
    )
);

const ResendVerificationPage = lazy(
  () =>
    import(
      "@/pages/ResendVerificationPage"
    )
);

// =========================================================
// MAIN PAGES
// =========================================================

const DashboardPage = lazy(
  () =>
    import(
      "@/pages/DashboardPage"
    )
);

const ProfilePage = lazy(
  () =>
    import(
      "@/pages/ProfilePage"
    )
);

const FavoritesPage = lazy(
  () =>
    import(
      "@/pages/FavoritesPage"
    )
);

const PropertyListPage = lazy(
  () =>
    import(
      "@/pages/PropertyListPage"
    )
);

const PropertyDetailsPage = lazy(
  () =>
    import(
      "@/pages/PropertyDetailsPage"
    )
);

// =========================================================
// AI MODULES
// =========================================================

const PricePredictionPage = lazy(
  () =>
    import(
      "@/pages/PricePredictionPage"
    )
);

const RecommendationPage = lazy(
  () =>
    import(
      "@/pages/RecommendationPage"
    )
);

const LocalityPage = lazy(
  () =>
    import(
      "@/pages/LocalityPage"
    )
);

const CompareLocalitiesPage = lazy(
  () =>
    import(
      "@/pages/CompareLocalitiesPage"
    )
);

// =========================================================
// SMART AI ADVISOR
// =========================================================

const AIAdvisorPage = lazy(
  () =>
    import(
      "@/pages/AIAdvisorPage"
    )
);

// =========================================================
// FINANCIAL INTELLIGENCE
// =========================================================

const FinancialPage = lazy(
  () =>
    import(
      "@/pages/FinancialPage"
    )
);

// =========================================================
// INVESTMENT PORTFOLIO
// =========================================================

const PortfolioPage = lazy(
  () =>
    import(
      "@/pages/PortfolioPage"
    )
);

// =========================================================
// AI REPORTS
// =========================================================

const ReportsPage = lazy(
  () =>
    import(
      "@/pages/ReportsPage"
    )
);

// =========================================================
// MARKET INTELLIGENCE
// =========================================================

const MarketIntelligencePage = lazy(
  () =>
    import(
      "@/pages/MarketIntelligencePage"
    )
);

// =========================================================
// 404
// =========================================================

const NotFoundPage = lazy(
  () =>
    import(
      "@/pages/NotFoundPage"
    )
);

// =========================================================
// APPLICATION ROUTES
// =========================================================

export default function AppRoutes() {
  return (
    <Suspense
      fallback={
        <Loading />
      }
    >
      <Routes>

        {/* ================================================= */}
        {/* APPLICATION LAYOUT */}
        {/* ================================================= */}

        <Route
          element={
            <Layout />
          }
        >

          {/* ================================================= */}
          {/* HOME */}
          {/* ================================================= */}

          <Route
            path="/"
            element={
              <LandingPage />
            }
          />

          {/* ================================================= */}
          {/* AUTHENTICATION */}
          {/* ================================================= */}

          <Route
            path="/login"
            element={
              <LoginPage />
            }
          />

          <Route
            path="/register"
            element={
              <RegisterPage />
            }
          />

          <Route
            path="/forgot-password"
            element={
              <ForgotPasswordPage />
            }
          />

          <Route
            path="/reset-password/:token"
            element={
              <ResetPasswordPage />
            }
          />

          {/* ================================================= */}
          {/* EMAIL VERIFICATION */}
          {/* ================================================= */}

          <Route
            path="/verify-email/:token"
            element={
              <VerifyEmailPage />
            }
          />

          <Route
            path="/resend-verification"
            element={
              <ResendVerificationPage />
            }
          />

          {/* ================================================= */}
          {/* DASHBOARD */}
          {/* ================================================= */}

          <Route
            path="/dashboard"
            element={
              <DashboardPage />
            }
          />

          <Route
            path="/profile"
            element={
              <ProfilePage />
            }
          />

          <Route
            path="/favorites"
            element={
              <FavoritesPage />
            }
          />

          {/* ================================================= */}
          {/* PROPERTIES */}
          {/* ================================================= */}

          <Route
            path="/properties"
            element={
              <PropertyListPage />
            }
          />

          <Route
            path="/properties/:id"
            element={
              <PropertyDetailsPage />
            }
          />

          {/* ================================================= */}
          {/* AI PRICE PREDICTION */}
          {/* ================================================= */}

          {/* Existing route - KEEP */}
          <Route
            path="/predict-price"
            element={
              <PricePredictionPage />
            }
          />

          {/* Compatibility route - fixes /prediction */}
          <Route
            path="/prediction"
            element={
              <PricePredictionPage />
            }
          />

          {/* ================================================= */}
          {/* AI RECOMMENDATIONS */}
          {/* ================================================= */}

          {/* Existing route - KEEP */}
          <Route
            path="/recommendation"
            element={
              <RecommendationPage />
            }
          />

          {/* Compatibility route - fixes /recommendations */}
          <Route
            path="/recommendations"
            element={
              <RecommendationPage />
            }
          />

          {/* ================================================= */}
          {/* LOCALITY INTELLIGENCE */}
          {/* ================================================= */}

          <Route
            path="/locality"
            element={
              <LocalityPage />
            }
          />

          <Route
            path="/compare-localities"
            element={
              <CompareLocalitiesPage />
            }
          />

          {/* ================================================= */}
          {/* SMART AI ADVISOR */}
          {/* ================================================= */}

          <Route
            path="/ai-advisor"
            element={
              <AIAdvisorPage />
            }
          />

          {/* ================================================= */}
          {/* FINANCIAL INTELLIGENCE */}
          {/* ================================================= */}

          <Route
            path="/financial"
            element={
              <FinancialPage />
            }
          />

          {/* ================================================= */}
          {/* INVESTMENT PORTFOLIO */}
          {/* ================================================= */}

          <Route
            path="/portfolio"
            element={
              <PortfolioProvider>
                <PortfolioPage />
              </PortfolioProvider>
            }
          />

          {/* ================================================= */}
          {/* AI REPORTS */}
          {/* ================================================= */}

          <Route
            path="/reports"
            element={
              <ReportsPage />
            }
          />

          {/* ================================================= */}
          {/* MARKET INTELLIGENCE */}
          {/* ================================================= */}

          <Route
            path="/market-intelligence"
            element={
              <MarketIntelligencePage />
            }
          />

          {/* ================================================= */}
          {/* BACKWARD COMPATIBILITY */}
          {/* ================================================= */}

          <Route
            path="/reports/market"
            element={
              <Navigate
                to="/market-intelligence"
                replace
              />
            }
          />

          {/* ================================================= */}
          {/* 404 */}
          {/* ================================================= */}

          <Route
            path="*"
            element={
              <NotFoundPage />
            }
          />

        </Route>

      </Routes>
    </Suspense>
  );
}