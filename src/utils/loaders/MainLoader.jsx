export default function MainLoader() {
  return (
    <div
      className={`fixed inset-0 z-[1000] flex items-center justify-center transition-colors duration-500`}
    >
      {" "}
      <div className="flex flex-col items-center gap-4 px-8 py-6 rounded-2xl backdrop-blur-xl">
        <h1 className="text-3xl xl:text-5xl font-Aclonica font-semibold tracking-wide">
          <span className="bg-gradient-to-r from-purple-400 via-pink-500 to-indigo-400 bg-clip-text text-transparent animate-pulse">
            DrawL
          </span>
        </h1>
        <div className="flex gap-2 mt-2">
          <span className="w-2 h-2 rounded-full bg-current animate-bounce [animation-delay:-0.3s]" />
          <span className="w-2 h-2 rounded-full bg-current animate-bounce [animation-delay:-0.15s]" />
          <span className="w-2 h-2 rounded-full bg-current animate-bounce" />
        </div>
      </div>
    </div>
  );
}
