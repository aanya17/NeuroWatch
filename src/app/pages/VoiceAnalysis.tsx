import { useState, useRef } from 'react';
import { useNavigate } from 'react-router';
import {
  Activity,
  Mic,
  Upload,
  Play,
  Pause,
  X,
  CheckCircle2,
  AlertCircle,
  TrendingUp,
  Volume2
} from 'lucide-react';

const FIREBASE_URL =
  "https://neurowatch-b3b08-default-rtdb.firebaseio.com/watch_data.json";

const tabs = [
  { name: 'Dashboard', path: '/dashboard' },
  { name: 'Gait', path: '/gait' },
  { name: 'Voice', path: '/voice' },
  { name: 'Smartwatch', path: '/smartwatch' },
  { name: 'Lifestyle', path: '/lifestyle' },
  { name: 'Appointments', path: '/appointments' },
  { name: 'Profile', path: '/profile' },
  { name: 'Suggestions', path: '/suggestions' },
];

interface VoiceAnalysisResult {
  overallScore: number;
  pitch: { value: number; status: 'normal' | 'concern' };
  volume: { value: number; status: 'normal' | 'concern' };
  clarity: { value: number; status: 'normal' | 'concern' };
  tremor: { value: number; status: 'normal' | 'concern' };
  fluency: { value: number; status: 'normal' | 'concern' };
  recommendations: string[];
}

export function VoiceAnalysis() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('Voice');
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<VoiceAnalysisResult | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleTabClick = (tab: typeof tabs[0]) => {
    setActiveTab(tab.name);
    navigate(tab.path);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type.startsWith('audio/')) {
      setUploadedFile(file);
      setAnalysisResult(null);
    }
  };

  // 🔥 UPDATED ANALYZE FUNCTION
  const handleAnalyze = () => {
    setIsAnalyzing(true);

    setTimeout(async () => {
      const mockResult: VoiceAnalysisResult = {
        overallScore: 82,
        pitch: { value: 88, status: 'normal' },
        volume: { value: 75, status: 'concern' },
        clarity: { value: 90, status: 'normal' },
        tremor: { value: 78, status: 'concern' },
        fluency: { value: 85, status: 'normal' },
        recommendations: [
          'Pitch variation is within normal range.',
          'Volume consistency shows slight variation.',
          'Speech clarity is excellent.',
          'Minor tremor detected in sustained vowel sounds.',
          'Speech fluency is good.',
        ],
      };

      setAnalysisResult(mockResult);

      // 🔥 SAVE TO FIREBASE
      try {
        await fetch(FIREBASE_URL, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            voiceScore: mockResult.overallScore,
          }),
        });
      } catch (error) {
        console.error("Error saving voice score:", error);
      }

      setIsAnalyzing(false);
    }, 3000);
  };

  const getStatusColor = (status: 'normal' | 'concern') =>
    status === 'normal' ? 'text-[#22C55E]' : 'text-[#F59E0B]';

  const getStatusIcon = (status: 'normal' | 'concern') =>
    status === 'normal'
      ? <CheckCircle2 className="w-5 h-5 text-[#22C55E]" />
      : <AlertCircle className="w-5 h-5 text-[#F59E0B]" />;

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

      {/* Content */}
      <div className="max-w-4xl mx-auto px-6 py-8">

        <h1 className="text-3xl font-semibold mb-6">Voice Analysis</h1>

        {/* Upload */}
        <div className="bg-white rounded-xl shadow-sm p-8 border border-[#E2E8F0] mb-6">
          <input
            ref={fileInputRef}
            type="file"
            accept="audio/*"
            onChange={handleFileUpload}
            className="hidden"
          />
          <button
            onClick={() => fileInputRef.current?.click()}
            className="px-6 py-3 bg-[#8B5CF6] text-white rounded-lg"
          >
            Upload Audio
          </button>

          {uploadedFile && (
            <div className="mt-4">
              <p>{uploadedFile.name}</p>
              <button
                onClick={handleAnalyze}
                disabled={isAnalyzing}
                className="mt-4 px-6 py-3 bg-[#22C55E] text-white rounded-lg"
              >
                {isAnalyzing ? "Analyzing..." : "Analyze Voice"}
              </button>
            </div>
          )}
        </div>

        {/* Results */}
        {analysisResult && (
          <div className="bg-white rounded-xl shadow-sm p-8 border border-[#E2E8F0]">
            <h2 className="text-2xl font-semibold mb-4">
              Voice Stability Score: {analysisResult.overallScore}
            </h2>

            {analysisResult.recommendations.map((rec, i) => (
              <p key={i} className="mb-2">{rec}</p>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
