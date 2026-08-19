 import { Outlet } from "react-router-dom";

import Navbar from "./Navbar";
import Footer from "./Footer";

import FloatingAIButton from "@/components/ai/FloatingAIButton";

/**
 * Shared application shell.
 *
 * Navbar + routed page + Footer are rendered
 * around every page through React Router <Outlet />.
 */
export default function Layout() {
  return (
    <div className="flex min-h-screen flex-col bg-paper">

      {/* Main Navigation */}
      <Navbar />

      {/* Routed Page Content */}
      <main className="flex-1">
        <Outlet />
      </main>

      {/* Footer */}
      <Footer />

      {/* Floating AI Assistant */}
      <FloatingAIButton />

    </div>
  );
}