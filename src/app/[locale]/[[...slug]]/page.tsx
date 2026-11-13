import type { Metadata } from "next";
import { notFound } from "next/navigation";

import PageShell from "@/components/PageShell";
import HomePage from "@/views/HomePage";
import AboutPage from "@/views/AboutPage";
import ExpertisePage from "@/views/ExpertisePage";
import CommitmentsPage from "@/views/CommitmentsPage";
import PartnershipsPage from "@/views/PartnershipsPage";
import ContactPage from "@/views/ContactPage";

import { getDict } from "@/content";
import {
  allowIndexing,
  company,
  localeMeta,
  locales,
  pageFromSlug,
  pageIds,
  pathFor,
  siteUrl,
  slugs,
  type Locale,
  type PageId,
} from "@/content/site";

export const dynamicParams = false;

type Params = { locale: string; slug?: string[] };

const views: Record<PageId, (props: { locale: Locale }) => React.JSX.Element> = {
  home: HomePage,
  about: AboutPage,
  expertise: ExpertisePage,
  commitments: CommitmentsPage,
  partnerships: PartnershipsPage,
  contact: ContactPage,
};

export function generateStaticParams(): Params[] {
  return locales.flatMap((locale) =>
    pageIds.map((page) => {
      const s = slugs[page][locale];
      return { locale, slug: s ? s.split("/") : [] };
    }),
  );
}

function resolve(params: Params): { locale: Locale; page: PageId } | null {
  if (!(locales as readonly string[]).includes(params.locale)) return null;
  const locale = params.locale as Locale;
  const page = pageFromSlug(locale, params.slug);
  return page ? { locale, page } : null;
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const r = resolve(await params);
  if (!r) return {};
  const seo = getDict(r.locale).seo[r.page];

  const md: Metadata = {
    title: seo.title,
    description: seo.description,
    // Tant que le site n'est pas officiellement lancé, on demande aux moteurs de ne pas l'indexer.
    robots: allowIndexing ? { index: true, follow: true } : { index: false, follow: false },
    openGraph: {
      title: seo.title,
      description: seo.description,
      siteName: company.name,
      type: "website",
      locale: localeMeta[r.locale].ogLocale,
    },
  };

  if (siteUrl) {
    md.metadataBase = new URL(siteUrl);
    md.alternates = {
      canonical: pathFor(r.locale, r.page),
      languages: {
        ...Object.fromEntries(locales.map((l) => [localeMeta[l].htmlLang, pathFor(l, r.page)])),
        "x-default": pathFor("fr", r.page),
      },
    };
  }
  return md;
}

export default async function Page({ params }: { params: Promise<Params> }) {
  const r = resolve(await params);
  if (!r) notFound();
  const View = views[r.page];
  return (
    <PageShell locale={r.locale} page={r.page}>
      <View locale={r.locale} />
    </PageShell>
  );
}
