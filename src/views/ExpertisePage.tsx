import Reveal from "@/components/Reveal";
import { ConceptImage, CtaBand, PageHero } from "@/components/ui";
import { Icon, expertiseIcons } from "@/components/Icons";
import { getDict } from "@/content";
import type { Locale } from "@/content/site";
import { pad2 } from "@/lib/text";

export default function ExpertisePage({ locale }: { locale: Locale }) {
  const d = getDict(locale);
  const p = d.expertisePage;

  return (
    <>
      <PageHero label={p.hero.label} title={p.hero.title} intro={p.hero.intro} />

      <section className="section" aria-label={p.hero.label}>
        <div className="container">
          <div className="expertise-layout">
          <aside className="expertise-aside">
            <ConceptImage locale={locale} name="logistics" ratio="4 / 5" position="50% 55%" />
          </aside>
          <div>
          <ol className="domains domains--aside">
            {d.expertiseItems.map((item, i) => (
              <Reveal as="li" className="domain" key={item.title}>
                <div className="domain__head">
                  <span className="card__num">{pad2(i + 1)}</span>
                  <Icon name={expertiseIcons[i]} className="card__icon" />
                </div>
                <h2 className="domain__title">{item.title}</h2>
                <p className="domain__text">{item.long}</p>
              </Reveal>
            ))}
          </ol>
          <p className="note">{p.note}</p>
          </div>
          </div>
        </div>
      </section>

      <CtaBand locale={locale} bg="logistics" title={p.cta.title} text={p.cta.text} buttonLabel={d.common.partnershipCta} />
    </>
  );
}
