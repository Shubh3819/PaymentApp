import { useNavigate } from "react-router-dom";

const PRIMARY_ACCENT = 'rgb(244, 114, 182)'; 
const LIGHT_BG = 'rgb(255, 247, 250)';       
const DARK_TEXT = 'rgb(39, 39, 42)';       

export default function HomePage() {
  const navigate = useNavigate();

  return (
    
    <div className="min-h-screen bg-gray-50 font-sans overflow-x-hidden">
      
      
      <header className="bg-white shadow-lg sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center">
            
            <div className="w-10 h-10 rounded-full flex items-center justify-center mr-4" style={{ backgroundColor: PRIMARY_ACCENT }}>
              
              <img src="https://imgs.search.brave.com/_jrCNVjUVLeEze18Pbqbv7pcnLRoTbAeHWkkCrdUbu4/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9zMy51/cy1lYXN0LTEuYW1h/em9uYXdzLmNvbS9j/ZG4uZGVzaWduY3Jv/d2QuY29tL2Jsb2cv/MTIwLWNvb2wtbG9n/b3MtZm9yLWEtZnJl/c2gtbmV3LWxvb2sv/cGluay1nbG93aW5n/LW5lb24tYnktY2hv/bGUtYnJhbmRjcm93/ZC5wbmc"
                height="100px" width="100px" alt="Logo" className="w-8 h-8 rounded-full object-cover" />
            </div>
            <div>
              
              <h1 className="text-xl font-bold" style={{ color: DARK_TEXT }}>NonPay</h1>
              <p className="text-sm italic text-gray-500">Fast, Secure, Reliable</p>
            </div>
          </div>
          
          <div className="flex space-x-4 items-center">
            <button type="button" onClick={() => navigate("/signin")} className="font-medium transition duration-300" style={{ color: DARK_TEXT, hover: { color: PRIMARY_ACCENT } }}>
              Sign In
            </button>
            <button 
              type="button" 
              onClick={() => navigate("/signup")} 
              style={{ backgroundColor: PRIMARY_ACCENT }}
              className="text-white font-semibold py-2 px-4 rounded-lg shadow-md hover:opacity-90 transition duration-300"
            >
              Sign Up
            </button>
          </div>
        </div>
      </header>

      
      <section className="pt-24 pb-16 bg-white border-b border-gray-100 relative overflow-hidden">
        
        
        <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-between relative z-10">

          
          <div className="md:w-1/2 text-center md:text-left mb-12 md:mb-0">
            <h2 className="text-5xl font-extrabold mb-4 max-w-xl mx-auto md:mx-0 leading-snug" style={{ color: DARK_TEXT }}>
              One App, <span style={{ color: PRIMARY_ACCENT }}>Everything</span> You Need for Money Management
            </h2>
            <p className="text-xl text-gray-600 mb-10 max-w-lg mx-auto md:mx-0">
              Secure, instant money transfers across 50+ countries. Open your account in a flash.
            </p>
            <div className="flex justify-center md:justify-start space-x-6">
              <button
                type="button"
                onClick={() => navigate("/signup")}
                style={{ backgroundColor: PRIMARY_ACCENT }}
                className="hover:opacity-90 text-white font-semibold py-3 px-8 rounded-xl shadow-2xl shadow-pink-300/50 transition duration-300 transform hover:scale-[1.02]"
              >
                Get Started Free
              </button>
              
            </div>
          </div>

          
          <div className="w-full md:w-1/2 flex justify-center md:justify-end">
            
            <img 
              src="https://cdn.prod.website-files.com/67e463a5da1eef15d42622a1/67f7e89b13304dad89473488_Reporting%20y%20Data.avif" 
              alt="Payments Dashboard Mockup" 
              className="w-full max-w-lg rounded-xl shadow-2xl transition duration-500 hover:shadow-3xl"
              style={{ transform: 'rotate(2deg) scale(1.05)' }} 
            />
          </div>
        </div>

        
        <div 
          className="hidden md:block absolute top-0 left-0 w-1/2 h-full opacity-10 blur-3xl"
          style={{ background: `linear-gradient(to right, ${PRIMARY_ACCENT}, transparent)` }}
        ></div>

      </section>


     <section className="py-20" style={{ backgroundColor: LIGHT_BG }}>
  <div className="container mx-auto px-4">
    <h3 className="text-3xl font-bold text-center mb-16" style={{ color: DARK_TEXT }}>Platform Features</h3>
    

    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      

      <div className="bg-white p-8 rounded-2xl shadow-xl hover:shadow-2xl transition duration-300 border border-gray-100">
        <div className="mb-4" style={{ color: PRIMARY_ACCENT }}>
          
          <i className="fas fa-lock fa-3x" aria-hidden="true"></i> 
        </div>
        <h4 className="text-xl font-semibold mb-3" style={{ color: DARK_TEXT }}>Bank-Level Security</h4>
        <p className="text-gray-600">256-bit encryption and biometric authentication, ensuring your assets are always safe.</p>
      </div>


      <div className="bg-white p-8 rounded-2xl shadow-xl hover:shadow-2xl transition duration-300 border border-gray-100">
        <div className="mb-4" style={{ color: PRIMARY_ACCENT }}>
          <i className="fas fa-bolt fa-3x" aria-hidden="true"></i>
        </div>
        <h4 className="text-xl font-semibold mb-3" style={{ color: DARK_TEXT }}>Instant Transfers</h4>
        <p className="text-gray-600">Real-time transactions with 99.9% uptime and immediate confirmation.</p>
      </div>


      <div className="bg-white p-8 rounded-2xl shadow-xl hover:shadow-2xl transition duration-300 border border-gray-100">
        <div className="mb-4" style={{ color: PRIMARY_ACCENT }}>
          <i className="fas fa-globe fa-3x" aria-hidden="true"></i>
        </div>
        <h4 className="text-xl font-semibold mb-3" style={{ color: DARK_TEXT }}>Global Coverage</h4>
        <p className="text-gray-600">Send & receive in 50+ major currencies worldwide with low fees.</p>
      </div>
      

      <div className="bg-white p-8 rounded-2xl shadow-xl hover:shadow-2xl transition duration-300 border border-gray-100">
        <div className="mb-4" style={{ color: PRIMARY_ACCENT }}>
          <i className="fas fa-chart-line fa-3x" aria-hidden="true"></i> 
        </div>
        <h4 className="text-xl font-semibold mb-3" style={{ color: DARK_TEXT }}>Financial Analytics</h4>
        <p className="text-gray-600">Intuitive dashboards and spending reports to track and manage your finances effortlessly.</p>
      </div>


      <div className="bg-white p-8 rounded-2xl shadow-xl hover:shadow-2xl transition duration-300 border border-gray-100">
        <div className="mb-4" style={{ color: PRIMARY_ACCENT }}>
          <i className="fas fa-wallet fa-3x" aria-hidden="true"></i>
        </div>
        <h4 className="text-xl font-semibold mb-3" style={{ color: DARK_TEXT }}>Multi-Currency Wallets</h4>
        <p className="text-gray-600">Hold, exchange, and spend multiple currencies directly within your app, commission-free.</p>
      </div>


      <div className="bg-white p-8 rounded-2xl shadow-xl hover:shadow-2xl transition duration-300 border border-gray-100">
        <div className="mb-4" style={{ color: PRIMARY_ACCENT }}>
          <i className="fas fa-headset fa-3x" aria-hidden="true"></i>
        </div>
        <h4 className="text-xl font-semibold mb-3" style={{ color: DARK_TEXT }}>Dedicated Support</h4>
        <p className="text-gray-600">24/7 priority customer support via live chat, phone, and email for all your needs.</p>
      </div>

    </div>
  </div>
</section>


      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 text-center">
          <h3 className="text-3xl font-bold mb-10" style={{ color: DARK_TEXT }}>Trusted by 28 Million Users Globally</h3>
          <blockquote className="max-w-3xl mx-auto text-lg italic text-gray-700 mb-6 border-l-4 pl-4" style={{ borderColor: PRIMARY_ACCENT }}>
            "We handle significant volume, so security isn't optional—it's essential. JunoPay's compliance and encryption protocols are top-tier. It gives me total peace of mind for every transaction."
          </blockquote>
          <p className="font-semibold" style={{ color: DARK_TEXT }}>— Alex Kim, Head of Operations at <span style={{ color: PRIMARY_ACCENT }}>Secure Ledger Corp</span></p>
        </div>
      </section>

      <footer className="bg-gray-800 py-6">
        <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center">
          <div>
            <h4 className="text-white font-bold text-lg">NonPay</h4>
            <p className="text-gray-400 text-sm mt-1">© 2025 NonPay. All rights reserved.</p>
          </div>
          <div className="flex space-x-6 mt-4 md:mt-0 text-sm">
            <button type="button" onClick={() => navigate("/")} className="text-gray-400 hover:text-white transition duration-200">
              Privacy Policy
            </button>
            <button type="button" onClick={() => navigate("/")} className="text-gray-400 hover:text-white transition duration-200">
              Terms of Service
            </button>
            <button type="button" onClick={() => navigate("/")} className="text-gray-400 hover:text-white transition duration-200">
              Contact Support
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
}