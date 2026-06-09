import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  function handleLogin() {
    if (
      email.trim() === "" ||
      password.trim() === ""
    ) {
      alert("Please fill all fields");
      return;
    }

    const users =
      JSON.parse(
        localStorage.getItem("users")
      ) || [];

    const foundUser = users.find(
      (user) =>
        user.email === email &&
        user.password === password
    );

    if (!foundUser) {
      alert("Invalid Credentials");
      return;
    }

    localStorage.setItem(
      "currentUser",
      JSON.stringify(foundUser)
    );

    alert("Login Successful!");

    navigate("/");
  }

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        marginTop: "60px",
      }}
    >
      <div
        style={{
          backgroundColor: "#222",
          padding: "30px",
          borderRadius: "10px",
          width: "350px",
        }}
      >
        <h1>Login</h1>

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) =>
            setEmail(e.target.value)
          }
          style={{
            width: "100%",
            padding: "10px",
            marginBottom: "10px",
          }}
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) =>
            setPassword(e.target.value)
          }
          onKeyDown={(event) => {
            if (event.key === "Enter") {
              handleLogin();
            }
          }}
          style={{
            width: "100%",
            padding: "10px",
            marginBottom: "15px",
          }}
        />

        <button
          onClick={handleLogin}
          style={{
            width: "100%",
            padding: "12px",
            backgroundColor: "#E50914",
            color: "white",
            border: "none",
            cursor: "pointer",
          }}
        >
          Login
        </button>

        <p
          style={{
            marginTop: "15px",
            textAlign: "center",
          }}
        >
          Don't have an account?

          <Link
            to="/signup"
            style={{
              color: "#E50914",
              marginLeft: "5px",
              textDecoration: "none",
            }}
          >
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Login;