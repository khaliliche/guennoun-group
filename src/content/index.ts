import fr, { type Dict } from "./fr";
import en from "./en";
import ar from "./ar";
import type { Locale } from "./site";

const dictionaries: Record<Locale, Dict> = { fr, en, ar };

export function getDict(locale: Locale): Dict {
  return dictionaries[locale];
}

export type { Dict };
