import { useState } from 'react';
import { useNavigate } from 'react-router';
import { Activity, Lightbulb, TrendingUp, AlertCircle, Heart, Brain, CheckCircle } from 'lucide-react';

const tabs = [
  { name: 'Dashboard', path: '/dashboard' },
  { name: 'Gait', path: '/gait' },
  { name: 'Voice', path: '/voice' },
  { name: 'Smartwatch', path: '/smartwatch' },
  { name: 'Lifestyle', path: '/lifestyle' },
  { name: 'History', path: '/history' },
  { name: 'Appointments', path: '/appointments' },
  { name: 'Support', path: '/support' },
  { name: 'Suggestions', path: '/suggestions' },
];

interface SuggestionCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  iconBg: string;
  priority: 'high' | 'medium' | 'low';
}

function SuggestionCard({ title, description, icon, iconBg, priority }: SuggestionCardProps) {
  const priorityColors = {
    high: 'text-[#EF4444] bg-[#EF4444]/10',
    medium: 'text-[#F59E0B] bg-[#F59E0B]/10',
    low: 'text-[#22C55E] bg-[#22C55E]/10',
  };

  const priorityLabels = {
    high: 'High Priority',
    medium: 'Medium Priority',
    low: 'Low Priority',
  };

  return (
    <div className="bg-white rounded-xl shadow-sm p-6 border border-[#E2E8F0]">
      <div className="flex items-start gap-4">
        <div className={`w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0 ${iconBg}`}>
          {icon}
        </div>
        <div className="flex-1">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-[#0F172A]" style={{ fontWeight: 600 }}>{title}</h3>
            <span className={`text-xs px-3 py-1 rounded-full ${priorityColors[priority]}`}>
              {priorityLabels[priority]}
            </span>
          </div>
          <p className="text-[#64748B]">{description}</p>
        </div>
      </div>
    </div>
  );
}

export function Suggestions() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('Suggestions');

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
      <div className="max-w-5xl mx-auto px-6 py-8">
        <div className="mb-8">
          <h1 className="text-[#0F172A] text-3xl mb-2" style={{ fontWeight: 600 }}>AI-Powered Suggestions</h1>
          <p className="text-[#64748B]">Personalized recommendations based on your health data</p>
        </div>

        {/* Summary Card */}
        <div className="bg-gradient-to-r from-[#2563EB] to-[#38BDF8] rounded-xl shadow-sm p-8 mb-8 text-white">
          <div className="flex items-center gap-3 mb-4">
            <Lightbulb className="w-8 h-8" />
            <h2 className="text-2xl" style={{ fontWeight: 600 }}>Today's Insights</h2>
          </div>
          <p className="text-white/90 mb-4">
            You're making great progress! Your gait score has improved by 5% this week, and your overall health metrics are trending positively.
          </p>
          <div className="flex gap-4">
            <div className="flex items-center gap-2">
              <CheckCircle className="w-5 h-5" />
              <span>3 Goals Achieved</span>
            </div>
            <div className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5" />
              <span>Overall Score: 85/100</span>
            </div>
          </div>
        </div>

        {/* Suggestions List */}
        <div className="space-y-4">
          <SuggestionCard
            title="Improve Sleep Schedule"
            description="Your sleep duration was below 7 hours for 3 consecutive days. Try to maintain a consistent bedtime and aim for 7-9 hours of sleep for optimal neurological health."
            icon={<AlertCircle className="w-6 h-6 text-[#F59E0B]" />}
            iconBg="bg-[#F59E0B]/10"
            priority="high"
          />

          <SuggestionCard
            title="Increase Gait Analysis Frequency"
            description="Your last gait analysis was 5 days ago. Weekly analysis helps track subtle changes in walking patterns. Consider uploading a new video for analysis."
            icon={<TrendingUp className="w-6 h-6 text-[#F59E0B]" />}
            iconBg="bg-[#F59E0B]/10"
            priority="medium"
          />

          <SuggestionCard
            title="Sync Smartwatch More Often"
            description="Regular device synchronization ensures real-time monitoring of tremor levels and heart rate variability. Try syncing at least twice daily for best results."
            icon={<Heart className="w-6 h-6 text-[#2563EB]" />}
            iconBg="bg-[#2563EB]/10"
            priority="medium"
          />

          <SuggestionCard
            title="Maintain Current Exercise Routine"
            description="Your 30-minute daily walks are contributing to improved gait scores and overall mobility. Keep up the excellent work!"
            icon={<CheckCircle className="w-6 h-6 text-[#22C55E]" />}
            iconBg="bg-[#22C55E]/10"
            priority="low"
          />

          <SuggestionCard
            title="Dietary Improvements Noticed"
            description="Your consistent breakfast routine with berries and oatmeal is providing good antioxidants. Consider adding omega-3 rich foods to your dinner for additional brain health benefits."
            icon={<Brain className="w-6 h-6 text-[#22C55E]" />}
            iconBg="bg-[#22C55E]/10"
            priority="low"
          />

          <SuggestionCard
            title="Voice Stability Monitoring"
            description="Your voice stability score is good at 85%. Continue with regular speech exercises and consider tracking this metric weekly."
            icon={<TrendingUp className="w-6 h-6 text-[#22C55E]" />}
            iconBg="bg-[#22C55E]/10"
            priority="low"
          />
        </div>
      </div>
    </div>
  );
}