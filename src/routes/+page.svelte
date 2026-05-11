<script>
  import { onMount } from 'svelte';

  let visible = {};
  let statsAnimated = false;

  const stats = [
    { value: 4, suffix: '', label: 'Active Tanks' },
    { value: 12, suffix: '+', label: 'Plant Varieties' },
    { value: 24, suffix: '/7', label: 'Live Monitoring' },
    { value: 340, suffix: '%', label: 'Projected Yield Growth' },
  ];

  const automationFeatures = [
    { icon: '⬡', title: 'pH Precision', desc: 'Atlas Scientific EZO probes measure pH continuously. Automated dosing corrects deviations within minutes, not hours.' },
    { icon: '◈', title: 'Dissolved Oxygen', desc: 'Real-time DO sensors ensure fish thrive at optimal saturation. Alerts trigger before stress conditions develop.' },
    { icon: '◉', title: 'Nutrient Intelligence', desc: 'EC and ORP sensors map nutrient density across grow beds, enabling AI-driven feed scheduling for maximum uptake.' },
    { icon: '⬟', title: 'Climate Control', desc: 'Temperature, humidity, and light sensors across the entire facility. Every parameter logged, every anomaly flagged.' },
    { icon: '◈', title: 'Computer Vision', desc: 'Planned camera arrays will detect plant stress, fish behavior anomalies, and pest incursions automatically.' },
    { icon: '⬡', title: 'Predictive Analytics', desc: 'AI models forecast harvest windows, equipment failure, and yield potential weeks in advance.' },
  ];

  const species = [
    {
      category: 'Premium Fish',
      items: ['Sturgeon (Acipenser)',  'Koi — ornamental & edible hybrids', 'Tilapia — selective strain development', 'Pangasius — controlled breeding program'],
      img: 'https://images.unsplash.com/photo-1571752726703-5e7d1f6a986d?auto=format&fit=crop&w=800&q=80',
    },
    {
      category: 'Exclusive Plants',
      items: ['Dragon Fruit — rare pitaya cultivars', 'Heritage grape varieties', 'Rare chilli lineages (heat-mapped selection)', 'Cross-pollinated herb blends'],
      img: 'https://images.unsplash.com/photo-1464226184884-fa280b87c399?auto=format&fit=crop&w=800&q=80',
    },
  ];

  const investmentTiers = [
    {
      name: 'Seed',
      amount: '$500',
      period: 'min. investment',
      perks: [
        'Quarterly impact reports',
        'Annual harvest package delivery',
        'Digital farm updates & live feed access',
        'Certificate of stewardship',
      ],
      accent: '#c9a84c',
    },
    {
      name: 'Growth',
      amount: '$2,500',
      period: 'min. investment',
      featured: true,
      perks: [
        'All Seed tier benefits',
        'Annual in-person site visit',
        'Revenue sharing from Year 2',
        'Priority allocation on premium harvests',
        'Exclusive investor calls',
      ],
      accent: '#2d6a4f',
    },
    {
      name: 'Partner',
      amount: '$10,000',
      period: 'min. investment',
      perks: [
        'All Growth tier benefits',
        'Advisory board seat',
        'Custom species / variety naming rights',
        'Full financial transparency access',
        'Co-branding opportunities',
      ],
      accent: '#0d2818',
    },
  ];

  // Photo gallery slots — replace src with real photos when available
  const gallerySlots = [
    { src: 'https://images.unsplash.com/photo-1585320806297-9794b3e4aaae?auto=format&fit=crop&w=800&q=80', caption: 'Main aquaponics system — Tank Row A', ready: true },
    { src: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=800&q=80', caption: 'Fish habitat monitoring', ready: true },
    { src: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?auto=format&fit=crop&w=800&q=80', caption: 'Grow bed production — Week 6', ready: true },
    { src: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80', caption: 'Sensor array & Raspberry Pi control hub', ready: true },
    { src: null, caption: 'Dragon fruit cultivation — Coming soon', ready: false },
    { src: null, caption: 'Harvest day — Coming soon', ready: false },
  ];

  // Video slots — replace with real video embeds or file src
  const videoSlots = [
    { label: 'System Walkthrough', placeholder: true },
    { label: 'AI Monitoring Demo', placeholder: true },
  ];

  let counters = {};

  onMount(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const key = entry.target.dataset.reveal;
            if (key) visible[key] = true, (visible = visible);

            if (entry.target.dataset.stats && !statsAnimated) {
              statsAnimated = true;
              document.querySelectorAll('.stat-number').forEach((el) => {
                const target = parseInt(el.dataset.target, 10);
                let current = 0;
                const step = Math.ceil(target / 60);
                const timer = setInterval(() => {
                  current = Math.min(current + step, target);
                  el.textContent = current;
                  if (current >= target) clearInterval(timer);
                }, 20);
              });
            }
          }
        });
      },
      { threshold: 0.12 }
    );

    document.querySelectorAll('[data-reveal], [data-stats]').forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  });
</script>

<!-- ══════════════════════ NAV ══════════════════════ -->
<nav>
  <div class="nav-inner">
    <a href="/" class="logo">
      <span class="logo-main">SGGA<span class="logo-ai">·AI</span></span>
      <span class="logo-sub">Sustainable Green Gold AI</span>
    </a>
    <ul class="nav-links">
      <li><a href="#aquaponics">Ecosystem</a></li>
      <li><a href="#automation">Automation</a></li>
      <li><a href="#species">Species</a></li>
      <li><a href="#media">Media</a></li>
      <li><a href="#invest" class="nav-cta">Invest</a></li>
    </ul>
  </div>
