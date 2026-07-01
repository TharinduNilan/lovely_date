"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

export default function DateSelection({
  onContinue,
}: {
  onContinue: (date: Date) => void;
}) {
  const [date, setDate] = useState<Date | undefined>();

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="w-105 bg-white/20 backdrop-blur-xl border border-white/30 p-8 rounded-3xl shadow-2xl text-center"
    >
      <div className="text-5xl mb-4">📅</div>

      <h2 className="text-3xl font-bold text-white">
        Choose our special day
      </h2>

      <p className="text-pink-100 mt-2">
        Pick a date for our memory ❤️
      </p>

      {/* CALENDAR */}
      <div className="mt-6">
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className="w-full justify-start text-left"
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {date ? format(date, "PPP") : "Pick a date"}
            </Button>
          </PopoverTrigger>

          <PopoverContent className="w-auto p-0">
            <Calendar
              mode="single"
              selected={date}
              onSelect={setDate}
              disabled={(d) => d < new Date()}
            />
          </PopoverContent>
        </Popover>
      </div>

      {/* BUTTON */}
      <Button
        className="mt-6 w-full bg-pink-500 hover:bg-pink-600"
        disabled={!date}
        onClick={() => date && onContinue(date)}
      >
        Continue ❤️
      </Button>
    </motion.div>
  );
}