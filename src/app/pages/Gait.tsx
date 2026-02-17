import { useState } from "react";

const BASE_URL =
  "https://neurowatch-b3b08-default-rtdb.firebaseio.com/users";

export function Gait() {
  const [score, setScore] = useState<number | null>(null);
  const userId = localStorage.getItem("userId");

  const analyze = async () => {
    const randomScore = Math.floor(Math.random() * 20) + 80;
    setScore(randomScore);

    await fetch(`${BASE_URL}/${userId}.json`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        gaitScore: randomScore,
      }),
    });
  };

  return (
    <div className="p-10">
      <h1 className="text-2xl mb-6">Gait Analysis</h1>

      <button
        onClick={analyze}
        className="bg-blue-600 text-white px-4 py-2 rounded"
      >
        Analyze Gait
      </button>

      {score && <p className="mt-4">Score: {score}</p>}
    </div>
  );
}
