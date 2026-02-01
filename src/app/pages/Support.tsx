import { useState } from 'react';
import { useNavigate } from 'react-router';
import { Activity, MessageCircle, Phone, Mail, Clock, Send, HelpCircle, FileText } from 'lucide-react';

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

interface FAQItem {
  question: string;
  answer: string;
}

const faqs: FAQItem[] = [
  {
    question: 'How accurate is the gait analysis?',
    answer: 'Our AI-powered gait analysis uses advanced computer vision algorithms with 95% accuracy in detecting movement patterns associated with neurodegenerative conditions. However, it should be used as a screening tool and not replace professional medical diagnosis.',
  },
  {
    question: 'How often should I upload voice recordings?',
    answer: 'We recommend recording voice samples 2-3 times per week for optimal tracking. Consistency helps our AI detect subtle changes in voice stability over time.',
  },
  {
    question: 'Can I share my health data with my doctor?',
    answer: 'Yes! You can export comprehensive health reports from the History page and share them directly with your healthcare provider during appointments.',
  },
  {
    question: 'What devices are compatible with NeuroWatch?',
    answer: 'NeuroWatch is compatible with most modern smartphones and smartwatches including Apple Watch, Samsung Galaxy Watch, and Fitbit devices.',
  },
  {
    question: 'How secure is my health data?',
    answer: 'Your health data is encrypted end-to-end and stored securely following HIPAA compliance standards. We never share your personal health information without your explicit consent.',
  },
];

