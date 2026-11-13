/**
 * Données globales du site : coordonnées, langues, routes.
 * C'est LE fichier à modifier pour changer une coordonnée ou un lien.
 */

export const company = {
  name: "GUENNOUN GROUP",
  // Coordonnées fournies par le client. Ne pas modifier sans son accord.
  address: {
    line1: "53, Boulevard Fouarat, Hay Mohammadi",
    line2: "Casablanca 20000",
    country: { fr: "Maroc", en: "Morocco", ar: "المغرب" },
  },
  phone: "+212 699 680 772",
  email: "geunnoun.net@gmail.com",
  // Liens vers les réseaux sociaux : à renseigner UNIQUEMENT quand les comptes officiels sont créés et vérifiés.
  social: {
    facebook: "",
    instagram: "",
  },
} as const;

export const locales = ["fr", "en", "ar"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "fr";

export const localeMeta: Record<
  Locale,
  { label: string; short: string; dir: "ltr" | "rtl"; htmlLang: string; ogLocale: string }
> = {
  fr: { label: "Français", short: "FR", dir: "ltr", htmlLang: "fr", ogLocale: "fr_MA" },
  en: { label: "English", short: "EN", dir: "ltr", htmlLang: "en", ogLocale: "en_GB" },
  ar: { label: "العربية", short: "AR", dir: "rtl", htmlLang: "ar", ogLocale: "ar_MA" },
};

export type PageId = "home" | "about" | "expertise" | "commitments" | "partnerships" | "contact";

/** Un slug par langue et par page. Chaîne vide = accueil. */
export const slugs: Record<PageId, Record<Locale, string>> = {
  home: { fr: "", en: "", ar: "" },
  about: { fr: "a-propos", en: "about", ar: "about" },
  expertise: { fr: "notre-expertise", en: "expertise", ar: "expertise" },
  commitments: { fr: "nos-engagements", en: "commitments", ar: "commitments" },
  partnerships: { fr: "partenariats", en: "partnerships", ar: "partnerships" },
  contact: { fr: "contact", en: "contact", ar: "contact" },
};

export const pageIds = Object.keys(slugs) as PageId[];
export const navPages: PageId[] = ["home", "about", "expertise", "commitments", "partnerships", "contact"];

export function pathFor(locale: Locale, page: PageId): string {
  const slug = slugs[page][locale];
  return slug ? `/${locale}/${slug}/` : `/${locale}/`;
}

export function pageFromSlug(locale: Locale, slug: string[] | undefined): PageId | null {
  const s = (slug ?? []).join("/");
  return pageIds.find((p) => slugs[p][locale] === s) ?? null;
}

export const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL ?? "").replace(/\/$/, "");
export const allowIndexing = process.env.NEXT_PUBLIC_ALLOW_INDEXING === "true";
export const formEndpoint = process.env.NEXT_PUBLIC_FORM_ENDPOINT ?? "";

export const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
  "53 Boulevard Fouarat, Hay Mohammadi, Casablanca 20000, Maroc",
)}`;
