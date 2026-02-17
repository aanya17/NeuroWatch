import { useState } from "react";
import { useNavigate } from "react-router-dom";

const FIREBASE_URL =
  "https://neurowatch-b3b08-default-rtdb.firebaseio.com/users.json";

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    const res = await fetch(FIREBASE_URL);
    const data = await res.json();

    if (data) {
      const user = Object.entries(data).find(
        ([_, value]: any) =>
          value.email === email && value.password === password
      );

      if (user) {
        localStorage.setItem("userId", user[0]);
        navigate("/dashboard");
      } else {
        alert("Invalid email or password");
      }
    }
  };

  return (
    <div className="p-10">
      <h1 className="text-2xl mb-6">Login</h1>

      <input
        placeholder="Email"
        className="border p-2 mb-3 w-full"
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        className="border p-2 mb-3 w-full"
        onChange={(e) => setPassword(e.target.value)}
      />

      <button
        onClick={handleLogin}
        className="bg-green-600 text-white px-4 py-2 rounded"
      >
        Login
      </button>
    </div>
  );
}
