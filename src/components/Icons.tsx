export function Arrow({ className = "" }: { className?: string }) {
  return (
    <svg
      className={`arrow ${className}`.trim()}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="square"
      aria-hidden="true"
      focusable="false"
    >
      <path d="M3 12h17M14 6l6 6-6 6" />
    </svg>
  );
}

export type IconName = "globe" | "exchange" | "droplet" | "gear" | "nut" | "pin";

/** Pictogrammes au trait, fins et sobres. */
export function Icon({ name, className = "" }: { name: IconName; className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.1"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
    >
      {name === "globe" && (
        <>
          <circle cx="12" cy="12" r="9" />
          <ellipse cx="12" cy="12" rx="4" ry="9" />
          <path d="M3 12h18M4.6 7.5h14.8M4.6 16.5h14.8" />
        </>
      )}
      {name === "exchange" && (
        <>
          <path d="M4 8h15l-3.5-3.5M20 16H5l3.5 3.5" />
        </>
      )}
      {name === "droplet" && (
        <>
          <path d="M12 3c3.2 4.3 6.2 7.1 6.2 10.6a6.2 6.2 0 0 1-12.4 0C5.8 10.100 8.800 7.300 12 3z" />
          <path d="M9.200 14.200a2.900 2.900 0 0 0 2.300 2.400" />
        </>
      )}
      {name === "gear" && (
        <>
          <circle cx="12" cy="12" r="3" />
          <circle cx="12" cy="12" r="6.500" />
          <path d="M12 2.500v3M12 18.500v3M2.500 12h3M18.500 12h3M5.300 5.300l2.100 2.100M16.600 16.600l2.100 2.100M18.700 5.300l-2.100 2.100M7.400 16.600l-2.100 2.100" />
        </>
      )}
      {name === "nut" && (
        <>
          <path d="M12 3l7.800 4.500v9L12 21l-7.800-4.500v-9z" />
          <circle cx="12" cy="12" r="2.800" />
        </>
      )}
      {name === "pin" && (
        <>
          <path d="M12 21s7-6.100 7-11.500a7 7 0 0 0-14 0C5 14.900 12 21 12 21z" />
          <circle cx="12" cy="9.500" r="2.500" />
        </>
      )}
    </svg>
  );
}

export const expertiseIcons: IconName[] = ["globe", "exchange", "droplet", "gear", "nut", "pin"];
