import { useState, useRef } from 'react';
import { useNavigate } from 'react-router';
import { Activity, Mic, Upload, Play, Pause, X, CheckCircle2, AlertCircle, TrendingUp, Volume2 } from 'lucide-react';

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
  const [isRecording, setIsRecording] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<VoiceAnalysisResult | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const recordingIntervalRef = useRef<NodeJS.Timeout | null>(null);

  const handleTabClick = (tab: typeof tabs[0]) => {
    setActiveTab(tab.name);
    navigate(tab.path);
  };

  const startRecording = () => {
    setIsRecording(true);
    setRecordingTime(0);
    recordingIntervalRef.current = setInterval(() => {
      setRecordingTime((prev) => prev + 1);
    }, 1000);
  };

  const stopRecording = () => {
    setIsRecording(false);
    if (recordingIntervalRef.current) {
      clearInterval(recordingIntervalRef.current);
    }
    // Simulate saving recording
    const blob = new Blob([''], { type: 'audio/wav' });
    const file = new File([blob], 'recording.wav', { type: 'audio/wav' });
    setUploadedFile(file);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type.startsWith('audio/')) {
      setUploadedFile(file);
      setAnalysisResult(null);
    }
  };

  const handleAnalyze = () => {
    setIsAnalyzing(true);
    
    // Simulate analysis with realistic results
    setTimeout(() => {
      const mockResult: VoiceAnalysisResult = {
        overallScore: 82,
        pitch: { value: 88, status: 'normal' },
        volume: { value: 75, status: 'concern' },
        clarity: { value: 90, status: 'normal' },
        tremor: { value: 78, status: 'concern' },
        fluency: { value: 85, status: 'normal' },
        recommendations: [
          'Your voice pitch variation is within normal range, indicating good vocal cord control.',
          'Volume consistency shows slight variations. Consider vocal exercises to improve volume stability.',
          'Speech clarity is excellent with clear articulation of words.',
          'Minor tremor detected in sustained vowel sounds. This may indicate early signs of vocal tremor.',
          'Speech fluency is good with minimal hesitations or interruptions.',
          'Recommendation: Practice sustained vowel exercises (holding "ahh" for 5-10 seconds) daily.',
          'Consider consulting with a speech-language pathologist for vocal strengthening exercises.',
        ],
      };
      setAnalysisResult(mockResult);
      setIsAnalyzing(false);
    }, 3000);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const getStatusColor = (status: 'normal' | 'concern') => {
    return status === 'normal' ? 'text-[#22C55E]' : 'text-[#F59E0B]';
  };

  const getStatusIcon = (status: 'normal' | 'concern') => {
    return status === 'normal' ? (
      <CheckCircle2 className="w-5 h-5 text-[#22C55E]" />
    ) : (
      <AlertCircle className="w-5 h-5 text-[#F59E0B]" />
    );
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
      <div className="max-w-4xl mx-auto px-6 py-8">
        <div className="mb-8">
          <h1 className="text-[#0F172A] text-3xl mb-2" style={{ fontWeight: 600 }}>Voice Analysis</h1>
          <p className="text-[#64748B]">Analyze voice stability for early detection of speech-related symptoms</p>
        </div>

        {/* Recording/Upload Section */}
        <div className="bg-white rounded-xl shadow-sm p-8 border border-[#E2E8F0] mb-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Record Audio */}
            <div className="flex flex-col items-center justify-center p-6 border-2 border-dashed border-[#E2E8F0] rounded-xl">
              <Mic className={`w-16 h-16 mb-4 ${isRecording ? 'text-[#EF4444] animate-pulse' : 'text-[#2563EB]'}`} />
              <h3 className="text-[#0F172A] mb-2" style={{ fontWeight: 600 }}>Record Voice</h3>
              <p className="text-[#64748B] text-sm text-center mb-4">
                {isRecording ? `Recording: ${formatTime(recordingTime)}` : 'Click to start recording'}
              </p>
              {!isRecording ? (
                <button
                  onClick={startRecording}
                  className="flex items-center gap-2 px-6 py-3 bg-[#2563EB] text-white rounded-lg hover:bg-[#1d4ed8] transition-colors"
                >
                  <Mic className="w-5 h-5" />
                  Start Recording
                </button>
              ) : (
                <button
                  onClick={stopRecording}
                  className="flex items-center gap-2 px-6 py-3 bg-[#EF4444] text-white rounded-lg hover:bg-[#DC2626] transition-colors"
                >
                  <Pause className="w-5 h-5" />
                  Stop Recording
                </button>
              )}
            </div>

            {/* Upload Audio */}
            <div className="flex flex-col items-center justify-center p-6 border-2 border-dashed border-[#E2E8F0] rounded-xl">
              <Upload className="w-16 h-16 text-[#8B5CF6] mb-4" />
              <h3 className="text-[#0F172A] mb-2" style={{ fontWeight: 600 }}>Upload Audio</h3>
              <p className="text-[#64748B] text-sm text-center mb-4">
                Upload an audio file for analysis
              </p>
              <input
                ref={fileInputRef}
                type="file"
                accept="audio/*"
                onChange={handleFileUpload}
                className="hidden"
              />
              <button
                onClick={() => fileInputRef.current?.click()}
                className="flex items-center gap-2 px-6 py-3 bg-[#8B5CF6] text-white rounded-lg hover:bg-[#7C3AED] transition-colors"
              >
                <Upload className="w-5 h-5" />
                Choose File
              </button>
            </div>
          </div>

          {/* Uploaded File Display */}
          {uploadedFile && (
            <div className="mt-6 p-4 bg-[#F8FAFC] rounded-lg border border-[#E2E8F0]">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Volume2 className="w-5 h-5 text-[#2563EB]" />
                  <div>
                    <p className="text-[#0F172A]">{uploadedFile.name}</p>
                    <p className="text-[#64748B] text-sm">Ready for analysis</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setIsPlaying(!isPlaying)}
                    className="p-2 hover:bg-white rounded-lg transition-colors"
                  >
                    {isPlaying ? (
                      <Pause className="w-5 h-5 text-[#2563EB]" />
                    ) : (
                      <Play className="w-5 h-5 text-[#2563EB]" />
                    )}
                  </button>
                  <button
                    onClick={() => setUploadedFile(null)}
                    className="p-2 hover:bg-white rounded-lg transition-colors"
                  >
                    <X className="w-5 h-5 text-[#64748B]" />
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Analyze Button */}
          {uploadedFile && !analysisResult && (
            <div className="mt-6">
              <button
                onClick={handleAnalyze}
                disabled={isAnalyzing}
                className="w-full flex items-center justify-center gap-2 px-6 py-4 bg-[#22C55E] text-white rounded-lg hover:bg-[#16A34A] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isAnalyzing ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Analyzing Voice...
                  </>
                ) : (
                  <>
                    <TrendingUp className="w-5 h-5" />
                    Analyze Voice
                  </>
                )}
              </button>
            </div>
          )}
        </div>

        {/* Analysis Results */}
        {analysisResult && (
          <div className="space-y-6">
            {/* Overall Score */}
            <div className="bg-white rounded-xl shadow-sm p-8 border border-[#E2E8F0]">
              <div className="text-center">
                <h2 className="text-[#0F172A] text-2xl mb-4" style={{ fontWeight: 600 }}>Voice Stability Score</h2>
                <div className="relative inline-flex items-center justify-center">
                  <svg className="w-40 h-40">
                    <circle
                      cx="80"
                      cy="80"
                      r="70"
                      fill="none"
                      stroke="#E2E8F0"
                      strokeWidth="12"
                    />
                    <circle
                      cx="80"
                      cy="80"
                      r="70"
                      fill="none"
                      stroke="#2563EB"
                      strokeWidth="12"
                      strokeDasharray={`${analysisResult.overallScore * 4.4} 440`}
                      strokeLinecap="round"
                      transform="rotate(-90 80 80)"
                    />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-5xl text-[#0F172A]" style={{ fontWeight: 600 }}>
                      {analysisResult.overallScore}
                    </span>
                  </div>
                </div>
                <p className="text-[#64748B] mt-4">Out of 100</p>
              </div>
            </div>

            {/* Detailed Metrics */}
            <div className="bg-white rounded-xl shadow-sm p-8 border border-[#E2E8F0]">
              <h2 className="text-[#0F172A] text-xl mb-6" style={{ fontWeight: 600 }}>Detailed Analysis</h2>
              
              <div className="space-y-6">
                {/* Pitch */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      {getStatusIcon(analysisResult.pitch.status)}
                      <span className="text-[#0F172A]">Pitch Stability</span>
                    </div>
                    <span className={getStatusColor(analysisResult.pitch.status)}>
                      {analysisResult.pitch.value}%
                    </span>
                  </div>
                  <div className="w-full bg-[#F1F5F9] rounded-full h-2">
                    <div
                      className="h-2 bg-[#2563EB] rounded-full"
                      style={{ width: `${analysisResult.pitch.value}%` }}
                    />
                  </div>
                </div>

                {/* Volume */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      {getStatusIcon(analysisResult.volume.status)}
                      <span className="text-[#0F172A]">Volume Consistency</span>
                    </div>
                    <span className={getStatusColor(analysisResult.volume.status)}>
                      {analysisResult.volume.value}%
                    </span>
                  </div>
                  <div className="w-full bg-[#F1F5F9] rounded-full h-2">
                    <div
                      className="h-2 bg-[#8B5CF6] rounded-full"
                      style={{ width: `${analysisResult.volume.value}%` }}
                    />
                  </div>
                </div>

                {/* Clarity */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      {getStatusIcon(analysisResult.clarity.status)}
                      <span className="text-[#0F172A]">Speech Clarity</span>
                    </div>
                    <span className={getStatusColor(analysisResult.clarity.status)}>
                      {analysisResult.clarity.value}%
                    </span>
                  </div>
                  <div className="w-full bg-[#F1F5F9] rounded-full h-2">
                    <div
                      className="h-2 bg-[#22C55E] rounded-full"
                      style={{ width: `${analysisResult.clarity.value}%` }}
                    />
                  </div>
                </div>

                {/* Tremor */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      {getStatusIcon(analysisResult.tremor.status)}
                      <span className="text-[#0F172A]">Voice Tremor Control</span>
                    </div>
                    <span className={getStatusColor(analysisResult.tremor.status)}>
                      {analysisResult.tremor.value}%
                    </span>
                  </div>
                  <div className="w-full bg-[#F1F5F9] rounded-full h-2">
                    <div
                      className="h-2 bg-[#F59E0B] rounded-full"
                      style={{ width: `${analysisResult.tremor.value}%` }}
                    />
                  </div>
                </div>

                {/* Fluency */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      {getStatusIcon(analysisResult.fluency.status)}
                      <span className="text-[#0F172A]">Speech Fluency</span>
                    </div>
                    <span className={getStatusColor(analysisResult.fluency.status)}>
                      {analysisResult.fluency.value}%
                    </span>
                  </div>
                  <div className="w-full bg-[#F1F5F9] rounded-full h-2">
                    <div
                      className="h-2 bg-[#38BDF8] rounded-full"
                      style={{ width: `${analysisResult.fluency.value}%` }}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* AI Recommendations */}
            <div className="bg-white rounded-xl shadow-sm p-8 border border-[#E2E8F0]">
              <h2 className="text-[#0F172A] text-xl mb-6" style={{ fontWeight: 600 }}>AI Recommendations</h2>
              
              <div className="space-y-4">
                {analysisResult.recommendations.map((recommendation, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-[#2563EB]/10 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-[#2563EB] text-xs">{index + 1}</span>
                    </div>
                    <p className="text-[#0F172A] flex-1">{recommendation}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4">
              <button
                onClick={() => {
                  setAnalysisResult(null);
                  setUploadedFile(null);
                }}
                className="flex-1 px-6 py-3 border border-[#E2E8F0] text-[#64748B] rounded-lg hover:bg-[#F8FAFC] transition-colors"
              >
                Analyze Another Recording
              </button>
              <button
                onClick={() => navigate('/appointments')}
                className="flex-1 px-6 py-3 bg-[#2563EB] text-white rounded-lg hover:bg-[#1d4ed8] transition-colors"
              >
                Book Specialist Appointment
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
