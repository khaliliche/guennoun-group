import Link from "next/link";
import { locales, localeMeta, pathFor, type Locale, type PageId } from "@/content/site";

/** Seules les langues réellement traduites et implémentées (toutes les entrées de `locales`) sont proposées. */
export default function LanguageSwitcher({
  locale,
  page,
  label,
  onNavigate,
}: {
  locale: Locale;
  page: PageId;
  label: string;
  onNavigate?: () => void;
}) {
  return (
    <nav className="lang-switch" aria-label={label}>
      {locales.map((l) => (
        <Link
          key={l}
          href={pathFor(l, page)}
          hrefLang={localeMeta[l].htmlLang}
          lang={localeMeta[l].htmlLang}
          aria-label={localeMeta[l].label}
          aria-current={l === locale ? "true" : undefined}
          onClick={onNavigate}
        >
          {localeMeta[l].short}
        </Link>
      ))}
    </nav>
  );
}
