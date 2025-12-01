// module.exports = {
//   content: ["./src/**/*.{js,jsx,ts,tsx,html}"],
//   theme: {
//     extend: {
//       colors: {
//         background: "#0d1117",
//         surface: "#161b22",
//         border: "#30363d",
//         dsa: "#f97316",
//         project: "#10b981",
//         backend: "#3b82f6",
//         frontend: "#a855f7",
//         workout: "#ef4444",
//       },
//       fontFamily: {
//         sans: ["Inter", "sans-serif"],
//       },
//     },
//   },
//   plugins: [],
// };

export default {
  content: [
    "./index.html",
    "./index.tsx",
    "./App.tsx",
    "./components/**/*.{ts,tsx}",
    "./services/**/*.{ts,tsx}",
    "./utils/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        dsa: "#f97316",
        project: "#10b981",
        backend: "#3b82f6",
        frontend: "#a855f7",
        workout: "#ef4444",
        background: "#0f172a",
        surface: "#1e293b",
        border: "#334155",
      },
    },
  },
  plugins: [],
};
