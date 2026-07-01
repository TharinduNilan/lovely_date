"use client";

import { useState } from "react";
import FloatingHearts from "@/components/FloatingHearts";
import Hero from "@/components/Hero";
import DateSelection from "@/components/DateSelection";
import ActivitySelection from "@/components/ActivitySelection";
import Greeting from "@/components/Greeting";
import BackgroundMusic from "@/components/BackgroundMusic";

export default function Page() {
  const [step, setStep] = useState(1);
  const [date, setDate] = useState<Date | null>(null);
  const [activity, setActivity] = useState("");

  console.log("URL",process.env.NEXT_PUBLIC_SUPABASE_URL);
console.log("KEY",process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);

  return (
    <main className="h-screen flex items-center justify-center bg-linear-to-br from-pink-500 via-fuchsia-500 to-purple-700 overflow-y-auto p-4" style={{ alignItems: "safe center" }}>

      <FloatingHearts />
      <BackgroundMusic />

      {/* STEP 1 */}
      {step === 1 && (
        <Hero onYes={() => setStep(2)} />
      )}

      {/* STEP 2 */}
      {step === 2 && (
        <DateSelection
          onContinue={(d) => {
            setDate(d);
            setStep(3);
          }}
        />
      )}

      {/* STEP 3 */}
      {step === 3 && date && (
        <ActivitySelection
          date={date}
          onBack={() => setStep(2)}
          onFinish={(selected) => {
            setActivity(selected);
            setStep(4);
          }}
        />
      )}

      {/* STEP 4 - FINAL */}
      {step === 4 && date && (
        <Greeting
          date={date}
          activity={activity}
          onRestart={() => {
            setStep(1);
            setDate(null);
            setActivity("");
          }}
        />
      )}

    </main>
  );
}