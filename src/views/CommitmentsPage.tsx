import Reveal from "@/components/Reveal";
import { CtaBand, PageHero } from "@/components/ui";
import { getDict } from "@/content";
import type { Locale } from "@/content/site";
import { pad2 } from "@/lib/text";

export default function CommitmentsPage({ locale }: { locale: Locale }) {
  const d = getDict(locale);
  const p = d.commitmentsPage;

  return (
    <>
      <PageHero label={p.hero.label} title={p.hero.title} intro={p.hero.intro} />

      <section className="section" aria-label={p.hero.label}>
        <div className="container">
          <div className="commit-grid">
            {d.commitmentItems.map((c, i) => (
              <Reveal as="article" className="commit commit--long spot" key={c.title} delay={(i % 3) * 90}>
                <span className="commit__num">{pad2(i + 1)}</span>
                <h2 className="commit__title">{c.title}</h2>
                <p className="commit__text">{c.long}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <CtaBand locale={locale} bg="tower" title={p.cta.title} text={p.cta.text} buttonLabel={d.common.contactUs} partnership={false} />
    </>
  );
}
