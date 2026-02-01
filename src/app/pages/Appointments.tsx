import { useState } from 'react';
import { useNavigate } from 'react-router';
import { Activity, Search, Star, Calendar, Clock, MapPin, Video, Phone, User as UserIcon } from 'lucide-react';

const tabs = [
  { name: 'Dashboard', path: '/dashboard' },
  { name: 'Gait', path: '/gait' },
  { name: 'Smartwatch', path: '/smartwatch' },
  { name: 'Lifestyle', path: '/lifestyle' },
  { name: 'Appointments', path: '/appointments' },
  { name: 'Profile', path: '/profile' },
  { name: 'Suggestions', path: '/suggestions' },
];

interface Doctor {
  id: string;
  name: string;
  specialization: string;
  rating: number;
  reviews: number;
  availability: string;
  location: string;
  experience: string;
  consultationType: ('in-person' | 'video' | 'phone')[];
  imageColor: string;
}

const doctors: Doctor[] = [
  {
    id: '1',
    name: 'Dr. Sarah Mitchell',
    specialization: 'Movement Disorders Specialist',
    rating: 4.9,
    reviews: 247,
    availability: 'Available Today',
    location: 'Boston Medical Center',
    experience: '15 years',
    consultationType: ['in-person', 'video', 'phone'],
    imageColor: '#2563EB',
  },
  {
    id: '2',
    name: 'Dr. James Chen',
    specialization: 'Neurologist (Parkinson\'s Disease)',
    rating: 4.8,
    reviews: 189,
    availability: 'Available Tomorrow',
    location: 'Stanford Neuroscience Clinic',
    experience: '12 years',
    consultationType: ['video', 'phone'],
    imageColor: '#8B5CF6',
  },
  {
    id: '3',
    name: 'Dr. Emily Rodriguez',
    specialization: 'Neurologist (Gait & Balance)',
    rating: 4.9,
    reviews: 312,
    availability: 'Next Week',
    location: 'Mayo Clinic',
    experience: '18 years',
    consultationType: ['in-person', 'video'],
    imageColor: '#22C55E',
  },
  {
    id: '4',
    name: 'Dr. Michael Thompson',
    specialization: 'Neurodegenerative Disease Specialist',
    rating: 4.7,
    reviews: 156,
    availability: 'Available Today',
    location: 'Cleveland Clinic',
    experience: '10 years',
    consultationType: ['in-person', 'video', 'phone'],
    imageColor: '#F59E0B',
  },
];

interface Appointment {
  id: string;
  doctorName: string;
  specialization: string;
  date: string;
  time: string;
  type: 'in-person' | 'video' | 'phone';
  status: 'upcoming' | 'completed' | 'cancelled';
}

const upcomingAppointments: Appointment[] = [
  {
    id: '1',
    doctorName: 'Dr. Sarah Mitchell',
    specialization: 'Movement Disorders',
    date: 'Feb 5, 2026',
    time: '10:00 AM',
    type: 'video',
    status: 'upcoming',
  },
  {
    id: '2',
    doctorName: 'Dr. Emily Rodriguez',
    specialization: 'Gait & Balance',
    date: 'Feb 12, 2026',
    time: '2:30 PM',
    type: 'in-person',
    status: 'upcoming',
  },
];

