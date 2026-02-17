import { useState, useEffect } from 'react';
import { Activity, Heart, AlertCircle, Footprints } from 'lucide-react';

const FIREBASE_URL =
  "https://neurowatch-b3b08-default-rtdb.firebaseio.com/watch_data.json";

export function Dashboard() {
  const [heartRate, setHeartRate] = useState<number | null>(null);
  const [muscleMovement, setMuscleMovement] = useState<string>("--");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(FIREBASE_URL);
        const data = await res.json();

        if (data) {
          setHeartRate(data.heartRate || null);
          setMuscleMovement(data.muscleMovement || "--");
        }
      } catch (error) {
        console.error("Error fetching Firebase data:", error);
      }
    };

    fetchData();

    // Auto refresh every 2 seconds
    const interval = setInterval(fetchData, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div style={{ padding: "40px", fontFamily: "Inter, sans-serif" }}>
      <h1 style={{ fontSize: "28px", marginBottom: "30px" }}>
        Live Health Dashboard
      </h1>

      <div style={{ display: "flex", gap: "20px" }}>
        <div style={cardStyle}>
          <Footprints size={28} />
          <h3>Gait Score</h3>
          <p style={valueStyle}>--</p>
        </div>

        <div style={cardStyle}>
          <Activity size={28} />
          <h3>Muscle Movement</h3>
          <p style={valueStyle}>{muscleMovement}</p>
        </div>

        <div style={cardStyle}>
          <Heart size={28} />
          <h3>Heart Rate</h3>
          <p style={valueStyle}>
            {heartRate ? `${heartRate} bpm` : "--"}
          </p>
        </div>

        <div style={cardStyle}>
          <AlertCircle size={28} />
          <h3>Risk Level</h3>
          <p style={valueStyle}>--</p>
        </div>
      </div>
    </div>
  );
}

const cardStyle: React.CSSProperties = {
  background: "white",
  padding: "20px",
  borderRadius: "12px",
  boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
  width: "200px",
};

const valueStyle: React.CSSProperties = {
  fontSize: "22px",
  fontWeight: 600,
};
