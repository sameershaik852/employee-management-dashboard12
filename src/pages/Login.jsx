import { useState } from "react";

export default function Login({ onLogin }) {
  const [user, setUser] = useState("");
  const [pass, setPass] = useState("");

  return (
    <div className="login">
      <h2>Employee Management Login</h2>

      <input placeholder="Username" onChange={(e) => setUser(e.target.value)} />
      <input type="password" placeholder="Password" onChange={(e) => setPass(e.target.value)} />

      <button onClick={() => user && pass && onLogin()}>
        Login
      </button>
    </div>
  );
}
