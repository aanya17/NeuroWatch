import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Activity,
  Heart,
  TrendingUp,
  AlertCircle,
  Brain,
  Footprints,
  Lightbulb
} from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend
} from "recharts";

const FIREBASE_URL =
  "https://neurowatch-b3b08-default-rtdb.firebaseio.com/watch_data.json";

const tabs = [
  { name: "Dashboard", path: "/dashboard" },
  { name: "Gait", path: "/gait" },
  { name: "Voice", path: "/voice" },
];

const progressData = [
  { date: "Jan 28", gait: 86, tremor: 91, voice: 84, muscle: 76 },
  { date: "Jan 29", gait: 82, tremor: 85, voice: 80, muscle: 74 },
  { date: "Jan 30", gait: 85, tremor: 90, voice: 86, muscle: 78 },
];

interface MetricCardProps {
  title: string;
  value: string;
  icon: React.ReactNode;
  color: string;
}

function MetricCard({ title, value, icon, color }: MetricCardProps) {
  return (
    <div className="bg-white rounded-xl shadow-sm p-6 border border-[#E2E8F0]">
      <div className="flex items-center justify-between mb-4">
        <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${color}`}>
          {icon}
        </div>
      </div>
      <h3 className="text-[#64748B] mb-1">{title}</h3>
      <p className="text-[#0F172A] text-3xl font-semibold">{value}</p>
    </div>
  );
}

export default function Dashboard() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("Dashboard");

  const [heartRate, setHeartRate] = useState<string>("--");
  const [muscleMovement, setMuscleMovement] = useState<string>("--");
  const [gait, setGait] = useState<number>(0);
  const [tremor, setTremor] = useState<string>("--");
  const [voice, setVoice] = useState<number>(0);

  useEffect(() => {
  const fetchData = async () => {
    try {
      const res = await fetch(FIREBASE_URL);
      const data = await res.json();

      console.log("FIREBASE DATA:", data);

      if (data) {
        setHeartRate(data.heartRate ? `${data.heartRate} bpm` : "--");
        setMuscleMovement(data.muscleMovement || "--");
        setGait(data.gait || 0);
        setTremor(data.tremor || "--");
        setVoice(data.voice || 0);
      }
    } catch (error) {
      console.error("Firebase error:", error);
    }
  };

  fetchData();
  const interval = setInterval(fetchData, 3000);
  return () => clearInterval(interval);
}, []);

  const handleTabClick = (tab: typeof tabs[0]) => {
    setActiveTab(tab.name);
    navigate(tab.path);
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] font-sans">
      <div className="bg-white shadow-sm border-b border-[#E2E8F0]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-[#2563EB] rounded-lg flex items-center justify-center">
                <Activity className="w-5 h-5 text-white" />
              </div>
              <span className="text-[#0F172A] text-xl font-semibold">
                NeuroWatch
              </span>
            </div>
          </div>

          <div className="flex gap-1">
            {tabs.map((tab) => (
              <button
                key={tab.name}
                onClick={() => handleTabClick(tab)}
                className={`px-5 py-3 ${
                  activeTab === tab.name
                    ? "text-[#2563EB] border-b-2 border-[#2563EB]"
                    : "text-[#64748B]"
                }`}
              >
                {tab.name}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="mb-8">
          <h1 className="text-[#0F172A] text-3xl font-semibold mb-2">
            Welcome 👋
          </h1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <MetricCard
            title="Gait Score"
            value="87"
            icon={<Footprints className="w-6 h-6 text-white" />}
            color="bg-[#2563EB]"
          />

          <MetricCard
            title="Muscle Movement"
            value={muscleMovement}
            icon={<Activity className="w-6 h-6 text-white" />}
            color="bg-[#22C55E]"
          />

          <MetricCard
            title="Heart Rate"
            value={heartRate}
            icon={<Heart className="w-6 h-6 text-white" />}
            color="bg-[#38BDF8]"
          />

          <MetricCard
            title="Neuro Risk Level"
            value="Low"
            icon={<AlertCircle className="w-6 h-6 text-white" />}
            color="bg-[#F59E0B]"
          />
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6 border border-[#E2E8F0]">
          <div className="flex items-center gap-2 mb-6">
            <TrendingUp className="w-5 h-5 text-[#2563EB]" />
            <h2 className="text-[#0F172A] text-xl font-semibold">
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
      </div>
    </div>
  );
}
