<script>
  import { onMount } from 'svelte';

  let menuOpen = false;
  let scrolled = false;
  let visible = {};
  let statsTriggered = false;

  // Animated headline cycling
  const cyclingPhrases = [
    'Premium harvests.',
    'AI automation.',
    'Exclusive species.',
    'Zero waste farming.',
    'Intelligent growth.',
    'Future food systems.',
  ];
  let phraseIndex = 0;
  let currentPhrase = cyclingPhrases[0];
  let phraseVisible = true;

  function toggleMenu() { menuOpen = !menuOpen; }
  function closeMenu() { menuOpen = false; }

  const navLinks = [
    { label: 'Ecosystem', href: '#aquaponics' },
    { label: 'Automation', href: '#automation' },
    { label: 'Species', href: '#species' },
    { label: 'Media', href: '#media' },
  ];

  const stats = [
    { value: 4, suffix: '', label: 'Active Fish Tanks' },
    { value: 12, suffix: '+', label: 'Plant Varieties' },
    { value: 95, suffix: '%', label: 'Water Recycled' },
    { value: 340, suffix: '%', label: 'Projected Yield Growth' },
  ];

  const automationCards = [
    { icon: '⬡', title: 'pH Precision', body: 'Atlas Scientific EZO probes measure water chemistry 24/7. Automated dosing corrects drift before fish or plants are affected.' },
    { icon: '◈', title: 'Dissolved Oxygen', body: 'Real-time DO sensors ensure peak saturation across all tanks. Alerts fire in seconds, not hours.' },
    { icon: '◉', title: 'Nutrient Mapping', body: 'EC and ORP sensors track nutrient density across every grow bed. AI schedules feeding for maximum plant uptake.' },
    { icon: '⬟', title: 'Climate Control', body: 'Temperature, humidity and light sensors across the facility. Every variable logged, every anomaly flagged instantly.' },
    { icon: '◈', title: 'Computer Vision', body: 'Camera arrays will detect plant stress, fish behaviour anomalies, and pest incursions automatically.' },
    { icon: '⬡', title: 'Predictive Models', body: 'AI forecasts harvest windows, equipment failure probabilities, and yield potential weeks in advance.' },
  ];

  const speciesItems = [
    { cat: 'Premium Fish', color: '#0a3d62', items: ['Sturgeon (Acipenser) — prestige aquaculture', 'Koi — ornamental & edible hybrid lines', 'Tilapia — selective strain program', 'Pangasius — controlled breeding'] },
    { cat: 'Exclusive Plants', color: '#1e5631', items: ['Dragon Fruit — rare pitaya cultivars', 'Heritage grape varieties', 'Rare chilli lineages (heat-mapped)', 'Cross-pollinated herb blends'] },
    { cat: 'Breeding Programs', color: '#7f1d1d', items: ['6 active cross-pollination experiments', 'Genomic logging per generation', 'Proprietary cultivar development', 'Species habitat engineering'] },
  ];

  const tiers = [
    { name: 'Seed', amount: '$500', highlight: false, perks: ['Quarterly impact reports', 'Annual harvest package', 'Digital farm feed access', 'Stewardship certificate'] },
    { name: 'Growth', amount: '$2,500', highlight: true, perks: ['All Seed benefits', 'Annual site visit', 'Revenue share from Year 2', 'Priority harvest allocation', 'Investor calls'] },
    { name: 'Partner', amount: '$10,000', highlight: false, perks: ['All Growth benefits', 'Advisory board seat', 'Species naming rights', 'Full financial access', 'Co-branding rights'] },
  ];

  const gallery = [
    { src: 'https://images.unsplash.com/photo-1585320806297-9794b3e4aaae?auto=format&fit=crop&w=800&q=80', cap: 'Main aquaponics system — Tank Row A' },
    { src: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=800&q=80', cap: 'Fish habitat monitoring' },
    { src: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?auto=format&fit=crop&w=800&q=80', cap: 'Grow bed production — Week 6' },
    { src: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80', cap: 'Sensor array & control hub' },
    { src: null, cap: 'Dragon fruit cultivation — Coming soon' },
    { src: null, cap: 'Harvest day — Coming soon' },
  ];

  const whyItems = [
    { title: 'Real Production', body: 'Not a concept — an operating farm with measurable output and expanding capacity.' },
    { title: 'Technology Moat', body: 'Custom AI stack built in-house. Proprietary cultivar programs. Vertical integration.' },
    { title: 'Global Market', body: 'Positioned for MENA, Asia, and Africa where sustainable food demand accelerates fastest.' },
    { title: 'Full Transparency', body: 'Growth-tier and above investors receive complete financial access. No hidden metrics.' },
  ];

  onMount(() => {
    const onScroll = () => { scrolled = window.scrollY > 40; };
    window.addEventListener('scroll', onScroll);

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          const k = e.target.dataset.reveal;
          if (k) { visible[k] = true; visible = visible; }
          if (e.target.dataset.stats && !statsTriggered) {
            statsTriggered = true;
            document.querySelectorAll('.snum').forEach(el => {
              const target = +el.dataset.target;
              let n = 0;
              const step = Math.ceil(target / 55);
              const t = setInterval(() => {
                n = Math.min(n + step, target);
                el.textContent = n;
                if (n >= target) clearInterval(t);
              }, 22);
            });
          }
        }
      });
    }, { threshold: 0.15 });

    document.querySelectorAll('[data-reveal],[data-stats]').forEach(el => observer.observe(el));

    // Phrase cycling
    const phraseTimer = setInterval(() => {
      phraseVisible = false;
      setTimeout(() => {
        phraseIndex = (phraseIndex + 1) % cyclingPhrases.length;
        currentPhrase = cyclingPhrases[phraseIndex];
        phraseVisible = true;
      }, 400);
    }, 2800);

    return () => {
      window.removeEventListener('scroll', onScroll);
      observer.disconnect();
      clearInterval(phraseTimer);
    };
  });
