export function BrandMark() {
  return (
    <span
      className="relative flex h-9 w-9 items-center justify-center rounded-full border-2 border-current text-primary"
      aria-hidden="true"
    >
      <span className="h-3.5 w-3.5 rounded-full bg-current" />
      <span className="absolute -right-1 top-1 h-2.5 w-2.5 rounded-full bg-secondary" />
      <span className="absolute -bottom-1 left-1 h-2.5 w-2.5 rounded-full bg-secondary" />
    </span>
  );
}
