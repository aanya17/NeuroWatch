import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Activity } from 'lucide-react';

const PROFILE_URL =
  "https://neurowatch-b3b08-default-rtdb.firebaseio.com/user_profile.json";

export function Profile() {
  const navigate = useNavigate();

  const [fullName, setFullName] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");

  // 🔥 Load Profile
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await fetch(PROFILE_URL);
        const data = await res.json();

        if (data) {
          setFullName(data.fullName || "");
          setAge(data.age || "");
          setGender(data.gender || "");
        }
      } catch (error) {
        console.error("Profile fetch error:", error);
      }
    };

    fetchProfile();
  }, []);

  // 🔥 Save Profile
  const saveProfile = async () => {
    try {
      await fetch(PROFILE_URL, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName,
          age,
          gender
        })
      });

      alert("Profile saved successfully!");
    } catch (error) {
      console.error("Save error:", error);
    }
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] font-sans p-8">

      <div className="flex items-center gap-3 mb-8">
        <div className="w-10 h-10 bg-[#2563EB] rounded-lg flex items-center justify-center">
          <Activity className="w-5 h-5 text-white" />
        </div>
        <h1 className="text-2xl font-semibold">Profile</h1>
      </div>

      <div className="bg-white p-6 rounded-xl shadow-sm border border-[#E2E8F0] max-w-md">

        <input
          type="text"
          placeholder="Full Name"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          className="border p-3 rounded w-full mb-4"
        />

        <input
          type="number"
          placeholder="Age"
          value={age}
          onChange={(e) => setAge(e.target.value)}
          className="border p-3 rounded w-full mb-4"
        />

        <input
          type="text"
          placeholder="Gender"
          value={gender}
          onChange={(e) => setGender(e.target.value)}
          className="border p-3 rounded w-full mb-4"
        />

        <button
          onClick={saveProfile}
          className="bg-blue-600 text-white px-6 py-3 rounded w-full"
        >
          Save Profile
        </button>

      </div>
    </div>
  );
}
