<script>
  import { translations } from '$lib/i18n.js';
  import Seo from '$lib/Seo.svelte';
  import { onMount } from 'svelte';

  const R2 = 'https://media.sustainablegreengold.com';
  const MAP_EMBED = 'https://maps.google.com/maps?q=19.9953781,99.8888617&z=16&output=embed';
  const MAP_DIR = 'https://www.google.com/maps/dir/?api=1&destination=19.9953781,99.8888617';

  const mapCopy = {
    en: { title: 'Find the farm', directions: 'Get directions' },
    th: { title: 'แผนที่ฟาร์ม', directions: 'ดูเส้นทาง' }
  };

  let lang = 'en';

  $: t = translations[lang];
  $: mc = mapCopy[lang];

  function toggleLang() {
    lang = lang === 'en' ? 'th' : 'en';
  }

  function getVariant() {
    if (typeof document === 'undefined') return 'unknown';
    const m = document.cookie.match(/(?:^|; )ab_variant=([ab])/);
    return m ? m[1] : 'unknown';
  }

  function track(name, params = {}) {
    if (typeof window !== 'undefined' && typeof window.gtag === 'function') {
      window.gtag('event', name, {
        variant: getVariant(),
        ...params
      });
    }
  }

  let menuOpen = false;
  let scrolled = false;
  let visible = {};
  let statsTriggered = false;
  let phraseIndex = 0;
  let phraseVisible = true;

  $: cyclingPhrases = t.hero.cycling;
  $: currentPhrase = cyclingPhrases[phraseIndex];

  function toggleMenu() {
    menuOpen = !menuOpen;
  }

  function closeMenu() {
    menuOpen = false;
  }

  $: navLinks = [
    { label: t.nav.ecosystem, href: '#aquaponics' },
    { label: t.nav.automation, href: '#automation' },
    { label: t.nav.species, href: '#species' },
    { label: t.nav.media, href: '#media' },
    { label: t.nav.resources, href: '/resources' }
  ];

  $: stats = [
    { value: 6, suffix: '', label: t.stats[0].label },
    { value: 12, suffix: '+', label: t.stats[1].label },
    { value: 100, suffix: '%*', label: t.stats[2].label },
    { value: 0, suffix: '', label: t.stats[3].label }
  ];

  const cardIcons = ['⬡', '◈', '◉', '⬟', '◈', '⬡'];

  $: automationCards = t.auto.cards.map((c, i) => ({
    ...c,
    icon: cardIcons[i]
  }));

  const speciesColors = ['#0a3d62', '#1e5631', '#7f1d1d'];

  $: speciesItems = t.sp.items.map((s, i) => ({
    ...s,
    color: speciesColors[i]
  }));

  $: gallery = [
    {
      src: `${R2}/aquaponics/newgrowbedlines.jpg`,
      cap: t.med.gallery[0]
    },
    {
      src: `${R2}/aquaponics/tank2.jpg`,
      cap: t.med.gallery[1]
    },
    {
      src: `${R2}/sensors/chip.jpeg`,
      cap: t.med.gallery[2]
    },
    {
      src: `${R2}/plants/fig-fruit.jpg`,
      cap: t.med.gallery[3]
    },
    {
      src: `${R2}/aquaponics/firstgen.jpeg`,
      cap: t.med.gallery[4]
    },
    {
      src: `${R2}/aquaponics/my-system2.jpg`,
      cap: t.med.gallery[5]
    }
  ];

  const timelineStates = ['done', 'active', '', ''];

  $: timeline = t.auto.timeline.map((tl, i) => ({
    ...tl,
    state: timelineStates[i] || ''
  }));

  onMount(() => {
    const onScroll = () => {
      scrolled = window.scrollY > 40;
    };

    onScroll();

    window.addEventListener('scroll', onScroll, {
      passive: true
    });

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;

          const key = entry.target.dataset.reveal;

          if (key) {
            visible[key] = true;
            visible = visible;
          }

          if (entry.target.dataset.stats && !statsTriggered) {
            statsTriggered = true;

            entry.target.querySelectorAll('.snum').forEach((el) => {
              const target = Number(el.dataset.target || 0);

              if (target <= 0) {
                el.textContent = target;
                return;
              }

              let n = 0;
              const step = Math.max(1, Math.ceil(target / 55));

              const timer = setInterval(() => {
                n = Math.min(n + step, target);
                el.textContent = n;

                if (n >= target) {
                  clearInterval(timer);
                }
              }, 22);
            });
          }
        });
      },
      {
        threshold: 0.12
      }
    );

    document
      .querySelectorAll('[data-reveal],[data-stats]')
      .forEach((el) => observer.observe(el));

    const phraseTimer = setInterval(() => {
      phraseVisible = false;

      setTimeout(() => {
        phraseIndex =
          (phraseIndex + 1) % cyclingPhrases.length;

        currentPhrase = cyclingPhrases[phraseIndex];
        phraseVisible = true;
      }, 320);
    }, 3000);

    return () => {
      window.removeEventListener('scroll', onScroll);
      observer.disconnect();
      clearInterval(phraseTimer);
    };
  });
</script>

<Seo
  title="Aquaponics Systems In Thailand — Sustainable Green Gold AI"
  description="We design and install sensor-monitored aquaponics systems anywhere in Thailand — for vegetable farms and licensed cannabis growers alike. Fish feed the plants, the plants clean the water — zero fertilizer, a fraction of the water. Operational farm in Chiang Rai. "
  path="/"
/>

