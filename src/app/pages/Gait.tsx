import { useState } from 'react';
import { useNavigate } from 'react-router';
import { Activity, Upload, TrendingUp } from 'lucide-react';

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

export function Gait() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('Gait');
  const [analyzed, setAnalyzed] = useState(false);
  const [fileName, setFileName] = useState('');

  const handleTabClick = (tab: typeof tabs[0]) => {
    setActiveTab(tab.name);
    navigate(tab.path);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFileName(file.name);
      setAnalyzed(false);
    }
  };

  const handleAnalyze = () => {
    if (fileName) {
      // Simulate analysis
      setAnalyzed(true);
    }
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
          <h1 className="text-[#0F172A] text-3xl mb-2" style={{ fontWeight: 600 }}>Gait Analysis</h1>
          <p className="text-[#64748B]">Upload a video to analyze your walking pattern</p>
        </div>

        {/* Upload Area */}
        <div className="bg-white rounded-xl shadow-sm p-8 border border-[#E2E8F0] mb-6">
          <div className="border-2 border-dashed border-[#E2E8F0] rounded-xl p-12 text-center">
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 bg-[#2563EB]/10 rounded-full flex items-center justify-center mb-4">
                <Upload className="w-8 h-8 text-[#2563EB]" />
              </div>
              <h3 className="text-[#0F172A] mb-2" style={{ fontWeight: 600 }}>Upload Video</h3>
              <p className="text-[#64748B] mb-4">Drag and drop a video file or click to browse</p>
              
              <input
                type="file"
                id="video-upload"
                accept="video/*"
                onChange={handleFileChange}
                className="hidden"
              />
              <label
                htmlFor="video-upload"
                className="bg-[#2563EB] text-white px-6 py-3 rounded-lg hover:bg-[#1d4ed8] transition-colors cursor-pointer"
              >
                Choose File
              </label>
              
              {fileName && (
                <p className="mt-4 text-[#22C55E]">Selected: {fileName}</p>
              )}
            </div>
          </div>
        </div>

        {/* Analyze Button */}
        <div className="mb-6">
          <button
            onClick={handleAnalyze}
            disabled={!fileName}
            className={`w-full py-4 rounded-lg transition-colors ${
              fileName
                ? 'bg-[#2563EB] text-white hover:bg-[#1d4ed8]'
                : 'bg-[#E2E8F0] text-[#64748B] cursor-not-allowed'
            }`}
          >
            Analyze Gait
          </button>
        </div>

        {/* Result Card */}
        {analyzed && (
          <div className="bg-white rounded-xl shadow-sm p-8 border border-[#E2E8F0]">
            <div className="flex items-center gap-2 mb-6">
              <TrendingUp className="w-5 h-5 text-[#22C55E]" />
              <h2 className="text-[#0F172A] text-xl" style={{ fontWeight: 600 }}>Analysis Results</h2>
            </div>
            
            <div className="bg-[#F8FAFC] rounded-xl p-8 text-center">
              <div className="mb-4">
                <span className="text-[#64748B]">Gait Score</span>
              </div>
              <div className="text-6xl text-[#22C55E] mb-4" style={{ fontWeight: 600 }}>87</div>
              <div className="text-[#64748B]">Good</div>
            </div>

            <div className="mt-6 space-y-3">
              <div className="flex items-center justify-between p-4 bg-[#F8FAFC] rounded-lg">
                <span className="text-[#0F172A]">Step Length</span>
                <span className="text-[#22C55E]" style={{ fontWeight: 600 }}>Normal</span>
              </div>
              <div className="flex items-center justify-between p-4 bg-[#F8FAFC] rounded-lg">
                <span className="text-[#0F172A]">Stride Width</span>
                <span className="text-[#22C55E]" style={{ fontWeight: 600 }}>Normal</span>
              </div>
              <div className="flex items-center justify-between p-4 bg-[#F8FAFC] rounded-lg">
                <span className="text-[#0F172A]">Walking Speed</span>
                <span className="text-[#F59E0B]" style={{ fontWeight: 600 }}>Slightly Slow</span>
              </div>
              <div className="flex items-center justify-between p-4 bg-[#F8FAFC] rounded-lg">
                <span className="text-[#0F172A]">Balance</span>
                <span className="text-[#22C55E]" style={{ fontWeight: 600 }}>Good</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}