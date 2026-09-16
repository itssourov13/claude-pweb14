export default function RssIcon({ className }: { className?: string }) {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      aria-hidden="true"
      className={className}
    >
      <circle cx="5.5" cy="14.5" r="1.5" fill="currentColor" />
      <path
        d="M4 8.5a7.5 7.5 0 017.5 7.5M4 4a12 12 0 0112 12"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}