<header class:scrolled>
  <nav class="nav-inner">
    <a
      href="/"
      class="brand"
      on:click={closeMenu}
    >
      SGG<span class="brand-accent">·AI</span>
    </a>

    <ul class="desktop-links">
      {#each navLinks as link}
        <li>
          <a href={link.href} on:click={closeMenu}>
            {link.label}
          </a>
        </li>
      {/each}
    </ul>

    <div class="nav-right">
      <button
        class="lang-toggle"
        on:click={toggleLang}
        aria-label="Switch language"
      >
        {lang === 'en' ? '🇹🇭 ภาษาไทย' : '🇬🇧 English'}
      </button>

      <a
        href="/resorts"
        class="btn-nav"
        on:click={() =>
          track('cta_click', {
            location: 'nav_resorts'
          })}
      >
        {t.nav.resorts}
      </a>

      <button
        class="hamburger"
        class:open={menuOpen}
        on:click={toggleMenu}
        aria-label="Toggle menu"
        aria-expanded={menuOpen}
      >
        <span></span>
        <span></span>
        <span></span>
      </button>
    </div>
  </nav>

  <div class="mobile-menu" class:open={menuOpen}>
    {#each navLinks as link}
      <a href={link.href} on:click={closeMenu}>
        {link.label}
      </a>
    {/each}

    <a
      href="/resorts"
      class="m-cta"
      on:click={() => {
        closeMenu();
        track('cta_click', {
          location: 'mobile_nav_resorts'
        });
      }}
    >
      {t.nav.resorts} →
    </a>
  </div>
</header>

<section class="hero">
  <div class="hero-grid-lines"></div>
  <div class="hero-glow hero-glow-a"></div>
  <div class="hero-glow hero-glow-b"></div>

  <div class="hero-inner">
    <div class="hero-left">
      <div class="hero-kicker">
        <span class="status-dot"></span>
        {t.hero.badge}
        <span class="kicker-line"></span>
      </div>

      <h1>
        <span class="h1-static">
          {t.hero.h1_1}
        </span>

        <span class="h1-static">
          {t.hero.h1_2}
        </span>

        <span
          class="h1-accent"
          class:out={!phraseVisible}
        >
          {currentPhrase}
        </span>
      </h1>

      <p class="hero-sub">
        {t.hero.sub}
      </p>

      <div class="hero-btns">
        <a
          href="#aquaponics"
          class="btn-primary hero-primary"
        >
          {t.hero.btn1}
          <span>↗</span>
        </a>

        <a href="#automation" class="btn-ghost">
          {t.hero.btn2}
          <span>↓</span>
        </a>
      </div>

      <div class="trust-row">
        <span>{t.hero.trust1}</span>
        <i></i>
        <span>{t.hero.trust2}</span>
        <i></i>
        <span>{t.hero.trust3}</span>
      </div>
    </div>

    <div class="hero-right">
      <div class="hero-frame">
        <div class="frame-label frame-label-top">
          SGG / SYSTEM 01
        </div>

        <div class="frame-label frame-label-bottom">
          CHIANG RAI · THAILAND
        </div>

        <img
          class="hero-main-img"
          src={`${R2}/aquaponics/my-system1.jpg`}
          alt="Aquaponics system at Sustainable Green Gold"
          loading="eager"
        />

        <img
          class="hero-float-img"
          src={`${R2}/plants/fig-fruit.jpg`}
          alt="Fig fruit grown in the aquaponics system"
        />

        <div class="hero-metric metric-a">
          <strong>24/7</strong>
          <span>AI MONITORING</span>
        </div>

        <div class="hero-metric metric-b">
          <strong>100%</strong>
          <span>WATER RECYCLED*</span>
        </div>

        <div class="crosshair crosshair-a"></div>
        <div class="crosshair crosshair-b"></div>
      </div>
    </div>
  </div>
</section>

<div class="tech-strip">
  <div class="container strip-inner">
    <span class="strip-label">
      SGG / ENGINEERED FOR
    </span>

    <div class="strip-track">
      <div class="strip-items">
        <span>Sensor Networks</span>
        <b>·</b>

        <span>Edge Computing</span>
        <b>·</b>

        <span>AI Vision</span>
        <b>·</b>

        <span>Custom Probes</span>
        <b>·</b>

        <span>HDPE Infrastructure</span>
        <b>·</b>

        <span>Sensor Networks</span>
        <b>·</b>

        <span>Edge Computing</span>
        <b>·</b>

        <span>AI Vision</span>
        <b>·</b>

        <span>Custom Probes</span>
        <b>·</b>

        <span>HDPE Infrastructure</span>
        <b>·</b>
      </div>
    </div>
  </div>
</div>

<section
  class="stats-section"
  data-stats
  data-reveal="stats"
>
  <div class="container">
    <div class="stats-head">
      <span>AT A GLANCE</span>

      <p>
        Built around measurable system performance,
        not just appearance.
      </p>
    </div>

    <div
      class="stats-grid"
      class:vis={visible.stats}
    >
      {#each stats as stat, i}
        <div
          class="stat-block"
          style={`--delay:${i * 0.08}s`}
        >
          <div class="stat-val">
            <span
              class="snum"
              data-target={stat.value}
            >
              {stat.value}
            </span>

            <span class="stat-sfx">
              {stat.suffix}
            </span>
          </div>

          <p>{stat.label}</p>
        </div>
      {/each}
    </div>

    <p class="stats-note">
      * Excludes natural evaporation — atmospheric water
      recovery system in development.
    </p>
  </div>
</section>

<section
  id="installations"
  class="section bg-light"
  data-reveal="inst"
>
  <div class="container">
    <div
      class="section-intro"
      class:vis={visible.inst}
    >
      <div class="eyebrow">
        {t.inst.tag}
      </div>

      <h2>
        {t.inst.h2_1}
        <em>{t.inst.h2_2}</em>
      </h2>

      <p>{t.inst.sub}</p>
    </div>

    <div
      class="inst-cards"
      class:vis={visible.inst}
    >
      <article class="inst-card inst-dark">
        <div class="card-index">01</div>

        <div class="inst-badge">
          {t.inst.full.badge}
        </div>

        <h3>{t.inst.full.title}</h3>

        <p>{t.inst.full.body}</p>

        <ul>
          {#each t.inst.full.points as point}
            <li>{point}</li>
          {/each}
        </ul>
      </article>

      <article class="inst-card inst-lite">
        <div class="card-index">02</div>

        <div class="inst-badge">
          {t.inst.demo.badge}
        </div>

        <h3>{t.inst.demo.title}</h3>

        <p>{t.inst.demo.body}</p>

        <ul>
          {#each t.inst.demo.points as point}
            <li>{point}</li>
          {/each}
        </ul>
      </article>
    </div>

    <div
      class="section-cta"
      class:vis={visible.inst}
    >
      <a
        href="#contact"
        class="btn-primary"
        on:click={() =>
          track('cta_click', {
            location: 'installations'
          })}
      >
        {t.inst.btn}
        <span>↗</span>
      </a>
    </div>
  </div>
</section>

<section
  id="aquaponics"
  class="section bg-white"
  data-reveal="aq"
>
  <div class="container">
    <div
      class="split"
      class:vis={visible.aq}
    >
      <div class="split-imgs">
        <div class="image-index">
          SGG / 02
        </div>

        <img
          class="img-main"
          src={`${R2}/aquaponics/harvest.jpg`}
          alt="Harvest from an aquaponics system"
        />

        <img
          class="img-float"
          src={`${R2}/aquaponics/growbed2.jpg`}
          alt="Aquaponic grow bed detail"
        />

        <div class="image-rule"></div>
      </div>

      <div class="split-text">
        <div class="eyebrow">
          {t.aq.tag}
        </div>

        <h2>
          {t.aq.h2_1}
          <br />
          <em>{t.aq.h2_2}</em>
        </h2>

        <p class="lead-copy">
          {t.aq.p}
        </p>

        <ul class="cklist">
          {#each t.aq.items as item}
            <li>{item}</li>
          {/each}
        </ul>

        <a
          href="#contact"
          class="text-link"
          on:click={() =>
            track('cta_click', {
              location: 'ecosystem'
            })}
        >
          {t.aq.btn}
          <span>↗</span>
        </a>
      </div>
    </div>
  </div>
</section>

<section
  id="automation"
  class="section bg-navy"
  data-reveal="auto"
>
  <div class="container">
    <div
      class="section-intro dark"
      class:vis={visible.auto}
    >
      <div class="eyebrow">
        {t.auto.tag}
      </div>

      <h2>
        {t.auto.h2_1}
        <em>{t.auto.h2_2}</em>
      </h2>

      <p>{t.auto.sub}</p>
    </div>

    <div
      class="tech-banner"
      class:vis={visible.auto}
    >
      <img
        src={`${R2}/sensors/ssgai.jpg`}
        alt="SGG sensor and monitoring hardware"
      />

      <div class="tech-overlay"></div>

      <div class="tech-caption">
        <span>
          01 / MONITORING LAYER
        </span>

        <p>{t.auto.banner}</p>
      </div>

      <div class="scan-line"></div>
    </div>

    <div
      class="cards-grid"
      class:vis={visible.auto}
    >
      {#each automationCards as card, i}
        <article
          class="fcard"
          style={`--delay:${i * 0.07}s`}
        >
          <div class="fc-top">
            <span class="fc-ico">
              {card.icon}
            </span>

            <span>0{i + 1}</span>
          </div>

          <h4>{card.title}</h4>

          <p>{card.body}</p>
        </article>
      {/each}
    </div>

    <div
      class="timeline"
      class:vis={visible.auto}
    >
      <div class="timeline-label">
        SYSTEM DEVELOPMENT
      </div>

      {#each timeline as item, i}
        <div class="tl-row">
          <div class="tl-marker">
            <span
              class:done={item.state === 'done'}
              class:active={item.state === 'active'}
            ></span>
          </div>

          <div class="tl-copy">
            <strong>{item.label}</strong>
            <p>{item.desc}</p>
          </div>

          <div class="tl-number">
            0{i + 1}
          </div>
        </div>
      {/each}
    </div>
  </div>
</section>

<section
  id="species"
  class="section bg-white"
  data-reveal="sp"
>
  <div class="container">
    <div
      class="section-intro"
      class:vis={visible.sp}
    >
      <div class="eyebrow">
        {t.sp.tag}
      </div>

      <h2>
        {t.sp.h2_1}
        <br />
        <em>{t.sp.h2_2}</em>
      </h2>

      <p>{t.sp.sub}</p>
    </div>

    <div
      class="sp-row"
      class:vis={visible.sp}
    >
      {#each speciesItems as item, i}
        <article
          class="sp-card"
          style={`--accent:${item.color};--delay:${i * 0.08}s`}
        >
          <div class="sp-hdr">
            <span>{item.cat}</span>
            <b>0{i + 1}</b>
          </div>

          <ul>
            {#each item.items as value}
              <li>{value}</li>
            {/each}
          </ul>
        </article>
      {/each}
    </div>

    <div
      class="bento"
      class:vis={visible.sp}
    >
      <div class="bento-big">
        <img
          src={`${R2}/fish/fish-habitat.jpeg`}
          alt="Fish habitat in the aquaponics system"
        />

        <div class="bento-cap">
          <span>FIELD IMAGE</span>
          {t.sp.bento_cap}
        </div>
      </div>

      <div class="bento-small">
        <div class="bento-stat">
          <span class="bs-n">6</span>

          <span class="bs-l">
            {t.sp.bento_stat}
          </span>

          <span class="stat-corner">
            SGG
          </span>
        </div>

        <img
          src={`${R2}/plants/perm2.jpeg`}
          alt="Plants growing in the system"
          class="bento-img2"
        />

        <div class="bento-txt">
          <div class="mini-label">
            CULTIVATION
          </div>

          <h4>{t.sp.bento_h4}</h4>

          <p>{t.sp.bento_p}</p>
        </div>
      </div>
    </div>
  </div>
</section>

<section
  id="media"
  class="section bg-light"
  data-reveal="med"
>
  <div class="container">
    <div
      class="section-intro"
      class:vis={visible.med}
    >
      <div class="eyebrow">
        {t.med.tag}
      </div>

      <h2>
        {t.med.h2_1}
        <em>{t.med.h2_2}</em>
      </h2>

      <p>{t.med.sub}</p>
    </div>

    <div
      class="gallery"
      class:vis={visible.med}
    >
      {#each gallery as item, i}
        <figure
          class="g-slot"
          style={`--delay:${i * 0.05}s`}
        >
          <img
            src={item.src}
            alt={item.cap}
            loading="lazy"
          />

          <figcaption>
            <span>0{i + 1}</span>
            {item.cap}
          </figcaption>
        </figure>
      {/each}
    </div>

    <div
      class="vid-row"
      class:vis={visible.med}
    >
      {#each t.med.videos as video, i}
        <div class="vid-slot">
          <div class="vid-ph">
            <div class="play-ring">
              ▶
            </div>

            <span>{video}</span>

            <small>
              Video placeholder
            </small>

            <b>0{i + 1}</b>
          </div>
        </div>
      {/each}
    </div>

    <div
      class="section-cta"
      class:vis={visible.med}
    >
      <a
        href={lang === 'th'
          ? '/Smart_Polyponics_TH.pdf'
          : '/Smart_Polyponics_EN.pdf'}
        target="_blank"
        rel="noopener"
        class="btn-dark"
        on:click={() =>
          track('presentation_view', {
            lang
          })}
      >
        {t.med.btn}
        <span>↗</span>
      </a>
    </div>
  </div>
</section>

<section id="contact" class="final-cta">
  <div class="cta-grid-lines"></div>

  <div class="container cta-inner">
    <div class="eyebrow light">
      SGG / START A CONVERSATION
    </div>

    <h2>{t.contact.h2}</h2>

    <p>{t.contact.p}</p>

    <div class="cta-row">
      <a
        href="https://line.me/ti/p/eZ2GG61uIe"
        class="btn-primary"
        target="_blank"
        rel="noopener"
        on:click={() =>
          track('line_click', {
            location: 'contact_main'
          })}
      >
        {t.contact.btn1}
        <span>↗</span>
      </a>

      <a
        href="mailto:contact@sustainablegreengold.com?subject=Aquaponics%20system%20enquiry"
        class="btn-outline-dark"
        on:click={() =>
          track('email_click', {
            location: 'contact_main'
          })}
      >
        {t.contact.btn3}
      </a>

      <a
        href="#aquaponics"
        class="btn-outline-dark"
      >
        {t.contact.btn2}
      </a>
    </div>
  </div>
</section>

<footer>
  <div class="container footer-grid">
    <div class="footer-main">
      <div class="footer-brand">
        SGG<span>·AI</span>
      </div>

      <p>
        Sustainable Green Gold AI
      </p>

      <div class="social-links">
        <a
          href="https://line.me/ti/p/carbonbasedlife"
          target="_blank"
          rel="noopener"
          class="social-icon"
          title="LINE"
          aria-label="LINE"
        >
          LINE
        </a>

        <a
          href="https://facebook.com/profile.php?id=61556530944739"
          target="_blank"
          rel="noopener"
          class="social-icon"
          title="Facebook"
          aria-label="Facebook"
        >
          FB
        </a>

        <a
          href="https://instagram.com/sustainablegreengold"
          target="_blank"
          rel="noopener"
          class="social-icon"
          title="Instagram"
          aria-label="Instagram"
        >
          IG
        </a>

        <a
          href="https://twl.ae/sustainablegreengold"
          target="_blank"
          rel="noopener"
          class="social-icon"
          title="Tawasal"
          aria-label="Tawasal"
        >
          TW
        </a>

        <a
          href="https://www.tiktok.com/@digital.farm.cr"
          target="_blank"
          rel="noopener"
          class="social-icon"
          title="TikTok"
          aria-label="TikTok"
        >
          TK
        </a>
      </div>
    </div>

    <div class="footer-col">
      <h5>{t.footer.nav_title}</h5>

      {#each navLinks as link}
        <a href={link.href}>
          {link.label}
        </a>
      {/each}

      <a href="#contact">
        {t.nav.contact}
      </a>
    </div>

    <div class="footer-col">
      <h5>{t.footer.contact_title}</h5>

      <a href="mailto:contact@sustainablegreengold.com">
        contact@sustainablegreengold.com
      </a>

      <span>065 227 8077</span>
    </div>

    <div class="footer-note">
      <p>{t.footer.rights}</p>
      <p>{t.footer.location}</p>

      <div class="foot-map">
        <h5>{mc.title}</h5>

        <div class="foot-map-frame">
          <iframe
            src={MAP_EMBED}
            title="Sustainable Green Gold — Chiang Rai"
            loading="lazy"
            referrerpolicy="no-referrer-when-downgrade"
            allowfullscreen
          ></iframe>
        </div>

        <a
          class="foot-dir"
          href={MAP_DIR}
          target="_blank"
          rel="noopener"
          on:click={() =>
            track('directions_click', {
              location: 'footer'
            })}
        >
          {mc.directions} →
        </a>
      </div>
    </div>
  </div>
</footer>

<style>
  :global(*),
  :global(*::before),
  :global(*::after) {
    box-sizing: border-box;
  }

  :global(html) {
    scroll-behavior: smooth;
  }

  :global(body) {
    margin: 0;
    font-family: "Manrope", "Inter", system-ui, sans-serif;
    color: #111827;
    background: #fff;
    -webkit-font-smoothing: antialiased;
    line-height: 1.6;
  }

  :global(a) {
    -webkit-tap-highlight-color: transparent;
  }

  :global(button) {
    font: inherit;
  }

  :global(::selection) {
    background: #ff5c2a;
    color: #fff;
  }

  :global(.page) {
    overflow: hidden;
  }

  :global(:root) {
    --navy: #050d1e;
    --navy-2: #08142a;
    --orange: #ff5c2a;
    --light: #f4f6f8;
    --muted: #667085;
    --line: #e4e7ec;
    --max: 1240px;
  }

  .container {
    width: min(var(--max), calc(100% - 48px));
    margin: 0 auto;
  }

  /* NAV */

  header {
    position: fixed;
    inset: 0 0 auto;
    z-index: 200;
    color: #fff;
    border-bottom: 1px solid transparent;
    transition:
      background 0.35s ease,
      border-color 0.35s ease,
      box-shadow 0.35s ease,
      color 0.35s ease;
  }

  header.scrolled {
    color: var(--navy);
    background: rgba(255, 255, 255, 0.96);
    border-color: #e5e7eb;
    box-shadow: 0 8px 30px rgba(5, 13, 30, 0.07);
    backdrop-filter: blur(16px);
  }

  .nav-inner {
    width: min(var(--max), calc(100% - 48px));
    height: 76px;
    margin: auto;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 30px;
  }

  .brand {
    color: #fff;
    text-decoration: none;
    font-size: 1.28rem;
    line-height: 1;
    font-weight: 900;
    letter-spacing: -0.055em;
    transition: color 0.3s ease;
  }

  header.scrolled .brand {
    color: var(--navy);
  }

  .brand-accent {
    color: rgba(255, 255, 255, 0.45);
    transition: color 0.3s ease;
  }

  header.scrolled .brand-accent {
    color: var(--orange);
  }

  .desktop-links {
    list-style: none;
    display: flex;
    align-items: center;
    gap: 26px;
    margin: 0;
    padding: 0;
  }

  .desktop-links a {
    color: rgba(255, 255, 255, 0.68);
    text-decoration: none;
    font-size: 0.68rem;
    font-weight: 750;
    transition: color 0.2s ease;
  }

  .desktop-links a:hover {
    color: #fff;
  }

  header.scrolled .desktop-links a {
    color: #667085;
  }

  header.scrolled .desktop-links a:hover {
    color: var(--navy);
  }

  .nav-right {
    display: flex;
    align-items: center;
    gap: 9px;
  }

  .lang-toggle,
  .btn-nav {
    height: 38px;
    padding: 0 14px;
    border-radius: 5px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    text-decoration: none;
    font-size: 0.62rem;
    font-weight: 800;
    cursor: pointer;
  }

  .lang-toggle {
    color: rgba(255, 255, 255, 0.7);
    background: transparent;
    border: 1px solid rgba(255, 255, 255, 0.16);
  }

  .lang-toggle:hover {
    color: #fff;
    border-color: rgba(255, 255, 255, 0.38);
  }

  header.scrolled .lang-toggle {
    color: #475467;
    border-color: #d0d5dd;
  }

  .btn-nav {
    color: #fff;
    background: var(--orange);
    border: 1px solid var(--orange);
    transition: transform 0.2s ease, box-shadow 0.2s ease;
  }

  .btn-nav:hover {
    transform: translateY(-1px);
    box-shadow: 0 8px 20px rgba(255, 92, 42, 0.25);
  }

  .hamburger {
    display: none;
    width: 38px;
    height: 38px;
    padding: 8px;
    border: 1px solid rgba(255, 255, 255, 0.16);
    background: transparent;
    cursor: pointer;
  }

  header.scrolled .hamburger {
    border-color: #d0d5dd;
  }

  .hamburger span {
    display: block;
    width: 100%;
    height: 1px;
    margin: 4px 0;
    background: currentColor;
    transition: transform 0.25s ease;
  }

  .hamburger.open span:first-child {
    transform: translateY(5px) rotate(45deg);
  }

  .hamburger.open span:nth-child(2) {
    opacity: 0;
  }

  .hamburger.open span:last-child {
    transform: translateY(-5px) rotate(-45deg);
  }

  .mobile-menu {
    display: none;
  }

  /* BUTTONS */

  .btn-primary,
  .btn-ghost,
  .btn-dark,
  .btn-outline-dark {
    min-height: 48px;
    padding: 0 19px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 11px;
    border-radius: 4px;
    text-decoration: none;
    font-size: 0.7rem;
    font-weight: 850;
    letter-spacing: 0.01em;
    transition:
      transform 0.2s ease,
      background 0.2s ease,
      border-color 0.2s ease,
      color 0.2s ease,
      box-shadow 0.2s ease;
  }

  .btn-primary {
    color: #fff;
    background: var(--orange);
    border: 1px solid var(--orange);
  }

  .btn-primary:hover {
    transform: translateY(-2px);
    box-shadow: 0 12px 26px rgba(255, 92, 42, 0.22);
  }

  .btn-primary span,
  .btn-dark span {
    font-size: 0.9rem;
  }

  .btn-ghost {
    color: rgba(255, 255, 255, 0.72);
    background: transparent;
    border: 1px solid rgba(255, 255, 255, 0.18);
  }

  .btn-ghost:hover {
    color: #fff;
    border-color: rgba(255, 255, 255, 0.42);
  }

  /* HERO */

  .hero {
    position: relative;
    min-height: 770px;
    display: flex;
    align-items: center;
    overflow: hidden;
    padding: 125px 0 80px;
    color: #fff;
    background: var(--navy);
  }

  .hero-grid-lines,
  .cta-grid-lines {
    position: absolute;
    inset: 0;
    pointer-events: none;
    opacity: 0.5;
    background-image:
      linear-gradient(
        rgba(255, 255, 255, 0.035) 1px,
        transparent 1px
      ),
      linear-gradient(
        90deg,
        rgba(255, 255, 255, 0.035) 1px,
        transparent 1px
      );
    background-size: 72px 72px;
    mask-image: linear-gradient(
      to bottom,
      rgba(0, 0, 0, 1),
      transparent 85%
    );
  }

  .hero-glow {
    position: absolute;
    width: 500px;
    height: 500px;
    border-radius: 50%;
    pointer-events: none;
    filter: blur(80px);
    opacity: 0.12;
  }

  .hero-glow-a {
    right: -180px;
    top: 60px;
    background: var(--orange);
  }

  .hero-glow-b {
    left: -250px;
    bottom: -300px;
    background: #174a7e;
  }

  .hero-inner {
    position: relative;
    z-index: 2;
    width: min(var(--max), calc(100% - 48px));
    margin: auto;
    display: grid;
    grid-template-columns: minmax(0, 1fr) minmax(440px, 0.9fr);
    align-items: center;
    gap: 75px;
  }

  .hero-kicker {
    display: flex;
    align-items: center;
    gap: 9px;
    margin-bottom: 23px;
    color: rgba(255, 255, 255, 0.46);
    font-size: 0.58rem;
    font-weight: 850;
    letter-spacing: 0.16em;
    text-transform: uppercase;
  }

  .status-dot {
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background: var(--orange);
    box-shadow: 0 0 0 5px rgba(255, 92, 42, 0.1);
  }

  .kicker-line {
    width: 42px;
    height: 1px;
    margin-left: 4px;
    background: rgba(255, 255, 255, 0.17);
  }

  .hero h1 {
    max-width: 760px;
    margin: 0;
    font-size: clamp(4rem, 7vw, 6.9rem);
    line-height: 0.91;
    letter-spacing: -0.075em;
    font-weight: 850;
  }

  .h1-static,
  .h1-accent {
    display: block;
  }

  .h1-accent {
    min-height: 0.95em;
    color: var(--orange);
    transition:
      opacity 0.32s ease,
      transform 0.32s ease;
  }

  .h1-accent.out {
    opacity: 0;
    transform: translateY(7px);
  }

  .hero-sub {
    max-width: 570px;
    margin: 28px 0 0;
    color: rgba(255, 255, 255, 0.49);
    font-size: 0.94rem;
    line-height: 1.85;
  }

  .hero-btns {
    display: flex;
    align-items: center;
    gap: 9px;
    margin-top: 30px;
  }

  .trust-row {
    display: flex;
    align-items: center;
    gap: 13px;
    margin-top: 34px;
    color: rgba(255, 255, 255, 0.27);
    font-size: 0.57rem;
    font-weight: 800;
    letter-spacing: 0.08em;
    text-transform: uppercase;
  }

  .trust-row i {
    width: 3px;
    height: 3px;
    border-radius: 50%;
    background: var(--orange);
  }

  .hero-frame {
    position: relative;
    height: 540px;
    padding: 17px;
    border: 1px solid rgba(255, 255, 255, 0.12);
  }

  .hero-frame::before {
    content: "";
    position: absolute;
    inset: 7px;
    border: 1px solid rgba(255, 255, 255, 0.045);
    pointer-events: none;
  }

  .hero-main-img {
    position: absolute;
    inset: 17px 17px 17px 65px;
    width: calc(100% - 82px);
    height: calc(100% - 34px);
    object-fit: cover;
    filter: saturate(0.82);
  }

  .hero-float-img {
    position: absolute;
    z-index: 3;
    left: -35px;
    bottom: 48px;
    width: 185px;
    height: 150px;
    object-fit: cover;
    border: 7px solid var(--navy);
    box-shadow: 0 20px 50px rgba(0, 0, 0, 0.35);
  }

  .frame-label {
    position: absolute;
    z-index: 5;
    color: rgba(255, 255, 255, 0.4);
    font-size: 0.5rem;
    font-weight: 850;
    letter-spacing: 0.15em;
  }

  .frame-label-top {
    top: -8px;
    right: 22px;
    background: var(--navy);
    padding: 0 7px;
  }

  .frame-label-bottom {
    bottom: -8px;
    left: 28px;
    background: var(--navy);
    padding: 0 7px;
  }

  .hero-metric {
    position: absolute;
    z-index: 5;
    min-width: 128px;
    padding: 14px 16px;
    background: rgba(5, 13, 30, 0.88);
    border: 1px solid rgba(255, 255, 255, 0.12);
    backdrop-filter: blur(10px);
  }

  .hero-metric strong {
    display: block;
    color: #fff;
    font-size: 1.35rem;
    line-height: 1;
    letter-spacing: -0.04em;
  }

  .hero-metric span {
    display: block;
    margin-top: 5px;
    color: rgba(255, 255, 255, 0.36);
    font-size: 0.49rem;
    font-weight: 850;
    letter-spacing: 0.13em;
  }

  .metric-a {
    left: -17px;
    top: 84px;
  }

  .metric-b {
    right: -17px;
    bottom: 85px;
  }

  .crosshair {
    position: absolute;
    z-index: 5;
    width: 21px;
    height: 21px;
  }

  .crosshair::before,
  .crosshair::after {
    content: "";
    position: absolute;
    background: var(--orange);
  }

  .crosshair::before {
    left: 10px;
    top: 0;
    width: 1px;
    height: 21px;
  }

  .crosshair::after {
    left: 0;
    top: 10px;
    width: 21px;
    height: 1px;
  }

  .crosshair-a {
    left: 37px;
    top: 37px;
  }

  .crosshair-b {
    right: 37px;
    bottom: 37px;
  }

  /* TECH STRIP */

  .tech-strip {
    overflow: hidden;
    background: #030914;
    border-top: 1px solid rgba(255, 255, 255, 0.06);
    border-bottom: 1px solid rgba(255, 255, 255, 0.06);
  }

  .strip-inner {
    min-height: 55px;
    display: flex;
    align-items: center;
    gap: 25px;
  }

  .strip-label {
    flex-shrink: 0;
    color: var(--orange);
    font-size: 0.53rem;
    font-weight: 850;
    letter-spacing: 0.15em;
  }

  .strip-track {
    min-width: 0;
    overflow: hidden;
    white-space: nowrap;
  }

  .strip-items {
    width: max-content;
    display: flex;
    align-items: center;
    gap: 19px;
    color: rgba(255, 255, 255, 0.3);
    font-size: 0.59rem;
    font-weight: 750;
    animation: marquee 32s linear infinite;
  }

  .strip-items b {
    color: var(--orange);
    opacity: 0.7;
  }

  @keyframes marquee {
    to {
      transform: translateX(-50%);
    }
  }

  /* STATS */

  .stats-section {
    padding: 50px 0 42px;
    color: #fff;
    background: var(--navy);
  }

  .stats-head {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 20px;
    padding-bottom: 25px;
    border-bottom: 1px solid rgba(255, 255, 255, 0.09);
  }

  .stats-head span {
    color: var(--orange);
    font-size: 0.62rem;
    font-weight: 850;
    letter-spacing: 0.16em;
  }

  .stats-head p {
    margin: 0;
    color: rgba(255, 255, 255, 0.38);
    font-size: 0.72rem;
  }

  .stats-grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
  }

  .stat-block {
    padding: 28px 28px 10px;
    border-right: 1px solid rgba(255, 255, 255, 0.09);
    opacity: 0;
    transform: translateY(12px);
    transition: 0.6s ease;
    transition-delay: var(--delay);
  }

  .stat-block:last-child {
    border-right: 0;
  }

  .stats-grid.vis .stat-block {
    opacity: 1;
    transform: none;
  }

  .stat-val {
    display: flex;
    align-items: flex-end;
    gap: 3px;
  }

  .snum {
    color: #fff;
    font-size: clamp(2.5rem, 4.5vw, 4.2rem);
    line-height: 0.9;
    font-weight: 850;
    letter-spacing: -0.06em;
  }

  .stat-sfx {
    padding-bottom: 2px;
    color: var(--orange);
    font-size: 1.45rem;
    font-weight: 850;
  }

  .stat-block p {
    margin: 12px 0 0;
    color: rgba(255, 255, 255, 0.42);
    font-size: 0.68rem;
    font-weight: 700;
    line-height: 1.55;
  }

  .stats-note {
    margin: 20px 0 0;
    color: rgba(255, 255, 255, 0.22);
    font-size: 0.62rem;
  }

  /* SECTIONS */

  .section {
    padding: 110px 0;
  }

  .bg-white {
    background: #fff;
  }

  .bg-light {
    background: var(--light);
  }

  .bg-navy {
    color: #fff;
    background: var(--navy);
  }

  .section-intro {
    max-width: 720px;
    margin: 0 auto 58px;
    text-align: center;
    opacity: 0;
    transform: translateY(22px);
    transition: 0.7s ease;
  }

  .section-intro.vis {
    opacity: 1;
    transform: none;
  }

  .eyebrow {
    display: inline-flex;
    align-items: center;
    gap: 10px;
    margin-bottom: 16px;
    color: var(--orange);
    font-size: 0.62rem;
    font-weight: 850;
    letter-spacing: 0.17em;
    text-transform: uppercase;
  }

  .eyebrow::before {
    content: "";
    width: 24px;
    height: 1px;
    background: currentColor;
  }

  .section-intro h2 {
    margin: 0 0 16px;
    color: var(--navy);
    font-size: clamp(2.25rem, 4.5vw, 4rem);
    line-height: 1.02;
    letter-spacing: -0.055em;
    font-weight: 850;
  }

  .section-intro h2 em {
    color: var(--orange);
    font-style: normal;
  }

  .section-intro p {
    max-width: 620px;
    margin: auto;
    color: var(--muted);
    font-size: 0.94rem;
    line-height: 1.8;
  }

  .section-intro.dark h2 {
    color: #fff;
  }

  .section-intro.dark p {
    color: rgba(255, 255, 255, 0.45);
  }

  /* INSTALLATIONS */

  .inst-cards {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 16px;
    opacity: 0;
    transform: translateY(22px);
    transition: 0.7s ease 0.1s;
  }

  .inst-cards.vis {
    opacity: 1;
    transform: none;
  }

  .inst-card {
    position: relative;
    min-height: 310px;
    padding: 38px;
    overflow: hidden;
    border: 1px solid var(--line);
  }

  .inst-dark {
    color: #fff;
    background: var(--navy);
    border-color: rgba(255, 255, 255, 0.06);
  }

  .inst-lite {
    background: #fff;
  }

  .card-index {
    position: absolute;
    top: 26px;
    right: 28px;
    color: rgba(255, 255, 255, 0.18);
    font-size: 0.6rem;
    font-weight: 850;
    letter-spacing: 0.15em;
  }

  .inst-lite .card-index {
    color: #c7cdd7;
  }

  .inst-badge {
    display: inline-block;
    margin-bottom: 22px;
    color: var(--orange);
    font-size: 0.58rem;
    font-weight: 850;
    letter-spacing: 0.15em;
    text-transform: uppercase;
  }

  .inst-card h3 {
    margin: 0 0 12px;
    font-size: 1.45rem;
    line-height: 1.15;
    letter-spacing: -0.035em;
  }

  .inst-card > p {
    margin: 0 0 20px;
    font-size: 0.84rem;
    line-height: 1.8;
  }

  .inst-dark > p {
    color: rgba(255, 255, 255, 0.5);
  }

  .inst-lite > p {
    color: #667085;
  }

  .inst-card ul {
    display: grid;
    gap: 9px;
    margin: 0;
    padding: 0;
    list-style: none;
  }

  .inst-card li {
    position: relative;
    padding-left: 18px;
    font-size: 0.75rem;
    line-height: 1.55;
  }

  .inst-card li::before {
    content: "";
    position: absolute;
    top: 0.55em;
    left: 0;
    width: 5px;
    height: 5px;
    background: var(--orange);
  }

  .inst-dark li {
    color: rgba(255, 255, 255, 0.7);
  }

  .inst-lite li {
    color: #475467;
  }

  .section-cta {
    display: flex;
    justify-content: center;
    margin-top: 34px;
    opacity: 0;
    transform: translateY(10px);
    transition: 0.6s ease 0.25s;
  }

  .section-cta.vis {
    opacity: 1;
    transform: none;
  }

  /* AQUAPONICS */

  .split {
    display: grid;
    grid-template-columns:
      minmax(0, 1fr)
      minmax(0, 0.86fr);
    gap: 90px;
    align-items: center;
    opacity: 0;
    transform: translateY(24px);
    transition: 0.8s ease;
  }

  .split.vis {
    opacity: 1;
    transform: none;
  }

  .split-imgs {
    position: relative;
    padding: 18px 18px 42px 0;
  }

  .image-index {
    position: absolute;
    z-index: 2;
    top: 0;
    right: 0;
    color: #98a2b3;
    font-size: 0.58rem;
    font-weight: 850;
    letter-spacing: 0.15em;
  }

  .img-main {
    display: block;
    width: 100%;
    height: 500px;
    object-fit: cover;
  }

  .img-float {
    position: absolute;
    bottom: 0;
    left: -25px;
    width: 220px;
    height: 175px;
    object-fit: cover;
    border: 8px solid #fff;
    box-shadow: 0 18px 45px rgba(5, 13, 30, 0.13);
  }

  .image-rule {
    position: absolute;
    bottom: 18px;
    left: -1px;
    width: 45px;
    height: 1px;
    background: var(--orange);
  }

  .split-text .eyebrow {
    margin-bottom: 18px;
  }

  .split-text h2 {
    margin: 0 0 20px;
    color: var(--navy);
    font-size: clamp(2.4rem, 4vw, 4rem);
    line-height: 1;
    letter-spacing: -0.055em;
  }

  .split-text h2 em {
    color: var(--orange);
    font-style: normal;
  }

  .lead-copy {
    margin: 0 0 20px;
    color: #667085;
    font-size: 0.96rem;
    line-height: 1.85;
  }

  .cklist {
    margin: 0;
    padding: 0;
    list-style: none;
    border-top: 1px solid var(--line);
  }

  .cklist li {
    position: relative;
    padding: 13px 0 13px 23px;
    border-bottom: 1px solid var(--line);
    color: #344054;
    font-size: 0.78rem;
  }

  .cklist li::before {
    content: "✓";
    position: absolute;
    left: 0;
    color: var(--orange);
    font-weight: 900;
  }

  .text-link {
    display: inline-flex;
    align-items: center;
    gap: 10px;
    margin-top: 22px;
    padding-bottom: 4px;
    color: var(--navy);
    border-bottom: 1px solid var(--navy);
    text-decoration: none;
    font-size: 0.78rem;
    font-weight: 850;
  }

  .text-link:hover {
    color: var(--orange);
    border-color: var(--orange);
  }

  /* AUTOMATION */

  .tech-banner {
    position: relative;
    height: 370px;
    margin-bottom: 18px;
    overflow: hidden;
    border: 1px solid rgba(255, 255, 255, 0.1);
    opacity: 0;
    transform: translateY(18px);
    transition: 0.7s ease;
  }

  .tech-banner.vis {
    opacity: 1;
    transform: none;
  }

  .tech-banner img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    filter: brightness(0.42) saturate(0.8);
  }

  .tech-overlay {
    position: absolute;
    inset: 0;
    background:
      linear-gradient(
        90deg,
        rgba(5, 13, 30, 0.86),
        rgba(5, 13, 30, 0.18) 70%
      ),
      linear-gradient(
        0deg,
        rgba(5, 13, 30, 0.72),
        transparent 60%
      );
  }

  .tech-caption {
    position: absolute;
    bottom: 28px;
    left: 34px;
    max-width: 520px;
  }

  .tech-caption span {
    color: var(--orange);
    font-size: 0.58rem;
    font-weight: 850;
    letter-spacing: 0.16em;
  }

  .tech-caption p {
    margin: 8px 0 0;
    color: #fff;
    font-size: 0.88rem;
    line-height: 1.7;
  }

  .scan-line {
    position: absolute;
    top: 18%;
    left: 0;
    right: 0;
    height: 1px;
    opacity: 0.55;
    background:
      linear-gradient(
        90deg,
        transparent,
        var(--orange),
        transparent
      );
    animation: scan 5s ease-in-out infinite;
  }

  @keyframes scan {
    0%,
    100% {
      transform: translateY(0);
      opacity: 0;
    }

    15% {
      opacity: 0.55;
    }

    70% {
      opacity: 0.35;
    }

    85% {
      transform: translateY(260px);
      opacity: 0;
    }
  }

  .cards-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 1px;
    background: rgba(255, 255, 255, 0.09);
    border: 1px solid rgba(255, 255, 255, 0.09);
    opacity: 0;
    transform: translateY(18px);
    transition: 0.7s ease 0.08s;
  }

  .cards-grid.vis {
    opacity: 1;
    transform: none;
  }

  .fcard {
    min-height: 190px;
    padding: 25px;
    background: rgba(255, 255, 255, 0.025);
    transition: background 0.2s;
  }

  .fcard:hover {
    background: rgba(255, 255, 255, 0.06);
  }

  .fc-top {
    display: flex;
    justify-content: space-between;
    color: rgba(255, 255, 255, 0.22);
    font-size: 0.58rem;
    font-weight: 850;
    letter-spacing: 0.14em;
  }

  .fc-ico {
    color: var(--orange);
    font-size: 1.25rem;
  }

  .fcard h4 {
    margin: 30px 0 8px;
    color: #fff;
    font-size: 0.9rem;
  }

  .fcard p {
    margin: 0;
    color: rgba(255, 255, 255, 0.42);
    font-size: 0.76rem;
    line-height: 1.75;
  }

  .timeline {
    margin-top: 50px;
    opacity: 0;
    transform: translateY(18px);
    transition: 0.7s ease 0.16s;
  }

  .timeline.vis {
    opacity: 1;
    transform: none;
  }

  .timeline-label {
    padding-bottom: 14px;
    color: rgba(255, 255, 255, 0.27);
    border-bottom: 1px solid rgba(255, 255, 255, 0.08);
    font-size: 0.58rem;
    font-weight: 850;
    letter-spacing: 0.16em;
  }

  .tl-row {
    display: grid;
    grid-template-columns: 30px 1fr 40px;
    gap: 14px;
    align-items: start;
    padding: 18px 0;
    border-bottom: 1px solid rgba(255, 255, 255, 0.07);
  }

  .tl-marker {
    position: relative;
    height: 100%;
  }

  .tl-marker::after {
    content: "";
    position: absolute;
    top: 13px;
    bottom: -19px;
    left: 6px;
    width: 1px;
    background: rgba(255, 255, 255, 0.08);
  }

  .tl-row:last-child .tl-marker::after {
    display: none;
  }

  .tl-marker span {
    position: relative;
    z-index: 2;
    display: block;
    width: 13px;
    height: 13px;
    border: 1px solid rgba(255, 92, 42, 0.35);
    border-radius: 50%;
    background: var(--navy);
  }

  .tl-marker span.done {
    background: var(--orange);
    border-color: var(--orange);
  }

  .tl-marker span.active {
    border-color: var(--orange);
    box-shadow: 0 0 0 4px rgba(255, 92, 42, 0.12);
  }

  .tl-copy strong {
    display: block;
    color: #fff;
    font-size: 0.78rem;
  }

  .tl-copy p {
    margin: 3px 0 0;
    color: rgba(255, 255, 255, 0.38);
    font-size: 0.72rem;
  }

  .tl-number {
    color: rgba(255, 255, 255, 0.16);
    text-align: right;
    font-size: 0.58rem;
    font-weight: 850;
  }

  /* SPECIES */

  .sp-row {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 16px;
    margin-bottom: 24px;
    opacity: 0;
    transform: translateY(18px);
    transition: 0.7s ease;
  }

  .sp-row.vis {
    opacity: 1;
    transform: none;
  }

  .sp-card {
    overflow: hidden;
    border: 1px solid var(--line);
    background: #fff;
  }

  .sp-hdr {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 18px 20px;
    color: #fff;
    background: var(--accent);
  }

  .sp-hdr span {
    font-size: 0.65rem;
    font-weight: 850;
    letter-spacing: 0.13em;
    text-transform: uppercase;
  }

  .sp-hdr b {
    font-size: 0.55rem;
    opacity: 0.55;
  }

  .sp-card ul {
    display: grid;
    gap: 9px;
    margin: 0;
    padding: 20px;
    list-style: none;
  }

  .sp-card li {
    position: relative;
    padding-left: 15px;
    color: #475467;
    font-size: 0.75rem;
  }

  .sp-card li::before {
    content: "";
    position: absolute;
    top: 0.55em;
    left: 0;
    width: 4px;
    height: 4px;
    border-radius: 50%;
    background: var(--orange);
  }

  /* BENTO */

  .bento {
    display: grid;
    grid-template-columns: 1.45fr 0.85fr;
    gap: 16px;
    opacity: 0;
    transform: translateY(18px);
    transition: 0.7s ease 0.1s;
  }

  .bento.vis {
    opacity: 1;
    transform: none;
  }

  .bento-big {
    position: relative;
    min-height: 490px;
    overflow: hidden;
    background: #ddd;
  }

  .bento-big img {
    display: block;
    width: 100%;
    min-height: 490px;
    height: 100%;
    object-fit: cover;
    transition: transform 0.6s;
  }

  .bento-big:hover img {
    transform: scale(1.025);
  }

  .bento-cap {
    position: absolute;
    right: 22px;
    bottom: 20px;
    left: 22px;
    display: flex;
    align-items: center;
    gap: 12px;
    color: #fff;
    font-size: 0.7rem;
    font-weight: 700;
    text-shadow: 0 2px 15px #000;
  }

  .bento-cap::before {
    content: "";
    position: absolute;
    z-index: -1;
    inset: -50px -22px -20px;
    background:
      linear-gradient(
        transparent,
        rgba(0, 0, 0, 0.7)
      );
  }

  .bento-cap span {
    color: var(--orange);
    font-size: 0.54rem;
    font-weight: 850;
    letter-spacing: 0.14em;
  }

  .bento-small {
    display: grid;
    grid-template-rows: auto 150px 1fr;
    gap: 16px;
  }

  .bento-stat {
    position: relative;
    padding: 28px;
    overflow: hidden;
    background: var(--orange);
  }

  .bs-n {
    display: block;
    color: #fff;
    font-size: 4rem;
    line-height: 0.9;
    font-weight: 850;
    letter-spacing: -0.07em;
  }

  .bs-l {
    display: block;
    max-width: 160px;
    margin-top: 9px;
    color: rgba(255, 255, 255, 0.78);
    font-size: 0.65rem;
    line-height: 1.45;
    font-weight: 800;
  }

  .stat-corner {
    position: absolute;
    top: 20px;
    right: 20px;
    color: rgba(255, 255, 255, 0.28);
    font-size: 0.55rem;
    font-weight: 850;
    letter-spacing: 0.15em;
  }

  .bento-img2 {
    display: block;
    width: 100%;
    height: 150px;
    object-fit: cover;
  }

  .bento-txt {
    padding: 26px;
    border: 1px solid var(--line);
  }

  .mini-label {
    margin-bottom: 16px;
    color: #9aa3b2;
    font-size: 0.55rem;
    font-weight: 850;
    letter-spacing: 0.15em;
  }

  .bento-txt h4 {
    margin: 0 0 8px;
    color: var(--navy);
    font-size: 1rem;
  }

  .bento-txt p {
    margin: 0;
    color: #667085;
    font-size: 0.75rem;
    line-height: 1.75;
  }

  /* MEDIA */

  .gallery {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 12px;
    opacity: 0;
    transform: translateY(18px);
    transition: 0.7s ease;
  }

  .gallery.vis {
    opacity: 1;
    transform: none;
  }

  .g-slot {
    position: relative;
    aspect-ratio: 4 / 3;
    margin: 0;
    overflow: hidden;
    background: #e5e7eb;
  }

  .g-slot img {
    display: block;
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition:
      transform 0.55s,
      filter 0.55s;
  }

  .g-slot:hover img {
    transform: scale(1.035);
    filter: saturate(1.05);
  }

  .g-slot figcaption {
    position: absolute;
    right: 0;
    bottom: 0;
    left: 0;
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 34px 14px 12px;
    color: #fff;
    background:
      linear-gradient(
        transparent,
        rgba(5, 13, 30, 0.78)
      );
    font-size: 0.68rem;
  }

  .g-slot figcaption span {
    color: var(--orange);
    font-size: 0.55rem;
    font-weight: 850;
  }

  .vid-row {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 12px;
    margin-top: 12px;
    opacity: 0;
    transform: translateY(12px);
    transition: 0.7s ease 0.1s;
  }

  .vid-row.vis {
    opacity: 1;
    transform: none;
  }

  .vid-slot {
    aspect-ratio: 16 / 9;
    border: 1px solid #dce1e8;
    background: #fff;
  }

  .vid-ph {
    position: relative;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 7px;
    color: #475467;
  }

  .play-ring {
    width: 54px;
    height: 54px;
    display: grid;
    place-items: center;
    padding-left: 3px;
    border: 1px solid #cfd5dd;
    border-radius: 50%;
    color: var(--orange);
    font-size: 0.85rem;
  }

  .vid-ph span {
    font-size: 0.72rem;
    font-weight: 800;
  }

  .vid-ph small {
    color: #98a2b3;
    font-size: 0.62rem;
  }

  .vid-ph b {
    position: absolute;
    top: 15px;
    right: 15px;
    color: #c0c7d1;
    font-size: 0.55rem;
  }

  .btn-dark {
    color: #fff;
    background: var(--navy);
    border: 1px solid var(--navy);
  }

  .btn-dark:hover {
    transform: translateY(-2px);
    background: #0b1730;
  }

  /* CONTACT */

  .final-cta {
    position: relative;
    overflow: hidden;
    padding: 105px 0;
    color: #fff;
    background: var(--navy);
    text-align: center;
  }

  .cta-inner {
    position: relative;
    z-index: 2;
  }

  .eyebrow.light {
    color: var(--orange);
  }

  .final-cta h2 {
    max-width: 850px;
    margin: 0 auto 18px;
    color: #fff;
    font-size: clamp(2.5rem, 5vw, 5rem);
    line-height: 0.98;
    letter-spacing: -0.06em;
  }

  .final-cta p {
    max-width: 540px;
    margin: 0 auto 30px;
    color: rgba(255, 255, 255, 0.45);
    font-size: 0.9rem;
    line-height: 1.8;
  }

  .cta-row {
    display: flex;
    justify-content: center;
    gap: 10px;
    flex-wrap: wrap;
  }

  .btn-outline-dark {
    color: #fff;
    background: transparent;
    border: 1px solid rgba(255, 255, 255, 0.22);
  }

  .btn-outline-dark:hover {
    color: var(--orange);
    border-color: var(--orange);
  }

  /* FOOTER */

  footer {
    padding: 65px 0 45px;
    color: #fff;
    background: #030914;
    border-top: 1px solid rgba(255, 255, 255, 0.07);
  }

  .footer-grid {
    display: grid;
    grid-template-columns:
      1.8fr
      0.8fr
      1.2fr
      1.7fr;
    gap: 50px;
  }

  .footer-brand {
    color: #fff;
    font-size: 1.25rem;
    font-weight: 900;
    letter-spacing: -0.04em;
  }

  .footer-brand span {
    color: var(--orange);
  }

  .footer-main > p {
    margin: 7px 0 0;
    color: rgba(255, 255, 255, 0.32);
    font-size: 0.7rem;
  }

  .social-links {
    display: flex;
    gap: 8px;
    margin-top: 24px;
  }

  .social-icon {
    width: 31px;
    height: 31px;
    display: grid;
    place-items: center;
    color: rgba(255, 255, 255, 0.45);
    border: 1px solid rgba(255, 255, 255, 0.12);
    text-decoration: none;
    font-size: 0.5rem;
    font-weight: 850;
    transition: 0.2s;
  }

  .social-icon:hover {
    color: #fff;
    border-color: var(--orange);
  }

  .footer-col {
    display: flex;
    flex-direction: column;
    gap: 9px;
  }

  .footer-col h5,
  .foot-map h5 {
    margin: 0 0 7px;
    color: rgba(255, 255, 255, 0.23);
    font-size: 0.55rem;
    font-weight: 850;
    letter-spacing: 0.16em;
    text-transform: uppercase;
  }

  .footer-col a,
  .footer-col span {
    color: rgba(255, 255, 255, 0.46);
    text-decoration: none;
    font-size: 0.68rem;
    line-height: 1.5;
  }

  .footer-col a:hover,
  .foot-dir:hover {
    color: var(--orange);
  }

  .footer-note > p {
    margin: 0 0 5px;
    color: rgba(255, 255, 255, 0.28);
    font-size: 0.64rem;
    line-height: 1.55;
  }

  .foot-map {
    margin-top: 20px;
  }

  .foot-map-frame {
    aspect-ratio: 16 / 9;
    overflow: hidden;
    border: 1px solid rgba(255, 255, 255, 0.1);
  }

  .foot-map-frame iframe {
    display: block;
    width: 100%;
    height: 100%;
    border: 0;
    filter:
      invert(92%)
      hue-rotate(180deg)
      contrast(0.86)
      saturate(0.75);
  }

  .foot-dir {
    display: inline-block;
    margin-top: 8px;
    color: rgba(255, 255, 255, 0.45);
    text-decoration: none;
    font-size: 0.68rem;
    font-weight: 800;
  }

  /* TABLET */

  @media (max-width: 1100px) {
    .hero-inner {
      grid-template-columns: 1fr;
      gap: 45px;
    }

    .hero-right {
      width: 100%;
      max-width: 760px;
      margin: auto;
    }

    .hero-frame {
      height: 500px;
    }

    .desktop-links {
      display: none;
    }

    .hamburger {
      display: block;
    }

    .mobile-menu {
      position: absolute;
      top: 76px;
      left: 0;
      right: 0;
      display: flex;
      flex-direction: column;
      max-height: 0;
      overflow: hidden;
      background: #fff;
      border-bottom: 1px solid var(--line);
      transition: max-height 0.35s ease;
    }

    .mobile-menu.open {
      max-height: 480px;
    }

    .mobile-menu a {
      padding: 15px 24px;
      color: #344054;
      border-bottom: 1px solid #f0f2f5;
      text-decoration: none;
      font-size: 0.8rem;
      font-weight: 750;
    }

    .mobile-menu a:hover {
      color: var(--orange);
      background: #fff8f5;
    }

    .m-cta {
      color: var(--orange) !important;
    }

    .split {
      grid-template-columns: 1fr 1fr;
      gap: 50px;
    }

    .footer-grid {
      grid-template-columns:
        1.4fr
        1fr
        1.2fr;
    }

    .footer-note {
      grid-column: 1 / -1;
    }
  }

  /* MOBILE */

  @media (max-width: 760px) {
    .nav-inner {
      width: calc(100% - 32px);
      height: 64px;
    }

    .btn-nav {
      display: none;
    }

    .mobile-menu {
      top: 64px;
    }

    .hero {
      padding: 108px 16px 60px;
    }

    .hero-inner {
      width: 100%;
      gap: 35px;
    }

    .hero h1 {
      font-size: clamp(
        2.9rem,
        14vw,
        4.5rem
      );
    }

    .hero-sub {
      font-size: 0.9rem;
    }

    .hero-frame {
      height: 390px;
      padding: 12px;
    }

    .hero-main-img {
      top: 12px;
      right: 12px;
      width: 84%;
      height: 78%;
    }

    .hero-float-img {
      bottom: 30px;
      left: 12px;
      width: 46%;
      height: 28%;
      border-width: 5px;
    }

    .hero-metric {
      min-width: 106px;
      padding: 10px 12px;
    }

    .metric-a {
      top: 18%;
      left: -4px;
    }

    .metric-b {
      right: -4px;
      bottom: 17%;
    }

    .hero-metric strong {
      font-size: 1.1rem;
    }

    .strip-inner {
      padding: 0 16px;
      gap: 15px;
    }

    .strip-label {
      display: none;
    }

    .container {
      width: calc(100% - 32px);
    }

    .stats-head {
      display: block;
    }

    .stats-head p {
      margin-top: 8px;
    }

    .stats-grid {
      grid-template-columns: 1fr 1fr;
    }

    .stat-block {
      padding: 24px 14px 16px 0;
      border-right: 0;
      border-bottom: 1px solid rgba(255, 255, 255, 0.09);
    }

    .stat-block:nth-child(odd) {
      padding-right: 14px;
      border-right: 1px solid rgba(255, 255, 255, 0.09);
    }

    .stat-block:nth-child(even) {
      padding-left: 14px;
    }

    .stat-block:nth-last-child(-n + 2) {
      border-bottom: 0;
    }

    .section {
      padding: 78px 0;
    }

    .section-intro {
      margin-bottom: 38px;
    }

    .section-intro h2 {
      font-size: clamp(
        2.15rem,
        11vw,
        3.2rem
      );
    }

    .inst-cards,
    .split,
    .sp-row,
    .bento {
      grid-template-columns: 1fr;
    }

    .inst-card {
      min-height: auto;
      padding: 28px;
    }

    .img-main {
      height: 360px;
    }

    .img-float {
      left: -8px;
      width: 165px;
      height: 135px;
      border-width: 6px;
    }

    .split-text h2 {
      font-size: clamp(
        2.4rem,
        12vw,
        3.4rem
      );
    }

    .tech-banner {
      height: 300px;
    }

    .cards-grid {
      grid-template-columns: 1fr 1fr;
    }

    .fcard {
      min-height: 175px;
      padding: 19px;
    }

    .fcard h4 {
      margin-top: 24px;
    }

    .bento-big,
    .bento-big img {
      min-height: 340px;
    }

    .bento-small {
      grid-template-rows:
        auto
        180px
        auto;
    }

    .bento-img2 {
      height: 180px;
    }

    .gallery {
      grid-template-columns: 1fr 1fr;
    }

    .vid-row {
      grid-template-columns: 1fr;
    }

    .footer-grid {
      grid-template-columns: 1fr 1fr;
      gap: 34px 24px;
    }

    .footer-note {
      grid-column: 1 / -1;
    }
  }

  @media (max-width: 480px) {
    .hero-btns {
      flex-direction: column;
      align-items: stretch;
    }

    .hero-btns a {
      width: 100%;
    }

    .trust-row {
      gap: 8px;
      font-size: 0.58rem;
    }

    .trust-row i {
      display: none;
    }

    .hero-frame {
      height: 320px;
    }

    .frame-label {
      font-size: 0.48rem;
    }

    .hero-metric {
      display: none;
    }

    .cards-grid,
    .gallery {
      grid-template-columns: 1fr;
    }

    .fcard {
      min-height: auto;
    }

    .g-slot {
      aspect-ratio: 4 / 3;
    }

    .footer-grid {
      grid-template-columns: 1fr;
    }
  }

  @media (prefers-reduced-motion: reduce) {
    :global(html) {
      scroll-behavior: auto;
    }

    *,
    *::before,
    *::after {
      animation-duration: 0.01ms !important;
      animation-iteration-count: 1 !important;
      transition-duration: 0.01ms !important;
    }
  }
</style>