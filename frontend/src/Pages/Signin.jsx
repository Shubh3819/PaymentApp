import { useState } from "react";
import Heading from "../components/Heading";
import InputBox from "../components/InputBox";
import SubHeading from "../components/SubHeading";
import Button from "../components/Button";
import BottomWarning from "../components/BottomWarning";
import api from "../api/axiosInstance";
import { useNavigate } from "react-router-dom";


const PRIMARY_ACCENT = 'rgb(244, 114, 182)'; 
const DARK_TEXT = 'rgb(39, 39, 42)';        
const LIGHT_BG = 'rgb(255, 247, 250)';       

export default function Signin() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  async function submit() {
    setLoading(true);
    try {
      const res = await api.post("/user/signin", { username, password });
      localStorage.setItem("token", res.data.token);
      navigate("/dashboard");
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Signin failed");
    } finally {
      setLoading(false);
    }
  }


  return (
    
    <div className="h-screen flex justify-center items-center" style={{ background: LIGHT_BG }}>

      
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
          
         
          <h2 className="text-2xl font-bold mb-1" style={{ color: DARK_TEXT }}>Sign In to NonPay</h2>
          <SubHeading>Enter your credentials to access your account</SubHeading>

          <InputBox
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Enter your Email"
            label="Email"
           
          />

          <InputBox
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your Password"
            label="Password"
            type="password"
          />

          
          <div className="flex justify-between items-center text-sm px-4 pt-2 pb-4">
              <div className="flex items-center">
                  <input
                      id="remember-me"
                      name="remember-me"
                      type="checkbox"
                      className="h-4 w-4 border-gray-300 rounded"
                      style={{ accentColor: PRIMARY_ACCENT }}
                  />
                  <label htmlFor="remember-me" className="ml-2 text-gray-700">
                      Remember me
                  </label>
              </div>

              <button 
                  type="button" 
                  onClick={() => navigate("/forgot-password")}
                  className="font-medium hover:text-pink-600 transition duration-200"
                  style={{ color: PRIMARY_ACCENT }}
              >
                  Forgot Password?
              </button>
          </div>

          <div className="p-4 pt-0">
        
            <button
                onClick={submit}
                disabled={loading}
               
                className="w-full text-white font-semibold py-3 rounded-full shadow-lg transition duration-300 disabled:opacity-50"
                style={{ backgroundColor: DARK_TEXT }} 
            >
                {loading ? "Signing in..." : "LOGIN"}
            </button>
          </div>

          <BottomWarning label={"Don't have an account?"} buttontext={"Sign up"} to={"/signup"} />
        </div>
      </div>
    </div>
  );
}