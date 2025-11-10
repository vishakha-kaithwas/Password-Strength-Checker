<<<<<<< HEAD
import React, { useState } from "react";

const tips = [
  {
    id: 1,
    title: "🔐 What’s a Data Breach?",
    content:
      "A data breach happens when confidential information (like passwords or personal data) is exposed to unauthorized people. Breaches often occur due to weak or reused passwords.",
  },
  {
    id: 2,
    title: "💥 Why Special Characters Matter?",
    content:
      "Adding characters like !, @, #, or $ increases password complexity. This makes it exponentially harder for hackers to guess or brute-force your password.",
  },
  {
    id: 3,
    title: "🧮 What is Entropy?",
    content:
      "Entropy measures how unpredictable your password is. Higher entropy means more randomness, making your password stronger and harder to crack.",
  },
];

const EducationTips = () => {
  const [showTips, setShowTips] = useState(false);

  return (
    <div className="mt-8 text-center">
      <button
        onClick={() => setShowTips(!showTips)}
        className="px-5 py-2 bg-purple-500 hover:bg-purple-600 text-white rounded-lg transition-all duration-300"
      >
        {showTips ? "❌ Hide Education Mode" : "🎓 Learn About Password Security"}
      </button>

      {showTips && (
        <div className="mt-5 grid grid-cols-1 gap-4">
          {tips.map((tip) => (
            <div
              key={tip.id}
              className="bg-neutral-800 text-left p-4 rounded-xl border border-gray-700 shadow-lg hover:border-purple-400 transition"
            >
              <h3 className="text-lg font-semibold mb-2 text-purple-400">
                {tip.title}
              </h3>
              <p className="text-gray-300 text-sm leading-relaxed">{tip.content}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default EducationTips;
=======
import React, { useState } from "react";

const tips = [
  {
    id: 1,
    title: "🔐 What’s a Data Breach?",
    content:
      "A data breach happens when confidential information (like passwords or personal data) is exposed to unauthorized people. Breaches often occur due to weak or reused passwords.",
  },
  {
    id: 2,
    title: "💥 Why Special Characters Matter?",
    content:
      "Adding characters like !, @, #, or $ increases password complexity. This makes it exponentially harder for hackers to guess or brute-force your password.",
  },
  {
    id: 3,
    title: "🧮 What is Entropy?",
    content:
      "Entropy measures how unpredictable your password is. Higher entropy means more randomness, making your password stronger and harder to crack.",
  },
];

const EducationTips = () => {
  const [showTips, setShowTips] = useState(false);

  return (
    <div className="mt-8 text-center">
      <button
        onClick={() => setShowTips(!showTips)}
        className="px-5 py-2 bg-purple-500 hover:bg-purple-600 text-white rounded-lg transition-all duration-300"
      >
        {showTips ? "❌ Hide Education Mode" : "🎓 Learn About Password Security"}
      </button>

      {showTips && (
        <div className="mt-5 grid grid-cols-1 gap-4">
          {tips.map((tip) => (
            <div
              key={tip.id}
              className="bg-neutral-800 text-left p-4 rounded-xl border border-gray-700 shadow-lg hover:border-purple-400 transition"
            >
              <h3 className="text-lg font-semibold mb-2 text-purple-400">
                {tip.title}
              </h3>
              <p className="text-gray-300 text-sm leading-relaxed">{tip.content}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default EducationTips;
>>>>>>> a02dd7788877427050b935a9032a575a193eb713
