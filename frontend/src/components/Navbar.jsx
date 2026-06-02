import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav
      style={{
        backgroundColor: "#111",
        padding: "20px",
        display: "flex",
        justifyContent: "space-between",
      }}
    >
      <h2 style={{ color: "red" }}>MovieHub</h2>

      <div>
        <Link
          to="/"
          style={{
            color: "white",
            textDecoration: "none",
            marginRight: "20px",
          }}
        >
          Home
        </Link>

        <Link
          to="/login"
          style={{
            color: "white",
            textDecoration: "none",
            marginRight: "20px",
          }}
        >
          Login
        </Link>

        <Link
          to="/watchlist"
          style={{
            color: "white",
            textDecoration: "none",
          }}
        >
          Watchlist
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;