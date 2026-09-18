<script>
  import { translations } from '$lib/i18n.js';
  import Seo from '$lib/Seo.svelte';
  import { onMount } from 'svelte';

  const R2 = 'https://media.sustainablegreengold.com';

  const MAP_EMBED =
    'https://maps.google.com/maps?q=19.9953781,99.8888617&z=16&output=embed';

  const MAP_DIR =
    'https://www.google.com/maps/dir/?api=1&destination=19.9953781,99.8888617';

  const mapCopy = {
    en: {
      title: 'Find the farm',
      directions: 'Get directions'
    },
    th: {
      title: 'แผนที่ฟาร์ม',
      directions: 'ดูเส้นทาง'
    }
  };

  let lang = 'en';
  let menuOpen = false;
  let scrolled = false;
  let visible = {};
  let statsTriggered = false;

  $: t = translations[lang];
  $: mc = mapCopy[lang];

  function toggleLang() {
    lang = lang === 'en' ? 'th' : 'en';

    if (typeof localStorage !== 'undefined') {
      localStorage.setItem('sgg-lang', lang);
    }
  }

  function toggleMenu() {
    menuOpen = !menuOpen;
  }

  function closeMenu() {
    menuOpen = false;
  }

  function getVariant() {
    if (typeof document === 'undefined') return 'unknown';

    const m = document.cookie.match(/(?:^|; )ab_variant=([ab])/);

    return m ? m[1] : 'unknown';
  }

  function track(name, params = {}) {
    if (
      typeof window !== 'undefined' &&
      typeof window.gtag === 'function'
    ) {
      window.gtag('event', name, {
        variant: getVariant(),
        ...params
      });
    }
  }

  $: navLinks = [
    {
      label: t.nav.ecosystem,
      href: '#aquaponics'
    },
    {
      label: t.nav.automation,
      href: '#automation'
    },
    {
      label: t.nav.species,
      href: '#species'
    },
    {
      label: t.nav.media,
      href: '#media'
    },
    {
      label: t.nav.resources,
      href: '/resources'
    }
  ];

  $: stats = [
    {
      value: 6,
      suffix: '',
      label: t.stats[0].label
    },
    {
      value: 12,
      suffix: '+',
      label: t.stats[1].label
    },
    {
      value: 100,
      suffix: '%*',
      label: t.stats[2].label
    },
    {
      value: 0,
      suffix: '',
      label: t.stats[3].label
    }
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

  $: growGallery = [
    {
      src: `${R2}/growers/plant1.jpeg`,
      cap: t.grow.gallery[0]
    },
    {
      src: `${R2}/growers/plant2.png`,
      cap: t.grow.gallery[1]
    },
    {
      src: `${R2}/growers/beds.PNG`,
      cap: t.grow.gallery[2]
    }
  ];

  const timelineStates = ['done', 'active', '', ''];

  $: timeline = t.auto.timeline.map((tl, i) => ({
    ...tl,
    state: timelineStates[i]
  }));

  onMount(() => {
    const savedLang = localStorage.getItem('sgg-lang');

    if (savedLang === 'en' || savedLang === 'th') {
      lang = savedLang;
    } else if (navigator.language?.startsWith('th')) {
      lang = 'th';
    }

    document.documentElement.lang = lang;

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

          if (
            entry.target.dataset.stats !== undefined &&
            !statsTriggered
          ) {
            statsTriggered = true;

            document.querySelectorAll('.snum').forEach((el) => {
              const target = Number(el.dataset.target);

              if (target <= 0) {
                el.textContent = target;
                return;
              }

              let n = 0;

              const step = Math.max(
                1,
                Math.ceil(target / 55)
              );

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
        threshold: 0.15
      }
    );

    document
      .querySelectorAll('[data-reveal], [data-stats]')
      .forEach((el) => observer.observe(el));

    return () => {
      window.removeEventListener('scroll', onScroll);
      observer.disconnect();
    };
  });
</script>

<Seo
  title="Aquaponics Systems In Thailand — Sustainable Green Gold AI"
  description="We design and install sensor-monitored aquaponics systems anywhere in Thailand. Fish feed the plants, the plants clean the water. Operational farm in Chiang Rai."
  path="/"
/>

<!-- =========================================================
     NAVIGATION
========================================================= -->

<header class:scrolled>
  <nav class="nav-inner">
    <a
      href="/"
      class="brand"
      aria-label="Sustainable Green Gold"
      on:click={closeMenu}
    >
      <span class="brand-main">SGG</span>
      <span class="brand-dot">·</span>
      <span class="brand-ai">AI</span>
    </a>

    <ul class="desktop-links">
      {#each navLinks as link}
        <li>
          <a href={link.href}>
            {link.label}
          </a>
        </li>
      {/each}
    </ul>

    <div class="nav-right">
      <button
        class="lang-toggle"
        type="button"
        on:click={toggleLang}
        aria-label="Change language"
      >
        {lang === 'en' ? 'TH' : 'EN'}
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
        type="button"
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

  <div
    class="mobile-menu"
    class:open={menuOpen}
  >
    {#each navLinks as link}
      <a
        href={link.href}
        on:click={closeMenu}
      >
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

<!-- =========================================================
     HERO
     
     NEW:
     - consistent outer frame
     - consistent inner frame
     - no plus signs
     - no random decorative marks
     - cleaner data cards
========================================================= -->

<section class="hero">
  <div class="hero-grid"></div>

  <div class="hero-inner">

    <!-- LEFT -->
    <div class="hero-copy">

      <div class="hero-kicker">
        <span class="kicker-line"></span>
        <span>{t.hero.badge}</span>
      </div>

      <h1>
        <span class="h1-line">
          {t.hero.h1_1}
        </span>

        <span class="h1-line">
          {t.hero.h1_2}
        </span>

        <span
          class="h1-line accent"
        >
          {t.hero.cycling?.[0] ?? ''}
        </span>
      </h1>

      <p class="hero-sub">
        {t.hero.sub}
      </p>

      <div class="hero-actions">
        <a
          href="#aquaponics"
          class="hero-primary"
          on:click={() =>
            track('cta_click', {
              location: 'hero_ecosystem'
            })}
        >
          <span>{t.hero.btn1}</span>
          <span class="arrow">→</span>
        </a>

        <a
          href="#automation"
          class="hero-secondary"
        >
          {t.hero.btn2}
        </a>
      </div>

      <div class="hero-trust">
        <div>
          <span class="trust-dot"></span>
          {t.hero.trust1}
        </div>

        <div>
          <span class="trust-dot"></span>
          {t.hero.trust2}
        </div>

        <div>
          <span class="trust-dot"></span>
          {t.hero.trust3}
        </div>
      </div>
    </div>

    <!-- RIGHT / HERO IMAGE SYSTEM -->
    <div class="hero-visual">

      <!-- ONE CONSISTENT FRAME -->
      <div class="system-frame">

        <!-- frame label -->
        <div class="frame-label">
          <span>SGG / SYSTEM 01</span>
        </div>

        <!-- inner image boundary -->
        <div class="image-frame">

          <img
            src={`${R2}/aquaponics/my-system1.jpg`}
            alt="Sustainable Green Gold aquaponics system in Chiang Rai"
            class="hero-main-image"
          />

          <!-- image overlay -->
          <div class="image-overlay"></div>

          <!-- AI CARD -->
          <div class="data-card monitoring-card">
            <span class="data-number">24/7</span>
            <span class="data-label">AI MONITORING</span>
            <span class="data-line"></span>
          </div>

          <!-- INSET IMAGE -->
          <div class="hero-inset">
            <img
              src={`${R2}/plants/fig-fruit.jpg`}
              alt="Fig growing at Sustainable Green Gold"
            />
          </div>

          <!-- WATER CARD -->
          <div class="data-card water-card">
            <span class="data-number">100%</span>
            <span class="data-label">WATER RECYCLED*</span>
            <span class="data-line"></span>
          </div>

        </div>

        <!-- LOCATION LABEL -->
        <div class="frame-location">
          <span class="location-line"></span>
          <span>CHIANG RAI · THAILAND</span>
        </div>

      </div>
    </div>
  </div>
</section>

<!-- =========================================================
     TECH STRIP
========================================================= -->

<div class="strip">
  <div class="strip-inner">
    <span class="strip-label">
      POWERED BY
    </span>

    <div class="strip-items">
      <span>Sensor Networks</span>
      <i></i>
      <span>Edge Computing</span>
      <i></i>
      <span>AI Vision</span>
      <i></i>
      <span>Custom Probes</span>
      <i></i>
      <span>HDPE Infrastructure</span>
    </div>
  </div>
</div>

<!-- =========================================================
     STATS
========================================================= -->

<section
  class="stats-section"
  data-stats
  data-reveal="stats"
>
  <div class="container">

    <div
      class="stats-grid"
      class:vis={visible.stats}
    >
      {#each stats as stat, i}
        <div
          class="stat-block"
          style={`transition-delay:${i * 0.1}s`}
        >
          <div class="stat-value">
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

          <p>
            {stat.label}
          </p>
        </div>
      {/each}
    </div>

    <p class="stats-note">
      * Excludes natural evaporation — atmospheric water recovery system in development
    </p>
  </div>
</section>

<!-- =========================================================
     INSTALLATIONS
========================================================= -->

<section
  id="installations"
  class="section bg-light"
  data-reveal="inst"
>
  <div class="container">

    <div
      class="sec-hdr"
      class:vis={visible.inst}
    >
      <div class="stag">
        {t.inst.tag}
      </div>

      <h2>
        {t.inst.h2_1}
        <em>{t.inst.h2_2}</em>
      </h2>

      <p class="sub">
        {t.inst.sub}
      </p>
    </div>

    <div
      class="inst-cards"
      class:vis={visible.inst}
    >

      <div class="inst-card inst-dark">

        <div class="inst-index">
          01
        </div>

        <div class="inst-badge">
          {t.inst.full.badge}
        </div>

        <h3>
          {t.inst.full.title}
        </h3>

        <p>
          {t.inst.full.body}
        </p>

        <ul>
          {#each t.inst.full.points as point}
            <li>{point}</li>
          {/each}
        </ul>

      </div>

      <div class="inst-card inst-lite">

        <div class="inst-index">
          02
        </div>

        <div class="inst-badge">
          {t.inst.demo.badge}
        </div>

        <h3>
          {t.inst.demo.title}
        </h3>

        <p>
          {t.inst.demo.body}
        </p>

        <ul>
          {#each t.inst.demo.points as point}
            <li>{point}</li>
          {/each}
        </ul>

      </div>

    </div>

    <div
      class="media-cta"
      class:vis={visible.inst}
    >
      <a
        href="#contact"
        class="btn-primary btn-lg"
        on:click={() =>
          track('cta_click', {
            location: 'installations'
          })}
      >
        {t.inst.btn}
        <span>→</span>
      </a>
    </div>

  </div>
</section>

<!-- =========================================================
     AQUAPONICS
========================================================= -->

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

        <div class="split-image-main">
          <img
            src={`${R2}/aquaponics/harvest.jpg`}
            alt="Aquaponics harvest at Sustainable Green Gold"
          />
        </div>

        <div class="split-image-float">
          <img
            src={`${R2}/aquaponics/growbed2.jpg`}
            alt="Aquaponics grow beds"
          />
        </div>

        <span class="image-number">
          01 / 02
        </span>

      </div>

      <div class="split-text">

        <div class="stag">
          {t.aq.tag}
        </div>

        <h2>
          {t.aq.h2_1}
          <br />
          <em>{t.aq.h2_2}</em>
        </h2>

        <p>
          {t.aq.p}
        </p>

        <ul class="cklist">
          {#each t.aq.items as item}
            <li>{item}</li>
          {/each}
        </ul>

        <a
          href="#contact"
          class="btn-primary"
          on:click={() =>
            track('cta_click', {
              location: 'ecosystem'
            })}
        >
          {t.aq.btn}
          <span>→</span>
        </a>

      </div>

    </div>
  </div>
</section>

<!-- =========================================================
     AUTOMATION
========================================================= -->

<section
  id="automation"
  class="section bg-navy"
  data-reveal="auto"
>
  <div class="container">

    <div
      class="sec-hdr"
      class:vis={visible.auto}
    >
      <div class="stag light">
        {t.auto.tag}
      </div>

      <h2 class="light">
        {t.auto.h2_1}
        <em>{t.auto.h2_2}</em>
      </h2>

      <p class="sub light">
        {t.auto.sub}
      </p>
    </div>

    <div
      class="tech-banner"
      class:vis={visible.auto}
    >
      <img
        src={`${R2}/sensors/ssgai.jpg`}
        alt="SGG sensor monitoring technology"
      />

      <div class="tb-overlay">
        <span class="tb-index">
          SYSTEM / 02
        </span>

        <p>
          {t.auto.banner}
        </p>
      </div>
    </div>

    <div
      class="cards-grid"
      class:vis={visible.auto}
    >
      {#each automationCards as card, i}
        <div
          class="fcard"
          style={`transition-delay:${i * 0.07}s`}
        >
          <span class="fc-index">
            0{i + 1}
          </span>

          <span class="fc-ico">
            {card.icon}
          </span>

          <h4>
            {card.title}
          </h4>

          <p>
            {card.body}
          </p>
        </div>
      {/each}
    </div>

    <div
      class="timeline"
      class:vis={visible.auto}
    >
      <div class="timeline-head">
        <span>PROCESS</span>
        <span>FROM DESIGN TO OPERATION</span>
      </div>

      {#each timeline as item, i}
        <div class="tl-row">

          <div class="tl-number">
            0{i + 1}
          </div>

          <div
            class="tl-dot"
            class:done={item.state === 'done'}
            class:active={item.state === 'active'}
          ></div>

          <div class="tl-content">
            <strong>
              {item.label}
            </strong>

            <p>
              {item.desc}
            </p>
          </div>

        </div>
      {/each}
    </div>

  </div>
</section>

<!-- =========================================================
     SPECIES
========================================================= -->

<section
  id="species"
  class="section bg-white"
  data-reveal="sp"
>
  <div class="container">

    <div
      class="sec-hdr"
      class:vis={visible.sp}
    >
      <div class="stag">
        {t.sp.tag}
      </div>

      <h2>
        {t.sp.h2_1}
        <br />
        <em>{t.sp.h2_2}</em>
      </h2>

      <p class="sub">
        {t.sp.sub}
      </p>
    </div>

    <div
      class="sp-row"
      class:vis={visible.sp}
    >
      {#each speciesItems as species, i}

        <div
          class="sp-card"
          style={`--species-color:${species.color}; transition-delay:${i * 0.1}s`}
        >
          <div class="sp-hdr">
            <span>
              {species.cat}
            </span>

            <span class="sp-number">
              0{i + 1}
            </span>
          </div>

          <ul>
            {#each species.items as item}
              <li>{item}</li>
            {/each}
          </ul>
        </div>

      {/each}
    </div>

    <!-- BENTO -->

    <div
      class="bento"
      class:vis={visible.sp}
    >

      <div class="bento-big">

        <img
          src={`${R2}/fish/fish-habitat.jpeg`}
          alt="Fish habitat in aquaponics system"
        />

        <div class="bento-overlay">
          <span>
            SYSTEM COMPONENT
          </span>

          <strong>
            {t.sp.bento_cap}
          </strong>
        </div>

      </div>

      <div class="bento-small">

        <div class="bento-stat">
          <span class="bs-index">
            SYSTEM / 03
          </span>

          <span class="bs-n">
            6
          </span>

          <span class="bs-l">
            {t.sp.bento_stat}
          </span>
        </div>

        <div class="bento-photo">
          <img
            src={`${R2}/plants/perm2.jpeg`}
            alt="Plants growing in aquaponics"
          />
        </div>

        <div class="bento-txt">
          <span class="small-label">
            ECOSYSTEM
          </span>

          <h4>
            {t.sp.bento_h4}
          </h4>

          <p>
            {t.sp.bento_p}
          </p>
        </div>

      </div>
    </div>

  </div>
</section>

<!-- =========================================================
     MEDIA
========================================================= -->

<section
  id="media"
  class="section bg-light"
  data-reveal="med"
>
  <div class="container">

    <div
      class="sec-hdr"
      class:vis={visible.med}
    >
      <div class="stag">
        {t.med.tag}
      </div>

      <h2>
        {t.med.h2_1}
        <em>{t.med.h2_2}</em>
      </h2>

      <p class="sub">
        {t.med.sub}
      </p>
    </div>

    <div
      class="gallery"
      class:vis={visible.med}
    >
      {#each gallery as item, i}

        <div
          class="g-slot"
          style={`transition-delay:${i * 0.06}s`}
        >
          {#if item.src}
            <img
              src={item.src}
              alt={item.cap}
              loading="lazy"
            />
          {:else}
            <div class="g-ph">
              <span>—</span>
              <small>Coming soon</small>
            </div>
          {/if}

          <div class="g-cap">
            <span>0{i + 1}</span>
            {item.cap}
          </div>
        </div>

      {/each}
    </div>

    <div
      class="vid-row"
      class:vis={visible.med}
    >
      {#each t.med.videos as videoTitle, i}

        <div class="vid-slot">

          <div class="vid-ph">

            <span class="video-number">
              VIDEO / 0{i + 1}
            </span>

            <div class="play-ring">
              ▶
            </div>

            <span>
              {videoTitle}
            </span>

            <small>
              Video placeholder
            </small>

          </div>
        </div>

      {/each}
    </div>

    <div
      class="media-cta"
      class:vis={visible.med}
    >
      <a
        href={lang === 'th'
          ? '/Smart_Polyponics_TH.pdf'
          : '/Smart_Polyponics_EN.pdf'}
        target="_blank"
        rel="noopener"
        class="btn-view-presentation"
        on:click={() =>
          track('presentation_view', {
            lang
          })}
      >
        <span>
          {t.med.btn}
        </span>

        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2.5"
          stroke-linecap="round"
          stroke-linejoin="round"
          aria-hidden="true"
        >
          <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6" />
          <polyline points="15 3 21 3 21 9" />
          <line x1="10" y1="14" x2="21" y2="3" />
        </svg>
      </a>
    </div>

  </div>
</section>

<!-- =========================================================
     CONTACT
========================================================= -->

<section
  id="contact"
  class="final-cta"
>
  <div class="final-grid"></div>

  <div class="container final-inner">

    <div class="stag light">
      SGG / CONTACT
    </div>

    <h2>
      {t.contact.h2}
    </h2>

    <p>
      {t.contact.p}
    </p>

    <div class="cta-row">

      <a
        href="https://line.me/ti/p/eZ2GG61uIe"
        class="btn-primary btn-lg"
        target="_blank"
        rel="noopener"
        on:click={() =>
          track('line_click', {
            location: 'contact_main'
          })}
      >
        {t.contact.btn1}
        <span>→</span>
      </a>

      <a
        href="mailto:contact@sustainablegreengold.com?subject=Aquaponics%20system%20enquiry"
        class="btn-outline dark"
        on:click={() =>
          track('email_click', {
            location: 'contact_main'
          })}
      >
        {t.contact.btn3}
      </a>

      <a
        href="#aquaponics"
        class="btn-outline dark"
      >
        {t.contact.btn2}
      </a>

    </div>
  </div>
</section>

<!-- =========================================================
     FOOTER
========================================================= -->

<footer>
  <div class="container footer-grid">

    <div class="footer-main">

      <div class="footer-brand">
        <span class="footer-sgg">SGG</span>
        <span class="footer-dot">·</span>
        <span>AI</span>
      </div>

      <p>
        Sustainable Green Gold AI
      </p>

      <div class="social-links">

        <!-- LINE -->
        <a
          href="https://line.me/ti/p/carbonbasedlife"
          target="_blank"
          rel="noopener"
          class="social-icon"
          title="LINE"
          aria-label="LINE"
          on:click={() =>
            track('line_click', {
              location: 'footer'
            })}
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="currentColor"
            aria-hidden="true"
          >
            <path d="M19.365 9.863c.349 0 .63.285.63.631 0 .345-.281.63-.63.63H17.61v1.125h1.755c.349 0 .63.283.63.63 0 .344-.281.629-.63.629h-2.386c-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.627-.63h2.386c.349 0 .63.285.63.63 0 .349-.281.63-.63.63H17.61v1.125h1.755zm-3.855 3.016c0 .27-.174.51-.432.596-.064.021-.133.031-.199.031-.211 0-.391-.09-.51-.25l-2.443-3.317v2.94c0 .344-.279.629-.631.629-.346 0-.626-.285-.626-.629V8.108c0-.27.173-.51.43-.595.06-.023.136-.033.194-.033.195 0 .375.105.495.254l2.462 3.33V8.108c0-.345.282-.63.63-.63.345 0 .63.285.63.63v4.771zm-5.741 0c0 .344-.282.629-.631.629-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.627-.63.349 0 .631.285.631.63v4.771zm-2.466.629H4.917c-.345 0-.63-.285-.63-.629V8.108c0-.345.285-.63.63-.63.348 0 .63.285.63.63v4.141h1.756c.348 0 .629.283.629.63 0 .344-.281.629-.629.629M24 10.314C24 4.943 18.615.572 12 .572S0 4.943 0 10.314c0 4.811 4.27 8.842 10.035 9.608.391.082.923.258 1.058.59.12.301.079.766.038 1.08l-.164 1.02c-.045.301-.24 1.186 1.049.645 1.291-.539 6.916-4.078 9.436-6.975C23.176 14.393 24 12.458 24 10.314" />
          </svg>
        </a>

        <!-- FACEBOOK -->
        <a
          href="https://facebook.com/profile.php?id=61556530944739"
          target="_blank"
          rel="noopener"
          class="social-icon"
          title="Facebook"
          aria-label="Facebook"
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="currentColor"
            aria-hidden="true"
          >
            <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
          </svg>
        </a>

        <!-- INSTAGRAM -->
        <a
          href="https://instagram.com/sustainablegreengold"
          target="_blank"
          rel="noopener"
          class="social-icon"
          title="Instagram"
          aria-label="Instagram"
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="currentColor"
            aria-hidden="true"
          >
            <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
          </svg>
        </a>

        <!-- TAWASAL -->
        <a
          href="https://twl.ae/sustainablegreengold"
          target="_blank"
          rel="noopener"
          class="social-icon"
          title="Tawasal"
          aria-label="Tawasal"
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="currentColor"
            aria-hidden="true"
          >
            <g
              fill="currentColor"
              transform="translate(12 12) scale(1.3) translate(-12 -12)"
            >
              <rect x="4.75" y="5.6" width="2.35" height="5.8" rx="0.55" transform="rotate(20 5.925 8.5)" />
              <rect x="8.05" y="5.6" width="2.35" height="5.8" rx="0.55" transform="rotate(20 9.225 8.5)" />
              <rect x="13.05" y="5.15" width="6.9" height="2.25" rx="0.55" transform="rotate(23 16.5 6.275)" />
              <rect x="13.05" y="8.85" width="6.9" height="2.25" rx="0.55" transform="rotate(23 16.5 9.975)" />
              <rect x="4.05" y="13.15" width="6.9" height="2.25" rx="0.55" transform="rotate(23 7.5 14.275)" />
              <rect x="4.05" y="16.85" width="6.9" height="2.25" rx="0.55" transform="rotate(23 7.5 17.975)" />
              <rect x="14" y="13.4" width="2.35" height="5.8" rx="0.55" transform="rotate(20 15.175 16.3)" />
              <rect x="17.3" y="13.4" width="2.35" height="5.8" rx="0.55" transform="rotate(20 18.475 16.3)" />
            </g>
          </svg>
        </a>

        <!-- TIKTOK -->
        <a
          href="https://www.tiktok.com/@digital.farm.cr"
          target="_blank"
          rel="noopener"
          class="social-icon"
          title="TikTok"
          aria-label="TikTok"
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="currentColor"
            aria-hidden="true"
          >
            <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.9 2.9 0 0 1-5.2 1.74 2.9 2.9 0 0 1 2.31-4.64c.3 0 .58.05.85.13V9.4a6.33 6.33 0 0 0-.85-.05A6.34 6.34 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1.04-.1z" />
          </svg>
        </a>

      </div>
    </div>

    <div class="footer-col">
      <h5>
        {t.footer.nav_title}
      </h5>

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
      <h5>
        {t.footer.contact_title}
      </h5>

      <a href="mailto:contact@sustainablegreengold.com">
        contact@sustainablegreengold.com
      </a>

      <a href="tel:+66652278077">
        065 227 8077
      </a>
    </div>

    <div class="footer-note">

      <p>
        {t.footer.rights}
      </p>

      <p>
        {t.footer.location}
      </p>

      <div class="foot-map">

        <h5>
          {mc.title}
        </h5>

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
    margin: 0;
    padding: 0;
  }

  :global(html) {
    scroll-behavior: smooth;
  }

  :global(body) {
    font-family:
      "Manrope",
      "Inter",
      -apple-system,
      BlinkMacSystemFont,
      "Segoe UI",
      sans-serif;

    color: #111827;
    background: #fff;
    -webkit-font-smoothing: antialiased;
    line-height: 1.6;
  }

  :global(::selection) {
    background: #ff5c2a;
    color: #fff;
  }

  /* =========================================================
     NAV
  ========================================================= */

  header {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 200;

    background: rgba(5, 13, 30, 0.78);
    border-bottom: 1px solid rgba(255, 255, 255, 0.08);

    backdrop-filter: blur(16px);
    -webkit-backdrop-filter: blur(16px);

    transition:
      background 0.3s ease,
      border-color 0.3s ease,
      box-shadow 0.3s ease;
  }

  header.scrolled {
    background: rgba(5, 13, 30, 0.96);
    border-color: rgba(255, 255, 255, 0.08);
    box-shadow: 0 12px 40px rgba(0, 0, 0, 0.18);
  }

  .nav-inner {
    max-width: 1280px;
    height: 76px;
    margin: 0 auto;
    padding: 0 2rem;

    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 2rem;
  }

  .brand {
    display: inline-flex;
    align-items: baseline;

    color: #fff;
    text-decoration: none;
    white-space: nowrap;
  }

  .brand-main {
    font-size: 1.55rem;
    line-height: 1;
    font-weight: 800;
    letter-spacing: -0.055em;
  }

  .brand-dot {
    color: #ff5c2a;
    font-size: 1.4rem;
    font-weight: 800;
    margin-left: 0.08rem;
  }

  .brand-ai {
    color: rgba(255, 255, 255, 0.55);
    font-size: 0.68rem;
    font-weight: 700;
    letter-spacing: 0.16em;
    margin-left: 0.15rem;
  }

  .desktop-links {
    display: flex;
    align-items: center;
    gap: 2.1rem;

    list-style: none;
    margin-left: auto;
  }

  .desktop-links a {
    position: relative;

    color: rgba(255, 255, 255, 0.65);
    text-decoration: none;

    font-size: 0.74rem;
    font-weight: 700;
    letter-spacing: 0.08em;
    text-transform: uppercase;

    transition: color 0.2s ease;
  }

  .desktop-links a::after {
    content: "";

    position: absolute;
    left: 0;
    bottom: -0.55rem;

    width: 0;
    height: 1px;

    background: #ff5c2a;

    transition: width 0.25s ease;
  }

  .desktop-links a:hover {
    color: #fff;
  }

  .desktop-links a:hover::after {
    width: 100%;
  }

  .nav-right {
    display: flex;
    align-items: center;
    gap: 0.7rem;
  }

  .lang-toggle {
    border: 0;
    background: transparent;
    color: rgba(255, 255, 255, 0.62);

    padding: 0.55rem 0.45rem;

    cursor: pointer;

    font-size: 0.7rem;
    font-weight: 700;
    letter-spacing: 0.08em;

    transition: color 0.2s ease;
  }

  .lang-toggle:hover {
    color: #fff;
  }

  .btn-nav {
    display: inline-flex;
    align-items: center;
    justify-content: center;

    min-height: 38px;
    padding: 0 1.15rem;

    border: 1px solid rgba(255, 92, 42, 0.8);

    color: #fff;
    background: transparent;

    border-radius: 3px;

    font-size: 0.68rem;
    font-weight: 800;
    letter-spacing: 0.09em;
    text-transform: uppercase;

    text-decoration: none;

    transition:
      background 0.2s ease,
      color 0.2s ease,
      transform 0.2s ease;
  }

  .btn-nav:hover {
    background: #ff5c2a;
    color: #fff;
    transform: translateY(-1px);
  }

  .hamburger {
    display: none;

    width: 38px;
    height: 38px;

    border: 0;
    background: transparent;

    cursor: pointer;

    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 5px;
  }

  .hamburger span {
    display: block;

    width: 22px;
    height: 1.5px;

    background: #fff;

    transition:
      transform 0.25s ease,
      opacity 0.2s ease;
  }

  .hamburger.open span:nth-child(1) {
    transform: translateY(6.5px) rotate(45deg);
  }

  .hamburger.open span:nth-child(2) {
    opacity: 0;
  }

  .hamburger.open span:nth-child(3) {
    transform: translateY(-6.5px) rotate(-45deg);
  }

  .mobile-menu {
    position: absolute;
    top: 76px;
    left: 0;
    right: 0;

    display: flex;
    flex-direction: column;

    background: #071224;

    max-height: 0;
    overflow: hidden;

    border-bottom: 1px solid transparent;

    transition:
      max-height 0.35s ease,
      border-color 0.25s ease;
  }

  .mobile-menu.open {
    max-height: 520px;
    border-color: rgba(255, 255, 255, 0.08);
  }

  .mobile-menu a {
    padding: 1rem 1.5rem;

    color: rgba(255, 255, 255, 0.72);
    text-decoration: none;

    border-bottom: 1px solid rgba(255, 255, 255, 0.05);

    font-size: 0.78rem;
    font-weight: 700;
    letter-spacing: 0.08em;
    text-transform: uppercase;
  }

  .mobile-menu a:hover {
    color: #ff5c2a;
  }

  .mobile-menu .m-cta {
    color: #ff5c2a;
  }

  /* =========================================================
     HERO
  ========================================================= */

  .hero {
    position: relative;

    min-height: 100vh;

    display: flex;
    align-items: center;

    padding:
      8rem
      2rem
      6rem;

    background:
      radial-gradient(
        circle at 88% 25%,
        rgba(255, 92, 42, 0.055),
        transparent 30%
      ),
      #050d1e;

    color: #fff;

    overflow: hidden;
  }

  .hero-grid {
    position: absolute;
    inset: 0;

    pointer-events: none;

    opacity: 0.35;

    background-image:
      linear-gradient(
        rgba(255, 255, 255, 0.025) 1px,
        transparent 1px
      ),
      linear-gradient(
        90deg,
        rgba(255, 255, 255, 0.025) 1px,
        transparent 1px
      );

    background-size: 80px 80px;

    mask-image: linear-gradient(
      90deg,
      black,
      transparent 90%
    );
  }

  .hero-inner {
    position: relative;
    z-index: 2;

    width: 100%;
    max-width: 1280px;

    margin: 0 auto;

    display: grid;
    grid-template-columns: minmax(300px, 0.76fr) minmax(580px, 1.45fr);

    gap: 4.5rem;

    align-items: center;
  }

  .hero-copy {
    max-width: 470px;

    padding-top: 1rem;
  }

  .hero-kicker {
    display: flex;
    align-items: center;
    gap: 0.75rem;

    margin-bottom: 1.5rem;

    color: rgba(255, 255, 255, 0.6);

    font-size: 0.68rem;
    font-weight: 800;
    letter-spacing: 0.18em;
    text-transform: uppercase;
  }

  .kicker-line {
    width: 36px;
    height: 1px;
    background: #ff5c2a;
  }

  .hero-copy h1 {
    margin: 0 0 1.5rem;

    font-size: clamp(
      3.25rem,
      5vw,
      5.8rem
    );

    line-height: 0.94;

    font-weight: 500;

    letter-spacing: -0.065em;
  }

  .h1-line {
    display: block;
  }

  .h1-line.accent {
    color: #ff5c2a;
    font-weight: 600;
  }

  .hero-sub {
    max-width: 440px;

    margin-bottom: 2rem;

    color: rgba(255, 255, 255, 0.56);

    font-size: 0.94rem;
    line-height: 1.85;
  }

  .hero-actions {
    display: flex;
    flex-wrap: wrap;
    gap: 0.75rem;

    margin-bottom: 2rem;
  }

  .hero-primary {
    display: inline-flex;
    align-items: center;
    gap: 1.5rem;

    min-height: 52px;

    padding: 0 1.3rem;

    background: #ff5c2a;
    color: #fff;

    text-decoration: none;

    border-radius: 2px;

    font-size: 0.7rem;
    font-weight: 800;
    letter-spacing: 0.11em;
    text-transform: uppercase;

    transition:
      transform 0.2s ease,
      background 0.2s ease;
  }

  .hero-primary:hover {
    background: #f05222;
    transform: translateY(-2px);
  }

  .hero-primary .arrow {
    font-size: 1rem;
    font-weight: 400;
  }

  .hero-secondary {
    display: inline-flex;
    align-items: center;

    min-height: 52px;

    padding: 0 1.3rem;

    color: rgba(255, 255, 255, 0.72);
    border: 1px solid rgba(255, 255, 255, 0.18);

    text-decoration: none;

    border-radius: 2px;

    font-size: 0.7rem;
    font-weight: 800;
    letter-spacing: 0.11em;
    text-transform: uppercase;

    transition:
      border-color 0.2s ease,
      color 0.2s ease;
  }

  .hero-secondary:hover {
    color: #fff;
    border-color: rgba(255, 92, 42, 0.8);
  }

  .hero-trust {
    display: flex;
    flex-wrap: wrap;
    gap: 1.2rem;

    color: rgba(255, 255, 255, 0.4);

    font-size: 0.65rem;
    font-weight: 700;
    letter-spacing: 0.08em;
    text-transform: uppercase;
  }

  .hero-trust > div {
    display: flex;
    align-items: center;
    gap: 0.45rem;
  }

  .trust-dot {
    width: 4px;
    height: 4px;

    background: #ff5c2a;

    border-radius: 50%;
  }

  /* =========================================================
     HERO VISUAL / CONSISTENT FRAME
  ========================================================= */

  .hero-visual {
    position: relative;
    width: 100%;
  }

  .system-frame {
    position: relative;

    width: 100%;

    padding:
      1.15rem
      1.15rem
      1.05rem;

    border: 1px solid rgba(255, 255, 255, 0.17);

    background:
      linear-gradient(
        135deg,
        rgba(255, 255, 255, 0.018),
        transparent 55%
      );
  }

  /*
    IMPORTANT:
    This is now ONE consistent frame.
    No random corner extensions.
    No plus signs.
    No decorative crosses.
  */

  .frame-label {
    position: absolute;

    top: -1px;
    right: 2.2rem;

    transform: translateY(-50%);

    padding: 0 0.8rem;

    background: #050d1e;

    color: rgba(255, 255, 255, 0.58);

    font-size: 0.62rem;
    font-weight: 800;
    letter-spacing: 0.2em;
    text-transform: uppercase;
  }

  .image-frame {
    position: relative;

    width: 100%;
    aspect-ratio: 1.55 / 1;

    overflow: visible;

    background: #0b172b;
  }

  .hero-main-image {
    width: 100%;
    height: 100%;

    display: block;

    object-fit: cover;

    filter:
      saturate(0.96)
      contrast(1.02);

    transition:
      transform 0.8s ease,
      filter 0.4s ease;
  }

  .hero-visual:hover .hero-main-image {
    transform: scale(1.008);
    filter:
      saturate(1.02)
      contrast(1.03);
  }

  .image-overlay {
    position: absolute;
    inset: 0;

    pointer-events: none;

    background:
      linear-gradient(
        180deg,
        rgba(5, 13, 30, 0.03),
        rgba(5, 13, 30, 0.08)
      );
  }

  /* =========================================================
     DATA CARDS
  ========================================================= */

  .data-card {
    position: absolute;

    z-index: 5;

    min-width: 188px;

    padding:
      1.25rem
      1.35rem;

    background: rgba(5, 13, 30, 0.96);

    border: 1px solid rgba(255, 255, 255, 0.2);

    box-shadow:
      0 18px 45px rgba(0, 0, 0, 0.32);

    backdrop-filter: blur(10px);

    display: flex;
    flex-direction: column;
  }

  .monitoring-card {
    top: 3.1rem;
    left: -2.5rem;
  }

  .water-card {
    right: -2.4rem;
    bottom: 2.5rem;
  }

  .data-number {
    color: #fff;

    font-size: 2.35rem;
    line-height: 0.95;

    font-weight: 700;
    letter-spacing: -0.045em;
  }

  .data-label {
    margin-top: 0.45rem;

    color: rgba(255, 255, 255, 0.48);

    font-size: 0.62rem;
    font-weight: 800;
    letter-spacing: 0.15em;
  }

  .data-line {
    width: 28px;
    height: 2px;

    margin-top: 0.8rem;

    background: #ff5c2a;
  }

  /* =========================================================
     INSET IMAGE
  ========================================================= */

  .hero-inset {
    position: absolute;

    z-index: 6;

    left: -2rem;
    bottom: -2rem;

    width: 31%;
    min-width: 180px;

    padding: 0.42rem;

    background: #050d1e;

    border: 1px solid rgba(255, 255, 255, 0.16);

    box-shadow:
      0 18px 50px rgba(0, 0, 0, 0.3);
  }

  .hero-inset img {
    width: 100%;
    aspect-ratio: 1 / 0.9;

    display: block;

    object-fit: cover;
  }

  /* =========================================================
     LOCATION
  ========================================================= */

  .frame-location {
    display: flex;
    align-items: center;
    gap: 0.75rem;

    margin-top: 0.85rem;

    color: rgba(255, 255, 255, 0.4);

    font-size: 0.61rem;
    font-weight: 800;
    letter-spacing: 0.19em;
    text-transform: uppercase;
  }

  .location-line {
    width: 26px;
    height: 1px;
    background: rgba(255, 255, 255, 0.25);
  }

  /* =========================================================
     TECH STRIP
  ========================================================= */

  .strip {
    background: #071224;

    border-top: 1px solid rgba(255, 255, 255, 0.06);
    border-bottom: 1px solid rgba(255, 255, 255, 0.06);
  }

  .strip-inner {
    max-width: 1280px;

    min-height: 60px;

    margin: 0 auto;
    padding: 0 2rem;

    display: flex;
    align-items: center;
    gap: 2rem;
  }

  .strip-label {
    color: rgba(255, 255, 255, 0.27);

    font-size: 0.61rem;
    font-weight: 800;
    letter-spacing: 0.18em;

    white-space: nowrap;
  }

  .strip-items {
    display: flex;
    align-items: center;
    gap: 1.7rem;

    overflow: hidden;

    color: rgba(255, 255, 255, 0.45);

    font-size: 0.68rem;
    font-weight: 700;
    letter-spacing: 0.08em;
    text-transform: uppercase;
  }

  .strip-items span {
    white-space: nowrap;
  }

  .strip-items i {
    width: 3px;
    height: 3px;

    flex-shrink: 0;

    background: #ff5c2a;

    border-radius: 50%;
  }

  /* =========================================================
     STATS
  ========================================================= */

  .stats-section {
    padding: 4.5rem 0;

    background: #050d1e;

    border-bottom: 1px solid rgba(255, 255, 255, 0.06);
  }

  .stats-grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);

    opacity: 0;
    transform: translateY(20px);

    transition:
      opacity 0.7s ease,
      transform 0.7s ease;
  }

  .stats-grid.vis {
    opacity: 1;
    transform: none;
  }

  .stat-block {
    position: relative;

    padding:
      0 2rem;

    text-align: center;
  }

  .stat-block:not(:last-child)::after {
    content: "";

    position: absolute;

    top: 10%;
    right: 0;

    width: 1px;
    height: 80%;

    background: rgba(255, 255, 255, 0.08);
  }

  .stat-value {
    display: flex;
    justify-content: center;
    align-items: flex-end;
    gap: 0.1rem;
  }

  .snum {
    color: #ff5c2a;

    font-size: clamp(2.6rem, 4vw, 4rem);

    line-height: 0.9;

    font-weight: 700;

    letter-spacing: -0.06em;
  }

  .stat-sfx {
    color: #ff5c2a;

    padding-bottom: 0.15rem;

    font-size: 1.5rem;
    font-weight: 700;
  }

  .stat-block > p {
    margin-top: 0.7rem;

    color: rgba(255, 255, 255, 0.42);

    font-size: 0.68rem;
    font-weight: 700;
    letter-spacing: 0.08em;
    text-transform: uppercase;
  }

  .stats-note {
    margin-top: 2rem;

    color: rgba(255, 255, 255, 0.22);

    text-align: center;

    font-size: 0.62rem;
  }

  /* =========================================================
     SHARED
  ========================================================= */

  .section {
    padding: 7rem 0;
  }

  .container {
    width: min(1280px, calc(100% - 4rem));

    margin: 0 auto;
  }

  .bg-white {
    background: #fff;
  }

  .bg-light {
    background: #f5f6f7;
  }

  .bg-navy {
    background: #050d1e;
  }

  .stag {
    display: inline-flex;
    align-items: center;
    gap: 0.65rem;

    margin-bottom: 1rem;

    color: #ff5c2a;

    font-size: 0.64rem;
    font-weight: 800;
    letter-spacing: 0.18em;
    text-transform: uppercase;
  }

  .stag::before {
    content: "";

    width: 22px;
    height: 1px;

    background: currentColor;
  }

  .stag.light {
    color: #ff7045;
  }

  h2 {
    color: #050d1e;

    font-size: clamp(2.3rem, 4vw, 4rem);

    line-height: 1.02;

    font-weight: 600;

    letter-spacing: -0.055em;

    margin-bottom: 1.2rem;
  }

  h2.light {
    color: #fff;
  }

  h2 em {
    color: #ff5c2a;
    font-style: normal;
  }

  .sub {
    color: #667085;

    font-size: 0.94rem;

    line-height: 1.85;
  }

  .sub.light {
    color: rgba(255, 255, 255, 0.48);
  }

  .sec-hdr {
    max-width: 720px;

    margin: 0 auto 4rem;

    text-align: center;

    opacity: 0;
    transform: translateY(22px);

    transition:
      opacity 0.7s ease,
      transform 0.7s ease;
  }

  .sec-hdr.vis {
    opacity: 1;
    transform: none;
  }

  /* =========================================================
     BUTTONS
  ========================================================= */

  .btn-primary {
    display: inline-flex;
    align-items: center;
    gap: 1rem;

    margin-top: 1.5rem;

    padding:
      0.9rem
      1.35rem;

    background: #ff5c2a;
    color: #fff;

    border: 1px solid #ff5c2a;
    border-radius: 2px;

    text-decoration: none;

    font-size: 0.69rem;
    font-weight: 800;
    letter-spacing: 0.11em;
    text-transform: uppercase;

    transition:
      background 0.2s ease,
      transform 0.2s ease;
  }

  .btn-primary:hover {
    background: #ed4e20;
    transform: translateY(-2px);
  }

  .btn-primary span {
    font-size: 1rem;
  }

  .btn-lg {
    padding:
      1rem
      1.5rem;
  }

  .btn-outline {
    display: inline-flex;
    align-items: center;

    padding:
      0.95rem
      1.35rem;

    color: #fff;

    border: 1px solid rgba(255, 255, 255, 0.2);

    text-decoration: none;

    border-radius: 2px;

    font-size: 0.69rem;
    font-weight: 800;
    letter-spacing: 0.1em;
    text-transform: uppercase;

    transition:
      color 0.2s ease,
      border-color 0.2s ease;
  }

  .btn-outline.dark {
    color: #374151;
    border-color: #d9dde3;
  }

  .btn-outline:hover {
    color: #ff5c2a;
    border-color: #ff5c2a;
  }

  /* =========================================================
     INSTALLATIONS
  ========================================================= */

  .inst-cards {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 1px;

    background: #dfe3e8;

    opacity: 0;
    transform: translateY(24px);

    transition:
      opacity 0.8s ease,
      transform 0.8s ease;
  }

  .inst-cards.vis {
    opacity: 1;
    transform: none;
  }

  .inst-card {
    position: relative;

    min-height: 370px;

    padding: 2.5rem;
  }

  .inst-dark {
    background: #071224;
  }

  .inst-lite {
    background: #fff;
  }

  .inst-index {
    position: absolute;

    top: 2rem;
    right: 2rem;

    color: rgba(255, 255, 255, 0.18);

    font-size: 0.68rem;
    font-weight: 800;
    letter-spacing: 0.15em;
  }

  .inst-lite .inst-index {
    color: #d3d7dd;
  }

  .inst-badge {
    display: inline-flex;

    padding:
      0.35rem
      0.7rem;

    background: rgba(255, 92, 42, 0.1);

    color: #ff5c2a;

    font-size: 0.61rem;
    font-weight: 800;
    letter-spacing: 0.12em;
    text-transform: uppercase;
  }

  .inst-dark .inst-badge {
    background: rgba(255, 92, 42, 0.13);
  }

  .inst-card h3 {
    margin:
      1.4rem
      0
      0.8rem;

    font-size: 1.45rem;
    font-weight: 700;
    letter-spacing: -0.03em;
  }

  .inst-dark h3 {
    color: #fff;
  }

  .inst-lite h3 {
    color: #050d1e;
  }

  .inst-card > p {
    max-width: 600px;

    margin-bottom: 1.4rem;

    font-size: 0.88rem;
    line-height: 1.8;
  }

  .inst-dark > p {
    color: rgba(255, 255, 255, 0.5);
  }

  .inst-lite > p {
    color: #667085;
  }

  .inst-card ul {
    list-style: none;

    display: flex;
    flex-direction: column;

    gap: 0.55rem;
  }

  .inst-card li {
    position: relative;

    padding-left: 1.2rem;

    font-size: 0.78rem;
  }

  .inst-card li::before {
    content: "→";

    position: absolute;
    left: 0;

    color: #ff5c2a;
  }

  .inst-dark li {
    color: rgba(255, 255, 255, 0.68);
  }

  .inst-lite li {
    color: #475467;
  }

  .media-cta {
    display: flex;
    justify-content: center;

    opacity: 0;
    transform: translateY(16px);

    transition:
      opacity 0.7s ease 0.15s,
      transform 0.7s ease 0.15s;
  }

  .media-cta.vis {
    opacity: 1;
    transform: none;
  }

  /* =========================================================
     AQUAPONICS SPLIT
  ========================================================= */

  .split {
    display: grid;
    grid-template-columns: 1.05fr 0.95fr;

    gap: 6rem;

    align-items: center;

    opacity: 0;
    transform: translateY(28px);

    transition:
      opacity 0.8s ease,
      transform 0.8s ease;
  }

  .split.vis {
    opacity: 1;
    transform: none;
  }

  .split-imgs {
    position: relative;

    padding-bottom: 2rem;
    padding-right: 2rem;
  }

  .split-image-main {
    overflow: hidden;

    border: 1px solid #e2e6eb;
  }

  .split-image-main img {
    display: block;

    width: 100%;
    height: 480px;

    object-fit: cover;

    transition: transform 0.6s ease;
  }

  .split-imgs:hover .split-image-main img {
    transform: scale(1.025);
  }

  .split-image-float {
    position: absolute;

    right: 0;
    bottom: 0;

    width: 42%;

    padding: 0.4rem;

    background: #fff;

    border: 1px solid #dfe3e8;
  }

  .split-image-float img {
    display: block;

    width: 100%;
    height: 170px;

    object-fit: cover;
  }

  .image-number {
    position: absolute;

    left: 0;
    bottom: 0;

    color: #98a2b3;

    font-size: 0.61rem;
    font-weight: 800;
    letter-spacing: 0.15em;
  }

  .split-text {
    max-width: 520px;
  }

  .split-text h2 {
    text-align: left;
  }

  .split-text > p {
    color: #667085;

    margin:
      1rem
      0
      1.5rem;

    font-size: 0.92rem;
    line-height: 1.85;
  }

  .cklist {
    list-style: none;
  }

  .cklist li {
    position: relative;

    padding:
      0.75rem
      0
      0.75rem
      1.5rem;

    border-bottom: 1px solid #edf0f2;

    color: #344054;

    font-size: 0.82rem;
  }

  .cklist li::before {
    content: "✓";

    position: absolute;
    left: 0;

    color: #ff5c2a;

    font-weight: 800;
  }

  /* =========================================================
     AUTOMATION
  ========================================================= */

  .tech-banner {
    position: relative;

    margin-bottom: 1px;

    overflow: hidden;

    border: 1px solid rgba(255, 255, 255, 0.09);

    opacity: 0;
    transform: translateY(20px);

    transition:
      opacity 0.7s ease,
      transform 0.7s ease;
  }

  .tech-banner.vis {
    opacity: 1;
    transform: none;
  }

  .tech-banner img {
    display: block;

    width: 100%;
    height: 330px;

    object-fit: cover;

    filter:
      brightness(0.48)
      saturate(0.75);
  }

  .tb-overlay {
    position: absolute;
    inset: 0;

    display: flex;
    flex-direction: column;
    justify-content: flex-end;

    padding: 2rem;

    background:
      linear-gradient(
        transparent 30%,
        rgba(5, 13, 30, 0.8)
      );
  }

  .tb-index {
    margin-bottom: 0.5rem;

    color: #ff5c2a;

    font-size: 0.61rem;
    font-weight: 800;
    letter-spacing: 0.18em;
  }

  .tb-overlay p {
    max-width: 680px;

    color: rgba(255, 255, 255, 0.7);

    font-size: 0.78rem;
    letter-spacing: 0.04em;
  }

  .cards-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);

    gap: 1px;

    background: rgba(255, 255, 255, 0.08);

    margin-bottom: 4rem;

    opacity: 0;
    transform: translateY(20px);

    transition:
      opacity 0.8s ease,
      transform 0.8s ease;
  }

  .cards-grid.vis {
    opacity: 1;
    transform: none;
  }

  .fcard {
    min-height: 190px;

    padding: 1.8rem;

    background: #071224;

    transition: background 0.2s ease;
  }

  .fcard:hover {
    background: #0b192e;
  }

  .fc-index {
    display: block;

    margin-bottom: 1.1rem;

    color: rgba(255, 255, 255, 0.2);

    font-size: 0.59rem;
    font-weight: 800;
    letter-spacing: 0.15em;
  }

  .fc-ico {
    display: block;

    margin-bottom: 0.8rem;

    color: #ff5c2a;

    font-size: 1.1rem;
  }

  .fcard h4 {
    margin-bottom: 0.45rem;

    color: #fff;

    font-size: 0.84rem;
    font-weight: 700;
  }

  .fcard p {
    color: rgba(255, 255, 255, 0.42);

    font-size: 0.76rem;
    line-height: 1.75;
  }

  /* =========================================================
     TIMELINE
  ========================================================= */

  .timeline {
    opacity: 0;
    transform: translateY(20px);

    transition:
      opacity 0.8s ease 0.1s,
      transform 0.8s ease 0.1s;
  }

  .timeline.vis {
    opacity: 1;
    transform: none;
  }

  .timeline-head {
    display: flex;
    justify-content: space-between;

    padding-bottom: 0.8rem;

    border-bottom: 1px solid rgba(255, 255, 255, 0.1);

    color: rgba(255, 255, 255, 0.24);

    font-size: 0.58rem;
    font-weight: 800;
    letter-spacing: 0.15em;
  }

  .tl-row {
    display: grid;
    grid-template-columns: 50px 16px 1fr;

    gap: 1rem;

    padding:
      1.2rem
      0;

    border-bottom: 1px solid rgba(255, 255, 255, 0.07);
  }

  .tl-number {
    color: rgba(255, 255, 255, 0.22);

    font-size: 0.62rem;
    font-weight: 800;
    letter-spacing: 0.1em;
  }

  .tl-dot {
    width: 9px;
    height: 9px;

    margin-top: 0.25rem;

    border: 1px solid rgba(255, 92, 42, 0.35);

    border-radius: 50%;
  }

  .tl-dot.done {
    background: #ff5c2a;
    border-color: #ff5c2a;
  }

  .tl-dot.active {
    border-color: #ff5c2a;

    box-shadow:
      0 0 0 4px rgba(255, 92, 42, 0.12);
  }

  .tl-content strong {
    display: block;

    margin-bottom: 0.25rem;

    color: #fff;

    font-size: 0.82rem;
  }

  .tl-content p {
    color: rgba(255, 255, 255, 0.4);

    font-size: 0.74rem;
  }

  /* =========================================================
     SPECIES
  ========================================================= */

  .sp-row {
    display: grid;
    grid-template-columns: repeat(3, 1fr);

    gap: 1px;

    background: #dfe3e8;

    margin-bottom: 3rem;

    opacity: 0;
    transform: translateY(20px);

    transition:
      opacity 0.8s ease,
      transform 0.8s ease;
  }

  .sp-row.vis {
    opacity: 1;
    transform: none;
  }

  .sp-card {
    background: #fff;
  }

  .sp-hdr {
    display: flex;
    align-items: center;
    justify-content: space-between;

    padding:
      1.2rem
      1.4rem;

    background: var(--species-color);

    color: #fff;
  }

  .sp-hdr > span:first-child {
    font-size: 0.67rem;
    font-weight: 800;
    letter-spacing: 0.1em;
    text-transform: uppercase;
  }

  .sp-number {
    color: rgba(255, 255, 255, 0.5);

    font-size: 0.6rem;
    font-weight: 800;
  }

  .sp-card ul {
    list-style: none;

    display: flex;
    flex-direction: column;
    gap: 0.6rem;

    padding: 1.4rem;
  }

  .sp-card li {
    position: relative;

    padding-left: 1rem;

    color: #475467;

    font-size: 0.78rem;
  }

  .sp-card li::before {
    content: "→";

    position: absolute;
    left: 0;

    color: #ff5c2a;
  }

  /* =========================================================
     BENTO
  ========================================================= */

  .bento {
    display: grid;
    grid-template-columns: 1.45fr 0.85fr;

    gap: 1px;

    background: #dfe3e8;

    opacity: 0;
    transform: translateY(20px);

    transition:
      opacity 0.8s ease 0.1s,
      transform 0.8s ease 0.1s;
  }

  .bento.vis {
    opacity: 1;
    transform: none;
  }

  .bento-big {
    position: relative;

    min-height: 560px;

    overflow: hidden;

    background: #071224;
  }

  .bento-big img {
    display: block;

    width: 100%;
    height: 100%;

    object-fit: cover;

    transition: transform 0.6s ease;
  }

  .bento-big:hover img {
    transform: scale(1.025);
  }

  .bento-overlay {
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;

    display: flex;
    flex-direction: column;
    gap: 0.35rem;

    padding: 4rem 1.7rem 1.5rem;

    background:
      linear-gradient(
        transparent,
        rgba(5, 13, 30, 0.85)
      );

    color: #fff;
  }

  .bento-overlay span {
    color: rgba(255, 255, 255, 0.45);

    font-size: 0.58rem;
    font-weight: 800;
    letter-spacing: 0.15em;
  }

  .bento-overlay strong {
    font-size: 0.85rem;
  }

  .bento-small {
    display: grid;
    grid-template-rows: auto 1fr auto;

    gap: 1px;

    background: #dfe3e8;
  }

  .bento-stat {
    padding: 1.7rem;

    background: #ff5c2a;

    color: #fff;
  }

  .bs-index {
    display: block;

    margin-bottom: 1.4rem;

    color: rgba(255, 255, 255, 0.55);

    font-size: 0.58rem;
    font-weight: 800;
    letter-spacing: 0.16em;
  }

  .bs-n {
    display: block;

    font-size: 4rem;
    line-height: 0.9;
    font-weight: 700;

    letter-spacing: -0.06em;
  }

  .bs-l {
    display: block;

    margin-top: 0.5rem;

    color: rgba(255, 255, 255, 0.7);

    font-size: 0.65rem;
    font-weight: 700;
    letter-spacing: 0.07em;
    text-transform: uppercase;
  }

  .bento-photo {
    overflow: hidden;

    background: #071224;
  }

  .bento-photo img {
    width: 100%;
    height: 210px;

    display: block;

    object-fit: cover;
  }

  .bento-txt {
    padding: 1.6rem;

    background: #f7f8f9;
  }

  .small-label {
    display: block;

    margin-bottom: 0.55rem;

    color: #ff5c2a;

    font-size: 0.58rem;
    font-weight: 800;
    letter-spacing: 0.16em;
  }

  .bento-txt h4 {
    margin-bottom: 0.45rem;

    color: #050d1e;

    font-size: 0.9rem;
    font-weight: 700;
  }

  .bento-txt p {
    color: #667085;

    font-size: 0.76rem;
    line-height: 1.75;
  }

  /* =========================================================
     GALLERY
  ========================================================= */

  .gallery {
    display: grid;
    grid-template-columns: repeat(3, 1fr);

    gap: 1px;

    background: #dfe3e8;

    margin-bottom: 1px;

    opacity: 0;
    transform: translateY(20px);

    transition:
      opacity 0.8s ease,
      transform 0.8s ease;
  }

  .gallery.vis {
    opacity: 1;
    transform: none;
  }

  .g-slot {
    position: relative;

    aspect-ratio: 4 / 3;

    overflow: hidden;

    background: #e5e7eb;
  }

  .g-slot img {
    display: block;

    width: 100%;
    height: 100%;

    object-fit: cover;

    transition: transform 0.5s ease;
  }

  .g-slot:hover img {
    transform: scale(1.045);
  }

  .g-ph {
    width: 100%;
    height: 100%;

    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    gap: 0.35rem;

    color: #98a2b3;
  }

  .g-ph span {
    font-size: 1.5rem;
  }

  .g-ph small {
    font-size: 0.7rem;
  }

  .g-cap {
    position: absolute;

    left: 0;
    right: 0;
    bottom: 0;

    display: flex;
    align-items: center;
    gap: 0.6rem;

    padding:
      2rem
      0.9rem
      0.75rem;

    background:
      linear-gradient(
        transparent,
        rgba(5, 13, 30, 0.8)
      );

    color: rgba(255, 255, 255, 0.85);

    font-size: 0.68rem;
  }

  .g-cap span {
    color: #ff5c2a;

    font-size: 0.58rem;
    font-weight: 800;
  }

  .vid-row {
    display: grid;
    grid-template-columns: repeat(2, 1fr);

    gap: 1px;

    background: #dfe3e8;

    opacity: 0;
    transform: translateY(20px);

    transition:
      opacity 0.8s ease 0.1s,
      transform 0.8s ease 0.1s;
  }

  .vid-row.vis {
    opacity: 1;
    transform: none;
  }

  .vid-slot {
    aspect-ratio: 16 / 9;

    background: #f7f8f9;
  }

  .vid-ph {
    width: 100%;
    height: 100%;

    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;

    gap: 0.65rem;
  }

  .video-number {
    color: #98a2b3;

    font-size: 0.57rem;
    font-weight: 800;
    letter-spacing: 0.15em;
  }

  .play-ring {
    width: 52px;
    height: 52px;

    display: flex;
    align-items: center;
    justify-content: center;

    border: 1px solid #cfd4dc;
    border-radius: 50%;

    color: #667085;

    font-size: 0.9rem;

    padding-left: 2px;
  }

  .vid-ph > span:not(.video-number) {
    color: #344054;

    font-size: 0.8rem;
    font-weight: 700;
  }

  .vid-ph small {
    color: #98a2b3;

    font-size: 0.65rem;
  }

  .btn-view-presentation {
    display: inline-flex;
    align-items: center;
    gap: 0.9rem;

    padding:
      0.95rem
      1.4rem;

    background: #050d1e;
    color: #fff;

    border: 1px solid #050d1e;

    text-decoration: none;

    font-size: 0.68rem;
    font-weight: 800;
    letter-spacing: 0.1em;
    text-transform: uppercase;

    transition:
      background 0.2s ease,
      transform 0.2s ease;
  }

  .btn-view-presentation:hover {
    background: #ff5c2a;
    border-color: #ff5c2a;

    transform: translateY(-2px);
  }

  /* =========================================================
     CONTACT
  ========================================================= */

  .final-cta {
    position: relative;

    padding: 7rem 0;

    overflow: hidden;

    background: #071224;

    text-align: center;
  }

  .final-grid {
    position: absolute;
    inset: 0;

    opacity: 0.25;

    background-image:
      linear-gradient(
        rgba(255, 255, 255, 0.025) 1px,
        transparent 1px
      ),
      linear-gradient(
        90deg,
        rgba(255, 255, 255, 0.025) 1px,
        transparent 1px
      );

    background-size: 80px 80px;

    pointer-events: none;
  }

  .final-inner {
    position: relative;
    z-index: 1;
  }

  .final-cta h2 {
    max-width: 800px;

    margin:
      0
      auto
      1rem;

    color: #fff;

    font-size: clamp(2.5rem, 5vw, 4.8rem);

    letter-spacing: -0.06em;
  }

  .final-cta > .container > p {
    max-width: 560px;

    margin:
      0
      auto
      2.2rem;

    color: rgba(255, 255, 255, 0.48);

    font-size: 0.9rem;
    line-height: 1.8;
  }

  .cta-row {
    display: flex;
    align-items: center;
    justify-content: center;

    flex-wrap: wrap;

    gap: 0.7rem;
  }

  /* =========================================================
     FOOTER
  ========================================================= */

  footer {
    background: #030914;

    padding:
      4.5rem
      0
      3rem;

    border-top: 1px solid rgba(255, 255, 255, 0.06);
  }

  .footer-grid {
    display: grid;
    grid-template-columns: 1.7fr 0.8fr 1fr 1.6fr;

    gap: 3rem;
  }

  .footer-brand {
    display: flex;
    align-items: baseline;

    margin-bottom: 0.6rem;

    color: #fff;

    font-size: 1.4rem;
    font-weight: 800;
    letter-spacing: -0.05em;
  }

  .footer-brand > span:first-child {
    color: #fff;
  }

  .footer-dot {
    color: #ff5c2a;
  }

  .footer-brand > span:last-child {
    color: rgba(255, 255, 255, 0.4);

    margin-left: 0.1rem;

    font-size: 0.7rem;
    letter-spacing: 0.15em;
  }

  .footer-grid > div > p {
    color: rgba(255, 255, 255, 0.32);

    font-size: 0.74rem;
  }

  .social-links {
    display: flex;
    align-items: center;
    gap: 0.9rem;

    margin-top: 1.2rem;
  }

  .social-icon {
    display: flex;
    align-items: center;
    justify-content: center;

    color: rgba(255, 255, 255, 0.3);

    transition: color 0.2s ease;
  }

  .social-icon:hover {
    color: #ff5c2a;
  }

  .social-icon svg {
    width: 18px;
    height: 18px;
  }

  .footer-col {
    display: flex;
    flex-direction: column;

    gap: 0.55rem;
  }

  .footer-col h5,
  .foot-map h5 {
    margin-bottom: 0.55rem;

    color: rgba(255, 255, 255, 0.25);

    font-size: 0.59rem;
    font-weight: 800;
    letter-spacing: 0.17em;
    text-transform: uppercase;
  }

  .footer-col a {
    color: rgba(255, 255, 255, 0.45);

    font-size: 0.75rem;

    text-decoration: none;

    transition: color 0.2s ease;
  }

  .footer-col a:hover {
    color: #ff5c2a;
  }

  .footer-note > p {
    margin-bottom: 0.35rem;

    color: rgba(255, 255, 255, 0.27);

    font-size: 0.7rem;
  }

  .foot-map {
    max-width: 340px;

    margin-top: 1.5rem;
  }

  .foot-map-frame {
    position: relative;

    aspect-ratio: 16 / 10;

    overflow: hidden;

    border: 1px solid rgba(255, 255, 255, 0.08);
  }

  .foot-map-frame iframe {
    width: 100%;
    height: 100%;

    display: block;

    border: 0;

    filter:
      invert(92%)
      hue-rotate(180deg)
      contrast(0.86)
      saturate(0.75);
  }

  .foot-dir {
    display: inline-block;

    margin-top: 0.65rem;

    color: rgba(255, 255, 255, 0.38);

    text-decoration: none;

    font-size: 0.72rem;
    font-weight: 700;

    transition: color 0.2s ease;
  }

  .foot-dir:hover {
    color: #ff5c2a;
  }

  /* =========================================================
     RESPONSIVE
  ========================================================= */

  @media (max-width: 1200px) {
    .hero-inner {
      grid-template-columns:
        minmax(280px, 0.72fr)
        minmax(500px, 1.28fr);

      gap: 3rem;
    }

    .monitoring-card {
      left: -1.5rem;
    }

    .water-card {
      right: -1.5rem;
    }

    .hero-inset {
      left: -1.2rem;
    }
  }

  @media (max-width: 1024px) {
    .desktop-links,
    .btn-nav {
      display: none;
    }

    .hamburger {
      display: flex;
    }

    .hero {
      padding:
        8rem
        1.5rem
        5rem;
    }

    .hero-inner {
      grid-template-columns: 1fr;

      gap: 4rem;
    }

    .hero-copy {
      max-width: 700px;
    }

    .hero-copy h1 {
      font-size: clamp(
        3.2rem,
        7vw,
        5.2rem
      );
    }

    .hero-visual {
      max-width: 850px;
      margin: 0 auto;
    }

    .split {
      grid-template-columns: 1fr;

      gap: 4rem;
    }

    .split-text {
      max-width: 700px;
    }

    .split-imgs {
      max-width: 800px;
    }

    .footer-grid {
      grid-template-columns: 1.5fr 1fr 1fr;
    }

    .footer-note {
      grid-column: 1 / -1;
    }
  }

  @media (max-width: 768px) {
    .nav-inner {
      height: 68px;
      padding: 0 1.25rem;
    }

    .mobile-menu {
      top: 68px;
    }

    .hero {
      min-height: auto;

      padding:
        7.5rem
        1.25rem
        5rem;
    }

    .hero-inner {
      gap: 3.2rem;
    }

    .hero-copy h1 {
      font-size: clamp(
        3rem,
        13vw,
        4.4rem
      );
    }

    .hero-sub {
      font-size: 0.87rem;
    }

    .hero-visual {
      width: calc(100% - 1rem);

      margin-left: 1rem;
    }

    .system-frame {
      padding: 0.7rem;
    }

    .image-frame {
      aspect-ratio: 1.18 / 1;
    }

    .monitoring-card {
      top: 1.5rem;
      left: -1.3rem;

      min-width: 155px;

      padding: 1rem;
    }

    .water-card {
      right: -1.1rem;
      bottom: 1.5rem;

      min-width: 155px;

      padding: 1rem;
    }

    .data-number {
      font-size: 1.8rem;
    }

    .hero-inset {
      left: -0.8rem;
      bottom: -1.2rem;

      width: 31%;
      min-width: 130px;
    }

    .strip-inner {
      padding:
        0
        1.25rem;
    }

    .strip-items {
      overflow-x: auto;

      padding:
        0.9rem
        0;

      scrollbar-width: none;
    }

    .strip-items::-webkit-scrollbar {
      display: none;
    }

    .stats-grid {
      grid-template-columns: repeat(2, 1fr);
      gap: 2.5rem 0;
    }

    .stat-block:nth-child(2)::after {
      display: none;
    }

    .section {
      padding: 5rem 0;
    }

    .container {
      width: min(
        100% - 2.5rem,
        1280px
      );
    }

    .inst-cards {
      grid-template-columns: 1fr;
    }

    .inst-card {
      min-height: auto;
    }

    .cards-grid {
      grid-template-columns: repeat(2, 1fr);
    }

    .sp-row {
      grid-template-columns: 1fr;
    }

    .bento {
      grid-template-columns: 1fr;
    }

    .bento-big {
      min-height: 420px;
    }

    .bento-small {
      grid-template-columns: 1fr 1fr;
      grid-template-rows: auto auto;
    }

    .bento-stat {
      grid-column: 1 / -1;
    }

    .bento-photo {
      min-height: 180px;
    }

    .bento-photo img {
      height: 100%;
      min-height: 180px;
    }

    .bento-txt {
      min-height: 180px;
    }

    .gallery {
      grid-template-columns: repeat(2, 1fr);
    }

    .footer-grid {
      grid-template-columns: 1fr 1fr;
    }
  }

  @media (max-width: 560px) {
    .hero {
      padding:
        7rem
        1rem
        4rem;
    }

    .hero-copy h1 {
      font-size: 2.85rem;
    }

    .hero-actions {
      flex-direction: column;
      align-items: stretch;
    }

    .hero-primary,
    .hero-secondary {
      justify-content: space-between;
    }

    .hero-trust {
      flex-direction: column;
      gap: 0.55rem;
    }

    .hero-visual {
      width: calc(100% - 0.5rem);
      margin-left: 0.5rem;
    }

    .frame-label {
      right: 1rem;
    }

    .image-frame {
      aspect-ratio: 0.92 / 1;
    }

    .monitoring-card {
      top: 1rem;
      left: -0.8rem;
    }

    .water-card {
      right: -0.7rem;
      bottom: 1rem;
    }

    .data-card {
      min-width: 130px;
      padding: 0.8rem;
    }

    .data-number {
      font-size: 1.5rem;
    }

    .data-label {
      font-size: 0.5rem;
    }

    .hero-inset {
      left: -0.4rem;
      bottom: -0.7rem;

      width: 32%;
      min-width: 100px;
    }

    .frame-location {
      font-size: 0.52rem;
    }

    .stats-grid {
      grid-template-columns: 1fr 1fr;
    }

    .stat-block {
      padding: 0 0.8rem;
    }

    .stat-block:nth-child(odd)::after {
      display: block;
    }

    .stat-block:nth-child(even)::after {
      display: none;
    }

    .snum {
      font-size: 2.5rem;
    }

    .stat-sfx {
      font-size: 1.2rem;
    }

    .sec-hdr {
      margin-bottom: 3rem;
    }

    h2 {
      font-size: 2.35rem;
    }

    .split-imgs {
      padding:
        0
        0
        1.5rem;
    }

    .split-image-main img {
      height: 340px;
    }

    .split-image-float {
      width: 44%;
    }

    .split-image-float img {
      height: 120px;
    }

    .cards-grid {
      grid-template-columns: 1fr;
    }

    .timeline-head {
      gap: 1rem;
      flex-direction: column;
    }

    .bento-small {
      grid-template-columns: 1fr;
    }

    .bento-stat {
      grid-column: auto;
    }

    .gallery {
      grid-template-columns: 1fr;
    }

    .vid-row {
      grid-template-columns: 1fr;
    }

    .footer-grid {
      grid-template-columns: 1fr;
    }

    .footer-note {
      grid-column: auto;
    }

    .cta-row {
      flex-direction: column;
      align-items: stretch;

      max-width: 320px;
      margin: 0 auto;
    }

    .cta-row .btn-primary,
    .cta-row .btn-outline {
      justify-content: center;
    }
  }

  /* =========================================================
     REDUCED MOTION
  ========================================================= */

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