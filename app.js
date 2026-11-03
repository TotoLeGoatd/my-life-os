// All personal data stays scoped to this browser's local storage.
const STORAGE_KEY = "mylifeos.data.v1";
const CATEGORIES = ["Intelligence", "Maisongaudino", "Sport", "Discipline", "Vie sociale & autonomie"];
const NOTE_TYPES = ["Note", "Idée", "Découverte", "Citation", "Apprentissage"];

const ICONS = {
  grid: '<rect x="3" y="3" width="7" height="7" rx="1.5"/><rect x="14" y="3" width="7" height="7" rx="1.5"/><rect x="3" y="14" width="7" height="7" rx="1.5"/><rect x="14" y="14" width="7" height="7" rx="1.5"/>',
  brain: '<path d="M9 4.5a3 3 0 0 0-5.5 1.7A3.5 3.5 0 0 0 4 13a3.5 3.5 0 0 0 4.5 5.2A3 3 0 0 0 12 20V5a2.5 2.5 0 0 0-3-2.5Z"/><path d="M15 4.5a3 3 0 0 1 5.5 1.7A3.5 3.5 0 0 1 20 13a3.5 3.5 0 0 1-4.5 5.2A3 3 0 0 1 12 20V5a2.5 2.5 0 0 1 3-2.5Z"/><path d="M8 8h.01M7 14h.01m10-6h.01m1 6h.01M12 8h.01M12 14h.01"/>',
  target: '<circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="5"/><circle cx="12" cy="12" r="1"/>',
  chart: '<path d="M3 3v18h18"/><path d="m19 9-5 5-4-4-5 5"/><path d="M19 9h-4m4 0v4"/>',
  lock: '<rect x="4" y="10" width="16" height="11" rx="2"/><path d="M8 10V7a4 4 0 0 1 8 0v3m-4 4v3"/>',
  download: '<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><path d="m7 10 5 5 5-5M12 15V3"/>',
  upload: '<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><path d="m17 8-5-5-5 5m5-5v12"/>',
  plus: '<path d="M12 5v14M5 12h14"/>',
  check: '<path d="m5 12 4 4L19 6"/>',
  close: '<path d="m18 6-12 12M6 6l12 12"/>',
  note: '<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6M8 13h8M8 17h6"/>',
  idea: '<path d="M9 18h6m-5 4h4m-2-20a7 7 0 0 0-4 12.7c.6.4 1 1 1 1.8h6c0-.8.4-1.4 1-1.8A7 7 0 0 0 12 2Z"/>',
  discovery: '<circle cx="12" cy="12" r="9"/><path d="m15.5 8.5-2.2 4.8-4.8 2.2 2.2-4.8 4.8-2.2Z"/>',
  quote: '<path d="M3 21c3-1 5-3.5 5-7V5H2v7h4c0 2-1 3-3 4v5Zm13 0c3-1 5-3.5 5-7V5h-6v7h4c0 2-1 3-3 4v5Z"/>',
  learning: '<path d="m3 7 9-4 9 4-9 4-9-4Z"/><path d="M7 9v5c3 3 7 3 10 0V9m5-2v7"/><path d="M22 14v4"/>',
  search: '<circle cx="11" cy="11" r="7"/><path d="m20 20-4-4"/>',
  edit: '<path d="M12 20h9"/><path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L8 18l-4 1 1-4Z"/>',
  trash: '<path d="M3 6h18m-2 0-.9 14H5.9L5 6m4 0V4h6v2m-5 4v6m4-6v6"/>',
  arrow: '<path d="M5 12h14m-6-6 6 6-6 6"/>',
  message: '<path d="M21 11.5a8.4 8.4 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.4 8.4 0 0 1-3.8-.9L3 21l1.9-5.7a8.4 8.4 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.4 8.4 0 0 1 3.8-.9h.5a8.5 8.5 0 0 1 8 8v.5Z"/>',
  flame: '<path d="M12 22a7 7 0 0 0 7-7c0-3-2-5-4-7-.2 2-1 3-2 3-1-3-3-6-5-8 0 4-1 6-3 9a7 7 0 0 0 7 10Z"/><path d="M10 18a2.5 2.5 0 0 0 5 0c0-1.3-.8-2.2-2.5-3.5-.2 1.2-1 1.7-1.5 1.7-.3-.8-.6-1.4-1-1.9-.3 1-.8 2-.8 3.7Z"/>',
  calendar: '<rect x="3" y="5" width="18" height="16" rx="2"/><path d="M16 3v4M8 3v4M3 10h18"/>',
  layers: '<path d="m12 3 9 5-9 5-9-5 9-5Z"/><path d="m3 12 9 5 9-5m-18 5 9 5 9-5"/>',
  spark: '<path d="m12 3 1.9 5.8L20 11l-6.1 2.2L12 19l-2-5.8L4 11l6-2.2L12 3Z"/><path d="m19 14 1.2 2.8L23 18l-2.8 1.2L19 22l-1.2-2.8L15 18l2.8-1.2L19 14Z"/>',
  left: '<path d="m15 18-6-6 6-6"/>',
  right: '<path d="m9 18 6-6-6-6"/>',
  clock: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
};

