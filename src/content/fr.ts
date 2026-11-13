/**
 * Contenu français (langue principale). Définit la structure que EN et AR doivent respecter.
 * Tous les textes sont des propositions à valider par GUENNOUN GROUP.
 */

const fr = {
  brandDescriptor: "Commerce international · Casablanca",
  nav: {
    home: "Accueil",
    about: "À propos",
    expertise: "Notre expertise",
    commitments: "Nos engagements",
    partnerships: "Partenariats",
    contact: "Contact",
    cta: "Nous contacter",
  },
  common: {
    skipToContent: "Aller au contenu principal",
    openMenu: "Ouvrir le menu",
    closeMenu: "Fermer le menu",
    mainNav: "Navigation principale",
    footerNav: "Navigation du pied de page",
    language: "Langue",
    conceptualImage: "Image illustrative",
    imageAlt: { garage: "Atelier de detailing automobile, image illustrative", logistics: "Entrepôt logistique avec camions, image illustrative", tower: "Façade d'immeuble de bureaux en verre, image illustrative", boardroom: "Salle de réunion, image illustrative" },
    placeholderTitle: "Image à fournir",
    placeholderText: "Emplacement réservé à une photographie authentique de GUENNOUN GROUP.",
    address: "Adresse",
    phone: "Téléphone",
    email: "E-mail",
    viewOnMap: "Voir sur la carte",
    rights: "Tous droits réservés.",
    partnershipCta: "Engager un partenariat",
    contactUs: "Nous contacter",
  },
  seo: {
    home: {
      title: "GUENNOUN GROUP — Commerce international et solutions professionnelles | Casablanca",
      description:
        "GUENNOUN GROUP, entreprise basée à Casablanca, spécialisée dans le commerce international et la distribution de solutions professionnelles pour le lavage et l'entretien automobile.",
    },
    about: {
      title: "À propos — GUENNOUN GROUP",
      description:
        "Découvrez GUENNOUN GROUP : son identité, ses activités, son approche et sa vision des relations professionnelles durables.",
    },
    expertise: {
      title: "Notre expertise — GUENNOUN GROUP",
      description:
        "Commerce international, import-export, lavage et detailing automobile, équipements professionnels, pièces techniques et distribution au Maroc.",
    },
    commitments: {
      title: "Nos engagements — GUENNOUN GROUP",
      description:
        "Qualité, authenticité, fiabilité, réactivité, service professionnel et relations durables : les engagements de GUENNOUN GROUP.",
    },
    partnerships: {
      title: "Partenariats — GUENNOUN GROUP",
      description:
        "GUENNOUN GROUP accueille les demandes de partenariat des entreprises, directions achats, distributeurs et organisations professionnelles.",
    },
    contact: {
      title: "Contact — GUENNOUN GROUP",
      description:
        "Contactez GUENNOUN GROUP à Casablanca : adresse, téléphone, e-mail et formulaire de demande professionnelle.",
    },
  },

  home: {
    hero: {
      label: "Casablanca · Commerce international",
      title: "La qualité comme engagement. La confiance comme fondation.",
      intro:
        "GUENNOUN GROUP est une entreprise basée à Casablanca, spécialisée dans le commerce international et la distribution de solutions professionnelles pour le secteur du lavage et de l'entretien automobile.",
      ctaSecondary: "Découvrir notre expertise",
      pillarsLabel: "Domaines d'activité",
      pillars: [
        "Commerce international",
        "Lavage et detailing",
        "Équipements professionnels",
        "Pièces techniques",
      ],
    },
    intro: {
      label: "01 — Qui sommes-nous",
      title: "Un partenaire d'approvisionnement professionnel",
      text:
        "Basée à Casablanca, GUENNOUN GROUP importe et distribue au Maroc des produits, des équipements et des pièces techniques destinés aux professionnels du lavage et de l'entretien automobile. Notre approche repose sur l'authenticité de nos approvisionnements en provenance d'Italie, sur notre réactivité et sur la construction de relations professionnelles durables.",
      link: "Découvrir GUENNOUN GROUP",
    },
    expertise: {
      label: "02 — Notre expertise",
      title: "Des domaines d'activité complémentaires",
      intro:
        "Nos activités s'articulent autour du commerce international et de la distribution de solutions techniques pour les professionnels.",
      link: "Voir l'ensemble de notre expertise",
    },
    sourcing: {
      label: "03 — Approvisionnement",
      title: "Des produits d'origine italienne, sélectionnés avec exigence",
      text:
        "Nous nous approvisionnons en Italie, avec une exigence d'authenticité et de qualité qui est au cœur de la relation que nous construisons avec nos clients professionnels.",
      from: "Italie",
      to: "Casablanca",
      caption: "Schéma illustratif de la chaîne d'approvisionnement",
    },
    commitments: {
      label: "04 — Nos engagements",
      title: "Ce qui guide notre travail au quotidien",
      link: "Découvrir nos engagements",
    },
    partnership: {
      title: "Construisons une relation professionnelle durable",
      text:
        "Directions achats, groupes de services automobiles, gestionnaires de flottes, distributeurs : chaque demande est étudiée avec sérieux.",
    },
    contact: {
      label: "05 — Contact",
      title: "Nous situer, nous joindre",
    },
  },

  /** Utilisé sur l'accueil (texte court) et la page Expertise (texte long). */
  expertiseItems: [
    {
      title: "Commerce international",
      short: "Identification et acheminement de solutions professionnelles entre l'Italie et le Maroc.",
      long: "GUENNOUN GROUP relie l'offre d'un marché d'origine, l'Italie, aux besoins des professionnels marocains. Notre rôle : identifier des solutions adaptées et en organiser l'acheminement vers le Maroc.",
    },
    {
      title: "Import-export",
      short: "Une activité d'import-export au service des professionnels de l'automobile.",
      long: "L'import-export est le socle de notre activité. Nous structurons nos opérations pour offrir à nos clients professionnels un approvisionnement clair, suivi et respectueux de leurs délais.",
    },
    {
      title: "Lavage et detailing automobile",
      short: "Des solutions destinées au lavage et à l'entretien professionnels des véhicules.",
      long: "Nous distribuons des solutions destinées au lavage et au detailing automobile, à l'usage des professionnels de l'entretien des véhicules et des organisations qui en ont la charge.",
    },
    {
      title: "Machines et équipements",
      short: "Des équipements professionnels adaptés aux exigences des activités de service.",
      long: "Machines et équipements professionnels : nous accompagnons les entreprises dont l'activité repose sur un outil de travail fiable et adapté à leurs exigences de service.",
    },
    {
      title: "Pièces techniques",
      short: "Des pièces techniques pour accompagner la continuité d'exploitation de vos équipements.",
      long: "Les pièces techniques contribuent à la continuité d'exploitation des équipements. Nous les intégrons à notre offre pour accompagner nos clients au-delà de la seule acquisition.",
    },
    {
      title: "Distribution au Maroc",
      short: "Une distribution structurée sur le marché marocain, auprès d'une clientèle professionnelle.",
      long: "Notre distribution au Maroc s'adresse avant tout aux entreprises et aux organisations professionnelles, avec une attention constante portée à la réactivité et à la qualité de la relation.",
    },
  ],

  commitmentItems: [
    {
      title: "Qualité",
      short: "Une exigence constante dans le choix de nos produits et équipements.",
      long: "Nous plaçons la qualité au centre de nos choix. Elle guide la sélection des solutions que nous proposons et la manière dont nous accompagnons nos clients.",
    },
    {
      title: "Authenticité",
      short: "Des approvisionnements d'origine italienne, en toute transparence.",
      long: "Nous nous approvisionnons en Italie et tenons à l'authenticité des produits et équipements que nous distribuons. C'est une condition de la confiance de nos clients.",
    },
    {
      title: "Fiabilité",
      short: "Des engagements tenus et une relation professionnelle suivie.",
      long: "La fiabilité se démontre dans la durée : dire ce que nous ferons, le faire, et rester disponibles une fois la collaboration engagée.",
    },
    {
      title: "Réactivité",
      short: "Une réponse rapide à chaque demande.",
      long: "Nous savons que le temps d'un décideur est précieux. Chaque demande reçoit une réponse attentive, dans les meilleurs délais.",
    },
    {
      title: "Service professionnel",
      short: "Une attention portée à la satisfaction de nos clients.",
      long: "Notre service est pensé pour les professionnels : clair, rigoureux et orienté vers la satisfaction de nos clients.",
    },
    {
      title: "Relations durables",
      short: "Le respect du temps et des priorités de nos partenaires.",
      long: "Nous cherchons à construire des relations de long terme, fondées sur le respect du temps, des priorités et des contraintes de nos partenaires.",
    },
  ],

  about: {
    hero: {
      label: "À propos",
      title: "Une entreprise tournée vers le commerce international et les relations durables",
      intro:
        "GUENNOUN GROUP est une entreprise basée à Casablanca, au Maroc. Elle importe et distribue des solutions professionnelles pour le lavage et l'entretien automobile.",
    },
    identity: {
      label: "01 — Notre identité",
      title: "GUENNOUN GROUP",
      paragraphs: [
        "GUENNOUN GROUP est une entreprise marocaine, établie à Casablanca, spécialisée dans le commerce international et la distribution de solutions professionnelles pour le secteur du lavage et de l'entretien automobile.",
        "Nous importons d'Italie des produits, des équipements et des pièces techniques, que nous distribuons sur le marché marocain auprès d'une clientèle professionnelle.",
      ],
    },
    activities: {
      label: "02 — Nos activités",
      title: "Ce que nous faisons",
      items: [
        "Commerce international et import-export",
        "Solutions de lavage et de detailing automobile",
        "Machines et équipements professionnels",
        "Pièces techniques",
        "Distribution sur le marché marocain",
      ],
      link: "Découvrir notre expertise",
    },
    approach: {
      label: "03 — Notre approche",
      title: "Authenticité, réactivité, constance",
      text:
        "Notre approche repose sur l'authenticité et la qualité de nos approvisionnements en provenance d'Italie, sur la réactivité de notre service et sur la construction de relations professionnelles durables. Nous respectons le temps de nos interlocuteurs et nous attachons à la satisfaction de nos clients.",
    },
    vision: {
      label: "04 — Notre vision",
      title: "Bâtir la confiance dans la durée",
      text:
        "Nous souhaitons inscrire notre activité dans le long terme, aux côtés d'entreprises marocaines qui recherchent un partenaire d'approvisionnement sérieux, réactif et attaché à la qualité.",
    },
    cta: {
      title: "Échanger avec GUENNOUN GROUP",
      text: "Vous représentez une entreprise ou une organisation professionnelle ? Nous serons heureux d'échanger avec vous.",
    },
  },

  expertisePage: {
    hero: {
      label: "Notre expertise",
      title: "Des domaines d'activité complémentaires, au service des professionnels",
      intro:
        "Nos activités s'articulent autour du commerce international et de la distribution de solutions techniques destinées aux professionnels du lavage et de l'entretien automobile.",
    },
    note: "Les activités présentées ici décrivent notre savoir-faire. Elles ne constituent pas un catalogue de produits.",
    cta: {
      title: "Un besoin professionnel à nous présenter ?",
      text: "Parlez-nous de votre activité : nous étudierons votre demande avec sérieux.",
    },
  },

  commitmentsPage: {
    hero: {
      label: "Nos engagements",
      title: "Ce qui guide notre travail au quotidien",
      intro:
        "Six engagements structurent notre manière de travailler avec les entreprises et les organisations professionnelles.",
    },
    cta: {
      title: "Construisons une relation de confiance",
      text: "Nos engagements prennent tout leur sens dans la relation avec nos partenaires. Échangeons sur vos attentes.",
    },
  },

  partnershipsPage: {
    hero: {
      label: "Partenariats",
      title: "Une approche du partenariat fondée sur la confiance et la clarté",
      intro:
        "GUENNOUN GROUP accueille les demandes de collaboration des entreprises et des organisations professionnelles, et les étudie avec sérieux.",
    },
    audience: {
      label: "01 — Qui peut nous contacter",
      title: "À qui nous nous adressons",
      items: [
        {
          title: "Directions achats",
          text: "Services d'approvisionnement et de procurement à la recherche d'un fournisseur fiable et réactif.",
        },
        {
          title: "Services automobiles professionnels",
          text: "Entreprises du lavage, de l'entretien et de l'après-vente automobile.",
        },
        {
          title: "Gestionnaires de flottes",
          text: "Organisations en charge de l'entretien d'un parc de véhicules.",
        },
        {
          title: "Distributeurs et organisations commerciales",
          text: "Acteurs de la distribution souhaitant étudier une collaboration.",
        },
      ],
    },
    approach: {
      label: "02 — Notre démarche",
      title: "Une relation simple et transparente",
      steps: [
        { title: "Votre demande", text: "Vous nous présentez votre activité et votre besoin." },
        { title: "Notre étude", text: "Nous étudions votre demande avec sérieux." },
        { title: "Notre réponse", text: "Nous revenons vers vous dans les meilleurs délais." },
      ],
      note: "Cette démarche est indicative et sera précisée avec chaque interlocuteur.",
    },
    cta: {
      title: "Présentez-nous votre projet de collaboration",
      text: "Le formulaire de contact propose une catégorie dédiée aux demandes de partenariat.",
    },
  },

  contactPage: {
    hero: {
      label: "Contact",
      title: "Nous situer, nous joindre",
      intro:
        "Pour toute demande professionnelle ou proposition de partenariat, utilisez le formulaire ou contactez-nous directement.",
    },
    infoTitle: "Coordonnées",
    formTitle: "Demande professionnelle",
    formIntro: "Les champs marqués d'un astérisque (*) sont obligatoires.",
    fields: {
      name: "Nom et prénom",
      company: "Entreprise ou organisation",
      role: "Fonction",
      email: "Adresse e-mail professionnelle",
      phone: "Téléphone",
      category: "Nature de la demande",
      message: "Votre message",
      consent:
        "J'accepte que ces informations soient utilisées uniquement pour traiter ma demande.",
      optional: "facultatif",
    },
    categories: {
      placeholder: "Sélectionnez une catégorie",
      partnership: "Partenariat professionnel",
      request: "Demande d'information professionnelle",
      other: "Autre demande",
    },
    errors: {
      required: "Ce champ est obligatoire.",
      email: "Veuillez saisir une adresse e-mail valide.",
      phone: "Veuillez saisir un numéro de téléphone valide.",
      message: "Votre message doit comporter au moins 20 caractères.",
      consent: "Veuillez accepter pour continuer.",
      summary: "Le formulaire contient des erreurs. Veuillez les corriger.",
    },
    submit: "Préparer ma demande",
    submitting: "Envoi en cours…",
    status: {
      sent: "Merci. Votre demande a bien été transmise. Nous reviendrons vers vous dans les meilleurs délais.",
      failed:
        "Votre demande n'a pas pu être transmise. Veuillez réessayer ou nous écrire directement par e-mail.",
      mailtoTitle: "Votre message est prêt, mais pas encore envoyé.",
      mailtoText:
        "Votre application de messagerie devrait s'ouvrir avec le message prérempli. Il n'est envoyé que lorsque vous cliquez sur « Envoyer » dans cette application. Si rien ne s'ouvre, copiez le message ci-dessous et écrivez-nous à l'adresse indiquée.",
      copy: "Copier le message",
      copied: "Message copié",
      mailSubject: "Demande via le site GUENNOUN GROUP",
    },
    mailFields: {
      name: "Nom",
      company: "Entreprise",
      role: "Fonction",
      email: "E-mail",
      phone: "Téléphone",
      category: "Nature de la demande",
      message: "Message",
    },
  },

  footer: {
    tagline: "La qualité comme engagement. La confiance comme fondation.",
    descriptor:
      "Commerce international et distribution de solutions professionnelles pour le lavage et l'entretien automobile.",
    navTitle: "Navigation",
    contactTitle: "Contact",
    languagesTitle: "Langue",
  },
};

export type Dict = typeof fr;
export default fr;
