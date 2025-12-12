import { Link } from "react-router-dom";


const PRIMARY_ACCENT = 'rgb(244, 114, 182)';
const DARK_TEXT = 'rgb(39, 39, 42)';

export default function BottomWarning({ label, buttontext, to }) {
  return (
    <div className="flex justify-center text-sm mb-4" style={{ color: DARK_TEXT }}>
      <div className="text-gray-600">{label}</div>
      <Link 
        className="cursor-pointer underline ml-2 font-medium transition duration-200 hover:opacity-80" 
        to={to} 
        style={{ color: PRIMARY_ACCENT }}
      >
        {buttontext}
      </Link>
    </div>
  );
}