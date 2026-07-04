import { Suspense, lazy } from 'react';
import { Routes, Route } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import { Loading } from '@/components/common/Loading';

const LandingPage = lazy(() => import('@/pages/LandingPage'));
const NotFoundPage = lazy(() => import('@/pages/NotFoundPage'));

/**
 * Central route table. New pages/modules should be registered here as
 * lazy-loaded routes nested under the shared <Layout />.
 */
export default function AppRoutes() {
  return (
    <Suspense fallback={<Loading label="Loading page" />}>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<LandingPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </Suspense>
  );
}
