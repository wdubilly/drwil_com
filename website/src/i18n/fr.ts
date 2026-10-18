import type { Dict } from "./en";

export const fr: Dict = {
  meta: {
    title: "DRWIL — L'agent produit le travail. DRWIL exige la preuve.",
    description:
      "DRWIL est un outil en ligne de commande open source de gouvernance et de vérification du travail produit par l'IA : exigences déclarées, contrats, contrôles, preuves et verdict déterministe.",
  },
  nav: {
    label: "Navigation principale",
    links: {
      chain: "Modèle",
      demo: "Démo",
      workflow: "Workflow",
      regression: "Régression",
      verdicts: "Verdicts",
      boundaries: "Limites",
      install: "Installer",
    },
    github: "GitHub",
    language: "Langue",
    skip: "Aller au contenu",
  },
  hero: {
    eyebrow: "GOUVERNANCE DU TRAVAIL PRODUIT PAR DES AGENTS",
    line1: "L'agent produit le travail.",
    line2: "DRWIL exige la preuve.",
    lead: "Les agents IA savent écrire du code. DRWIL aide à vérifier si les exigences et contrats déclarés sont réellement satisfaits, avec des preuves que vous pouvez inspecter.",
    ctaPrimary: "Découvrir DRWIL sur GitHub",
    ctaSecondary: "Voir comment fonctionne la vérification",
    sceneLabel: "Schéma : exigences, contrats, contrôles et preuves alimentent un cœur de vérification qui renvoie un verdict.",
    sceneNote: "Illustration du modèle, pas un moteur en direct.",
    legend: {
      requirements: "Exigences",
      contracts: "Contrats",
      checks: "Contrôles",
      evidence: "Preuves",
      verdict: "Verdict",
    },
    verdictWord: { PASS: "PASS", FAIL: "FAIL", MANUAL: "MANUAL" },
    points: [
      "Un travail généré par l'IA peut sembler terminé sans être suffisamment prouvé.",
      "DRWIL relie les exigences déclarées aux contrats, aux contrôles, aux preuves et à un verdict.",
      "Un comportement validé reste testable : un changement ultérieur peut révéler une régression.",
    ],
  },
  chain: {
    title: "De l'intention à la preuve.",
    lead: "Six maillons transforment une décision humaine en quelque chose dont une machine peut répondre.",
    caution:
      "C'est un modèle de gouvernance, pas la promesse que DRWIL écrit tous les tests ou découvre toutes les exigences oubliées. Les personnes et les agents écrivent toujours les critères, les contrats et les contrôles.",
    stages: [
      { name: "Intention humaine", text: "Une personne décide de ce qui doit être vrai : le besoin, ses limites, ses risques. DRWIL ne l'invente pas." },
      {
        name: "Critères d'acceptation",
        text: "Chaque critère de la fiche active énonce un résultat métier et cite le contrat qui le prouve. Un critère sans preuve durable est signalé, jamais ignoré.",
      },
      {
        name: "Contrats",
        text: "Un contrat déclare une obligation qui doit tenir : une règle, une raison, et soit un contrôle, soit une part que seul un humain peut juger.",
      },
      {
        name: "Contrôles exécutables",
        text: "Un contrôle est le mécanisme qui évalue une obligation : un test, une analyse, un script déclaré par le projet. Sa qualité reste de la responsabilité de l'équipe.",
      },
      {
        name: "Preuves",
        text: "Ce qui a réellement tourné : le contrôle, le résultat de la commande, le code de sortie, la sortie utile. Les valeurs sensibles sont masquées quand c'est approprié.",
      },
      { name: "Verdict", text: "PASS, FAIL, ERROR, MANUAL ou ATTESTED, avec un code de sortie déterministe. L'agent ne se note pas lui-même." },
    ],
  },
  demo: {
    title: "Essayez le verdict.",
    lead: "Choisissez un scénario. Le critère, le contrat, les contrôles, les preuves et le verdict changent ensemble.",
    badge: "Démonstration illustrative — données d'exemple",
    scenarioLabel: "Scénario",
    variantLabel: "Cas",
    sample:
      "Ceci est une simulation sur des données d'exemple. Elle n'exécute pas votre CLI local et n'est pas reliée à un moteur DRWIL réel.",
    scenarios: {
      pass: "A — Tous les contrôles requis passent",
      unproven: "B — Un critère n'a aucune preuve durable",
      unfinished: "C — La vérification ne peut pas aboutir",
    },
    variants: {
      "all-green": "Contrat lié, contrôle passant",
      "no-proof": "Aucune preuve citée",
      "unknown-proof": "Preuve inconnue du registre",
      "check-only": "Un contrôle, mais pas de contrat",
      "tool-missing": "Un outil requis est absent",
      "human-pending": "Jugement humain en attente",
      "human-attested": "L'humain a attesté",
    },
    why: {
      "all-green":
        "Le critère cite un contrat, le contrat lance un contrôle, le contrôle a réussi. Toutes les obligations bloquantes sont prouvées : PASS.",
      "no-proof":
        "Tous les contrôles sont verts, pourtant le critère ne cite aucune preuve. Un pipeline vert n'est pas une exigence prouvée : le travail ne peut pas être considéré comme vérifié, le verdict est FAIL.",
      "unknown-proof":
        "Le critère cite EXP-099, qui n'existe pas dans le registre des contrats. Une preuve introuvable n'est pas une preuve : FAIL.",
      "check-only":
        "Le critère désigne un contrôle, pas le contrat qui le porte. Un contrôle seul n'est pas une obligation durable : FAIL tant qu'un contrat ne le porte pas.",
      "tool-missing":
        "Un contrôle requis n'a pas pu s'exécuter : aucun résultat n'existe. C'est une ERROR, un problème technique de vérification, pas un échec du travail, et jamais un succès.",
      "human-pending":
        "Tout ce qui est mécanique a passé, mais un critère attend un jugement humain qui n'a pas encore eu lieu. C'est MANUAL : en attente, ni échoué, ni réussi.",
      "human-attested":
        "Un humain a relu la formulation et l'a attestée, dans son propre terminal. La part vérifiable par un humain est enregistrée : le verdict peut passer en ATTESTED.",
    },
    panels: {
      criterion: "Critère d'acceptation",
      contract: "Contrat",
      checks: "Contrôles",
      evidence: "Preuves",
      verdict: "Verdict",
      terminal: "drwil verify (sortie d'exemple)",
    },
    criterionStatus: {
      pass: "prouvé",
      "no-proof": "sans preuve",
      "unknown-proof": "preuve inconnue du registre",
      "not-durable": "preuve non durable",
      "no-contract": "contrôle sans contrat",
      "not-pass": "preuve non passante",
    },
    table: { criterion: "Critère", proof: "Cite", verdict: "Jugement", none: "rien" },
    evidenceCols: { control: "Contrôle", command: "Commande", result: "Résultat", exit: "Sortie" },
    results: { ok: "ok", failed: "échec", "not run": "non exécuté" },
    exitLabel: "Code de sortie",
    attestButton: "Simuler l'attestation humaine",
    attestNote: "Dans le vrai CLI, c'est drwil attest, tapé par un humain dans un terminal interactif. Un agent ne peut pas le faire.",
    resetButton: "Revenir à l'attente",
    errorVsManual:
      "ERROR signifie que la vérification elle-même n'a pas pu être établie (outillage, configuration). MANUAL signifie que la part mécanique est faite et qu'un jugement humain reste dû.",
  },
  workflow: {
    title: "Sept étapes, trois responsabilités.",
    lead: "Le travail traverse des activités consignées dans un état local sur disque. Choisissez une étape pour voir ce qui s'y passe et ce qu'elle laisse.",
    listLabel: "Étapes du workflow",
    artifactLabel: "Artefact illustratif",
    stages: [
      {
        name: "SCOPING",
        text: "Définir le besoin, les limites et le contexte du projet. Lire, analyser, cadrer : aucun code n'est encore modifié.",
        role: "L'humain décide, l'agent aide à cadrer",
        artifact: "<!-- scope\nfiles:\n  - src/export/*\n-->",
      },
      {
        name: "EXPECTATION",
        text: "Formaliser ce qui doit être vrai : chaque critère d'acceptation pointe vers le contrat qui le prouvera.",
        role: "L'humain approuve les critères",
        artifact: "## Acceptance criteria\n- An empty export is refused — `EXP-012`",
      },
      {
        name: "REQUEST",
        text: "Clarifier le travail à réaliser avant d'écrire du code.",
        role: "Humain et agent",
        artifact: "$ node .githooks/state.mjs\nActivity: REQUEST",
      },
      {
        name: "BUILD",
        text: "L'agent implémente dans le périmètre déclaré. Les hooks et la CI rejouent les contrôles à chaque commit.",
        role: "L'agent construit",
        artifact: "Drwil-Brief: docs/projects/export.md",
      },
      {
        name: "EVIDENCE",
        text: "Exécuter les tests métier pertinents et collecter les résultats sous forme de preuves inspectables.",
        role: "L'agent exécute, DRWIL consigne",
        artifact: "$ npx drwil verify --evidence",
      },
      {
        name: "VERIFY",
        text: "DRWIL évalue les contrats déclarés et les critères d'acceptation de la fiche. Une vérification en échec renvoie le travail en BUILD.",
        role: "DRWIL évalue",
        artifact: "✗ FAIL   EXP-012  An empty export is refused",
      },
      {
        name: "CLOSING",
        text: "La clôture exige PASS ou ATTESTED sur le commit courant. La fiche est condensée dans un journal, les limites non traitées deviennent des intentions, la pull request est ouverte.",
        role: "L'humain accepte et fusionne",
        artifact: "GOVERNANCE: PASS                       (exit 0)",
      },
    ],
    roles: {
      agent: "L'agent",
      drwil: "DRWIL",
      human: "L'humain",
      agentText: "construit le travail, exécute les contrôles disponibles et produit des preuves.",
      drwilText: "évalue les obligations déclarées et renvoie un verdict déterministe.",
      humanText: "décide, atteste ce qu'une machine ne peut pas juger, et reste responsable.",
    },
    loopsTitle: "Les boucles",
    loops: [
      { name: "Boucle de commit", text: "Les hooks exécutent les contrôles, la garde de périmètre et le trailer de fiche avant qu'un commit soit accepté." },
      { name: "Boucle push et CI", text: "Le pre-push et la CI rejouent les contrôles. L'application effective dépend de la CI et des règles du dépôt." },
      { name: "Boucle de vérification", text: "Un VERIFY en échec revient en BUILD. Corriger, collecter les preuves, vérifier à nouveau." },
      { name: "Boucle d'attestation", text: "Un contrat MANUAL attend une attestation humaine, puis la vérification est relancée." },
      { name: "Boucle de file", text: "Plusieurs fiches prêtes peuvent être enchaînées, en s'arrêtant à la première porte humaine." },
    ],
    humanTitle: "Où l'humain reste dans la boucle",
    humanGates: [
      "Cadre le besoin et approuve les critères d'acceptation.",
      "Démarre le chantier : un agent ne peut pas démarrer seul.",
      "Atteste un contrat MANUAL : un agent ne peut pas attester son propre travail.",
      "Accepte et fusionne, sauf si la fusion a été autorisée au démarrage.",
    ],
    stateNote:
      "Le fichier d'état consigne localement l'activité courante. C'est un état de workflow, pas un journal d'audit complet de chaque action de l'agent.",
  },
  regression: {
    title: "Non-régression.",
    quote: "Un PASS enregistré, c'est de l'histoire. Un test rejouable, c'est une protection contre la régression.",
    lead: "Chaque critère d'acceptation est prouvé par un contrat doté d'un contrôle rejouable. Une fois validé, le comportement reste protégé dans tous les chantiers suivants.",
    before: "Avant le changement",
    after: "Après un changement ultérieur",
    beforeText: "Le contrôle d'EXP-012 passe. Le critère est prouvé.",
    afterText: "Une implémentation ultérieure casse le comportement. Le même contrôle est rejoué : il échoue, et le verdict nomme l'obligation rompue.",
    steps: ["Comportement validé", "Changement ultérieur", "Même test rejoué", "Obligation rompue identifiée"],
    note: "Un ancien résultat ne prouve pas à lui seul que le code actuel passe encore. Conserver le test et son lien à un contrat, c'est ce qui le rend réutilisable.",
    sample: "Données d'exemple. Cette page n'exécute aucun test.",
  },
  verdicts: {
    title: "Cinq verdicts. Aucun succès silencieux.",
    lead: "Chaque état a un sens précis et sa propre forme : il ne repose jamais sur la couleur seule.",
    items: [
      { name: "PASS", meaning: "Les obligations déclarées requises sont prouvées.", shape: "coche" },
      { name: "FAIL", meaning: "Un contrôle ou un critère d'acceptation n'est pas satisfait.", shape: "croix" },
      { name: "ERROR", meaning: "La vérification n'a pas pu établir le résultat : problème de configuration, d'outillage ou d'exécution.", shape: "point d'exclamation" },
      { name: "MANUAL", meaning: "Un jugement ou une validation humaine reste nécessaire.", shape: "point d'interrogation" },
      { name: "ATTESTED", meaning: "Une attestation humaine a été enregistrée et couvre toujours le contrat.", shape: "losange" },
    ],
    rule: "Non vérifié ne veut pas dire réussi.",
    priority: "Quand les résultats diffèrent, FAIL l'emporte sur ERROR, ERROR sur MANUAL, MANUAL sur PASS. MANUAL n'est jamais converti silencieusement en PASS.",
    exit: "Codes de sortie : 0 quand les contrats bloquants sont PASS ou ATTESTED, 1 pour FAIL ou MANUAL, 2 pour ERROR.",
  },
  boundaries: {
    title: "Ce que DRWIL fait, et ne fait pas.",
    lead: "Un outil de vérification doit être honnête sur ses propres limites.",
    doesTitle: "Il fait",
    does: [
      "Fournit un workflow local, indépendant de l'agent.",
      "Vérifie les contrats déclarés grâce aux contrôles configurés.",
      "Évalue les critères d'acceptation de la fiche active.",
      "Produit des résultats et des preuves de vérification inspectables.",
      "Prend en charge l'attestation humaine explicite quand c'est approprié.",
      "S'intègre aux hooks Git et aux workflows de CI pris en charge.",
    ],
    doesNotTitle: "Il ne fait pas",
    doesNot: [
      "Remplacer le développeur ni l'agent de codage IA.",
      "Garantir qu'une spécification incomplète ou mal conçue capture toutes les exigences.",
      "Prouver la qualité d'un contrôle du seul fait qu'il existe.",
      "Empêcher une fusion si la plateforme d'hébergement n'est pas configurée pour imposer les contrôles.",
      "Empêcher quelqu'un ayant assez d'accès au dépôt de contourner un hook local.",
      "Faire de son état de workflow local une piste d'audit complète et infalsifiable.",
    ],
  },
  install: {
    title: "Essayez-le sur un projet.",
    lead: "DRWIL n'est pas encore publié sur npm : installez-le depuis une release GitHub.",
    prerequisites: "Nécessite Node.js 22+ et git.",
    steps: [
      { title: "Installer comme dépendance de développement", text: "Depuis le dossier de votre projet.", code: "" },
      { title: "Prévisualiser, puis installer", text: "Le dry run n'écrit rien.", code: "npx drwil init --dry-run\nnpx drwil init" },
      {
        title: "Vérifier",
        text: "Sans CI configurée, un VERIFY ERROR est attendu : un contrôle qui n'a pas tourné ne compte jamais comme réussi.",
        code: "npx drwil doctor\nnpx drwil verify",
      },
    ],
    note: "Consultez toujours le README pour les instructions d'installation à jour.",
    copy: "Copier",
    copied: "Copié",
  },
  final: {
    title: "Rendre les obligations déclarées justiciables de preuves.",
    text: "L'IA peut produire le code. DRWIL rend les obligations déclarées justiciables de preuves.",
    cta: "Découvrir DRWIL sur GitHub",
  },
  footer: {
    text: "DRWIL est open source. Ce site présente l'outil en ligne de commande actuel ; ce n'est pas un produit hébergé.",
    links: { repo: "Dépôt", readme: "README", install: "Installation", issues: "Issues", license: "Licence" },
  },
};
