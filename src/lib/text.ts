/** Coupe un titre en phrases (point latin ou virgule arabe) pour l'affichage sur deux lignes. */
export function splitTitle(title: string): string[] {
  return title
    .split(/(?<=[.،])\s+/)
    .map((s) => s.trim())
    .filter(Boolean);
}

/** "+212 699 680 772" → "+212699680772" (pour les liens tel:). */
export function telHref(phone: string): string {
  return `tel:${phone.replace(/[^\d+]/g, "")}`;
}

export function pad2(n: number): string {
  return String(n).padStart(2, "0");
}
