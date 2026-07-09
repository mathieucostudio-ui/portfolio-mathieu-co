# Refonte visuelle "Épure de calque" — plan d'implémentation

## Context

Mathieu a fait valider une refonte visuelle complète du site vitrine
(`portfolio-mathieu-co`) via un outil de design externe ("Claude Design").
Le handoff est dans `/home/hermes/projects/claude-design/design_handoff_refonte_visuelle/`
(repo GitHub `mathieucostudio-ui/claude-design`) : un `README.md` de brief
détaillé + 6 prototypes HTML autonomes (`.dc.html`) qui sont des références
visuelles haute-fidélité, pas du code à copier. Consigne explicite de
Mathieu : **ne rien changer à ce qui a été validé dans ce handoff — on
implémente tel quel dans le codebase Next.js existant.**

Nouvelle direction "Épure de calque" : vocabulaire de plan technique
(papier/encre, cotes, bordures 2px jamais arrondies) + retenue chromatique
de galerie (un seul accent latérite). Ajouts majeurs vs le site actuel :
section Journal/Blog (nouvelle), formulaire Contact réel (UI), section
Démarche sur les pages projet, mode clair/sombre.

## Approach

Une branche dédiée `refonte/epure-de-calque` (Vercel génère une preview URL
par push ; le site actuel reste intact en prod tant que la branche n'est
pas mergée). Séquençage en 5 phases, chacune testable avant de passer à la
suivante (tracer bullet : prouver les fondations avec une page complète —
Home — avant d'attaquer le reste) :

0. **Fondations** — tokens Tailwind, CSS vars, polices, infra dark/light
1. **Home** — le plus gros morceau de réutilisation/réécriture de composants existants
2. **Page Projet + section Démarche** — inclut l'ajout de `surface`/`livraison`
3. **Journal** — le plus gros net-new (data model, 2 routes, 3 composants)
4. **Contact** — le plus petit morceau, isolé, aucune dépendance sur le reste

## Key decisions

- **`Tokens.dc.html` = spec canonique littérale.** Le bloc `tailwindSnippet`
  et `cssSnippet` embarqués dans son runtime JS (lignes 155–198 du fichier)
  sont copiés verbatim dans `tailwind.config.ts` / `app/globals.css` — pas
  de réinterprétation des couleurs/tailles/easings.
- **`surface`/`livraison` : ajout d'interface, pas de logique.** Mathieu a
  tranché : ajouter ces 2 champs optionnels dans `data/projets.json`.
  Conséquence technique nécessaire mais minimale : `lib/projets.ts` doit
  déclarer `surface?: string` et `livraison?: string` sur l'interface
  `Projet` pour que ce soit type-safe. **Aucune fonction de `lib/projets.ts`
  ou `lib/drive.ts` n'est modifiée** (`getAllProjets`, `getProjetById`,
  `getAdjacentProjets`, pipeline Drive intacts) — la contrainte "ne pas
  toucher le pipeline" porte sur la logique, pas sur la déclaration de type.
- **Dark mode : `darkMode: 'class'`, clair par défaut, pas de détection
  système.** Confirmé par Mathieu. Toggle manuel dans la Navbar, persisté
  en `localStorage`, classe `.dark` posée sur `<html>`.
- **Démarche : contenu générique, pas par-projet.** Le brief lui-même
  utilise un texte de méthode identique dans le prototype (pas de contenu
  spécifique par projet dans le handoff). 4 étapes fixes (Croquis → Plan &
  coupes → Chantier → Livré), images = `selectedImages.slice(0, 4)` du
  projet ; si moins de 4 images disponibles, répéter la dernière plutôt que
  laisser un slot vide.
- **Journal : les 6 entrées d'index sont validées telles quelles**
  (`Journal.dc.html` lignes 135–140, titre/extrait/catégorie/date/temps
  copiés verbatim dans `data/journal.json`). **Un seul article a un corps
  complet et validé** (« Choisir son iroko avant de dessiner »,
  `JournalArticle.dc.html` lignes 49–54) — copié verbatim. Les 5 autres
  ont `corps: null` ; la page article rend quand même la structure/typo
  exacte du template avec un bloc "Contenu à compléter" visible, jamais de
  texte inventé. Mathieu remplit lui-même `data/journal.json` ensuite —
  aucun code à toucher pour ajouter du contenu.
- **Contact : UI only, confirmé par le brief lui-même** (pas une coupe de
  ma part). Pas d'appel réseau au submit, état de succès local uniquement.
- **Polices : remplacement complet**, pas de coexistence avec
  Cormorant Garamond / Montserrat. Newsreader (italic 400/500/600), Space
  Grotesk (400/500/600/700), JetBrains Mono (400/500), via
  `next/font/google`.
