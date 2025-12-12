
import { useEffect, useState } from 'react';
import api from '../api/axiosInstance';

export default function Transactions({ pageSize = 20 }) {
  const [transactions, setTransactions] = useState([]);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);


  const myId = (() => {
    try {
      return localStorage.getItem('userId') || '';
    } catch {
      return '';
    }
  })();

  useEffect(() => {
    let active = true;
    setLoading(true);

    (async () => {
      try {
        const res = await api.get('/account/transactions', {
          params: { page, limit: pageSize }
        });

        if (!active) return;

        setTransactions(res.data.transactions || []);
        setTotal(res.data.total || 0);
      } catch (err) {
        console.error('Failed to load transactions', err);
      } finally {
        if (active) setLoading(false);
      }
    })();

    return () => { active = false; };
  }, [page, pageSize]);

  const pages = Math.max(1, Math.ceil(total / pageSize));

  if (loading) return <div className="p-4">Loading transactions...</div>;
  if (!transactions.length) return <div className="p-4">No transactions yet.</div>;

  return (
    <div className="p-4 space-y-3">
      <h3 className="font-bold text-lg">Transactions</h3>

      <div className="space-y-2">
        {transactions.map((tx) => {
          const from = tx.fromUserId;
          const to = tx.toUserId;

          const outgoing = from && String(from._id) === String(myId);
          const amountClass = outgoing ? 'text-red-600' : 'text-green-600';

          return (
            <div key={tx._id} className="p-3 border rounded flex justify-between items-center">
              <div>
                <div className="text-sm text-gray-600">
                  {new Date(tx.createdAt).toLocaleString()}
                </div>

                <div className="font-medium">
                  {from && to
                    ? `${from.firstName || ''} → ${to.firstName || ''}`
                    : '—'}
                </div>

                <div className="text-sm text-gray-500">{tx.note || ''}</div>
              </div>

              <div className={`font-semibold ${amountClass}`}>
                {outgoing ? '-' : '+'} Rs {Number(tx.amount).toFixed(2)}
              </div>
            </div>
          );
        })}
      </div>

      <div className="flex justify-between items-center mt-2">
        <button
          disabled={page <= 1}
          onClick={() => setPage((p) => Math.max(1, p - 1))}
          className="px-3 py-1 rounded bg-gray-200 disabled:opacity-50"
        >
          Prev
        </button>

        <div>Page {page} / {pages}</div>

        <button
          disabled={page >= pages}
          onClick={() => setPage((p) => Math.min(pages, p + 1))}
          className="px-3 py-1 rounded bg-gray-200 disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
}
