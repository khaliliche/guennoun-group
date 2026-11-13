import type { ReactNode } from "react";

/** Layout minimal de la racine « / », qui redirige vers la langue principale (français). */
export default function RedirectLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="fr">
      <body style={{ fontFamily: "system-ui, sans-serif", margin: 0, padding: 32, color: "#0b1f3a" }}>{children}</body>
    </html>
  );
}
