// ÉDIFICE — mock data layer. Exported to window.
// All content is original placeholder prose for the prototype.

const BUILDER = {
  name: "Amadou Diallo",
  initials: "AD",
  id: "BTS-2026-0847",
  email: "a.diallo@edifice.so",
  city: "Dakar · Diaspora Paris",
  joined: "12 mai 2026",
  tier: "eveil", // eveil | souverain (mutable via checkout)
};

// The foundational work read in the secure reader.
const CODEX = {
  title: "Le Codex du Bâtisseur",
  author: "Le Fondateur",
  edition: "Édition souveraine · 2026",
  chapters: [
    {
      no: "Liminaire",
      title: "Le Seuil",
      tier: "eveil",
      lede: "Avant de lire, comprends ce que lire engage. Ces pages ne se consomment pas : elles se travaillent.",
      paras: [
        "Tu tiens entre les mains un ouvrage qui ne t'appartient pas encore. Il ne t'appartiendra qu'au moment où tu en auras fait quelque chose — une décision, une habitude, un édifice. Jusque-là, tu n'es que de passage sur le seuil, et le seuil n'est pas la maison.",
        "On ne devient pas Bâtisseur en accumulant des mots. On le devient en posant, jour après jour, une pierre que l'on a soi-même taillée. Ce Codex n'est pas un trésor à garder : c'est un plan à exécuter. Lis-le lentement. Relis-le. Et surtout, agis entre deux lectures.",
        "Chaque page que tu parcours porte ta marque. Ton identifiant t'accompagne, discret, comme une signature qui rappelle que ce savoir t'a été confié et non vendu au rabais. Ce qui est confié se respecte ; ce qui se respecte se transmet avec rigueur.",
      ],
    },
    {
      no: "Chapitre I",
      title: "La Souveraineté commence par l'attention",
      tier: "eveil",
      lede: "Celui qui ne maîtrise pas son regard ne maîtrisera jamais son destin.",
      paras: [
        "La première richesse n'est ni l'or ni la terre : c'est l'attention. Tout, autour de toi, est organisé pour la capturer, la fragmenter, la revendre. Le Bâtisseur reprend d'abord possession de ce territoire intérieur. Sans cela, aucune œuvre durable n'est possible.",
        "Observe une journée de ta vie comme on observe un chantier. Où vont tes heures ? Qui décide de tes premières pensées au réveil ? Si la réponse est « un écran que je n'ai pas choisi », alors tu ne bâtis pas : on bâtit à travers toi, et pour le compte d'un autre.",
        "Reprends la main par de petits actes souverains. Choisis la première heure du jour. Choisis ce que tu laisses entrer. La souveraineté n'est pas un cri ; c'est une série de portes que l'on apprend à fermer, et de quelques-unes que l'on ouvre en pleine conscience.",
        "L'attention disciplinée n'appauvrit pas la vie — elle la concentre. Une loupe ne crée pas le soleil ; elle rassemble ce qui était déjà là jusqu'à ce qu'une flamme naisse. Sois cette loupe pour tes propres forces.",
      ],
    },
    {
      no: "Chapitre II",
      title: "Tailler la pierre avant de rêver la cathédrale",
      tier: "eveil",
      lede: "Les grandes œuvres ne s'effondrent jamais par le sommet, mais par la base que l'on a négligée.",
      paras: [
        "Tout le monde veut la cathédrale ; presque personne ne veut tailler la pierre. Pourtant il n'existe aucun raccourci : la cathédrale n'est rien d'autre que des milliers de pierres taillées avec le même soin, posées dans le bon ordre, par quelqu'un qui n'a pas renoncé.",
        "Choisis une seule pierre aujourd'hui. Une compétence, une dette à éteindre, une relation à réparer, un texte à finir. Travaille-la jusqu'à ce qu'elle soit droite. Demain, tu en prendras une autre. C'est ennuyeux, c'est lent, et c'est exactement ainsi que tout ce qui dure a été construit.",
        "Méfie-toi de l'ivresse des plans grandioses : elle te donne le plaisir de l'accomplissement sans l'effort de l'exécution. Le Bâtisseur garde son rêve haut et ses mains basses, dans la poussière du travail réel.",
      ],
    },
    {
      no: "Chapitre III",
      title: "La discipline est une forme de respect de soi",
      tier: "souverain",
      lede: "Ce chapitre est réservé aux Bâtisseurs de niveau Souverain.",
      paras: [
        "La discipline n'est pas une punition que l'on s'inflige : c'est la promesse que l'on tient à la personne que l'on veut devenir. Chaque fois que tu honores un engagement pris envers toi-même, tu te dis en silence : « Je suis quelqu'un sur qui l'on peut compter. » Et l'on commence par compter sur soi.",
        "Le monde récompense rarement l'intention. Il récompense la constance — cette vertu discrète qui ne fait pas de bruit, ne demande pas d'applaudissements, et continue quand l'enthousiasme des premiers jours s'est tu.",
      ],
    },
    {
      no: "Chapitre IV",
      title: "Bâtir pour les siens, transmettre aux suivants",
      tier: "souverain",
      lede: "Réservé au niveau Souverain.",
      paras: [
        "Un édifice qui ne sert qu'à son bâtisseur s'éteint avec lui. La vraie souveraineté regarde plus loin que sa propre vie : elle pense en générations, en lignées, en communautés que l'on relève.",
      ],
    },
  ],
};

