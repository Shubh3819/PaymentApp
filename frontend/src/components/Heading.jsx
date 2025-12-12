
const DARK_TEXT = 'rgb(39, 39, 42)';

export default function Heading({ children }) {
  return <div className="font-extrabold text-3xl p-2" style={{ color: DARK_TEXT }}>{children}</div>;
}