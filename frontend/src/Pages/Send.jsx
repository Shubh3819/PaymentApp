import { useSearchParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import api from "../api/axiosInstance";
import Button from "../components/Button";

export default function Send() {
  const [params] = useSearchParams();
  const navigate = useNavigate();

  const id = params.get("id");
  const name = params.get("name");

  const [amount, setAmount] = useState("");
  const [loading, setLoading] = useState(false);

  async function sendMoney() {
    const numeric = Number(amount);
    if (!amount || !Number.isFinite(numeric) || numeric <= 0) {
      alert("Enter a valid positive amount");
      return;
    }

    setLoading(true);

    try {
      const res = await api.post("/account/transfer", {
        to: id,
        amount: numeric,
      });


      navigate("/dashboard");
    } catch (err) {

      if (err?.response?.status === 401) {
        localStorage.removeItem("token");
        navigate("/signin");
        return;
      }


      const serverMsg =
        err?.response?.data?.message ||
        (err?.response?.data ? JSON.stringify(err.response.data) : null) ||
        err.message ||
        "Transfer failed";

      alert("Transfer failed: " + serverMsg);
      console.error("Transfer error details:", err);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="h-screen flex items-center justify-center bg-slate-100">
      <div className="bg-white p-6 rounded-lg shadow-md w-80">
        <h2 className="text-xl font-bold mb-4">Send Money to {name}</h2>

        <input
          type="number"
          className="border rounded px-3 py-2 w-full mb-4"
          placeholder="Enter amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />

        <Button
          label={loading ? "Sending..." : "Send"}
          onClick={sendMoney}
          disabled={loading}
        />
      </div>
    </div>
  );
}