</script>

<!-- NAV -->
<header class:scrolled>
  <nav class="nav-inner">
    <a href="/" class="brand" on:click={closeMenu}>
      SGGA<span class="brand-accent">·AI</span>
    </a>
    <ul class="desktop-links">
      {#each navLinks as l}<li><a href={l.href}>{l.label}</a></li>{/each}
    </ul>
    <div class="nav-right">
      <a href="#invest" class="btn-nav">Invest Now</a>
      <button class="hamburger" class:open={menuOpen} on:click={toggleMenu} aria-label="Toggle menu">
        <span /><span /><span />
      </button>
    </div>
  </nav>
  <div class="mobile-menu" class:open={menuOpen}>
    {#each navLinks as l}<a href={l.href} on:click={closeMenu}>{l.label}</a>{/each}
    <a href="#invest" class="m-cta" on:click={closeMenu}>Invest Now →</a>
  </div>
</header>

<!-- HERO -->
<section class="hero">
  <div class="hero-inner">
    <div class="hero-left">
      <div class="hero-badge"><span class="bdot" /> Operational · Chiang Rai, Thailand</div>
      <h1>
        <span class="h1-static">One ecosystem.</span><br />
        <span class="h1-static">All yields. AI-powered.</span><br />
        <span class="h1-animated" class:out={!phraseVisible}>{currentPhrase}</span>
      </h1>
      <p class="hero-sub">The operating aquaponics farm fusing biological precision with AI-driven monitoring — premium food, zero waste, full traceability.</p>
      <div class="hero-btns">
        <a href="#aquaponics" class="btn-pill-dark">Explore our system</a>
        <a href="#invest" class="btn-pill-outline">Invest now</a>
      </div>
      <div class="trust-row">
        <span class="trust-badge">✓ Operational farm</span>
        <span class="trust-badge">✓ AI monitoring active</span>
        <span class="trust-badge">✓ Zero pesticides</span>
      </div>
    </div>
    <div class="hero-right">
      <div class="hero-img-wrap">
        <img src="https://images.unsplash.com/photo-1585320806297-9794b3e4aaae?auto=format&fit=crop&w=800&q=85" alt="Aquaponics system" class="img-main-hero" />
        <img src="https://images.unsplash.com/photo-1416879595882-3373a0480b5b?auto=format&fit=crop&w=400&q=80" alt="Plants" class="img-float-hero" />
        <div class="hcard hcard-1"><span class="hc-val">24/7</span><span class="hc-lbl">AI Monitoring</span></div>
        <div class="hcard hcard-2"><span class="hc-val">95%</span><span class="hc-lbl">Water recycled</span></div>
      </div>
    </div>
  </div>
</section>

<!-- TECH STRIP -->
<div class="strip">
  <span class="strip-label">Powered by</span>
  <div class="strip-track">
    <div class="strip-items">
      <span>Atlas Scientific</span><span>Raspberry Pi</span><span>AI Vision</span><span>EZO Probes</span><span>HDPE Infrastructure</span>
      <span>Atlas Scientific</span><span>Raspberry Pi</span><span>AI Vision</span><span>EZO Probes</span><span>HDPE Infrastructure</span>
    </div>
  </div>
</div>

<!-- STATS -->
<section class="stats-section" data-stats data-reveal="stats">
  <div class="container">
    <div class="stats-grid" class:vis={visible['stats']}>
      {#each stats as s, i}
        <div class="stat-block" style="transition-delay:{i*0.1}s">
          <div class="stat-val"><span class="snum" data-target={s.value}>{s.value}</span><span class="stat-sfx">{s.suffix}</span></div>
          <p>{s.label}</p>
        </div>
      {/each}
    </div>
  </div>
</section>

<!-- AQUAPONICS -->
<section id="aquaponics" class="section bg-white" data-reveal="aq">
  <div class="container">
    <div class="split" class:vis={visible['aq']}>
      <div class="split-imgs">
        <img class="img-main" src="https://images.unsplash.com/photo-1464226184884-fa280b87c399?auto=format&fit=crop&w=800&q=80" alt="Farm" />
        <img class="img-float" src="https://images.unsplash.com/photo-1416879595882-3373a0480b5b?auto=format&fit=crop&w=400&q=80" alt="Plants" />
      </div>
      <div class="split-text">
        <div class="stag">01 — Ecosystem</div>
        <h2>A living system,<br /><em>already producing.</em></h2>
        <p>Our aquaponics facility is not a concept — it is an operational farm generating real harvests today. Fish waste feeds plants. Plants purify water. Sensors monitor every variable, every hour.</p>
        <ul class="cklist">
          <li>IBC tank infrastructure — modular, HDPE-grade, fully scalable</li>
          <li>Multi-stage grow beds with timed flood-and-drain cycles</li>
          <li>Real-time water chemistry across all tanks</li>
          <li>Closed-loop recycling — 95% less water than soil farming</li>
          <li>Zero pesticides. Zero synthetic fertilisers. Full traceability.</li>
        </ul>
        <a href="#invest" class="btn-primary" style="margin-top:1.5rem">Join Our Round</a>
      </div>
    </div>
  </div>
</section>

<!-- AUTOMATION -->
<section id="automation" class="section bg-navy" data-reveal="auto">
  <div class="container">
    <div class="sec-hdr" class:vis={visible['auto']}>
      <div class="stag light">02 — Intelligence</div>
      <h2 class="light">The AI layer <em>is coming.</em></h2>
      <p class="sub light">We are installing an end-to-end sensor network across every tank and grow bed. Every variable measured. Every pattern learned. Every decision data-driven.</p>
    </div>
    <div class="tech-banner" class:vis={visible['auto']}>
      <img src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=1400&q=80" alt="Sensors" />
      <div class="tb-overlay"><p>Atlas Scientific EZO · Raspberry Pi clusters · Custom AI pipelines</p></div>
    </div>
    <div class="cards-grid" class:vis={visible['auto']}>
      {#each automationCards as c, i}
        <div class="fcard" style="transition-delay:{i*0.07}s">
          <span class="fc-ico">{c.icon}</span>
          <h4>{c.title}</h4>
          <p>{c.body}</p>
        </div>
      {/each}
    </div>
    <div class="timeline" class:vis={visible['auto']}>
      {#each [
        { label: 'Phase 1 — Complete', desc: 'pH, DO, EC, ORP sensors live. HTTP sensor server. iOS monitoring app deployed.', state: 'done' },
        { label: 'Phase 2 — In Progress', desc: 'Full tank coverage. Automated dosing pumps. Alert thresholds and push notifications.', state: 'active' },
        { label: 'Phase 3 — Planned', desc: 'Computer vision arrays. Predictive ML models. Investor dashboard with live data.', state: '' },
        { label: 'Phase 4 — Vision', desc: 'Fully autonomous farm management. Multi-site deployment. Unified data layer.', state: '' },
      ] as tl}
        <div class="tl-row">
          <div class="tl-dot" class:done={tl.state==='done'} class:active={tl.state==='active'} />
          <div><strong>{tl.label}</strong><p>{tl.desc}</p></div>
        </div>
      {/each}
    </div>
  </div>
</section>

<!-- SPECIES -->
<section id="species" class="section bg-white" data-reveal="sp">
  <div class="container">
    <div class="sec-hdr" class:vis={visible['sp']}>
      <div class="stag">03 — Cultivation</div>
      <h2>Exclusive species.<br /><em>Deliberate selection.</em></h2>
      <p class="sub">We identify, source and cultivate varieties of exceptional rarity and commercial value — refined through controlled cross-pollination no conventional farm attempts.</p>
    </div>
    <div class="sp-row" class:vis={visible['sp']}>
      {#each speciesItems as sp, i}
        <div class="sp-card" style="transition-delay:{i*0.1}s">
          <div class="sp-hdr" style="background:{sp.color}"><span>{sp.cat}</span></div>
          <ul>{#each sp.items as item}<li>{item}</li>{/each}</ul>
        </div>
      {/each}
    </div>
    <div class="bento" class:vis={visible['sp']}>
      <div class="bento-big">
        <img src="https://images.unsplash.com/photo-1571752726703-5e7d1f6a986d?auto=format&fit=crop&w=900&q=80" alt="Fish" />
        <div class="bento-cap">Premium fish habitat program</div>
      </div>
      <div class="bento-small">
        <div class="bento-stat"><span class="bs-n">6</span><span class="bs-l">Active breeding programs</span></div>
        <img src="https://images.unsplash.com/photo-1464226184884-fa280b87c399?auto=format&fit=crop&w=600&q=80" alt="Plants" class="bento-img2" />
        <div class="bento-txt">
          <h4>Cross-Pollination Program</h4>
          <p>Controlled hand-pollination across chilli, grape and herb lines — selecting for aroma, yield, and disease resistance. Results logged per generation. Goal: proprietary cultivars owned exclusively by SGGA·AI.</p>
        </div>
      </div>
    </div>
  </div>
</section>

<!-- MEDIA -->
<section id="media" class="section bg-light" data-reveal="med">
  <div class="container">
    <div class="sec-hdr" class:vis={visible['med']}>
      <div class="stag">04 — Media</div>
      <h2>From the <em>farm floor.</em></h2>
      <p class="sub">A live record of our operations. Updated weekly as milestones are reached and harvests documented.</p>
    </div>
    <div class="gallery" class:vis={visible['med']}>
      {#each gallery as g, i}
        <div class="g-slot" style="transition-delay:{i*0.06}s">
          {#if g.src}<img src={g.src} alt={g.cap} />
          {:else}<div class="g-ph"><span>＋</span><small>Coming soon</small></div>{/if}
          <div class="g-cap">{g.cap}</div>
        </div>
      {/each}
    </div>
    <div class="vid-row" class:vis={visible['med']}>
      {#each ['System Walkthrough', 'AI Monitoring Demo'] as vt}
        <div class="vid-slot">
          <!-- Replace with: <video src="/videos/file.mp4" controls></video> or <iframe src="https://youtube.com/embed/ID" allowfullscreen></iframe> -->
          <div class="vid-ph">
            <div class="play-ring">▶</div>
            <span>{vt}</span>
            <small>Video placeholder</small>
          </div>
        </div>
      {/each}
    </div>
  </div>
</section>

<!-- INVEST -->
<section id="invest" class="section bg-navy" data-reveal="inv">
  <div class="container">
    <div class="sec-hdr" class:vis={visible['inv']}>
      <div class="stag light">05 — Crowdfunding</div>
      <h2 class="light">Invest in the <em>future of food.</em></h2>
      <p class="sub light">An operating farm, a proven system, and a technology stack years ahead of conventional agriculture. We are opening a limited community investment round.</p>
    </div>
    <div class="pb-wrap" class:vis={visible['inv']}>
      <div class="pb-meta"><span><strong>$42,000</strong> raised of $200,000 goal</span><span>38 investors · Round closes Dec 2025</span></div>
      <div class="pb-track"><div class="pb-fill" /></div>
      <div class="pb-pct">21% funded</div>
    </div>
    <div class="tiers" class:vis={visible['inv']}>
      {#each tiers as t, i}
        <div class="tier" class:featured={t.highlight} style="transition-delay:{i*0.1}s">
          {#if t.highlight}<div class="tier-tag">Most Popular</div>{/if}
          <div class="tier-name">{t.name}</div>
          <div class="tier-price">{t.amount}</div>
          <div class="tier-period">minimum investment</div>
          <ul class="tier-perks">{#each t.perks as p}<li>{p}</li>{/each}</ul>
          <a href="mailto:invest@sgga.ai?subject=Investment — {t.name}" class="btn-tier" class:featured={t.highlight}>Apply for {t.name}</a>
        </div>
      {/each}
    </div>
    <div class="why-grid" class:vis={visible['inv']}>
      {#each whyItems as w, i}
        <div class="why-item" style="transition-delay:{i*0.08}s">
          <h4>{w.title}</h4><p>{w.body}</p>
        </div>
      {/each}
    </div>
  </div>
</section>

<!-- FINAL CTA -->
<section class="final-cta">
  <div class="container">
    <h2>Ready to grow with us?</h2>
    <p>Request a full investor deck, schedule a farm visit, or start a partnership discussion.</p>
    <div class="cta-row">
      <a href="mailto:invest@sgga.ai" class="btn-primary btn-lg">Request Investor Deck</a>
      <a href="mailto:hello@sgga.ai" class="btn-outline">General Enquiry</a>
    </div>
  </div>
</section>

<!-- FOOTER -->
<footer>
  <div class="container footer-grid">
    <div>
      <div class="footer-brand">SGGA<span>·AI</span></div>
      <p>Sustainable Green Gold AI<br />Chiang Rai, Thailand</p>
    </div>
    <div class="footer-col"><h5>Navigate</h5>{#each navLinks as l}<a href={l.href}>{l.label}</a>{/each}<a href="#invest">Invest</a></div>
    <div class="footer-col"><h5>Contact</h5><a href="mailto:invest@sgga.ai">invest@sgga.ai</a><a href="mailto:hello@sgga.ai">hello@sgga.ai</a></div>
    <div class="footer-note">
      <p>© 2025 Sustainable Green Gold AI. All rights reserved.</p>
      <p>Investment involves risk. Past performance does not guarantee future results.</p>
    </div>
  </div>
</footer>

<style>
:global(*, *::before, *::after) { box-sizing: border-box; margin: 0; padding: 0; }
:global(html) { scroll-behavior: smooth; }
:global(body) { font-family: 'Manrope', sans-serif; color: #111827; background: #fff; -webkit-font-smoothing: antialiased; line-height: 1.6; }

/* ── NAV ── */
header {
  position: fixed; top: 0; left: 0; right: 0; z-index: 200;
  background: transparent;
  border-bottom: 1px solid transparent;
  transition: background 0.35s ease, border-color 0.35s ease, box-shadow 0.35s ease;
}
header.scrolled {
  background: rgba(255,255,255,0.97);
  border-color: #e5e7eb;
  box-shadow: 0 2px 20px rgba(0,0,0,0.07);
}
/* nav links white on hero, dark after scroll */
.brand { font-size: 1.3rem; font-weight: 800; text-decoration: none; color: #fff; letter-spacing: -0.01em; transition: color 0.35s; }
header.scrolled .brand { color: #050d1e; }
.brand-accent { color: rgba(255,255,255,0.7); transition: color 0.35s; }
header.scrolled .brand-accent { color: #ff5c2a; }
.desktop-links { display: flex; list-style: none; gap: 2rem; }
.desktop-links a { color: rgba(255,255,255,0.85); text-decoration: none; font-size: 0.9rem; font-weight: 500; transition: color 0.2s; }
header.scrolled .desktop-links a { color: #374151; }
.desktop-links a:hover { color: #fff; }
header.scrolled .desktop-links a:hover { color: #ff5c2a; }
.nav-right { display: flex; align-items: center; gap: 0.75rem; }
.btn-nav {
  background: rgba(255,255,255,0.2); color: #fff;
  border: 1.5px solid rgba(255,255,255,0.5);
  backdrop-filter: blur(8px);
  padding: 0.55rem 1.2rem; border-radius: 100px;
  font-size: 0.85rem; font-weight: 700; text-decoration: none;
  transition: background 0.2s, border-color 0.2s, color 0.35s;
}
header.scrolled .btn-nav { background: #ff5c2a; border-color: #ff5c2a; color: #fff; }
.btn-nav:hover { background: rgba(255,255,255,0.35); }
.nav-inner {
  max-width: 1200px; margin: 0 auto; padding: 0 1.5rem;
  height: 68px; display: flex; align-items: center; justify-content: space-between;
}

/* hamburger */
.hamburger { display: none; flex-direction: column; justify-content: center; gap: 5px; width: 36px; height: 36px; background: none; border: none; cursor: pointer; padding: 6px; }
.hamburger span { display: block; width: 22px; height: 2px; background: #fff; border-radius: 2px; transition: transform 0.3s, opacity 0.3s, background 0.35s; transform-origin: center; }
header.scrolled .hamburger span { background: #050d1e; }
.hamburger.open span:nth-child(1) { transform: translateY(7px) rotate(45deg); }
.hamburger.open span:nth-child(2) { opacity: 0; transform: scaleX(0); }
.hamburger.open span:nth-child(3) { transform: translateY(-7px) rotate(-45deg); }

/* mobile drawer */
.mobile-menu {
  position: absolute; top: 68px; left: 0; right: 0;
  background: #fff; border-bottom: 1px solid #e5e7eb;
  display: flex; flex-direction: column;
  max-height: 0; overflow: hidden;
  transition: max-height 0.4s cubic-bezier(0.4,0,0.2,1), padding 0.3s;
  box-shadow: 0 8px 24px rgba(0,0,0,0.08);
}
.mobile-menu.open { max-height: 400px; padding: 0.5rem 0; }
.mobile-menu a { padding: 0.85rem 1.5rem; color: #374151; text-decoration: none; font-size: 0.95rem; font-weight: 500; border-bottom: 1px solid #f3f4f6; display: block; transition: color 0.15s, background 0.15s; }
.mobile-menu a:hover { color: #ff5c2a; background: #fff7f4; }
.m-cta { color: #ff5c2a !important; font-weight: 700 !important; }

/* ── HERO ── */
.hero {
  min-height: 100vh;
  background: linear-gradient(135deg, #4a7fd9 0%, #7b4ec8 45%, #c050be 100%);
  display: flex; align-items: center;
  padding: 5rem 1.5rem 4rem;
  position: relative; overflow: hidden;
}
.hero::before {
  content: ''; position: absolute; inset: 0;
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.04'/%3E%3C/svg%3E");
  pointer-events: none; opacity: 0.35;
}
.hero-inner {
  max-width: 1200px; margin: 0 auto; width: 100%;
  display: grid; grid-template-columns: 1fr 1fr;
  gap: 3.5rem; align-items: center;
  position: relative; z-index: 1;
}
.hero-badge {
  display: inline-flex; align-items: center; gap: 0.45rem;
  background: rgba(255,255,255,0.15); border: 1px solid rgba(255,255,255,0.3);
  color: rgba(255,255,255,0.9); padding: 0.32rem 0.85rem;
  border-radius: 100px; font-size: 0.75rem; font-weight: 600;
  margin-bottom: 1.25rem; backdrop-filter: blur(8px);
}
.bdot { width: 7px; height: 7px; border-radius: 50%; background: #7fff7f; animation: pulse 2s infinite; flex-shrink: 0; }
@keyframes pulse { 0%,100% { opacity:1; transform:scale(1); } 50% { opacity:0.5; transform:scale(0.8); } }
.hero-left h1 {
  font-size: clamp(1.9rem, 3.2vw, 2.8rem);
  font-weight: 700; line-height: 1.18;
  letter-spacing: -0.02em; color: #fff;
  margin-bottom: 1.25rem;
}
.h1-static { display: block; }
.h1-animated {
  display: block; font-weight: 800;
  transition: opacity 0.35s ease, transform 0.35s ease;
  opacity: 1; transform: translateY(0);
}
.h1-animated.out { opacity: 0; transform: translateY(10px); }
.hero-sub {
  color: rgba(255,255,255,0.8); font-size: 0.97rem;
  line-height: 1.75; margin-bottom: 2rem;
}
.hero-btns { display: flex; gap: 0.85rem; flex-wrap: wrap; margin-bottom: 2rem; }
.btn-pill-dark {
  display: inline-block; text-decoration: none;
  background: #111; color: #fff;
  padding: 0.75rem 1.6rem; border-radius: 100px;
  font-size: 0.88rem; font-weight: 700;
  transition: background 0.2s, transform 0.15s;
}
.btn-pill-dark:hover { background: #000; transform: translateY(-2px); }
.btn-pill-outline {
  display: inline-block; text-decoration: none;
  background: rgba(255,255,255,0.15);
  border: 2px solid rgba(255,255,255,0.6);
  color: #fff; backdrop-filter: blur(8px);
  padding: 0.73rem 1.6rem; border-radius: 100px;
  font-size: 0.88rem; font-weight: 700;
  transition: background 0.2s, transform 0.15s;
}
.btn-pill-outline:hover { background: rgba(255,255,255,0.25); transform: translateY(-2px); }
.trust-row { display: flex; gap: 1.25rem; flex-wrap: wrap; }
.trust-badge { color: rgba(255,255,255,0.8); font-size: 0.8rem; font-weight: 500; }

/* hero right — images */
.hero-right { position: relative; }
.hero-img-wrap { position: relative; height: 480px; }
.img-main-hero {
  width: 85%; height: 420px; object-fit: cover;
  border-radius: 14px; display: block;
  box-shadow: 0 24px 80px rgba(0,0,0,0.3);
  position: absolute; top: 0; right: 0;
}
.img-float-hero {
  width: 52%; height: 210px; object-fit: cover;
  border-radius: 12px; display: block;
  box-shadow: 0 12px 40px rgba(0,0,0,0.3);
  position: absolute; bottom: 0; left: 0;
  border: 3px solid rgba(255,255,255,0.3);
}
.hcard {
  position: absolute; background: #fff; border-radius: 10px;
  padding: 0.7rem 1rem; box-shadow: 0 8px 28px rgba(0,0,0,0.18);
  z-index: 2;
}
.hcard-1 { bottom: 3.5rem; left: 3.5rem; }
.hcard-2 { top: 1rem; right: -0.5rem; }
.hc-val { display: block; font-size: 1.3rem; font-weight: 800; color: #ff5c2a; line-height: 1; }
.hc-lbl { display: block; font-size: 0.68rem; color: #6b7280; margin-top: 0.15rem; font-weight: 500; }

/* ── STRIP ── */
.strip { background: #f9fafb; border-top: 1px solid #f3f4f6; border-bottom: 1px solid #f3f4f6; padding: 0.9rem 1.5rem; display: flex; align-items: center; gap: 2rem; overflow: hidden; }
.strip-label { color: #9ca3af; font-size: 0.78rem; font-weight: 500; white-space: nowrap; }
.strip-track { flex: 1; overflow: hidden; }
.strip-items { display: flex; gap: 3rem; animation: marquee 18s linear infinite; width: max-content; }
.strip-items span { color: #6b7280; font-size: 0.83rem; font-weight: 600; white-space: nowrap; }
@keyframes marquee { 0% { transform:translateX(0); } 100% { transform:translateX(-50%); } }

/* ── STATS ── */
.stats-section { padding: 5rem 0; background: #050d1e; }
.stats-grid { display: grid; grid-template-columns: repeat(4,1fr); gap: 2rem; opacity: 0; transform: translateY(24px); transition: opacity 0.7s ease, transform 0.7s ease; }
.stats-grid.vis { opacity: 1; transform: none; }
.stat-block { text-align: center; }
.stat-val { display: flex; align-items: flex-end; justify-content: center; gap: 2px; }
.snum { font-size: 3.2rem; font-weight: 800; color: #ff5c2a; line-height: 1; }
.stat-sfx { font-size: 1.8rem; font-weight: 700; color: #ff5c2a; padding-bottom: 0.3rem; }
.stat-block > p { color: rgba(255,255,255,0.5); font-size: 0.8rem; font-weight: 500; margin-top: 0.4rem; }

/* ── SHARED ── */
.section { padding: 6rem 0; }
.bg-white { background: #fff; }
.bg-light { background: #f9fafb; }
.bg-navy { background: #050d1e; }
.container { max-width: 1200px; margin: 0 auto; padding: 0 1.5rem; }
.stag { display: inline-block; font-size: 0.7rem; font-weight: 700; letter-spacing: 0.15em; text-transform: uppercase; color: #ff5c2a; margin-bottom: 0.85rem; }
.stag.light { color: rgba(255,130,80,0.9); }
h2 { font-size: clamp(2rem, 3.5vw, 3rem); font-weight: 800; letter-spacing: -0.025em; color: #050d1e; line-height: 1.12; margin-bottom: 1rem; }
h2.light { color: #f9fafb; }
h2 em { font-family: 'Fraunces', serif; font-style: italic; font-weight: 300; color: #ff5c2a; }
.sub { color: #6b7280; font-size: 1rem; line-height: 1.75; }
.sub.light { color: rgba(255,255,255,0.55); }
.sec-hdr { max-width: 680px; margin: 0 auto 3rem; text-align: center; opacity: 0; transform: translateY(24px); transition: opacity 0.7s ease, transform 0.7s ease; }
.sec-hdr.vis { opacity: 1; transform: none; }

/* ── BUTTONS ── */
.btn-primary { display: inline-block; text-decoration: none; background: #ff5c2a; color: #fff; padding: 0.8rem 1.75rem; border-radius: 8px; font-size: 0.9rem; font-weight: 700; transition: background 0.2s, transform 0.15s, box-shadow 0.2s; box-shadow: 0 4px 16px rgba(255,92,42,0.3); }
.btn-primary:hover { background: #e04a1f; transform: translateY(-2px); box-shadow: 0 8px 24px rgba(255,92,42,0.35); }
.btn-primary.btn-lg { padding: 1rem 2.25rem; font-size: 1rem; }
.btn-ghost { display: inline-block; text-decoration: none; color: #374151; font-size: 0.9rem; font-weight: 600; padding: 0.8rem 0; transition: color 0.2s; }
.btn-ghost:hover { color: #ff5c2a; }
.btn-outline { display: inline-block; text-decoration: none; color: #374151; font-size: 0.9rem; font-weight: 600; border: 2px solid #e5e7eb; padding: 0.95rem 1.75rem; border-radius: 8px; transition: border-color 0.2s, color 0.2s; }
.btn-outline:hover { border-color: #ff5c2a; color: #ff5c2a; }

/* ── SPLIT ── */
.split { display: grid; grid-template-columns: 1fr 1fr; gap: 5rem; align-items: center; opacity: 0; transform: translateY(32px); transition: opacity 0.8s ease, transform 0.8s ease; }
.split.vis { opacity: 1; transform: none; }
.split-imgs { position: relative; }
.img-main { width: 100%; height: 440px; object-fit: cover; border-radius: 12px; display: block; box-shadow: 0 16px 60px rgba(0,0,0,0.1); }
.img-float { position: absolute; bottom: -1.5rem; left: -1.5rem; width: 200px; height: 160px; object-fit: cover; border-radius: 10px; border: 4px solid #fff; box-shadow: 0 8px 32px rgba(0,0,0,0.15); }
.split-text h2 { text-align: left; }
.split-text p { color: #4b5563; margin: 1rem 0 1.25rem; }
.cklist { list-style: none; }
.cklist li { padding: 0.5rem 0 0.5rem 1.75rem; position: relative; color: #374151; font-size: 0.92rem; border-bottom: 1px solid #f3f4f6; }
.cklist li::before { content: '✓'; position: absolute; left: 0; color: #ff5c2a; font-weight: 700; }

/* ── TECH BANNER ── */
.tech-banner { position: relative; border-radius: 12px; overflow: hidden; margin-bottom: 2.5rem; opacity: 0; transform: scale(0.98); transition: opacity 0.7s ease, transform 0.7s ease; }
.tech-banner.vis { opacity: 1; transform: none; }
.tech-banner img { width: 100%; height: 340px; object-fit: cover; display: block; filter: brightness(0.55); }
.tb-overlay { position: absolute; inset: 0; display: flex; align-items: flex-end; padding: 2rem; background: linear-gradient(transparent 30%, rgba(5,13,30,0.65)); }
.tb-overlay p { color: rgba(255,255,255,0.65); font-size: 0.83rem; letter-spacing: 0.06em; }

/* ── CARDS GRID ── */
.cards-grid { display: grid; grid-template-columns: repeat(3,1fr); gap: 1px; background: rgba(255,255,255,0.06); border-radius: 12px; overflow: hidden; margin-bottom: 2.5rem; opacity: 0; transform: translateY(24px); transition: opacity 0.8s ease, transform 0.8s ease; }
.cards-grid.vis { opacity: 1; transform: none; }
.fcard { background: rgba(255,255,255,0.04); padding: 2.25rem; transition: background 0.2s; }
.fcard:hover { background: rgba(255,255,255,0.08); }
.fc-ico { display: block; font-size: 1.4rem; color: #ff5c2a; margin-bottom: 1rem; }
.fcard h4 { color: #f9fafb; font-size: 0.97rem; font-weight: 700; margin-bottom: 0.5rem; }
.fcard p { color: rgba(255,255,255,0.5); font-size: 0.875rem; line-height: 1.7; }

/* ── TIMELINE ── */
.timeline { opacity: 0; transform: translateY(24px); transition: opacity 0.8s ease 0.2s, transform 0.8s ease 0.2s; }
.timeline.vis { opacity: 1; transform: none; }
.tl-row { display: flex; gap: 1.25rem; padding: 1.25rem 0; border-bottom: 1px solid rgba(255,255,255,0.07); }
.tl-dot { width: 12px; height: 12px; border-radius: 50%; flex-shrink: 0; margin-top: 0.3rem; background: rgba(255,92,42,0.2); border: 2px solid rgba(255,92,42,0.25); }
.tl-dot.done { background: #ff5c2a; border-color: #ff5c2a; }
.tl-dot.active { background: transparent; border-color: #ff5c2a; box-shadow: 0 0 0 4px rgba(255,92,42,0.2); }
.tl-row strong { color: #f9fafb; display: block; margin-bottom: 0.2rem; font-size: 0.93rem; }
.tl-row p { color: rgba(255,255,255,0.45); font-size: 0.85rem; margin: 0; }

/* ── SPECIES ── */
.sp-row { display: grid; grid-template-columns: repeat(3,1fr); gap: 1.5rem; margin-bottom: 2.5rem; opacity: 0; transform: translateY(24px); transition: opacity 0.8s ease, transform 0.8s ease; }
.sp-row.vis { opacity: 1; transform: none; }
.sp-card { border-radius: 10px; overflow: hidden; border: 1px solid #e5e7eb; }
.sp-hdr { padding: 1.2rem 1.5rem; }
.sp-hdr span { color: #fff; font-size: 0.75rem; font-weight: 700; letter-spacing: 0.08em; text-transform: uppercase; }
.sp-card ul { list-style: none; padding: 1.25rem 1.5rem; display: flex; flex-direction: column; gap: 0.55rem; }
.sp-card li { font-size: 0.87rem; color: #374151; padding-left: 1rem; position: relative; }
.sp-card li::before { content: '→'; position: absolute; left: 0; color: #ff5c2a; font-size: 0.78rem; }

/* ── BENTO ── */
.bento { display: grid; grid-template-columns: 1.4fr 1fr; gap: 1.25rem; opacity: 0; transform: translateY(24px); transition: opacity 0.8s ease 0.1s, transform 0.8s ease 0.1s; }
.bento.vis { opacity: 1; transform: none; }
.bento-big { position: relative; border-radius: 12px; overflow: hidden; }
.bento-big img { width: 100%; height: 100%; min-height: 360px; object-fit: cover; display: block; }
.bento-cap { position: absolute; bottom: 1rem; left: 1rem; background: rgba(5,13,30,0.8); color: rgba(255,255,255,0.85); padding: 0.35rem 0.8rem; border-radius: 6px; font-size: 0.75rem; font-weight: 500; }
.bento-small { display: flex; flex-direction: column; gap: 1rem; }
.bento-stat { background: #ff5c2a; border-radius: 12px; padding: 1.75rem; }
.bs-n { display: block; font-size: 3rem; font-weight: 800; color: #fff; line-height: 1; }
.bs-l { color: rgba(255,255,255,0.8); font-size: 0.8rem; font-weight: 600; margin-top: 0.3rem; display: block; }
.bento-img2 { border-radius: 10px; width: 100%; height: 150px; object-fit: cover; display: block; }
.bento-txt { background: #f9fafb; border-radius: 12px; padding: 1.5rem; border: 1px solid #e5e7eb; }
.bento-txt h4 { font-size: 0.93rem; font-weight: 700; color: #050d1e; margin-bottom: 0.5rem; }
.bento-txt p { font-size: 0.83rem; color: #4b5563; line-height: 1.7; }

/* ── GALLERY ── */
.gallery { display: grid; grid-template-columns: repeat(3,1fr); gap: 1rem; margin-bottom: 1.5rem; opacity: 0; transform: translateY(24px); transition: opacity 0.8s ease, transform 0.8s ease; }
.gallery.vis { opacity: 1; transform: none; }
.g-slot { position: relative; aspect-ratio: 4/3; border-radius: 10px; overflow: hidden; background: #e5e7eb; }
.g-slot img { width: 100%; height: 100%; object-fit: cover; transition: transform 0.4s; display: block; }
.g-slot:hover img { transform: scale(1.04); }
.g-ph { width: 100%; height: 100%; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 0.4rem; border: 2px dashed #d1d5db; border-radius: 10px; }
.g-ph span { font-size: 1.75rem; color: #9ca3af; }
.g-ph small { color: #9ca3af; font-size: 0.76rem; }
.g-cap { position: absolute; bottom: 0; left: 0; right: 0; background: linear-gradient(transparent, rgba(5,13,30,0.75)); color: rgba(255,255,255,0.9); padding: 1.5rem 0.85rem 0.6rem; font-size: 0.74rem; font-weight: 500; }
.vid-row { display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; opacity: 0; transform: translateY(20px); transition: opacity 0.8s ease 0.15s, transform 0.8s ease 0.15s; }
.vid-row.vis { opacity: 1; transform: none; }
.vid-slot { aspect-ratio: 16/9; border: 2px dashed #d1d5db; border-radius: 10px; overflow: hidden; }
.vid-ph { width: 100%; height: 100%; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 0.6rem; }
.play-ring { width: 52px; height: 52px; border: 2px solid #d1d5db; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 1rem; padding-left: 3px; color: #6b7280; }
.vid-ph span { font-size: 0.88rem; color: #374151; font-weight: 600; }
.vid-ph small { font-size: 0.73rem; color: #9ca3af; }

/* ── INVEST ── */
.pb-wrap { max-width: 640px; margin: 0 auto 3rem; background: rgba(255,255,255,0.06); border: 1px solid rgba(255,255,255,0.1); border-radius: 12px; padding: 1.75rem; opacity: 0; transform: translateY(20px); transition: opacity 0.7s ease, transform 0.7s ease; }
.pb-wrap.vis { opacity: 1; transform: none; }
.pb-meta { display: flex; justify-content: space-between; margin-bottom: 1rem; }
.pb-meta span { color: rgba(255,255,255,0.55); font-size: 0.83rem; }
.pb-meta strong { color: #ff5c2a; }
.pb-track { height: 8px; background: rgba(255,255,255,0.1); border-radius: 4px; overflow: hidden; margin-bottom: 0.5rem; }
.pb-fill { height: 100%; width: 21%; background: linear-gradient(to right, #ff5c2a, #ff8c5a); border-radius: 4px; }
.pb-pct { text-align: right; color: rgba(255,255,255,0.35); font-size: 0.76rem; }
.tiers { display: grid; grid-template-columns: repeat(3,1fr); gap: 1.5rem; margin-bottom: 3.5rem; opacity: 0; transform: translateY(24px); transition: opacity 0.8s ease, transform 0.8s ease; }
.tiers.vis { opacity: 1; transform: none; }
.tier { background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.1); border-radius: 12px; padding: 2rem; position: relative; transition: transform 0.2s, box-shadow 0.2s; }
.tier:hover { transform: translateY(-4px); box-shadow: 0 16px 48px rgba(0,0,0,0.3); }
.tier.featured { border-color: #ff5c2a; background: rgba(255,92,42,0.08); }
.tier-tag { position: absolute; top: -12px; left: 50%; transform: translateX(-50%); background: #ff5c2a; color: #fff; font-size: 0.68rem; font-weight: 700; padding: 0.28rem 0.85rem; border-radius: 100px; white-space: nowrap; }
.tier-name { color: rgba(255,255,255,0.5); font-size: 0.72rem; font-weight: 700; letter-spacing: 0.1em; text-transform: uppercase; margin-bottom: 0.4rem; }
.tier-price { font-size: 2.4rem; font-weight: 800; color: #fff; line-height: 1; margin-bottom: 0.2rem; }
.tier-period { color: rgba(255,255,255,0.35); font-size: 0.73rem; margin-bottom: 1.5rem; padding-bottom: 1.5rem; border-bottom: 1px solid rgba(255,255,255,0.07); }
.tier-perks { list-style: none; margin-bottom: 1.75rem; display: flex; flex-direction: column; gap: 0.5rem; }
.tier-perks li { color: rgba(255,255,255,0.65); font-size: 0.86rem; padding-left: 1.25rem; position: relative; }
.tier-perks li::before { content: '✓'; position: absolute; left: 0; color: #ff5c2a; font-weight: 700; font-size: 0.78rem; }
.btn-tier { display: block; text-align: center; text-decoration: none; background: rgba(255,255,255,0.1); color: #fff; border: 1px solid rgba(255,255,255,0.18); border-radius: 8px; padding: 0.75rem; font-size: 0.84rem; font-weight: 600; transition: background 0.2s; }
.btn-tier:hover { background: rgba(255,255,255,0.15); }
.btn-tier.featured { background: #ff5c2a; border-color: #ff5c2a; }
.btn-tier.featured:hover { background: #e04a1f; }
.why-grid { display: grid; grid-template-columns: repeat(4,1fr); gap: 1.25rem; opacity: 0; transform: translateY(20px); transition: opacity 0.8s ease 0.1s, transform 0.8s ease 0.1s; }
.why-grid.vis { opacity: 1; transform: none; }
.why-item { background: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.07); border-radius: 10px; padding: 1.5rem; }
.why-item h4 { color: #f9fafb; font-size: 0.93rem; font-weight: 700; margin-bottom: 0.45rem; }
.why-item p { color: rgba(255,255,255,0.45); font-size: 0.84rem; line-height: 1.65; }

/* ── FINAL CTA ── */
.final-cta { padding: 6rem 0; text-align: center; background: #fff; }
.final-cta h2 { font-size: 2.4rem; font-weight: 800; letter-spacing: -0.025em; color: #050d1e; margin-bottom: 1rem; }
.final-cta p { color: #6b7280; max-width: 480px; margin: 0 auto 2.5rem; }
.cta-row { display: flex; gap: 1rem; justify-content: center; flex-wrap: wrap; }

/* ── FOOTER ── */
footer { background: #050d1e; padding: 4rem 0 3rem; }
.footer-grid { display: grid; grid-template-columns: 2fr 1fr 1fr 2fr; gap: 3rem; }
.footer-brand { font-size: 1.3rem; font-weight: 800; color: #fff; margin-bottom: 0.6rem; }
.footer-brand span { color: #ff5c2a; }
.footer-grid > div > p { color: rgba(255,255,255,0.4); font-size: 0.82rem; line-height: 1.7; }
.footer-col { display: flex; flex-direction: column; gap: 0.5rem; }
.footer-col h5 { color: rgba(255,255,255,0.28); font-size: 0.68rem; letter-spacing: 0.15em; text-transform: uppercase; margin-bottom: 0.4rem; }
.footer-col a { color: rgba(255,255,255,0.5); text-decoration: none; font-size: 0.87rem; transition: color 0.2s; }
.footer-col a:hover { color: #ff5c2a; }
.footer-note p { color: rgba(255,255,255,0.35); font-size: 0.8rem; margin-bottom: 0.3rem; }

/* ── RESPONSIVE ── */
@media (max-width: 1024px) {
  .hero-inner { grid-template-columns: 1fr; }
  .hero-right { display: none; }
  .desktop-links { display: none; }
  .hamburger { display: flex; }
  .split { grid-template-columns: 1fr; gap: 2rem; }
  .img-float { display: none; }
}
@media (max-width: 768px) {
  .stats-grid { grid-template-columns: repeat(2,1fr); }
  .cards-grid { grid-template-columns: 1fr 1fr; }
  .sp-row { grid-template-columns: 1fr; }
  .bento { grid-template-columns: 1fr; }
  .gallery { grid-template-columns: 1fr 1fr; }
  .vid-row { grid-template-columns: 1fr; }
  .tiers { grid-template-columns: 1fr; }
  .why-grid { grid-template-columns: 1fr 1fr; }
  .footer-grid { grid-template-columns: 1fr 1fr; }
}
@media (max-width: 480px) {
  .cards-grid { grid-template-columns: 1fr; }
  .gallery { grid-template-columns: 1fr; }
  .why-grid { grid-template-columns: 1fr; }
  .footer-grid { grid-template-columns: 1fr; }
}
</style>
