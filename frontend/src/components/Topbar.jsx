import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";


const PRIMARY_ACCENT = 'rgb(244, 114, 182)';
const DARK_TEXT = 'rgb(39, 39, 42)';

export default function Topbar() {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const menuRef = useRef(null);

  const token = localStorage.getItem("token");

  function logout() {
    localStorage.removeItem("token");
    navigate("/signin");
  }


  useEffect(() => {
    function handleClick(e) {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  return (

    <div className="shadow-md bg-white h-16 px-4 py-2 relative border-b border-gray-100">
      <div className="flex justify-between items-center h-full">

        <div className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-full flex items-center justify-center" style={{ backgroundColor: PRIMARY_ACCENT }}>
                 <img src="https://imgs.search.brave.com/_jrCNVjUVLeEze18Pbqbv7pcnLRoTbAeHWkkCrdUbu4/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9zMy51/cy1lYXN0LTEuYW1h/em9uYXdzLmNvbS9j/ZG4uZGVzaWduY3Jv/d2QuY29tL2Jsb2cv/MTIwLWNvb2wtbG9n/b3MtZm9yLWEtZnJl/c2gtbmV3LWxvb2sv/cGluay1nbG93aW5n/LW5lb24tYnktY2hv/bGUtYnJhbmRjcm93/ZC5wbmc"
                height="100px" width="100px" alt="Logo" className="w-8 h-8 rounded-full object-cover" />
            </div>
            <div className="font-bold text-xl" style={{ color: DARK_TEXT }}>
                NonPay
            </div>
        </div>

        <div className="flex items-center">
          <div className="flex flex-col justify-center h-full mr-4 text-gray-700 font-medium">
            {token ? "Welcome" : "Hello"}
          </div>


          <div
            className="rounded-full h-10 w-10 flex justify-center items-center cursor-pointer shadow-sm transition duration-200 hover:shadow-md"
            style={{ backgroundColor: PRIMARY_ACCENT }}
            onClick={() => setOpen((s) => !s)}
            ref={menuRef}
          >
            <div className="text-lg font-bold text-white">U</div>
          </div>
        </div>
      </div>

      {open && (
        <div className="absolute top-full right-4 mt-2 w-36 bg-white rounded-lg shadow-xl border border-gray-100 z-50">
          {!token && (
            <>
              <button
                className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-50 rounded-t-lg transition duration-150"
                onClick={() => navigate("/signup")}
              >
                Sign Up
              </button>

              <button
                className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-50 transition duration-150"
                onClick={() => navigate("/signin")}
              >
                Sign In
              </button>
            </>
          )}

          {token && (
            <button
              className="block w-full text-left px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg transition duration-150"
              onClick={logout}
            >
              Logout
            </button>
          )}
        </div>
      )}
    </div>
  );
}