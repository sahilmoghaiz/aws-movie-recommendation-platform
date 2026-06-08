import { useState } from "react";

function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] =
    useState("");

  function handleSignup() {
    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    const users =
      JSON.parse(
        localStorage.getItem("users")
      ) || [];

    const newUser = {
      email,
      password,
    };

    users.push(newUser);

    localStorage.setItem(
      "users",
      JSON.stringify(users)
    );

    alert("Account Created Successfully!");

    setEmail("");
    setPassword("");
    setConfirmPassword("");
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
        <h1>Sign Up</h1>

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
          style={{
            width: "100%",
            padding: "10px",
            marginBottom: "10px",
          }}
        />

        <input
          type="password"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={(e) =>
            setConfirmPassword(e.target.value)
          }
          style={{
            width: "100%",
            padding: "10px",
            marginBottom: "15px",
          }}
        />

        <button
          onClick={handleSignup}
          style={{
            width: "100%",
            padding: "12px",
            backgroundColor: "#E50914",
            color: "white",
            border: "none",
            cursor: "pointer",
          }}
        >
          Create Account
        </button>
      </div>
    </div>
  );
}

export default Signup;