const CHALLENGE_PLANS = [
  {
    category: "Intelligence",
    tasks: [
      "Lis quelques pages et note une idée retenue", "Écoute un contenu éducatif et résume-le", "Apprends quelques mots dans une nouvelle langue", "Explore un sujet que tu connais peu", "Écris une question que tu aimerais résoudre", "Fais un exercice de mémoire sans tes notes", "Explique un concept simplement à voix haute", "Prends des notes d'un article de fond", "Découvre le contexte d'une citation", "Avance dans un cours ou un tutoriel", "Observe une œuvre et décris ce que tu vois", "Compare deux points de vue sur un sujet", "Rédige un mini-résumé de ta lecture", "Essaie une session de concentration sans écran", "Relis une ancienne note et ajoute une idée"
    ],
    stages: ["Découverte", "Régularité", "Concentration", "Approfondissement", "Transmission"],
    levels: ["Découverte — consacre 10 minutes à cette action, puis note une chose retenue.", "Régularité — prends 15 minutes et formule l'idée avec tes propres mots.", "Concentration — va jusqu'à 20 minutes sans distraction.", "Approfondissement — garde 25 minutes et ajoute une question à explorer.", "Transmission — consacre 30 minutes, puis explique ce que tu as appris simplement."]
  },
  {
    category: "Maisongaudino",
    tasks: [
      "Dessine une silhouette inspirée par ta journée", "Crée une association de trois couleurs", "Photographie une matière ou un détail inspirant", "Imagine une pièce signature pour la marque", "Fais un tableau de références visuelles", "Esquisse un logo ou un monogramme", "Écris une phrase qui exprime l'univers de la marque", "Étudie la coupe d'un vêtement que tu aimes", "Imagine une tenue complète autour d'une pièce", "Liste des matières à explorer", "Dessine trois variantes d'un même détail", "Range et légende une référence créative", "Prépare une idée de contenu pour la marque", "Observe une vitrine et note ce qui attire l'œil", "Écris une prochaine petite étape pour le projet"
    ],
    stages: ["Premier trait", "Exploration", "Intention", "Mise en forme", "Partage"],
    levels: ["Premier trait — accorde 10 minutes à cette idée et garde une première trace.", "Exploration — consacre 15 minutes et crée une deuxième variation.", "Intention — prends 20 minutes et précise le détail qui rend l'idée unique.", "Mise en forme — garde 25 minutes pour rendre le résultat présentable.", "Partage — consacre 30 minutes et prépare une version à montrer ou archiver."]
  },
  {
    category: "Sport",
    tasks: [
      "Fais une marche active", "Fais une séance douce de mobilité", "Suis un petit circuit au poids du corps", "Pédale à un rythme confortable", "Cours ou alterne course et marche", "Étire les zones qui en ont besoin", "Fais une séance de renforcement adaptée", "Danse sur quelques morceaux", "Sors prendre l'air et bouge", "Fais quelques exercices d'équilibre", "Répète un mouvement sportif que tu apprends", "Fais une randonnée ou un parcours dehors", "Essaie une courte séance de yoga", "Fais une récupération active", "Choisis un mouvement qui te fait du bien"
    ],
    stages: ["Mise en route", "Régularité", "Endurance", "Progression", "Autonomie"],
    levels: ["Mise en route — bouge 10 minutes, à une intensité confortable.", "Régularité — prends 15 minutes et garde un rythme où tu peux parler.", "Endurance — consacre 20 minutes en restant à l'écoute de ton corps.", "Progression — accorde 25 minutes à cette séance, avec des pauses si besoin.", "Autonomie — bouge 30 minutes à ton rythme et note comment tu te sens après."]
  },
  {
    category: "Discipline",
    tasks: [
      "Prépare ton espace pour la prochaine tâche", "Écris les trois priorités de ta journée", "Termine une petite tâche repoussée", "Range un endroit qui te ralentit", "Prépare tes affaires pour demain", "Fais une session de travail sans notifications", "Planifie une étape concrète pour un projet", "Commence ta tâche avant de te sentir prêt", "Fais un bilan simple de ta journée", "Respecte une heure de coucher choisie", "Note une dépense et sa catégorie", "Consacre un moment à une tâche administrative", "Éloigne ton téléphone pendant une activité", "Découpe une tâche compliquée en petites étapes", "Tiens une promesse que tu t'es faite"
    ],
    stages: ["Départ", "Cadre", "Attention", "Constance", "Ancrage"],
    levels: ["Départ — réserve 5 minutes et commence sans attendre le moment parfait.", "Cadre — prépare le nécessaire avant de démarrer.", "Attention — accorde 15 minutes à cette action, sans changer de tâche.", "Constance — termine ce que tu as commencé et coche-le.", "Ancrage — note quand tu pourrais refaire cette action dans ta semaine."]
  },
  {
    category: "Vie sociale & autonomie",
    tasks: [
      "Envoie un message sincère à une personne importante", "Propose un moment à partager avec quelqu'un", "Appelle un proche que tu n'as pas appelé récemment", "Exprime clairement un besoin ou une préférence", "Remercie quelqu'un pour une attention précise", "Prépare un repas simple pour toi", "Fais une démarche pratique par toi-même", "Demande de l'aide sur un point précis si nécessaire", "Prends des nouvelles d'une personne de ton entourage", "Organise un rendez-vous ou une sortie", "Fais une petite course en suivant ta liste", "Écoute quelqu'un sans regarder ton téléphone", "Apprends une tâche quotidienne utile", "Explore un endroit du quartier que tu connais peu", "Prends une décision pratique et assume-la"
    ],
    stages: ["Premier pas", "Initiative", "Présence", "Confiance", "Autonomie"],
    levels: ["Premier pas — fais-le simplement et observe ce qui te met à l'aise.", "Initiative — prépare le nécessaire toi-même avant de commencer.", "Présence — accorde toute ton attention à la personne ou à la tâche.", "Confiance — prends l'initiative sans attendre un rappel extérieur.", "Autonomie — note ce qui pourrait t'aider à refaire ce geste facilement."]
  }
];

