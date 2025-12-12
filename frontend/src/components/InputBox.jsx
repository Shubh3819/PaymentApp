
const PRIMARY_ACCENT = 'rgb(244, 114, 182)';
const DARK_TEXT = 'rgb(39, 39, 42)';

export default function InputBox({
  label,
  placeholder,
  onChange,
  value,
  type = "text",
  error
}) {
  return (
    <div className="mb-4 px-4">
      {label && <div className="text-sm text-left font-medium mb-1" style={{ color: DARK_TEXT }}>{label}</div>}

      <input
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        type={type}
        aria-label={label}

        className={`block w-full rounded-lg border border-gray-300 py-2.5 px-4 
          focus:outline-none focus:ring-2 transition duration-150 text-gray-800
          ${error ? "ring-red-400 border-red-400" : `focus:ring-2 focus:ring-[${PRIMARY_ACCENT}] focus:border-[${PRIMARY_ACCENT}]`}
        `}

        style={{ '--tw-ring-color': PRIMARY_ACCENT }}
      />

      {error && <div className="text-red-500 text-xs mt-1 pl-2">{error}</div>}
    </div>
  );
}