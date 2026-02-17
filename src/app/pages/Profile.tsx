import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
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

const PROFILE_URL =
  "https://neurowatch-b3b08-default-rtdb.firebaseio.com/user_profile.json";

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

const progressData: any[] = [];

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

  // 🔥 Watch Data States
  const [heartRate, setHeartRate] = useState<string>("--");
  const [muscleMovement, setMuscleMovement] = useState<string>("--");

  // 🔥 Profile States
  const [fullName, setFullName] = useState<string>("");
  const [age, setAge] = useState<string>("");
  const [gender, setGender] = useState<string>("");

  // 🔥 Load Watch Data
  useEffect(() => {
    const fetchWatchData = async () => {
      try {
        const res = await fetch(FIREBASE_URL);
        const data = await res.json();

        if (data) {
          setHeartRate(data.heartRate ? `${data.heartRate} bpm` : "--");
          setMuscleMovement(data.muscleMovement || "--");
        }
      } catch (error) {
        console.error("Firebase watch error:", error);
      }
    };

    fetchWatchData();
    const interval = setInterval(fetchWatchData, 3000);
    return () => clearInterval(interval);
  }, []);

  // 🔥 Load Profile Data
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await fetch(PROFILE_URL);
        const data = await res.json();

        if (data) {
          setFullName(data.fullName || "");
          setAge(data.age || "");
          setGender(data.gender || "");
        }
      } catch (error) {
        console.error("Profile fetch error:", error);
      }
    };

    fetchProfile();
  }, []);

  // 🔥 Save Profile
  const saveProfile = async () => {
    try {
      await fetch(PROFILE_URL, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName,
          age,
          gender
        })
      });

      alert("Profile Updated Successfully!");
    } catch (error) {
      console.error("Profile save error:", error);
    }
  };

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
            Welcome {fullName || "User"} 👋
          </h1>
          <p className="text-[#64748B]">
            Your health overview
          </p>
        </div>

        {/* Profile Section */}
        <div className="bg-white rounded-xl shadow-sm p-6 border border-[#E2E8F0] mb-8">
          <h2 className="text-xl font-semibold mb-4">Profile</h2>

          <input
            type="text"
            placeholder="Full Name"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            className="border p-2 rounded w-full mb-3"
          />

          <input
            type="text"
            placeholder="Age"
            value={age}
            onChange={(e) => setAge(e.target.value)}
            className="border p-2 rounded w-full mb-3"
          />

          <input
            type="text"
            placeholder="Gender"
            value={gender}
            onChange={(e) => setGender(e.target.value)}
            className="border p-2 rounded w-full mb-3"
          />

          <button
            onClick={saveProfile}
            className="bg-blue-600 text-white px-4 py-2 rounded"
          >
            Save Profile
          </button>
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
      </div>
    </div>
  );
}
