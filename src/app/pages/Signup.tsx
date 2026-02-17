import { useState } from "react";
import { useNavigate } from "react-router-dom";

const FIREBASE_URL =
  "https://neurowatch-b3b08-default-rtdb.firebaseio.com/users.json";

export default function Signup() {
  const navigate = useNavigate();
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignup = async () => {
    if (!email || !password) {
      alert("Fill all fields");
      return;
    }

    try {
      const res = await fetch(FIREBASE_URL);
      const data = await res.json();

      if (data) {
        const userExists = Object.values(data).find(
          (u: any) => u.email === email
        );
        if (userExists) {
          alert("User already exists. Please login.");
          return;
        }
      }

      await fetch(FIREBASE_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName,
          email,
          password,
          gaitScore: "--",
          voiceScore: "--",
          heartRate: 78,
          muscleMovement: "Normal"
        }),
      });

      alert("Signup successful!");
      navigate("/login");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="p-10">
      <h1 className="text-2xl mb-6">Signup</h1>

      <input
        placeholder="Full Name"
        className="border p-2 mb-3 w-full"
        onChange={(e) => setFullName(e.target.value)}
      />
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
        onClick={handleSignup}
        className="bg-blue-600 text-white px-4 py-2 rounded"
      >
        Signup
      </button>
    </div>
  );
}
