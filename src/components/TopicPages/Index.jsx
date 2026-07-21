// Copyright (c) 2026 Saheli Mondal.

import {
  ArrowRight,
  Braces,
  ChevronRight,
  Code2,
  GitBranch,
  Layers3,
  Menu,
  Play,
  X,
} from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import "./premium-landing.css";

const navItems = [
  ["Home", "#home"],
  ["Algorithms", "#algorithms"],
  ["Docs", "#docs"],
  ["About", "#about"],
  ["Footer", "#footer"],
];

const algorithms = [
  {
    icon: Layers3,
    label: "Sorting",
    title: "See every swap.",
    copy: "Step through comparisons, pivots, and swaps with precise visual feedback.",
    to: "/sorting",
    tint: "violet",
    stat: "12+ visualizers",
  },
  {
    icon: Braces,
    label: "Array",
    title: "Trace each operation.",
    copy: "Watch indexes, windows, and prefix patterns unfold in real time.",
    to: "/array",
    tint: "blue",
    stat: "10+ visualizers",
  },
  {
    icon: GitBranch,
    label: "Linked List",
    title: "Follow the pointers.",
    copy: "Understand insertion, deletion, and traversal without mental overhead.",
    to: "/linked-list",
    tint: "pink",
    stat: "Core operations",
  },
];

const docs = [
  {
    icon: Code2,
    title: "Python Docs",
    copy: "Concise Python-first notes for data structures, complexity, and interview patterns.",
    to: "/docs/python",
  },
  {
    icon: Braces,
    title: "JavaScript Docs",
    copy: "JavaScript algorithm references with practical examples and patterns for frontend devs.",
    to: "/docs/javascript",
  },
];

