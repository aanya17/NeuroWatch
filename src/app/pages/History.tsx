import { useState } from 'react';
import { useNavigate } from 'react-router';
import { Activity, Calendar, ChevronDown, ChevronUp, TrendingUp, TrendingDown, Minus, Download } from 'lucide-react';

const tabs = [
  { name: 'Dashboard', path: '/dashboard' },
  { name: 'Gait', path: '/gait' },
  { name: 'Voice', path: '/voice' },
  { name: 'Smartwatch', path: '/smartwatch' },
  { name: 'Lifestyle', path: '/lifestyle' },
  { name: 'History', path: '/history' },
  { name: 'Appointments', path: '/appointments' },
  { name: 'Profile', path: '/profile' },
];

interface DailyRecord {
  date: string;
  gaitScore: number;
  tremorLevel: number;
  voiceStability: number;
  heartRate: number;
  sleepHours: number;
  steps: number;
  medications: { name: string; dosage: string; time: string }[];
  symptoms: string[];
  activities: string[];
  meals: { type: string; description: string; time: string }[];
  notes: string;
  expanded?: boolean;
}

const dailyRecords: DailyRecord[] = [
  {
    date: '2026-02-01',
    gaitScore: 87,
    tremorLevel: 92,
    voiceStability: 85,
    heartRate: 72,
    sleepHours: 7.5,
    steps: 8234,
    medications: [
      { name: 'Levodopa', dosage: '100mg', time: '8:00 AM' },
      { name: 'Carbidopa', dosage: '25mg', time: '8:00 AM' },
    ],
    symptoms: ['Slight morning stiffness', 'Improved by midday'],
    activities: ['30 min morning walk', '15 min stretching exercises'],
    meals: [
      { type: 'Breakfast', description: 'Oatmeal with berries, green tea', time: '8:30 AM' },
      { type: 'Lunch', description: 'Grilled chicken salad, water', time: '12:30 PM' },
      { type: 'Dinner', description: 'Baked salmon with vegetables', time: '6:30 PM' },
    ],
    notes: 'Good day overall. Morning stiffness resolved after walk. Feeling energetic.',
  },
  {
    date: '2026-01-31',
    gaitScore: 84,
    tremorLevel: 88,
    voiceStability: 82,
    heartRate: 75,
    sleepHours: 6.5,
    steps: 6547,
    medications: [
      { name: 'Levodopa', dosage: '100mg', time: '8:00 AM' },
      { name: 'Carbidopa', dosage: '25mg', time: '8:00 AM' },
    ],
    symptoms: ['Mild tremor in right hand', 'Slightly fatigued'],
    activities: ['20 min walk', 'Physical therapy session'],
    meals: [
      { type: 'Breakfast', description: 'Scrambled eggs, whole wheat toast', time: '8:00 AM' },
      { type: 'Lunch', description: 'Turkey sandwich, apple', time: '1:00 PM' },
      { type: 'Dinner', description: 'Pasta with marinara sauce', time: '7:00 PM' },
    ],
    notes: 'Slightly tired today. Physical therapy session went well.',
  },
  {
    date: '2026-01-30',
    gaitScore: 85,
    tremorLevel: 90,
    voiceStability: 86,
    heartRate: 70,
    sleepHours: 8.0,
    steps: 9120,
    medications: [
      { name: 'Levodopa', dosage: '100mg', time: '8:00 AM' },
      { name: 'Carbidopa', dosage: '25mg', time: '8:00 AM' },
    ],
    symptoms: ['No significant symptoms'],
    activities: ['45 min walk in park', '20 min yoga'],
    meals: [
      { type: 'Breakfast', description: 'Greek yogurt with granola', time: '8:15 AM' },
      { type: 'Lunch', description: 'Quinoa bowl with vegetables', time: '12:00 PM' },
      { type: 'Dinner', description: 'Grilled chicken with sweet potato', time: '6:00 PM' },
    ],
    notes: 'Excellent day! Good sleep and active morning. Feeling strong.',
  },
  {
    date: '2026-01-29',
    gaitScore: 82,
    tremorLevel: 85,
    voiceStability: 80,
    heartRate: 78,
    sleepHours: 6.0,
    steps: 5234,
    medications: [
      { name: 'Levodopa', dosage: '100mg', time: '8:00 AM' },
      { name: 'Carbidopa', dosage: '25mg', time: '8:00 AM' },
    ],
    symptoms: ['Increased tremor', 'Difficulty with fine motor skills'],
    activities: ['Short 15 min walk'],
    meals: [
      { type: 'Breakfast', description: 'Cereal with milk', time: '9:00 AM' },
      { type: 'Lunch', description: 'Soup and crackers', time: '1:30 PM' },
      { type: 'Dinner', description: 'Takeout pizza', time: '8:00 PM' },
    ],
    notes: 'Not feeling great today. Poor sleep affected energy levels.',
  },
  {
    date: '2026-01-28',
    gaitScore: 86,
    tremorLevel: 91,
    voiceStability: 84,
    heartRate: 71,
    sleepHours: 7.0,
    steps: 7890,
    medications: [
      { name: 'Levodopa', dosage: '100mg', time: '8:00 AM' },
      { name: 'Carbidopa', dosage: '25mg', time: '8:00 AM' },
    ],
    symptoms: ['Minor morning stiffness'],
    activities: ['30 min walk', '10 min balance exercises'],
    meals: [
      { type: 'Breakfast', description: 'Smoothie with protein powder', time: '8:00 AM' },
      { type: 'Lunch', description: 'Chicken wrap with salad', time: '12:30 PM' },
      { type: 'Dinner', description: 'Stir-fry with brown rice', time: '6:30 PM' },
    ],
    notes: 'Solid day. Balance exercises helping with stability.',
  },
];

