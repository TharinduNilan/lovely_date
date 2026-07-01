"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { format } from "date-fns";

type DatePlan = {
  id: number;
  created_at: string;
  date: string;
  activity: string;
};

const ADMIN_PASSWORD = "love123"; // 🔐 change this

export default function AdminPage() {
  const [password, setPassword] = useState("");
  const [authed, setAuthed] = useState(false);

  const [plans, setPlans] = useState<DatePlan[]>([]);
  const [loading, setLoading] = useState(true);

  // LOGIN CHECK
  function handleLogin() {
    if (password === ADMIN_PASSWORD) {
      setAuthed(true);
      fetchPlans();
    } else {
      alert("Wrong password 💔");
    }
  }

  useEffect(() => {
    if (authed) fetchPlans();
  }, [authed]);

  async function fetchPlans() {
    const { data, error } = await supabase
      .from("dates")
      .select("*")
      .order("created_at", { ascending: false });

    if (!error && data) {
      setPlans(data);
    }

    setLoading(false);
  }

  async function deletePlan(id: number) {
    const ok = confirm("Delete this plan?");
    if (!ok) return;

    await supabase.from("dates").delete().eq("id", id);
    fetchPlans();
  }

  // LOGIN SCREEN
  if (!authed) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-pink-500 via-fuchsia-500 to-purple-700">
        <div className="bg-white/20 backdrop-blur-xl p-10 rounded-3xl text-center shadow-2xl">
          <h1 className="text-2xl font-bold text-white mb-4">
            🔐 Admin Login
          </h1>

          <input
            type="password"
            placeholder="Enter password"
            className="px-4 py-2 rounded-lg w-full border border-white/30 text-black"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button
            onClick={handleLogin}
            className="mt-4 bg-pink-500 text-white px-6 py-2 rounded-lg w-full"
          >
            Login
          </button>
        </div>
      </div>
    );
  }

  // LOADING
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading...
      </div>
    );
  }

  // DASHBOARD
  return (
    <main className="min-h-screen bg-linear-to-br from-pink-500 via-fuchsia-500 to-purple-700 p-8">
      <div className="max-w-5xl mx-auto bg-white rounded-3xl shadow-xl p-8">

        <h1 className="text-3xl font-bold mb-6">
          💖 Date Plans Dashboard
        </h1>

        <table className="w-full border-collapse">
          <thead>
            <tr className="border-b">
              <th className="text-left py-3">Date</th>
              <th className="text-left py-3">Activity</th>
              <th className="text-left py-3">Submitted</th>
              <th></th>
            </tr>
          </thead>

          <tbody>
            {plans.map((plan) => (
              <tr key={plan.id} className="border-b">
                <td className="py-4">
                  {format(new Date(plan.date), "PPP")}
                </td>

                <td>{plan.activity}</td>

                <td>
                  {format(new Date(plan.created_at), "PPpp")}
                </td>

                <td>
                  <button
                    onClick={() => deletePlan(plan.id)}
                    className="bg-red-500 text-white px-4 py-2 rounded-lg"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

      </div>
    </main>
  );
}