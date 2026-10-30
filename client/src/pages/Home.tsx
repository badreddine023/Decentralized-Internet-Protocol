import { toast } from "sonner";
import {
  ArrowUpRight,
  Blocks,
  Check,
  ChevronDown,
  CircleDot,
  Cloud,
  Code2,
  Cpu,
  Database,
  ExternalLink,
  FileCode2,
  Github,
  Globe2,
  KeyRound,
  Layers3,
  LockKeyhole,
  Network,
  Radio,
  ShieldCheck,
  Sparkles,
  Terminal,
  Users,
  WalletCards,
  Zap,
} from "lucide-react";
import { useState } from "react";

type Layer = {
  index: string;
  name: string;
  description: string;
  accent: string;
  icon: typeof Globe2;
};

const layers: Layer[] = [
  {
    index: "00",
    name: "Resources",
    description: "User-contributed compute, storage, and connectivity form the base substrate.",
    accent: "mint",
    icon: Cpu,
  },
  {
    index: "01",
    name: "Protocols",
    description: "Content addressing, peer discovery, and WTTP-inspired semantics replace origin servers.",
    accent: "orange",
    icon: Network,
  },
  {
    index: "02",
    name: "Applications",
    description: "Interfaces compose over portable data instead of locking users into a single vendor.",
    accent: "violet",
    icon: Layers3,
  },
  {
    index: "03",
    name: "Coordination",
    description: "Smart contracts and transparent rules coordinate incentives without a central operator.",
    accent: "blue",
    icon: Blocks,
  },
];

const nodes = [
  { city: "Lisbon", role: "Gateway", status: "online", latency: "42 ms" },
  { city: "Nairobi", role: "Storage", status: "online", latency: "88 ms" },
  { city: "Seoul", role: "Compute", status: "syncing", latency: "124 ms" },
  { city: "São Paulo", role: "Relay", status: "online", latency: "67 ms" },
];

const checks = [
  "Content addressed, not location addressed",
  "No private key or vendor account required to explore",
  "Open interfaces for storage, compute, and governance",
];

function scrollToId(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
}

