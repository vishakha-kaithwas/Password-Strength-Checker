import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles } from "lucide-react";

const AssistantTooltip = ({ tips }) => {
  return (
    <AnimatePresence>
      {tips && tips.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.95 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="absolute bottom-24 right-0 z-50 w-72 
                     bg-gradient-to-br from-[#7e22ce]/80 via-[#3b82f6]/80 to-[#8b5cf6]/80
                     backdrop-blur-xl text-white text-sm rounded-2xl shadow-[0_0_25px_rgba(168,85,247,0.3)] 
                     border border-purple-400/40 p-4 overflow-hidden"
        >
          {/* Header Section */}
          <motion.div
            className="flex items-center mb-2"
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
          >
            <Sparkles className="w-5 h-5 mr-2 text-yellow-300 animate-pulse" />
            <span className="font-semibold text-yellow-200 tracking-wide drop-shadow-[0_0_6px_rgba(250,204,21,0.4)]">
              PassShield AI Assistant
            </span>
          </motion.div>

          {/* Divider Glow */}
          <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-purple-400/50 to-transparent mb-2" />

          {/* Tips List */}
          <motion.ul
            className="space-y-2 list-disc list-inside text-gray-100"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            {tips.map((tip, index) => (
              <motion.li
                key={index}
                className="hover:text-purple-200 transition-colors"
                whileHover={{ scale: 1.03 }}
              >
                {tip}
              </motion.li>
            ))}
          </motion.ul>

          {/* Glowing bottom edge */}
          <div className="absolute inset-x-0 bottom-0 h-[2px] bg-gradient-to-r from-purple-500 via-pink-500 to-blue-400 blur-md opacity-70" />
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default AssistantTooltip;
