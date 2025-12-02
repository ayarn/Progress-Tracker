import React from "react";
import { useNavigate } from "react-router-dom";

const topics = [
  {
    name: "NodeJS",
    file: "NodeJS.pdf",
    description: "Node.js fundamentals, async patterns, modules, and more.",
    color: "bg-[#232e3c]",
    icon: (
      <div className="w-10 h-10 rounded-full bg-[#334155] flex items-center justify-center mb-2">
        <span className="text-lg font-bold text-gray-200">N</span>
      </div>
    ),
  },
  {
    name: "Git",
    file: "Git.pdf",
    description: "Version control basics, branching, merging, and workflows.",
    color: "bg-[#232e3c]",
    icon: (
      <div className="w-10 h-10 rounded-full bg-[#334155] flex items-center justify-center mb-2">
        <span className="text-lg font-bold text-gray-200">G</span>
      </div>
    ),
  },
];

const NotesPage: React.FC = () => {
  const navigate = useNavigate();

  const handleTopicClick = (file: string) => {
    navigate(`/notes/view/${file}`);
  };

  return (
    <div className="min-h-screen bg-[#0f172a] text-gray-300 font-sans selection:bg-blue-500/30">
      <div className="max-w-[1600px] mx-auto px-4 md:px-8 py-8 flex flex-col gap-6">
        {/* Top bar aligned with home theme */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-3 sm:gap-4 bg-[#1e293b] p-3 sm:p-4 rounded-xl border border-[#5a6b7a]/50 shadow-xl backdrop-blur-md bg-opacity-95">
          <div className="flex items-center gap-2 sm:gap-3 w-full sm:w-auto">
            <div className="grid grid-cols-2 gap-1 bg-[#0f172a] p-1.5 rounded border border-[#5a6b7a]/50">
              <div className="w-2.5 h-2.5 bg-[#f97316] rounded-[1px]"></div>
              <div className="w-2.5 h-2.5 bg-[#10b981] rounded-[1px]"></div>
              <div className="w-2.5 h-2.5 bg-[#3b82f6] rounded-[1px]"></div>
              <div className="w-2.5 h-2.5 bg-[#a855f7] rounded-[1px]"></div>
            </div>
            <div>
              <h1 className="font-bold text-xl tracking-tight text-white leading-none">
                LifeGrid Notes
              </h1>
              <span className="text-[10px] text-gray-500 font-medium tracking-wider uppercase">
                Study Library
              </span>
            </div>
          </div>

          <div className="flex gap-2 w-full sm:w-auto justify-end">
            <button
              onClick={() => navigate("/")}
              className="flex items-center justify-center gap-2 px-3 py-2 sm:px-4 sm:py-2 bg-[#5a6b7a]/40 hover:bg-[#5a6b7a]/80 rounded-lg text-xs sm:text-sm text-gray-200 hover:text-white transition-all active:scale-95 border border-transparent hover:border-gray-500 shadow-sm w-1/2 sm:w-auto"
            >
              <span className="text-lg leading-none">←</span>
              <span>Back to Home</span>
            </button>
          </div>
        </div>

        {/* Header */}
        <div className="text-left">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-2">
            Notes
          </h2>
          <p className="text-sm sm:text-base text-gray-400 max-w-xl">
            Quick-reference PDFs that complement your daily trackers. Pick a
            topic to open its detailed notes.
          </p>
        </div>

        {/* Topic cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {topics.map((topic) => (
            <div
              key={topic.name}
              className={`relative overflow-hidden rounded-2xl p-6 flex flex-col items-start ${topic.color} bg-opacity-80 hover:bg-opacity-100 hover:-translate-y-1 transition cursor-pointer border border-[#5a6b7a]/60`}
              onClick={() => handleTopicClick(topic.file)}
              style={{ boxShadow: "0 14px 35px rgba(15,23,42,0.7)" }}
            >
              {topic.icon}
              <div className="font-semibold text-lg mb-1 text-gray-50 tracking-tight">
                {topic.name}
              </div>
              <div className="text-xs text-gray-300/90 text-left mb-4 max-w-xs">
                {topic.description}
              </div>
              <button className="mt-auto px-4 py-2 bg-blue-700 hover:bg-blue-500 text-white rounded-lg font-semibold text-xs sm:text-sm shadow transition w-full sm:w-auto">
                View PDF
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default NotesPage;
