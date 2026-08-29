import type { ReactNode } from "react";

import Navbar from "../components/layout/Navbar";
import Sidebar from "../components/layout/Sidebar";

interface DashboardLayoutProps {
  children: ReactNode;
}

function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <>
      <Navbar />

      <div
  className="dashboard-shell"
  style={{
    display: "flex",
  }}
>
        <Sidebar />

       <main
  className="dashboard-main"
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