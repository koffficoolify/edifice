// ÉDIFICE — Monitoring & détection de fraude (admin)
const { useState: useStateAd, useEffect: useEffectAd } = React;

const RISK = {
  ok:   { dot: "var(--primary)", label: "Normal", badge: "badge-secondary" },
  med:  { dot: "var(--brand-amber)", label: "À surveiller", badge: "badge-gold" },
  high: { dot: "var(--destructive)", label: "Fraude probable", badge: "" },
};

function Admin() {
  const { ACCESS_LOG } = window.EDIFICE_DATA;
  const [bars, setBars] = useStateAd([42, 55, 38, 61, 72, 49, 83, 67, 91, 78, 64, 88]);

  useEffectAd(() => {
    const id = setInterval(() => {
      setBars((b) => b.map((v) => Math.max(20, Math.min(100, v + (Math.random() * 16 - 8)))));
    }, 1600);
    return () => clearInterval(id);
  }, []);

  const metrics = [
    { ic: "users-round", desc: "Bâtisseurs actifs", value: "1 248", delta: "+12,5 %", up: true, sub: "sessions en flux à l'instant" },
    { ic: "book-open-check", desc: "Lectures aujourd'hui", value: "8 412", delta: "+6,1 %", up: true, sub: "pages servies en streaming" },
    { ic: "shield-alert", desc: "Alertes fraude", value: "3", delta: "2 critiques", up: false, sub: "détectées par l'IA · 24 h" },
    { ic: "crown", desc: "Conversions Souverain", value: "37", delta: "+18 %", up: true, sub: "via Wave / OM / TapTap" },
  ];

  return (
    <div className="content">
      <div className="content-inner">
        <PageHead title="Monitoring & Sécurité" sub="Surveillance des accès en flux et détection de fraude par l'IA · temps réel.">
          <span className="badge badge-secondary"><span className="live-dot" />En direct</span>
          <button className="btn btn-outline btn-sm"><Icon name="download" size={15} />Exporter le rapport</button>
        </PageHead>

        <div className="metrics">
          {metrics.map((m) => (
            <div className="card metric" key={m.desc}>
              <div className="card-body">
                <div className="row" style={{ gap: 10, marginBottom: 2 }}>
                  <span className="icon-tile tile-muted" style={{ width: 30, height: 30 }}><Icon name={m.ic} size={15} /></span>
                  <span className="desc">{m.desc}</span>
                </div>
                <div className="value">{m.value}</div>
                <div className="foot">
                  <span className={"badge " + (m.up ? "badge-secondary" : "")} style={!m.up ? { background: "color-mix(in oklch,var(--destructive) 12%,#fff)", color: "var(--destructive)" } : {}}>
                    <Icon name={m.up ? "trending-up" : "alert-triangle"} size={12} />{m.delta}
                  </span>
                  <div className="sub">{m.sub}</div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 340px", gap: 20 }}>
          <div className="card">
            <div className="card-body">
              <div className="tablecard-head">
                <div>
                  <div className="card-title">Journal des accès</div>
                  <div className="card-desc">Chaque lecture porte le filigrane nominatif du Bâtisseur.</div>
                </div>
                <div className="tabs">
                  <button className="tab active">Tous</button>
                  <button className="tab">Suspects</button>
                </div>
              </div>
              <table className="tbl">
                <thead>
                  <tr>
                    <th>Bâtisseur</th><th>Action</th><th>Accès</th><th>Localisation</th><th>Risque</th><th></th>
                  </tr>
                </thead>
                <tbody>
                  {ACCESS_LOG.map((r, i) => {
                    const rk = RISK[r.risk];
                    return (
                      <tr key={i}>
                        <td>
                          <div className="reviewer">
                            <Avatar initials={r.who === "Inconnu" ? "?" : r.who.split(" ").map((x) => x[0]).join("").slice(0, 2)} round size={28} />
                            <div style={{ minWidth: 0 }}>
                              <div style={{ fontWeight: 500 }}>{r.who}</div>
                              <div className="muted mono" style={{ fontSize: 11 }}>{r.id}</div>
                            </div>
                          </div>
                        </td>
                        <td><div>{r.action}</div><div className="muted" style={{ fontSize: 11.5 }}>{r.device}</div></td>
                        <td><span className="muted">{r.method}</span></td>
                        <td><span className="muted">{r.loc}</span></td>
                        <td>
                          <span className="status">
                            <span className="dot" style={{ background: rk.dot }} />
                            <span className={r.risk === "high" ? "" : "muted"} style={r.risk === "high" ? { color: "var(--destructive)", fontWeight: 500 } : {}}>{rk.label}</span>
                          </span>
                        </td>
                        <td className="num"><span className="muted mono" style={{ fontSize: 11 }}>{r.time}</span></td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>

          <div className="stack" style={{ gap: 20 }}>
            <div className="card">
              <div className="card-header"><div className="card-title">Lectures en flux</div><div className="card-desc">Pages servies · 12 dernières heures</div></div>
              <div className="card-body" style={{ paddingTop: 16 }}>
                <div className="bars">
                  {bars.map((h, i) => <div key={i} className={"bar" + (i === bars.length - 1 ? " alt" : "")} style={{ height: h + "%" }} />)}
                </div>
                <div className="row" style={{ justifyContent: "space-between", marginTop: 8 }}>
                  <span className="muted mono" style={{ fontSize: 10.5 }}>08h</span>
                  <span className="muted mono" style={{ fontSize: 10.5 }}>maintenant</span>
                </div>
              </div>
            </div>

            <div className="card">
              <div className="card-header"><div className="card-title">Détection IA</div><div className="card-desc">Signaux anti-piratage</div></div>
              <div className="card-body" style={{ paddingTop: 14, display: "flex", flexDirection: "column", gap: 12 }}>
                {[
                  { ic: "camera", t: "Capture d'écran tentée", s: "BTS-…1190 · Paris · bloquée", risk: "high" },
                  { ic: "map-pin", t: "2 sessions, 2 pays", s: "BTS-…0847 · Dakar + Bruxelles", risk: "med" },
                  { ic: "key-round", t: "Clé partagée détectée", s: "IMP-7K2X · 4 appareils · révoquée", risk: "high" },
                ].map((a, i) => (
                  <div className="fraud-row row" key={i} style={{ gap: 11, alignItems: "flex-start" }}>
                    <span className="icon-tile" style={{ width: 32, height: 32, background: a.risk === "high" ? "color-mix(in oklch,var(--destructive) 12%,#fff)" : "var(--gold-soft)", color: a.risk === "high" ? "var(--destructive)" : "var(--gold-deep)" }}>
                      <Icon name={a.ic} size={15} />
                    </span>
                    <div className="grow">
                      <div style={{ fontWeight: 500, fontSize: 13.5 }}>{a.t}</div>
                      <div className="muted mono" style={{ fontSize: 11, marginTop: 2 }}>{a.s}</div>
                    </div>
                    <Icon name="chevron-right" size={15} className="muted" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

window.Admin = Admin;
