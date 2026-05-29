// ÉDIFICE — Messagerie interne chiffrée
const { useState: useStateMs, useRef: useRefMs, useEffect: useEffectMs } = React;

function Messaging({ builder, onNavigate }) {
  const { CONVERSATIONS, THREAD } = window.EDIFICE_DATA;
  const souverain = builder.tier === "souverain";
  const [activeId, setActiveId] = useStateMs("c3");
  const [msgs, setMsgs] = useStateMs(THREAD);
  const [draft, setDraft] = useStateMs("");
  const scrollRef = useRefMs(null);
  const conv = CONVERSATIONS.find((c) => c.id === activeId);

  useEffectMs(() => { const el = scrollRef.current; if (el) el.scrollTop = el.scrollHeight; }, [msgs, activeId]);

  const send = () => {
    if (!draft.trim()) return;
    const now = new Date().toLocaleTimeString("fr-FR", { hour: "2-digit", minute: "2-digit" });
    setMsgs((m) => [...m, { side: "out", text: draft.trim(), t: now }]);
    setDraft("");
    setTimeout(() => {
      setMsgs((m) => [...m, { side: "in", who: conv.name, text: "Bien reçu, Bâtisseur. Tiens ta parole. 🔨", t: now }]);
    }, 1100);
  };

  if (!souverain) {
    return (
      <div className="content">
        <div className="content-inner">
          <PageHead title="Messagerie chiffrée" sub="Échange chiffré de bout en bout avec ton mentor et les cercles." />
          <div className="card" style={{ maxWidth: 520, margin: "20px auto", textAlign: "center", position: "relative", overflow: "hidden" }}>
            <div className="card-body" style={{ padding: "48px 32px" }}>
              <span className="icon-tile" style={{ background: "var(--gold-soft)", color: "var(--gold-deep)", width: 56, height: 56, margin: "0 auto 18px", borderRadius: 14 }}>
                <Icon name="lock" size={24} />
              </span>
              <div style={{ fontFamily: "var(--font-read)", fontSize: 23, fontWeight: 500 }}>Un privilège Souverain</div>
              <p className="muted" style={{ maxWidth: 360, margin: "10px auto 22px", fontSize: 14.5 }}>
                La messagerie chiffrée relie chaque Souverain à son mentor et au Cercle. Franchis le palier pour ouvrir le canal.
              </p>
              <button className="btn btn-gold" onClick={() => onNavigate("checkout")}><Icon name="crown" size={16} />Devenir Souverain</button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="content" style={{ padding: 24, height: "100%" }}>
      <div className="content-inner" style={{ maxWidth: 1180, height: "100%", flex: 1 }}>
        <div className="msg-layout" style={{ height: "100%" }}>
          {/* list */}
          <div className="msg-list">
            <div style={{ padding: "14px 14px 10px" }}>
              <div className="between"><span className="section-label">Conversations</span><Icon name="pen-square" size={16} className="muted" /></div>
            </div>
            {CONVERSATIONS.map((c) => (
              <div key={c.id} className={"msg-conv" + (activeId === c.id ? " active" : "")} onClick={() => { setActiveId(c.id); }}>
                <Avatar initials={c.initials} round size={38} />
                <div className="grow" style={{ minWidth: 0 }}>
                  <div className="between">
                    <span style={{ fontWeight: 600, fontSize: 13.5, display: "flex", alignItems: "center", gap: 5 }}>
                      {c.gold && <Icon name="crown" size={12} color="var(--gold-deep)" />}{c.name}
                    </span>
                    <span className="muted mono" style={{ fontSize: 10.5 }}>{c.time}</span>
                  </div>
                  <div className="between" style={{ marginTop: 2 }}>
                    <span className="muted" style={{ fontSize: 12.5, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis", maxWidth: 170 }}>{c.last}</span>
                    {c.unread > 0 && <span className="badge badge-default" style={{ padding: "0 6px", fontSize: 10, minWidth: 16, justifyContent: "center" }}>{c.unread}</span>}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* thread */}
          <div className="msg-thread">
            <div className="between" style={{ padding: "12px 18px", borderBottom: "1px solid var(--border)" }}>
              <div className="row" style={{ gap: 11 }}>
                <Avatar initials={conv.initials} round size={36} />
                <div>
                  <div style={{ fontWeight: 600, display: "flex", alignItems: "center", gap: 5 }}>
                    {conv.gold && <Icon name="crown" size={13} color="var(--gold-deep)" />}{conv.name}
                  </div>
                  <div className="muted" style={{ fontSize: 12 }}>{conv.group ? "Groupe · cercle" : "En ligne"}</div>
                </div>
              </div>
              <div className="row" style={{ gap: 4 }}>
                <button className="btn btn-ghost btn-icon"><Icon name="phone" size={16} /></button>
                <button className="btn btn-ghost btn-icon"><Icon name="info" size={16} /></button>
              </div>
            </div>
            <div className="enc-banner"><Icon name="shield-check" size={13} color="var(--primary)" />Messages chiffrés de bout en bout · ÉDIFICE ne peut pas les lire</div>
            <div className="msg-scroll" ref={scrollRef}>
              {msgs.map((m, i) => (
                <div key={i} className={"bubble " + (m.side === "out" ? "out" : "in")}>
                  {m.side === "in" && conv.group && <div style={{ fontSize: 11, fontWeight: 600, color: "var(--gold-deep)", marginBottom: 3 }}>{m.who}</div>}
                  <div>{m.text}</div>
                  <div className="ts">{m.t}</div>
                </div>
              ))}
            </div>
            <div className="msg-compose">
              <button className="btn btn-ghost btn-icon"><Icon name="plus" size={18} /></button>
              <input placeholder="Écris un message chiffré…" value={draft} onChange={(e) => setDraft(e.target.value)} onKeyDown={(e) => e.key === "Enter" && send()} />
              <button className="btn btn-default btn-icon lg" onClick={send}><Icon name="send-horizontal" size={16} /></button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

window.Messaging = Messaging;