</nav>

<!-- ══════════════════════ HERO ══════════════════════ -->
<section class="hero">
  <div class="hero-bg">
    <img
      src="https://images.unsplash.com/photo-1560942484-a9a4c2fc3c61?auto=format&fit=crop&w=1920&q=80"
      alt="Lush aquaponics ecosystem"
      class="hero-img"
    />
    <div class="hero-overlay" />
  </div>
  <div class="hero-content">
    <p class="hero-eyebrow">Chiang Rai, Thailand · Est. 2023</p>
    <h1 class="hero-title">
      Nature.<br />
      <em>Intelligence.</em><br />
      Abundance.
    </h1>
    <p class="hero-lead">
      We are building the world's most intelligent closed-loop aquaponics ecosystem — merging 
      ancient biological wisdom with precision AI monitoring, exclusive species cultivation, 
      and zero-waste design.
    </p>
    <div class="hero-actions">
      <a href="#aquaponics" class="btn btn-gold">Explore Our System</a>
      <a href="#invest" class="btn btn-outline">Invest With Us</a>
    </div>
  </div>
  <div class="hero-scroll">
    <span>Scroll</span>
    <div class="scroll-line" />
  </div>
</section>

<!-- ══════════════════════ STATS ══════════════════════ -->
<section class="stats-bar" data-stats data-reveal="stats">
  <div class="stats-inner" class:visible={visible['stats']}>
    {#each stats as stat, i}
      <div class="stat-item" style="animation-delay: {i * 0.1}s">
        <div class="stat-number-wrap">
          <span class="stat-number" data-target={stat.value}>{stat.value}</span>
          <span class="stat-suffix">{stat.suffix}</span>
        </div>
        <span class="stat-label">{stat.label}</span>
      </div>
    {/each}
  </div>
</section>

<!-- ══════════════════════ AQUAPONICS ══════════════════════ -->
<section id="aquaponics" class="section section-light">
  <div class="container" data-reveal="aqua">
    <div class="section-header" class:visible={visible['aqua']}>
      <p class="eyebrow">Section 01 — Operations</p>
      <h2>A Living Ecosystem, <em>Already Thriving</em></h2>
      <p class="section-lead">
        Our aquaponics facility is not a pilot — it is an operational, producing system. Fish, 
        plants, and microbiomes coexist in a precisely tuned loop. Every component has been 
        tested, refined, and measured. We grow real food, in real volume, right now.
      </p>
    </div>

    <div class="two-col" class:visible={visible['aqua']}>
      <div class="col-text">
        <h3>How Our System Works</h3>
        <p>
          Fish waste becomes plant nutrition. Plants purify the water. Water returns to the fish. 
          This ancient symbiosis, accelerated by sensors and data, produces yields that soil 
          farming cannot match — using a fraction of the water and zero synthetic fertilisers.
        </p>
        <ul class="check-list">
          <li>IBC tank infrastructure — modular, scalable, HDPE-grade</li>
          <li>Continuous fish biomass monitoring and feeding optimization</li>
          <li>Multi-stage grow bed system with flood-and-drain cycles</li>
          <li>Real-time water chemistry tracked across all tanks</li>
          <li>Closed-loop water recycling — 95% less water than soil farming</li>
          <li>Zero pesticides. Zero synthetic fertilisers. Full traceability.</li>
        </ul>
        <a href="#invest" class="btn btn-gold" style="margin-top: 2rem">Join Our Journey</a>
      </div>
      <div class="col-media">
        <div class="img-stack">
          <img
            src="https://images.unsplash.com/photo-1585320806297-9794b3e4aaae?auto=format&fit=crop&w=700&q=80"
            alt="Aquaponics system grow beds"
            class="img-primary"
          />
          <img
            src="https://images.unsplash.com/photo-1416879595882-3373a0480b5b?auto=format&fit=crop&w=400&q=80"
            alt="Plant growth close-up"
            class="img-secondary"
          />
        </div>
      </div>
    </div>
  </div>
</section>

<!-- ══════════════════════ AUTOMATION ══════════════════════ -->
<section id="automation" class="section section-dark">
  <div class="container" data-reveal="auto">
    <div class="section-header section-header-light" class:visible={visible['auto']}>
      <p class="eyebrow eyebrow-gold">Section 02 — Intelligence</p>
      <h2>The <em>AI Layer</em> Is Coming</h2>
      <p class="section-lead light">
        We are installing an end-to-end sensor network across every tank, grow bed, and climate 
        zone. Every variable measured. Every pattern learned. Every decision informed — 
        and eventually, autonomous.
      </p>
    </div>

    <div class="tech-hero" class:visible={visible['auto']}>
      <img
        src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=1200&q=80"
        alt="Sensor and automation technology"
        class="tech-img"
      />
      <div class="tech-overlay-text">
        <p class="tech-tagline">Atlas Scientific EZO probes · Raspberry Pi clusters · Custom AI models</p>
      </div>
    </div>

    <div class="features-grid" class:visible={visible['auto']}>
      {#each automationFeatures as feature, i}
        <div class="feature-card" style="animation-delay: {i * 0.08}s">
          <div class="feature-icon">{feature.icon}</div>
          <h4>{feature.title}</h4>
          <p>{feature.desc}</p>
        </div>
      {/each}
    </div>

    <div class="timeline" class:visible={visible['auto']}>
      <p class="eyebrow eyebrow-gold" style="margin-bottom: 1rem">Deployment Roadmap</p>
      <div class="timeline-items">
        <div class="t-item done"><span class="t-dot" /><div><strong>Phase 1 — Complete</strong><p>pH, DO, EC, ORP sensors operational. HTTP sensor server live. iOS monitoring app deployed.</p></div></div>
        <div class="t-item active"><span class="t-dot" /><div><strong>Phase 2 — In Progress</strong><p>Expanding sensor network to all tanks. Automated dosing pumps. Alert thresholds and notification system.</p></div></div>
        <div class="t-item"><span class="t-dot" /><div><strong>Phase 3 — Planned</strong><p>Computer vision cameras. Predictive ML models for harvest forecasting. Full dashboard with investor access.</p></div></div>
        <div class="t-item"><span class="t-dot" /><div><strong>Phase 4 — Vision</strong><p>Autonomous farm management. AI-driven breeding programs. Multi-site deployment with unified data layer.</p></div></div>
      </div>
    </div>
  </div>
</section>

<!-- ══════════════════════ SPECIES ══════════════════════ -->
<section id="species" class="section section-cream">
  <div class="container" data-reveal="species">
    <div class="section-header" class:visible={visible['species']}>
      <p class="eyebrow">Section 03 — Cultivation</p>
      <h2>Exclusive Species. <em>Deliberate Selection.</em></h2>
      <p class="section-lead">
        We do not grow commodity crops. We identify, source, and cultivate varieties of exceptional 
        quality, rarity, and commercial value — then refine them through controlled cross-pollination 
        and selective breeding programs that no conventional farm attempts.
      </p>
    </div>

    <div class="species-grid" class:visible={visible['species']}>
      {#each species as sp, i}
        <div class="species-card" style="animation-delay: {i * 0.15}s">
          <div class="species-img-wrap">
            <img src={sp.img} alt={sp.category} />
            <div class="species-label">{sp.category}</div>
          </div>
          <div class="species-body">
            <ul>
              {#each sp.items as item}
                <li>{item}</li>
              {/each}
            </ul>
          </div>
        </div>
      {/each}
    </div>

    <div class="cross-pollination-box" class:visible={visible['species']}>
      <div class="cp-text">
        <h3>Cross-Pollination Program</h3>
        <p>
          Our resident botanist conducts controlled hand-pollination experiments across chilli, 
          grape, and medicinal herb lines — selecting for aroma, heat profile, yield, and 
          disease resistance. Results are logged, sequenced, and refined over successive 
          generations. The long game: proprietary cultivars owned exclusively by SGGA·AI.
        </p>
        <p>
          Fish habitat engineering runs parallel: water temperature, mineral balance, and 
          photoperiod are adjusted per species to encourage premium growth rates and 
          coloration — particularly in our Koi and Sturgeon development lines.
        </p>
      </div>
      <div class="cp-stat">
        <span class="big-number">6</span>
        <span class="big-label">Active breeding<br />programs underway</span>
      </div>
    </div>
  </div>
</section>

<!-- ══════════════════════ MEDIA GALLERY ══════════════════════ -->
<section id="media" class="section section-dark">
  <div class="container" data-reveal="media">
    <div class="section-header section-header-light" class:visible={visible['media']}>
      <p class="eyebrow eyebrow-gold">Section 04 — Media</p>
      <h2>From the <em>Farm Floor</em></h2>
      <p class="section-lead light">
        A live record of our operations. This gallery grows as we document every milestone, 
        breakthrough, and harvest. Return often — new content is added weekly.
      </p>
    </div>

    <!-- Photo Grid -->
    <div class="gallery-grid" class:visible={visible['media']}>
      {#each gallerySlots as slot, i}
        <div class="gallery-slot" style="animation-delay: {i * 0.07}s">
          {#if slot.ready && slot.src}
            <img src={slot.src} alt={slot.caption} />
          {:else}
            <div class="gallery-placeholder">
              <span class="ph-icon">＋</span>
              <span class="ph-text">Photo Coming Soon</span>
            </div>
          {/if}
          <div class="gallery-caption">{slot.caption}</div>
        </div>
      {/each}
    </div>

    <!-- Video Grid -->
    <div class="video-section" class:visible={visible['media']}>
      <p class="eyebrow eyebrow-gold" style="margin-bottom: 1.5rem">Video Documentation</p>
      <div class="video-grid">
        {#each videoSlots as vid}
          <div class="video-slot">
            <!--
              TO ADD VIDEO: Replace this placeholder with one of:
              <video src="/videos/your-file.mp4" controls poster="/images/thumb.jpg"></video>
              — or —
              <iframe src="https://www.youtube.com/embed/VIDEO_ID" frameborder="0" allowfullscreen></iframe>
            -->
            <div class="video-placeholder">
              <div class="play-btn">▶</div>
              <span>{vid.label}</span>
              <small>Video will be added here</small>
            </div>
          </div>
        {/each}
      </div>
    </div>
  </div>
</section>

<!-- ══════════════════════ INVESTMENT ══════════════════════ -->
<section id="invest" class="section section-gold-hero">
  <div class="container" data-reveal="invest">
    <div class="section-header" class:visible={visible['invest']}>
      <p class="eyebrow">Section 05 — Crowdfunding</p>
      <h2>Invest in the <em>Future of Food</em></h2>
      <p class="section-lead">
        We are opening a limited round of community investment. This is not a speculative venture — 
        we are an operating farm with verified output, clear expansion plans, and a technology 
        stack that positions us years ahead of conventional agriculture. Join us before we scale.
      </p>
    </div>

    <!-- Progress bar -->
    <div class="funding-progress" class:visible={visible['invest']}>
      <div class="fp-header">
        <span class="fp-raised"><strong>$42,000</strong> raised</span>
        <span class="fp-goal">Goal: $200,000</span>
      </div>
      <div class="fp-bar-wrap">
        <div class="fp-bar" style="width: 21%" />
      </div>
      <div class="fp-footer">
        <span>21% funded</span>
        <span>38 investors</span>
        <span>Round closes Dec 2025</span>
      </div>
    </div>

    <div class="tiers-grid" class:visible={visible['invest']}>
      {#each investmentTiers as tier, i}
        <div class="tier-card" class:featured={tier.featured} style="animation-delay: {i * 0.1}s; --accent: {tier.accent}">
          {#if tier.featured}
            <div class="tier-badge">Most Popular</div>
          {/if}
          <div class="tier-name">{tier.name}</div>
          <div class="tier-amount">{tier.amount}</div>
          <div class="tier-period">{tier.period}</div>
          <ul class="tier-perks">
            {#each tier.perks as perk}
              <li>{perk}</li>
            {/each}
          </ul>
          <a href="mailto:invest@sgga.ai?subject=Investment%20Enquiry%20—%20{tier.name}%20Tier" class="btn btn-tier">
            Apply for {tier.name}
          </a>
        </div>
      {/each}
    </div>

    <div class="why-invest" class:visible={visible['invest']}>
      <h3>Why Invest in SGGA·AI?</h3>
      <div class="why-grid">
        <div class="why-item"><span class="why-icon">⬡</span><h4>Real Production</h4><p>Not a concept. An operating farm with measurable output, live monitoring, and expanding capacity.</p></div>
        <div class="why-item"><span class="why-icon">◈</span><h4>Technology Moat</h4><p>Custom AI monitoring stack built in-house. Proprietary cultivar programs. Vertical integration from fish to fork.</p></div>
        <div class="why-item"><span class="why-icon">◉</span><h4>Global Market</h4><p>Positioned for MENA, Asia, and African premium food markets — where sustainable protein demand is accelerating fastest.</p></div>
        <div class="why-item"><span class="why-icon">⬟</span><h4>Transparent Governance</h4><p>Growth-tier and above investors receive full financial access. No hidden metrics. No opaque structures.</p></div>
      </div>
    </div>
  </div>
</section>

<!-- ══════════════════════ CTA BANNER ══════════════════════ -->
<section class="cta-banner">
  <div class="cta-inner">
    <h2>Ready to grow with us?</h2>
    <p>Contact our team for a full investor deck, farm tour, or partnership discussion.</p>
    <div class="cta-actions">
      <a href="mailto:invest@sgga.ai" class="btn btn-gold">Request Investor Deck</a>
      <a href="mailto:hello@sgga.ai" class="btn btn-outline-dark">General Enquiry</a>
    </div>
  </div>
</section>

<!-- ══════════════════════ FOOTER ══════════════════════ -->
<footer>
  <div class="footer-inner">
    <div class="footer-brand">
      <span class="logo-main" style="font-size: 1.4rem">SGGA<span class="logo-ai">·AI</span></span>
      <p>Sustainable Green Gold AI<br />Chiang Rai, Thailand</p>
    </div>
    <div class="footer-links">
      <h5>Navigate</h5>
      <a href="#aquaponics">Ecosystem</a>
      <a href="#automation">Automation</a>
      <a href="#species">Species</a>
      <a href="#media">Media</a>
      <a href="#invest">Invest</a>
    </div>
    <div class="footer-links">
      <h5>Contact</h5>
      <a href="mailto:invest@sgga.ai">invest@sgga.ai</a>
      <a href="mailto:hello@sgga.ai">hello@sgga.ai</a>
    </div>
    <div class="footer-note">
      <p>© 2025 Sustainable Green Gold AI.<br />All rights reserved.</p>
      <p style="margin-top: 0.5rem; opacity: 0.5; font-size: 0.75rem">Investment involves risk. Past performance does not guarantee future results.</p>
    </div>
  </div>
</footer>

<style>
  /* ── TOKENS ── */
  :global(*) { box-sizing: border-box; margin: 0; padding: 0; }
  :global(html) { scroll-behavior: smooth; }
  :global(body) {
    font-family: 'Jost', sans-serif;
    color: #1a1a1a;
    background: #faf8f5;
    line-height: 1.7;
  }

  /* ── NAV ── */
  nav {
    position: fixed; top: 0; left: 0; right: 0; z-index: 100;
    background: rgba(13, 40, 24, 0.92);
    backdrop-filter: blur(12px);
    border-bottom: 1px solid rgba(201, 168, 76, 0.2);
  }
  .nav-inner {
    max-width: 1280px; margin: 0 auto;
    display: flex; align-items: center; justify-content: space-between;
    padding: 1rem 2rem;
  }
  .logo { text-decoration: none; display: flex; flex-direction: column; }
  .logo-main {
    font-family: 'Cormorant Garamond', serif;
    font-size: 1.5rem; font-weight: 600;
    color: #f5f0e8; letter-spacing: 0.08em;
  }
  .logo-ai { color: #c9a84c; }
  .logo-sub { font-size: 0.65rem; color: rgba(245,240,232,0.5); letter-spacing: 0.15em; text-transform: uppercase; }
  .nav-links { list-style: none; display: flex; gap: 2rem; }
  .nav-links a { color: rgba(245,240,232,0.8); text-decoration: none; font-size: 0.85rem; letter-spacing: 0.06em; text-transform: uppercase; transition: color 0.2s; }
  .nav-links a:hover { color: #c9a84c; }
  .nav-cta {
    background: #c9a84c; color: #0d2818 !important;
    padding: 0.45rem 1.2rem; border-radius: 2px;
    font-weight: 600;
  }

  /* ── HERO ── */
  .hero {
    position: relative; min-height: 100vh;
    display: flex; align-items: center;
    overflow: hidden;
  }
  .hero-bg { position: absolute; inset: 0; }
  .hero-img { width: 100%; height: 100%; object-fit: cover; }
  .hero-overlay {
    position: absolute; inset: 0;
    background: linear-gradient(135deg, rgba(13,40,24,0.88) 0%, rgba(13,40,24,0.6) 60%, rgba(13,40,24,0.4) 100%);
  }
  .hero-content {
    position: relative; z-index: 2;
    max-width: 1280px; margin: 0 auto; padding: 8rem 2rem 4rem;
    max-width: 720px; margin-left: max(2rem, calc(50vw - 640px));
  }
  .hero-eyebrow {
    color: #c9a84c; font-size: 0.8rem;
    letter-spacing: 0.2em; text-transform: uppercase;
    margin-bottom: 1.5rem;
  }
  .hero-title {
    font-family: 'Cormorant Garamond', serif;
    font-size: clamp(3.5rem, 7vw, 6rem);
    font-weight: 300; line-height: 1.05;
    color: #f5f0e8; margin-bottom: 1.5rem;
  }
  .hero-title em { color: #c9a84c; font-style: italic; }
  .hero-lead {
    color: rgba(245,240,232,0.8); font-size: 1.1rem;
    font-weight: 300; max-width: 560px;
    margin-bottom: 2.5rem; line-height: 1.75;
  }
  .hero-actions { display: flex; gap: 1rem; flex-wrap: wrap; }
  .hero-scroll {
    position: absolute; bottom: 2.5rem; left: 50%; transform: translateX(-50%);
    display: flex; flex-direction: column; align-items: center; gap: 0.5rem;
    color: rgba(245,240,232,0.5); font-size: 0.7rem; letter-spacing: 0.15em;
    text-transform: uppercase;
  }
  .scroll-line {
    width: 1px; height: 40px;
    background: linear-gradient(to bottom, rgba(201,168,76,0.6), transparent);
    animation: scrollPulse 2s ease-in-out infinite;
  }
  @keyframes scrollPulse {
    0%, 100% { opacity: 0.4; transform: scaleY(1); }
    50% { opacity: 1; transform: scaleY(1.2); }
  }

  /* ── BUTTONS ── */
  .btn {
    display: inline-block; text-decoration: none;
    padding: 0.85rem 2rem; font-size: 0.85rem;
    letter-spacing: 0.1em; text-transform: uppercase;
    font-family: 'Jost', sans-serif; font-weight: 500;
    transition: all 0.25s; border-radius: 2px; cursor: pointer;
  }
  .btn-gold { background: #c9a84c; color: #0d2818; border: 2px solid #c9a84c; }
  .btn-gold:hover { background: #e8c96a; border-color: #e8c96a; }
  .btn-outline { background: transparent; color: #f5f0e8; border: 2px solid rgba(245,240,232,0.5); }
  .btn-outline:hover { border-color: #c9a84c; color: #c9a84c; }
  .btn-outline-dark { background: transparent; color: #0d2818; border: 2px solid #0d2818; }
  .btn-outline-dark:hover { background: #0d2818; color: #f5f0e8; }

  /* ── STATS BAR ── */
  .stats-bar { background: #0d2818; padding: 3rem 0; }
  .stats-inner {
    max-width: 1280px; margin: 0 auto; padding: 0 2rem;
    display: grid; grid-template-columns: repeat(4, 1fr); gap: 2rem;
    opacity: 0; transform: translateY(20px);
    transition: all 0.8s ease;
  }
  .stats-inner.visible { opacity: 1; transform: none; }
  .stat-item { text-align: center; }
  .stat-number-wrap {
    display: flex; align-items: flex-end; justify-content: center; gap: 0.1em;
  }
  .stat-number {
    font-family: 'Cormorant Garamond', serif;
    font-size: 3.5rem; font-weight: 300; color: #c9a84c; line-height: 1;
  }
  .stat-suffix { font-family: 'Cormorant Garamond', serif; font-size: 2rem; color: #c9a84c; margin-bottom: 0.3rem; }
  .stat-label { display: block; color: rgba(245,240,232,0.6); font-size: 0.75rem; letter-spacing: 0.15em; text-transform: uppercase; margin-top: 0.5rem; }

  /* ── SECTIONS ── */
  .section { padding: 7rem 0; }
  .section-light { background: #faf8f5; }
  .section-cream { background: #f0ebe0; }
  .section-dark { background: #0d2818; }
  .section-gold-hero { background: #faf8f5; }
  .container { max-width: 1280px; margin: 0 auto; padding: 0 2rem; }
  .section-header { max-width: 700px; margin: 0 auto 4rem; text-align: center; opacity: 0; transform: translateY(30px); transition: all 0.8s ease; }
  .section-header.visible { opacity: 1; transform: none; }
  .section-header-light { color: #f5f0e8; }
  .eyebrow { font-size: 0.72rem; letter-spacing: 0.25em; text-transform: uppercase; color: #2d6a4f; margin-bottom: 1rem; display: block; }
  .eyebrow-gold { color: #c9a84c; }
  h2 {
    font-family: 'Cormorant Garamond', serif;
    font-size: clamp(2.2rem, 4vw, 3.5rem);
    font-weight: 300; line-height: 1.15; margin-bottom: 1.25rem;
  }
  h2 em { color: #2d6a4f; font-style: italic; }
  .section-header-light h2 em { color: #c9a84c; }
  .section-lead { font-size: 1.05rem; color: #555; font-weight: 300; line-height: 1.8; }
  .section-lead.light { color: rgba(245,240,232,0.7); }

  /* ── TWO-COL ── */
  .two-col {
    display: grid; grid-template-columns: 1fr 1fr; gap: 5rem;
    align-items: center; opacity: 0; transform: translateY(30px);
    transition: all 0.9s ease 0.2s;
  }
  .two-col.visible { opacity: 1; transform: none; }
  .col-text h3 {
    font-family: 'Cormorant Garamond', serif;
    font-size: 1.8rem; font-weight: 500; margin-bottom: 1rem; color: #0d2818;
  }
  .col-text p { color: #555; margin-bottom: 1.5rem; }
  .check-list { list-style: none; }
  .check-list li {
    padding: 0.45rem 0 0.45rem 1.5rem;
    position: relative; color: #444; font-size: 0.95rem;
    border-bottom: 1px solid rgba(0,0,0,0.06);
  }
  .check-list li::before { content: '◆'; position: absolute; left: 0; color: #c9a84c; font-size: 0.6rem; top: 0.7rem; }

  /* ── IMG STACK ── */
  .img-stack { position: relative; height: 520px; }
  .img-primary {
    width: 80%; height: 440px; object-fit: cover;
    border-radius: 2px; position: absolute; top: 0; right: 0;
    box-shadow: 0 20px 60px rgba(0,0,0,0.15);
  }
  .img-secondary {
    width: 50%; height: 240px; object-fit: cover;
    border-radius: 2px; position: absolute; bottom: 0; left: 0;
    box-shadow: 0 12px 40px rgba(0,0,0,0.2);
    border: 4px solid #faf8f5;
  }

  /* ── TECH HERO ── */
  .tech-hero {
    position: relative; margin-bottom: 4rem; border-radius: 2px; overflow: hidden;
    opacity: 0; transform: scale(0.98);
    transition: all 0.8s ease 0.1s;
  }
  .tech-hero.visible { opacity: 1; transform: none; }
  .tech-img { width: 100%; height: 400px; object-fit: cover; display: block; }
  .tech-overlay-text {
    position: absolute; bottom: 0; left: 0; right: 0;
    background: linear-gradient(transparent, rgba(13,40,24,0.9));
    padding: 3rem 2rem 1.5rem;
  }
  .tech-tagline { color: rgba(245,240,232,0.7); font-size: 0.85rem; letter-spacing: 0.1em; }

  /* ── FEATURES GRID ── */
  .features-grid {
    display: grid; grid-template-columns: repeat(3, 1fr); gap: 1.5px;
    margin-bottom: 4rem; background: rgba(201,168,76,0.15);
    opacity: 0; transform: translateY(20px);
    transition: all 0.8s ease 0.2s;
  }
  .features-grid.visible { opacity: 1; transform: none; }
  .feature-card {
    background: rgba(255,255,255,0.04); padding: 2.5rem;
    transition: background 0.25s;
  }
  .feature-card:hover { background: rgba(255,255,255,0.08); }
  .feature-icon { font-size: 1.5rem; color: #c9a84c; margin-bottom: 1rem; display: block; }
  .feature-card h4 { color: #f5f0e8; font-family: 'Cormorant Garamond', serif; font-size: 1.25rem; font-weight: 500; margin-bottom: 0.6rem; }
  .feature-card p { color: rgba(245,240,232,0.6); font-size: 0.9rem; line-height: 1.7; }

  /* ── TIMELINE ── */
  .timeline {
    opacity: 0; transform: translateY(20px);
    transition: all 0.8s ease 0.3s;
  }
  .timeline.visible { opacity: 1; transform: none; }
  .timeline-items { display: flex; flex-direction: column; gap: 0; }
  .t-item {
    display: flex; gap: 1.5rem; padding: 1.5rem 0;
    border-bottom: 1px solid rgba(201,168,76,0.15);
  }
  .t-dot {
    width: 12px; height: 12px; border-radius: 50%;
    background: rgba(201,168,76,0.3); border: 2px solid rgba(201,168,76,0.4);
    flex-shrink: 0; margin-top: 0.35rem;
  }
  .t-item.done .t-dot { background: #c9a84c; border-color: #c9a84c; }
  .t-item.active .t-dot { background: #2d6a4f; border-color: #c9a84c; box-shadow: 0 0 0 4px rgba(201,168,76,0.2); }
  .t-item strong { color: #f5f0e8; display: block; margin-bottom: 0.3rem; }
  .t-item p { color: rgba(245,240,232,0.6); font-size: 0.9rem; margin: 0; }

  /* ── SPECIES ── */
  .species-grid {
    display: grid; grid-template-columns: 1fr 1fr; gap: 2rem; margin-bottom: 4rem;
    opacity: 0; transform: translateY(30px);
    transition: all 0.8s ease 0.1s;
  }
  .species-grid.visible { opacity: 1; transform: none; }
  .species-card { background: white; border-radius: 2px; overflow: hidden; box-shadow: 0 4px 30px rgba(0,0,0,0.08); }
  .species-img-wrap { position: relative; height: 280px; overflow: hidden; }
  .species-img-wrap img { width: 100%; height: 100%; object-fit: cover; transition: transform 0.5s ease; }
  .species-card:hover .species-img-wrap img { transform: scale(1.03); }
  .species-label {
    position: absolute; bottom: 1rem; left: 1rem;
    background: rgba(13,40,24,0.85); color: #c9a84c;
    padding: 0.4rem 1rem; font-size: 0.75rem; letter-spacing: 0.15em; text-transform: uppercase;
  }
  .species-body { padding: 2rem; }
  .species-body ul { list-style: none; }
  .species-body li {
    padding: 0.5rem 0 0.5rem 1.5rem; position: relative;
    border-bottom: 1px solid #f0ebe0; color: #444; font-size: 0.95rem;
  }
  .species-body li::before { content: '◆'; position: absolute; left: 0; color: #2d6a4f; font-size: 0.55rem; top: 0.75rem; }

  /* ── CROSS POLLINATION BOX ── */
  .cross-pollination-box {
    background: #0d2818; padding: 3.5rem; display: flex; gap: 3rem;
    align-items: center; border-radius: 2px;
    opacity: 0; transform: translateY(20px);
    transition: all 0.8s ease 0.3s;
  }
  .cross-pollination-box.visible { opacity: 1; transform: none; }
  .cp-text { flex: 1; }
  .cp-text h3 { font-family: 'Cormorant Garamond', serif; font-size: 1.8rem; color: #f5f0e8; margin-bottom: 1rem; font-weight: 400; }
  .cp-text p { color: rgba(245,240,232,0.7); font-size: 0.95rem; margin-bottom: 1rem; }
  .cp-stat { text-align: center; flex-shrink: 0; }
  .big-number { display: block; font-family: 'Cormorant Garamond', serif; font-size: 6rem; color: #c9a84c; line-height: 1; }
  .big-label { color: rgba(245,240,232,0.6); font-size: 0.8rem; letter-spacing: 0.1em; text-transform: uppercase; }

  /* ── GALLERY ── */
  .gallery-grid {
    display: grid; grid-template-columns: repeat(3, 1fr); gap: 1rem; margin-bottom: 3rem;
    opacity: 0; transform: translateY(20px);
    transition: all 0.8s ease 0.1s;
  }
  .gallery-grid.visible { opacity: 1; transform: none; }
  .gallery-slot { position: relative; aspect-ratio: 4/3; overflow: hidden; border-radius: 2px; background: rgba(255,255,255,0.04); }
  .gallery-slot img { width: 100%; height: 100%; object-fit: cover; transition: transform 0.4s; }
  .gallery-slot:hover img { transform: scale(1.04); }
  .gallery-placeholder { width: 100%; height: 100%; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 0.5rem; border: 1px dashed rgba(201,168,76,0.3); }
  .ph-icon { font-size: 2rem; color: rgba(201,168,76,0.4); }
  .ph-text { color: rgba(245,240,232,0.4); font-size: 0.8rem; }
  .gallery-caption {
    position: absolute; bottom: 0; left: 0; right: 0;
    background: linear-gradient(transparent, rgba(13,40,24,0.85));
    color: rgba(245,240,232,0.85); padding: 1.5rem 1rem 0.75rem;
    font-size: 0.78rem; letter-spacing: 0.04em;
  }

  /* ── VIDEO ── */
  .video-section {
    opacity: 0; transform: translateY(20px);
    transition: all 0.8s ease 0.3s;
  }
  .video-section.visible { opacity: 1; transform: none; }
  .video-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; }
  .video-slot { aspect-ratio: 16/9; background: rgba(255,255,255,0.03); border: 1px dashed rgba(201,168,76,0.3); border-radius: 2px; overflow: hidden; }
  .video-placeholder { width: 100%; height: 100%; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 0.75rem; color: rgba(245,240,232,0.5); }
  .play-btn { width: 56px; height: 56px; border: 2px solid rgba(201,168,76,0.4); border-radius: 50%; display: flex; align-items: center; justify-content: center; color: #c9a84c; font-size: 1rem; padding-left: 4px; }
  .video-placeholder span { font-size: 0.95rem; color: rgba(245,240,232,0.7); }
  .video-placeholder small { font-size: 0.75rem; color: rgba(245,240,232,0.35); }

  /* ── INVESTMENT ── */
  .funding-progress {
    background: #f0ebe0; padding: 2rem 2.5rem; border-radius: 2px;
    max-width: 700px; margin: 0 auto 4rem;
    opacity: 0; transform: translateY(20px);
    transition: all 0.8s ease 0.1s;
  }
  .funding-progress.visible { opacity: 1; transform: none; }
  .fp-header { display: flex; justify-content: space-between; margin-bottom: 0.75rem; }
  .fp-raised { font-size: 1.2rem; color: #0d2818; }
  .fp-raised strong { font-family: 'Cormorant Garamond', serif; font-size: 1.6rem; }
  .fp-goal { color: #666; font-size: 0.9rem; align-self: flex-end; }
  .fp-bar-wrap { height: 8px; background: rgba(0,0,0,0.1); border-radius: 4px; overflow: hidden; margin-bottom: 0.75rem; }
  .fp-bar { height: 100%; background: linear-gradient(to right, #2d6a4f, #c9a84c); border-radius: 4px; }
  .fp-footer { display: flex; justify-content: space-between; color: #666; font-size: 0.8rem; }

  .tiers-grid {
    display: grid; grid-template-columns: repeat(3, 1fr); gap: 1.5rem; margin-bottom: 5rem;
    opacity: 0; transform: translateY(30px);
    transition: all 0.9s ease 0.2s;
  }
  .tiers-grid.visible { opacity: 1; transform: none; }
  .tier-card {
    padding: 2.5rem 2rem; border: 1px solid rgba(0,0,0,0.1);
    border-radius: 2px; position: relative; background: white;
    transition: box-shadow 0.25s, transform 0.25s;
  }
  .tier-card:hover { box-shadow: 0 12px 40px rgba(0,0,0,0.1); transform: translateY(-4px); }
  .tier-card.featured { border-color: #2d6a4f; border-width: 2px; }
  .tier-badge { position: absolute; top: -1px; left: 50%; transform: translateX(-50%); background: #2d6a4f; color: white; font-size: 0.7rem; letter-spacing: 0.1em; padding: 0.3rem 1rem; text-transform: uppercase; }
  .tier-name { font-family: 'Cormorant Garamond', serif; font-size: 1.4rem; color: #0d2818; margin-bottom: 0.5rem; }
  .tier-amount { font-family: 'Cormorant Garamond', serif; font-size: 3rem; color: var(--accent, #0d2818); line-height: 1; margin-bottom: 0.25rem; }
  .tier-period { font-size: 0.75rem; color: #999; letter-spacing: 0.1em; text-transform: uppercase; margin-bottom: 1.5rem; padding-bottom: 1.5rem; border-bottom: 1px solid #f0ebe0; }
  .tier-perks { list-style: none; margin-bottom: 2rem; }
  .tier-perks li { padding: 0.4rem 0 0.4rem 1.25rem; position: relative; font-size: 0.9rem; color: #444; }
  .tier-perks li::before { content: '◆'; position: absolute; left: 0; color: #c9a84c; font-size: 0.5rem; top: 0.65rem; }
  .btn-tier { display: block; text-align: center; background: #0d2818; color: #f5f0e8; padding: 0.85rem; font-size: 0.8rem; letter-spacing: 0.1em; text-transform: uppercase; text-decoration: none; transition: background 0.2s; }
  .btn-tier:hover { background: #2d6a4f; }

  /* ── WHY INVEST ── */
  .why-invest {
    opacity: 0; transform: translateY(20px);
    transition: all 0.8s ease 0.3s;
  }
  .why-invest.visible { opacity: 1; transform: none; }
  .why-invest h3 { font-family: 'Cormorant Garamond', serif; font-size: 2rem; text-align: center; margin-bottom: 2.5rem; color: #0d2818; font-weight: 400; }
  .why-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 2rem; }
  .why-item { text-align: center; }
  .why-icon { font-size: 1.5rem; color: #2d6a4f; display: block; margin-bottom: 0.75rem; }
  .why-item h4 { font-family: 'Cormorant Garamond', serif; font-size: 1.2rem; color: #0d2818; margin-bottom: 0.5rem; }
  .why-item p { font-size: 0.88rem; color: #666; line-height: 1.7; }

  /* ── CTA BANNER ── */
  .cta-banner { background: #0d2818; padding: 6rem 2rem; text-align: center; }
  .cta-inner { max-width: 600px; margin: 0 auto; }
  .cta-banner h2 { font-family: 'Cormorant Garamond', serif; font-size: 2.8rem; color: #f5f0e8; font-weight: 300; margin-bottom: 1rem; }
  .cta-banner p { color: rgba(245,240,232,0.65); margin-bottom: 2rem; }
  .cta-actions { display: flex; gap: 1rem; justify-content: center; flex-wrap: wrap; }

  /* ── FOOTER ── */
  footer { background: #070f0a; padding: 4rem 2rem; }
  .footer-inner { max-width: 1280px; margin: 0 auto; display: grid; grid-template-columns: 2fr 1fr 1fr 2fr; gap: 3rem; }
  .footer-brand p { color: rgba(245,240,232,0.45); font-size: 0.85rem; margin-top: 0.75rem; line-height: 1.7; }
  .footer-links { display: flex; flex-direction: column; gap: 0.5rem; }
  .footer-links h5 { color: #c9a84c; font-size: 0.7rem; letter-spacing: 0.2em; text-transform: uppercase; margin-bottom: 0.5rem; }
  .footer-links a { color: rgba(245,240,232,0.5); text-decoration: none; font-size: 0.9rem; transition: color 0.2s; }
  .footer-links a:hover { color: #c9a84c; }
  .footer-note p { color: rgba(245,240,232,0.4); font-size: 0.85rem; }

  /* ── RESPONSIVE ── */
  @media (max-width: 900px) {
    .nav-links { display: none; }
    .two-col { grid-template-columns: 1fr; }
    .img-stack { height: 300px; }
    .stats-inner { grid-template-columns: repeat(2, 1fr); }
    .features-grid { grid-template-columns: 1fr 1fr; }
    .species-grid { grid-template-columns: 1fr; }
    .tiers-grid { grid-template-columns: 1fr; }
    .why-grid { grid-template-columns: 1fr 1fr; }
    .gallery-grid { grid-template-columns: 1fr 1fr; }
    .video-grid { grid-template-columns: 1fr; }
    .footer-inner { grid-template-columns: 1fr 1fr; }
    .cross-pollination-box { flex-direction: column; }
  }
  @media (max-width: 600px) {
    .features-grid { grid-template-columns: 1fr; }
    .gallery-grid { grid-template-columns: 1fr; }
    .why-grid { grid-template-columns: 1fr; }
    .stats-inner { grid-template-columns: repeat(2, 1fr); }
    .footer-inner { grid-template-columns: 1fr; }
  }
</style>
