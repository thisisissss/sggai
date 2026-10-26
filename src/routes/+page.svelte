<script>
  import { translations } from '$lib/i18n.js';
  import Seo from '$lib/Seo.svelte';
  import { onMount } from 'svelte';

  const R2 = 'https://media.sustainablegreengold.com';
  const LINE = 'https://line.me/ti/p/eZ2GG61uIe';
  const SHOP = 'https://www.lazada.co.th/shop/sustainable-green-gold';

  const MAP_EMBED =
    'https://maps.google.com/maps?q=19.9953781,99.8888617&z=16&output=embed';
  const MAP_DIR =
    'https://www.google.com/maps/dir/?api=1&destination=19.9953781,99.8888617';

  // New homepage copy. Kept local (like mapCopy) so i18n.js stays untouched;
  // move it into $lib/i18n.js later if you prefer one place for all strings.
  const copy = {
    en: {
      nav: { why: 'Why it matters', ai: 'AI farming', media: 'The farm', together: 'Work with us' },
      hero: {
        kicker: 'AI Aquaponics · Innovation · Ecology',
        h1a: 'The future',
        h1b: 'of farming',
        h1c: 'is already growing.',
        sub: 'An innovative ecosystem of water, fish and plants that takes nothing from the land — and, with AI, is learning to run itself. Discover the opportunities it opens, today.',
        btn1: 'Start with us',
        btn2: 'Why it matters',
        online: 'System online',
        monitor: '24/7 monitoring'
      },
      strip: ['Innovation-driven', 'No soil', 'No chemicals', 'Water that circulates, not drains', 'Monitored around the clock'],
      why: {
        tag: 'Why it matters',
        h2a: 'The soil is exhausted.',
        h2b: 'We stopped asking it for more.',
        p: "Decades of chemicals and intensive farming have drained the land. Our farm doesn't use it at all. Fish and plants feed each other in one closed system — clean food today, a healthier planet for generations to come."
      },
      pillars: {
        h2: 'Innovation that keeps up with the times.',
        items: [
          { tag: '01 · Innovation', title: 'Technology inspired by nature', body: "Nature's own cycle, engineered into a system that produces fish and plants together." },
          { tag: '02 · Ecology', title: 'Nothing taken, nothing poisoned', body: 'No soil to deplete, no pesticides to wash into rivers. The water keeps circulating instead of draining away.' },
          { tag: '03 · Autonomy', title: 'A farm that learns', body: 'Sensors and AI watch the system day and night — and step by step take over the work.' }
        ]
      },
      ai: {
        tag: 'Aquaponics × AI',
        h2: 'The source that runs itself.',
        p: 'A closed ecosystem is already self-sustaining. Add sensors and AI, and it becomes self-managing: it feels every change, makes the call and corrects itself — no chemicals, no guesswork, no constant hands-on work.',
        steps: [
          { k: 'Senses', v: 'water · light · oxygen · growth' },
          { k: 'Decides', v: 'AI reads the system 24/7' },
          { k: 'Acts', v: 'feeding · flow · aeration' }
        ]
      },
      media: {
        tag: 'The farm',
        h2: 'Already working in Chiang Rai.',
        caps: ['Grow beds', 'Fish tanks', 'Sensors', 'Harvest'],
        btn: 'View presentation'
      },
      cta: {
        tag: 'Resorts · Homes · Partners',
        h2: 'Build a secure future with us.',
        p: 'Your own innovative source of food — for homes, resorts and businesses. We also welcome partners and investors who see where farming is heading.',
        btn1: 'Talk to us on LINE',
        btn2: 'Email us',
        btn3: 'Visit our shop'
      },
      map: { title: 'Find the farm', directions: 'Get directions' }
    },
    th: {
      nav: { why: 'ทำไมจึงสำคัญ', ai: 'ฟาร์ม AI', media: 'ฟาร์มของเรา', together: 'ร่วมงานกับเรา' },
      hero: {
        kicker: 'AI อะควาโปนิกส์ · นวัตกรรม · ระบบนิเวศ',
        h1a: 'อนาคต',
        h1b: 'ของการเกษตร',
        h1c: 'กำลังเติบโตแล้ว',
        sub: 'ระบบนิเวศเชิงนวัตกรรมของน้ำ ปลา และพืช ที่ไม่เบียดเบียนผืนดิน — และด้วย AI กำลังเรียนรู้ที่จะดูแลตัวเอง ค้นพบโอกาสใหม่ที่เปิดรอคุณ ตั้งแต่วันนี้',
        btn1: 'เริ่มต้นกับเรา',
        btn2: 'ทำไมจึงสำคัญ',
        online: 'ระบบออนไลน์',
        monitor: 'ตรวจวัด 24/7'
      },
      strip: ['ขับเคลื่อนด้วยนวัตกรรม', 'ไม่ใช้ดิน', 'ไม่ใช้สารเคมี', 'น้ำหมุนเวียน ไม่สูญเปล่า', 'ตรวจวัดตลอด 24 ชั่วโมง'],
      why: {
        tag: 'ทำไมจึงสำคัญ',
        h2a: 'ผืนดินเหนื่อยล้าแล้ว',
        h2b: 'เราจึงเลิกเรียกร้องจากมัน',
        p: 'หลายสิบปีของสารเคมีและการเกษตรแบบเข้มข้นทำให้ดินเสื่อมโทรม ฟาร์มของเราไม่ใช้ดินเลย ปลาและพืชหล่อเลี้ยงกันในระบบปิดเดียว — อาหารสะอาดวันนี้ และโลกที่ดีขึ้นสำหรับคนรุ่นต่อไป'
      },
      pillars: {
        h2: 'นวัตกรรมที่ก้าวทันยุคสมัย',
        items: [
          { tag: '01 · นวัตกรรม', title: 'เทคโนโลยีที่ได้แรงบันดาลใจจากธรรมชาติ', body: 'วัฏจักรของธรรมชาติ ถูกออกแบบเป็นระบบที่ผลิตทั้งปลาและพืชไปพร้อมกัน' },
          { tag: '02 · ระบบนิเวศ', title: 'ไม่เอาจากธรรมชาติ ไม่ปล่อยพิษคืน', body: 'ไม่มีดินให้เสื่อม ไม่มีสารเคมีไหลลงแม่น้ำ น้ำหมุนเวียนอยู่ในระบบแทนที่จะสูญเสียไป' },
          { tag: '03 · อัตโนมัติ', title: 'ฟาร์มที่เรียนรู้ได้', body: 'เซนเซอร์และ AI เฝ้าดูระบบทั้งกลางวันและกลางคืน — และค่อย ๆ รับหน้าที่แทนคน' }
        ]
      },
      ai: {
        tag: 'อะควาโปนิกส์ × AI',
        h2: 'แหล่งอาหารที่ดูแลตัวเองได้',
        p: 'ระบบนิเวศแบบปิดพึ่งพาตัวเองได้อยู่แล้ว เมื่อเพิ่มเซนเซอร์และ AI ระบบจะจัดการตัวเองได้: รับรู้ทุกการเปลี่ยนแปลง ตัดสินใจ และปรับแก้เอง — ไม่ใช้สารเคมี ไม่ต้องเดา ไม่ต้องคอยดูแลตลอดเวลา',
        steps: [
          { k: 'รับรู้', v: 'น้ำ · แสง · ออกซิเจน · การเติบโต' },
          { k: 'ตัดสินใจ', v: 'AI อ่านข้อมูลระบบ 24/7' },
          { k: 'ลงมือ', v: 'ให้อาหาร · การไหล · เติมอากาศ' }
        ]
      },
      media: {
        tag: 'ฟาร์มของเรา',
        h2: 'ทำงานจริงแล้วที่เชียงราย',
        caps: ['แปลงปลูก', 'บ่อปลา', 'เซนเซอร์', 'ผลผลิต'],
        btn: 'ดูพรีเซนเทชัน'
      },
      cta: {
        tag: 'รีสอร์ต · บ้าน · พาร์ทเนอร์',
        h2: 'สร้างอนาคตที่มั่นคงไปด้วยกัน',
        p: 'แหล่งอาหารเชิงนวัตกรรมของคุณเอง — สำหรับบ้าน รีสอร์ต และธุรกิจ เรายินดีต้อนรับพาร์ทเนอร์และนักลงทุนที่มองเห็นทิศทางของการเกษตร',
        btn1: 'คุยกับเราทาง LINE',
        btn2: 'ส่งอีเมล',
        btn3: 'ร้านค้าของเรา'
      },
      map: { title: 'แผนที่ฟาร์ม', directions: 'ดูเส้นทาง' }
    }
  };

  let lang = 'en';
  let menuOpen = false;
  let scrolled = false;
  let visible = {};

  $: t = translations[lang];
  $: c = copy[lang];

  $: navLinks = [
    { label: c.nav.why, href: '#aquaponics' },
    { label: c.nav.ai, href: '#automation' },
    { label: c.nav.media, href: '#media' },
    { label: t.nav.resources, href: '/resources' }
  ];

  $: photos = [
    { src: `${R2}/aquaponics/newgrowbedlines.jpg`, cap: c.media.caps[0] },
    { src: `${R2}/aquaponics/tank2.jpg`, cap: c.media.caps[1] },
    { src: `${R2}/sensors/chip.jpeg`, cap: c.media.caps[2] },
    { src: `${R2}/aquaponics/harvest.jpg`, cap: c.media.caps[3] }
  ];

  function toggleLang() {
    lang = lang === 'en' ? 'th' : 'en';
    document.documentElement.lang = lang;
    try { localStorage.setItem('sgg-lang', lang); } catch (e) {}
  }

  function toggleMenu() { menuOpen = !menuOpen; }
  function closeMenu() { menuOpen = false; }

  function getVariant() {
    if (typeof document === 'undefined') return 'unknown';
    const m = document.cookie.match(/(?:^|; )ab_variant=([ab])/);
    return m ? m[1] : 'unknown';
  }

  function track(name, params = {}) {
    if (typeof window !== 'undefined' && typeof window.gtag === 'function') {
      window.gtag('event', name, { variant: getVariant(), ...params });
    }
  }

  onMount(() => {
    let saved = null;
    try { saved = localStorage.getItem('sgg-lang'); } catch (e) {}
    if (saved === 'en' || saved === 'th') lang = saved;
    else if (navigator.language?.startsWith('th')) lang = 'th';
    document.documentElement.lang = lang;

    const onScroll = () => { scrolled = window.scrollY > 40; };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const key = entry.target.dataset.reveal;
          if (key) { visible[key] = true; visible = visible; }
        });
      },
      { threshold: 0.15 }
    );
    document.querySelectorAll('[data-reveal]').forEach((el) => observer.observe(el));

    return () => {
      window.removeEventListener('scroll', onScroll);
      observer.disconnect();
    };
  });
