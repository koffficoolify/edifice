// ÉDIFICE — Tunnel de vente / paiement
const { useState: useStateCk } = React;

const TIERS = [
  { id: "eveil", name: "Éveil", price: "Gratuit", per: "", gold: false, icon: "sprout",
    tagline: "Le seuil. Pose ta première pierre.",
    feats: ["Liminaire + 2 premiers chapitres", "Filigrane nominatif & lecture en flux", "Accès au cercle Diaspora", "QR Impérial personnel"],
    locked: ["Chapitres Souverains", "Messagerie chiffrée avec mentor", "Ateliers des Anciens"] },
  { id: "souverain", name: "Souverain", price: "9 000", per: "FCFA / accès à vie", gold: true, icon: "crown",
    tagline: "L'œuvre entière. Bâtis pour les générations.",
    feats: ["Le Codex intégral + Lois de la Souveraineté", "L'Atelier des Anciens (12 chapitres)", "Messagerie chiffrée avec ton mentor", "Cercle des Souverains & rituels", "Badge & sceau Souverain"],
    locked: [] },
];

const METHODS = [
  { id: "wave", name: "Wave", sub: "Mobile Money · instantané", color: "#1DC8F2", abbr: "W" },
  { id: "orange", name: "Orange Money", sub: "Mobile Money · Afrique de l'Ouest", color: "#FF7900", abbr: "OM" },
  { id: "taptap", name: "TapTap Send", sub: "Diaspora → Continent", color: "#16B47F", abbr: "TT" },
];

