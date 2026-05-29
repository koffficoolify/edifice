// ÉDIFICE — Bibliothèque
function Library({ builder, onOpen, onNavigate }) {
  const { CODEX } = window.EDIFICE_DATA;
  const souverain = builder.tier === "souverain";
  const readable = CODEX.chapters.filter((c) => c.tier === "eveil").length;
  const total = CODEX.chapters.length;

  const shelf = [
    { id: "codex", title: "Le Codex du Bâtisseur", author: "Le Fondateur", tier: "eveil", cls: "cover-eveil", chapters: total, you: true },
    { id: "lois", title: "Les Lois de la Souveraineté", author: "Le Fondateur", tier: "souverain", cls: "cover-souverain", chapters: 9, you: souverain },
    { id: "atelier", title: "L'Atelier des Anciens", author: "Cercle Souverain", tier: "souverain", cls: "cover-souverain", chapters: 12, you: souverain },
  ];

  return (
    <div className="content">
      <div className="content-inner">
        {/* Hero — continue reading */}
        <div className="lib-hero">
          <div className="copy">
            <div className="row" style={{ gap: 10 }}>
              <span className="badge badge-gold"><Icon name="bookmark" size={12} />Reprendre la lecture</span>
            </div>
            <div style={{ fontFamily: "var(--font-read)", fontSize: 32, fontWeight: 500, lineHeight: 1.12 }}>
              {CODEX.title}
            </div>
            <p style={{ color: "oklch(0.78 0.01 80)", maxWidth: 460, margin: 0, fontSize: 14.5, lineHeight: 1.6 }}>
              Tu en es au <strong style={{ color: "#fff" }}>Chapitre II — Tailler la pierre</strong>.
              Le Bâtisseur garde son rêve haut et ses mains basses.
            </p>
            <div className="row" style={{ gap: 12, marginTop: 6 }}>
              <button className="btn btn-gold" onClick={() => onOpen({ chapter: 2 })}>
                <Icon name="book-open" size={16} />Continuer · Chap. II
              </button>
              <div className="mono" style={{ fontSize: 12, color: "oklch(0.66 0.01 80)" }}>
                {readable}/{total} chapitres débloqués
              </div>
            </div>
          </div>
          <div className="art">
            <div style={{ textAlign: "center" }}>
              <span className="glyph" style={{ width: 56, height: 56, display: "inline-flex", border: "1px solid var(--gold)", color: "var(--gold)", borderRadius: 12, alignItems: "center", justifyContent: "center" }}>
                <EdificeGlyph size={30} color="var(--gold)" />
              </span>
              <div className="mono" style={{ fontSize: 11, color: "oklch(0.6 0.02 84)", marginTop: 16, letterSpacing: ".2em" }}>
                ÉDITION SOUVERAINE
              </div>
            </div>
          </div>
        </div>

        {/* Shelf */}
        <div className="between" style={{ marginTop: 8 }}>
          <div className="section-label">Ta bibliothèque</div>
          <span className="muted" style={{ fontSize: 12 }}>{shelf.length} ouvrages</span>
        </div>
        <div className="lib-grid">
          {shelf.map((b) => {
            const locked = b.tier === "souverain" && !souverain;
            return (
              <div className="book" key={b.id} onClick={() => locked ? onNavigate("checkout") : onOpen(b.id === "codex" ? {} : { other: true })}>
                <div className={"book-cover " + b.cls}>
                  <div className="corner" />
                  <div className="between">
                    <span className="glyph"><EdificeGlyph size={16} color="var(--gold)" /></span>
                    <span className={"badge " + (b.tier === "souverain" ? "badge-gold" : "badge-eveil")} style={{ background: b.tier === "souverain" ? "rgba(212,175,90,.16)" : "rgba(255,255,255,.14)", color: "#fff", borderColor: "rgba(255,255,255,.2)" }}>
                      {b.tier === "souverain" ? "Souverain" : "Éveil"}
                    </span>
                  </div>
                  <div>
                    <div className="bt">{b.title}</div>
                    <div style={{ fontSize: 12, opacity: 0.7, marginTop: 6 }}>{b.author}</div>
                  </div>
                  {locked && (
                    <div className="lock-veil">
                      <Icon name="lock" size={22} color="var(--gold)" />
                      <div style={{ fontSize: 13, maxWidth: 160 }}>Réservé aux Bâtisseurs Souverains</div>
                      <span className="badge badge-gold" style={{ background: "rgba(212,175,90,.18)", color: "#fff", borderColor: "var(--gold)" }}>Débloquer</span>
                    </div>
                  )}
                </div>
                <div className="book-meta">
                  <span className="muted" style={{ fontSize: 12 }}>{b.chapters} chapitres</span>
                  <span className="mono" style={{ fontSize: 11, color: locked ? "var(--muted-foreground)" : "var(--primary)" }}>
                    {locked ? "Verrouillé" : (b.you ? "Disponible" : "—")}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Reassurance row */}
        <div className="metrics" style={{ marginTop: 8, gridTemplateColumns: "repeat(3,1fr)" }}>
          {[
            { ic: "wifi", t: "Lecture en flux", s: "Aucun fichier ne quitte nos serveurs." },
            { ic: "fingerprint", t: "Filigrane nominatif", s: "Ton identifiant marque chaque page." },
            { ic: "download", t: "Téléchargement bloqué", s: "Copie, impression et export désactivés." },
          ].map((x) => (
            <div className="card" key={x.t}>
              <div className="card-body" style={{ display: "flex", gap: 14, alignItems: "flex-start" }}>
                <span className="icon-tile tile-muted"><Icon name={x.ic} size={17} /></span>
                <div>
                  <div style={{ fontWeight: 600 }}>{x.t}</div>
                  <div className="muted" style={{ fontSize: 13, marginTop: 3 }}>{x.s}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

window.Library = Library;
