import Reveal from "@/components/Reveal";
import { CtaBand, PageHero, SectionHead } from "@/components/ui";
import { getDict } from "@/content";
import type { Locale } from "@/content/site";
import { pad2 } from "@/lib/text";

export default function PartnershipsPage({ locale }: { locale: Locale }) {
  const d = getDict(locale);
  const p = d.partnershipsPage;

  return (
    <>
      <PageHero label={p.hero.label} title={p.hero.title} intro={p.hero.intro} />

      <section className="section section--cloud" aria-labelledby="audience-title">
        <div className="container">
          <SectionHead label={p.audience.label} title={p.audience.title} id="audience-title" />
          <div className="cards cards--2">
            {p.audience.items.map((item, i) => (
              <Reveal as="article" className="card spot" key={item.title} delay={(i % 2) * 90}>
                <div className="card__top">
                  <span className="card__num">{pad2(i + 1)}</span>
                </div>
                <h3 className="card__title">{item.title}</h3>
                <p className="card__text">{item.text}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section section--navy on-dark" aria-labelledby="approach-title">
        <div className="container">
          <SectionHead label={p.approach.label} title={p.approach.title} id="approach-title" />
          <ol className="steps">
            {p.approach.steps.map((s, i) => (
              <Reveal as="li" className="step" key={s.title} delay={i * 90}>
                <span className="step__num">{pad2(i + 1)}</span>
                <h3>{s.title}</h3>
                <p>{s.text}</p>
              </Reveal>
            ))}
          </ol>
          <p className="steps-note">{p.approach.note}</p>
        </div>
      </section>

      <CtaBand locale={locale} bg="boardroom" title={p.cta.title} text={p.cta.text} buttonLabel={d.common.partnershipCta} />
    </>
  );
}
