import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import {
  Activity,
  Heart,
  TrendingUp,
  AlertCircle,
  Brain,
  Footprints,
  Watch,
  Utensils,
  Lightbulb
} from 'lucide-react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend
} from 'recharts';

const FIREBASE_URL =
  "https://neurowatch-b3b08-default-rtdb.firebaseio.com/watch_data.json";

const tabs = [
  { name: 'Dashboard', path: '/dashboard' },
  { name: 'Gait', path: '/gait' },
  { name: 'Voice', path: '/voice' },
  { name: 'Smartwatch', path: '/smartwatch' },
  { name: 'Lifestyle', path: '/lifestyle' },
  { name: 'History', path: '/history' },
  { name: 'Appointments', path: '/appointments' },
  { name: 'Support', path: '/support' },
];

const progressData: any[] = []; // unchanged

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

interface ProgressBarProps {
  label: string;
  value: number;
  color: string;
}

function ProgressBar({ label, value, color }: ProgressBarProps) {
  return (
    <div className="mb-4">
      <div className="flex justify-between mb-2">
        <span className="text-[#0F172A]">{label}</span>
        <span className="text-[#64748B]">{value}%</span>
      </div>
      <div className="w-full bg-[#F1F5F9] rounded-full h-3">
        <div
          className={`h-3 rounded-full ${color}`}
          style={{ width: `${value}%` }}
        />
      </div>
    </div>
  );
}

export function Dashboard() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('Dashboard');

  // 🔥 Firebase States
  const [heartRate, setHeartRate] = useState<string>("--");
  const [muscleMovement, setMuscleMovement] = useState<string>("--");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(FIREBASE_URL);
        const data = await res.json();

        if (data) {
          setHeartRate(data.heartRate ? `${data.heartRate} bpm` : "--");
          setMuscleMovement(data.muscleMovement || "--");
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
      {/* Top Navigation */}
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
                className={`px-5 py-3 transition-colors ${
                  activeTab === tab.name
                    ? 'text-[#2563EB] border-b-2 border-[#2563EB]'
                    : 'text-[#64748B] hover:text-[#0F172A]'
                }`}
              >
                {tab.name}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="mb-8">
          <h1 className="text-[#0F172A] text-3xl font-semibold mb-2">
            Welcome 👋
          </h1>
          <p className="text-[#64748B]">
            Your health overview
          </p>
        </div>

        {/* Metric Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <MetricCard
            title="Gait Score"
            value="--"
            icon={<Footprints className="w-6 h-6 text-white" />}
            color="bg-[#2563EB]"
          />
          <MetricCard
            title="Tremor Level"
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
            value="--"
            icon={<AlertCircle className="w-6 h-6 text-white" />}
            color="bg-[#F59E0B]"
          />
        </div>

        {/* Health Overview */}
        <div className="bg-white rounded-xl shadow-sm p-6 border border-[#E2E8F0] mb-8">
          <div className="flex items-center gap-2 mb-6">
            <Brain className="w-5 h-5 text-[#2563EB]" />
            <h2 className="text-[#0F172A] text-xl font-semibold">
              Health Overview
            </h2>
          </div>

          <ProgressBar label="Gait" value={0} color="bg-[#2563EB]" />
          <ProgressBar label="Tremor" value={0} color="bg-[#22C55E]" />
          <ProgressBar label="Muscle Movement" value={0} color="bg-[#38BDF8]" />
          <ProgressBar label="Voice Stability" value={0} color="bg-[#8B5CF6]" />
        </div>

        {/* Progress Chart */}
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