const CHALLENGES = (() => {
  const byCategory = CHALLENGE_PLANS.map((plan, categoryIndex) => {
    const items = [];
    for (let i = 0; i < 73; i += 1) {
      const level = Math.floor(i / plan.tasks.length);
      const task = plan.tasks[i % plan.tasks.length];
      items.push({ id: `C${String(categoryIndex * 73 + i + 1).padStart(3, "0")}`, number: 0, category: plan.category, title: `${task} — ${plan.stages[level]}`, description: plan.levels[level] });
    }
    return items;
  });
  const all = [];
  for (let round = 0; round < 73; round += 1) {
    byCategory.forEach((items) => all.push(items[round]));
  }
  return all.map((item, index) => ({ ...item, number: index + 1 }));
})();

function localDateKey(date = new Date()) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function uid() {
  return globalThis.crypto?.randomUUID?.() || `n-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 9)}`;
}

function escapeHtml(value = "") {
  return String(value).replace(/[&<>"']/g, (char) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[char]);
}

function sampleState() {
  const stamp = new Date().toISOString();
  return {
    version: 1,
    notes: [
      { id: "sample-idea", title: "Les petites boucles font les grandes habitudes", type: "Apprentissage", category: "Personnel", content: "Réduire une action à un premier geste facile à refaire. Une fois le rythme installé, l'amélioration devient plus naturelle.", tags: ["habitudes", "discipline"], createdAt: stamp, updatedAt: stamp },
      { id: "sample-brand", title: "Piste pour Maisongaudino", type: "Idée", category: "Maisongaudino", content: "Explorer un vestiaire essentiel avec une silhouette forte, des matières tactiles et une palette sobre.", tags: ["création", "marque"], createdAt: stamp, updatedAt: stamp },
      { id: "sample-quote", title: "À retenir", type: "Note", category: "Apprentissage", content: "Une bonne question peut ouvrir plus de portes qu'une réponse rapide.", tags: ["curiosité"], createdAt: stamp, updatedAt: stamp }
    ],
    challengeLog: {}
  };
}

function readState() {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) return sampleState();
    const parsed = JSON.parse(stored);
    if (!parsed || parsed.version !== 1 || !Array.isArray(parsed.notes) || !parsed.challengeLog || typeof parsed.challengeLog !== "object") return sampleState();
    return { version: 1, notes: parsed.notes, challengeLog: parsed.challengeLog };
  } catch {
    return sampleState();
  }
}

let state = readState();
let currentView = "dashboard";
let challengeFilter = "Toutes";
let challengeSearch = "";
let challengePage = 0;
let calendarMonth = new Date(new Date().getFullYear(), new Date().getMonth(), 1);
let toastTimeout;
let deferredInstallPrompt = null;

function persist() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    return true;
  } catch {
    showToast("Le navigateur n'a pas pu enregistrer les données. Libérez de l'espace puis réessayez.");
    return false;
  }
}

function icon(name) {
  return `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.65" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${ICONS[name] || ICONS.note}</svg>`;
}

function replaceIcons(root = document) {
  root.querySelectorAll("[data-icon]").forEach((node) => {
    node.innerHTML = icon(node.dataset.icon);
  });
}

function showToast(message) {
  const node = document.querySelector("#toast");
  node.textContent = message;
  node.classList.add("visible");
  clearTimeout(toastTimeout);
  toastTimeout = setTimeout(() => node.classList.remove("visible"), 2800);
}

function formatDate(value, options = { day: "numeric", month: "short", year: "numeric" }) {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "";
  return new Intl.DateTimeFormat("fr-FR", options).format(date);
}

function todayChallenge() {
  const now = new Date();
  const start = new Date(now.getFullYear(), 0, 0);
  const dayOfYear = Math.floor((Date.UTC(now.getFullYear(), now.getMonth(), now.getDate()) - Date.UTC(start.getFullYear(), start.getMonth(), start.getDate())) / 86400000);
  return CHALLENGES[Math.min(Math.max(dayOfYear, 1), 365) - 1];
}

function completedEntries() {
  return Object.entries(state.challengeLog).filter(([, log]) => log && log.completedAt);
}

function completedDates() {
  return [...new Set(completedEntries().map(([, log]) => log.completedAt).filter((date) => /^\d{4}-\d{2}-\d{2}$/.test(date)))].sort();
}

function streakStats() {
  const dates = completedDates();
  if (!dates.length) return { current: 0, best: 0 };
  const set = new Set(dates);
  let best = 1;
  let run = 1;
  for (let i = 1; i < dates.length; i += 1) {
    const previous = new Date(`${dates[i - 1]}T00:00:00`);
    const current = new Date(`${dates[i]}T00:00:00`);
    const delta = Math.round((current - previous) / 86400000);
    run = delta === 1 ? run + 1 : 1;
    best = Math.max(best, run);
  }
  const today = localDateKey();
  const yesterdayDate = new Date();
  yesterdayDate.setDate(yesterdayDate.getDate() - 1);
  let cursor = set.has(today) ? new Date(`${today}T00:00:00`) : set.has(localDateKey(yesterdayDate)) ? new Date(`${localDateKey(yesterdayDate)}T00:00:00`) : null;
  let current = 0;
  while (cursor && set.has(localDateKey(cursor))) {
    current += 1;
    cursor.setDate(cursor.getDate() - 1);
  }
  return { current, best };
}

