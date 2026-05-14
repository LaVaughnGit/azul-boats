"use client";

import React, { createContext, useContext, useState, useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  Calendar,
  Clock,
  Users,
  ChevronRight,
  ChevronLeft,
  Anchor,
  CheckCircle,
  Loader2,
  UserCheck,
} from "lucide-react";
import { Dialog, DialogContent } from "@/components/ui/dialog";

/* ─────────────────────────────── Types ─────────────────────────────── */

type BookingData = {
  date: string;
  time: string;
  duration: number;
  withCaptain: boolean;
  passengers: number;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  specialRequests: string;
};

type BookingModalContextType = {
  openModal: () => void;
  closeModal: () => void;
};

/* ─────────────────────────────── Context ─────────────────────────────── */

const BookingModalContext = createContext<BookingModalContextType>({
  openModal: () => {},
  closeModal: () => {},
});

export function useBookingModal() {
  return useContext(BookingModalContext);
}

/* ─────────────────────────────── Constants ─────────────────────────────── */

const TIME_SLOTS = [
  "8:00 AM", "9:00 AM", "10:00 AM", "11:00 AM", "12:00 PM",
  "1:00 PM", "2:00 PM", "3:00 PM", "4:00 PM", "5:00 PM", "6:00 PM",
  "7:00 PM", "8:00 PM", "9:00 PM",
];

const DURATIONS = [4, 5, 6, 7, 8, 9, 10, 11, 12];

const BOAT_RATE = 80;
const CAPTAIN_RATE = 50;

const defaultBooking: BookingData = {
  date: "",
  time: "",
  duration: 4,
  withCaptain: false,
  passengers: 4,
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  specialRequests: "",
};

/* ─────────────────────────────── Price calc ─────────────────────────────── */

function calcPrice(data: BookingData) {
  const boatTotal = BOAT_RATE * data.duration;
  const captainTotal = data.withCaptain ? CAPTAIN_RATE * data.duration : 0;
  return { boatTotal, captainTotal, total: boatTotal + captainTotal };
}

/* ─────────────────────────────── Input styles ─────────────────────────────── */

const inputCls =
  "w-full rounded-xl px-4 py-3 text-sm text-white bg-white/5 border border-white/10 placeholder-white/30 focus:outline-none focus:border-[#FF2D78]/60 focus:bg-white/8 transition-all";

const labelCls = "block text-xs font-semibold text-white/50 uppercase tracking-widest mb-2";

/* ─────────────────────────────── Step components ─────────────────────────────── */

type SlotInfo = { start_hour: number; end_hour: number };

function timeToHour(time: string): number {
  const [timePart, period] = time.split(" ");
  const hours = Number(timePart.split(":")[0]);
  if (period === "AM") return hours === 12 ? 0 : hours;
  return hours === 12 ? 12 : hours + 12;
}

function availableBoats(booked: SlotInfo[], startHour: number, duration: number): number {
  const endHour = startHour + duration;
  const overlaps = booked.filter(b => b.start_hour < endHour && b.end_hour > startHour).length;
  return 3 - overlaps;
}

