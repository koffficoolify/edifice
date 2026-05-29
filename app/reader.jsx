// ÉDIFICE — Liseuse sécurisée (streaming + filigrane dynamique)
const { useState: useStateRd, useRef: useRefRd, useEffect: useEffectRd } = React;

function Watermark({ builder }) {
  const stamp = new Date().toLocaleString("fr-FR", { day: "2-digit", month: "2-digit", year: "numeric", hour: "2-digit", minute: "2-digit" });
  const label = `BÂTISSEUR · ${builder.id} · ${builder.email} · ${stamp}`;
  const tiles = Array.from({ length: 60 });
  return (
    <div className="watermark" aria-hidden="true">
      {tiles.map((_, i) => <span className="wm-tile" key={i}>{label}</span>)}
    </div>
  );
}

function Reader({ builder, initial, onNavigate }) {
  const { CODEX } = window.EDIFICE_DATA;
  const souverain = builder.tier === "souverain";
  const startIx = initial && initial.chapter ? (initial.chapter - 1) : 1;
  const [ix, setIx] = useStateRd(Math.min(startIx, CODEX.chapters.length - 1));
  const [tocOpen, setTocOpen] = useStateRd(false);
  const [toast, setToast] = useStateRd(null);
  const [progress, setProgress] = useStateRd(0);
  const scrollRef = useRefRd(null);
  const chap = CODEX.chapters[ix];
  const locked = chap.tier === "souverain" && !souverain;

  const flash = (msg) => {
    setToast(msg);
    clearTimeout(window.__rt);
    window.__rt = setTimeout(() => setToast(null), 2200);
  };

  useEffectRd(() => {
    const el = scrollRef.current;
    if (!el) return;
    el.scrollTop = 0;
    const onScroll = () => {
      const max = el.scrollHeight - el.clientHeight;
      setProgress(max > 0 ? Math.round((el.scrollTop / max) * 100) : 100);
    };
    el.addEventListener("scroll", onScroll);
    onScroll();
    return () => el.removeEventListener("scroll", onScroll);
  }, [ix]);

  const block = (e) => { e.preventDefault(); flash("Action interdite — lecture en flux protégée."); };

  const go = (n) => { if (n >= 0 && n < CODEX.chapters.length) { setIx(n); setTocOpen(false); } };

  return (
    <div className="reader-shell" onContextMenu={block} onCopy={block} onCut={block} onDragStart={block}>
      {/* Top bar */}
      <div className="reader-bar">
        <button className="btn btn-ghost btn-icon" onClick={() => setTocOpen((o) => !o)} title="Sommaire">
          <Icon name="list" size={18} />
        </button>
        <span className="sep" />
        <div style={{ minWidth: 0 }}>
          <div style={{ fontWeight: 600, fontSize: 14, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{CODEX.title}</div>
          <div className="muted mono" style={{ fontSize: 11 }}>{CODEX.author} · {CODEX.edition}</div>
        </div>
        <span className="spacer" />
        <span className="badge badge-secondary" title="Aucun fichier téléchargé"><Icon name="wifi" size={12} />Flux sécurisé</span>
        <span className="badge badge-outline" title="Filigrane actif"><Icon name="fingerprint" size={12} />{builder.id}</span>
        <button className="btn btn-ghost btn-icon" title="Téléchargement désactivé" onClick={() => flash("Téléchargement désactivé sur cet ouvrage.")}>
          <Icon name="download" size={17} />
        </button>
        <button className="btn btn-outline btn-sm" onClick={() => onNavigate("library")}>
          <Icon name="x" size={15} />Fermer
        </button>
      </div>

      {/* TOC drawer */}
      <div className={"toc" + (tocOpen ? " open" : "")}>
        <div className="between" style={{ marginBottom: 12 }}>
          <span className="section-label">Sommaire</span>
          <button className="btn btn-ghost btn-icon" onClick={() => setTocOpen(false)}><Icon name="x" size={16} /></button>
        </div>
        {CODEX.chapters.map((c, i) => {
          const lk = c.tier === "souverain" && !souverain;
          return (
            <div key={i} className={"toc-item" + (i === ix ? " active" : "") + (lk ? " locked" : "")} onClick={() => go(i)}>
              <span className="ix">{String(i + 1).padStart(2, "0")}</span>
              <div style={{ minWidth: 0 }}>
                <div style={{ fontFamily: "var(--font-read)", fontSize: 15, fontWeight: 500 }}>{c.title}</div>
                <div className="muted" style={{ fontSize: 11.5, marginTop: 2 }}>{c.no}{lk && " · Souverain"}</div>
              </div>
              {lk && <Icon name="lock" size={13} className="muted" style={{ marginLeft: "auto", alignSelf: "center" }} />}
            </div>
          );
        })}
      </div>

      {/* Scroll body */}
      <div className="reader-scroll no-select" ref={scrollRef}>
        {!locked && <Watermark builder={builder} />}
        <div className="reader-page">
          {locked ? (
            <div style={{ textAlign: "center", padding: "80px 0" }}>
              <span className="icon-tile" style={{ background: "var(--gold-soft)", color: "var(--gold-deep)", width: 56, height: 56, margin: "0 auto 20px", borderRadius: 14 }}>
                <Icon name="lock" size={24} />
              </span>
              <div className="prose">
                <div className="chap-no">{chap.no}</div>
                <h1 style={{ fontSize: 28 }}>{chap.title}</h1>
              </div>
              <p className="muted" style={{ maxWidth: 380, margin: "12px auto 24px", fontSize: 15 }}>
                Ce chapitre est gravé pour les Bâtisseurs de niveau <strong style={{ color: "var(--gold-deep)" }}>Souverain</strong>.
                Franchis le palier pour poursuivre l'ascension.
              </p>
              <button className="btn btn-gold" onClick={() => onNavigate("checkout")}>
                <Icon name="crown" size={16} />Devenir Souverain
              </button>
            </div>
          ) : (
            <div className="prose">
              <div className="chap-no">{chap.no}</div>
              <h1>{chap.title}</h1>
              <p className="lede">{chap.lede}</p>
              {chap.paras.map((p, i) => (
                <p key={i} className={i === 0 ? "drop" : ""}>{p}</p>
              ))}
              <blockquote>« On ne devient pas Bâtisseur en accumulant des mots, mais en posant chaque jour une pierre que l'on a soi-même taillée. »</blockquote>
              <div className="seal-line" style={{ margin: "40px auto", maxWidth: 120 }} />
              <div className="center muted" style={{ fontSize: 12 }}>Fin du {chap.no}</div>
            </div>
          )}
        </div>
      </div>

      {/* Foot */}
      <div className="reader-foot">
        <button className="btn btn-ghost btn-sm" disabled={ix === 0} onClick={() => go(ix - 1)}>
          <Icon name="arrow-left" size={15} />Précédent
        </button>
        <div className="row" style={{ gap: 12, flex: 1, justifyContent: "center", maxWidth: 420 }}>
          <span className="mono" style={{ fontSize: 11 }}>{String(ix + 1).padStart(2, "0")}/{String(CODEX.chapters.length).padStart(2, "0")}</span>
          <div className="progress-track"><div className="progress-fill" style={{ width: progress + "%" }} /></div>
          <span className="mono" style={{ fontSize: 11 }}>{progress}%</span>
        </div>
        <button className="btn btn-ghost btn-sm" disabled={ix === CODEX.chapters.length - 1} onClick={() => go(ix + 1)}>
          Suivant<Icon name="arrow-right" size={15} />
        </button>
      </div>

      {/* Toast */}
      {toast && (
        <div style={{ position: "absolute", bottom: 64, left: "50%", transform: "translateX(-50%)", zIndex: 8,
          background: "var(--ink-deep)", color: "#fff", padding: "10px 16px", borderRadius: 10, fontSize: 13,
          display: "flex", alignItems: "center", gap: 8, boxShadow: "var(--shadow-lg)", animation: "fade .15s ease" }}>
          <Icon name="shield-alert" size={15} color="var(--gold)" />{toast}
        </div>
      )}
    </div>
  );
}

window.Reader = Reader;