export function History() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('History');
  const [expandedRecords, setExpandedRecords] = useState<Set<string>>(new Set());

  const handleTabClick = (tab: typeof tabs[0]) => {
    setActiveTab(tab.name);
    navigate(tab.path);
  };

  const toggleRecord = (date: string) => {
    const newExpanded = new Set(expandedRecords);
    if (newExpanded.has(date)) {
      newExpanded.delete(date);
    } else {
      newExpanded.add(date);
    }
    setExpandedRecords(newExpanded);
  };

  const getComparisonIcon = (current: number, previous: number) => {
    if (current > previous) return <TrendingUp className="w-4 h-4 text-[#22C55E]" />;
    if (current < previous) return <TrendingDown className="w-4 h-4 text-[#EF4444]" />;
    return <Minus className="w-4 h-4 text-[#64748B]" />;
  };

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
  };

  const handleExportReport = () => {
    alert('Downloading detailed patient report for doctor review...');
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
          <div className="flex gap-1 overflow-x-auto">
            {tabs.map((tab) => (
              <button
                key={tab.name}
                onClick={() => handleTabClick(tab)}
                className={`px-5 py-3 transition-colors whitespace-nowrap ${
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
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-[#0F172A] text-3xl mb-2" style={{ fontWeight: 600 }}>Daily Health History</h1>
            <p className="text-[#64748B]">Detailed records for doctor review and progress tracking</p>
          </div>
          <button
            onClick={handleExportReport}
            className="flex items-center gap-2 px-6 py-3 bg-[#2563EB] text-white rounded-lg hover:bg-[#1d4ed8] transition-colors"
          >
            <Download className="w-5 h-5" />
            Export Report
          </button>
        </div>

        {/* Summary Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white rounded-xl shadow-sm p-4 border border-[#E2E8F0]">
            <p className="text-[#64748B] text-sm mb-1">Avg Gait Score</p>
            <p className="text-[#0F172A] text-2xl" style={{ fontWeight: 600 }}>85</p>
          </div>
          <div className="bg-white rounded-xl shadow-sm p-4 border border-[#E2E8F0]">
            <p className="text-[#64748B] text-sm mb-1">Avg Sleep</p>
            <p className="text-[#0F172A] text-2xl" style={{ fontWeight: 600 }}>7.0h</p>
          </div>
          <div className="bg-white rounded-xl shadow-sm p-4 border border-[#E2E8F0]">
            <p className="text-[#64748B] text-sm mb-1">Avg Steps</p>
            <p className="text-[#0F172A] text-2xl" style={{ fontWeight: 600 }}>7,405</p>
          </div>
          <div className="bg-white rounded-xl shadow-sm p-4 border border-[#E2E8F0]">
            <p className="text-[#64748B] text-sm mb-1">Days Tracked</p>
            <p className="text-[#0F172A] text-2xl" style={{ fontWeight: 600 }}>{dailyRecords.length}</p>
          </div>
        </div>

        {/* Daily Records */}
        <div className="space-y-4">
          {dailyRecords.map((record, index) => {
            const isExpanded = expandedRecords.has(record.date);
            const previousRecord = dailyRecords[index + 1];

            return (
              <div key={record.date} className="bg-white rounded-xl shadow-sm border border-[#E2E8F0] overflow-hidden">
                {/* Summary Header */}
                <div
                  onClick={() => toggleRecord(record.date)}
                  className="p-6 cursor-pointer hover:bg-[#F8FAFC] transition-colors"
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <Calendar className="w-5 h-5 text-[#2563EB]" />
                      <h3 className="text-[#0F172A] text-lg" style={{ fontWeight: 600 }}>
                        {formatDate(record.date)}
                      </h3>
                    </div>
                    {isExpanded ? (
                      <ChevronUp className="w-5 h-5 text-[#64748B]" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-[#64748B]" />
                    )}
                  </div>

                  {/* Quick Stats */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="flex items-center justify-between">
                      <span className="text-[#64748B] text-sm">Gait</span>
                      <div className="flex items-center gap-2">
                        <span className="text-[#0F172A]">{record.gaitScore}</span>
                        {previousRecord && getComparisonIcon(record.gaitScore, previousRecord.gaitScore)}
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-[#64748B] text-sm">Tremor</span>
                      <div className="flex items-center gap-2">
                        <span className="text-[#0F172A]">{record.tremorLevel}</span>
                        {previousRecord && getComparisonIcon(record.tremorLevel, previousRecord.tremorLevel)}
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-[#64748B] text-sm">Voice</span>
                      <div className="flex items-center gap-2">
                        <span className="text-[#0F172A]">{record.voiceStability}</span>
                        {previousRecord && getComparisonIcon(record.voiceStability, previousRecord.voiceStability)}
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-[#64748B] text-sm">Sleep</span>
                      <div className="flex items-center gap-2">
                        <span className="text-[#0F172A]">{record.sleepHours}h</span>
                        {previousRecord && getComparisonIcon(record.sleepHours, previousRecord.sleepHours)}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Detailed Information */}
                {isExpanded && (
                  <div className="border-t border-[#E2E8F0] p-6 space-y-6">
                    {/* Vital Metrics */}
                    <div>
                      <h4 className="text-[#0F172A] mb-3" style={{ fontWeight: 600 }}>Vital Metrics</h4>
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                        <div className="p-3 bg-[#F8FAFC] rounded-lg">
                          <p className="text-[#64748B] text-sm">Heart Rate</p>
                          <p className="text-[#0F172A] text-lg">{record.heartRate} bpm</p>
                        </div>
                        <div className="p-3 bg-[#F8FAFC] rounded-lg">
                          <p className="text-[#64748B] text-sm">Steps</p>
                          <p className="text-[#0F172A] text-lg">{record.steps.toLocaleString()}</p>
                        </div>
                        <div className="p-3 bg-[#F8FAFC] rounded-lg">
                          <p className="text-[#64748B] text-sm">Sleep Duration</p>
                          <p className="text-[#0F172A] text-lg">{record.sleepHours} hours</p>
                        </div>
                      </div>
                    </div>

                    {/* Medications */}
                    <div>
                      <h4 className="text-[#0F172A] mb-3" style={{ fontWeight: 600 }}>Medications</h4>
                      <div className="space-y-2">
                        {record.medications.map((med, idx) => (
                          <div key={idx} className="flex items-center justify-between p-3 bg-[#F8FAFC] rounded-lg">
                            <div>
                              <p className="text-[#0F172A]">{med.name}</p>
                              <p className="text-[#64748B] text-sm">{med.dosage}</p>
                            </div>
                            <span className="text-[#64748B] text-sm">{med.time}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Symptoms */}
                    <div>
                      <h4 className="text-[#0F172A] mb-3" style={{ fontWeight: 600 }}>Symptoms</h4>
                      <div className="space-y-2">
                        {record.symptoms.map((symptom, idx) => (
                          <div key={idx} className="flex items-start gap-2 p-3 bg-[#F8FAFC] rounded-lg">
                            <div className="w-2 h-2 bg-[#F59E0B] rounded-full mt-2" />
                            <p className="text-[#0F172A]">{symptom}</p>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Activities */}
                    <div>
                      <h4 className="text-[#0F172A] mb-3" style={{ fontWeight: 600 }}>Activities</h4>
                      <div className="space-y-2">
                        {record.activities.map((activity, idx) => (
                          <div key={idx} className="flex items-start gap-2 p-3 bg-[#F8FAFC] rounded-lg">
                            <div className="w-2 h-2 bg-[#22C55E] rounded-full mt-2" />
                            <p className="text-[#0F172A]">{activity}</p>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Meals */}
                    <div>
                      <h4 className="text-[#0F172A] mb-3" style={{ fontWeight: 600 }}>Meals</h4>
                      <div className="space-y-2">
                        {record.meals.map((meal, idx) => (
                          <div key={idx} className="p-3 bg-[#F8FAFC] rounded-lg">
                            <div className="flex items-center justify-between mb-1">
                              <p className="text-[#0F172A]">{meal.type}</p>
                              <span className="text-[#64748B] text-sm">{meal.time}</span>
                            </div>
                            <p className="text-[#64748B] text-sm">{meal.description}</p>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Notes */}
                    <div>
                      <h4 className="text-[#0F172A] mb-3" style={{ fontWeight: 600 }}>Personal Notes</h4>
                      <div className="p-4 bg-[#F8FAFC] rounded-lg">
                        <p className="text-[#0F172A]">{record.notes}</p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