function StepOne({
  data,
  onChange,
  bookedSlots,
  availabilityLoading,
}: {
  data: BookingData;
  onChange: (d: Partial<BookingData>) => void;
  bookedSlots: SlotInfo[];
  availabilityLoading: boolean;
}) {
  const today = new Date();
  today.setDate(today.getDate() + 1);
  const minDate = today.toISOString().split("T")[0];

  return (
    <div className="space-y-6">
      <div>
        <label className={labelCls}>Select Date</label>
        <div className="relative">
          <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#FF2D78] pointer-events-none" />
          <input
            type="date"
            min={minDate}
            value={data.date}
            onChange={(e) => onChange({ date: e.target.value, time: "" })}
            className={`${inputCls} pl-11 [color-scheme:dark]`}
            required
          />
        </div>
      </div>

      <div>
        <label className={labelCls}>Duration</label>
        <div className="grid grid-cols-5 gap-2">
          {DURATIONS.map((h) => (
            <button
              key={h}
              type="button"
              onClick={() => onChange({ duration: h, time: "" })}
              className={`py-2.5 rounded-xl text-sm font-semibold transition-all ${
                data.duration === h
                  ? "bg-gradient-to-br from-[#FF2D78] to-[#7B2FBE] text-white shadow-lg shadow-pink-500/20"
                  : "bg-white/5 border border-white/10 text-white/60 hover:border-white/20 hover:text-white"
              }`}
            >
              {h}h
            </button>
          ))}
        </div>
      </div>

      <div>
        <label className={labelCls}>
          <span className="flex items-center gap-2">
            <Clock className="w-3.5 h-3.5 text-[#00E5FF]" />
            Start Time
            {availabilityLoading && (
              <span className="text-white/30 text-[10px] normal-case tracking-normal">checking availability…</span>
            )}
          </span>
        </label>
        {!data.date ? (
          <p className="text-sm text-white/30 py-2">Select a date first to see available times.</p>
        ) : (
          <div className="grid grid-cols-3 gap-2">
            {TIME_SLOTS.map((t) => {
              const startHour = timeToHour(t);
              const pastCutoff = startHour + data.duration > 21;
              const available = pastCutoff ? 0 : availableBoats(bookedSlots, startHour, data.duration);
              const isFull = available === 0;
              const isSelected = data.time === t;

              return (
                <button
                  key={t}
                  type="button"
                  disabled={isFull}
                  onClick={() => onChange({ time: t })}
                  className={`relative flex flex-col items-center py-2.5 px-2 rounded-xl text-xs font-semibold transition-all ${
                    isSelected
                      ? "bg-gradient-to-br from-[#FF2D78] to-[#7B2FBE] text-white shadow-lg shadow-pink-500/20"
                      : isFull
                      ? "bg-white/3 border border-white/5 text-white/20 cursor-not-allowed"
                      : "bg-white/5 border border-white/10 text-white/70 hover:border-white/20 hover:text-white"
                  }`}
                >
                  {t}
                  {!pastCutoff && !isFull && available < 3 && (
                    <span className={`text-[9px] mt-0.5 font-medium ${available === 1 ? "text-orange-400" : "text-amber-400"}`}>
                      {available} left
                    </span>
                  )}
                  {isFull && (
                    <span className="text-[9px] mt-0.5 text-white/25">Full</span>
                  )}
                </button>
              );
            })}
          </div>
        )}
      </div>

      {/* Live price preview */}
      <div className="rounded-2xl bg-gradient-to-br from-[#FF2D78]/10 to-[#7B2FBE]/10 border border-[#FF2D78]/20 p-4">
        <p className="text-xs text-white/50 uppercase tracking-widest mb-1">Estimated Total</p>
        <p className="text-3xl font-black text-white">
          ${BOAT_RATE * data.duration}
          <span className="text-base font-normal text-white/40 ml-1">
            ({data.duration}h × ${BOAT_RATE}/hr)
          </span>
        </p>
      </div>
    </div>
  );
}

