import { Link } from "react-router-dom";

function Sidebar() {
  return (
    <aside
      style={{
        width: "220px",
        padding: "20px",
        borderRight: "1px solid #ddd",
      }}
    >
      <h3>Navigation</h3>

      <p><Link to="/dashboard">Dashboard</Link></p>

      <p><Link to="/analysis">Analysis</Link></p>

      <p><Link to="/reports">Reports</Link></p>
    </aside>
  );
}

export default Sidebar;