</script>

<svelte:head>
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link
    href="https://fonts.googleapis.com/css2?family=Geist:wght@400;500;600&family=Geist+Mono:wght@400;500&family=Noto+Sans+Thai:wght@400;500&display=swap"
    rel="stylesheet"
  />
</svelte:head>

<Seo
  title="AI Aquaponics In Thailand — Sustainable Green Gold"
  description="AI aquaponics from Chiang Rai: an innovative closed ecosystem of fish and plants that takes nothing from the land. Systems for homes, resorts and partners across Thailand."
  path="/"
/>

<div class="page" class:th={lang === 'th'}>

<!-- ================= NAV ================= -->
<header class:scrolled>
  <nav class="nav-inner">
    <a href="/" class="brand" aria-label="Sustainable Green Gold" on:click={closeMenu}>
      <span class="brand-mark" aria-hidden="true">
        <svg width="18" height="18" viewBox="0 0 18 18"><path d="M2 10c2-4 7-5 10-2l4-3v8l-4-3c-3 3-8 2-10 0z" fill="#fff" /></svg>
      </span>
      <span class="brand-main">SGG</span>
      <span class="brand-sub">AI Aquaponics</span>
    </a>

    <ul class="desktop-links">
      {#each navLinks as link}
        <li><a href={link.href}>{link.label}</a></li>
      {/each}
    </ul>

    <div class="nav-right">
      <button class="lang-toggle" type="button" on:click={toggleLang} aria-label="Change language">
        {lang === 'en' ? 'ไทย' : 'EN'}
      </button>
      <a href="/resorts" class="btn-nav" on:click={() => track('cta_click', { location: 'nav_resorts' })}>
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
        <span></span><span></span><span></span>
      </button>
    </div>
  </nav>

  <div class="mobile-menu" class:open={menuOpen}>
    {#each navLinks as link}
      <a href={link.href} on:click={closeMenu}>{link.label}</a>
    {/each}
    <a
      href="/resorts"
      class="m-cta"
      on:click={() => { closeMenu(); track('cta_click', { location: 'mobile_nav_resorts' }); }}
    >
      {t.nav.resorts} →
    </a>
  </div>
</header>

<!-- ================= HERO ================= -->
<section class="hero" id="top">
  <div class="wrap hero-inner">
    <div class="hero-copy">
      <span class="kicker">{c.hero.kicker}</span>
      <h1>
        {c.hero.h1a} {c.hero.h1b}
        <span class="accent">{c.hero.h1c}</span>
      </h1>
      <p class="hero-sub">{c.hero.sub}</p>
      <div class="actions">
        <a href="#contact" class="btn btn-dark" on:click={() => track('cta_click', { location: 'hero_start' })}>
          {c.hero.btn1}
        </a>
        <a href="#aquaponics" class="btn btn-line">{c.hero.btn2}</a>
      </div>
    </div>

    <div class="hero-visual">
      <img
        src={`${R2}/aquaponics/my-system1.jpg`}
        alt="Sustainable Green Gold AI aquaponics system in Chiang Rai"
      />
      <div class="status">
        <span class="live"><i></i>{c.hero.online}</span>
        <span class="mono">{c.hero.monitor}</span>
        <span class="mono">Chiang Rai · TH</span>
      </div>
    </div>
  </div>
</section>

<!-- ================= STRIP ================= -->
<div class="strip">
  <div class="marquee">
    <div class="track">
      {#each [0, 1] as dup}
        <div class="group" aria-hidden={dup === 1 ? 'true' : undefined}>
          {#each [...c.strip, ...c.strip] as item}
            <span>{item}</span><span class="slash" aria-hidden="true">/</span>
          {/each}
        </div>
      {/each}
    </div>
  </div>
</div>

<!-- ================= MANIFESTO ================= -->
<section id="aquaponics" class="manifesto" data-reveal="why">
  <div class="wrap reveal" class:vis={visible.why}>
    <span class="tag">{c.why.tag}</span>
    <h2 class="statement">{c.why.h2a} <span class="accent">{c.why.h2b}</span></h2>
    <p class="lead">{c.why.p}</p>
  </div>
</section>

<!-- ================= PILLARS ================= -->
<section id="species" class="pillars" data-reveal="pillars">
  <div class="wrap reveal" class:vis={visible.pillars}>
    <h2 class="h2">{c.pillars.h2}</h2>
    <div class="pillar-grid">
      {#each c.pillars.items as p, i}
        <article class="pillar p{i}">
          <span class="tag">{p.tag}</span>
          <div>
            <h3>{p.title}</h3>
            <p>{p.body}</p>
          </div>
        </article>
      {/each}
    </div>
  </div>
</section>

<!-- ================= AI ================= -->
<section id="automation" class="ai" data-reveal="ai">
  <div class="wrap ai-inner reveal" class:vis={visible.ai}>
    <div class="ai-copy">
      <span class="tag">{c.ai.tag}</span>
      <h2 class="h2 big">{c.ai.h2}</h2>
      <p class="lead">{c.ai.p}</p>
    </div>
    <div class="ai-steps">
      {#each c.ai.steps as s, i}
        <div class="step" class:last={i === c.ai.steps.length - 1}>
          <strong>{s.k}</strong>
          <span class="mono">{s.v}</span>
        </div>
      {/each}
    </div>
  </div>
</section>

<!-- ================= FARM PHOTOS ================= -->
<section id="media" class="media" data-reveal="media">
  <div class="wrap reveal" class:vis={visible.media}>
    <div class="media-head">
      <div>
        <span class="tag">{c.media.tag}</span>
        <h2 class="h2">{c.media.h2}</h2>
      </div>
      <a
        href={lang === 'th' ? '/Smart_Polyponics_TH.pdf' : '/Smart_Polyponics_EN.pdf'}
        target="_blank"
        rel="noopener"
        class="btn btn-line"
        on:click={() => track('presentation_view', { lang })}
      >
        {c.media.btn} ↗
      </a>
    </div>
    <div class="photo-grid">
      {#each photos as ph}
        <figure>
          <img src={ph.src} alt={ph.cap} loading="lazy" />
          <figcaption>{ph.cap}</figcaption>
        </figure>
      {/each}
    </div>
  </div>
</section>

<!-- ================= CTA ================= -->
<section id="contact" class="cta-wrap">
  <div class="wrap" id="installations">
    <div class="cta">
      <div class="cta-copy">
        <span class="tag">{c.cta.tag}</span>
        <h2 class="h2">{c.cta.h2}</h2>
        <p>{c.cta.p}</p>
      </div>
      <div class="actions">
        <a
          href={LINE}
          target="_blank"
          rel="noopener"
          class="btn btn-dark"
          on:click={() => track('line_click', { location: 'contact_main' })}
        >
          {c.cta.btn1}
        </a>
        <a
          href="mailto:contact@sustainablegreengold.com?subject=Aquaponics%20enquiry"
          class="btn btn-line"
          on:click={() => track('email_click', { location: 'contact_main' })}
        >
          {c.cta.btn2}
        </a>
        <a href={SHOP} target="_blank" rel="noopener" class="btn btn-line">{c.cta.btn3}</a>
      </div>
    </div>
  </div>
</section>

<!-- ================= FOOTER ================= -->
<footer>
  <div class="wrap footer-grid">
    <div class="footer-main">
      <div class="footer-brand">SGG <span>AI Aquaponics</span></div>
      <p>Sustainable Green Gold Co., Ltd.</p>

      <div class="social-links">
        <a href="https://line.me/ti/p/carbonbasedlife" target="_blank" rel="noopener" class="social-icon" aria-label="LINE"
          on:click={() => track('line_click', { location: 'footer' })}>
          <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M19.365 9.863c.349 0 .63.285.63.631 0 .345-.281.63-.63.63H17.61v1.125h1.755c.349 0 .63.283.63.63 0 .344-.281.629-.63.629h-2.386c-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.627-.63h2.386c.349 0 .63.285.63.63 0 .349-.281.63-.63.63H17.61v1.125h1.755zm-3.855 3.016c0 .27-.174.51-.432.596-.064.021-.133.031-.199.031-.211 0-.391-.09-.51-.25l-2.443-3.317v2.94c0 .344-.279.629-.631.629-.346 0-.626-.285-.626-.629V8.108c0-.27.173-.51.43-.595.06-.023.136-.033.194-.033.195 0 .375.105.495.254l2.462 3.33V8.108c0-.345.282-.63.63-.63.345 0 .63.285.63.63v4.771zm-5.741 0c0 .344-.282.629-.631.629-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.627-.63.349 0 .631.285.631.63v4.771zm-2.466.629H4.917c-.345 0-.63-.285-.63-.629V8.108c0-.345.285-.63.63-.63.348 0 .63.285.63.63v4.141h1.756c.348 0 .629.283.629.63 0 .344-.281.629-.629.629M24 10.314C24 4.943 18.615.572 12 .572S0 4.943 0 10.314c0 4.811 4.27 8.842 10.035 9.608.391.082.923.258 1.058.59.12.301.079.766.038 1.08l-.164 1.02c-.045.301-.24 1.186 1.049.645 1.291-.539 6.916-4.078 9.436-6.975C23.176 14.393 24 12.458 24 10.314" /></svg>
        </a>
        <a href="https://facebook.com/profile.php?id=61556530944739" target="_blank" rel="noopener" class="social-icon" aria-label="Facebook">
          <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" /></svg>
        </a>
        <a href="https://instagram.com/sustainablegreengold" target="_blank" rel="noopener" class="social-icon" aria-label="Instagram">
          <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" /></svg>
        </a>
        <a href="https://twl.ae/sustainablegreengold" target="_blank" rel="noopener" class="social-icon" aria-label="Tawasal">
          <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <g transform="translate(12 12) scale(1.3) translate(-12 -12)">
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
        <a href="https://www.tiktok.com/@digital.farm.cr" target="_blank" rel="noopener" class="social-icon" aria-label="TikTok">
          <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.9 2.9 0 0 1-5.2 1.74 2.9 2.9 0 0 1 2.31-4.64c.3 0 .58.05.85.13V9.4a6.33 6.33 0 0 0-.85-.05A6.34 6.34 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1.04-.1z" /></svg>
        </a>
      </div>
    </div>

    <div class="footer-col">
      <h5>{t.footer.nav_title}</h5>
      {#each navLinks as link}
        <a href={link.href}>{link.label}</a>
      {/each}
      <a href="#contact">{t.nav.contact}</a>
    </div>

    <div class="footer-col">
      <h5>{t.footer.contact_title}</h5>
      <a href="mailto:contact@sustainablegreengold.com">contact@sustainablegreengold.com</a>
      <a href="tel:+66652278077">065 227 8077</a>
    </div>

    <div class="footer-note">
      <p>{t.footer.rights}</p>
      <p>{t.footer.location}</p>
      <div class="foot-map">
        <h5>{c.map.title}</h5>
        <div class="foot-map-frame">
          <iframe
            src={MAP_EMBED}
            title="Sustainable Green Gold — Chiang Rai"
            loading="lazy"
            referrerpolicy="no-referrer-when-downgrade"
            allowfullscreen
          ></iframe>
        </div>
        <a class="foot-dir" href={MAP_DIR} target="_blank" rel="noopener"
          on:click={() => track('directions_click', { location: 'footer' })}>
          {c.map.directions} →
        </a>
      </div>
    </div>
  </div>
</footer>

</div>

<style>
  /* ---------- palette ---------- */
  .page {
    --ink: #14192e;
    --ink-2: #3a4260;
    --muted: #4d5570;
    --bg: #f7f7f9;
    --white: #ffffff;
    --pistachio: #e2ecca;
    --pistachio-line: #afbf95;
    --lavender: #ece8f6;
    --line: #dde0e8;
    --accent: #f0532e;
    --accent-ink: #b83a1c;

    font-family: 'Geist', 'Noto Sans Thai', system-ui, -apple-system, sans-serif;
    color: var(--ink);
    background: var(--bg);
    -webkit-font-smoothing: antialiased;
  }

  :global(*), :global(*::before), :global(*::after) { box-sizing: border-box; margin: 0; padding: 0; }
  :global(html) { scroll-behavior: smooth; }
  :global(body) { background: #f7f7f9; line-height: 1.6; }
  :global(::selection) { background: #f0532e; color: #fff; }

  .wrap { max-width: 1280px; margin: 0 auto; padding: 0 2rem; }
  .mono { font-family: 'Geist Mono', ui-monospace, monospace; font-size: 0.8rem; }
  .tag {
    display: inline-block;
    font-family: 'Geist Mono', ui-monospace, monospace;
    font-size: 0.8rem;
    letter-spacing: 0.06em;
    text-transform: uppercase;
    color: var(--accent-ink);
  }
  .accent { color: var(--accent); }
  .h2 {
    font-weight: 500;
    font-size: clamp(1.875rem, 3.4vw, 2.75rem);
    line-height: 1.12;
    letter-spacing: -0.025em;
    max-width: 22ch;
  }
  .h2.big { max-width: 18ch; }
  .lead { font-size: 1.125rem; line-height: 1.65; color: var(--muted); max-width: 58ch; }
  .th .h2, .th h1, .th .statement { letter-spacing: 0; line-height: 1.3; }

  /* ---------- buttons ---------- */
  .actions { display: flex; flex-wrap: wrap; gap: 0.75rem; }
  .btn {
    display: inline-flex;
    align-items: center;
    min-height: 52px;
    padding: 0 1.6rem;
    border-radius: 999px;
    font-weight: 500;
    font-size: 1rem;
    text-decoration: none;
    transition: transform 0.2s ease, background 0.2s ease, border-color 0.2s ease;
  }
  .btn:hover { transform: translateY(-2px); }
  .btn-dark { background: var(--ink); color: #fff; }
  .btn-dark:hover { background: #262d4a; }
  .btn-line { border: 1px solid var(--pistachio-line); color: var(--ink); }
  .btn-line:hover { border-color: var(--ink); }

  /* ---------- reveal ---------- */
  .reveal { opacity: 0; transform: translateY(24px); transition: opacity 0.7s ease, transform 0.7s ease; }
  .reveal.vis { opacity: 1; transform: none; }

  /* ---------- nav ---------- */
  header {
    position: fixed;
    inset: 0 0 auto 0;
    z-index: 200;
    background: rgba(226, 236, 202, 0.82);
    backdrop-filter: blur(14px);
    -webkit-backdrop-filter: blur(14px);
    border-bottom: 1px solid transparent;
    transition: background 0.3s ease, border-color 0.3s ease;
  }
  header.scrolled { background: rgba(255, 255, 255, 0.92); border-color: var(--line); }
  .nav-inner {
    max-width: 1280px;
    height: 76px;
    margin: 0 auto;
    padding: 0 2rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 1.5rem;
  }
  .brand { display: flex; align-items: center; gap: 0.75rem; text-decoration: none; color: var(--ink); white-space: nowrap; }
  .brand-mark {
    width: 34px; height: 34px; border-radius: 10px;
    background: var(--accent);
    display: flex; align-items: center; justify-content: center;
  }
  .brand-main { font-weight: 600; font-size: 1.25rem; letter-spacing: -0.02em; }
  .brand-sub {
    padding-left: 0.75rem;
    border-left: 1px solid var(--pistachio-line);
    font-weight: 600; font-size: 0.95rem; color: var(--ink-2);
  }
  .desktop-links { display: flex; gap: 0.25rem; list-style: none; margin-left: auto; }
  .desktop-links a {
    display: block; padding: 0.75rem 0.85rem;
    font-weight: 600; font-size: 0.95rem;
    color: var(--ink-2); text-decoration: none;
    transition: color 0.2s ease;
  }
  .desktop-links a:hover { color: var(--accent); }
  .nav-right { display: flex; align-items: center; gap: 0.5rem; }
  .lang-toggle {
    min-height: 44px; padding: 0 0.9rem;
    border: 1px solid var(--pistachio-line); border-radius: 999px;
    background: transparent; color: var(--ink);
    font: 500 0.875rem 'Geist', 'Noto Sans Thai', sans-serif;
    cursor: pointer;
  }
  .btn-nav {
    display: inline-flex; align-items: center; min-height: 44px; padding: 0 1.25rem;
    border-radius: 999px; background: var(--ink); color: #fff;
    font-weight: 500; font-size: 0.95rem; text-decoration: none;
  }
  .btn-nav:hover { background: #262d4a; }
  .hamburger {
    display: none; width: 44px; height: 44px; border: 0; background: transparent; cursor: pointer;
    flex-direction: column; justify-content: center; align-items: center; gap: 5px;
  }
  .hamburger span { display: block; width: 22px; height: 2px; background: var(--ink); transition: transform 0.25s ease, opacity 0.2s ease; }
  .hamburger.open span:nth-child(1) { transform: translateY(7px) rotate(45deg); }
  .hamburger.open span:nth-child(2) { opacity: 0; }
  .hamburger.open span:nth-child(3) { transform: translateY(-7px) rotate(-45deg); }
  .mobile-menu {
    position: absolute; top: 76px; left: 0; right: 0;
    display: flex; flex-direction: column;
    background: #fff; max-height: 0; overflow: hidden;
    transition: max-height 0.35s ease;
  }
  .mobile-menu.open { max-height: 480px; border-bottom: 1px solid var(--line); }
  .mobile-menu a {
    padding: 1rem 1.5rem; color: var(--ink); text-decoration: none;
    border-top: 1px solid var(--line); font-weight: 600;
  }
  .mobile-menu .m-cta { color: var(--accent-ink); }

  /* ---------- hero ---------- */
  .hero { background: var(--pistachio); padding: 9rem 0 6rem; }
  .hero-inner { display: flex; flex-wrap: wrap; gap: 3rem; align-items: flex-end; }
  .hero-copy { flex: 999 1 540px; min-width: 0; display: flex; flex-direction: column; gap: 1.75rem; }
  .kicker {
    font-family: 'Geist Mono', ui-monospace, monospace;
    font-size: 0.8rem; letter-spacing: 0.06em; text-transform: uppercase;
    color: var(--accent-ink);
  }
  .hero h1 {
    font-weight: 500;
    font-size: clamp(2.625rem, 5vw, 4.25rem);
    line-height: 1.04;
    letter-spacing: -0.035em;
  }
  .hero h1 span.accent { display: block; }
  .hero-sub { max-width: 46ch; font-size: 1.125rem; line-height: 1.55; color: var(--ink-2); }
  .hero-visual {
    flex: 1 1 380px; min-width: 0;
    position: relative; height: 460px;
    border-radius: 28px; overflow: hidden; background: #cfddb2;
  }
  .hero-visual img { width: 100%; height: 100%; object-fit: cover; display: block; }
  .status {
    position: absolute; left: 16px; right: 16px; bottom: 16px;
    padding: 1rem 1.15rem; border-radius: 18px;
    background: rgba(255, 255, 255, 0.92);
    display: flex; flex-wrap: wrap; justify-content: space-between; gap: 0.75rem;
    color: var(--ink);
  }
  .live {
    display: flex; align-items: center; gap: 0.5rem;
    font-family: 'Geist Mono', ui-monospace, monospace;
    font-size: 0.75rem; text-transform: uppercase; color: var(--accent-ink);
  }
  .live i { width: 8px; height: 8px; border-radius: 50%; background: var(--accent); animation: pulse 1.8s ease-in-out infinite; }
  @keyframes pulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.35; } }

  /* ---------- strip ---------- */
  .strip { background: #fff; border-bottom: 1px solid var(--line); }
  .marquee {
    overflow: hidden;
    padding: 1.35rem 0;
    -webkit-mask-image: linear-gradient(90deg, transparent, #000 6%, #000 94%, transparent);
    mask-image: linear-gradient(90deg, transparent, #000 6%, #000 94%, transparent);
  }
  .track { display: flex; width: max-content; animation: marquee 45s linear infinite; }
  .strip:hover .track { animation-play-state: paused; }
  .group {
    display: flex; align-items: center; gap: 2.5rem; padding-right: 2.5rem;
    white-space: nowrap; font-weight: 500; font-size: 0.95rem;
  }
  @keyframes marquee { to { transform: translateX(-50%); } }
  .slash { color: var(--accent); }

  /* ---------- manifesto ---------- */
  .manifesto { padding: 8.75rem 0; }
  .manifesto .wrap { display: flex; flex-direction: column; gap: 1.75rem; }
  .statement {
    max-width: 24ch;
    font-weight: 500;
    font-size: clamp(2rem, 3.4vw, 2.75rem);
    line-height: 1.12;
    letter-spacing: -0.025em;
  }
  .statement .accent { color: #e04a26; }

  /* ---------- pillars ---------- */
  .pillars { background: var(--lavender); padding: 7.5rem 0; }
  .pillars .wrap { display: flex; flex-direction: column; gap: 3rem; }
  .pillar-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 1rem; }
  .pillar {
    min-height: 280px; padding: 2rem; border-radius: 28px;
    display: flex; flex-direction: column; justify-content: space-between; gap: 1rem;
    background: #fff;
  }
  .pillar h3 { font-size: 1.5rem; font-weight: 500; letter-spacing: -0.015em; line-height: 1.2; margin-bottom: 0.75rem; }
  .pillar p { line-height: 1.6; color: var(--muted); }
  .pillar.p1 { background: var(--pistachio); }
  .pillar.p1 p { color: var(--ink-2); }
  .pillar.p2 { background: var(--accent); }
  .pillar.p2 .tag, .pillar.p2 p { color: var(--ink); }

  /* ---------- AI ---------- */
  .ai { padding: 8.75rem 0; }
  .ai-inner { display: flex; flex-wrap: wrap; gap: 3.5rem; align-items: center; }
  .ai-copy { flex: 1 1 460px; min-width: 0; display: flex; flex-direction: column; gap: 1.4rem; }
  .ai-steps { flex: 1 1 420px; min-width: 0; display: flex; flex-direction: column; gap: 0.75rem; }
  .step {
    padding: 1.5rem 1.75rem; border-radius: 24px;
    background: #fff; border: 1px solid var(--line);
    display: flex; justify-content: space-between; align-items: center; gap: 1rem; flex-wrap: wrap;
  }
  .step strong { font-size: 1.375rem; font-weight: 500; }
  .step .mono { color: var(--muted); }
  .step.last { background: var(--pistachio); border-color: var(--pistachio); }
  .step.last .mono { color: var(--ink-2); }

  /* ---------- media ---------- */
  .media { background: #fff; border-top: 1px solid var(--line); padding: 7.5rem 0; }
  .media .wrap { display: flex; flex-direction: column; gap: 3rem; }
  .media-head { display: flex; flex-wrap: wrap; justify-content: space-between; align-items: flex-end; gap: 1.5rem; }
  .media-head > div { display: flex; flex-direction: column; gap: 1rem; }
  .photo-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 1rem; }
  .photo-grid figure { display: flex; flex-direction: column; gap: 0.75rem; }
  .photo-grid img {
    width: 100%; aspect-ratio: 4 / 5; object-fit: cover; display: block;
    border-radius: 22px; background: var(--lavender);
  }
  .photo-grid figcaption { font-weight: 500; font-size: 1.05rem; }

  /* ---------- CTA ---------- */
  .cta-wrap { padding: 7.5rem 0; }
  .cta {
    padding: 4.5rem 3rem; border-radius: 36px; background: var(--pistachio);
    display: flex; flex-wrap: wrap; align-items: flex-end; justify-content: space-between; gap: 2rem;
  }
  .cta-copy { flex: 1 1 520px; min-width: 0; display: flex; flex-direction: column; gap: 1rem; }
  .cta-copy .h2 { max-width: 16ch; }
  .cta-copy p { max-width: 46ch; font-size: 1.125rem; line-height: 1.6; color: var(--ink-2); }

  /* ---------- footer ---------- */
  footer { border-top: 1px solid var(--line); padding: 4rem 0 3rem; background: var(--bg); }
  .footer-grid { display: grid; grid-template-columns: 1.6fr 0.9fr 1fr 1.5fr; gap: 3rem; }
  .footer-brand { font-weight: 600; font-size: 1.35rem; letter-spacing: -0.02em; margin-bottom: 0.5rem; }
  .footer-brand span { font-weight: 600; font-size: 0.9rem; color: var(--ink-2); margin-left: 0.4rem; }
  .footer-main > p { font-size: 0.9rem; color: var(--muted); }
  .social-links { display: flex; gap: 0.5rem; margin-top: 1.25rem; }
  .social-icon {
    width: 40px; height: 40px; border-radius: 50%;
    display: flex; align-items: center; justify-content: center;
    color: var(--ink-2); border: 1px solid var(--line);
    transition: color 0.2s ease, border-color 0.2s ease;
  }
  .social-icon:hover { color: var(--accent); border-color: var(--accent); }
  .social-icon svg { width: 18px; height: 18px; }
  .footer-col { display: flex; flex-direction: column; gap: 0.6rem; }
  .footer-col h5, .foot-map h5 {
    margin-bottom: 0.4rem;
    font-family: 'Geist Mono', ui-monospace, monospace;
    font-size: 0.72rem; font-weight: 500; letter-spacing: 0.08em; text-transform: uppercase;
    color: var(--muted);
  }
  .footer-col a { color: var(--ink); font-size: 0.9rem; text-decoration: none; }
  .footer-col a:hover { color: var(--accent-ink); }
  .footer-note > p { font-size: 0.85rem; color: var(--muted); margin-bottom: 0.3rem; }
  .foot-map { max-width: 340px; margin-top: 1.5rem; }
  .foot-map-frame { aspect-ratio: 16 / 10; overflow: hidden; border-radius: 18px; border: 1px solid var(--line); }
  .foot-map-frame iframe { width: 100%; height: 100%; display: block; border: 0; }
  .foot-dir {
    display: inline-block; margin-top: 0.65rem;
    color: var(--ink-2); font-size: 0.875rem; font-weight: 500; text-decoration: none;
  }
  .foot-dir:hover { color: var(--accent-ink); }

  /* ---------- responsive ---------- */
  @media (max-width: 1024px) {
    .desktop-links { display: none; }
    .hamburger { display: flex; }
    .footer-grid { grid-template-columns: 1fr 1fr; }
  }
  @media (max-width: 640px) {
    .wrap, .nav-inner { padding: 0 1rem; }
    .brand-sub { display: none; }
    .btn-nav { display: none; }
    .hero { padding: 7rem 0 4rem; }
    .hero-visual { height: 360px; }
    .manifesto, .ai { padding: 5.5rem 0; }
    .pillars, .media, .cta-wrap { padding: 4.5rem 0; }
    .cta { padding: 2.5rem 1.5rem; border-radius: 28px; }
    .footer-grid { grid-template-columns: 1fr; gap: 2rem; }
  }
  @media (prefers-reduced-motion: reduce) {
    .reveal { opacity: 1; transform: none; transition: none; }
    .live i { animation: none; }
    .track { animation: none; }
    .marquee { overflow-x: auto; scrollbar-width: none; }
    :global(html) { scroll-behavior: auto; }
  }
</style>