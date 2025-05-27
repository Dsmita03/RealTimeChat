const AuthImagePattern = ({ title, subtitle }) => {
  return (
    <div className="hidden lg:flex items-center justify-center bg-base-200 p-16 relative overflow-hidden">
      {/* Subtle Background Glow */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute -top-16 -left-20 w-72 h-72 bg-primary/30 rounded-full blur-3xl opacity-40" />
        <div className="absolute bottom-0 right-0 w-64 h-64 bg-secondary/20 rounded-full blur-2xl opacity-30" />
      </div>

      {/* Content Container */}
      <div className="relative z-10 max-w-lg text-center">
        {/* Grid of Polished Tiles */}
        <div className="grid grid-cols-3 gap-4 mb-10">
          {[...Array(9)].map((_, i) => (
            <div
              key={i}
              className={`aspect-square rounded-xl ${
                i % 2 === 0
                  ? "bg-gradient-to-br from-primary to-primary/70 shadow-lg"
                  : "bg-white/10 border border-white/20 backdrop-blur-sm"
              } transition-all duration-300`}
            />
          ))}
        </div>

        {/* Title */}
        <h2 className="text-3xl font-semibold text-neutral-content mb-2 tracking-tight">
          {title}
        </h2>

        {/* Subtitle */}
        <p className="text-sm text-base-content/70 leading-relaxed">
          {subtitle}
        </p>
      </div>
    </div>
  );
};

export default AuthImagePattern;
