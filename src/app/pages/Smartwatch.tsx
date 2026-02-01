import { useState } from 'react';
import { useNavigate } from 'react-router';
import { Activity, CheckCircle, Heart, TrendingUp, Gauge, Volume2, RefreshCw } from 'lucide-react';

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

interface MetricCardProps {
  title: string;
  value: string;
  icon: React.ReactNode;
  color: string;
  status?: string;
}

function MetricCard({ title, value, icon, color, status }: MetricCardProps) {
  return (
    <div className="bg-white rounded-xl shadow-sm p-6 border border-[#E2E8F0]">
      <div className="flex items-center justify-between mb-4">
        <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${color}`}>
          {icon}
        </div>
        {status && (
          <span className="text-sm text-[#22C55E] bg-[#22C55E]/10 px-3 py-1 rounded-full">
            {status}
          </span>
        )}
      </div>
      <h3 className="text-[#64748B] mb-1">{title}</h3>
      <p className="text-[#0F172A] text-3xl" style={{ fontWeight: 600 }}>{value}</p>
    </div>
  );
}

export function Smartwatch() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('Smartwatch');

  const handleTabClick = (tab: typeof tabs[0]) => {
    setActiveTab(tab.name);
    navigate(tab.path);
  };

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#F8FAFC', fontFamily: 'Inter, sans-serif' }}>
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
        <div className="mb-8">
          <h1 className="text-[#0F172A] text-3xl mb-2" style={{ fontWeight: 600 }}>Smartwatch Data</h1>
          <p className="text-[#64748B]">Real-time health metrics from your connected device</p>
        </div>

        {/* Device Status */}
        <div className="bg-white rounded-xl shadow-sm p-6 border border-[#E2E8F0] mb-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <CheckCircle className="w-5 h-5 text-[#22C55E]" />
              <div>
                <h3 className="text-[#0F172A]" style={{ fontWeight: 600 }}>Device Status</h3>
                <p className="text-[#64748B] text-sm">Last synced: 5 minutes ago</p>
              </div>
            </div>
            <span className="text-[#22C55E] bg-[#22C55E]/10 px-4 py-2 rounded-lg" style={{ fontWeight: 600 }}>
              Connected
            </span>
          </div>
        </div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
          <MetricCard
            title="Heart Rate"
            value="72 bpm"
            icon={<Heart className="w-6 h-6 text-white" />}
            color="bg-[#38BDF8]"
            status="Normal"
          />
          <MetricCard
            title="Blood Pressure"
            value="120/80"
            icon={<Gauge className="w-6 h-6 text-white" />}
            color="bg-[#22C55E]"
            status="Normal"
          />
          <MetricCard
            title="Tremor"
            value="Low"
            icon={<Activity className="w-6 h-6 text-white" />}
            color="bg-[#2563EB]"
            status="Good"
          />
          <MetricCard
            title="Muscle Movement"
            value="78%"
            icon={<TrendingUp className="w-6 h-6 text-white" />}
            color="bg-[#8B5CF6]"
          />
          <MetricCard
            title="Voice Stability"
            value="85%"
            icon={<Volume2 className="w-6 h-6 text-white" />}
            color="bg-[#EC4899]"
          />
        </div>

        {/* Sync Button */}
        <div className="bg-white rounded-xl shadow-sm p-6 border border-[#E2E8F0]">
          <button
            onClick={() => alert('Syncing device...')}
            className="w-full flex items-center justify-center gap-2 bg-[#2563EB] text-white py-4 rounded-lg hover:bg-[#1d4ed8] transition-colors"
          >
            <RefreshCw className="w-5 h-5" />
            Sync Device
          </button>
        </div>
      </div>
    </div>
  );
}