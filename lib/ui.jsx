// shadcn/ui kit — shared primitives. Exported to window for cross-file use.
const { useState, useRef, useEffect } = React;

// Lucide icon via CSS mask (colorable with currentColor, re-render safe)
function Icon({ name, size = 16, color, style = {}, className = "" }) {
  const url = `https://unpkg.com/lucide-static@latest/icons/${name}.svg`;
  return (
    <span
      className={"icon " + className}
      aria-hidden="true"
      style={{
        width: size, height: size,
        backgroundColor: color || "currentColor",
        WebkitMaskImage: `url(${url})`, maskImage: `url(${url})`,
        ...style,
      }}
    />
  );
}

function Button({ variant = "default", size, icon, children, className = "", ...rest }) {
  const cls = ["btn", `btn-${variant}`, size ? `btn-${size}` : "", className].filter(Boolean).join(" ");
  return (
    <button className={cls} {...rest}>
      {icon && <Icon name={icon} />}
      {children}
    </button>
  );
}

function Badge({ variant = "secondary", icon, children, className = "" }) {
  return (
    <span className={`badge badge-${variant} ${className}`}>
      {icon && <Icon name={icon} size={12} />}
      {children}
    </span>
  );
}

function Avatar({ initials, round, src, size = 32 }) {
  return (
    <span className={"avatar" + (round ? " round" : "")} style={{ width: size, height: size }}>
      {src ? <img src={src} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} /> : initials}
    </span>
  );
}

function Card({ children, className = "", ...rest }) {
  return <div className={"card " + className} {...rest}>{children}</div>;
}

// Tiny dropdown menu that closes on outside click
function Menu({ trigger, children, align = "right" }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);
  useEffect(() => {
    if (!open) return;
    const fn = (e) => { if (ref.current && !ref.current.contains(e.target)) setOpen(false); };
    document.addEventListener("mousedown", fn);
    return () => document.removeEventListener("mousedown", fn);
  }, [open]);
  return (
    <div ref={ref} style={{ position: "relative" }}>
      <span onClick={() => setOpen((o) => !o)}>{trigger}</span>
      {open && <div className="menu" style={align === "left" ? { left: 0, right: "auto" } : {}}
        onClick={() => setOpen(false)}>{children}</div>}
    </div>
  );
}

Object.assign(window, { Icon, Button, Badge, Avatar, Card, Menu });