function completedForCategory(category) {
  return CHALLENGES.filter((challenge) => challenge.category === category && state.challengeLog[challenge.id]?.completedAt).length;
}

function renderDashboard() {
  const done = completedEntries().length;
  const noteCount = state.notes.length;
  const progress = Math.min(100, Math.round((done / 365) * 100));
  return `
    <section class="welcome">
      <div>
        <p class="eyebrow">VOTRE ESPACE PERSONNEL</p>
        <h2>Construis la personne<br />que tu veux devenir.</h2>
        <p class="welcome-description">Organise tes idées. Avance chaque jour.</p>
      </div>
      <div class="welcome-number" aria-hidden="true">01</div>
    </section>
    <div class="section-heading"><h2>Ton espace</h2><span>TOUT AU MÊME ENDROIT</span></div>
    <section class="dashboard-grid">
      <a class="dashboard-card" href="#brain" data-view="brain">
        <span class="card-icon" data-icon="brain"></span><span class="card-category">CONNAISSANCES</span>
        <h3>My Brain</h3><p>Notes, idées et découvertes.</p><span class="card-link">Ouvrir l’espace ${icon("arrow")}</span>
      </a>
      <a class="dashboard-card" href="#challenges" data-view="challenges">
        <span class="card-icon" data-icon="target"></span><span class="card-category">DÉVELOPPEMENT</span>
        <h3>365 Challenges</h3><p>Un défi dans chacun de tes domaines.</p><span class="card-link">Voir les défis ${icon("arrow")}</span>
      </a>
    </section>
    <div class="section-heading"><h2>Ton évolution</h2><span>VUE D’ENSEMBLE</span></div>
    <section class="stats-grid dashboard-stats" aria-label="Statistiques personnelles">
      <article class="stat-card"><span>NOTES ENREGISTRÉES</span><strong>${noteCount}</strong></article>
      <article class="stat-card"><span>DÉFIS TERMINÉS</span><strong>${done}</strong></article>
      <article class="stat-card"><span>PROGRESSION</span><strong>${progress}%</strong></article>
    </section>`;
}

function statCard(iconName, label, value, foot) {
  return `<article class="stat-card"><div class="stat-head"><span>${label}</span><span class="stat-icon">${icon(iconName)}</span></div><div class="stat-value">${escapeHtml(value)}</div><div class="stat-foot">${foot}</div></article>`;
}

function typeIcon(type) {
  return ({ "Idée": "idea", "Découverte": "discovery", "Citation": "quote", "Apprentissage": "learning" })[type] || "note";
}

function renderBrain() {
  const search = document.querySelector("#brainSearch")?.value ?? "";
  const category = document.querySelector("#brainCategory")?.value ?? "Toutes les catégories";
  const query = search.trim().toLocaleLowerCase("fr");
  const notes = [...state.notes].sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt)).filter((note) => {
    const searchable = [note.title, note.content, note.category, note.type, ...(note.tags || [])].join(" ").toLocaleLowerCase("fr");
    return (!query || searchable.includes(query)) && (category === "Toutes les catégories" || note.category === category);
  });
  const categories = [...new Set(state.notes.map((note) => note.category).filter(Boolean))].sort((a, b) => a.localeCompare(b, "fr"));
  document.querySelector("#mainView").innerHTML = `
    ${pageHeading("MY BRAIN", "Gardez l’essentiel.", "Capturez et retrouvez vos idées.", `<button class="button button-dark" data-action="add-note"><span data-icon="plus"></span> Nouvelle note</button>`)}
    <div class="toolbar">
      <label class="search-box"><span data-icon="search"></span><input id="brainSearch" type="search" placeholder="Rechercher…" value="${escapeHtml(search)}" /></label>
      <select class="filter-select" id="brainCategory" aria-label="Filtrer par classement"><option>Toutes les catégories</option>${categories.map((item) => `<option${item === category ? " selected" : ""}>${escapeHtml(item)}</option>`).join("")}</select>
      <span class="toolbar-spacer"></span><span class="result-count">${notes.length} résultat${notes.length === 1 ? "" : "s"}</span>
    </div>
    ${notes.length ? `<div class="notes-list">${notes.map(noteCard).join("")}</div>` : emptyState("note", query || category !== "Toutes les catégories" ? "Aucun résultat" : "Tout commence ici", query || category !== "Toutes les catégories" ? "Essayez un autre terme." : "Ajoutez votre première note.", `<button class="button button-dark" data-action="add-note"><span data-icon="plus"></span> Créer une note</button>`)}
  `;
  replaceIcons(document.querySelector("#mainView"));
  const newSearch = document.querySelector("#brainSearch");
  if (newSearch) {
    newSearch.addEventListener("input", () => {
      const value = newSearch.value;
      renderBrain();
      const next = document.querySelector("#brainSearch");
      next?.focus();
      if (next) next.setSelectionRange(value.length, value.length);
    });
  }
  document.querySelector("#brainCategory")?.addEventListener("change", renderBrain);
}

