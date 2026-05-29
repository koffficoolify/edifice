// ÉDIFICE — QR Impérial : accès hybride (scan ou clé textuelle)
const { useMemo: useMemoQr, useState: useStateQr } = React;

// Deterministic faux-QR matrix with finder patterns. Visual only.
function qrMatrix(seedStr, n = 25) {
  let h = 2166136261;
  for (let i = 0; i < seedStr.length; i++) { h ^= seedStr.charCodeAt(i); h = Math.imul(h, 16777619); }
  const rand = () => { h ^= h << 13; h ^= h >>> 17; h ^= h << 5; return ((h >>> 0) % 1000) / 1000; };
  const m = Array.from({ length: n }, () => Array(n).fill(0));
  const finder = (r, c) => {
    for (let i = -1; i <= 7; i++) for (let j = -1; j <= 7; j++) {
      const rr = r + i, cc = c + j;
      if (rr < 0 || cc < 0 || rr >= n || cc >= n) continue;
      const onRing = (i === 0 || i === 6) && j >= 0 && j <= 6 || (j === 0 || j === 6) && i >= 0 && i <= 6;
      const core = i >= 2 && i <= 4 && j >= 2 && j <= 4;
      m[rr][cc] = onRing || core ? 1 : 0;
      if (i === -1 || j === -1 || i === 7 || j === 7) m[rr][cc] = 0;
    }
  };
  for (let r = 0; r < n; r++) for (let c = 0; c < n; c++) m[r][c] = rand() > 0.52 ? 1 : 0;
  finder(0, 0); finder(0, n - 7); finder(n - 7, 0);
  // timing-ish lines
  for (let i = 8; i < n - 8; i++) { m[6][i] = i % 2 === 0 ? 1 : 0; m[i][6] = i % 2 === 0 ? 1 : 0; }
  return m;
}

function Access({ builder, onNavigate }) {
  const souverain = builder.tier === "souverain";
  const key = useMemoQr(() => {
    const seed = builder.id + builder.tier;
    let h = 5381; for (let i = 0; i < seed.length; i++) h = ((h << 5) + h + seed.charCodeAt(i)) >>> 0;
    const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
    const blk = () => Array.from({ length: 4 }, (_, i) => chars[(h = Math.imul(h ^ (i + 7), 2654435761) >>> 0) % chars.length]).join("");
    return `IMP-${blk()}-${blk()}-${blk()}`;
  }, [builder.id, builder.tier]);
  const matrix = useMemoQr(() => qrMatrix(key, 25), [key]);
  const [copied, setCopied] = useStateQr(false);

  const copy = () => {
    try { navigator.clipboard && navigator.clipboard.writeText(key); } catch (e) {}
    setCopied(true); setTimeout(() => setCopied(false), 1600);
  };

  return (
    <div className="content">
      <div className="content-inner">
        <PageHead title="QR Impérial" sub="Ta clé d'accès souveraine. Scanne le sceau, ou saisis la clé textuelle là où le réseau manque.">
          <button className="btn btn-outline btn-sm"><Icon name="rotate-cw" size={15} />Régénérer</button>
        </PageHead>

        <div className="card">
          <div className="card-body">
            <div className="qr-wrap">
              {/* QR sceau */}
              <div className="qr-frame">
                <span className="corner-mark" style={{ top: 10, left: 10, borderRight: 0, borderBottom: 0 }} />
                <span className="corner-mark" style={{ top: 10, right: 10, borderLeft: 0, borderBottom: 0 }} />
                <span className="corner-mark" style={{ bottom: 10, left: 10, borderRight: 0, borderTop: 0 }} />
                <span className="corner-mark" style={{ bottom: 10, right: 10, borderLeft: 0, borderTop: 0 }} />
                <div className="qr-canvas" style={{ gridTemplateColumns: `repeat(25,1fr)`, gridTemplateRows: `repeat(25,1fr)` }}>
                  {matrix.flatMap((row, r) => row.map((v, c) => (
                    <span key={r + "-" + c} style={{ background: v ? "var(--ink-deep)" : "transparent", borderRadius: 1 }} />
                  )))}
                </div>
                {/* center glyph */}
                <span style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", width: 40, height: 40, background: "#fff", borderRadius: 9, display: "flex", alignItems: "center", justifyContent: "center", border: "2px solid var(--gold-deep)" }}>
                  <EdificeGlyph size={22} color="var(--gold-deep)" />
                </span>
              </div>

              {/* details */}
              <div className="grow" style={{ minWidth: 280 }}>
                <span className={"badge " + (souverain ? "badge-gold" : "badge-eveil")}>
                  <Icon name={souverain ? "crown" : "sprout"} size={12} />Niveau {souverain ? "Souverain" : "Éveil"}
                </span>
                <div style={{ fontFamily: "var(--font-read)", fontSize: 22, fontWeight: 500, margin: "14px 0 4px" }}>{builder.name}</div>
                <div className="muted mono" style={{ fontSize: 12 }}>{builder.id} · {builder.city}</div>

                <div className="seal-line" style={{ margin: "20px 0" }} />

                <div className="small muted" style={{ marginBottom: 8 }}>Clé textuelle (accès hors-ligne)</div>
                <div className="between" style={{ background: "var(--muted)", border: "1px solid var(--border)", borderRadius: 11, padding: "12px 14px" }}>
                  <span className="qr-key">{key}</span>
                  <button className="btn btn-ghost btn-icon lg" onClick={copy} title="Copier">
                    <Icon name={copied ? "check" : "copy"} size={17} color={copied ? "var(--primary)" : undefined} />
                  </button>
                </div>
                <div className="muted" style={{ fontSize: 12, marginTop: 8 }}>
                  Valide jusqu'au 31 déc. 2026 · liée à ton empreinte · révocable à distance.
                </div>

                <div className="row" style={{ gap: 10, marginTop: 20 }}>
                  <button className="btn btn-default" onClick={() => onNavigate("reader")}><Icon name="book-open" size={16} />Ouvrir la liseuse</button>
                  <button className="btn btn-outline"><Icon name="share-2" size={15} />Présenter le sceau</button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* hybrid access explainer */}
        <div className="metrics" style={{ gridTemplateColumns: "repeat(3,1fr)" }}>
          {[
            { ic: "scan-line", t: "Scan du sceau", s: "Pointe l'appareil sur le QR : accès en flux immédiat." },
            { ic: "keyboard", t: "Clé textuelle", s: "Pas de réseau ? Saisis la clé IMP-•••• pour entrer." },
            { ic: "shield-check", t: "Anti-fraude", s: "Toute clé partagée est détectée et révoquée par l'IA." },
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

window.Access = Access;