function StepTwo({
  data,
  onChange,
}: {
  data: BookingData;
  onChange: (d: Partial<BookingData>) => void;
}) {
  const { boatTotal, captainTotal, total } = calcPrice(data);
  const maxPassengers = data.withCaptain ? 8 : 9;

  return (
    <div className="space-y-6">
      {/* Captain Toggle */}
      <div>
        <label className={labelCls}>Captain</label>
        <div className="grid grid-cols-2 gap-3">
          {[
            { label: "Self-Drive", value: false, icon: Anchor, desc: "No captain, you drive" },
            { label: "With Captain", value: true, icon: UserCheck, desc: `+$${CAPTAIN_RATE}/hr` },
          ].map(({ label, value, icon: Icon, desc }) => (
            <button
              key={label}
              type="button"
              onClick={() => {
                const newVal = value;
                onChange({
                  withCaptain: newVal,
                  passengers: Math.min(data.passengers, newVal ? 8 : 9),
                });
              }}
              className={`flex flex-col items-center gap-2 py-4 px-3 rounded-2xl border transition-all ${
                data.withCaptain === value
                  ? "bg-gradient-to-br from-[#FF2D78]/20 to-[#7B2FBE]/20 border-[#FF2D78]/50 text-white"
                  : "bg-white/5 border-white/10 text-white/50 hover:border-white/20"
              }`}
            >
              <Icon className="w-6 h-6" />
              <span className="font-semibold text-sm">{label}</span>
              <span className="text-xs opacity-60">{desc}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Passenger count */}
      <div>
        <label className={labelCls}>Passengers (max {maxPassengers})</label>
        <div className="flex items-center gap-4">
          <button
            type="button"
            onClick={() => onChange({ passengers: Math.max(1, data.passengers - 1) })}
            className="w-10 h-10 rounded-full bg-white/5 border border-white/10 text-white flex items-center justify-center hover:bg-white/10 transition-all text-lg font-bold"
          >
            −
          </button>
          <div className="flex-1 text-center">
            <span className="text-4xl font-black text-white">{data.passengers}</span>
            <p className="text-xs text-white/40 mt-1">passengers</p>
          </div>
          <button
            type="button"
            onClick={() => onChange({ passengers: Math.min(maxPassengers, data.passengers + 1) })}
            className="w-10 h-10 rounded-full bg-white/5 border border-white/10 text-white flex items-center justify-center hover:bg-white/10 transition-all text-lg font-bold"
          >
            +
          </button>
        </div>
      </div>

      {/* Updated price */}
      <div className="rounded-2xl bg-gradient-to-br from-[#FF2D78]/10 to-[#7B2FBE]/10 border border-[#FF2D78]/20 p-4 space-y-2">
        <div className="flex justify-between text-sm text-white/60">
          <span>Boat rental ({data.duration}h)</span>
          <span>${boatTotal}</span>
        </div>
        {data.withCaptain && (
          <div className="flex justify-between text-sm text-white/60">
            <span>Captain ({data.duration}h)</span>
            <span>${captainTotal}</span>
          </div>
        )}
        <div className="border-t border-white/10 pt-2 flex justify-between">
          <span className="font-semibold text-white">Total</span>
          <span className="font-black text-2xl text-white">${total}</span>
        </div>
      </div>
    </div>
  );
}

function StepThree({
  data,
  onChange,
}: {
  data: BookingData;
  onChange: (d: Partial<BookingData>) => void;
}) {
  return (
    <div className="space-y-5">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className={labelCls}>First Name</label>
          <input
            type="text"
            placeholder="John"
            value={data.firstName}
            onChange={(e) => onChange({ firstName: e.target.value })}
            className={inputCls}
            required
          />
        </div>
        <div>
          <label className={labelCls}>Last Name</label>
          <input
            type="text"
            placeholder="Smith"
            value={data.lastName}
            onChange={(e) => onChange({ lastName: e.target.value })}
            className={inputCls}
            required
          />
        </div>
      </div>

      <div>
        <label className={labelCls}>Email</label>
        <input
          type="email"
          placeholder="john@example.com"
          value={data.email}
          onChange={(e) => onChange({ email: e.target.value })}
          className={inputCls}
          required
        />
      </div>

      <div>
        <label className={labelCls}>Phone</label>
        <input
          type="tel"
          placeholder="+1 (305) 000-0000"
          value={data.phone}
          onChange={(e) => onChange({ phone: e.target.value })}
          className={inputCls}
          required
        />
      </div>

      <div>
        <label className={labelCls}>Special Requests (optional)</label>
        <textarea
          rows={3}
          placeholder="Any special occasions, requests, or questions?"
          value={data.specialRequests}
          onChange={(e) => onChange({ specialRequests: e.target.value })}
          className={`${inputCls} resize-none`}
        />
      </div>
    </div>
  );
}

function StepFour({ data }: { data: BookingData }) {
  const { boatTotal, captainTotal, total } = calcPrice(data);

  const rows = [
    { label: "Date", value: data.date ? new Date(data.date + "T12:00:00").toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric" }) : "—" },
    { label: "Start Time", value: data.time || "—" },
    { label: "Duration", value: `${data.duration} hours` },
    { label: "Captain", value: data.withCaptain ? "Yes (included)" : "No (self-drive)" },
    { label: "Passengers", value: String(data.passengers) },
    { label: "Name", value: `${data.firstName} ${data.lastName}` },
    { label: "Email", value: data.email },
    { label: "Phone", value: data.phone },
  ];

  return (
    <div className="space-y-5">
      <div className="rounded-2xl border border-white/10 bg-white/3 overflow-hidden">
        {rows.map(({ label, value }, i) => (
          <div
            key={label}
            className={`flex justify-between px-4 py-3 text-sm ${
              i < rows.length - 1 ? "border-b border-white/5" : ""
            }`}
          >
            <span className="text-white/50">{label}</span>
            <span className="text-white font-medium text-right max-w-[55%]">{value}</span>
          </div>
        ))}
      </div>

      <div className="rounded-2xl bg-gradient-to-br from-[#FF2D78]/15 to-[#7B2FBE]/15 border border-[#FF2D78]/30 p-4 space-y-2">
        <div className="flex justify-between text-sm text-white/60">
          <span>Boat rental</span>
          <span>${boatTotal}</span>
        </div>
        {data.withCaptain && (
          <div className="flex justify-between text-sm text-white/60">
            <span>Captain fee</span>
            <span>${captainTotal}</span>
          </div>
        )}
        <div className="border-t border-white/15 pt-2 flex justify-between items-end">
          <span className="font-semibold text-white">Total Due</span>
          <span className="font-black text-3xl gradient-text">${total}</span>
        </div>
      </div>

      <p className="text-xs text-white/30 text-center">
        You will be securely redirected to Stripe to complete payment.
        Your booking is confirmed upon successful payment.
      </p>
    </div>
  );
}

/* ─────────────────────────────── Modal ─────────────────────────────── */

const STEPS = [
  { title: "When & How Long", subtitle: "Choose your date and duration" },
  { title: "Customize", subtitle: "Captain & passenger options" },
  { title: "Your Details", subtitle: "Contact information" },
  { title: "Review & Pay", subtitle: "Confirm and pay securely" },
];

function BookingModal({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const [step, setStep] = useState(0);
  const [data, setData] = useState<BookingData>(defaultBooking);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [bookedSlots, setBookedSlots] = useState<SlotInfo[]>([]);
  const [availabilityLoading, setAvailabilityLoading] = useState(false);

  useEffect(() => {
    if (!data.date) return;
    setAvailabilityLoading(true);
    fetch(`/api/availability?date=${data.date}`)
      .then((r) => r.json())
      .then((json) => setBookedSlots(json.bookings ?? []))
      .catch(() => setBookedSlots([]))
      .finally(() => setAvailabilityLoading(false));
  }, [data.date]);

  const onChange = useCallback((partial: Partial<BookingData>) => {
    setData((prev) => ({ ...prev, ...partial }));
  }, []);

  function isStepValid() {
    if (step === 0) return data.date !== "" && data.time !== "";
    if (step === 2) return data.firstName && data.lastName && data.email && data.phone;
    return true;
  }

  async function handleCheckout() {
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error || "Something went wrong");
      window.location.href = json.url;
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : "Payment failed. Please try again.");
      setLoading(false);
    }
  }

  function handleNext() {
    if (step < STEPS.length - 1) setStep((s) => s + 1);
    else handleCheckout();
  }

  function handleBack() {
    if (step > 0) setStep((s) => s - 1);
  }

  function handleClose() {
    onClose();
    setTimeout(() => {
      setStep(0);
      setData(defaultBooking);
      setError("");
    }, 300);
  }

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent
        className="max-w-lg w-full p-0 overflow-hidden border-0 bg-transparent shadow-none"
        style={{ background: "transparent" }}
        showCloseButton={false}
      >
        <div
          className="relative rounded-3xl overflow-hidden"
          style={{
            background: "#0A0A20",
            border: "1px solid rgba(255,255,255,0.1)",
            boxShadow: "0 0 80px rgba(255,45,120,0.15), 0 25px 60px rgba(0,0,0,0.6)",
          }}
        >
          {/* Top gradient bar */}
          <div className="h-1 w-full bg-gradient-to-r from-[#FF2D78] via-[#7B2FBE] to-[#00E5FF]" />

          {/* Header */}
          <div className="px-6 pt-6 pb-4 flex items-start justify-between">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <div className="w-6 h-6 rounded-full bg-gradient-to-br from-[#FF2D78] to-[#7B2FBE] flex items-center justify-center">
                  <Anchor className="w-3 h-3 text-white" />
                </div>
                <span className="text-xs text-white/40 uppercase tracking-widest font-semibold">
                  Step {step + 1} of {STEPS.length}
                </span>
              </div>
              <h2
                className="text-xl font-black text-white"
                style={{ fontFamily: "var(--font-heading)" }}
              >
                {STEPS[step].title}
              </h2>
              <p className="text-sm text-white/40">{STEPS[step].subtitle}</p>
            </div>
            <button
              onClick={handleClose}
              className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center hover:bg-white/10 transition-all text-white/50 hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Step indicators */}
          <div className="px-6 mb-5">
            <div className="flex gap-1.5">
              {STEPS.map((_, i) => (
                <div
                  key={i}
                  className="flex-1 h-1 rounded-full transition-all duration-500"
                  style={{
                    background: i <= step
                      ? "linear-gradient(90deg, #FF2D78, #7B2FBE)"
                      : "rgba(255,255,255,0.08)",
                  }}
                />
              ))}
            </div>
          </div>

          {/* Step content */}
          <div className="px-6 pb-4" style={{ minHeight: "340px" }}>
            <AnimatePresence mode="wait">
              <motion.div
                key={step}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.2 }}
              >
                {step === 0 && <StepOne data={data} onChange={onChange} bookedSlots={bookedSlots} availabilityLoading={availabilityLoading} />}
                {step === 1 && <StepTwo data={data} onChange={onChange} />}
                {step === 2 && <StepThree data={data} onChange={onChange} />}
                {step === 3 && <StepFour data={data} />}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Error */}
          {error && (
            <p className="px-6 pb-2 text-sm text-red-400 text-center">{error}</p>
          )}

          {/* Footer actions */}
          <div className="px-6 pb-6 flex gap-3">
            {step > 0 && (
              <button
                onClick={handleBack}
                disabled={loading}
                className="flex items-center gap-2 px-5 py-3 rounded-xl bg-white/5 border border-white/10 text-white/70 hover:text-white hover:bg-white/10 transition-all text-sm font-semibold"
              >
                <ChevronLeft className="w-4 h-4" />
                Back
              </button>
            )}
            <button
              onClick={handleNext}
              disabled={!isStepValid() || loading}
              className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl font-bold text-sm text-white transition-all disabled:opacity-40 disabled:cursor-not-allowed"
              style={{
                background: "linear-gradient(135deg, #FF2D78, #7B2FBE)",
                boxShadow: isStepValid() && !loading ? "0 4px 20px rgba(255,45,120,0.35)" : "none",
              }}
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Redirecting to Payment…
                </>
              ) : step === STEPS.length - 1 ? (
                <>
                  <CheckCircle className="w-4 h-4" />
                  Proceed to Payment
                </>
              ) : (
                <>
                  Continue
                  <ChevronRight className="w-4 h-4" />
                </>
              )}
            </button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

/* ─────────────────────────────── Provider ─────────────────────────────── */

export function BookingModalProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);

  const openModal = useCallback(() => setIsOpen(true), []);
  const closeModal = useCallback(() => setIsOpen(false), []);

  return (
    <BookingModalContext.Provider value={{ openModal, closeModal }}>
      {children}
      <BookingModal isOpen={isOpen} onClose={closeModal} />
    </BookingModalContext.Provider>
  );
}