function noteCard(note) {
  const tags = (note.tags || []).filter(Boolean);
  return `<article class="note-card"><div class="note-card-top"><span class="note-type-icon">${icon(typeIcon(note.type))}</span><div class="note-main"><div class="note-title-line"><h3>${escapeHtml(note.title)}</h3><span class="note-meta">${escapeHtml(note.type)} · ${escapeHtml(note.category || "Sans classement")} · modifiée le ${formatDate(note.updatedAt)}</span></div><p class="note-content">${escapeHtml(note.content)}</p></div></div><div class="note-footer"><div class="tag-list">${tags.map((tag) => `<span class="tag">${escapeHtml(tag)}</span>`).join("")}</div><div class="note-actions"><button class="icon-button" data-action="edit-note" data-id="${escapeHtml(note.id)}" aria-label="Modifier ${escapeHtml(note.title)}" title="Modifier">${icon("edit")}</button><button class="icon-button" data-action="delete-note" data-id="${escapeHtml(note.id)}" aria-label="Supprimer ${escapeHtml(note.title)}" title="Supprimer">${icon("trash")}</button></div></div></article>`;
}

function pageHeading(eyebrow, title, description, actions = "") {
  return `<div class="page-heading"><div><div class="eyebrow">${eyebrow}</div><h1>${title}</h1><p>${description}</p></div>${actions ? `<div class="page-heading-actions">${actions}</div>` : ""}</div>`;
}

function emptyState(iconName, title, description, button = "") {
  return `<div class="empty-state"><span class="empty-state-mark">${icon(iconName)}</span><h3>${title}</h3><p>${description}</p>${button}</div>`;
}

function renderChallenges() {
  const query = challengeSearch.trim().toLocaleLowerCase("fr");
  const filtered = CHALLENGES.filter((challenge) => (challengeFilter === "Toutes" || challenge.category === challengeFilter) && (!query || `${challenge.title} ${challenge.description} ${challenge.category} ${challenge.number}`.toLocaleLowerCase("fr").includes(query)));
  const perPage = 12;
  const pages = Math.max(1, Math.ceil(filtered.length / perPage));
  challengePage = Math.min(challengePage, pages - 1);
  const pageItems = filtered.slice(challengePage * perPage, (challengePage + 1) * perPage);
  const done = completedEntries().length;
  const streak = streakStats().current;
  const progress = Math.round(done / 365 * 100);
  document.querySelector("#mainView").innerHTML = `
    ${pageHeading("DÉVELOPPEMENT", "365 Challenges", "Une année. Cinq domaines.")}
    <section class="challenge-overview">
      <div class="challenge-overview-top"><div><h3>${done} défis réalisés</h3><p>Sur 365 cette année.</p></div><span class="challenge-percentage">${progress}%</span></div>
      <div class="progress-track"><div class="progress-fill" style="width:${progress}%"></div></div>
    </section>
    <section class="challenge-stats">
      <article class="challenge-stat"><span>CATÉGORIES</span><strong>${CATEGORIES.length}</strong></article>
      <article class="challenge-stat"><span>JOURS ACTIFS</span><strong>${completedDates().length}</strong></article>
      <article class="challenge-stat"><span>SÉRIE ACTUELLE</span><strong>${streak}</strong></article>
    </section>
    <div class="toolbar">
      <label class="search-box"><span data-icon="search"></span><input id="challengeSearch" type="search" placeholder="Rechercher un défi…" value="${escapeHtml(challengeSearch)}" /></label>
      <span class="toolbar-spacer"></span><span class="result-count">${filtered.length} défi${filtered.length === 1 ? "" : "s"}</span>
    </div>
    <div class="category-tabs"><button class="category-tab ${challengeFilter === "Toutes" ? "active" : ""}" data-category="Toutes">Toutes les catégories</button>${CATEGORIES.map((category) => `<button class="category-tab ${challengeFilter === category ? "active" : ""}" data-category="${escapeHtml(category)}">${escapeHtml(category)}</button>`).join("")}</div>
    ${pageItems.length ? `<div class="challenge-list">${pageItems.map(challengeCard).join("")}</div>` : emptyState("target", "Aucun défi trouvé", "Essayez un autre terme.")}
    ${filtered.length > perPage ? `<div class="pagination"><button class="icon-button" data-action="challenge-page" data-delta="-1" aria-label="Page précédente" ${challengePage === 0 ? "disabled" : ""}>${icon("left")}</button><span>Page ${challengePage + 1} sur ${pages}</span><button class="icon-button" data-action="challenge-page" data-delta="1" aria-label="Page suivante" ${challengePage >= pages - 1 ? "disabled" : ""}>${icon("right")}</button></div>` : ""}`;
  replaceIcons(document.querySelector("#mainView"));
  document.querySelector("#challengeSearch")?.addEventListener("input", (event) => {
    challengeSearch = event.target.value;
    challengePage = 0;
    renderChallenges();
    const input = document.querySelector("#challengeSearch");
    input?.focus();
    if (input) input.setSelectionRange(challengeSearch.length, challengeSearch.length);
  });
}

function challengeCard(challenge) {
  const log = state.challengeLog[challenge.id] || {};
  const done = !!log.completedAt;
  const comment = (log.comment || "").trim();
  return `<article class="challenge-card ${done ? "is-done" : ""}"><button class="challenge-toggle ${done ? "checked" : ""}" data-action="toggle-challenge" data-id="${challenge.id}" aria-label="${done ? "Annuler" : "Valider"} le défi ${challenge.number}">${done ? icon("check") : ""}</button><div class="challenge-copy"><div class="challenge-copy-top"><span class="challenge-index">DÉFI ${String(challenge.number).padStart(3, "0")}</span><h3 class="challenge-title">${escapeHtml(challenge.title)}</h3></div><p class="challenge-desc">${escapeHtml(challenge.description)}</p><div class="challenge-foot"><span class="tag">${escapeHtml(challenge.category)}</span>${done ? `<span>Validé le ${formatDate(log.completedAt, { day: "numeric", month: "short" })}</span>` : ""}${comment ? `<span class="comment-indicator">${icon("message")} Commenté</span>` : ""}</div></div><button class="challenge-comment-button ${comment ? "has-comment" : ""}" data-action="edit-comment" data-id="${challenge.id}" aria-label="${comment ? "Modifier le commentaire" : "Ajouter un commentaire"}" title="Commenter">${icon("message")}</button></article>`;
}

