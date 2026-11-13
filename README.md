# GUENNOUN GROUP — Site corporate

Next.js 15 (App Router) · TypeScript · CSS sur mesure · export statique · FR / EN / AR (RTL).

## Lancer en local

```bash
npm install
npm run dev          # http://localhost:3000  (redirige vers /fr/)
```

Version de production (statique) :

```bash
npm run build        # génère le dossier out/
npx serve out        # aperçu local
```

> TypeScript doit rester en version 5.x (Next 15 n'est pas compatible avec TypeScript 7).

## Où modifier quoi

| Besoin | Fichier |
|---|---|
| Adresse, téléphone, e-mail, liens sociaux, routes | `src/content/site.ts` |
| Textes français / anglais / arabe | `src/content/fr.ts`, `en.ts`, `ar.ts` |
| Couleurs, polices, espacements | variables `:root` de `src/app/globals.css` |
| Logo | `public/brand/gn-symbol.png` + `src/components/Logo.tsx` |
| Photos réelles | remplacer `PhotoPlaceholder` (`src/components/ui.tsx`) |

Réseaux sociaux : renseigner `company.social` dans `site.ts` — rien ne s'affiche tant que c'est vide.

## Avant la mise en ligne (rien n'est déployé)

1. **Formulaire** : définir `NEXT_PUBLIC_FORM_ENDPOINT` (Formspree, Getform, ou API maison). Sans cela, le formulaire ouvre le client e-mail du visiteur et indique clairement que rien n'est encore envoyé.
2. **Domaine** : `NEXT_PUBLIC_SITE_URL` (canonical + hreflang).
3. **Indexation** : `NEXT_PUBLIC_ALLOW_INDEXING=true` uniquement au lancement (par défaut : noindex).
4. **Logo** : remplacer par la version vectorielle validée « GUENNOUN GROUP ».
5. **Photos authentiques**, relecture arabe par un natif, informations légales (RC, ICE) et pages légales si souhaité.
6. **E-mail professionnel** sur domaine propre (modifier `company.email`).
