"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { supabase } from "@/lib/supabase";

const activities = [
  { icon: "🍕", label: "Food" },
  { icon: "🎬", label: "Movie" },
  { icon: "🚗", label: "Trip" },
  { icon: "☕", label: "Coffee" },
  { icon: "🍦", label: "Ice Cream" },
  { icon: "🛍️", label: "Shopping" },
];

export default function ActivitySelection({
  date,
  onFinish,
  onBack,
}: {
  date: Date;
  onFinish: (activity: string) => void;
  onBack: () => void;
}) {
  const [selected, setSelected] = useState<string | null>(null);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-130 bg-white/20 backdrop-blur-xl border border-white/30 p-8 rounded-3xl shadow-2xl text-center"
    >
      <div className="text-5xl mb-3">💖</div>

      <h2 className="text-3xl font-bold text-white">What should we do?</h2>

      <p className="text-pink-100 mt-2">For {date.toDateString()}</p>

      {/* GRID */}
      <div className="grid grid-cols-2 gap-4 mt-6">
        {activities.map((a) => (
          <motion.div
            key={a.label}
            whileHover={{ scale: 1.05 }}
            onClick={() => setSelected(a.label)}
            className={`cursor-pointer p-4 rounded-2xl border text-lg font-semibold transition ${
              selected === a.label
                ? "bg-pink-500 text-white border-pink-300"
                : "bg-white/30 text-white border-white/20"
            }`}
          >
            <div className="text-3xl">{a.icon}</div>
            <div>{a.label}</div>
          </motion.div>
        ))}
      </div>

      {/* BUTTONS */}
      <div className="flex gap-3 mt-6">
        <button
          onClick={onBack}
          className="w-1/2 bg-gray-200 rounded-xl py-3 font-semibold"
        >
          Back
        </button>

        <button
          disabled={!selected}
          onClick={async () => {
            if (!selected) return;

            const { error } = await supabase.from("dates").insert({
              date: date.toISOString(),
              activity: selected,
            });

            if (error) {
              alert("Something went wrong 😥");
              console.error(error);
              return;
            }

            onFinish(selected);
          }}
          className="w-1/2 bg-pink-500 text-white rounded-xl py-3 font-bold disabled:opacity-50"
        >
          Confirm ❤️
        </button>
      </div>
    </motion.div>
  );
}