const Index = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const closeMenu = () => setMenuOpen(false);

  return (
    <div className="visco-landing" id="home">
      <header className="visco-nav-wrap">
        <nav className="visco-nav" aria-label="Main navigation">
          <a
            className="visco-brand"
            href="#home"
            onClick={closeMenu}
            aria-label="Visco home"
          >
            <span className="brand-mark">
              <span />
            </span>
            <span>Visco</span>
          </a>

          <div className="visco-nav-links">
            {navItems.map(([name, href]) => (
              <a key={name} href={href}>
                {name}
              </a>
            ))}
          </div>

          <div className="visco-nav-actions">
            <a className="nav-docs" href="#docs">
              Docs <ArrowRight size={14} />
            </a>
            <a className="nav-cta" href="#algorithms">
              Algorithms <ArrowRight size={14} />
            </a>
          </div>

          <button
            className="mobile-menu-button"
            onClick={() => setMenuOpen((prev) => !prev)}
            aria-label="Toggle navigation"
          >
            {menuOpen ? <X size={19} /> : <Menu size={19} />}
          </button>
        </nav>

        {menuOpen && (
          <div className="mobile-nav">
            {navItems.map(([name, href]) => (
              <a key={name} href={href} onClick={closeMenu}>
                {name}
              </a>
            ))}
            <a className="nav-cta" href="#algorithms" onClick={closeMenu}>
              Explore <ArrowRight size={14} />
            </a>
          </div>
        )}
      </header>

      <main>
        <section className="premium-hero" aria-label="Visco hero">
          <div className="hero-orb hero-orb-one" />
          <div className="hero-orb hero-orb-two" />

          <div className="hero-content">
            <div className="eyebrow">
              <span className="status-dot" /> Interactive algorithm platform
            </div>
            <h1>
              Understand algorithms.
              <br />
              <span>Instantly.</span>
            </h1>
            <p className="hero-copy">
              A premium visual workspace where developers and CS students learn
              by watching algorithms execute, step by step.
            </p>
            <div className="hero-actions">
              <a className="button button-light" href="#algorithms">
                Explore algorithms <ArrowRight size={16} />
              </a>
              <a className="button button-ghost" href="#docs">
                <Code2 size={16} /> Open docs
              </a>
            </div>
            <div className="hero-proof">
              <div className="avatar-stack">
                <i>D</i>
                <i>E</i>
                <i>V</i>
              </div>
              <span>Built for developers who care about precision and taste.</span>
            </div>
          </div>

          <div className="product-stage" aria-label="Algorithm visualization preview">
            <div className="stage-glow" />
            <div className="editor-window">
              <div className="editor-toolbar">
                <div className="traffic">
                  <i />
                  <i />
                  <i />
                </div>
                <div className="editor-tab">
                  <Code2 size={13} /> quick-sort.js <span>x</span>
                </div>
                <div className="editor-tools">live</div>
              </div>
              <div className="editor-body">
                <aside className="line-numbers">
                  1
                  <br />2
                  <br />3
                  <br />4
                  <br />5
                  <br />6
                  <br />7
                  <br />8
                  <br />9
                </aside>
                <pre>
                  <code>
                    <em>function</em> <strong>quickSort</strong>(array) {"{"}
                    <br />  <em>if</em> (array.length &lt;= <b>1</b>) <em>return</em> array;
                    <br />
                    <br />  <em>const</em> pivot = array[<b>0</b>];
                    <br />  <em>const</em> left = array.
                    <strong>filter</strong>(x =&gt; x &lt; pivot);
                    <br />  <em>const</em> right = array.
                    <strong>filter</strong>(x =&gt; x &gt; pivot);
                    <br />
                    <br />  <em>return</em> [...quickSort(left), pivot,
                    <br />    ...quickSort(right)];
                    <br />{"}"}
                  </code>
                </pre>
              </div>
              <div className="editor-status">
                <span>
                  <span className="live-dot" /> Live visualization
                </span>
                <span>JavaScript</span>
              </div>
            </div>

            <div className="visualizer-card">
              <div className="visualizer-head">
                <div>
                  <span className="tiny-label">STEP 04 / 12</span>
                  <h3>
                    Partition around <b>42</b>
                  </h3>
                </div>
                <button aria-label="Play visualization">
                  <Play size={13} fill="currentColor" />
                </button>
              </div>
              <div className="array-bars">
                <i style={{ height: "42%" }} />
                <i style={{ height: "62%" }} />
                <i style={{ height: "30%" }} />
                <i className="active" style={{ height: "78%" }} />
                <i style={{ height: "53%" }} />
                <i style={{ height: "94%" }} />
                <i style={{ height: "68%" }} />
                <i style={{ height: "38%" }} />
              </div>
              <div className="visualizer-footer">
                <span>
                  Comparisons <b>06</b>
                </span>
                <span>
                  Swaps <b>02</b>
                </span>
                <span>O(n log n)</span>
              </div>
            </div>
          </div>

          <div className="scroll-cue">
            <span /> Scroll to explore
          </div>
        </section>

        <section className="signal-band" aria-label="Value statement">
          <p>
            Understand the <b>why</b>, not just the <b>what</b>.
          </p>
          <div>
            <span>Interactive</span>
            <span>Precise</span>
            <span>Built to learn</span>
          </div>
        </section>

        <section className="algorithm-section" id="algorithms">
          <div className="section-heading">
            <div>
              <span className="section-kicker">Core visualizers</span>
              <h2>
                Start with a concept.
                <br />
                Leave with intuition.
              </h2>
            </div>
            <p>
              Explore visual, step-by-step breakdowns designed to turn complex
              logic into something tangible.
            </p>
          </div>

          <div className="algorithm-grid">
            {algorithms.map(({ icon: Icon, label, title, copy, to, tint, stat }) => (
              <Link to={to} className={`algorithm-card ${tint}`} key={label}>
                <div className="card-icon">
                  <Icon size={20} />
                </div>
                <span className="card-label">{label}</span>
                <h3>{title}</h3>
                <p>{copy}</p>
                <div className="card-meta">{stat}</div>
                <span className="card-link">
                  Open workspace <ChevronRight size={16} />
                </span>
                <div className="card-decoration" />
              </Link>
            ))}
          </div>
        </section>

        <section className="docs-section" id="docs">
          <div className="section-heading docs-heading">
            <div>
              <span className="section-kicker">Documentation</span>
              <h2>
                Learn fast.
                <br />
                Ship faster.
              </h2>
            </div>
            <p>
              No dedicated docs landing here. Jump directly into the language
              track you need right now.
            </p>
          </div>

          <div className="docs-grid">
            {docs.map(({ icon: Icon, title, copy, to }) => (
              <Link key={title} to={to} className="docs-card">
                <div className="docs-icon-wrap">
                  <Icon size={20} />
                </div>
                <h3>{title}</h3>
                <p>{copy}</p>
                <span className="docs-link">
                  Open notes <ArrowRight size={15} />
                </span>
              </Link>
            ))}
          </div>
        </section>

        <section className="about-section" id="about">
          <div className="about-panel">
            <div className="about-copy">
              <span className="section-kicker">About Visco</span>
              <h2>
                Premium clarity
                <br />
                for algorithm practice.
              </h2>
              <p>
                Visco brings a VS Code-inspired learning experience to data
                structures and algorithms, blending code and visuals in one
                focused interface.
              </p>
              <a className="text-link" href="#docs">
                Start with docs <ArrowRight size={16} />
              </a>
            </div>
            <div className="about-metrics">
              <div>
                <b>3</b>
                <span>Core algorithm tracks</span>
              </div>
              <div>
                <b>2</b>
                <span>Language docs tracks</span>
              </div>
              <div>
                <b>1</b>
                <span>Focused visual workflow</span>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="premium-footer" id="footer">
        <a className="visco-brand" href="#home">
          <span className="brand-mark">
            <span />
          </span>
          <span>Visco</span>
        </a>
        <p>Visualize the invisible.</p>
        <div>
          <a href="#algorithms">Algorithms</a>
          <a href="#docs">Docs</a>
          <a href="#about">About</a>
        </div>
      </footer>
    </div>
  );
};

export default Index;
