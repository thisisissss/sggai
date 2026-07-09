<script>
  import { translations } from '$lib/i18n.js';
  import { onMount } from "svelte";

  const R2 = "https://media.sustainablegreengold.com";

  let lang = 'en';
  $: t = translations[lang];

  function toggleLang() {
    lang = lang === 'en' ? 'th' : 'en';
  }

  let menuOpen = false;
  let scrolled = false;
  let visible = {};
  let statsTriggered = false;

  let phraseIndex = 0;
  $: cyclingPhrases = t.hero.cycling;
  $: currentPhrase = cyclingPhrases[phraseIndex];
  let phraseVisible = true;

  function toggleMenu() { menuOpen = !menuOpen; }
  function closeMenu() { menuOpen = false; }

  $: navLinks = [
    { label: t.nav.ecosystem, href: "#aquaponics" },
    { label: t.nav.automation, href: "#automation" },
    { label: t.nav.species, href: "#species" },
    { label: t.nav.media, href: "#media" },
    { label: t.nav.growers, href: "#growers", grn: true },
  ];

  $: stats = [
    { value: 6,   suffix: "",  label: t.stats[0].label },
    { value: 12,  suffix: "+", label: t.stats[1].label },
    { value: 100,  suffix: "%*", label: t.stats[2].label },
    { value: 340, suffix: "%", label: t.stats[3].label },
  ];

  const cardIcons = ["⬡", "◈", "◉", "⬟", "◈", "⬡"];
  $: automationCards = t.auto.cards.map((c, i) => ({ ...c, icon: cardIcons[i] }));

  const speciesColors = ["#0a3d62", "#1e5631", "#7f1d1d"];
  $: speciesItems = t.sp.items.map((s, i) => ({ ...s, color: speciesColors[i] }));

  $: gallery = [
    { src: `${R2}/aquaponics/tank1.jpeg`,     cap: t.med.gallery[0] },
    { src: `${R2}/aquaponics/tank2.jpg`,      cap: t.med.gallery[1] },
    { src: `${R2}/sensors/chip.jpeg`,         cap: t.med.gallery[2] },
    { src: `${R2}/plants/fig-fruit.jpg`,      cap: t.med.gallery[3] },
    { src: `${R2}/aquaponics/firstgen.jpeg`,  cap: t.med.gallery[4] },
    { src: `${R2}/aquaponics/my-system2.jpg`, cap: t.med.gallery[5] },
  ];

  $: growGallery = [
    { src: `${R2}/growers/plant1.jpeg`, cap: t.grow.gallery[0] },
    { src: `${R2}/growers/plant2.png`,  cap: t.grow.gallery[1] },
    { src: `${R2}/growers/beds.PNG`,    cap: t.grow.gallery[2] },
  ];

  const timelineStates = ["done", "active", "", ""];
  $: timeline = t.auto.timeline.map((tl, i) => ({ ...tl, state: timelineStates[i] }));

  onMount(() => {
    const onScroll = () => { scrolled = window.scrollY > 40; };
    window.addEventListener("scroll", onScroll);

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          const k = e.target.dataset.reveal;
          if (k) { visible[k] = true; visible = visible; }
          if (e.target.dataset.stats && !statsTriggered) {
            statsTriggered = true;
            document.querySelectorAll(".snum").forEach((el) => {
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

    document.querySelectorAll("[data-reveal],[data-stats]").forEach((el) => observer.observe(el));

    const phraseTimer = setInterval(() => {
      phraseVisible = false;
      setTimeout(() => {
        phraseIndex = (phraseIndex + 1) % cyclingPhrases.length;
        currentPhrase = cyclingPhrases[phraseIndex];
        phraseVisible = true;
      }, 400);
    }, 2800);

    return () => {
      window.removeEventListener("scroll", onScroll);
      observer.disconnect();
      clearInterval(phraseTimer);
    };
  });
</script>

<!-- NAV -->
<header class:scrolled>
  <nav class="nav-inner">
    <a href="/" class="brand" on:click={closeMenu}>
      SGG<span class="brand-accent">·AI</span>
    </a>
    <ul class="desktop-links">
      {#each navLinks as l}<li><a href={l.href} class:grn={l.grn}>{l.label}</a></li>{/each}
    </ul>
    <div class="nav-right">
      <button class="lang-toggle" on:click={toggleLang}>
        {lang === 'en' ? '🇹🇭 ภาษาไทย' : '🇬🇧 English'}
      </button>
      <a href="#contact" class="btn-nav">{t.nav.contact}</a>
      <button class="hamburger" class:open={menuOpen} on:click={toggleMenu} aria-label="Toggle menu">
        <span /><span /><span />
      </button>
    </div>
  </nav>
  <div class="mobile-menu" class:open={menuOpen}>
    {#each navLinks as l}<a href={l.href} class:grn={l.grn} on:click={closeMenu}>{l.label}</a>{/each}
    <a href="#contact" class="m-cta" on:click={closeMenu}>{t.nav.contact} →</a>
  </div>
</header>

<!-- HERO -->
<section class="hero">
  <div class="hero-inner">
    <div class="hero-left">
      <div class="hero-badge"><span class="bdot" /> {t.hero.badge}</div>
      <h1>
        <span class="h1-static">{t.hero.h1_1}</span><br />
        <span class="h1-static">{t.hero.h1_2}</span><br />
        <span class="h1-animated" class:out={!phraseVisible}>{currentPhrase}</span>
      </h1>
      <p class="hero-sub">{t.hero.sub}</p>
      <div class="hero-btns">
        <a href="#aquaponics" class="btn-pill-dark">{t.hero.btn1}</a>
        <a href="#automation" class="btn-pill-outline">{t.hero.btn2}</a>
      </div>
      <div class="trust-row">
        <span class="trust-badge">{t.hero.trust1}</span>
        <span class="trust-badge">{t.hero.trust2}</span>
        <span class="trust-badge">{t.hero.trust3}</span>
      </div>
    </div>
    <div class="hero-right">
      <div class="hero-img-wrap">
        <img src="{R2}/aquaponics/my-system1.jpg" alt="Aquaponics system" class="img-main-hero" />
        <img src="{R2}/plants/fig-fruit.jpg" alt="Plants" class="img-float-hero" />
        <div class="hcard hcard-1"><span class="hc-val">24/7</span><span class="hc-lbl">AI Monitoring</span></div>
        <div class="hcard hcard-2"><span class="hc-val">100%</span><span class="hc-lbl">Water recycled</span></div>
      </div>
    </div>
  </div>
</section>

<!-- TECH STRIP -->
<div class="strip">
  <span class="strip-label">Powered by</span>
  <div class="strip-track">
    <div class="strip-items">
      <span>Sensor Networks</span><span>Edge Computing</span><span>AI Vision</span><span>Custom Probes</span><span>HDPE Infrastructure</span>
      <span>Sensor Networks</span><span>Edge Computing</span><span>AI Vision</span><span>Custom Probes</span><span>HDPE Infrastructure</span>
    </div>
  </div>
</div>

<!-- STATS -->
<section class="stats-section" data-stats data-reveal="stats">
  <div class="container">
    <div class="stats-grid" class:vis={visible["stats"]}>
      {#each stats as s, i}
        <div class="stat-block" style="transition-delay:{i * 0.1}s">
          <div class="stat-val">
            <span class="snum" data-target={s.value}>{s.value}</span>
            <span class="stat-sfx">{s.suffix}</span>
          </div>
          <p>{s.label}</p>
        </div>
      {/each}
</div>
    <p class="stats-note">* Excludes natural evaporation — atmospheric water recovery system in development</p>
  </div>
</section>

<!-- INSTALLATIONS -->
<section id="installations" class="section bg-light" data-reveal="inst">
  <div class="container">
    <div class="sec-hdr" class:vis={visible["inst"]}>
      <div class="stag">{t.inst.tag}</div>
      <h2>{t.inst.h2_1} <em>{t.inst.h2_2}</em></h2>
      <p class="sub">{t.inst.sub}</p>
    </div>
    <div class="inst-cards" class:vis={visible["inst"]}>
      <div class="inst-card inst-dark">
        <div class="inst-badge">{t.inst.full.badge}</div>
        <h3>{t.inst.full.title}</h3>
        <p>{t.inst.full.body}</p>
        <ul>{#each t.inst.full.points as pt}<li>{pt}</li>{/each}</ul>
      </div>
      <div class="inst-card inst-lite">
        <div class="inst-badge">{t.inst.demo.badge}</div>
        <h3>{t.inst.demo.title}</h3>
        <p>{t.inst.demo.body}</p>
        <ul>{#each t.inst.demo.points as pt}<li>{pt}</li>{/each}</ul>
      </div>
    </div>
    <div class="media-cta" class:vis={visible["inst"]}>
      <a href="#contact" class="btn-primary btn-lg">{t.inst.btn}</a>
    </div>
  </div>
</section>

<!-- AQUAPONICS -->
<section id="aquaponics" class="section bg-white" data-reveal="aq">
  <div class="container">
    <div class="split" class:vis={visible["aq"]}>
      <div class="split-imgs">
        <img class="img-main" src="{R2}/aquaponics/harvest.jpg" alt="Farm" />
        <img class="img-float" src="{R2}/aquaponics/growbed2.jpg" alt="Detail" />
      </div>
      <div class="split-text">
        <div class="stag">{t.aq.tag}</div>
        <h2>{t.aq.h2_1}<br /><em>{t.aq.h2_2}</em></h2>
        <p>{t.aq.p}</p>
        <ul class="cklist">
          {#each t.aq.items as item}<li>{item}</li>{/each}
        </ul>
        <a href="#contact" class="btn-primary" style="margin-top:1.5rem">{t.aq.btn}</a>
      </div>
    </div>
  </div>
</section>

<!-- AUTOMATION -->
<section id="automation" class="section bg-navy" data-reveal="auto">
  <div class="container">
    <div class="sec-hdr" class:vis={visible["auto"]}>
      <div class="stag light">{t.auto.tag}</div>
      <h2 class="light">{t.auto.h2_1} <em>{t.auto.h2_2}</em></h2>
      <p class="sub light">{t.auto.sub}</p>
    </div>
    <div class="tech-banner" class:vis={visible["auto"]}>
      <img src="{R2}/sensors/ssgai.jpg" alt="Sensors" />
      <div class="tb-overlay">
        <p>{t.auto.banner}</p>
      </div>
    </div>
    <div class="cards-grid" class:vis={visible["auto"]}>
      {#each automationCards as c, i}
        <div class="fcard" style="transition-delay:{i * 0.07}s">
          <span class="fc-ico">{c.icon}</span>
          <h4>{c.title}</h4>
          <p>{c.body}</p>
        </div>
      {/each}
    </div>
    <div class="timeline" class:vis={visible["auto"]}>
      {#each timeline as tl}
        <div class="tl-row">
          <div class="tl-dot" class:done={tl.state === "done"} class:active={tl.state === "active"} />
          <div><strong>{tl.label}</strong><p>{tl.desc}</p></div>
        </div>
      {/each}
    </div>
  </div>
</section>

<!-- SPECIES -->
<section id="species" class="section bg-white" data-reveal="sp">
  <div class="container">
    <div class="sec-hdr" class:vis={visible["sp"]}>
      <div class="stag">{t.sp.tag}</div>
      <h2>{t.sp.h2_1}<br /><em>{t.sp.h2_2}</em></h2>
      <p class="sub">{t.sp.sub}</p>
    </div>
    <div class="sp-row" class:vis={visible["sp"]}>
      {#each speciesItems as sp, i}
        <div class="sp-card" style="transition-delay:{i * 0.1}s">
          <div class="sp-hdr" style="background:{sp.color}"><span>{sp.cat}</span></div>
          <ul>{#each sp.items as item}<li>{item}</li>{/each}</ul>
        </div>
      {/each}
    </div>
    <div class="bento" class:vis={visible["sp"]}>
      <div class="bento-big">
        <img src="{R2}/fish/fish-habitat.jpeg" alt="Fish" />
        <div class="bento-cap">{t.sp.bento_cap}</div>
      </div>
      <div class="bento-small">
        <div class="bento-stat">
          <span class="bs-n">6</span>
          <span class="bs-l">{t.sp.bento_stat}</span>
        </div>
        <img src="{R2}/plants/perm2.jpeg" alt="Plants" class="bento-img2" />
        <div class="bento-txt">
          <h4>{t.sp.bento_h4}</h4>
          <p>{t.sp.bento_p}</p>
        </div>
      </div>
    </div>
  </div>
</section>

<!-- GROWERS -->
<section id="growers" class="section bg-grow" data-reveal="grow">
  <div class="container">
    <div class="sec-hdr" class:vis={visible["grow"]}>
      <div class="stag">{t.grow.tag}</div>
      <h2>{t.grow.h2_1} <em>{t.grow.h2_2}</em></h2>
      <p class="sub">{t.grow.sub}</p>
    </div>

    <div class="grow-stats" class:vis={visible["grow"]}>
      {#each t.grow.stats as gs, i}
        <div class="gstat" style="transition-delay:{i * 0.08}s">
          <span class="gs-val">{gs.v}</span>
          <span class="gs-lbl">{gs.l}</span>
        </div>
      {/each}
    </div>

    <div class="grow-segs" class:vis={visible["grow"]}>
      {#each t.grow.segs as seg, i}
        <div class="grow-seg" style="transition-delay:{i * 0.1}s">
          <div class="seg-hdr"><span>{seg.cat}</span></div>
          <h4>{seg.title}</h4>
          <p>{seg.body}</p>
          <ul>{#each seg.points as pt}<li>{pt}</li>{/each}</ul>
        </div>
      {/each}
    </div>

    <div class="grow-split" class:vis={visible["grow"]}>
      <div class="grow-text">
        <p class="grow-p">{t.grow.p1}</p>
        <p class="grow-p">{t.grow.p2}</p>
        <ul class="cklist">
          {#each t.grow.items as item}<li>{item}</li>{/each}
        </ul>
      </div>
      <div class="grow-imgs">
        <img class="grow-main" src="{R2}/growers/plant1.jpeg" alt="Cannabis grown on outdoor aquaponics" />
        <img class="grow-float" src="{R2}/growers/beds.PNG" alt="Aquaponic grow beds" />
      </div>
    </div>

    <p class="grow-proof" class:vis={visible["grow"]}>{t.grow.proof}</p>
    <div class="grow-gal" class:vis={visible["grow"]}>
      {#each growGallery as g, i}
        <div class="g-slot" style="transition-delay:{i * 0.06}s">
          <img src={g.src} alt={g.cap} />
          <div class="g-cap">{g.cap}</div>
        </div>
      {/each}
    </div>

    <p class="grow-note" class:vis={visible["grow"]}>{t.grow.note}</p>
    <div class="media-cta" class:vis={visible["grow"]}>
      <a href="#contact" class="btn-grow">{t.grow.btn}</a>
    </div>
  </div>
</section>

<!-- MEDIA -->
<section id="media" class="section bg-light" data-reveal="med">
  <div class="container">
    <div class="sec-hdr" class:vis={visible["med"]}>
      <div class="stag">{t.med.tag}</div>
      <h2>{t.med.h2_1} <em>{t.med.h2_2}</em></h2>
      <p class="sub">{t.med.sub}</p>
    </div>
    <div class="gallery" class:vis={visible["med"]}>
      {#each gallery as g, i}
        <div class="g-slot" style="transition-delay:{i * 0.06}s">
          {#if g.src}
            <img src={g.src} alt={g.cap} />
          {:else}
            <div class="g-ph"><span>＋</span><small>Coming soon</small></div>
          {/if}
          <div class="g-cap">{g.cap}</div>
        </div>
      {/each}
    </div>
    <div class="vid-row" class:vis={visible["med"]}>
      {#each t.med.videos as vt}
        <div class="vid-slot">
          <div class="vid-ph">
            <div class="play-ring">▶</div>
            <span>{vt}</span>
            <small>Video placeholder</small>
          </div>
        </div>
      {/each}
    </div>

    <div class="media-cta" class:vis={visible["med"]}>
<a href={lang === 'th' ? '/Smart_Polyponics_TH.pdf' : '/Smart_Polyponics_EN.pdf'} target="_blank" class="btn-view-presentation">
  {t.med.btn}
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
</a>
    </div>
  </div>
</section>

<!-- CONTACT -->
<section id="contact" class="final-cta">
  <div class="container">
    <h2>{t.contact.h2}</h2>
    <p>{t.contact.p}</p>
    <div class="cta-row">
      <a href="https://line.me/ti/p/carbonbasedlife" class="btn-primary btn-lg" target="_blank">{t.contact.btn1}</a>
      <a href="#aquaponics" class="btn-outline">{t.contact.btn2}</a>
    </div>
  </div>
</section>

<!-- FOOTER -->
<footer>
  <div class="container footer-grid">
    <div>
      <div class="footer-brand">SGG<span>·AI</span></div>
      <p>Sustainable Green Gold AI<br />{t.footer.location}</p>
      <div class="social-links">
        <a href="https://line.me/ti/p/carbonbasedlife" target="_blank" class="social-icon" title="Line">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M19.365 9.863c.349 0 .63.285.63.631 0 .345-.281.63-.63.63H17.61v1.125h1.755c.349 0 .63.283.63.63 0 .344-.281.629-.63.629h-2.386c-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.627-.63h2.386c.349 0 .63.285.63.63 0 .349-.281.63-.63.63H17.61v1.125h1.755zm-3.855 3.016c0 .27-.174.51-.432.596-.064.021-.133.031-.199.031-.211 0-.391-.09-.51-.25l-2.443-3.317v2.94c0 .344-.279.629-.631.629-.346 0-.626-.285-.626-.629V8.108c0-.27.173-.51.43-.595.06-.023.136-.033.194-.033.195 0 .375.105.495.254l2.462 3.33V8.108c0-.345.282-.63.63-.63.345 0 .63.285.63.63v4.771zm-5.741 0c0 .344-.282.629-.631.629-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.627-.63.349 0 .631.285.631.63v4.771zm-2.466.629H4.917c-.345 0-.63-.285-.63-.629V8.108c0-.345.285-.63.63-.63.348 0 .63.285.63.63v4.141h1.756c.348 0 .629.283.629.63 0 .344-.281.629-.629.629M24 10.314C24 4.943 18.615.572 12 .572S0 4.943 0 10.314c0 4.811 4.27 8.842 10.035 9.608.391.082.923.258 1.058.59.12.301.079.766.038 1.08l-.164 1.02c-.045.301-.24 1.186 1.049.645 1.291-.539 6.916-4.078 9.436-6.975C23.176 14.393 24 12.458 24 10.314"/></svg>
        </a>
        <a href="https://facebook.com/profile.php?id=61556530944739" target="_blank" class="social-icon" title="Facebook">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
        </a>
        <a href="https://instagram.com/sustainablegreengold" target="_blank" class="social-icon" title="Instagram">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
        </a>
        <a href="https://twl.ae/sustainablegreengold" target="_blank" class="social-icon" title="Tawasal">
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><g fill="currentColor" transform="translate(12 12) scale(1.3) translate(-12 -12)"><rect x="4.75" y="5.6" width="2.35" height="5.8" rx="0.55" transform="rotate(20 5.925 8.5)"/><rect x="8.05" y="5.6" width="2.35" height="5.8" rx="0.55" transform="rotate(20 9.225 8.5)"/><rect x="13.05" y="5.15" width="6.9" height="2.25" rx="0.55" transform="rotate(23 16.5 6.275)"/><rect x="13.05" y="8.85" width="6.9" height="2.25" rx="0.55" transform="rotate(23 16.5 9.975)"/><rect x="4.05" y="13.15" width="6.9" height="2.25" rx="0.55" transform="rotate(23 7.5 14.275)"/><rect x="4.05" y="16.85" width="6.9" height="2.25" rx="0.55" transform="rotate(23 7.5 17.975)"/><rect x="14" y="13.4" width="2.35" height="5.8" rx="0.55" transform="rotate(20 15.175 16.3)"/><rect x="17.3" y="13.4" width="2.35" height="5.8" rx="0.55" transform="rotate(20 18.475 16.3)"/></g></svg>
</a>
      </div>
    </div>
    <div class="footer-col">
      <h5>{t.footer.nav_title}</h5>
      {#each navLinks as l}<a href={l.href}>{l.label}</a>{/each}
      <a href="#contact">{t.nav.contact}</a>
    </div>
    <div class="footer-col">
      <h5>{t.footer.contact_title}</h5>
      <a href="mailto:contact@sustainablegreengold.com">contact@sustainablegreengold.com</a>
    </div>
    <div class="footer-note">
      <p>{t.footer.rights}</p>
      <p>{t.footer.location}</p>
      <p>+666 527 8077</p>
    </div>
  </div>
</footer>

<style>
  :global(*, *::before, *::after) { box-sizing: border-box; margin: 0; padding: 0; }
  :global(html) { scroll-behavior: smooth; }
  :global(body) { font-family: "Manrope", sans-serif; color: #111827; background: #fff; -webkit-font-smoothing: antialiased; line-height: 1.6; }

  /* ── NAV ── */
  header { position: fixed; top: 0; left: 0; right: 0; z-index: 200; background: transparent; border-bottom: 1px solid transparent; transition: background 0.35s ease, border-color 0.35s ease, box-shadow 0.35s ease; }
  header.scrolled { background: rgba(255,255,255,0.97); border-color: #e5e7eb; box-shadow: 0 2px 20px rgba(0,0,0,0.07); }
  .brand { font-size: 1.3rem; font-weight: 800; text-decoration: none; color: #fff; letter-spacing: -0.01em; transition: color 0.35s; }
  header.scrolled .brand { color: #050d1e; }
  .brand-accent { color: rgba(255,255,255,0.7); transition: color 0.35s; }
  header.scrolled .brand-accent { color: #ff5c2a; }
  .desktop-links { display: flex; list-style: none; gap: 2rem; }
  .desktop-links a { color: rgba(255,255,255,0.85); text-decoration: none; font-size: 0.9rem; font-weight: 500; transition: color 0.2s; }
  header.scrolled .desktop-links a { color: #374151; }
  .desktop-links a:hover { color: #fff; }
  header.scrolled .desktop-links a:hover { color: #ff5c2a; }
  .desktop-links a.grn { color: #8dffa8; font-weight: 700; }
  .desktop-links a.grn:hover { color: #c2ffd1; }
  header.scrolled .desktop-links a.grn { color: #16a34a; }
  header.scrolled .desktop-links a.grn:hover { color: #15803d; }
  .nav-right { display: flex; align-items: center; gap: 0.75rem; }
  .btn-nav { background: rgba(255,255,255,0.2); color: #fff; border: 1.5px solid rgba(255,255,255,0.5); backdrop-filter: blur(8px); padding: 0.55rem 1.2rem; border-radius: 100px; font-size: 0.85rem; font-weight: 700; text-decoration: none; transition: background 0.2s, border-color 0.2s, color 0.35s; }
  header.scrolled .btn-nav { background: #ff5c2a; border-color: #ff5c2a; color: #fff; }
  .btn-nav:hover { background: rgba(255,255,255,0.35); }
  .nav-inner { max-width: 1200px; margin: 0 auto; padding: 0 1.5rem; height: 68px; display: flex; align-items: center; justify-content: space-between; }

  .hamburger { display: none; flex-direction: column; justify-content: center; gap: 5px; width: 36px; height: 36px; background: none; border: none; cursor: pointer; padding: 6px; }
  .hamburger span { display: block; width: 22px; height: 2px; background: #fff; border-radius: 2px; transition: transform 0.3s, opacity 0.3s, background 0.35s; transform-origin: center; }
  header.scrolled .hamburger span { background: #050d1e; }
  .hamburger.open span:nth-child(1) { transform: translateY(7px) rotate(45deg); }
  .hamburger.open span:nth-child(2) { opacity: 0; transform: scaleX(0); }
  .hamburger.open span:nth-child(3) { transform: translateY(-7px) rotate(-45deg); }

  .mobile-menu { position: absolute; top: 68px; left: 0; right: 0; background: #fff; border-bottom: 1px solid #e5e7eb; display: flex; flex-direction: column; max-height: 0; overflow: hidden; transition: max-height 0.4s cubic-bezier(0.4,0,0.2,1), padding 0.3s; box-shadow: 0 8px 24px rgba(0,0,0,0.08); }
  .mobile-menu.open { max-height: 440px; padding: 0.5rem 0; }
  .mobile-menu a { padding: 0.85rem 1.5rem; color: #374151; text-decoration: none; font-size: 0.95rem; font-weight: 500; border-bottom: 1px solid #f3f4f6; display: block; transition: color 0.15s, background 0.15s; }
  .mobile-menu a:hover { color: #ff5c2a; background: #fff7f4; }
  .mobile-menu a.grn { color: #16a34a; font-weight: 700; }
  .mobile-menu a.grn:hover { color: #15803d; background: #f2f8f3; }
  .m-cta { color: #ff5c2a !important; font-weight: 700 !important; }

  /* ── HERO ── */
  .hero { min-height: 100vh; background: linear-gradient(135deg, #4a7fd9 0%, #7b4ec8 45%, #c050be 100%); display: flex; align-items: center; padding: 5rem 1.5rem 4rem; position: relative; overflow: hidden; }
  .hero::before { content: ""; position: absolute; inset: 0; background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.04'/%3E%3C/svg%3E"); pointer-events: none; opacity: 0.35; }
  .hero-inner { max-width: 1200px; margin: 0 auto; width: 100%; display: grid; grid-template-columns: 1fr 1fr; gap: 3.5rem; align-items: center; position: relative; z-index: 1; }
  .hero-badge { display: inline-flex; align-items: center; gap: 0.45rem; background: rgba(255,255,255,0.15); border: 1px solid rgba(255,255,255,0.3); color: rgba(255,255,255,0.9); padding: 0.32rem 0.85rem; border-radius: 100px; font-size: 0.75rem; font-weight: 600; margin-bottom: 1.25rem; backdrop-filter: blur(8px); }
  .bdot { width: 7px; height: 7px; border-radius: 50%; background: #7fff7f; animation: pulse 2s infinite; flex-shrink: 0; }
  @keyframes pulse { 0%,100% { opacity:1; transform:scale(1); } 50% { opacity:0.5; transform:scale(0.8); } }
  .hero-left h1 { font-size: clamp(1.9rem, 3.2vw, 2.8rem); font-weight: 700; line-height: 1.18; letter-spacing: -0.02em; color: #fff; margin-bottom: 1.25rem; }
  .h1-static { display: block; }
  .h1-animated { display: block; font-weight: 800; transition: opacity 0.35s ease, transform 0.35s ease; opacity: 1; transform: translateY(0); }
  .h1-animated.out { opacity: 0; transform: translateY(10px); }
  .hero-sub { color: rgba(255,255,255,0.8); font-size: 0.97rem; line-height: 1.75; margin-bottom: 2rem; }
  .hero-btns { display: flex; gap: 0.85rem; flex-wrap: wrap; margin-bottom: 2rem; }
  .btn-pill-dark { display: inline-block; text-decoration: none; background: #111; color: #fff; padding: 0.75rem 1.6rem; border-radius: 100px; font-size: 0.88rem; font-weight: 700; transition: background 0.2s, transform 0.15s; }
  .btn-pill-dark:hover { background: #000; transform: translateY(-2px); }
  .btn-pill-outline { display: inline-block; text-decoration: none; background: rgba(255,255,255,0.15); border: 2px solid rgba(255,255,255,0.6); color: #fff; backdrop-filter: blur(8px); padding: 0.73rem 1.6rem; border-radius: 100px; font-size: 0.88rem; font-weight: 700; transition: background 0.2s, transform 0.15s; }
  .btn-pill-outline:hover { background: rgba(255,255,255,0.25); transform: translateY(-2px); }
  .trust-row { display: flex; gap: 1.25rem; flex-wrap: wrap; }
  .trust-badge { color: rgba(255,255,255,0.8); font-size: 0.8rem; font-weight: 500; }
  .hero-right { position: relative; }
  .hero-img-wrap { position: relative; height: 480px; }
  .img-main-hero { width: 85%; height: 420px; object-fit: cover; border-radius: 14px; display: block; box-shadow: 0 24px 80px rgba(0,0,0,0.3); position: absolute; top: 0; right: 0; }
  .img-float-hero { width: 52%; height: 210px; object-fit: cover; border-radius: 12px; display: block; box-shadow: 0 12px 40px rgba(0,0,0,0.3); position: absolute; bottom: 0; left: 0; border: 3px solid rgba(255,255,255,0.3); }
  .hcard { position: absolute; background: #fff; border-radius: 10px; padding: 0.7rem 1rem; box-shadow: 0 8px 28px rgba(0,0,0,0.18); z-index: 2; }
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
  @keyframes marquee { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }

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
  h2 em { font-family: "Fraunces", serif; font-style: italic; font-weight: 300; color: #ff5c2a; }
  .sub { color: #6b7280; font-size: 1rem; line-height: 1.75; }
  .sub.light { color: rgba(255,255,255,0.55); }
  .sec-hdr { max-width: 680px; margin: 0 auto 3rem; text-align: center; opacity: 0; transform: translateY(24px); transition: opacity 0.7s ease, transform 0.7s ease; }
  .sec-hdr.vis { opacity: 1; transform: none; }

  /* ── BUTTONS ── */
  .btn-primary { display: inline-block; text-decoration: none; background: #ff5c2a; color: #fff; padding: 0.8rem 1.75rem; border-radius: 8px; font-size: 0.9rem; font-weight: 700; transition: background 0.2s, transform 0.15s, box-shadow 0.2s; box-shadow: 0 4px 16px rgba(255,92,42,0.3); }
  .btn-primary:hover { background: #e04a1f; transform: translateY(-2px); box-shadow: 0 8px 24px rgba(255,92,42,0.35); }
  .btn-primary.btn-lg { padding: 1rem 2.25rem; font-size: 1rem; }
  .btn-outline { display: inline-block; text-decoration: none; color: #374151; font-size: 0.9rem; font-weight: 600; border: 2px solid #e5e7eb; padding: 0.95rem 1.75rem; border-radius: 8px; transition: border-color 0.2s, color 0.2s; }
  .btn-outline:hover { border-color: #ff5c2a; color: #ff5c2a; }

  /* ── INSTALLATIONS ── */
  #installations .sec-hdr { max-width: 780px; }
  #installations h2 { font-size: clamp(2.6rem, 5.5vw, 4.2rem); font-weight: 900; letter-spacing: -0.035em; line-height: 1.05; }
  #installations h2 em { font-weight: 600; }
  #installations .sub { font-size: 1.35rem; color: #374151; font-weight: 500; line-height: 1.8; }
  .inst-cards { display: grid; grid-template-columns: 1fr 1fr; gap: 1.5rem; opacity: 0; transform: translateY(24px); transition: opacity 0.8s ease, transform 0.8s ease; }
  .inst-cards.vis { opacity: 1; transform: none; }
  .inst-card { border-radius: 12px; padding: 2.5rem 2.25rem; }
  .inst-dark { background: #050d1e; box-shadow: 0 16px 48px rgba(5,13,30,0.18); }
  .inst-lite { background: #fff; border: 1px solid #e5e7eb; }
  .inst-badge { display: inline-block; background: #ff5c2a; border-radius: 100px; padding: 0.3rem 0.9rem; margin-bottom: 1.1rem; color: #fff; font-size: 0.68rem; font-weight: 700; letter-spacing: 0.1em; text-transform: uppercase; }
  .inst-lite .inst-badge { background: #fff2ec; color: #e04a1f; }
  .inst-card h3 { font-size: 1.25rem; font-weight: 800; margin-bottom: 0.7rem; letter-spacing: -0.01em; }
  .inst-dark h3 { color: #f9fafb; }
  .inst-lite h3 { color: #050d1e; }
  .inst-card > p { font-size: 0.92rem; line-height: 1.8; margin-bottom: 1.25rem; }
  .inst-dark > p { color: rgba(255,255,255,0.6); }
  .inst-lite > p { color: #4b5563; }
  .inst-card ul { list-style: none; display: flex; flex-direction: column; gap: 0.55rem; }
  .inst-card li { font-size: 0.87rem; padding-left: 1.1rem; position: relative; }
  .inst-card li::before { content: "→"; position: absolute; left: 0; color: #ff5c2a; font-size: 0.78rem; }
  .inst-dark li { color: rgba(255,255,255,0.75); }
  .inst-lite li { color: #374151; }

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
  .cklist li::before { content: "✓"; position: absolute; left: 0; color: #ff5c2a; font-weight: 700; }

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
  .sp-card li::before { content: "→"; position: absolute; left: 0; color: #ff5c2a; font-size: 0.78rem; }

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

  /* ── GROWERS ── */
  .bg-grow { background: #f2f8f3; }
  #growers .stag { color: #16a34a; }
  #growers h2 em { color: #16a34a; }
  #growers .cklist li::before { color: #16a34a; }
  #growers .cklist li { border-bottom-color: #e2efe4; }
  .grow-stats { display: grid; grid-template-columns: repeat(4,1fr); gap: 1.25rem; margin-bottom: 3.5rem; }

  .gstat { background: #fff; border: 1px solid #d7ead9; border-radius: 10px; padding: 1.5rem 1.25rem; text-align: center; }
  .gs-val { display: block; font-size: 2rem; font-weight: 800; color: #16a34a; line-height: 1.1; }
  .gs-lbl { display: block; font-size: 0.77rem; color: #4b5563; margin-top: 0.5rem; line-height: 1.5; }
  .grow-segs { display: grid; grid-template-columns: 1fr 1fr; gap: 1.5rem; margin-bottom: 3.5rem; }

  .grow-seg { background: #fff; border: 1px solid #d7ead9; border-radius: 12px; padding: 2rem; }
  .seg-hdr { display: inline-block; background: #16a34a; border-radius: 100px; padding: 0.3rem 0.9rem; margin-bottom: 1rem; }
  .seg-hdr span { color: #fff; font-size: 0.68rem; font-weight: 700; letter-spacing: 0.1em; text-transform: uppercase; }
  .grow-seg h4 { font-size: 1.05rem; font-weight: 800; color: #050d1e; margin-bottom: 0.6rem; }
  .grow-seg > p { font-size: 0.88rem; color: #4b5563; line-height: 1.75; margin-bottom: 1rem; }
  .grow-seg ul { list-style: none; display: flex; flex-direction: column; gap: 0.5rem; }
  .grow-seg li { font-size: 0.85rem; color: #374151; padding-left: 1.1rem; position: relative; }
  .grow-seg li::before { content: "→"; position: absolute; left: 0; color: #16a34a; font-size: 0.78rem; }
  .grow-split { display: grid; grid-template-columns: 1.1fr 1fr; gap: 4rem; align-items: center; margin-bottom: 3.5rem; }

  .grow-p { color: #374151; font-size: 0.95rem; line-height: 1.8; margin-bottom: 1.1rem; }
  .grow-imgs { position: relative; }
  .grow-main { width: 100%; height: 480px; object-fit: cover; border-radius: 12px; display: block; box-shadow: 0 16px 60px rgba(20,83,45,0.15); }
  .grow-float { position: absolute; bottom: -1.5rem; left: -1.5rem; width: 190px; height: 190px; object-fit: cover; border-radius: 10px; border: 4px solid #fff; box-shadow: 0 8px 32px rgba(0,0,0,0.18); }
  .grow-proof { text-align: center; color: #14532d; font-size: 0.85rem; font-weight: 700; margin-bottom: 1.25rem; }

  .grow-gal { display: grid; grid-template-columns: repeat(3,1fr); gap: 1rem; }

  .grow-gal .g-slot { aspect-ratio: 3/4; }
  .grow-note { color: #6b7280; font-size: 0.73rem; text-align: center; margin-top: 1.75rem; max-width: 640px; margin-left: auto; margin-right: auto; }
  .btn-grow { display: inline-block; text-decoration: none; background: #16a34a; color: #fff; padding: 0.9rem 2.1rem; border-radius: 8px; font-size: 0.93rem; font-weight: 700; transition: background 0.2s, transform 0.15s, box-shadow 0.2s; box-shadow: 0 4px 16px rgba(22,163,74,0.3); }
  .btn-grow:hover { background: #15803d; transform: translateY(-2px); box-shadow: 0 8px 24px rgba(22,163,74,0.35); }

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

  /* ── CONTACT CTA ── */
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
  .social-links { display: flex; gap: 1rem; margin-top: 1rem; align-items: center; }
  .social-icon { color: rgba(255,255,255,0.4); transition: color 0.2s; display: flex; align-items: center; }
  .social-icon:hover { color: #ff5c2a; }
  .social-icon svg { width: 20px; height: 20px; }

  /* ── RESPONSIVE ── */
  @media (max-width: 1024px) {
    .hero-inner { grid-template-columns: 1fr; }
    .hero-right { display: none; }
    .desktop-links { display: none; }
    .hamburger { display: flex; }
    .split { grid-template-columns: 1fr; gap: 2rem; }
    .img-float { display: none; }
    .grow-split { grid-template-columns: 1fr; gap: 2rem; }
    .grow-float { display: none; }
    .grow-main { height: 380px; }
  }
  @media (max-width: 768px) {
    .stats-grid { grid-template-columns: repeat(2,1fr); }
    .cards-grid { grid-template-columns: 1fr 1fr; }
    .sp-row { grid-template-columns: 1fr; }
    .bento { grid-template-columns: 1fr; }
    .gallery { grid-template-columns: 1fr 1fr; }
    .grow-stats { grid-template-columns: 1fr 1fr; }
    .grow-segs { grid-template-columns: 1fr; }
    .grow-gal { grid-template-columns: 1fr 1fr; }
    .vid-row { grid-template-columns: 1fr; }
    .footer-grid { grid-template-columns: 1fr 1fr; }
    .inst-cards { grid-template-columns: 1fr; }
  }
  @media (max-width: 480px) {
    .cards-grid { grid-template-columns: 1fr; }
    .gallery { grid-template-columns: 1fr; }
    .grow-stats { grid-template-columns: 1fr; }
    .grow-gal { grid-template-columns: 1fr; }
    .footer-grid { grid-template-columns: 1fr; }
    .inst-card { padding: 2rem 1.5rem; }
  }

  /* ── MEDIA CTA ── */
  .media-cta { display: flex; justify-content: center; margin-top: 2.5rem; opacity: 0; transform: translateY(16px); transition: opacity 0.7s ease 0.25s, transform 0.7s ease 0.25s; }
  .media-cta.vis { opacity: 1; transform: none; }
  .btn-view-presentation { display: inline-flex; align-items: center; gap: 0.6rem; background: #630c7e; color: #fff; padding: 0.9rem 2rem; border-radius: 8px; font-size: 0.93rem; font-weight: 700; text-decoration: none; border: 2px solid transparent; transition: background 0.2s, border-color 0.2s, transform 0.15s, box-shadow 0.2s; box-shadow: 0 4px 16px rgba(5,13,30,0.15); }
  .btn-view-presentation:hover { background: #111827; border-color: #ff5c2a; transform: translateY(-2px); box-shadow: 0 8px 28px rgba(5,13,30,0.2); }
  .btn-view-presentation svg { flex-shrink: 0; }

  /* ── LANG TOGGLE ── */
  .lang-toggle { background: rgba(255,255,255,0.15); color: #fff; border: 1.5px solid rgba(255,255,255,0.4); backdrop-filter: blur(8px); padding: 0.45rem 0.9rem; border-radius: 100px; font-size: 0.78rem; font-weight: 600; cursor: pointer; transition: background 0.2s; }
  header.scrolled .lang-toggle { background: #f3f4f6; color: #374151; border-color: #e5e7eb; }
  .lang-toggle:hover { background: rgba(255,255,255,0.25); }

  .stats-note { color: rgba(255,255,255,0.3); font-size: 0.72rem; text-align: center; margin-top: 1.5rem; }
</style>