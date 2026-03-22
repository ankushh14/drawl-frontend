export const getThemeStyles = (darkMode) => ({
  page: darkMode
    ? "bg-gradient-to-br from-[#0f0f11] via-[#1a1b1f] to-[#0f0f11] text-white"
    : "bg-[#f8fafc] text-gray-900",

  card: darkMode
    ? "bg-white/5 border border-white/10 backdrop-blur-xl"
    : "bg-white border border-gray-200 shadow-sm",

  input: darkMode
    ? "bg-white/5 border border-white/10 text-white placeholder:text-gray-400"
    : "bg-white border border-gray-300 text-gray-900 placeholder:text-gray-500",

  hoverBorder: darkMode ? "hover:border-white/20" : "hover:border-gray-400",

  mutedText: darkMode ? "text-gray-400" : "text-gray-600",

  divider: darkMode ? "bg-white/10" : "bg-gray-200",

  overlay: darkMode
    ? "bg-black/40 backdrop-blur-sm"
    : "bg-black/20 backdrop-blur-sm",

  overlayCard: darkMode
    ? "bg-[#1a1b1f] border border-white/10 shadow-2xl"
    : "bg-white border border-gray-200 shadow-lg",
});
