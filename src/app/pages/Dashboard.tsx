import { useEffect, useState } from "react";

const BASE_URL =
  "https://neurowatch-b3b08-default-rtdb.firebaseio.com/users";

export function Dashboard() {
  const [userData, setUserData] = useState<any>(null);
  const userId = localStorage.getItem("userId");

  useEffect(() => {
    if (!userId) return;

    const fetchData = async () => {
      const res = await fetch(`${BASE_URL}/${userId}.json`);
      const data = await res.json();
      setUserData(data);
    };

    fetchData();
  }, [userId]);

  if (!userData) return <div className="p-10">Loading...</div>;

  return (
    <div className="p-10">
      <h1 className="text-2xl mb-6">
        Welcome {userData.fullName}
      </h1>

      <div className="grid grid-cols-2 gap-6">
        <div className="border p-6 rounded">
          Gait Score: {userData.gaitScore}
        </div>
        <div className="border p-6 rounded">
          Voice Score: {userData.voiceScore}
        </div>
        <div className="border p-6 rounded">
          Heart Rate: {userData.heartRate} bpm
        </div>
        <div className="border p-6 rounded">
          Muscle Movement: {userData.muscleMovement}
        </div>
      </div>
    </div>
  );
}
