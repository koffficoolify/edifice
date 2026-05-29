// ÉDIFICE — app shell: glyph, sidebar, header
const { useState: useStateS } = React;

// Brand glyph — a pyramid built from stacked tiers (the "édifice" mark)
function EdificeGlyph({ size = 20, color = "currentColor" }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill={color} stroke="none">
      <path d="M12 3.2 L15.4 8.2 H8.6 Z" />
      <path d="M8.1 9 H15.9 L18.3 12.6 H5.7 Z" opacity="0.78" />
      <path d="M5.2 13.4 H18.8 L21.3 17.2 H2.7 Z" opacity="0.55" />
    </svg>
  );
}

const NAV = [
  { group: "Le Codex", items: [
    { id: "library", label: "Bibliothèque", icon: "library-big" },
    { id: "reader", label: "Liseuse sécurisée", icon: "book-open" },
    { id: "access", label: "QR Impérial", icon: "qr-code" },
  ]},
  { group: "L'Ordre", items: [
    { id: "pyramid", label: "Pyramide des Bâtisseurs", icon: "triangle" },
    { id: "messages", label: "Messagerie", icon: "messages-square", count: "2" },
  ]},
  { group: "Intendance", items: [
    { id: "checkout", label: "Devenir Souverain", icon: "crown" },
    { id: "admin", label: "Monitoring", icon: "radar" },
  ]},
];

function Shell({ active, onNavigate, builder, children }) {
  const tierGold = builder.tier === "souverain";
  return (
    <div className="app">
      <aside className="sidebar">
        <div className="sb-head">
          <div className="sb-brand">
            <span className="sb-logo"><EdificeGlyph size={18} color="var(--primary-foreground)" /></span>
            <div>
              <div className="name">ÉDIFICE</div>
              <div className="sub">Lecture souveraine</div>
            </div>
            <Icon name="chevrons-up-down" size={15} className="chev" />
          </div>
        </div>
        <div className="sb-body">
          {NAV.map((g) => (
            <div className="sb-group" key={g.group}>
              <div className="sb-grouplabel">{g.group}</div>
              {g.items.map((it) => (
                <button key={it.id} className={"sb-item" + (active === it.id ? " active" : "")} onClick={() => onNavigate(it.id)}>
                  <Icon name={it.icon} size={16} />
                  <span>{it.label}</span>
                  {it.count && <span className="count">{it.count}</span>}
                </button>
              ))}
            </div>
          ))}
        </div>
        <div className="sb-foot">
          <Menu align="left" trigger={
            <div className="sb-user">
              <Avatar initials={builder.initials} round />
              <div style={{ minWidth: 0 }}>
                <div className="name">{builder.name}</div>
                <div className="mail mono" style={{ fontSize: 11 }}>{builder.id}</div>
              </div>
              <Icon name="chevrons-up-down" size={15} className="chev" />
            </div>
          }>
            <button><Icon name="user" />Mon profil</button>
            <button><Icon name="shield" />Sécurité</button>
            <button><Icon name="bell" />Notifications</button>
            <div className="sep" />
            <button className="danger"><Icon name="log-out" />Quitter la session</button>
          </Menu>
        </div>
      </aside>

      <div className="main">
        <header className="appbar">
          <Icon name="panel-left" size={18} className="muted" />
          <span className="sep" />
          <span className="title">{TITLES[active] || "ÉDIFICE"}</span>
          <span className="spacer" />
          <div className="searchbox">
            <Icon name="search" />
            <input placeholder="Rechercher dans le Codex…" />
          </div>
          <span className={"badge " + (tierGold ? "badge-gold" : "badge-eveil")}>
            <Icon name={tierGold ? "crown" : "sprout"} size={12} />
            {tierGold ? "Souverain" : "Éveil"}
          </span>
          <Avatar initials={builder.initials} round />
        </header>
        {children}
      </div>
    </div>
  );
}

const TITLES = {
  library: "Bibliothèque",
  reader: "Liseuse sécurisée",
  access: "QR Impérial",
  pyramid: "Pyramide des Bâtisseurs",
  messages: "Messagerie chiffrée",
  checkout: "Devenir Souverain",
  admin: "Monitoring & Sécurité",
};

function PageHead({ title, sub, children }) {
  return (
    <div className="between" style={{ alignItems: "flex-start", flexWrap: "wrap", gap: 12 }}>
      <div className="page-head">
        <div className="page-title">{title}</div>
        {sub && <div className="page-sub">{sub}</div>}
      </div>
      {children && <div className="row" style={{ gap: 8 }}>{children}</div>}
    </div>
  );
}

Object.assign(window, { EdificeGlyph, Shell, PageHead });