function renderProgress() {
  const month = new Date(calendarMonth.getFullYear(), calendarMonth.getMonth(), 1);
  const year = month.getFullYear();
  const monthIndex = month.getMonth();
  const monthTitle = new Intl.DateTimeFormat("fr-FR", { month: "long", year: "numeric" }).format(month);
  const firstOffset = (month.getDay() + 6) % 7;
  const daysInMonth = new Date(year, monthIndex + 1, 0).getDate();
  const today = localDateKey();
  const dayNames = ["L", "M", "M", "J", "V", "S", "D"];
  const days = [...Array(firstOffset).fill(null), ...Array.from({ length: daysInMonth }, (_, index) => index + 1)];
  const streak = streakStats();
  const done = completedEntries().length;
  const categoryCounts = CATEGORIES.map((category) => ({ category, count: completedForCategory(category), total: 73 }));
  const monthDoneDays = new Set(completedDates().filter((key) => key.startsWith(`${year}-${String(monthIndex + 1).padStart(2, "0")}-`)));
  document.querySelector("#mainView").innerHTML = `
    ${pageHeading("SUIVI", "Le chemin parcouru.", "Votre régularité, en un coup d’œil.")}
    <div class="stats-grid progress-stats">
      ${statCard("target", "Défis", done, "sur 365")}
      ${statCard("calendar", "Jours actifs", completedDates().length, "au total")}
      ${statCard("flame", "Série", streak.current, streak.current === 1 ? "jour" : "jours")}
      ${statCard("spark", "Record", streak.best, streak.best === 1 ? "jour" : "jours")}
    </div>
    <div class="progress-overview">
      <section class="surface calendar-panel"><div class="calendar-head"><h2>Calendrier · ${escapeHtml(monthTitle)}</h2><div class="calendar-nav"><button class="icon-button" data-action="calendar-month" data-delta="-1" aria-label="Mois précédent">${icon("left")}</button><button class="icon-button" data-action="calendar-month" data-delta="1" aria-label="Mois suivant">${icon("right")}</button></div></div><div class="calendar-grid">${dayNames.map((day) => `<span class="calendar-day-name">${day}</span>`).join("")}${days.map((day) => {
      if (!day) return `<span class="calendar-day empty"></span>`;
      const key = `${year}-${String(monthIndex + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
      const hasProgress = monthDoneDays.has(key);
      return `<button class="calendar-day ${key === today ? "today" : ""} ${hasProgress ? "has-progress" : ""}" data-action="calendar-day" data-date="${key}" title="${hasProgress ? "Défi validé" : "Aucun défi validé"} le ${day}">${day}</button>`;
    }).join("")}</div><div class="calendar-legend"><span class="legend-dot"></span> Au moins un défi validé</div></section>
      <section class="surface streak-panel"><div><div class="streak-main"><div class="eyebrow">VOTRE RYTHME</div><span class="streak-icon">${icon("flame")}</span></div><div class="streak-value">${streak.current}</div><p>${streak.current === 1 ? "jour consécutif en ce moment" : "jours consécutifs en ce moment"}</p></div><div class="streak-bottom"><div><strong>${streak.best}</strong><small>meilleure série</small></div><div><strong>${completedDates().length}</strong><small>jours actifs</small></div><div><strong>${Math.round(done / 365 * 100)}%</strong><small>du parcours</small></div></div></section>
    </div>
    <section class="surface category-progress-panel"><div class="section-head"><h2>Vos domaines de vie</h2><span class="result-count">73 défis chacun</span></div><div class="category-progress-list">${categoryCounts.map(({ category, count, total }) => `<div class="category-progress-row"><span class="category-progress-name"><span class="mini-dot"></span>${escapeHtml(category)}</span><div class="category-progress-track"><span style="width:${Math.min(100, count / total * 100)}%"></span></div><span class="category-progress-value">${count} / ${total}</span></div>`).join("")}</div></section>`;
  replaceIcons(document.querySelector("#mainView"));
}

function render() {
  const allowed = ["dashboard", "brain", "challenges", "progress"];
  const requested = location.hash.replace(/^#/, "") || "dashboard";
  currentView = allowed.includes(requested) ? requested : "dashboard";
  if (!location.hash || !allowed.includes(requested)) history.replaceState(null, "", `#${currentView}`);
  document.querySelectorAll("[data-view]").forEach((link) => link.classList.toggle("active", link.dataset.view === currentView));
  document.querySelector("#noteCount").textContent = state.notes.length;
  const pageTitles = { dashboard: "Dashboard", brain: "My Brain", challenges: "365 Challenges", progress: "Progression" };
  document.querySelector("#topbarPageTitle").textContent = pageTitles[currentView];
  if (currentView === "brain") renderBrain();
  else if (currentView === "challenges") renderChallenges();
  else if (currentView === "progress") renderProgress();
  else document.querySelector("#mainView").innerHTML = renderDashboard();
  replaceIcons(document.querySelector("#mainView"));
}

