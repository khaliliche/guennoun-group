import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "GUENNOUN GROUP",
  robots: { index: false, follow: true },
};

/** Redirection statique vers le français. La langue du navigateur n'est volontairement pas imposée. */
export default function Root() {
  return (
    <>
      <meta httpEquiv="refresh" content="0; url=/fr/" />
      <p>
        <a href="/fr/">GUENNOUN GROUP — Français</a> · <a href="/en/">English</a> · <a href="/ar/">العربية</a>
      </p>
    </>
  );
}