- **Composants partagés extraits une seule fois** (`RevealOnScroll`,
  `MagneticButton`, `CursorLabel`) plutôt que dupliqués par page — ce sont
  des comportements identiques (même easing, même seuil, même logique
  d'observation), pas juste une forme qui se ressemble par coïncidence.

## Files to modify

### Phase 0 — Fondations
- `tailwind.config.ts` — remplacer tout `theme.extend` par le snippet de
  `Tokens.dc.html` (colors `paper/ink/hairline/accent/blueprint`,
  `fontFamily.display/ui/mono`, `borderRadius.DEFAULT: '2px'`,
  `transitionTimingFunction.reveal`, `transitionDuration.reveal`), ajouter
  `darkMode: 'class'`
- `app/globals.css` — remplacer les blocs `:root`/`.dark` par le
  `cssSnippet` de `Tokens.dc.html` verbatim ; adapter le grain papier
  (`radial-gradient(rgba(ink),1px,transparent 1px); background-size:3px 3px`)
  et les règles scrollbar/selection existantes aux nouvelles variables
- `app/layout.tsx` — remplacer `Cormorant_Garamond`/`Montserrat` par
  `Newsreader`/`Space_Grotesk`/`JetBrains_Mono` (next/font/google), wirer
  les 3 variables CSS
- `components/ThemeToggle.tsx` (nouveau) — logique dark/light : lecture/
  écriture `localStorage`, pose la classe `.dark` sur `<html>`, défaut clair

### Phase 1 — Home
- `components/Navbar.tsx` — réécriture : palette papier/bleu-de-calque,
  seuil backdrop-blur ~40px, liens Projets/Studio/Journal/Contact,
  sélecteur FR/EN statique, bouton `ThemeToggle`
- `components/Hero.tsx` — réécriture complète : carrousel 5 slides
  (flèches, points, molette `deltaX`, swipe tactile), 1 slide maquette 3D
  volumétrique (CSS `perspective`/`transform-style: preserve-3d`/
  `rotateX`/`rotateY` pilotée par le scroll vertical), transition floutée
  (`blur(22px) brightness(.5)`) entre dernière slide média et maquette,
  séquence d'intro (`scaleX` + fade logo, une fois par session), barre de
  progression de scroll (2px, fixe en haut)
- `components/Sommaire.tsx` + `components/ProjetCard.tsx` — réécriture :
  grille `repeat(auto-fit,minmax(460px,1fr))`, zoom image `scale(1.06)` au
  survol, `CursorLabel` "Voir le projet →", bordure supérieure accent au
  survol
- `components/Studio.tsx` — réécriture : 2 colonnes, CTA `MagneticButton`
  "Discuter de votre projet", 3 valeurs numérotées avec reveal
- `components/JournalPreview.tsx` (nouveau) — 3 derniers articles de
  `data/journal.json` + lien "Voir le journal →"
- `components/Closing.tsx` — réécriture citation + footer aux nouveaux
  tokens/typo (reste un seul fichier, comme aujourd'hui)
- `components/RevealOnScroll.tsx` (nouveau) — wrapper `IntersectionObserver`
  partagé : `opacity 0→1`, `translateY 28px→0`, 700ms
  `cubic-bezier(.16,1,.3,1)`, décalage cascade 70ms
- `components/MagneticButton.tsx` (nouveau) — wrapper CTA magnétique
  (amortissement ~0.25–0.3), réutilisé par Studio et Contact
- `components/CursorLabel.tsx` (nouveau) — label qui suit la souris au
  survol, réutilisé par `ProjetCard` et `JournalCard`
- `app/page.tsx` — cabler les composants réécrits + nouvelle section
  Journal preview

### Phase 2 — Page Projet + Démarche
- `data/projets.json` — ajouter `surface?`/`livraison?` (renseignés quand
  connus, absents sinon)
- `lib/projets.ts` — ajouter `surface?: string; livraison?: string` à
  l'interface `Projet` uniquement, zéro changement de logique
- `app/projets/[id]/page.tsx` — header 78vh, titre Newsreader italique
  très grand, tableau meta 2 colonnes (Type/Lieu toujours, Surface/
  Livraison conditionnels — ligne masquée si absente, jamais de placeholder)
- `components/ProjetIntro.tsx` — restyle aux nouveaux tokens
- `components/Demarche.tsx` (nouveau) — 4 étapes fixes, contenu générique,
  images `selectedImages.slice(0,4)` (pad si <4), reveal cascade
- `components/Galerie.tsx` — restyle : grille 4 colonnes, spans variables
  (`span 2` sur 1 image sur 5), reveal au scroll
- `components/Lightbox.tsx` — restyle uniquement (garder la logique
  swipe/clavier déjà en place), cross-fade 320ms
- `components/ProjetNav.tsx` — restyle prev/next

### Phase 3 — Journal (nouveau)
- `data/journal.json` (nouveau) — 6 entrées `{ slug, categorie, titre,
  excerpt, date, temps, corps }`, 1 avec `corps` complet (iroko), 5 avec
  `corps: null`
- `lib/journal.ts` (nouveau) — `getAllArticles()`, `getArticleBySlug()`,
  `getAdjacentArticles()`, même pattern que `lib/projets.ts`
- `app/journal/page.tsx` (nouveau) — index : badge "Nouveau — Section
  Journal", filtres catégorie (Tous/Méthode/Chantier/Regard), grille
  `repeat(auto-fit,minmax(340px,1fr))`
- `components/JournalCard.tsx` (nouveau) — zoom image au survol,
  `CursorLabel` "Lire l'article →"
- `components/JournalFilters.tsx` (nouveau) — boutons toggle catégorie
- `app/journal/[slug]/page.tsx` (nouveau) — fil d'Ariane, meta, image hero,
  corps (max-width 720px, line-height 1.85), citation bordure accent,
  nav prev/next ; si `corps` est `null`, bloc "Contenu à compléter" visible
  à la place d'un texte généré

### Phase 4 — Contact (nouveau)
- `app/contact/page.tsx` (nouveau) — layout 2 colonnes (formulaire +
  coordonnées)
- `components/ContactForm.tsx` (nouveau) — Nom/Email/Téléphone/Type de
  projet(select)/Budget(select)/Message, champs `border-bottom` hairline
  uniquement, submit `MagneticButton`, succès local (pas d'appel réseau)

## Out of scope

Déjà exclu par le brief lui-même ou par une décision explicite de Mathieu
— pas des coupes de ma part :
- Branchement email du formulaire Contact — brief : "à brancher côté
  implémentation réelle"
- Sélecteur FR/EN fonctionnel — brief : "statique pour l'instant"
- Vrai viewer 3D IFC/BIM (`web-ifc`/`three.js`) — brief : "hors scope de
  cette itération"
- Corps des 5 articles Journal restants — Mathieu les complète lui-même
  dans `data/journal.json`
- Toute modification de `lib/drive.ts`, `next.config.ts`, `vercel.json`,
  variables d'environnement, ou de la logique de `lib/projets.ts` — gel
  explicite du brief
- Détection `prefers-color-scheme` — décidé : toggle manuel uniquement

## Verification

- `npm run build` → build TypeScript sans erreur (valide que les nouveaux
  champs optionnels `Projet` ne cassent rien côté consommateurs existants)
- `npm run dev` → `localhost:3000` démarre en mode clair, le toggle bascule
  vers la palette bleu-de-calque et persiste après reload (`localStorage`)
- Passage manuel sur `/` : carrousel hero 5 slides navigable (flèches/
  points/molette/swipe), slide maquette 3D visible et réactive au scroll,
  barre de progression visible, grille Sommaire avec reveal, section
  Journal preview affiche 3 articles et lie vers `/journal`
- Passage manuel sur `/projets/[id]` pour un projet avec `surface`/
  `livraison` renseignés et un sans : tableau meta affiche 4 ou 2 lignes
  correctement (aucune cellule vide/placeholder), section Démarche rend 4
  étapes avec vraies images, Galerie + Lightbox (clavier/swipe) OK
- Passage manuel sur `/journal` : filtres réduisent la grille correctement,
  6 cartes visibles sous "Tous"
- Passage manuel sur `/journal/choisir-son-iroko-avant-de-dessiner` : corps
  complet rendu ; un autre slug affiche le bloc "à compléter", jamais de
  texte inventé
- Passage manuel sur `/contact` : champs présents, submit affiche le succès
  local, **aucune requête réseau ne part** (vérifier l'onglet Network)
- URL de preview Vercel de la branche `refonte/epure-de-calque` revue par
  Mathieu avant merge sur `main`

## STOP conditions

- Si `Tokens.dc.html` et un autre `.dc.html` se contredisent sur une valeur
  (couleur/taille/easing) : arrêter et demander plutôt que trancher seul —
  `Tokens.dc.html` est la référence, mais un écart pourrait signaler une
  révision plus récente ailleurs.
- Si `data/projets.json` ne peut pas recevoir `surface`/`livraison` sans
  casser le typage strict quelque part d'imprévu : arrêter, ne pas
  contourner en touchant `lib/drive.ts`.
- Ne jamais merger `refonte/epure-de-calque` sur `main` sans validation
  explicite de Mathieu sur l'URL de preview Vercel.