export function Appointments() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('Appointments');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDoctor, setSelectedDoctor] = useState<Doctor | null>(null);
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [consultationType, setConsultationType] = useState<'in-person' | 'video' | 'phone'>('video');
  const [showBookingModal, setShowBookingModal] = useState(false);

  const handleTabClick = (tab: typeof tabs[0]) => {
    setActiveTab(tab.name);
    navigate(tab.path);
  };

  const filteredDoctors = doctors.filter(
    (doctor) =>
      doctor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doctor.specialization.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleBookAppointment = (doctor: Doctor) => {
    setSelectedDoctor(doctor);
    setShowBookingModal(true);
  };

  const handleConfirmBooking = () => {
    alert(`Appointment booked with ${selectedDoctor?.name} on ${selectedDate} at ${selectedTime}`);
    setShowBookingModal(false);
    setSelectedDoctor(null);
    setSelectedDate('');
    setSelectedTime('');
  };

  const timeSlots = [
    '9:00 AM', '9:30 AM', '10:00 AM', '10:30 AM', '11:00 AM', '11:30 AM',
    '2:00 PM', '2:30 PM', '3:00 PM', '3:30 PM', '4:00 PM', '4:30 PM',
  ];

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
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="mb-8">
          <h1 className="text-[#0F172A] text-3xl mb-2" style={{ fontWeight: 600 }}>Book Appointment</h1>
          <p className="text-[#64748B]">Find and schedule appointments with neurologists</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Search and Doctor List */}
          <div className="lg:col-span-2 space-y-6">
            {/* Search Bar */}
            <div className="bg-white rounded-xl shadow-sm p-4 border border-[#E2E8F0]">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#64748B]" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search for neurologists or specializations..."
                  className="w-full pl-11 pr-4 py-3 border border-[#E2E8F0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2563EB] focus:border-transparent"
                />
              </div>
            </div>

            {/* Doctor List */}
            <div className="space-y-4">
              {filteredDoctors.map((doctor) => (
                <div key={doctor.id} className="bg-white rounded-xl shadow-sm p-6 border border-[#E2E8F0]">
                  <div className="flex flex-col md:flex-row gap-4">
                    {/* Doctor Avatar */}
                    <div
                      className="w-20 h-20 rounded-full flex items-center justify-center flex-shrink-0"
                      style={{ backgroundColor: doctor.imageColor }}
                    >
                      <UserIcon className="w-10 h-10 text-white" />
                    </div>

                    {/* Doctor Info */}
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h3 className="text-[#0F172A] text-lg" style={{ fontWeight: 600 }}>{doctor.name}</h3>
                          <p className="text-[#64748B]">{doctor.specialization}</p>
                        </div>
                        <div className="flex items-center gap-1">
                          <Star className="w-4 h-4 fill-[#F59E0B] text-[#F59E0B]" />
                          <span className="text-[#0F172A]">{doctor.rating}</span>
                          <span className="text-[#64748B] text-sm">({doctor.reviews})</span>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mb-4">
                        <div className="flex items-center gap-2 text-sm">
                          <MapPin className="w-4 h-4 text-[#64748B]" />
                          <span className="text-[#64748B]">{doctor.location}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <Clock className="w-4 h-4 text-[#64748B]" />
                          <span className="text-[#64748B]">{doctor.experience} experience</span>
                        </div>
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span
                            className={`px-3 py-1 rounded-full text-sm ${
                              doctor.availability === 'Available Today'
                                ? 'bg-[#22C55E]/10 text-[#22C55E]'
                                : 'bg-[#2563EB]/10 text-[#2563EB]'
                            }`}
                          >
                            {doctor.availability}
                          </span>
                          <div className="flex gap-1">
                            {doctor.consultationType.includes('video') && (
                              <Video className="w-4 h-4 text-[#64748B]" />
                            )}
                            {doctor.consultationType.includes('phone') && (
                              <Phone className="w-4 h-4 text-[#64748B]" />
                            )}
                          </div>
                        </div>
                        <button
                          onClick={() => handleBookAppointment(doctor)}
                          className="px-6 py-2 bg-[#2563EB] text-white rounded-lg hover:bg-[#1d4ed8] transition-colors"
                        >
                          Book Now
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Upcoming Appointments Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-sm p-6 border border-[#E2E8F0] sticky top-6">
              <h2 className="text-[#0F172A] text-xl mb-4" style={{ fontWeight: 600 }}>Upcoming Appointments</h2>
              
              {upcomingAppointments.length > 0 ? (
                <div className="space-y-4">
                  {upcomingAppointments.map((appointment) => (
                    <div key={appointment.id} className="p-4 border border-[#E2E8F0] rounded-lg">
                      <h3 className="text-[#0F172A] mb-1" style={{ fontWeight: 600 }}>{appointment.doctorName}</h3>
                      <p className="text-[#64748B] text-sm mb-3">{appointment.specialization}</p>
                      
                      <div className="space-y-2">
                        <div className="flex items-center gap-2 text-sm">
                          <Calendar className="w-4 h-4 text-[#64748B]" />
                          <span className="text-[#64748B]">{appointment.date}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <Clock className="w-4 h-4 text-[#64748B]" />
                          <span className="text-[#64748B]">{appointment.time}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          {appointment.type === 'video' ? (
                            <Video className="w-4 h-4 text-[#2563EB]" />
                          ) : appointment.type === 'phone' ? (
                            <Phone className="w-4 h-4 text-[#2563EB]" />
                          ) : (
                            <MapPin className="w-4 h-4 text-[#2563EB]" />
                          )}
                          <span className="text-[#2563EB] capitalize">{appointment.type}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-[#64748B] text-center py-8">No upcoming appointments</p>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Booking Modal */}
      {showBookingModal && selectedDoctor && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-8">
            <h2 className="text-[#0F172A] text-2xl mb-6" style={{ fontWeight: 600 }}>Book Appointment</h2>
            
            <div className="mb-6">
              <h3 className="text-[#0F172A] mb-1" style={{ fontWeight: 600 }}>{selectedDoctor.name}</h3>
              <p className="text-[#64748B]">{selectedDoctor.specialization}</p>
            </div>

            <div className="space-y-4">
              {/* Consultation Type */}
              <div>
                <label className="block text-[#0F172A] mb-2">Consultation Type</label>
                <div className="flex gap-2">
                  {selectedDoctor.consultationType.includes('video') && (
                    <button
                      onClick={() => setConsultationType('video')}
                      className={`flex-1 flex items-center justify-center gap-2 py-2 px-4 rounded-lg border transition-colors ${
                        consultationType === 'video'
                          ? 'bg-[#2563EB] text-white border-[#2563EB]'
                          : 'border-[#E2E8F0] text-[#64748B] hover:border-[#2563EB]'
                      }`}
                    >
                      <Video className="w-4 h-4" />
                      Video
                    </button>
                  )}
                  {selectedDoctor.consultationType.includes('phone') && (
                    <button
                      onClick={() => setConsultationType('phone')}
                      className={`flex-1 flex items-center justify-center gap-2 py-2 px-4 rounded-lg border transition-colors ${
                        consultationType === 'phone'
                          ? 'bg-[#2563EB] text-white border-[#2563EB]'
                          : 'border-[#E2E8F0] text-[#64748B] hover:border-[#2563EB]'
                      }`}
                    >
                      <Phone className="w-4 h-4" />
                      Phone
                    </button>
                  )}
                  {selectedDoctor.consultationType.includes('in-person') && (
                    <button
                      onClick={() => setConsultationType('in-person')}
                      className={`flex-1 flex items-center justify-center gap-2 py-2 px-4 rounded-lg border transition-colors ${
                        consultationType === 'in-person'
                          ? 'bg-[#2563EB] text-white border-[#2563EB]'
                          : 'border-[#E2E8F0] text-[#64748B] hover:border-[#2563EB]'
                      }`}
                    >
                      <MapPin className="w-4 h-4" />
                      In-Person
                    </button>
                  )}
                </div>
              </div>

              {/* Date Selection */}
              <div>
                <label htmlFor="date" className="block text-[#0F172A] mb-2">Select Date</label>
                <input
                  id="date"
                  type="date"
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  min={new Date().toISOString().split('T')[0]}
                  className="w-full px-4 py-3 border border-[#E2E8F0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2563EB] focus:border-transparent"
                  required
                />
              </div>

              {/* Time Selection */}
              <div>
                <label className="block text-[#0F172A] mb-2">Select Time</label>
                <div className="grid grid-cols-3 gap-2 max-h-48 overflow-y-auto">
                  {timeSlots.map((time) => (
                    <button
                      key={time}
                      onClick={() => setSelectedTime(time)}
                      className={`py-2 px-3 rounded-lg border text-sm transition-colors ${
                        selectedTime === time
                          ? 'bg-[#2563EB] text-white border-[#2563EB]'
                          : 'border-[#E2E8F0] text-[#64748B] hover:border-[#2563EB]'
                      }`}
                    >
                      {time}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3 mt-6">
              <button
                onClick={() => {
                  setShowBookingModal(false);
                  setSelectedDoctor(null);
                }}
                className="flex-1 px-6 py-3 border border-[#E2E8F0] text-[#64748B] rounded-lg hover:bg-[#F8FAFC] transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmBooking}
                disabled={!selectedDate || !selectedTime}
                className="flex-1 px-6 py-3 bg-[#2563EB] text-white rounded-lg hover:bg-[#1d4ed8] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Confirm Booking
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
