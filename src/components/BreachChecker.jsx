import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import sha1 from "js-sha1";
import { FaLock, FaCheckCircle, FaExclamationTriangle } from "react-icons/fa";

const BreachChecker = () => {
  const [password, setPassword] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const checkBreach = async () => {
    if (!password) return;
    setLoading(true);
    setResult(null);
    setError("");

    const hash = sha1(password).toUpperCase();
    const prefix = hash.substring(0, 5);
    const suffix = hash.substring(5);

    try {
      const response = await fetch(`https://api.pwnedpasswords.com/range/${prefix}`);
      const text = await response.text();
      const lines = text.split("\n");
      const match = lines.find((line) => line.startsWith(suffix));

      if (match) {
        const count = match.split(":")[1];
        setResult({
          found: true,
          count: count,
          message: `⚠️ Found in ${count} data breaches. Change this password immediately!`,
        });
      } else {
        setResult({
          found: false,
          message: "✅ This password has never been found in any known breach.",
        });
      }
    } catch (err) {
      setError("Network error — unable to check right now.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center bg-black text-white overflow-hidden px-4">
      {/* Animated Matrix Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-black via-[#001a00] to-black opacity-95" />
        {[...Array(40)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-[2px] h-[20px] bg-green-500/30"
            initial={{
              y: Math.random() * window.innerHeight,
              x: Math.random() * window.innerWidth,
            }}
            animate={{ y: [0, window.innerHeight, 0] }}
            transition={{
              repeat: Infinity,
              duration: 4 + Math.random() * 3,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      {/* Main Card */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="relative z-10 bg-gradient-to-b from-neutral-900/80 to-black/90 backdrop-blur-2xl 
                   border border-green-800/50 rounded-3xl p-10 max-w-2xl w-full 
                   shadow-[0_0_40px_rgba(34,197,94,0.3)] text-center"
      >
        <h1 className="text-4xl font-extrabold mb-6 bg-gradient-to-r from-green-400 to-emerald-500 bg-clip-text text-transparent">
          🔍 Dark Web Breach Scanner
        </h1>
        <p className="text-sm text-gray-400 mb-8">
          Check if your password has ever been exposed in a public data breach using the{" "}
          <span className="text-green-400 font-semibold">HaveIBeenPwned</span> API.
        </p>

        {/* Input Section */}
        <div className="flex flex-col sm:flex-row justify-center gap-3 mb-6">
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter password to scan..."
            className="w-full sm:w-2/3 bg-neutral-900/80 border border-green-800 text-white rounded-xl p-3 text-center 
                       focus:outline-none focus:border-green-400 transition placeholder-gray-600"
          />
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={checkBreach}
            disabled={loading}
            className="px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-600 rounded-xl font-semibold text-white 
                       shadow-[0_0_20px_rgba(34,197,94,0.4)] hover:shadow-[0_0_30px_rgba(34,197,94,0.6)] transition"
          >
            {loading ? "Scanning..." : "Start Scan"}
          </motion.button>
        </div>

        {/* Loading Animation */}
        <AnimatePresence>
          {loading && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="mt-6 flex flex-col items-center justify-center space-y-2 text-green-400 font-mono text-sm"
            >
              <FaLock className="text-3xl animate-spin-slow" />
              <p>Accessing breach database...</p>
              <p>Comparing encrypted hashes...</p>
              <p>Decrypting results...</p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Result */}
        {result && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className={`mt-8 border-2 ${
              result.found ? "border-red-500" : "border-green-500"
            } rounded-xl p-4 bg-neutral-900/60`}
          >
            <div className="flex items-center justify-center gap-2 mb-2">
              {result.found ? (
                <FaExclamationTriangle className="text-red-500 text-2xl" />
              ) : (
                <FaCheckCircle className="text-green-500 text-2xl" />
              )}
              <h2
                className={`text-lg font-semibold ${
                  result.found ? "text-red-400" : "text-green-400"
                }`}
              >
                {result.found ? "Compromised Password" : "Secure Password"}
              </h2>
            </div>
            <p className="text-gray-300">{result.message}</p>
          </motion.div>
        )}

        {/* Error */}
        {error && <p className="text-red-500 font-medium mt-4">{error}</p>}
      </motion.div>

      <p className="absolute bottom-4 text-green-500/70 text-xs italic">
        Secured by <span className="text-green-400 font-semibold">PassShield AI</span> 🛡️
      </p>
    </div>
  );
};

export default BreachChecker;
