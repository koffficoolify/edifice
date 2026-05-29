// ÉDIFICE — main router
const { useState: useStateApp, useEffect: useEffectApp } = React;

function App() {
  const base = window.EDIFICE_DATA.BUILDER;
  const [enrolled, setEnrolled] = useStateApp(() => localStorage.getItem("edifice.enrolled") === "1");
  const [tier, setTier] = useStateApp(() => localStorage.getItem("edifice.tier") || "eveil");
  const [name, setName] = useStateApp(() => localStorage.getItem("edifice.name") || base.name);
  const [route, setRoute] = useStateApp(() => localStorage.getItem("edifice.route") || "library");
  const [readerInit, setReaderInit] = useStateApp({});

  useEffectApp(() => { localStorage.setItem("edifice.tier", tier); }, [tier]);
  useEffectApp(() => { localStorage.setItem("edifice.route", route); }, [route]);
  useEffectApp(() => { localStorage.setItem("edifice.enrolled", enrolled ? "1" : "0"); }, [enrolled]);

  const builder = {
    ...base,
    tier,
    name,
    initials: name.split(" ").map((x) => x[0]).join("").slice(0, 2).toUpperCase() || "BT",
  };

  const complete = (n) => {
    setName(n); localStorage.setItem("edifice.name", n);
    setEnrolled(true); setRoute("library");
  };

  const openReader = (init) => { setReaderInit(init || {}); setRoute("reader"); };

  if (!enrolled) return <Ritual onComplete={complete} />;

  if (route === "reader") {
    return (
      <div style={{ position: "fixed", inset: 0, background: "var(--background)" }}>
        <Reader builder={builder} initial={readerInit} onNavigate={setRoute} />
      </div>
    );
  }

  let page;
  switch (route) {
    case "library":  page = <Library builder={builder} onOpen={openReader} onNavigate={setRoute} />; break;
    case "access":   page = <Access builder={builder} onNavigate={setRoute} />; break;
    case "pyramid":  page = <Pyramid builder={builder} onNavigate={setRoute} />; break;
    case "messages": page = <Messaging builder={builder} onNavigate={setRoute} />; break;
    case "checkout": page = <Checkout builder={builder} onUpgrade={() => setTier("souverain")} onNavigate={setRoute} />; break;
    case "admin":    page = <Admin />; break;
    default:         page = <Library builder={builder} onOpen={openReader} onNavigate={setRoute} />;
  }

  return (
    <Shell active={route} onNavigate={setRoute} builder={builder}>
      {page}
    </Shell>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
