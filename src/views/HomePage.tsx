import Reveal from "@/components/Reveal";
import { Aurora, Button, ConceptImage, CtaBand, HeroTitle, SectionHead, TextLink } from "@/components/ui";
import { expertiseIcons } from "@/components/Icons";
import SourcingScene from "@/components/SourcingScene";
import StickyShowcase, { type ShowcaseItem } from "@/components/fx/StickyShowcase";
import ScrollFillText from "@/components/fx/ScrollFillText";
import HeroScroll from "@/components/fx/HeroScroll";
import Marquee from "@/components/fx/Marquee";
import WordReveal from "@/components/fx/WordReveal";
import { getDict } from "@/content";
import { company, mapsUrl, pathFor, type Locale } from "@/content/site";
import { pad2, telHref } from "@/lib/text";

/** Image et point de zoom associés à chacun des six domaines (images illustratives). */
const showcaseMap = [
  { image: "/images/logistics.jpg", focus: "62% 45%" },
  { image: "/images/logistics.jpg", focus: "20% 75%" },
  { image: "/images/garage.jpg", focus: "62% 55%" },
  { image: "/images/garage.jpg", focus: "12% 22%" },
  { image: "/images/garage.jpg", focus: "70% 90%" },
  { image: "/images/tower.jpg", focus: "50% 25%" },
];

export default function HomePage({ locale }: { locale: Locale }) {
  const d = getDict(locale);
  const h = d.home;

  const showcaseItems: ShowcaseItem[] = d.expertiseItems.map((item, i) => ({
    title: item.title,
    text: item.long,
    image: showcaseMap[i].image,
    focus: showcaseMap[i].focus,
    icon: expertiseIcons[i],
  }));

  return (
    <>
      {/* 1. HÉROS */}
      <section className="hero on-dark" aria-labelledby="hero-title">
        <Aurora />
        <div className="container">
          <div className="hero__inner">
            <HeroScroll kind="text">
              <p className="hero__label">{h.hero.label}</p>
              <HeroTitle title={h.hero.title} />
              <p className="hero__intro">{h.hero.intro}</p>
              <div className="hero__actions">
                <Button href={`${pathFor(locale, "contact")}?category=partnership`} variant="solid-light">
                  {d.common.partnershipCta}
                </Button>
                <TextLink href={pathFor(locale, "expertise")}>{h.hero.ctaSecondary}</TextLink>
              </div>
            </HeroScroll>
            <HeroScroll kind="media" className="hero__panel">
              <ConceptImage locale={locale} name="garage" ratio="4 / 5" position="50% 60%" delay={500} immediate />
            </HeroScroll>
          </div>
          <div className="hero__pillars">
            <ul className="pillars" aria-label={h.hero.pillarsLabel}>
              {h.hero.pillars.map((p, i) => (
                <li key={p}>
                  <span aria-hidden="true">{pad2(i + 1)}</span>
                  {p}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Bandeau défilant */}
      <Marquee items={d.expertiseItems.map((e) => e.title)} />

      {/* 2. PRÉSENTATION — le texte s'allume mot par mot au défilement */}
      <section className="section" aria-labelledby="intro-title">
        <div className="container">
          <div className="intro">
            <Reveal className="intro__title">
              <p className="eyebrow">{h.intro.label}</p>
              <h2 className="h2" id="intro-title">
                <WordReveal text={h.intro.title} />
              </h2>
            </Reveal>
            <div className="intro__text">
              <ScrollFillText text={h.intro.text} />
              <TextLink href={pathFor(locale, "about")}>{h.intro.link}</TextLink>
            </div>
          </div>
        </div>
      </section>

      {/* 3. EXPERTISE — image épinglée, textes qui défilent */}
      <section className="section section--cloud" aria-labelledby="expertise-title">
        <div className="container">
          <SectionHead label={h.expertise.label} title={h.expertise.title} intro={h.expertise.intro} id="expertise-title" />
          <StickyShowcase items={showcaseItems} badge={d.common.conceptualImage} />
          <div className="section-link">
            <TextLink href={pathFor(locale, "expertise")}>{h.expertise.link}</TextLink>
          </div>
        </div>
      </section>

      {/* 4. APPROVISIONNEMENT ITALIEN — scène épinglée : le cargo voyage pendant que le texte devient net */}
      <SourcingScene label={h.sourcing.label} title={h.sourcing.title} text={h.sourcing.text} from={h.sourcing.from} to={h.sourcing.to} caption={h.sourcing.caption} />

      {/* 5. ENGAGEMENTS */}
      <section className="section" aria-labelledby="commitments-title">
        <div className="container">
          <SectionHead label={h.commitments.label} title={h.commitments.title} id="commitments-title" />
          <div className="commit-grid">
            {d.commitmentItems.map((c, i) => (
              <Reveal as="article" className="commit spot" key={c.title} delay={(i % 3) * 90}>
                <span className="commit__num">{pad2(i + 1)}</span>
                <h3 className="commit__title">{c.title}</h3>
                <p className="commit__text">{c.short}</p>
              </Reveal>
            ))}
          </div>
          <div className="section-link">
            <TextLink href={pathFor(locale, "commitments")}>{h.commitments.link}</TextLink>
          </div>
        </div>
      </section>

      {/* 6. PARTENARIAT */}
      <CtaBand locale={locale} title={h.partnership.title} text={h.partnership.text} buttonLabel={d.common.contactUs} partnership={false} bg="tower" />

      {/* 7. COORDONNÉES */}
      <section className="section" aria-labelledby="contact-title">
        <div className="container">
          <SectionHead label={h.contact.label} title={h.contact.title} id="contact-title" />
          <Reveal className="contact-cols">
            <div className="contact-col">
              <span className="contact-col__label">{d.common.address}</span>
              <address>
                <bdi dir="ltr">{company.address.line1}</bdi>
                <br />
                <bdi dir="ltr">{company.address.line2}</bdi>, {company.address.country[locale]}
              </address>
              <a className="link-arrow" href={mapsUrl} target="_blank" rel="noopener noreferrer">
                {d.common.viewOnMap}
                <span className="sr-only"> (↗)</span>
              </a>
            </div>
            <div className="contact-col">
              <span className="contact-col__label">{d.common.phone}</span>
              <a className="contact-col__value ltr" href={telHref(company.phone)}>
                {company.phone}
              </a>
            </div>
            <div className="contact-col">
              <span className="contact-col__label">{d.common.email}</span>
              <a className="contact-col__value ltr" href={`mailto:${company.email}`}>
                {company.email}
              </a>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