const CONVERSATIONS = [
  { id: "c1", name: "Cercle des Souverains", initials: "CS", gold: true, last: "La séance de demain est confirmée à 20h.", time: "09:41", unread: 2, group: true },
  { id: "c2", name: "Fatou Ndiaye", initials: "FN", last: "Merci pour le chapitre II, ça m'a débloquée.", time: "08:12", unread: 0 },
  { id: "c3", name: "Mentor · K. Touré", initials: "KT", gold: true, last: "Pose ta pierre du jour avant midi.", time: "Hier", unread: 0 },
  { id: "c4", name: "Bâtisseurs Diaspora", initials: "BD", last: "Bienvenue aux 14 nouveaux Éveillés 🌱", time: "Hier", unread: 0, group: true },
];

const THREAD = [
  { side: "in", who: "K. Touré", text: "Salut Amadou. J'ai vu que tu as terminé le chapitre II hier soir.", t: "08:02" },
  { side: "in", who: "K. Touré", text: "Quelle est la pierre que tu tailles aujourd'hui ?", t: "08:02" },
  { side: "out", text: "Bonjour Mentor. Aujourd'hui : finir le plan de mon atelier et l'envoyer à deux personnes.", t: "08:09" },
  { side: "in", who: "K. Touré", text: "Bien. Une pierre concrète, vérifiable. Envoie-moi une capture quand c'est fait.", t: "08:10" },
  { side: "out", text: "Compté. Avant midi.", t: "08:11" },
];

// Admin — access log + fraud signals
const ACCESS_LOG = [
  { id: "BTS-2026-0847", who: "Amadou Diallo", action: "Lecture · Chap. II", method: "QR Impérial", loc: "Dakar, SN", device: "Chrome · macOS", risk: "ok", time: "il y a 2 min" },
  { id: "BTS-2026-0612", who: "Fatou Ndiaye", action: "Lecture · Chap. I", method: "Clé textuelle", loc: "Abidjan, CI", device: "Safari · iOS", risk: "ok", time: "il y a 6 min" },
  { id: "BTS-2026-1190", who: "Inconnu", action: "Tentative capture écran", method: "QR Impérial", loc: "Paris, FR", device: "Chrome · Windows", risk: "high", time: "il y a 9 min" },
  { id: "BTS-2026-0418", who: "Moussa Cissé", action: "Connexion", method: "One-Click", loc: "Montréal, CA", device: "Edge · Windows", risk: "ok", time: "il y a 14 min" },
  { id: "BTS-2026-0847", who: "Amadou Diallo", action: "2 sessions simultanées", method: "Clé textuelle", loc: "Dakar + Bruxelles", device: "2 appareils", risk: "med", time: "il y a 22 min" },
  { id: "BTS-2026-0903", who: "Awa Sow", action: "Paiement · Souverain", method: "Wave", loc: "Dakar, SN", device: "Android", risk: "ok", time: "il y a 31 min" },
];

window.EDIFICE_DATA = { BUILDER, CODEX, CONVERSATIONS, THREAD, ACCESS_LOG };
