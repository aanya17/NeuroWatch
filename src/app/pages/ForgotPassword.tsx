import { useState } from 'react';
import { useNavigate } from 'react-router';
import { Activity, Mail, ArrowLeft } from 'lucide-react';

export function ForgotPassword() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would send a password reset email
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#F8FAFC', fontFamily: 'Inter, sans-serif' }}>
      <div className="w-full max-w-md px-6">
        <div className="bg-white rounded-2xl shadow-lg p-8">
          {/* Logo and App Name */}
          <div className="flex flex-col items-center mb-8">
            <div className="w-16 h-16 bg-[#2563EB] rounded-full flex items-center justify-center mb-4">
              <Activity className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-3xl text-[#0F172A] mb-2" style={{ fontWeight: 600 }}>Reset Password</h1>
            <p className="text-[#64748B] text-center">
              {submitted 
                ? "Check your email for reset instructions" 
                : "Enter your email to receive password reset instructions"}
            </p>
          </div>

          {!submitted ? (
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label htmlFor="email" className="block text-[#0F172A] mb-2">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#64748B]" />
                  <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-11 pr-4 py-3 border border-[#E2E8F0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2563EB] focus:border-transparent"
                    placeholder="your@email.com"
                    required
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-[#2563EB] text-white py-3 rounded-lg hover:bg-[#1d4ed8] transition-colors"
              >
                Send Reset Link
              </button>
            </form>
          ) : (
            <div className="space-y-4">
              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <p className="text-green-800 text-center">
                  We've sent password reset instructions to <strong>{email}</strong>
                </p>
              </div>
              <p className="text-[#64748B] text-sm text-center">
                Didn't receive the email? Check your spam folder or try again.
              </p>
            </div>
          )}

          {/* Back to Login Link */}
          <div className="mt-6">
            <button
              onClick={() => navigate('/')}
              className="w-full flex items-center justify-center gap-2 text-[#64748B] hover:text-[#2563EB] transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Login
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
