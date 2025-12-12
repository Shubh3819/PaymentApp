import { useState } from "react";
import Heading from "../components/Heading";
import InputBox from "../components/InputBox";
import SubHeading from "../components/SubHeading";
import Button from "../components/Button";
import BottomWarning from "../components/BottomWarning";
import api from "../api/axiosInstance";
import { useNavigate } from "react-router-dom";

// Define the consistent color scheme (must match HomePage and SigninPage)
const PRIMARY_ACCENT = 'rgb(244, 114, 182)'; // Soft Rose
const DARK_TEXT = 'rgb(39, 39, 42)';         // Dark Zinc Text
const LIGHT_BG = 'rgb(255, 247, 250)';       // Very light rose background

export default function Signup() {
  const navigate = useNavigate();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  async function submit() {
    if (!firstName || !lastName || !username || !password) {
      alert("Please fill all fields");
      return;
    }

    setLoading(true);
    try {
      const res = await api.post("/user/signup", { username, firstName, lastName, password });
      localStorage.setItem("token", res.data.token);
      navigate("/signin");
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Signup failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    // Background container styled to match the light pink mood board
    <div className="h-screen flex justify-center items-center" style={{ background: LIGHT_BG }}>
      
      {/* Glassmorphism Outer Container (Applying the blur background effect) */}
      <div 
        className="flex flex-col justify-center p-8 backdrop-blur-md rounded-3xl"
        style={{
       
          backgroundColor: 'rgba(255, 255, 255, 0.5)', 
        
          boxShadow: '0 8px 32px 0 rgba(140, 140, 140, 0.37)',
          border: '1px solid rgba(255, 255, 255, 0.18)',
          width: '350px', 
        }}
      >
        <div className="w-full text-center p-2">
          

          <h2 className="text-2xl font-bold mb-1" style={{ color: DARK_TEXT }}>Create Your Account</h2>
          <SubHeading>Enter your information to create an account</SubHeading>

          <InputBox value={firstName} onChange={(e) => setFirstName(e.target.value)} placeholder="Enter your First name" label="First name" />

          <InputBox value={lastName} onChange={(e) => setLastName(e.target.value)} placeholder="Enter your Last Name" label="Last name" />

          <InputBox value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Enter your Email" label="Email" type="email" />

          <InputBox value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Enter your Password" label="Password" type="password" />

          <div className="p-4 pt-0">
        
            <button
                onClick={submit}
                disabled={loading}
                
                className="w-full text-white font-semibold py-3 rounded-full shadow-lg transition duration-300 disabled:opacity-50"
                style={{ backgroundColor: DARK_TEXT }} 
            >
                {loading ? "Signing up..." : "Sign up"}
            </button>
          </div>

          <BottomWarning 
            label={"Already have an account?"} 
            buttontext={"Sign in"} 
            to={"/signin"} 
            
          />
        </div>
      </div>
    </div>
  );
}