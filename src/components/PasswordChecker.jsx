import React, { useState } from "react";
import { motion } from "framer-motion";
import { FaExclamationTriangle } from "react-icons/fa";

const PasswordChecker = () => {
  const [password, setPassword] = useState("");
  const [strength, setStrength] = useState("");
  const [entropy, setEntropy] = useState(0);
  const [feedback, setFeedback] = useState("");
  const [issues, setIssues] = useState([]);

  const calculateEntropy = (pwd) => {
    let charset = 0;
    if (/[a-z]/.test(pwd)) charset += 26;
    if (/[A-Z]/.test(pwd)) charset += 26;
    if (/[0-9]/.test(pwd)) charset += 10;
    if (/[^A-Za-z0-9]/.test(pwd)) charset += 32;
    if (charset === 0) return 0;
    const bits = (pwd.length * Math.log2(charset)).toFixed(2);
    setEntropy(bits);
    return bits;
  };

  const analyzePassword = (pwd) => {
    setPassword(pwd);
    const newIssues = [];
    if (pwd.length < 8) newIssues.push("Too short — use at least 8 characters.");
    if (!/[A-Z]/.test(pwd)) newIssues.push("Add an uppercase letter (A–Z).");
    if (!/[a-z]/.test(pwd)) newIssues.push("Add a lowercase letter (a–z).");
    if (!/[0-9]/.test(pwd)) newIssues.push("Add numbers (0–9).");
    if (!/[^A-Za-z0-9]/.test(pwd)) newIssues.push("Add symbols (!@#$%).");
    setIssues(newIssues);

    const bits = calculateEntropy(pwd);
    if (bits < 28) {
      setStrength("Weak");
      setFeedback("⚠️ Very easy to crack — add more length and variety.");
    } else if (bits < 50) {
      setStrength("Moderate");
      setFeedback("🟡 Decent, but can be improved with symbols and numbers.");
    } else if (bits < 80) {
      setStrength("Strong");
      setFeedback("🟢 Good! Your password is secure.");
    } else {
      setStrength("Very Strong");
      setFeedback("💪 Excellent! This is a highly secure password.");
    }
  };

  const getColor = () => {
    switch (strength) {
      case "Weak":
        return "from-red-500 to-orange-500";
      case "Moderate":
        return "from-yellow-400 to-green-400";
      case "Strong":
        return "from-green-400 to-emerald-500";
      case "Very Strong":
        return "from-blue-400 to-purple-500";
      default:
        return "from-gray-600 to-gray-800";
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-black overflow-hidden px-6 text-white">
      {/* Background Lights */}
      <div className="absolute inset-0">
        <motion.div
          animate={{ scale: [1, 1.2, 1], opacity: [0.4, 0.2, 0.4] }}
          transition={{ repeat: Infinity, duration: 8 }}
          className="absolute top-1/3 left-1/4 w-[400px] h-[400px] bg-purple-600/20 blur-3xl rounded-full"
        />
        <motion.div
          animate={{ scale: [1.2, 0.8, 1.2], opacity: [0.3, 0.5, 0.3] }}
          transition={{ repeat: Infinity, duration: 10 }}
          className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-blue-600/20 blur-3xl rounded-full"
        />
      </div>

      {/* Analyzer Card */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="relative z-10 bg-gradient-to-b from-neutral-900/80 to-black/90 backdrop-blur-2xl border border-gray-800 
                   rounded-3xl p-10 max-w-xl w-full shadow-[0_0_40px_rgba(168,85,247,0.3)] text-center"
      >
        <h1 className="text-4xl font-extrabold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent mb-6">
          🧠 Password Strength Analyzer
        </h1>

        <input
          type="password"
          value={password}
          onChange={(e) => analyzePassword(e.target.value)}
          placeholder="Enter your password..."
          className="w-full bg-neutral-900/60 border border-gray-700 text-white rounded-xl p-3 text-center 
                     focus:outline-none focus:border-purple-500 transition mb-6"
        />

        {/* Animated Strength Meter */}
        <div className="relative flex justify-center items-center my-8">
          <motion.div
            animate={{
              scale: [1, 1.05, 1],
              boxShadow: [
                "0 0 20px rgba(168,85,247,0.3)",
                "0 0 40px rgba(168,85,247,0.6)",
                "0 0 20px rgba(168,85,247,0.3)",
              ],
            }}
            transition={{ repeat: Infinity, duration: 2 }}
            className={`w-48 h-48 rounded-full bg-gradient-to-r ${getColor()} flex items-center justify-center relative`}
          >
            <motion.div
              animate={{ rotate: [0, 360] }}
              transition={{ repeat: Infinity, duration: 6, ease: "linear" }}
              className="absolute w-[90%] h-[90%] border-2 border-white/10 rounded-full"
            ></motion.div>
            <p className="text-xl font-semibold">{strength || "No Input"}</p>
          </motion.div>
        </div>

        {password && (
          <p className="text-gray-300 text-sm mb-3">
            Entropy: <span className="text-purple-400">{entropy}</span> bits
          </p>
        )}

        {feedback && (
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-md font-medium text-gray-300 italic mb-6"
          >
            {feedback}
          </motion.p>
        )}

        {issues.length > 0 && (
          <div className="bg-neutral-900/50 border border-gray-700 rounded-xl p-4 text-left">
            <h2 className="text-purple-400 font-semibold mb-2 flex items-center gap-2">
              <FaExclamationTriangle /> Improvements:
            </h2>
            <ul className="list-disc list-inside text-gray-300 text-sm space-y-1">
              {issues.map((issue, i) => (
                <li key={i}>{issue}</li>
              ))}
            </ul>
          </div>
        )}
      </motion.div>

      <p className="absolute bottom-4 text-gray-500 text-xs italic">
        Powered by <span className="text-purple-400">PassShield AI</span> 💜
      </p>
    </div>
  );
};

export default PasswordChecker;
