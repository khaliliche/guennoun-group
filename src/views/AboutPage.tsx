import Reveal from "@/components/Reveal";
import { CtaBand, PageHero, ConceptImage, TextLink } from "@/components/ui";
import { getDict } from "@/content";
import { pathFor, type Locale } from "@/content/site";
import { pad2 } from "@/lib/text";

export default function AboutPage({ locale }: { locale: Locale }) {
  const d = getDict(locale);
  const a = d.about;

  return (
    <>
      <PageHero label={a.hero.label} title={a.hero.title} intro={a.hero.intro} />

      {/* Identité */}
      <section className="section" aria-labelledby="identity-title">
        <div className="container">
          <div className="split">
            <Reveal>
              <p className="eyebrow">{a.identity.label}</p>
              <h2 className="h2" id="identity-title">
                {a.identity.title}
              </h2>
            </Reveal>
            <Reveal className="prose" delay={120}>
              {a.identity.paragraphs.map((p) => (
                <p key={p}>{p}</p>
              ))}
            </Reveal>
          </div>
          <Reveal className="about-photo">
            <ConceptImage locale={locale} name="boardroom" ratio="16 / 8" position="50% 62%" />
          </Reveal>
        </div>
      </section>

      {/* Activités */}
      <section className="section section--cloud" aria-labelledby="activities-title">
        <div className="container">
          <div className="split">
            <Reveal>
              <p className="eyebrow">{a.activities.label}</p>
              <h2 className="h2" id="activities-title">
                {a.activities.title}
              </h2>
            </Reveal>
            <Reveal delay={120}>
              <ul className="checklist">
                {a.activities.items.map((item, i) => (
                  <li key={item}>
                    <span aria-hidden="true">{pad2(i + 1)}</span>
                    {item}
                  </li>
                ))}
              </ul>
              <div className="section-link">
                <TextLink href={pathFor(locale, "expertise")}>{a.activities.link}</TextLink>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Approche */}
      <section className="section" aria-labelledby="approach-title">
        <div className="container">
          <div className="split">
            <Reveal>
              <p className="eyebrow">{a.approach.label}</p>
              <h2 className="h2" id="approach-title">
                {a.approach.title}
              </h2>
            </Reveal>
            <Reveal className="prose" delay={120}>
              <p>{a.approach.text}</p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Vision */}
      <section className="section section--navy on-dark" aria-labelledby="vision-title">
        <div className="container">
          <div className="split">
            <Reveal>
              <p className="eyebrow">{a.vision.label}</p>
              <h2 className="h2" id="vision-title">
                {a.vision.title}
              </h2>
            </Reveal>
            <Reveal className="prose" delay={120}>
              <p style={{ color: "rgba(255,255,255,0.85)" }}>{a.vision.text}</p>
            </Reveal>
          </div>
        </div>
      </section>

      <CtaBand locale={locale} bg="boardroom" title={a.cta.title} text={a.cta.text} buttonLabel={d.common.contactUs} partnership={false} />
    </>
  );
}
