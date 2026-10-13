 // frontend/src/layouts/Layout.tsx

import { Outlet } from "react-router-dom";

import Navbar from "./Navbar";
import Footer from "./Footer";
import FloatingAIButton from "@/components/ai/FloatingAIButton";

export default function Layout() {
  return (
    <div className="flex min-h-screen flex-col bg-[#f7f8fa] text-[#101828]">
      <Navbar />

      <main
        className="flex min-w-0 flex-1 flex-col"
        role="main"
      >
        <Outlet />
      </main>

      <Footer />

      <FloatingAIButton />
    </div>
  );
}