export default function Home() {
  const [activeLayer, setActiveLayer] = useState("00");
  const [isRunning, setIsRunning] = useState(false);

  const runNodeCheck = () => {
    setIsRunning(true);
    window.setTimeout(() => {
      setIsRunning(false);
      toast.success("Local node check complete", {
        description: "Browser demo is ready. Connect a real IPFS or WTTP adapter next.",
      });
    }, 900);
  };

  const showComingSoon = (label: string) => {
    toast(`${label} is on the roadmap`, {
      description: "This first release documents the interface before wiring production peers.",
    });
  };

  return (
    <main className="site-shell">
      <div className="noise" aria-hidden="true" />
      <nav className="topbar container" aria-label="Primary navigation">
        <button className="brand" onClick={() => scrollToId("top")} aria-label="Back to top">
          <span className="brand-mark"><CircleDot size={15} strokeWidth={2.5} /></span>
          <span>NEW INTERNET <em>/</em> LABS</span>
        </button>
        <div className="nav-links">
          <button onClick={() => scrollToId("architecture")}>Architecture</button>
          <button onClick={() => scrollToId("node-console")}>Node console</button>
          <button onClick={() => scrollToId("roadmap")}>Roadmap</button>
        </div>
        <button className="nav-cta" onClick={() => showComingSoon("GitHub access")}>Open repository <ArrowUpRight size={15} /></button>
      </nav>

      <section className="hero container" id="top">
        <div className="hero-copy">
          <div className="eyebrow"><span className="pulse" /> PROTOCOL DESIGN STUDY / 001</div>
          <h1>Internet infrastructure<br /><span>without the center.</span></h1>
          <p className="hero-lede">A technical starting point for a free, peer-to-peer internet: storage owned by its users, protocols that outlive companies, and coordination rules that can be inspected before they are trusted.</p>
          <div className="hero-actions">
            <button className="button button-primary" onClick={() => scrollToId("architecture")}>Explore the stack <ArrowUpRight size={16} /></button>
            <button className="button button-ghost" onClick={() => scrollToId("node-console")}><Terminal size={16} /> Run node check</button>
          </div>
          <div className="hero-proof">
            <span><ShieldCheck size={14} /> Open by default</span>
            <span><LockKeyhole size={14} /> No custodial data</span>
            <span><Code2 size={14} /> MIT-ready codebase</span>
          </div>
        </div>

        <div className="network-stage" aria-label="Illustration of a peer-to-peer network">
          <div className="stage-label stage-label-top"><span>LIVE TOPOLOGY</span><span>4 PEERS / 1 PROTOCOL</span></div>
          <div className="network-grid" />
          <svg className="network-lines" viewBox="0 0 620 520" role="img" aria-label="Connected node topology">
            <path d="M310 260 L130 126 M310 260 L488 105 M310 260 L114 395 M310 260 L512 406 M130 126 L488 105 M114 395 L512 406" />
          </svg>
          <div className="orbit orbit-one" />
          <div className="orbit orbit-two" />
          <div className="node node-core"><span className="node-core-ring" /><Globe2 size={31} /><b>ROOTLESS</b><small>CONTENT GRAPH</small></div>
          <div className="node node-a"><span /><b>IPFS</b><small>STORAGE</small></div>
          <div className="node node-b"><span /><b>WTTP</b><small>PROTOCOL</small></div>
          <div className="node node-c"><span /><b>PEER</b><small>RELAY</small></div>
          <div className="node node-d"><span /><b>DAO</b><small>RULES</small></div>
          <div className="stage-footer"><span><span className="legend-dot mint" /> verified link</span><span><span className="legend-dot orange" /> pending adapter</span></div>
        </div>
      </section>

      <section className="ticker" aria-label="Protocol principles">
        <div className="ticker-inner"><span>CONTENT ADDRESSING</span><i>✦</i><span>USER-RUN INFRASTRUCTURE</span><i>✦</i><span>OPEN GOVERNANCE</span><i>✦</i><span>VERIFIABLE COMPUTE</span><i>✦</i><span>CONTENT ADDRESSING</span></div>
      </section>

      <section className="manifesto container">
        <div className="section-kicker"><span>01 / WHY THIS EXISTS</span><span>DESIGN PRINCIPLE</span></div>
        <div className="manifesto-grid">
          <h2>The network should be a <span>commons,</span> not a collection of private fiefdoms.</h2>
          <div className="manifesto-copy"><p>Today, an app usually depends on an origin server, a database, a cloud account, and a company that can change the rules. The New Internet inverts that dependency: peers provide resources, protocols define interoperable behavior, and users retain control of identity and data.</p><p>This is not a promise that decentralization is free by magic. It is a plan to make the cost visible, the contribution voluntary, and the control legible.</p><button className="text-link" onClick={() => scrollToId("node-console")}>See the first runnable slice <ArrowUpRight size={15} /></button></div>
        </div>
      </section>

      <section className="architecture container" id="architecture">
        <div className="section-kicker"><span>02 / ARCHITECTURE</span><span>FOUR LAYERS / ONE MENTAL MODEL</span></div>
        <div className="section-heading"><div><h2>A stack designed to <span>remove bottlenecks.</span></h2></div><p>Start with the layer that creates immediate utility: storage. Then progressively replace hosted assumptions with peer-operated adapters.</p></div>
        <div className="layer-layout">
          <div className="layer-list" role="tablist" aria-label="Architecture layers">
            {layers.map((layer) => {
              const Icon = layer.icon;
              return <button key={layer.index} className={`layer-row ${activeLayer === layer.index ? "is-active" : ""}`} onClick={() => setActiveLayer(layer.index)} role="tab" aria-selected={activeLayer === layer.index}>
                <span className="layer-index">LAYER {layer.index}</span><span className="layer-name"><Icon size={17} /> {layer.name}</span><ArrowUpRight size={16} className="layer-arrow" />
              </button>;
            })}
          </div>
          <div className={`layer-detail detail-${activeLayer}`}>
            {(() => { const layer = layers.find((item) => item.index === activeLayer) ?? layers[0]; const Icon = layer.icon; return <>
              <div className="detail-top"><span className="detail-icon"><Icon size={22} /></span><span>ACTIVE LAYER / {layer.index}</span></div>
              <h3>{layer.name}<br /><span>as a shared primitive.</span></h3>
              <p>{layer.description}</p>
              <div className="detail-metrics"><div><small>STATUS</small><b><span className="status-dot" /> SPECIFICATION</b></div><div><small>FIRST BUILD</small><b>{layer.index === "00" ? "IPFS + Web3.Storage" : layer.index === "01" ? "WTTP adapter" : layer.index === "02" ? "Reference app" : "DAO policy"}</b></div></div>
            </>; })()}
          </div>
        </div>
      </section>

      <section className="storage-band">
        <div className="container storage-grid">
          <div><div className="eyebrow orange-eyebrow"><span className="pulse orange-pulse" /> FIRST PRIMITIVE / DECENTRALIZED STORAGE</div><h2>Put the data<br /><span>where the users are.</span></h2><p>IPFS gives content a stable identity through its CID. A pinning or Filecoin-backed provider keeps that content retrievable. Our first adapter makes this workflow explicit without hiding the trade-offs.</p><button className="button button-light" onClick={() => showComingSoon("Storage adapter")}>Read the adapter plan <FileCode2 size={16} /></button></div>
          <div className="storage-card"><div className="card-topline"><span><Database size={15} /> STORAGE REQUEST</span><span className="live-label"><span className="status-dot" /> DEMO</span></div><div className="storage-path"><span className="path-method">PUT</span><code>/content/hello-new-internet</code></div><div className="storage-result"><div className="result-icon"><Check size={18} /></div><div><small>CONTENT IDENTIFIER</small><b>bafybeigdyr...x7kq</b><span>retrievable from any connected peer</span></div></div><div className="storage-tags"><span>IPFS / CIDv1</span><span>FILECOIN-READY</span><span>NO ORIGIN</span></div></div>
        </div>
      </section>

      <section className="node-console container" id="node-console">
        <div className="section-kicker"><span>03 / NODE CONSOLE</span><span>LOCAL DEMO / NOT A PRODUCTION PEER</span></div>
        <div className="console-head"><div><h2>See the network <span>before you join it.</span></h2><p>A small, inspectable UI for the node lifecycle. The browser can model the state machine now; a future adapter will provide real peer discovery and content exchange.</p></div><button className="button button-primary" onClick={runNodeCheck} disabled={isRunning}>{isRunning ? <><Zap size={16} className="spin" /> Checking peers...</> : <><Radio size={16} /> Run local check</>}</button></div>
        <div className="console-grid">
          <div className="console-map"><div className="map-header"><span><span className="status-dot" /> PEER TABLE</span><span>REFRESH 00:12</span></div><div className="node-table">{nodes.map((node) => <div className="node-row" key={node.city}><span className="node-city"><span className={`mini-node ${node.status}`} />{node.city}</span><span className="node-role">{node.role}</span><span className="node-latency">{node.latency}</span><span className={`node-status ${node.status}`}>{node.status}</span></div>)}</div><div className="map-footer"><span><Users size={14} /> 4 community nodes</span><span><Cloud size={14} /> 0 hosted origins</span></div></div>
          <div className="console-side"><div className="console-card"><div className="card-topline"><span><WalletCards size={14} /> IDENTITY</span><span className="tag-muted">LOCAL ONLY</span></div><div className="identity-row"><div className="identity-avatar"><KeyRound size={18} /></div><div><b>anonymous peer</b><span>public key not connected</span></div></div><button className="small-link" onClick={() => showComingSoon("Wallet connection")}>Connect a wallet <ArrowUpRight size={14} /></button></div><div className="console-card"><div className="card-topline"><span><ShieldCheck size={14} /> TRUST MODEL</span><span className="tag-mint">VERIFIABLE</span></div><ul className="check-list">{checks.map((check) => <li key={check}><Check size={14} /> {check}</li>)}</ul></div></div>
        </div>
      </section>

      <section className="roadmap container" id="roadmap">
        <div className="section-kicker"><span>04 / SHIP PLAN</span><span>FROM STATIC PROTOTYPE TO NETWORK</span></div>
        <div className="roadmap-grid"><div><h2>Build the <span>commons</span> in public.</h2><p>Every milestone should reduce a central assumption and increase the number of things a user can verify locally.</p><button className="text-link" onClick={() => showComingSoon("Contribution guide")}>Become a contributor <Github size={15} /></button></div><div className="timeline"><div className="timeline-item done"><span className="timeline-number">01</span><div><b>Document the model</b><small>Architecture, trade-offs, and vocabulary are open in this repository.</small></div><Check size={16} /></div><div className="timeline-item current"><span className="timeline-number">02</span><div><b>Ship the storage adapter</b><small>Pin a CID, retrieve it, and make provider boundaries explicit.</small></div><Sparkles size={16} /></div><div className="timeline-item"><span className="timeline-number">03</span><div><b>Connect real peers</b><small>Introduce libp2p discovery, local persistence, and offline-first behavior.</small></div><CircleDot size={16} /></div><div className="timeline-item"><span className="timeline-number">04</span><div><b>Govern the rules</b><small>Move policy from private infrastructure into auditable contracts.</small></div><Blocks size={16} /></div></div></div>
      </section>

      <footer className="footer container"><div className="footer-brand"><span className="brand-mark"><CircleDot size={15} strokeWidth={2.5} /></span><span>NEW INTERNET / LABS</span></div><p>A practical beginning for a network that belongs to the people who keep it alive.</p><div className="footer-links"><button onClick={() => showComingSoon("Repository")}>Repository <ExternalLink size={13} /></button><button onClick={() => showComingSoon("Documentation")}>Docs <ExternalLink size={13} /></button><button onClick={() => showComingSoon("Community")}>Community <ExternalLink size={13} /></button></div><span className="footer-note">OPEN BUILD / 2026</span></footer>
    </main>
  );
}
