"use client";

export function ScrollBelowButton() {
  return (
    <button
      type="button"
      aria-label="Scroll to learn more"
      className="absolute bottom-8 left-1/2 z-40 flex h-12 w-12 -translate-x-1/2 animate-bounce items-center justify-center rounded-full border border-white/50 bg-surface-container-lowest/20 text-white backdrop-blur-sm transition-all hover:border-white hover:bg-surface-container-lowest/40"
      onClick={() => {
        window.scrollBy({
          top: window.innerHeight * 0.5,
          behavior: "smooth",
        });
      }}
    >
      <span className="h-3 w-3 rotate-45 border-b-2 border-r-2 border-current" aria-hidden="true" />
    </button>
  );
}
