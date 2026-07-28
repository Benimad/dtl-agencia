import type { Dictionary } from '../types';

const fr: Dictionary = {
  nav: {
    inicio: 'Accueil',
    fichajes: 'Transferts',
    servicios: 'Services',
    proceso: 'Processus',
    mercados: 'Marchés',
    candidatura: 'Envoyer ma fiche',
    contacto: 'Contact',
    abrirMenu: 'Ouvrir le menu',
    cerrarMenu: 'Fermer le menu',
    idioma: 'Langue',
    saltar: 'Aller au contenu',
  },

  meta: {
    inicio: {
      titulo: 'DTL Agencia — Représentation de footballeurs · Espagne, Maroc et Europe',
      descripcion:
        'Agence de représentation de footballeurs. Négociation de contrats, scouting et image personnelle en Espagne et à l’étranger. Écris-nous sur WhatsApp.',
    },
    fichajes: {
      titulo: 'Nos transferts — contrats signés',
      descripcion:
        'Chaque affiche est un contrat signé. Joueurs représentés par DTL Agencia en Espagne, au Maroc et en Europe.',
    },
    servicios: {
      titulo: 'Services — contrats, scouting et image personnelle',
      descripcion:
        'Représentation, rapports et essais, image personnelle et mobilité internationale. Ce que DTL Agencia fait pour un footballeur.',
    },
    proceso: {
      titulo: 'Comment on travaille — quatre étapes',
      descripcion:
        'Tu envoies ta fiche, on t’évalue, on te place et on signe. La méthode DTL Agencia, sans fausses promesses.',
    },
    mercados: {
      titulo: 'Marchés — Espagne, Maroc et Europe',
      descripcion:
        'Nous travaillons en Espagne et à l’étranger, avec un pont direct entre les deux rives de la Méditerranée.',
    },
    candidatura: {
      titulo: 'Envoie ta fiche — candidature joueur',
      descripcion:
        'Remplis tes données et ta vidéo. Réponse sous 24 h et évaluation gratuite.',
    },
    contacto: {
      titulo: 'Contact — on parle aujourd’hui',
      descripcion: 'WhatsApp, email et Instagram de DTL Agencia. On répond personnellement.',
    },
    avisoLegal: { titulo: 'Mentions légales', descripcion: 'Informations légales de DTL Agencia.' },
    privacidad: {
      titulo: 'Politique de confidentialité',
      descripcion: 'Comment DTL Agencia traite les données des joueurs.',
    },
  },

  hero: {
    eyebrow: 'Agence de représentation · 🇪🇸 ≈ 🇲🇦 ≈ 🇪🇺',
    titulo1: 'Du terrain',
    titulo2: 'au contrat',
    lead: 'Nous représentons des footballeurs en Espagne et à l’étranger. Nous négocions avec les clubs, plaçons ta vidéo là où ça se décide et construisons le nom qui arrive avant toi.',
    cta1: 'Envoyer ma fiche',
    cta2: 'Voir les transferts',
  },

  marcador: [
    { valor: '3', etiqueta: 'Marchés ouverts' },
    { valor: '24 h', etiqueta: 'Réponse à ta vidéo' },
    { valor: '360°', etiqueta: 'Contrat · scouting · image' },
  ],

  led: {
    fichaje: 'Transfert signé',
    mercado: 'Marché ouvert',
    mercadoTexto: 'Espagne ≈ Maroc ≈ Europe',
  },

  clubes: {
    titulo: 'Clubs avec qui nous avons signé',
    mas: '+ clubs en Espagne, au Maroc et en Europe',
  },

  cartelera: {
    titulo: 'Nos transferts',
    sub: 'Chaque affiche est un contrat signé. Ouvre une fiche pour voir les données du joueur.',
    sello: 'Transfert',
    ver: 'Voir la fiche',
    verTodos: 'Voir tous les transferts',
    libreT: 'Ton affiche<br>ici',
    libreP: 'Envoie-nous ta vidéo et tes données. Si ça colle, on te place dès cette semaine.',
    libreB: 'Je veux ma fiche',
  },

  ficha: {
    posicion: 'Poste',
    nacimiento: 'Naissance',
    pie: 'Pied',
    altura: 'Taille',
    pais: 'Pays',
    temporada: 'Saison',
    video: 'Voir la vidéo',
    volver: 'Retour aux transferts',
    sinDatos:
      'Fiche en construction : les données complètes de ce joueur sont publiées dès que le club l’autorise.',
    otros: 'Autres transferts',
  },

  servicios: {
    titulo: 'Ce que nous<br>faisons pour toi',
    sub: 'Un joueur ne négocie qu’une fois. Nous négocions chaque semaine.',
    verTodos: 'Voir les services',
    items: [
      {
        etiqueta: 'REPRÉSENTATION',
        titulo: 'Contrats et transferts',
        texto:
          'Nous négocions avec le club : salaire, durée, primes, prêts, prolongations et départs. Tu entres au vestiaire, tout est réglé.',
        detalle: [
          'Relecture des clauses avant toute signature.',
          'Négociation du salaire, des primes et de la durée.',
          'Prêts, prolongations et résiliations.',
          'Relation avec le club toute la saison.',
        ],
      },
      {
        etiqueta: 'SCOUTING',
        titulo: 'Rapports et essais',
        texto:
          'Nous analysons ton profil et montons la vidéo que regardent les directeurs sportifs. Réseau de recruteurs avec @yo.soyde.alcorcon.',
        detalle: [
          'Rapport honnête sur ton niveau et le marché possible.',
          'Vidéo de présentation avec les images qui comptent.',
          'Essais organisés avec de vrais clubs.',
          'Suivi de tes minutes et de ta progression.',
        ],
      },
      {
        etiqueta: 'IMAGE PERSONNELLE',
        titulo: 'Ton nom avant toi',
        texto:
          'Affiches, contenu et profil public soigné. Le club te cherche sur Instagram avant d’appeler : qu’il trouve un professionnel.',
        detalle: [
          'Affiche de présentation à chaque transfert.',
          'Profil public propre et cohérent.',
          'Contenu pour les réseaux, sans rien inventer.',
          'Contact avec les médias locaux quand il le faut.',
        ],
      },
      {
        etiqueta: 'MOBILITÉ',
        titulo: 'Hors d’Espagne',
        texto:
          'Essais à l’étranger, documents, permis et installation : vol, logement et premières semaines réglés.',
        detalle: [
          'Documents, permis et licences fédérales.',
          'Vol, logement et premières semaines.',
          'Accompagnement pour la langue et le quotidien.',
          'Pont permanent entre l’Espagne et le Maroc.',
        ],
      },
    ],
  },

  proceso: {
    titulo: 'Comment<br>on travaille',
    sub: 'Quatre étapes. Sans fausses promesses et sans te faire payer pour rêver.',
    verTodos: 'Voir le processus complet',
    pasos: [
      {
        titulo: 'Tu envoies ta fiche',
        texto:
          'Tu remplis le formulaire avec ta vidéo et tes données. Ça arrive sur notre WhatsApp immédiatement.',
        detalle:
          'Pas besoin d’agent ni de contacts. Juste une vidéo qui se voit et des données réelles : si l’année de naissance ou le club ne collent pas, le club le découvre en deux appels et on perd tous les deux.',
      },
      {
        titulo: 'On t’évalue',
        texto:
          'On regarde tes minutes, ton niveau réel et le marché possible. Si ça ne colle pas encore, on te dit ce qu’il manque.',
        detalle:
          'L’évaluation est gratuite et la réponse arrive sous 24 h. On préfère te dire « pas encore » que te faire perdre une saison à attendre un appel qui ne viendra pas.',
      },
      {
        titulo: 'On te place',
        texto:
          'On présente ton profil à des clubs d’Espagne, du Maroc et d’Europe jusqu’à obtenir un essai ou une offre.',
        detalle:
          'Ton profil arrive au directeur sportif, pas dans une boîte mail générique. On te dit à quels clubs on va et ce qu’ils ont répondu, même quand c’est non.',
      },
      {
        titulo: 'On signe et on continue',
        texto:
          'Contrat vérifié, affiche de présentation et accompagnement toute la saison.',
        detalle:
          'On lit le contrat en entier avant que tu signes et on t’explique chaque clause. Ensuite on reste là : prolongation, départ ou étape suivante.',
      },
    ],
  },

  mercados: {
    titulo: 'Où nous<br>allons',
    sub: 'Nous travaillons en Espagne et à l’étranger, avec un pont direct entre les deux rives.',
    verTodos: 'Voir les marchés',
    items: [
      {
        bandera: '🇪🇸',
        titulo: 'Espagne',
        texto: 'Clubs nationaux et régionaux. Base d’opérations et réseau de recruteurs.',
        etiquetas: ['Base d’opérations', 'Divisions nationales', 'Football régional'],
      },
      {
        bandera: '🇲🇦',
        titulo: 'Maroc',
        texto:
          'Passerelle pour les joueurs marocains vers l’Europe et pour les clubs qui cherchent des talents sur place.',
        etiquetas: ['Botola et centres de formation', 'Double nationalité', 'Talent local'],
      },
      {
        bandera: '🇪🇺',
        titulo: 'Europe',
        texto:
          'Départs à l’étranger avec tous les documents et démarches réglés dès le premier jour.',
        etiquetas: ['Permis et visas', 'Essais organisés', 'Installation réglée'],
      },
    ],
  },

  testimonios: {
    titulo: 'Ce que disent<br>les nôtres',
    sub: 'Joueurs représentés par DTL Agencia.',
  },

  form: {
    etiqueta: 'Candidature joueur',
    titulo: 'Envoie<br>ta fiche',
    lead: 'Remplis et appuie sur envoyer : WhatsApp s’ouvre avec ta fiche déjà écrite. On la lit en entier.',
    check1: 'Réponse sous 24 h, toujours.',
    check2: 'Si ça ne colle pas, on te dit pourquoi.',
    check3: 'L’évaluation est gratuite.',
    nombre: 'Nom et prénom *',
    nacimiento: 'Année de naissance *',
    posicion: 'Poste *',
    pie: 'Pied',
    club: 'Club actuel',
    pais: 'Pays où tu joues',
    video: 'Lien vers ta vidéo (YouTube, Drive, Instagram) *',
    mensaje: 'Autre chose à savoir',
    selecciona: 'Choisis',
    posiciones: {
      portero: 'Gardien',
      lateral: 'Latéral',
      central: 'Défenseur central',
      medio: 'Milieu',
      extremo: 'Ailier',
      delantero: 'Attaquant',
    },
    pies: { derecho: 'Droit', izquierdo: 'Gauche', ambidiestro: 'Les deux' },
    rgpd: 'J’accepte que DTL Agencia traite mes données pour évaluer ma candidature, selon la',
    rgpdEnlace: 'politique de confidentialité',
    enviar: 'Envoyer par WhatsApp',
    enviando: 'Préparation de ta fiche…',
    ok: 'Fiche prête : WhatsApp s’est ouvert avec ton message. S’il ne s’ouvre pas, appuie à nouveau.',
    errores: {
      campos: 'Remplis les champs obligatoires (*).',
      rgpd: 'Tu dois accepter la politique de confidentialité.',
      nombre: 'Écris ton nom complet.',
      nacimiento: 'Année entre 1975 et 2016.',
      posicion: 'Choisis ton poste.',
      video: 'Colle un lien qui commence par https://',
      red: 'Nous n’avons pas pu valider la fiche, mais tu peux quand même l’envoyer par WhatsApp.',
    },
    cabecera: 'Candidature',
  },

  contacto: {
    etiqueta: 'Contact direct',
    titulo: 'On parle<br>aujourd’hui',
    lead: 'Si tu préfères écrire sans formulaire, nous sommes là. On répond personnellement.',
    whatsapp: 'WhatsApp',
    email: 'Email',
    scouts: 'Recruteurs',
    horario: 'On écrit et on répond tous les jours. Délai moyen : moins de 24 h.',
  },

  cta: {
    titulo: 'Prêt à ce qu’un club te voie ?',
    texto: 'Envoie-nous ta vidéo et tes données. Si ça colle, on te place dès cette semaine.',
    boton: 'Envoyer ma fiche',
    secundario: 'Écrire sur WhatsApp',
  },

  pie: {
    descripcion: 'Représentation de footballeurs',
    sobre:
      'Agence de représentation de footballeurs. Contrats, scouting et image personnelle entre l’Espagne, le Maroc et l’Europe.',
    navegacion: 'Navigation',
    legal: 'Légal',
    contacto: 'Contact',
    avisoLegal: 'Mentions légales',
    privacidad: 'Politique de confidentialité',
    derechos: 'Tous droits réservés',
  },

  flotante: 'Écris-nous',

  noEncontrado: {
    titulo: 'Page hors-jeu',
    texto: 'Ce lien n’existe pas ou a changé d’adresse. Reviens à l’accueil et repars de là.',
    boton: 'Retour à l’accueil',
  },

  legal: {
    actualizado: 'Dernière mise à jour : juillet 2026',
    aviso: {
      titulo: 'Mentions légales',
      intro: 'Informations générales conformément à la loi espagnole 34/2002 (LSSI-CE).',
      bloques: [
        {
          titulo: 'Titulaire du site',
          parrafos: [
            'DTL Agencia — [nom complet ou raison sociale]<br>NIF/NIE : [à compléter]<br>Adresse : [à compléter]<br>Email : darkomagencia@gmail.com<br>Téléphone : +212 714-346018',
          ],
        },
        {
          titulo: 'Objet',
          parrafos: [
            'Ce site informe sur les services de représentation, de conseil et de promotion de footballeurs proposés par DTL Agencia. L’accès est gratuit et n’implique aucune relation contractuelle : toute représentation est toujours formalisée par un contrat écrit et indépendant.',
          ],
        },
        {
          titulo: 'Propriété intellectuelle',
          parrafos: [
            'Les affiches et photographies des joueurs appartiennent à leurs clubs ou auteurs respectifs et sont présentées à titre informatif. Les autres textes, la marque et le design appartiennent à DTL Agencia.',
          ],
        },
        {
          titulo: 'Responsabilité',
          parrafos: [
            'DTL Agencia ne garantit aucun résultat sportif ni contractuel. Les informations publiées peuvent être modifiées sans préavis.',
          ],
        },
        {
          titulo: 'Loi applicable',
          parrafos: ['Les relations découlant de ce site sont régies par la législation espagnole.'],
        },
      ],
    },
    privacidad: {
      titulo: 'Politique de confidentialité',
      intro: 'Conformément au Règlement (UE) 2016/679 (RGPD) et à la LOPDGDD 3/2018.',
      bloques: [
        {
          titulo: 'Responsable',
          parrafos: [
            'DTL Agencia — [nom complet ou raison sociale], NIF [à compléter]. Contact : darkomagencia@gmail.com',
          ],
        },
        {
          titulo: 'Quelles données nous recueillons',
          parrafos: [
            'Celles que tu nous envoies : nom, année de naissance, poste, pied, club, pays, lien vers ta vidéo et le message que tu écris. Pour un mineur, l’autorisation du père, de la mère ou du tuteur est nécessaire.',
          ],
        },
        {
          titulo: 'Pourquoi',
          parrafos: [
            'Pour évaluer ta candidature en tant que joueur représenté et, le cas échéant, te présenter à des clubs. Nous n’utilisons pas tes données pour de la publicité tierce et nous ne les vendons pas.',
          ],
        },
        {
          titulo: 'Base légale',
          parrafos: [
            'Ton consentement exprès en cochant la case du formulaire, et l’intérêt légitime à gérer la relation professionnelle.',
          ],
        },
        {
          titulo: 'Comment l’envoi se fait',
          parrafos: [
            'Le formulaire ouvre WhatsApp sur ton appareil avec le message déjà écrit, et c’est toi qui décides de l’envoyer. Avant cela, le serveur valide les champs pour te signaler les erreurs ; si un webhook a été configuré, la fiche y est transmise. Le traitement postérieur reste sur notre téléphone et notre messagerie.',
          ],
        },
        {
          titulo: 'Conservation',
          parrafos: [
            'Nous conservons ta candidature tant qu’elle reste pertinente et, au maximum, deux ans après le dernier contact.',
          ],
        },
        {
          titulo: 'Destinataires',
          parrafos: [
            'Les clubs et responsables sportifs à qui nous présentons ton profil, toujours avec ton accord. Les prestataires techniques (WhatsApp, messagerie électronique) en tant que sous-traitants.',
          ],
        },
        {
          titulo: 'Tes droits',
          lista: [
            'Accéder à tes données, les rectifier et les supprimer.',
            'Limiter le traitement, t’y opposer et demander la portabilité.',
            'Retirer ton consentement à tout moment.',
            'Réclamer auprès de l’Agence espagnole de protection des données (aepd.es).',
          ],
          parrafos: ['Écris-nous à darkomagencia@gmail.com et on règle ça.'],
        },
      ],
    },
  },
};

export default fr;
