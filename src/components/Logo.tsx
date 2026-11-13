import Link from "next/link";
import { pathFor, type Locale, company } from "@/content/site";

/**
 * Identité visuelle PROVISOIRE.
 * Le symbole « GN » est celui du logo existant (fichier fourni par l'entreprise).
 * Le mot-symbole « GUENNOUN GROUP » est composé en texte : ce n'est PAS une adaptation officielle du logo.
 * À remplacer par le logo vectoriel validé dès qu'il sera disponible (public/brand/).
 */
export default function Logo({
  locale,
  descriptor,
  variant = "header",
}: {
  locale: Locale;
  descriptor: string;
  variant?: "header" | "footer";
}) {
  const symbol = (
    // eslint-disable-next-line @next/next/no-img-element
    <img className="logo__symbol" src="/brand/gn-symbol.png" alt="" width={441} height={276} />
  );
  return (
    <Link
      href={pathFor(locale, "home")}
      className={`logo${variant === "footer" ? " logo--footer" : ""}`}
      aria-label={company.name}
    >
      {variant === "footer" ? <span className="logo__symbol-wrap">{symbol}</span> : symbol}
      <span className="logo__text" aria-hidden="true">
        <span className="logo__name">{company.name}</span>
        <span className="logo__descriptor">{descriptor}</span>
      </span>
    </Link>
  );
}
