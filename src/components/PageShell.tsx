import type { ReactNode } from "react";
import Header from "./Header";
import Footer from "./Footer";
import Effects from "./fx/Effects";
import ScrollProgress from "./fx/ScrollProgress";
import { getDict } from "@/content";
import type { Locale, PageId } from "@/content/site";

/** Gabarit commun : lien d'évitement, barre de progression, en-tête, contenu, pied de page. */
export default function PageShell({
  locale,
  page,
  children,
}: {
  locale: Locale;
  page: PageId;
  children: ReactNode;
}) {
  const d = getDict(locale);
  return (
    <>
      <a className="skip-link" href="#main">
        {d.common.skipToContent}
      </a>
      <ScrollProgress />
      <Effects />
      <Header locale={locale} page={page} nav={d.nav} common={d.common} descriptor={d.brandDescriptor} />
      <main id="main" tabIndex={-1}>
        {children}
      </main>
      <Footer locale={locale} page={page} />
    </>
  );
}
