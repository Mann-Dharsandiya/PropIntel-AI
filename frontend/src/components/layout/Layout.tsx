import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';

/** Shared shell (nav + footer) rendered around every routed page via <Outlet />. */
export default function Layout() {
  return (
    <div className="flex min-h-screen flex-col bg-paper">
      <Navbar />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
