import React from "react";
import { motion } from "framer-motion";

const PasswordAnalytics = ({ password, entropy }) => {
  if (!password) return null;

  // Character categories
  const hasUpper = /[A-Z]/.test(password);
  const hasLower = /[a-z]/.test(password);
  const hasNumber = /[0-9]/.test(password);
  const hasSymbol = /[^A-Za-z0-9]/.test(password);

  const categories = [
    { label: "Uppercase", active: hasUpper },
    { label: "Lowercase", active: hasLower },
    { label: "Numbers", active: hasNumber },
    { label: "Symbols", active: hasSymbol },
  ];

  // Crack time estimation
  const guessesPerSecond = 1e9;
  const secondsToCrack = Math.pow(2, entropy) / guessesPerSecond;

  const formatTime = (seconds) => {
    if (seconds < 60) return `${seconds.toFixed(2)} sec`;
    if (seconds < 3600) return `${(seconds / 60).toFixed(2)} min`;
    if (seconds < 86400) return `${(seconds / 3600).toFixed(2)} hr`;
    if (seconds < 31536000) return `${(seconds / 86400).toFixed(2)} days`;
    if (seconds < 3.154e8) return `${(seconds / 31536000).toFixed(2)} years`;
    return `${(seconds / 3.154e7).toExponential(1)} years 😎`;
  };

  const crackTime = formatTime(secondsToCrack);

  // Grade system
  const getGrade = () => {
    if (entropy < 28) return { grade: "F", color: "bg-red-500", label: "Very Weak" };
    if (entropy < 36) return { grade: "D", color: "bg-orange-500", label: "Weak" };
    if (entropy < 60) return { grade: "C", color: "bg-yellow-400", label: "Moderate" };
    if (entropy < 128) return { grade: "B", color: "bg-green-500", label: "Strong" };
    return { grade: "A+", color: "bg-blue-500", label: "Excellent" };
  };

  const { grade, color, label } = getGrade();
  const widthPercent = Math.min((entropy / 128) * 100, 100);

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="mt-6 p-5 border border-gray-700 rounded-2xl bg-neutral-900/60 text-left shadow-lg"
    >
      <h3 className="text-lg font-semibold text-purple-400 mb-3">
        📊 Password Analytics
      </h3>

      {/* Character Mix */}
      <div className="grid grid-cols-2 gap-y-2 text-sm text-gray-300 mb-4">
        {categories.map((cat) => (
          <p key={cat.label} className={`${cat.active ? "text-green-400" : "text-gray-500"}`}>
            {cat.active ? "✔️" : "❌"} {cat.label}
          </p>
        ))}
      </div>

      {/* Entropy & Crack Time */}
      <div className="text-gray-300 text-sm mb-3">
        <p>🔢 <strong>Entropy:</strong> {entropy} bits</p>
        <p>⏳ <strong>Crack Time:</strong> {crackTime}</p>
      </div>

      {/* Visualization */}
      <div className="mt-3">
        <p className="text-xs text-gray-400 mb-1">Crack Resistance Visualization:</p>
        <div className="relative w-full h-3 bg-gray-800 rounded-full overflow-hidden shadow-inner">
          <motion.div
            className={`absolute top-0 left-0 h-full rounded-full ${color}`}
            initial={{ width: 0 }}
            animate={{ width: `${widthPercent}%` }}
            transition={{ duration: 0.8 }}
          ></motion.div>
          <motion.div
            className="absolute inset-0 rounded-full bg-white/10 blur-sm"
            animate={{ opacity: [0.4, 0.8, 0.4] }}
            transition={{ repeat: Infinity, duration: 2 }}
          ></motion.div>
        </div>
        <p className="text-xs mt-1 text-gray-400 italic">
          Strength Level: {label} ({grade})
        </p>
      </div>
    </motion.div>
  );
};

export default PasswordAnalytics;
