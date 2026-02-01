import { useState } from 'react';
import { useNavigate } from 'react-router';
import { Activity, Save, Coffee, Salad, Apple, Utensils, Moon, TrendingUp } from 'lucide-react';

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

export function Lifestyle() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('Lifestyle');
  const [breakfast, setBreakfast] = useState('Oatmeal with berries');
  const [lunch, setLunch] = useState('Grilled chicken salad');
  const [snack, setSnack] = useState('Apple');
  const [dinner, setDinner] = useState('Salmon with vegetables');
  const [sleepHours, setSleepHours] = useState(7.5);
  const [activity, setActivity] = useState('Walking');

  const handleTabClick = (tab: typeof tabs[0]) => {
    setActiveTab(tab.name);
    navigate(tab.path);
  };

  const handleSave = () => {
    alert('Lifestyle data saved successfully!');
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
      <div className="max-w-4xl mx-auto px-6 py-8">
        <div className="mb-8">
          <h1 className="text-[#0F172A] text-3xl mb-2" style={{ fontWeight: 600 }}>Lifestyle Tracking</h1>
          <p className="text-[#64748B]">Log your daily meals, sleep, and activities</p>
        </div>

        {/* Meals Section */}
        <div className="bg-white rounded-xl shadow-sm p-6 border border-[#E2E8F0] mb-6">
          <div className="flex items-center gap-2 mb-6">
            <Utensils className="w-5 h-5 text-[#2563EB]" />
            <h2 className="text-[#0F172A] text-xl" style={{ fontWeight: 600 }}>Meals</h2>
          </div>

          <div className="space-y-4">
            <div>
              <label className="flex items-center gap-2 text-[#0F172A] mb-2">
                <Coffee className="w-4 h-4 text-[#F59E0B]" />
                Breakfast
              </label>
              <input
                type="text"
                value={breakfast}
                onChange={(e) => setBreakfast(e.target.value)}
                className="w-full px-4 py-3 border border-[#E2E8F0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2563EB] focus:border-transparent"
                placeholder="What did you have for breakfast?"
              />
            </div>

            <div>
              <label className="flex items-center gap-2 text-[#0F172A] mb-2">
                <Salad className="w-4 h-4 text-[#22C55E]" />
                Lunch
              </label>
              <input
                type="text"
                value={lunch}
                onChange={(e) => setLunch(e.target.value)}
                className="w-full px-4 py-3 border border-[#E2E8F0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2563EB] focus:border-transparent"
                placeholder="What did you have for lunch?"
              />
            </div>

            <div>
              <label className="flex items-center gap-2 text-[#0F172A] mb-2">
                <Apple className="w-4 h-4 text-[#EF4444]" />
                Snack
              </label>
              <input
                type="text"
                value={snack}
                onChange={(e) => setSnack(e.target.value)}
                className="w-full px-4 py-3 border border-[#E2E8F0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2563EB] focus:border-transparent"
                placeholder="What snacks did you have?"
              />
            </div>

            <div>
              <label className="flex items-center gap-2 text-[#0F172A] mb-2">
                <Utensils className="w-4 h-4 text-[#8B5CF6]" />
                Dinner
              </label>
              <input
                type="text"
                value={dinner}
                onChange={(e) => setDinner(e.target.value)}
                className="w-full px-4 py-3 border border-[#E2E8F0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2563EB] focus:border-transparent"
                placeholder="What did you have for dinner?"
              />
            </div>
          </div>
        </div>

        {/* Sleep Section */}
        <div className="bg-white rounded-xl shadow-sm p-6 border border-[#E2E8F0] mb-6">
          <div className="flex items-center gap-2 mb-6">
            <Moon className="w-5 h-5 text-[#2563EB]" />
            <h2 className="text-[#0F172A] text-xl" style={{ fontWeight: 600 }}>Sleep</h2>
          </div>

          <div>
            <label className="block text-[#0F172A] mb-3">
              Sleep Hours: <span style={{ fontWeight: 600 }}>{sleepHours} hours</span>
            </label>
            <input
              type="range"
              min="0"
              max="12"
              step="0.5"
              value={sleepHours}
              onChange={(e) => setSleepHours(parseFloat(e.target.value))}
              className="w-full h-2 bg-[#E2E8F0] rounded-lg appearance-none cursor-pointer"
              style={{
                accentColor: '#2563EB',
              }}
            />
            <div className="flex justify-between text-sm text-[#64748B] mt-2">
              <span>0h</span>
              <span>6h</span>
              <span>12h</span>
            </div>
          </div>
        </div>

        {/* Activity Section */}
        <div className="bg-white rounded-xl shadow-sm p-6 border border-[#E2E8F0] mb-6">
          <div className="flex items-center gap-2 mb-6">
            <TrendingUp className="w-5 h-5 text-[#2563EB]" />
            <h2 className="text-[#0F172A] text-xl" style={{ fontWeight: 600 }}>Activity</h2>
          </div>

          <div>
            <label className="block text-[#0F172A] mb-2">
              Daily Activity
            </label>
            <select
              value={activity}
              onChange={(e) => setActivity(e.target.value)}
              className="w-full px-4 py-3 border border-[#E2E8F0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2563EB] focus:border-transparent bg-white"
            >
              <option value="Walking">Walking</option>
              <option value="Running">Running</option>
              <option value="Swimming">Swimming</option>
              <option value="Cycling">Cycling</option>
              <option value="Yoga">Yoga</option>
              <option value="Gym">Gym</option>
              <option value="None">None</option>
            </select>
          </div>
        </div>

        {/* Save Button */}
        <button
          onClick={handleSave}
          className="w-full flex items-center justify-center gap-2 bg-[#2563EB] text-white py-4 rounded-lg hover:bg-[#1d4ed8] transition-colors"
        >
          <Save className="w-5 h-5" />
          Save Lifestyle Data
        </button>
      </div>
    </div>
  );
}