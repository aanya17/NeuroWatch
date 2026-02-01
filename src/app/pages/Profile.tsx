import { useState } from 'react';
import { useNavigate } from 'react-router';
import { Activity, Save, User, Mail, Bell, LogOut } from 'lucide-react';
import { useAuth } from '@/app/context/AuthContext';

const tabs = [
  { name: 'Dashboard', path: '/dashboard' },
  { name: 'Gait', path: '/gait' },
  { name: 'Voice', path: '/voice' },
  { name: 'Smartwatch', path: '/smartwatch' },
  { name: 'Lifestyle', path: '/lifestyle' },
  { name: 'History', path: '/history' },
  { name: 'Appointments', path: '/appointments' },
  { name: 'Support', path: '/support' },
  { name: 'Profile', path: '/profile' },
];

export function Profile() {
  const navigate = useNavigate();
  const { user, logout, updateEmailNotifications } = useAuth();
  const [activeTab, setActiveTab] = useState('Profile');
  const [name, setName] = useState(user?.fullName || 'John Doe');
  const [age, setAge] = useState('45');
  const [gender, setGender] = useState('Male');
  const [emailNotifications, setEmailNotifications] = useState(user?.emailNotifications ?? true);

  const handleTabClick = (tab: typeof tabs[0]) => {
    setActiveTab(tab.name);
    navigate(tab.path);
  };

  const handleSave = () => {
    updateEmailNotifications(emailNotifications);
    alert('Profile saved successfully!');
  };

  const handleLogout = () => {
    logout();
    navigate('/');
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
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-4 py-2 text-[#64748B] hover:text-[#EF4444] transition-colors"
            >
              <LogOut className="w-4 h-4" />
              Logout
            </button>
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
      <div className="max-w-2xl mx-auto px-6 py-8">
        <div className="mb-8">
          <h1 className="text-[#0F172A] text-3xl mb-2" style={{ fontWeight: 600 }}>Profile Settings</h1>
          <p className="text-[#64748B]">Manage your personal information</p>
        </div>

        {/* Profile Form */}
        <div className="bg-white rounded-xl shadow-sm p-8 border border-[#E2E8F0] mb-6">
          <div className="flex justify-center mb-8">
            <div className="w-24 h-24 bg-[#2563EB] rounded-full flex items-center justify-center">
              <User className="w-12 h-12 text-white" />
            </div>
          </div>

          <div className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-[#0F172A] mb-2">
                Full Name
              </label>
              <input
                id="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-3 border border-[#E2E8F0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2563EB] focus:border-transparent"
                placeholder="Enter your full name"
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-[#0F172A] mb-2">
                Email
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#64748B]" />
                <input
                  id="email"
                  type="email"
                  value={user?.email || ''}
                  disabled
                  className="w-full pl-11 pr-4 py-3 border border-[#E2E8F0] rounded-lg bg-[#F8FAFC] text-[#64748B]"
                />
              </div>
            </div>

            <div>
              <label htmlFor="age" className="block text-[#0F172A] mb-2">
                Age
              </label>
              <input
                id="age"
                type="number"
                value={age}
                onChange={(e) => setAge(e.target.value)}
                className="w-full px-4 py-3 border border-[#E2E8F0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2563EB] focus:border-transparent"
                placeholder="Enter your age"
              />
            </div>

            <div>
              <label htmlFor="gender" className="block text-[#0F172A] mb-2">
                Gender
              </label>
              <select
                id="gender"
                value={gender}
                onChange={(e) => setGender(e.target.value)}
                className="w-full px-4 py-3 border border-[#E2E8F0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2563EB] focus:border-transparent bg-white"
              >
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
                <option value="Prefer not to say">Prefer not to say</option>
              </select>
            </div>

            {/* Email Notifications Toggle */}
            <div className="border-t border-[#E2E8F0] pt-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Bell className="w-5 h-5 text-[#2563EB]" />
                  <div>
                    <p className="text-[#0F172A]">Email Notifications</p>
                    <p className="text-[#64748B] text-sm">Receive health updates and alerts via email</p>
                  </div>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={emailNotifications}
                    onChange={(e) => setEmailNotifications(e.target.checked)}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-[#E2E8F0] peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-[#2563EB]/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#2563EB]"></div>
                </label>
              </div>
            </div>

            <div className="pt-4">
              <button
                onClick={handleSave}
                className="w-full flex items-center justify-center gap-2 bg-[#2563EB] text-white py-4 rounded-lg hover:bg-[#1d4ed8] transition-colors"
              >
                <Save className="w-5 h-5" />
                Save Profile
              </button>
            </div>
          </div>
        </div>

        {/* Additional Information */}
        <div className="bg-white rounded-xl shadow-sm p-6 border border-[#E2E8F0]">
          <h3 className="text-[#0F172A] mb-4" style={{ fontWeight: 600 }}>Account Information</h3>
          <div className="space-y-3">
            <div className="flex justify-between py-2 border-b border-[#E2E8F0]">
              <span className="text-[#64748B]">Username</span>
              <span className="text-[#0F172A]">{user?.username || 'N/A'}</span>
            </div>
            <div className="flex justify-between py-2 border-b border-[#E2E8F0]">
              <span className="text-[#64748B]">Member Since</span>
              <span className="text-[#0F172A]">January 2026</span>
            </div>
            <div className="flex justify-between py-2 border-b border-[#E2E8F0]">
              <span className="text-[#64748B]">Account Status</span>
              <span className="text-[#22C55E]">Active</span>
            </div>
            <div className="flex justify-between py-2">
              <span className="text-[#64748B]">Plan</span>
              <span className="text-[#0F172A]">Premium</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}