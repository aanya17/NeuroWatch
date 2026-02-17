import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Activity,
  CheckCircle2,
  AlertCircle
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
  pitch: number;
  volume: number;
  clarity: number;
  tremor: number;
  fluency: number;
}

export function VoiceAnalysis() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('Voice');
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] =
    useState<VoiceAnalysisResult | null>(null);

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

  const handleAnalyze = async () => {
    if (!uploadedFile) return;

    setIsAnalyzing(true);

    // Simulate AI processing
    setTimeout(async () => {
      const result: VoiceAnalysisResult = {
        overallScore: 82,
        pitch: 88,
        volume: 75,
        clarity: 90,
        tremor: 78,
        fluency: 85,
      };

      setAnalysisResult(result);

      // 🔥 Save EVERYTHING to Firebase
      try {
        await fetch(FIREBASE_URL, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            voiceScore: result.overallScore,
            voiceDetails: {
              pitch: result.pitch,
              volume: result.volume,
              clarity: result.clarity,
              tremor: result.tremor,
              fluency: result.fluency,
            },
          }),
        });
      } catch (error) {
        console.error("Firebase save error:", error);
      }

      setIsAnalyzing(false);
    }, 2500);
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] font-sans">
      
      {/* Top Nav */}
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

        <h1 className="text-3xl font-semibold mb-6">
          Voice Analysis
        </h1>

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
              <p className="mb-3">{uploadedFile.name}</p>

              <button
                onClick={handleAnalyze}
                disabled={isAnalyzing}
                className="px-6 py-3 bg-[#22C55E] text-white rounded-lg"
              >
                {isAnalyzing ? "Analyzing..." : "Analyze Voice"}
              </button>
            </div>
          )}
        </div>

        {analysisResult && (
          <div className="bg-white rounded-xl shadow-sm p-8 border border-[#E2E8F0]">
            <h2 className="text-2xl font-semibold mb-4">
              Voice Stability Score: {analysisResult.overallScore}
            </h2>

            <div className="space-y-2">
              <p>Pitch: {analysisResult.pitch}%</p>
              <p>Volume: {analysisResult.volume}%</p>
              <p>Clarity: {analysisResult.clarity}%</p>
              <p>Tremor Control: {analysisResult.tremor}%</p>
              <p>Fluency: {analysisResult.fluency}%</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
