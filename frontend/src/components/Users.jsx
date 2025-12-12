import { useEffect, useState } from "react";
import Button from "./Button";
import api from "../api/axiosInstance";
import { useNavigate } from "react-router-dom";

export const Users = () => {
  const [users, setUsers] = useState([]);
  const [filter, setFilter] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    let active = true;
    let timer = null;

    async function load() {
      setLoading(true);
      setError(null);
      try {
        const res = await api.get("/user/bulk", { params: { filter } });
        if (!active) return;
        setUsers(res.data.user || []);
      } catch (err) {
        if (!active) return;
        setError("Failed to load users");
        console.error(err);
      } finally {
        if (active) setLoading(false);
      }
    }

    timer = setTimeout(load, 300);

    return () => {
      active = false;
      if (timer) clearTimeout(timer);
    };
  }, [filter]);

  return (
    <>
      <div className="font-bold mt-6 text-lg p-4">Users</div>

      <div className="my-2 px-4">
        <input
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          type="text"
          placeholder="Search users..."
          className="w-full px-2 py-1 border rounded border-slate-200"
        />
      </div>

      <div className="p-4">
        {loading && <div className="p-2">Loading users...</div>}
        {error && <div className="text-red-600 p-2">{error}</div>}
        {!loading && !error && users.length === 0 && <div className="p-2 text-gray-500">No users found</div>}

        {users.map((user) => (
          <User key={user._id ?? user.id ?? Math.random()} user={user} />
        ))}
      </div>
    </>
  );
};

function User({ user }) {
  const navigate = useNavigate();
  return (
    <div className="flex justify-between my-2">
      <div className="flex">
        <div className="rounded-full h-12 w-12 bg-slate-200 flex justify-center mt-1 mr-2">
          <div className="flex flex-col justify-center h-full text-xl capitalize ">
            {user.firstName?.[0] ?? "U"}
          </div>
        </div>
        <div className="flex flex-col justify-center">
          <div>
            {user.firstName} {user.lastName}
          </div>
        </div>
      </div>

      <div className="flex flex-col justify-center">
        <Button
          onClick={() => {
            navigate("/send?id=" + (user._id ?? user.id) + "&name=" + encodeURIComponent(user.firstName ?? ""));
          }}
          label={"Send Money"}
        />
      </div>
    </div>
  );
}