function Checkout({ builder, onUpgrade, onNavigate }) {
  const already = builder.tier === "souverain";
  const [tier, setTier] = useStateCk("souverain");
  const [method, setMethod] = useStateCk("wave");
  const [phone, setPhone] = useStateCk("");
  const [stage, setStage] = useStateCk(already ? "done" : "idle"); // idle | processing | done
  const sel = TIERS.find((t) => t.id === tier);
  const free = tier === "eveil";

  const pay = () => {
    if (free) { onNavigate("library"); return; }
    setStage("processing");
    setTimeout(() => { setStage("done"); onUpgrade(); }, 1900);
  };

  return (
    <div className="content">
      <div className="content-inner">
        <PageHead title="Devenir Souverain" sub="Choisis ton palier et débloque l'œuvre entière. Paiement Mobile Money & Diaspora." />

        {stage === "done" ? (
          <div className="card" style={{ maxWidth: 560, margin: "8px auto", textAlign: "center" }}>
            <div className="card-body" style={{ padding: "44px 32px" }}>
              <span className="icon-tile" style={{ background: "var(--gold-soft)", color: "var(--gold-deep)", width: 60, height: 60, margin: "0 auto 20px", borderRadius: 16 }}>
                <Icon name="crown" size={28} />
              </span>
              <div style={{ fontFamily: "var(--font-read)", fontSize: 26, fontWeight: 500 }}>Tu es désormais Souverain.</div>
              <p className="muted" style={{ maxWidth: 380, margin: "10px auto 22px", fontSize: 14.5 }}>
                L'œuvre entière t'est ouverte. Ton QR Impérial a été régénéré avec ton nouveau palier.
              </p>
              <div className="seal-line" style={{ margin: "0 auto 22px", maxWidth: 140 }} />
              <div className="row" style={{ gap: 10, justifyContent: "center" }}>
                <button className="btn btn-gold" onClick={() => onNavigate("reader")}><Icon name="book-open" size={16} />Lire les chapitres Souverains</button>
                <button className="btn btn-outline" onClick={() => onNavigate("access")}><Icon name="qr-code" size={16} />Voir mon QR Impérial</button>
              </div>
            </div>
          </div>
        ) : (
          <div className="checkout-grid">
            {/* LEFT */}
            <div className="stack" style={{ gap: 24 }}>
              {/* tiers */}
              <div>
                <div className="section-label" style={{ marginBottom: 12 }}>1 · Choisis ton palier</div>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
                  {TIERS.map((t) => (
                    <div key={t.id} className={"tier-card" + (tier === t.id ? " sel" : "") + (t.gold ? " gold" : "")} onClick={() => setTier(t.id)}>
                      {t.gold && <span className="badge badge-gold" style={{ position: "absolute", top: 16, right: 16 }}>Recommandé</span>}
                      <span className={"icon-tile " + (t.gold ? "" : "tile-muted")} style={t.gold ? { background: "var(--gold-soft)", color: "var(--gold-deep)" } : {}}><Icon name={t.icon} size={18} /></span>
                      <div style={{ fontFamily: "var(--font-read)", fontSize: 21, fontWeight: 500, marginTop: 14 }}>{t.name}</div>
                      <div className="muted" style={{ fontSize: 13, minHeight: 36, marginTop: 2 }}>{t.tagline}</div>
                      <div className="row" style={{ gap: 6, alignItems: "baseline", margin: "10px 0 16px" }}>
                        <span className="tier-price">{t.price}</span>
                        <span className="muted" style={{ fontSize: 12 }}>{t.per}</span>
                      </div>
                      <div className="seal-line" style={{ marginBottom: 14 }} />
                      {t.feats.map((f) => (
                        <div className="feat" key={f}><Icon name="check" size={15} className="ic" /><span>{f}</span></div>
                      ))}
                      {t.locked.map((f) => (
                        <div className="feat muted-feat" key={f} style={{ color: "var(--muted-foreground)" }}><Icon name="lock" size={14} className="ic" /><span>{f}</span></div>
                      ))}
                    </div>
                  ))}
                </div>
              </div>

              {/* methods */}
              {!free && (
                <div>
                  <div className="section-label" style={{ marginBottom: 12 }}>2 · Mode de paiement</div>
                  <div className="stack" style={{ gap: 10 }}>
                    {METHODS.map((m) => (
                      <div key={m.id} className={"pay-method" + (method === m.id ? " sel" : "")} onClick={() => setMethod(m.id)}>
                        <span className="pay-logo" style={{ background: m.color }}>{m.abbr}</span>
                        <div className="grow">
                          <div style={{ fontWeight: 600 }}>{m.name}</div>
                          <div className="muted" style={{ fontSize: 12.5 }}>{m.sub}</div>
                        </div>
                        <span className="checkbox" style={{ borderRadius: "50%", background: method === m.id ? "var(--primary)" : "var(--background)", borderColor: method === m.id ? "var(--primary)" : "var(--input)" }}>
                          {method === m.id && <span style={{ width: 8, height: 8, borderRadius: "50%", background: "#fff" }} />}
                        </span>
                      </div>
                    ))}
                    <div style={{ marginTop: 4 }}>
                      <label className="small" style={{ display: "block", marginBottom: 8 }}>Numéro {METHODS.find((m) => m.id === method).name}</label>
                      <div className="searchbox" style={{ width: "100%" }}>
                        <Icon name="phone" />
                        <input style={{ width: "100%" }} placeholder="+221 77 000 00 00" value={phone} onChange={(e) => setPhone(e.target.value)} />
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* RIGHT — summary */}
            <div className="card" style={{ position: "sticky", top: 0 }}>
              <div className="card-body">
                <div style={{ fontWeight: 600, fontSize: 15, marginBottom: 4 }}>Récapitulatif</div>
                <div className="muted" style={{ fontSize: 13, marginBottom: 16 }}>Accès {sel.name} · {builder.id}</div>

                <div className="between" style={{ padding: "10px 0" }}>
                  <span>Accès {sel.name}</span>
                  <span className="mono">{free ? "0" : sel.price} {free ? "" : "F"}</span>
                </div>
                {!free && (
                  <div className="between" style={{ padding: "10px 0" }}>
                    <span className="muted">Frais {METHODS.find((m) => m.id === method).name}</span>
                    <span className="mono muted">0 F</span>
                  </div>
                )}
                <div className="seal-line" style={{ margin: "8px 0 14px" }} />
                <div className="between" style={{ marginBottom: 18 }}>
                  <span style={{ fontWeight: 600 }}>Total</span>
                  <span className="tier-price" style={{ fontSize: 24 }}>{free ? "Gratuit" : sel.price + " F"}</span>
                </div>

                {/* one-click */}
                {!free && (
                  <div className="oneclick" style={{ marginBottom: 14 }}>
                    <div className="row" style={{ gap: 8, marginBottom: 4 }}>
                      <Icon name="zap" size={15} color="var(--gold-deep)" />
                      <span style={{ fontWeight: 600, color: "var(--gold-deep)" }}>Achat One-Click</span>
                    </div>
                    <div style={{ fontSize: 12.5, color: "var(--gold-deep)" }}>
                      Numéro {METHODS.find((m) => m.id === method).name} mémorisé. Un seul geste valide l'accès.
                    </div>
                  </div>
                )}

                <button className={"btn " + (free ? "btn-default" : "btn-gold")} style={{ width: "100%", height: 46, fontSize: 15 }} disabled={stage === "processing"} onClick={pay}>
                  {stage === "processing" ? (
                    <><Icon name="loader" size={16} />Validation {METHODS.find((m) => m.id === method).name}…</>
                  ) : free ? (
                    <><Icon name="arrow-right" size={16} />Continuer avec Éveil</>
                  ) : (
                    <><Icon name="zap" size={16} />Payer en One-Click</>
                  )}
                </button>
                <div className="center muted" style={{ fontSize: 11, marginTop: 12, display: "flex", gap: 6, justifyContent: "center" }}>
                  <Icon name="lock" size={12} />Transaction chiffrée · accès délivré instantanément
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

window.Checkout = Checkout;