function openNoteDialog(note = null) {
  const dialog = document.querySelector("#noteDialog");
  const form = document.querySelector("#noteForm");
  form.reset();
  form.elements.id.value = note?.id || "";
  form.elements.title.value = note?.title || "";
  form.elements.type.value = note?.type || "Note";
  form.elements.category.value = note?.category || "Personnel";
  form.elements.content.value = note?.content || "";
  form.elements.tags.value = (note?.tags || []).join(", ");
  document.querySelector("#noteDialogTitle").textContent = note ? "Modifier la note" : "Nouvelle note";
  dialog.showModal();
  setTimeout(() => form.elements.title.focus(), 50);
}

function saveNote(event) {
  event.preventDefault();
  const form = event.currentTarget;
  const existing = state.notes.find((note) => note.id === form.elements.id.value);
  const now = new Date().toISOString();
  const note = {
    id: existing?.id || uid(),
    title: form.elements.title.value.trim(),
    type: NOTE_TYPES.includes(form.elements.type.value) ? form.elements.type.value : "Note",
    category: form.elements.category.value.trim() || "Personnel",
    content: form.elements.content.value.trim(),
    tags: [...new Set(form.elements.tags.value.split(",").map((tag) => tag.trim()).filter(Boolean))],
    createdAt: existing?.createdAt || now,
    updatedAt: now
  };
  if (!note.title || !note.content) return;
  if (existing) state.notes = state.notes.map((item) => item.id === existing.id ? note : item);
  else state.notes.unshift(note);
  persist();
  document.querySelector("#noteDialog").close();
  if (currentView !== "brain") location.hash = "brain";
  else render();
  showToast(existing ? "Note mise à jour." : "Note enregistrée dans My Brain.");
}

function toggleChallenge(id) {
  if (!CHALLENGES.some((challenge) => challenge.id === id)) return;
  const current = state.challengeLog[id] || {};
  state.challengeLog[id] = { ...current, completedAt: current.completedAt ? null : localDateKey() };
  if (!state.challengeLog[id].completedAt && !state.challengeLog[id].comment) delete state.challengeLog[id];
  persist();
  render();
  showToast(state.challengeLog[id]?.completedAt ? "Défi validé. Chaque pas compte." : "Validation annulée.");
}

function openChallengeComment(id) {
  const challenge = CHALLENGES.find((item) => item.id === id);
  if (!challenge) return;
  const form = document.querySelector("#challengeForm");
  form.reset();
  form.elements.id.value = id;
  form.elements.comment.value = state.challengeLog[id]?.comment || "";
  document.querySelector("#challengeDialogPrompt").textContent = `${String(challenge.number).padStart(3, "0")} · ${challenge.title}`;
  document.querySelector("#challengeDialog").showModal();
}

function saveChallengeComment(event) {
  event.preventDefault();
  const form = event.currentTarget;
  const id = form.elements.id.value;
  const comment = form.elements.comment.value.trim();
  const current = state.challengeLog[id] || {};
  if (comment || current.completedAt) state.challengeLog[id] = { ...current, comment };
  else delete state.challengeLog[id];
  persist();
  document.querySelector("#challengeDialog").close();
  render();
  showToast(comment ? "Commentaire enregistré." : "Commentaire supprimé.");
}

