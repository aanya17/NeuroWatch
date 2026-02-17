import { useState, useEffect } from "react";
import {
  Activity,
  Heart,
  AlertCircle,
  Brain,
  Footprints,
  TrendingUp,
  Watch,
  Lightbulb,
} from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

const FIREBASE_URL =
  "https://neurowatch-b3b08-default-rtdb.firebaseio.com/watch_data.json";

const progressData = [
  { date: "Jan 28", gait: 86, tremor: 91, voice: 84, muscle: 76 },
  { date: "Jan 29", gait: 82, tremor: 85, voice: 80, muscle: 74 },
  { date: "Jan 30", gait: 85, tremor: 90, voice: 86, muscle: 78 },
  { date: "Jan 31", gait: 84, tremor: 88, voice: 82, muscle: 75 },
  { date: "Feb 1", gait: 87, tremor: 92, voice: 85, muscle: 78 },
];

interface MetricCardProps {
  title: string;
  value: string;
  icon: React.ReactNode;
}

function MetricCard({ title, value, icon }: MetricCardProps) {
  return (
    <div className="bg-white rounded-xl shadow-sm p-6 border border-[#E2E8F0]">
      <div className="flex items-center justify-between mb-3">
        <div className="w-10 h-10 bg-[#2563EB] rounded-lg flex items-center justify-center text-white">
          {icon}
        </div>
      </div>
      <h3 className="text-[#64748B] mb-1">{title}</h3>
      <p className="text-[#0F172A] text-2xl font-semibold">{value}</p>
    </div>
  );
}

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
        console.error("Firebase fetch error:", error);
      }
    };

    fetchData();
    const interval = setInterval(fetchData, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div
      className="min-h-screen px-8 py-10"
      style={{ backgroundColor: "#F8FAFC" }}
    >
      <h1 className="text-3xl font-semibold text-[#0F172A] mb-8">
        Live Health Dashboard
      </h1>

      {/* Metric Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        <MetricCard
          title="Gait Score"
          value="87"
          icon={<Footprints size={18} />}
        />
        <MetricCard
          title="Muscle Movement"
          value={muscleMovement}
          icon={<Activity size={18} />}
        />
        <MetricCard
          title="Heart Rate"
          value={heartRate ? `${heartRate} bpm` : "--"}
          icon={<Heart size={18} />}
        />
        <MetricCard
          title="Risk Level"
          value="Medium"
          icon={<AlertCircle size={18} />}
        />
      </div>

      {/* Progress Chart */}
      <div className="bg-white rounded-xl shadow-sm p-6 border border-[#E2E8F0] mb-10">
        <div className="flex items-center gap-2 mb-6">
          <Brain size={20} className="text-[#2563EB]" />
          <h2 className="text-xl font-semibold text-[#0F172A]">
            Progress Charts
          </h2>
        </div>

        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={progressData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="gait" stroke="#2563EB" />
            <Line type="monotone" dataKey="tremor" stroke="#22C55E" />
            <Line type="monotone" dataKey="voice" stroke="#8B5CF6" />
            <Line type="monotone" dataKey="muscle" stroke="#38BDF8" />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* AI Suggestions */}
      <div className="bg-white rounded-xl shadow-sm p-6 border border-[#E2E8F0]">
        <div className="flex items-center gap-2 mb-6">
          <Lightbulb size={20} className="text-[#2563EB]" />
          <h2 className="text-xl font-semibold text-[#0F172A]">
            AI Suggestions
          </h2>
        </div>

        <div className="space-y-4 text-[#0F172A]">
          <p className="flex items-start gap-2">
            <TrendingUp size={16} className="text-green-500 mt-1" />
            Your gait score has improved this week. Keep up the walking routine.
          </p>

          <p className="flex items-start gap-2">
            <Watch size={16} className="text-blue-500 mt-1" />
            Sync smartwatch frequently for accurate tremor monitoring.
          </p>

          <p className="flex items-start gap-2">
            <Heart size={16} className="text-red-500 mt-1" />
            Heart rate is stable. Maintain your current exercise level.
          </p>
        </div>
      </div>
    </div>
  );
}
