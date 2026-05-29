// ÉDIFICE — Pyramide des Bâtisseurs
function Pyramid({ builder, onNavigate }) {
  const souverain = builder.tier === "souverain";
  const tiers = [
    { cls: "pyr-cap", label: "Fondateur", count: "Le gardien de l'œuvre", you: false, plain: true },
    { cls: "pyr-souverain", label: "Souverain", count: "412 Bâtisseurs", you: souverain, n: "Niveau 2" },
    { cls: "pyr-eveil", label: "Éveil", count: "3 184 Bâtisseurs", you: !souverain, n: "Niveau 1" },
  ];
  return (
    <div className="content">
      <div className="content-inner">
        <PageHead title="Pyramide des Bâtisseurs" sub="L'ordre se gravit pierre après pierre. Chaque palier ouvre l'œuvre un peu plus." />

        <div className="card">
          <div className="card-body" style={{ padding: "44px 24px" }}>
            <div className="pyramid">
              {tiers.map((t, i) => (
                <div key={i} className={"pyr-tier " + t.cls + (t.you ? " you" : "")}>
                  {!t.plain && (
                    <>
                      <span className="mono" style={{ fontSize: 10, opacity: 0.7, letterSpacing: ".2em" }}>{t.n}</span>
                      <span className="lbl">{t.label}</span>
                      <span className="cnt">{t.count}</span>
                    </>
                  )}
                  {t.plain && <Icon name="gem" size={22} color="#fff" style={{ marginTop: 18 }} />}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* progression */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
          <div className="card">
            <div className="card-header"><div className="card-title">Ta progression</div><div className="card-desc">{souverain ? "Tu as atteint le palier Souverain." : "Encore une pierre avant le palier suivant."}</div></div>
            <div className="card-body" style={{ paddingTop: 16 }}>
              {[
                { t: "Serment prêté", done: true },
                { t: "Liminaire & Chapitre I lus", done: true },
                { t: "3 pierres taillées (journal)", done: true },
                { t: "Accès Souverain franchi", done: souverain },
                { t: "Premier filleul éveillé", done: false },
              ].map((s, i) => (
                <div className="feat" key={i} style={{ color: s.done ? "var(--foreground)" : "var(--muted-foreground)" }}>
                  <Icon name={s.done ? "check-circle-2" : "circle"} size={16} className="ic" color={s.done ? "var(--primary)" : "var(--muted-foreground)"} />
                  <span>{s.t}</span>
                </div>
              ))}
              {!souverain && (
                <button className="btn btn-gold btn-sm" style={{ marginTop: 14 }} onClick={() => onNavigate("checkout")}>
                  <Icon name="crown" size={15} />Franchir le palier Souverain
                </button>
              )}
            </div>
          </div>

          <div className="card">
            <div className="card-header"><div className="card-title">Privilèges par palier</div><div className="card-desc">Ce que chaque pierre débloque.</div></div>
            <div className="card-body" style={{ paddingTop: 16 }}>
              <div className="small" style={{ color: "oklch(0.42 0.12 152)", marginBottom: 8 }}>● Éveil</div>
              {["Liminaire + 2 chapitres", "Cercle Diaspora", "QR Impérial personnel"].map((f) => (
                <div className="feat" key={f}><Icon name="dot" size={16} className="ic" /><span>{f}</span></div>
              ))}
              <div className="seal-line" style={{ margin: "14px 0" }} />
              <div className="small" style={{ color: "var(--gold-deep)", marginBottom: 8 }}>♛ Souverain</div>
              {["Œuvre intégrale + Ateliers", "Messagerie chiffrée avec mentor", "Cercle des Souverains & rituels"].map((f) => (
                <div className="feat" key={f}><Icon name="dot" size={16} className="ic" color="var(--gold-deep)" /><span>{f}</span></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

window.Pyramid = Pyramid;