function exportBackup() {
  const backup = { app: "My Life OS", version: 1, exportedAt: new Date().toISOString(), payload: state };
  const blob = new Blob([JSON.stringify(backup, null, 2)], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = `my-life-os-sauvegarde-${localDateKey()}.json`;
  document.body.append(anchor);
  anchor.click();
  anchor.remove();
  setTimeout(() => URL.revokeObjectURL(url), 1500);
  showToast("Sauvegarde téléchargée sur cet appareil.");
}

function validImportedState(raw) {
  const payload = raw?.payload || raw;
  if (!payload || payload.version !== 1 || !Array.isArray(payload.notes) || !payload.challengeLog || typeof payload.challengeLog !== "object" || Array.isArray(payload.challengeLog)) return null;
  const notes = payload.notes.filter((note) => note && typeof note === "object" && typeof note.title === "string" && typeof note.content === "string").map((note) => ({
    id: String(note.id || uid()), title: note.title.slice(0, 100), type: NOTE_TYPES.includes(note.type) ? note.type : "Note", category: String(note.category || "Personnel").slice(0, 35), content: note.content.slice(0, 12000), tags: Array.isArray(note.tags) ? note.tags.filter((tag) => typeof tag === "string").slice(0, 30).map((tag) => tag.slice(0, 40)) : [], createdAt: validTimestamp(note.createdAt), updatedAt: validTimestamp(note.updatedAt)
  }));
  const log = {};
  for (const [id, value] of Object.entries(payload.challengeLog)) {
    if (!CHALLENGES.some((challenge) => challenge.id === id) || !value || typeof value !== "object") continue;
    const completedAt = /^\d{4}-\d{2}-\d{2}$/.test(value.completedAt || "") ? value.completedAt : null;
    const comment = typeof value.comment === "string" ? value.comment.slice(0, 2000) : "";
    if (completedAt || comment) log[id] = { completedAt, comment };
  }
  return { version: 1, notes, challengeLog: log };
}

function validTimestamp(value) {
  return typeof value === "string" && !Number.isNaN(new Date(value).getTime()) ? value : new Date().toISOString();
}

async function importBackup(file) {
  if (!file) return;
  try {
    const raw = JSON.parse(await file.text());
    const next = validImportedState(raw);
    if (!next) throw new Error("Ce fichier ne semble pas être une sauvegarde My Life OS valide.");
    const noteText = `${next.notes.length} note${next.notes.length === 1 ? "" : "s"}`;
    const completedText = `${Object.values(next.challengeLog).filter((item) => item.completedAt).length} défi${Object.values(next.challengeLog).filter((item) => item.completedAt).length === 1 ? "" : "s"} validé${Object.values(next.challengeLog).filter((item) => item.completedAt).length === 1 ? "" : "s"}`;
    if (!confirm(`Restaurer cette sauvegarde ? Les données actuelles seront remplacées par ${noteText} et ${completedText}.`)) return;
    state = next;
    persist();
    render();
    showToast("Sauvegarde restaurée sur cet appareil.");
  } catch (error) {
    showToast(error instanceof SyntaxError ? "Le fichier JSON n'a pas pu être lu." : (error.message || "Restauration impossible."));
  } finally {
    document.querySelector("#importFile").value = "";
  }
}

function configureInstall() {
  const install = document.querySelector("#installButton");
  const isIos = /iphone|ipad|ipod/i.test(navigator.userAgent) || (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1);
  const standalone = window.matchMedia("(display-mode: standalone)").matches || navigator.standalone === true;
  install.hidden = standalone || !isIos;
  window.addEventListener("beforeinstallprompt", (event) => {
    event.preventDefault();
    deferredInstallPrompt = event;
    install.hidden = standalone;
  });
  window.addEventListener("appinstalled", () => { install.hidden = true; showToast("My Life OS est installé."); });
  install.addEventListener("click", async () => {
    if (deferredInstallPrompt) {
      deferredInstallPrompt.prompt();
      const result = await deferredInstallPrompt.userChoice;
      if (result.outcome === "accepted") showToast("Installation lancée.");
      deferredInstallPrompt = null;
    } else if (isIos) {
      showToast("Dans Safari : Partager, puis Ajouter à l’écran d’accueil.");
    }
  });
}

document.addEventListener("click", (event) => {
  const nav = event.target.closest("[data-view]");
  if (nav) {
    event.preventDefault();
    if (location.hash !== `#${nav.dataset.view}`) location.hash = nav.dataset.view;
    else render();
    return;
  }
  const category = event.target.closest("[data-category]");
  if (category) {
    challengeFilter = category.dataset.category;
    challengePage = 0;
    renderChallenges();
    return;
  }
  const close = event.target.closest(".close-dialog");
  if (close) { close.closest("dialog")?.close(); return; }
  const actionNode = event.target.closest("[data-action]");
  if (!actionNode) return;
  const { action, id } = actionNode.dataset;
  if (action === "add-note") openNoteDialog();
  else if (action === "edit-note") {
    const note = state.notes.find((item) => item.id === id);
    if (note) openNoteDialog(note);
  } else if (action === "delete-note") {
    const note = state.notes.find((item) => item.id === id);
    if (note && confirm(`Supprimer « ${note.title} » ?`)) {
      state.notes = state.notes.filter((item) => item.id !== id);
      persist(); render(); showToast("Note supprimée.");
    }
  } else if (action === "toggle-challenge") toggleChallenge(id);
  else if (action === "edit-comment") openChallengeComment(id);
  else if (action === "challenge-page") { challengePage += Number(actionNode.dataset.delta); renderChallenges(); }
  else if (action === "calendar-month") { calendarMonth.setMonth(calendarMonth.getMonth() + Number(actionNode.dataset.delta)); renderProgress(); }
  else if (action === "calendar-day") {
    const count = completedEntries().filter(([, log]) => log.completedAt === actionNode.dataset.date).length;
    const dateLabel = formatDate(`${actionNode.dataset.date}T00:00:00`, { day: "numeric", month: "long" });
    showToast(count ? `${count} défi${count === 1 ? "" : "s"} validé${count === 1 ? "" : "s"} le ${dateLabel}.` : `Aucun défi validé le ${dateLabel}.`);
  }
});

document.querySelector("#quickAddButton").addEventListener("click", () => openNoteDialog());
document.querySelector("#noteForm").addEventListener("submit", saveNote);
document.querySelector("#challengeForm").addEventListener("submit", saveChallengeComment);
document.querySelector("#exportButton").addEventListener("click", exportBackup);
document.querySelector("#importButton").addEventListener("click", () => document.querySelector("#importFile").click());
document.querySelector("#exportButtonMobile").addEventListener("click", exportBackup);
document.querySelector("#importButtonMobile").addEventListener("click", () => document.querySelector("#importFile").click());
document.querySelector("#importFile").addEventListener("change", (event) => importBackup(event.target.files?.[0]));
window.addEventListener("hashchange", render);

const topDate = new Intl.DateTimeFormat("fr-FR", { weekday: "long", day: "numeric", month: "long" }).format(new Date());
document.querySelector("#topbarDate").textContent = topDate.charAt(0).toLocaleUpperCase("fr") + topDate.slice(1);
replaceIcons();
render();
configureInstall();

if ("serviceWorker" in navigator && (location.protocol === "https:" || location.hostname === "localhost" || location.hostname === "127.0.0.1")) {
  window.addEventListener("load", () => navigator.serviceWorker.register("./sw.js").catch(() => showToast("Mode hors ligne indisponible sur cette adresse.")));
}
