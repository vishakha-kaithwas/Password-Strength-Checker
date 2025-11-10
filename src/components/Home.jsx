import React, { useEffect, useState } from "react";
import { motion, useMotionValue, useTransform } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { FaCogs, FaBrain, FaLock } from "react-icons/fa";

const Home = () => {
  const [intro, setIntro] = useState(true);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const navigate = useNavigate();

  // Redirect if no username
  useEffect(() => {
    const name = localStorage.getItem("passshieldUser");
    if (!name) navigate("/signup");
  }, [navigate]);

  // Boot-up voice
  useEffect(() => {
    const speak = (text) => {
      if ("speechSynthesis" in window) {
        const utter = new SpeechSynthesisUtterance(text);
        utter.rate = 0.9;
        utter.pitch = 1.1;
        utter.volume = 1;
        utter.lang = "en-US";
        utter.voice =
          window.speechSynthesis
            .getVoices()
            .find((v) => v.name.includes("Female") || v.name.includes("Google")) || null;
        window.speechSynthesis.speak(utter);
      }
    };

    const boot = setTimeout(() => {
      const username = localStorage.getItem("passshieldUser") || "Commander";
      speak(`Welcome ${username}. PassShield System initialized.`);
    }, 1000);

    const end = setTimeout(() => setIntro(false), 3500);

    return () => {
      clearTimeout(boot);
      clearTimeout(end);
    };
  }, []);

  // Parallax Motion
  const handleMouseMove = (e) => {
    mouseX.set(e.clientX);
    mouseY.set(e.clientY);
  };
  const translateX = useTransform(mouseX, [0, window.innerWidth], [-15, 15]);
  const translateY = useTransform(mouseY, [0, window.innerHeight], [-10, 10]);

  // Custom cursor
  useEffect(() => {
    const cursor = document.createElement("div");
    cursor.className =
      "fixed w-10 h-10 rounded-full pointer-events-none mix-blend-screen bg-gradient-to-r from-purple-500 to-blue-400 blur-lg opacity-70 transition-all duration-300";
    document.body.appendChild(cursor);

    const move = (e) => {
      cursor.style.left = `${e.pageX - 20}px`;
      cursor.style.top = `${e.pageY - 20}px`;
    };
    window.addEventListener("mousemove", move);

    return () => {
      cursor.remove();
      window.removeEventListener("mousemove", move);
    };
  }, []);

  // Intro Screen
  if (intro) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-black text-purple-400 font-mono text-2xl">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 1, 0.5, 1] }}
          transition={{ repeat: Infinity, duration: 1.2 }}
        >
          <p>Initializing PassShield OS...</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 1.5 }}
          className="text-sm mt-4 text-blue-400"
        >
          <p>Loading neural encryption core...</p>
        </motion.div>
      </div>
    );
  }

  // Main Interface
  return (
    <motion.div
      onMouseMove={handleMouseMove}
      className="relative min-h-screen overflow-hidden flex flex-col items-center justify-center text-white"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 2 }}
    >
      {/* Background */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-[#070011] via-[#100022] to-[#000000]"
        style={{ x: translateX, y: translateY }}
      />
      <div className="absolute inset-0 bg-[radial-gradient(circle,#a855f720_1px,transparent_1px)] [background-size:22px_22px] opacity-20" />

      {/* Glow Core */}
      <motion.div
        className="absolute w-[700px] h-[700px] rounded-full bg-gradient-to-tr from-purple-500/20 to-blue-500/20 blur-[150px]"
        animate={{
          scale: [1, 1.05, 1],
          opacity: [0.6, 1, 0.6],
          rotate: 360,
        }}
        transition={{ repeat: Infinity, duration: 25, ease: "linear" }}
      />

      {/* Title */}
      <motion.h1
        initial={{ y: -60, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1 }}
        className="text-6xl md:text-7xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-blue-400 to-pink-400 mb-6 drop-shadow-[0_0_25px_rgba(168,85,247,0.7)]"
      >
        PassShield OS
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.3 }}
        className="text-gray-400 text-center max-w-2xl text-lg mb-14 leading-relaxed"
      >
        Welcome, Commander. Choose your operation — Forge, Analyze, or Scan.
      </motion.p>

      {/* Cards */}
      <div className="relative z-10 grid grid-cols-1 sm:grid-cols-3 gap-10 w-full max-w-6xl px-6">
        {[
          {
            icon: <FaCogs />,
            title: "AI Password Forge",
            desc: "Craft unbreakable passwords with intelligence.",
            link: "/generate",
            color: "from-purple-500 to-pink-500",
          },
          {
            icon: <FaBrain />,
            title: "Strength Analyzer",
            desc: "Scan and visualize password complexity.",
            link: "/check",
            color: "from-blue-500 to-cyan-400",
          },
          {
            icon: <FaLock />,
            title: "Breach Scanner",
            desc: "Detect leaks instantly via HaveIBeenPwned API.",
            link: "/breach",
            color: "from-green-500 to-teal-400",
          },
        ].map((card, i) => (
          <Link key={i} to={card.link}>
            <motion.div
              whileHover={{
                scale: 1.08,
                rotateY: 8,
                boxShadow: "0 0 40px rgba(168,85,247,0.7)",
              }}
              whileTap={{ scale: 0.97 }}
              className={`relative group h-[260px] p-8 rounded-3xl cursor-pointer border border-white/10 bg-gradient-to-br ${card.color} bg-opacity-10 backdrop-blur-2xl hover:border-white/40 transition-all duration-300`}
            >
              <motion.div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-purple-600/20 to-blue-500/20 opacity-0 group-hover:opacity-100 blur-2xl transition duration-500" />
              <div className="text-5xl mb-4 text-white/90 drop-shadow-[0_0_10px_rgba(168,85,247,0.8)]">
                {card.icon}
              </div>
              <h2 className="text-2xl font-bold text-white mb-2">{card.title}</h2>
              <p className="text-gray-300 text-sm">{card.desc}</p>
            </motion.div>
          </Link>
        ))}
      </div>

      {/* Floating Particles */}
      {Array.from({ length: 25 }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-[2px] h-[2px] bg-purple-400 rounded-full opacity-60"
          initial={{
            x: Math.random() * window.innerWidth,
            y: Math.random() * window.innerHeight,
          }}
          animate={{
            y: ["100%", "-10%"],
            opacity: [0.3, 1, 0],
          }}
          transition={{
            duration: 8 + Math.random() * 4,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}

      <motion.p
        className="absolute bottom-5 text-gray-500 text-xs"
        animate={{ opacity: [0.7, 1, 0.7] }}
        transition={{ repeat: Infinity, duration: 4 }}
      >
        ⚡ Powered by <span className="text-purple-400 font-semibold">PassShield AI System</span>
      </motion.p>
    </motion.div>
  );
};

export default Home;
