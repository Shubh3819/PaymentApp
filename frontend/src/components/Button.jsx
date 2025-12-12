export default function Button({ label, onClick, type = "button", disabled = false }) {
  return (
    <button
      onClick={onClick}
      type={type}
      disabled={disabled}
      className={`w-full text-white bg-gray-800 
        ${disabled ? "opacity-50 cursor-not-allowed hover:bg-gray-800" : "hover:bg-gray-900"} 
        focus:outline-none focus:ring-4 focus:ring-gray-300 
        font-medium rounded-lg text-sm px-5 py-2.5 mb-2`}
    >
      {label}
    </button>
  );
}
