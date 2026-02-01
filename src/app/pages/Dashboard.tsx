import { useState } from 'react';
import { useNavigate } from 'react-router';
import { Activity, Heart, TrendingUp, AlertCircle, Brain, Footprints, Watch, Utensils, User, Lightbulb, Headphones } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

const user = JSON.parse(localStorage.getItem("user") || "{}");

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

// Historical data for progress charts
const progressData = [
  { date: 'Jan 28', gait: 86, tremor: 91, voice: 84, muscle: 76 },
  { date: 'Jan 29', gait: 82, tremor: 85, voice: 80, muscle: 74 },
  { date: 'Jan 30', gait: 85, tremor: 90, voice: 86, muscle: 78 },
  { date: 'Jan 31', gait: 84, tremor: 88, voice: 82, muscle: 75 },
  { date: 'Feb 1', gait: 87, tremor: 92, voice: 85, muscle: 78 },
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
      <p className="text-[#0F172A] text-3xl" style={{ fontWeight: 600 }}>{value}</p>
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
const user = JSON.parse(localStorage.getItem("user") || "{}");      <div className="w-full bg-[#F1F5F9] rounded-full h-3">
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

  const handleTabClick = (tab: typeof tabs[0]) => {
    setActiveTab(tab.name);
    navigate(tab.path);
  };

  return (
  <>
    <div className="mb-6 px-6">
      <h1 className="text-2xl font-semibold text-[#0F172A]">
        Welcome {user.username || "User"} 👋
      </h1>
    </div>

    <div
      className="min-h-screen"
      style={{ backgroundColor: '#F8FAFC', fontFamily: 'Inter, sans-serif' }}
    >
      {/* Top Navigation */}
      <div className="bg-white shadow-sm border-b border-[#E2E8F0]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-[#2563EB] rounded-lg flex items-center justify-center">
                <Activity className="w-5 h-5 text-white" />
              </div>
              <span className="text-[#0F172A] text-xl" style={{ fontWeight: 600 }}>NeuroWatch</span>
            </div>
          </div>
          
          {/* Tabs */}
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
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-[#0F172A] text-3xl mb-2" style={{ fontWeight: 600 }}>Welcome back, John</h1>
          <p className="text-[#64748B]">Here's your health overview for February 1, 2026</p>
        </div>

        {/* Metric Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <MetricCard
            title="Gait Score"
            value="87"
            icon={<Footprints className="w-6 h-6 text-white" />}
            color="bg-[#2563EB]"
          />
          <MetricCard
            title="Tremor Level"
            value="Low"
            icon={<Activity className="w-6 h-6 text-white" />}
            color="bg-[#22C55E]"
          />
          <MetricCard
            title="Heart Rate"
            value="72 bpm"
            icon={<Heart className="w-6 h-6 text-white" />}
            color="bg-[#38BDF8]"
          />
          <MetricCard
            title="Neuro Risk Level"
            value="Medium"
            icon={<AlertCircle className="w-6 h-6 text-white" />}
            color="bg-[#F59E0B]"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Health Overview Panel */}
          <div className="bg-white rounded-xl shadow-sm p-6 border border-[#E2E8F0]">
            <div className="flex items-center gap-2 mb-6">
              <Brain className="w-5 h-5 text-[#2563EB]" />
              <h2 className="text-[#0F172A] text-xl" style={{ fontWeight: 600 }}>Health Overview</h2>
            </div>
            
            <ProgressBar label="Gait" value={87} color="bg-[#2563EB]" />
            <ProgressBar label="Tremor" value={92} color="bg-[#22C55E]" />
            <ProgressBar label="Muscle Movement" value={78} color="bg-[#38BDF8]" />
            <ProgressBar label="Voice Stability" value={85} color="bg-[#8B5CF6]" />
          </div>

          {/* Daily Log Panel */}
          <div className="bg-white rounded-xl shadow-sm p-6 border border-[#E2E8F0]">
            <div className="flex items-center gap-2 mb-6">
              <Utensils className="w-5 h-5 text-[#2563EB]" />
              <h2 className="text-[#0F172A] text-xl" style={{ fontWeight: 600 }}>Daily Log</h2>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-[#22C55E] rounded-full mt-2" />
                <div className="flex-1">
                  <p className="text-[#0F172A]">Breakfast</p>
                  <p className="text-[#64748B] text-sm">Oatmeal with berries, green tea</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-[#22C55E] rounded-full mt-2" />
                <div className="flex-1">
                  <p className="text-[#0F172A]">Lunch</p>
                  <p className="text-[#64748B] text-sm">Grilled chicken salad, water</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-[#22C55E] rounded-full mt-2" />
                <div className="flex-1">
                  <p className="text-[#0F172A]">Sleep</p>
                  <p className="text-[#64748B] text-sm">7.5 hours</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-[#22C55E] rounded-full mt-2" />
                <div className="flex-1">
                  <p className="text-[#0F172A]">Activity</p>
                  <p className="text-[#64748B] text-sm">30 min morning walk</p>
                </div>
              </div>
            </div>
          </div>

          {/* AI Suggestions Panel */}
          <div className="bg-white rounded-xl shadow-sm p-6 border border-[#E2E8F0] lg:col-span-2">
            <div className="flex items-center gap-2 mb-6">
              <Lightbulb className="w-5 h-5 text-[#2563EB]" />
              <h2 className="text-[#0F172A] text-xl" style={{ fontWeight: 600 }}>AI Suggestions</h2>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-[#22C55E]/10 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <TrendingUp className="w-4 h-4 text-[#22C55E]" />
                </div>
                <div>
                  <p className="text-[#0F172A]">Your gait score has improved by 5% this week. Keep up the regular walking routine.</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-[#2563EB]/10 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <Watch className="w-4 h-4 text-[#2563EB]" />
                </div>
                <div>
                  <p className="text-[#0F172A]">Consider syncing your smartwatch more frequently for better tremor monitoring.</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-[#F59E0B]/10 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <AlertCircle className="w-4 h-4 text-[#F59E0B]" />
                </div>
                <div>
                  <p className="text-[#0F172A]">Your sleep duration was below 7 hours for 3 days. Aim for 7-9 hours for optimal health.</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-[#38BDF8]/10 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <Heart className="w-4 h-4 text-[#38BDF8]" />
                </div>
                <div>
                  <p className="text-[#0F172A]">Heart rate variability is stable. Continue with your current exercise routine.</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Progress Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">
          <div className="bg-white rounded-xl shadow-sm p-6 border border-[#E2E8F0]">
            <div className="flex items-center gap-2 mb-6">
              <Brain className="w-5 h-5 text-[#2563EB]" />
              <h2 className="text-[#0F172A] text-xl" style={{ fontWeight: 600 }}>Progress Charts</h2>
            </div>
            
            <ResponsiveContainer width="100%" height={300}>
              <LineChart
                data={progressData}
                margin={{
                  top: 5,
                  right: 30,
                  left: 20,
                  bottom: 5,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="gait" stroke="#2563EB" activeDot={{ r: 8 }} />
                <Line type="monotone" dataKey="tremor" stroke="#22C55E" activeDot={{ r: 8 }} />
                <Line type="monotone" dataKey="voice" stroke="#8B5CF6" activeDot={{ r: 8 }} />
                <Line type="monotone" dataKey="muscle" stroke="#38BDF8" activeDot={{ r: 8 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
 </>
 );
}
