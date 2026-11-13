import Link from "next/link";
import Logo from "./Logo";
import LanguageSwitcher from "./LanguageSwitcher";
import { company, navPages, pathFor, type Locale, type PageId } from "@/content/site";
import { getDict } from "@/content";
import { telHref } from "@/lib/text";

export default function Footer({ locale, page }: { locale: Locale; page: PageId }) {
  const d = getDict(locale);
  const f = d.footer;
  const social = [
    { name: "Facebook", href: company.social.facebook },
    { name: "Instagram", href: company.social.instagram },
  ].filter((s) => s.href); // Aucun lien tant que les comptes officiels ne sont pas vérifiés

  return (
    <footer className="site-footer on-dark">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-brand">
            <Logo locale={locale} descriptor={d.brandDescriptor} variant="footer" />
            <p>{f.descriptor}</p>
            <p className="footer-tagline">{f.tagline}</p>
          </div>

          <nav aria-label={d.common.footerNav}>
            <h2 className="footer-title">{f.navTitle}</h2>
            <ul className="footer-list">
              {navPages.map((p) => (
                <li key={p}>
                  <Link href={pathFor(locale, p)}>{d.nav[p]}</Link>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h2 className="footer-title">{f.contactTitle}</h2>
            <ul className="footer-list">
              <li>
                <span>
                  <bdi dir="ltr">{company.address.line1}</bdi>
                  <br />
                  <bdi dir="ltr">{company.address.line2}</bdi>, {company.address.country[locale]}
                </span>
              </li>
              <li>
                <a className="ltr" href={telHref(company.phone)}>
                  {company.phone}
                </a>
              </li>
              <li>
                <a className="ltr" href={`mailto:${company.email}`}>
                  {company.email}
                </a>
              </li>
              {social.map((s) => (
                <li key={s.name}>
                  <a href={s.href} target="_blank" rel="noopener noreferrer">
                    {s.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="footer-title">{f.languagesTitle}</h2>
            <LanguageSwitcher locale={locale} page={page} label={d.common.language} />
          </div>
        </div>

        <div className="footer-mark" aria-hidden="true">
          {company.name}
        </div>

        <div className="footer-bottom">
          <span>
            © {new Date().getFullYear()} {company.name}. {d.common.rights}
          </span>
          <span>{d.brandDescriptor}</span>
        </div>
      </div>
    </footer>
  );
}
