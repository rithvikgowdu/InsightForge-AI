import { ReactNode } from "react";

import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

interface DashboardLayoutProps {
  children: ReactNode;
}

function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <>
      <Navbar />

      <div
        style={{
          display: "flex",
        }}
      >
        <Sidebar />

        <main
          style={{
            padding: "20px",
            flex: 1,
          }}
        >
          {children}
        </main>
      </div>
    </>
  );
}

export default DashboardLayout;