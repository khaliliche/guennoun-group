import Reveal from "@/components/Reveal";
import ContactForm from "@/components/ContactForm";
import { PageHero } from "@/components/ui";
import { getDict } from "@/content";
import { company, mapsUrl, type Locale } from "@/content/site";
import { telHref } from "@/lib/text";

export default function ContactPage({ locale }: { locale: Locale }) {
  const d = getDict(locale);
  const p = d.contactPage;

  return (
    <>
      <PageHero label={p.hero.label} title={p.hero.title} intro={p.hero.intro} />

      <section className="section" aria-label={p.hero.label}>
        <div className="container">
          <div className="contact-layout">
            <Reveal>
              <h2 className="form__title" style={{ marginBottom: 32 }}>
                {p.infoTitle}
              </h2>
              <div className="info-list">
                <div className="info-item">
                  <span className="contact-col__label">{d.common.address}</span>
                  <address className="contact-col__value" style={{ fontStyle: "normal" }}>
                    <bdi dir="ltr">{company.address.line1}</bdi>
                    <br />
                    <bdi dir="ltr">{company.address.line2}</bdi>, {company.address.country[locale]}
                  </address>
                  <div style={{ marginTop: 16 }}>
                    <a className="link-arrow" href={mapsUrl} target="_blank" rel="noopener noreferrer">
                      {d.common.viewOnMap}
                      <span className="sr-only"> (↗)</span>
                    </a>
                  </div>
                </div>
                <div className="info-item">
                  <span className="contact-col__label">{d.common.phone}</span>
                  <a className="contact-col__value ltr" href={telHref(company.phone)}>
                    {company.phone}
                  </a>
                </div>
                <div className="info-item">
                  <span className="contact-col__label">{d.common.email}</span>
                  <a className="contact-col__value ltr" href={`mailto:${company.email}`}>
                    {company.email}
                  </a>
                </div>
              </div>
            </Reveal>

            <Reveal delay={120}>
              <ContactForm locale={locale} t={p} />
            </Reveal>
          </div>
        </div>
      </section>
    </>
  );
}
