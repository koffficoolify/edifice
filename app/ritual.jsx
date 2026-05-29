// ÉDIFICE — Rituel d'entrée : Serment du Bâtisseur
const { useState: useStateR, useRef: useRefR, useEffect: useEffectR } = React;

function FingerprintGlyph() {
  return (
    <svg className="fp-print" viewBox="0 0 64 80" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round">
      <path d="M32 6C18 6 10 17 10 30c0 6 1 10 1 14"/>
      <path d="M32 13c-11 0-16 9-16 18 0 8 0 13-2 20"/>
      <path d="M32 21c-7 0-9 6-9 12 0 9-1 15-4 22"/>
      <path d="M32 29c-3 0-3 4-3 8 0 11-2 18-5 26"/>
      <path d="M32 13c11 0 17 9 17 19 0 7 0 12 2 19"/>
      <path d="M32 21c7 0 10 5 10 12 0 9 1 16 4 23"/>
      <path d="M32 29c3 0 4 4 4 9 0 10 1 17 4 25"/>
      <path d="M32 37c0 12 0 20 0 36"/>
    </svg>
  );
}

function Ritual({ onComplete }) {
  const [name, setName] = useStateR("");
  const [scanState, setScanState] = useStateR("idle"); // idle | scanning | done
  const [fill, setFill] = useStateR(0);
  const holdRef = useRefR(null);
  const agreed = scanState === "done" && name.trim().length > 1;

  const startScan = () => {
    if (scanState === "done" || name.trim().length < 2) return;
    setScanState("scanning");
    let v = 0;
    holdRef.current = setInterval(() => {
      v += 4;
      setFill(v);
      if (v >= 100) {
        clearInterval(holdRef.current);
        setScanState("done");
      }
    }, 28);
  };
  const cancelScan = () => {
    if (scanState === "done") return;
    clearInterval(holdRef.current);
    setScanState("idle");
    setFill(0);
  };
  useEffectR(() => () => clearInterval(holdRef.current), []);

  const clauses = [
    "Je reprends la souveraineté de mon attention et de mon temps.",
    "Je taille une pierre chaque jour, sans attendre l'applaudissement.",
    "Je garde ce qui m'est confié et ne le livre à aucun pillard.",
    "Je transmets aux suivants ce que les anciens m'ont laissé.",
  ];

  return (
    <div className="ritual">
      {/* Aside — manifesto */}
      <div className="ritual-aside">
        <div className="ritual-mark">
          <span className="glyph"><EdificeGlyph size={20} /></span>
          <span className="wm">ÉDIFICE</span>
        </div>
        <div>
          <div className="eyebrow" style={{ marginBottom: 18 }}>Le Serment du Bâtisseur</div>
          <h1 className="oath-display" style={{ fontSize: 40, color: "oklch(0.96 0.01 80)", margin: "0 0 22px" }}>
            On n'entre pas ici<br/>en lecteur.<br/>
            <span style={{ color: "var(--gold)" }}>On entre en Bâtisseur.</span>
          </h1>
          <p className="oath-text" style={{ maxWidth: 420 }}>
            Avant d'ouvrir le Codex, chaque membre prête serment et y appose son empreinte.
            Ce geste lie ton identifiant à chaque page que tu liras — <em>ce qui est confié se respecte.</em>
          </p>
        </div>
        <div className="row" style={{ gap: 10, color: "oklch(0.6 0.01 80)", fontSize: 12 }}>
          <Icon name="shield-check" size={14} color="var(--gold)" />
          <span>Accès chiffré · filigrane nominatif · lecture en flux</span>
        </div>
      </div>

      {/* Main — the rite */}
      <div className="ritual-main">
        <div className="ritual-card">
          <div className="darkcard" style={{ padding: 32 }}>
            <div className="between" style={{ marginBottom: 8 }}>
              <span className="eyebrow">Rituel d'entrée</span>
              <span className="mono" style={{ fontSize: 11, color: "oklch(0.6 0.01 80)" }}>Niveau Éveil · gratuit</span>
            </div>

            {/* clauses */}
            <div style={{ margin: "12px 0 4px" }}>
              {clauses.map((c, i) => (
                <div className="oath-clause" key={i}>
                  <span className="n">{String(i + 1).padStart(2, "0")}</span>
                  <span className="t">{c}</span>
                </div>
              ))}
            </div>

            {/* signature + fingerprint */}
            <div className="row" style={{ gap: 26, alignItems: "flex-end", marginTop: 26 }}>
              <div className="grow">
                <label className="dark-label">Nom du Bâtisseur</label>
                <input
                  className="dark-input"
                  placeholder="Inscris ton nom"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  maxLength={40}
                />
                <div className="sign-line" style={{ marginTop: 14 }}>
                  <span className="sign-name">{name || " "}</span>
                </div>
                <div className="muted" style={{ fontSize: 11, marginTop: 8, color: "oklch(0.58 0.01 80)" }}>
                  Maintiens ton doigt sur le capteur pour sceller le serment →
                </div>
              </div>

              <div
                className={"fp-pad " + scanState}
                onMouseDown={startScan}
                onMouseUp={cancelScan}
                onMouseLeave={cancelScan}
                onTouchStart={(e) => { e.preventDefault(); startScan(); }}
                onTouchEnd={cancelScan}
                role="button"
                aria-label="Apposer l'empreinte"
              >
                <FingerprintGlyph />
                <div className="fp-fill" style={{ height: fill + "%" }} />
                {scanState === "scanning" && <div className="fp-line" style={{ bottom: fill + "%" }} />}
                {scanState === "done" && (
                  <span style={{ position: "absolute", bottom: 8, fontSize: 10, color: "var(--primary)", fontFamily: "var(--font-mono)", letterSpacing: ".1em" }}>
                    SCELLÉ
                  </span>
                )}
              </div>
            </div>

            <div className="seal-line" style={{ margin: "26px 0 20px" }} />

            <button
              className="btn btn-gold"
              style={{ width: "100%", height: 46, fontSize: 15, opacity: agreed ? 1 : 0.45, cursor: agreed ? "pointer" : "not-allowed" }}
              disabled={!agreed}
              onClick={() => agreed && onComplete(name.trim())}
            >
              <Icon name="feather" size={16} />
              Prêter serment et entrer
            </button>
            <button
              type="button"
              className="btn btn-ghost"
              style={{ width: "100%", marginTop: 10, height: 40, fontSize: 13, color: "oklch(0.62 0.01 80)" }}
              onClick={() => onComplete(name.trim() || window.EDIFICE_DATA.BUILDER.name)}
            >
              <Icon name="play" size={15} />
              Mode démo — entrer sans signature
            </button>
            <div className="center muted" style={{ fontSize: 11, marginTop: 12, color: "oklch(0.56 0.01 80)" }}>
              En entrant, tu acceptes le Code du Bâtisseur. Empreinte conservée localement, jamais revendue.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

window.Ritual = Ritual;