export function Support() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('Support');
  const [expandedFAQ, setExpandedFAQ] = useState<number | null>(null);
  const [contactForm, setContactForm] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleTabClick = (tab: typeof tabs[0]) => {
    setActiveTab(tab.name);
    navigate(tab.path);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setContactForm({ name: '', email: '', subject: '', message: '' });
    }, 3000);
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
      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="mb-8">
          <h1 className="text-[#0F172A] text-3xl mb-2" style={{ fontWeight: 600 }}>Customer Support</h1>
          <p className="text-[#64748B]">We're here to help you with any questions or concerns</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* Contact Methods */}
          <div className="bg-white rounded-xl shadow-sm p-6 border border-[#E2E8F0]">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-[#2563EB]/10 rounded-full flex items-center justify-center">
                <Phone className="w-6 h-6 text-[#2563EB]" />
              </div>
              <div>
                <h3 className="text-[#0F172A]" style={{ fontWeight: 600 }}>Call Us</h3>
                <p className="text-[#64748B] text-sm">24/7 Support</p>
              </div>
            </div>
            <p className="text-[#2563EB] text-lg">1-800-NEURO-WATCH</p>
            <p className="text-[#64748B] text-sm mt-2">Available 24 hours a day, 7 days a week</p>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6 border border-[#E2E8F0]">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-[#22C55E]/10 rounded-full flex items-center justify-center">
                <Mail className="w-6 h-6 text-[#22C55E]" />
              </div>
              <div>
                <h3 className="text-[#0F172A]" style={{ fontWeight: 600 }}>Email Us</h3>
                <p className="text-[#64748B] text-sm">Response within 24h</p>
              </div>
            </div>
            <p className="text-[#22C55E] text-lg">support@neurowatch.com</p>
            <p className="text-[#64748B] text-sm mt-2">We'll respond within 24 hours</p>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6 border border-[#E2E8F0]">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-[#8B5CF6]/10 rounded-full flex items-center justify-center">
                <MessageCircle className="w-6 h-6 text-[#8B5CF6]" />
              </div>
              <div>
                <h3 className="text-[#0F172A]" style={{ fontWeight: 600 }}>Live Chat</h3>
                <p className="text-[#64748B] text-sm">Instant support</p>
              </div>
            </div>
            <button className="w-full mt-2 px-4 py-2 bg-[#8B5CF6] text-white rounded-lg hover:bg-[#7C3AED] transition-colors">
              Start Chat
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Contact Form */}
          <div className="bg-white rounded-xl shadow-sm p-8 border border-[#E2E8F0]">
            <div className="flex items-center gap-2 mb-6">
              <Send className="w-5 h-5 text-[#2563EB]" />
              <h2 className="text-[#0F172A] text-xl" style={{ fontWeight: 600 }}>Send Us a Message</h2>
            </div>

            {submitted ? (
              <div className="py-12 text-center">
                <div className="w-16 h-16 bg-[#22C55E]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Send className="w-8 h-8 text-[#22C55E]" />
                </div>
                <h3 className="text-[#0F172A] text-xl mb-2" style={{ fontWeight: 600 }}>Message Sent!</h3>
                <p className="text-[#64748B]">We'll get back to you within 24 hours.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-[#0F172A] mb-2">
                    Name
                  </label>
                  <input
                    id="name"
                    type="text"
                    value={contactForm.name}
                    onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                    className="w-full px-4 py-3 border border-[#E2E8F0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2563EB] focus:border-transparent"
                    placeholder="Your name"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-[#0F172A] mb-2">
                    Email
                  </label>
                  <input
                    id="email"
                    type="email"
                    value={contactForm.email}
                    onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                    className="w-full px-4 py-3 border border-[#E2E8F0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2563EB] focus:border-transparent"
                    placeholder="your@email.com"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="subject" className="block text-[#0F172A] mb-2">
                    Subject
                  </label>
                  <select
                    id="subject"
                    value={contactForm.subject}
                    onChange={(e) => setContactForm({ ...contactForm, subject: e.target.value })}
                    className="w-full px-4 py-3 border border-[#E2E8F0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2563EB] focus:border-transparent bg-white"
                    required
                  >
                    <option value="">Select a subject</option>
                    <option value="technical">Technical Support</option>
                    <option value="account">Account Questions</option>
                    <option value="billing">Billing Inquiry</option>
                    <option value="feature">Feature Request</option>
                    <option value="medical">Medical Data Concerns</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="message" className="block text-[#0F172A] mb-2">
                    Message
                  </label>
                  <textarea
                    id="message"
                    value={contactForm.message}
                    onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                    rows={5}
                    className="w-full px-4 py-3 border border-[#E2E8F0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2563EB] focus:border-transparent resize-none"
                    placeholder="How can we help you?"
                    required
                  />
                </div>

                <button
                  type="submit"
                  className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-[#2563EB] text-white rounded-lg hover:bg-[#1d4ed8] transition-colors"
                >
                  <Send className="w-5 h-5" />
                  Send Message
                </button>
              </form>
            )}
          </div>

          {/* FAQ Section */}
          <div className="bg-white rounded-xl shadow-sm p-8 border border-[#E2E8F0]">
            <div className="flex items-center gap-2 mb-6">
              <HelpCircle className="w-5 h-5 text-[#2563EB]" />
              <h2 className="text-[#0F172A] text-xl" style={{ fontWeight: 600 }}>Frequently Asked Questions</h2>
            </div>

            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <div key={index} className="border border-[#E2E8F0] rounded-lg overflow-hidden">
                  <button
                    onClick={() => setExpandedFAQ(expandedFAQ === index ? null : index)}
                    className="w-full px-4 py-3 flex items-center justify-between bg-white hover:bg-[#F8FAFC] transition-colors text-left"
                  >
                    <span className="text-[#0F172A]" style={{ fontWeight: 600 }}>{faq.question}</span>
                    <HelpCircle className="w-5 h-5 text-[#64748B] flex-shrink-0" />
                  </button>
                  {expandedFAQ === index && (
                    <div className="px-4 py-3 bg-[#F8FAFC] border-t border-[#E2E8F0]">
                      <p className="text-[#64748B]">{faq.answer}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Support Hours */}
            <div className="mt-6 p-4 bg-[#F8FAFC] rounded-lg border border-[#E2E8F0]">
              <div className="flex items-center gap-2 mb-2">
                <Clock className="w-5 h-5 text-[#2563EB]" />
                <h3 className="text-[#0F172A]" style={{ fontWeight: 600 }}>Support Hours</h3>
              </div>
              <p className="text-[#64748B] text-sm">Monday - Friday: 8:00 AM - 8:00 PM EST</p>
              <p className="text-[#64748B] text-sm">Saturday - Sunday: 9:00 AM - 5:00 PM EST</p>
              <p className="text-[#22C55E] text-sm mt-2">Emergency support available 24/7</p>
            </div>

            {/* Documentation */}
            <div className="mt-4">
              <button className="w-full flex items-center justify-center gap-2 px-6 py-3 border border-[#E2E8F0] text-[#2563EB] rounded-lg hover:bg-[#F8FAFC] transition-colors">
                <FileText className="w-5 h-5" />
                View Documentation
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
