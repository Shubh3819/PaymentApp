import { useState, useEffect } from "react";
import api from "../api/axiosInstance";


const PRIMARY_ACCENT = 'rgb(244, 114, 182)';
const DARK_TEXT = 'rgb(39, 39, 42)';

export default function Balance() {
  const [amount, setAmount] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;
    async function fetchBalance() {
      try {
        const res = await api.get("/account/balance");
        const value = Number(res.data.balance || 0);
        if (active) setAmount(value.toFixed(2));
      } catch (err) {
        console.error(err);
      } finally {
        if (active) setLoading(false);
      }
    }
    fetchBalance();
    return () => {
      active = false;
    };
  }, []);

  if (loading) return <div className="p-4 font-semibold" style={{ color: DARK_TEXT }}>Loading balance...</div>;

  return (
    <div className="p-5 mx-4 mt-4 rounded-xl shadow-lg bg-white border border-gray-100">
      <div className="flex space-x-2 items-end">
        <div className="font-semibold text-lg" style={{ color: DARK_TEXT }}>
          Your balance
        </div>
        <div className="text-2xl font-bold" style={{ color: PRIMARY_ACCENT }}>
          Rs {amount}
        </div>
      </div>
    </div>
  );
}