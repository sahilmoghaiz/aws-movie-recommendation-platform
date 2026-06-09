import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

function Navbar() {
  const navigate = useNavigate();

  const [showProfileMenu, setShowProfileMenu] =
    useState(false);

  const currentUser = JSON.parse(
    localStorage.getItem("currentUser")
  );

  function handleLogout() {
  const confirmLogout =
    window.confirm(
      "Are you sure you want to logout?"
    );

  if (!confirmLogout) {
    return;
  }

  localStorage.removeItem("currentUser");

  navigate("/login");

  window.location.reload();
}

  return (
    <nav
      style={{
        backgroundColor: "#111",
        padding: "20px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <Link
        to="/"
        style={{
          color: "#E50914",
          textDecoration: "none",
        }}
      >
        <h2>MovieHub</h2>
      </Link>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "20px",
        }}
      >
        <Link
          to="/"
          style={{
            color: "#E50914",
            textDecoration: "none",
          }}
        >
          Home
        </Link>

        {!currentUser ? (
          <Link
            to="/login"
            style={{
              color: "#E50914",
              textDecoration: "none",
            }}
          >
            Login
          </Link>
        ) : (
          <>
            <Link
              to="/watchlist"
              style={{
                color: "#E50914",
                textDecoration: "none",
              }}
            >
              Watchlist
            </Link>

            <div
              style={{
                position: "relative",
              }}
            >
              <button
                onClick={() =>
                  setShowProfileMenu(
                    !showProfileMenu
                  )
                }
                style={{
                  backgroundColor: "#222",
                  border: "1px solid #333",
                  color: "white",
                  cursor: "pointer",
                  fontSize: "15px",
                  padding: "8px 12px",
                  borderRadius: "8px",
                  transition: "0.3s",
                }}
              >
                👤 {currentUser.email.split("@")[0]} ▼
              </button>

              {showProfileMenu && (
                <div
                  style={{
                    position: "absolute",
                    right: "0",
                    top: "45px",
                    backgroundColor: "#222",
                    padding: "15px",
                    borderRadius: "8px",
                    minWidth: "220px",
                    boxShadow:
                      "0px 0px 10px rgba(0,0,0,0.5)",
                    zIndex: 1000,
                  }}
                >
                  <p
                    style={{
                      color: "white",
                      marginBottom: "10px",
                      wordBreak: "break-word",
                    }}
                  >
                    {currentUser.email}
                  </p>

                  <button
                    onClick={handleLogout}
                    style={{
                      width: "100%",
                      padding: "10px",
                      backgroundColor: "#E50914",
                      color: "white",
                      border: "none",
                      borderRadius: "5px",
                      cursor: "pointer",
                    }}
                  >
                    🚪 Logout
                  </button>
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;