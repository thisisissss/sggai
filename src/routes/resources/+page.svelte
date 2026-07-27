<script>
  import { onMount } from "svelte";

  const LINE_URL = "https://line.me/ti/p/eZ2GG61uIe";

  let lang = "en";
  $: t = tr[lang];
  function toggleLang() { lang = lang === "en" ? "th" : "en"; }

  // GA4 event helper — safe on SSR and when gtag is blocked
  function getVariant() {
    if (typeof document === "undefined") return "unknown";
    const m = document.cookie.match(/(?:^|; )ab_variant=([ab])/);
    return m ? m[1] : "unknown";
  }

  function track(name, params = {}) {
    if (typeof window !== "undefined" && typeof window.gtag === "function") {
      window.gtag("event", name, { variant: getVariant(), ...params });
    }
  }

  let scrolled = false;
  onMount(() => {
    const onScroll = () => { scrolled = window.scrollY > 24; };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  });

  /* ──────────────────────────────────────────────────────────────
     THE ARCHIVE
     Add a record by appending an object below. Fields:
       cat   — "technical" | "research" | "guides" | "other"
       title — display title
       by    — author / source (shown italic)
       blurb — one line, what it is
       tags  — array of short keywords (searchable)
       size  — file size as text, e.g. "1.4 MB"
       pages — page count as a number, or null to hide
       date  — "YYYY-MM-DD"
       kind  — "PDF" | "ARTICLE"
       href  — /file-in-static.pdf, /route, or an external URL
     ────────────────────────────────────────────────────────────── */
  const records = [
    {
      cat: "technical",
      title: "Smart Polyponics — System Presentation",
      by: "Sustainable Green Gold AI",
      blurb: "The closed loop, the sensor stack, the species program, and how an installation is scoped for a site.",
      tags: ["aquaponics", "installation", "sensors"],
      size: "—",
      pages: null,
      date: "2026-07-01",
      kind: "PDF",
      href: "/Smart_Polyponics_EN.pdf",
    },
    {
      cat: "technical",
      title: "Smart Polyponics — เอกสารนำเสนอระบบ",
      by: "Sustainable Green Gold AI",
      blurb: "เอกสารนำเสนอฉบับเดียวกันในภาษาไทย สำหรับพาร์ทเนอร์ ทีมงาน และหน่วยงานที่ออกใบอนุญาต",
      tags: ["อควาโพนิกส์", "ติดตั้ง", "เซ็นเซอร์"],
      size: "—",
      pages: null,
      date: "2026-07-01",
      kind: "PDF",
      href: "/Smart_Polyponics_TH.pdf",
    },
  ];

  const cats = ["all", "technical", "research", "guides", "other"];

  let query = "";
  let cat = "all";

  function norm(s) { return String(s).toLowerCase(); }

  $: q = norm(query).trim();
  $: filtered = records.filter((r) => {
    if (cat !== "all" && r.cat !== cat) return false;
    if (!q) return true;
    return [r.title, r.by, r.blurb, ...(r.tags || [])].some((f) => norm(f).includes(q));
  });

  const tr = {
    en: {
      nav: { home: "Main site", install: "Installations", contact: "Contact Us" },
      head: { title: "Archive", sub: "Documentation, field notes, and reference material from the farm. Everything here is ours to share." },
      ui: {
        search: "Search title, author, tag…",
        count: (n) => `${n} ${n === 1 ? "record" : "records"}`,
        get: "Receive",
        empty: "Nothing matches that. Try a broader term or clear the filter.",
        clear: "Clear filters",
        pages: "P",
      },
      cats: { all: "All", technical: "Technical", research: "Research", guides: "Guides", other: "Other" },
      cta: { h2: "Looking for something that isn't here?", p: "Ask on Line and we will send it — or write it up if it doesn't exist yet.", btn: "Ask us on Line" },
      footer: {
        rights: "© 2026 Sustainable Green Gold AI. All rights reserved.",
        location: "207 Moo 4, Tambon Nang Lae, Chiang Rai, Thailand",
        email: "contact@sustainablegreengold.com",
      },
    },
    th: {
      nav: { home: "เว็บไซต์หลัก", install: "การติดตั้งระบบ", contact: "ติดต่อเรา" },
      head: { title: "คลังข้อมูล", sub: "เอกสาร บันทึกภาคสนาม และข้อมูลอ้างอิงจากฟาร์มของเรา ทุกอย่างที่นี่เป็นของเราและเปิดให้เผยแพร่ได้" },
      ui: {
        search: "ค้นหาชื่อเรื่อง ผู้เขียน แท็ก…",
        count: (n) => `${n} รายการ`,
        get: "รับไฟล์",
        empty: "ไม่พบรายการที่ตรงกัน ลองใช้คำที่กว้างขึ้นหรือล้างตัวกรอง",
        clear: "ล้างตัวกรอง",
        pages: "หน้า",
      },
      cats: { all: "ทั้งหมด", technical: "เทคนิค", research: "งานวิจัย", guides: "คู่มือ", other: "อื่น ๆ" },
      cta: { h2: "ไม่พบสิ่งที่ต้องการ?", p: "ถามมาทาง Line เราจะส่งให้ — หรือเขียนขึ้นใหม่ถ้ายังไม่มี", btn: "ถามเราทาง Line" },
      footer: {
        rights: "© 2026 Sustainable Green Gold AI สงวนลิขสิทธิ์",
        location: "207 หมู่ 4 ตำบลนางแล อำเภอเมืองเชียงราย จังหวัดเชียงราย ประเทศไทย",
        email: "contact@sustainablegreengold.com",
      },
    },
  };
</script>

<svelte:head>
  <title>Archive — Sustainable Green Gold AI</title>
  <meta name="description" content="Documentation, field notes, and reference material from our aquaponics farm in Chiang Rai." />
  <link href="https://fonts.googleapis.com/css2?family=Manrope:wght@400;500;600;700;800&family=IBM+Plex+Mono:wght@400;500&display=swap" rel="stylesheet" />
</svelte:head>

<!-- NAV -->
<header class:scrolled>
  <nav class="nav-inner">
    <a href="/" class="brand">SGG<span>·AI</span></a>
    <ul class="links">
      <li><a href="/">{t.nav.home}</a></li>
      <li><a href="/install">{t.nav.install}</a></li>
    </ul>
    <div class="nav-right">
      <button class="lang" on:click={toggleLang}>{lang === "en" ? "ไทย" : "EN"}</button>
      <a href={LINE_URL} target="_blank" rel="noopener" class="btn-nav" on:click={() => track("line_click", { location: "archive_nav" })}>{t.nav.contact}</a>
    </div>
  </nav>
</header>

<main>
  <div class="container">
    <!-- HEAD -->
    <div class="page-head">
      <h1>{t.head.title}</h1>
      <p class="head-sub">{t.head.sub}</p>
    </div>

    <!-- CONTROLS -->
    <div class="controls">
      <div class="search">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><circle cx="11" cy="11" r="7" /><line x1="16.5" y1="16.5" x2="21" y2="21" /></svg>
        <input type="search" bind:value={query} placeholder={t.ui.search} aria-label={t.ui.search} />
      </div>
      <div class="pills" role="group">
        {#each cats as c}
          <button class="pill" class:active={cat === c} aria-pressed={cat === c} on:click={() => (cat = c)}>
            {t.cats[c]}
          </button>
        {/each}
      </div>
    </div>

    <p class="count">{t.ui.count(filtered.length)}</p>

    <!-- RECORDS -->
    {#if filtered.length}
      <div class="grid">
        {#each filtered as r (r.title)}
          <article class="rec">
            <div class="rec-top">
              <span class="rec-cat">{t.cats[r.cat]}</span>
              <span class="rec-kind">{r.kind}</span>
            </div>
            <h2>{r.title}</h2>
            <p class="rec-by">{r.by}</p>
            <p class="rec-blurb">{r.blurb}</p>
            {#if r.tags?.length}
              <div class="tags">
                {#each r.tags as tag}
                  <button class="tag" on:click={() => (query = tag)}>#{tag}</button>
                {/each}
              </div>
            {/if}
            <div class="rec-foot">
              <span class="meta">
                {r.size}{#if r.pages} · {r.pages}{t.ui.pages}{/if} · {r.date}
              </span>
              <a
                class="get"
                href={r.href}
                target="_blank"
                rel="noopener"
                on:click={() => track("resource_download", { file: r.href, category: r.cat, kind: r.kind })}
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><line x1="12" y1="4" x2="12" y2="16" /><polyline points="6 11 12 17 18 11" /><line x1="5" y1="20" x2="19" y2="20" /></svg>
                {t.ui.get}
              </a>
            </div>
          </article>
        {/each}
      </div>
    {:else}
      <div class="empty">
        <p>{t.ui.empty}</p>
        <button class="clear" on:click={() => { query = ""; cat = "all"; }}>{t.ui.clear}</button>
      </div>
    {/if}
  </div>

  <!-- CTA -->
  <section class="cta">
    <div class="container">
      <h2>{t.cta.h2}</h2>
      <p>{t.cta.p}</p>
      <a href={LINE_URL} target="_blank" rel="noopener" class="btn-primary" on:click={() => track("line_click", { location: "archive_cta" })}>{t.cta.btn}</a>
    </div>
  </section>
</main>

<!-- FOOTER -->
<footer>
  <div class="container foot">
    <div class="foot-brand">SGG<span>·AI</span></div>
    <div class="foot-links">
      <a href="/">{t.nav.home}</a>
      <a href="/install">{t.nav.install}</a>
      <a href="mailto:{t.footer.email}">{t.footer.email}</a>
    </div>
    <div class="foot-note">
      <p>{t.footer.location}</p>
      <p>{t.footer.rights}</p>
    </div>
  </div>
</footer>

<style>
  :global(*, *::before, *::after) { box-sizing: border-box; margin: 0; padding: 0; }
  :global(html) { scroll-behavior: smooth; }
  :global(body) { font-family: "Manrope", sans-serif; color: #111827; background: #f4f5f6; -webkit-font-smoothing: antialiased; line-height: 1.6; }

  .container { max-width: 1120px; margin: 0 auto; padding: 0 1.5rem; }
  main { padding: 7.5rem 0 0; }

  /* ── NAV ── */
  header { position: fixed; top: 0; left: 0; right: 0; z-index: 200; background: #fff; border-bottom: 1px solid #e5e7eb; transition: box-shadow 0.3s; }
  header.scrolled { box-shadow: 0 2px 16px rgba(0,0,0,0.06); }
  .nav-inner { max-width: 1120px; margin: 0 auto; padding: 0 1.5rem; height: 64px; display: flex; align-items: center; justify-content: space-between; gap: 1rem; }
  .brand { font-size: 1.2rem; font-weight: 800; letter-spacing: -0.01em; text-decoration: none; color: #050d1e; }
  .brand span { color: #ff5c2a; }
  .links { display: flex; list-style: none; gap: 1.75rem; }
  .links a { color: #374151; text-decoration: none; font-size: 0.9rem; font-weight: 500; transition: color 0.15s; }
  .links a:hover { color: #ff5c2a; }
  .nav-right { display: flex; align-items: center; gap: 0.7rem; }
  .lang { background: none; border: 1.5px solid #e5e7eb; color: #374151; padding: 0.4rem 0.8rem; border-radius: 4px; font-size: 0.75rem; font-weight: 700; cursor: pointer; transition: border-color 0.15s, color 0.15s; }
  .lang:hover { border-color: #ff5c2a; color: #ff5c2a; }
  .btn-nav { background: #ff5c2a; color: #fff; text-decoration: none; padding: 0.55rem 1.15rem; border-radius: 6px; font-size: 0.85rem; font-weight: 700; transition: background 0.15s; }
  .btn-nav:hover { background: #e04a1f; }

  /* ── PAGE HEAD ── */
  .page-head { border-bottom: 3px solid #ff5c2a; padding-bottom: 1.1rem; margin-bottom: 2rem; }
  .page-head h1 { font-size: clamp(1.9rem, 3.4vw, 2.5rem); font-weight: 800; letter-spacing: -0.03em; color: #050d1e; }
  .head-sub { color: #6b7280; font-size: 0.95rem; max-width: 620px; margin-top: 0.5rem; }

  /* ── CONTROLS ── */
  .controls { display: flex; align-items: center; gap: 1.25rem; flex-wrap: wrap; margin-bottom: 1.25rem; }
  .search { position: relative; flex: 1 1 320px; max-width: 420px; }
  .search svg { position: absolute; left: 0.85rem; top: 50%; transform: translateY(-50%); width: 15px; height: 15px; color: #9ca3af; pointer-events: none; }
  .search input { width: 100%; background: #fff; border: 1px solid #d1d5db; border-radius: 6px; padding: 0.7rem 0.9rem 0.7rem 2.4rem; font-family: inherit; font-size: 0.92rem; color: #111827; transition: border-color 0.15s, box-shadow 0.15s; }
  .search input::placeholder { color: #9ca3af; }
  .search input:focus { outline: none; border-color: #ff5c2a; box-shadow: 0 0 0 3px rgba(255,92,42,0.13); }
  .pills { display: flex; gap: 0.5rem; flex-wrap: wrap; }
  .pill { background: #fff; border: 1px solid #d1d5db; color: #374151; border-radius: 100px; padding: 0.5rem 1.1rem; font-family: inherit; font-size: 0.87rem; font-weight: 600; cursor: pointer; transition: border-color 0.15s, color 0.15s, background 0.15s; }
  .pill:hover { border-color: #ff5c2a; color: #ff5c2a; }
  .pill.active { background: #ff5c2a; border-color: #ff5c2a; color: #fff; }
  .count { font-family: "IBM Plex Mono", monospace; font-size: 0.78rem; color: #9ca3af; margin-bottom: 1.5rem; }

  /* ── RECORDS ── */
  .grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1.5rem; }
  .rec { display: flex; flex-direction: column; background: #fff; border: 1px solid #e5e7eb; border-top: 3px solid #ff5c2a; transition: box-shadow 0.2s, transform 0.15s; }
  .rec:hover { box-shadow: 0 14px 40px rgba(5,13,30,0.09); transform: translateY(-2px); }
  .rec-top { display: flex; align-items: center; justify-content: space-between; gap: 0.75rem; padding: 1.4rem 1.5rem 0; }
  .rec-cat { font-size: 0.72rem; font-weight: 800; letter-spacing: 0.13em; text-transform: uppercase; color: #ff5c2a; }
  .rec-kind { font-family: "IBM Plex Mono", monospace; font-size: 0.68rem; letter-spacing: 0.1em; color: #9ca3af; }
  .rec h2 { font-size: 1.15rem; font-weight: 800; letter-spacing: -0.015em; line-height: 1.3; color: #050d1e; padding: 0.85rem 1.5rem 0; }
  .rec-by { font-style: italic; color: #6b7280; font-size: 0.92rem; padding: 0.5rem 1.5rem 0; }
  .rec-blurb { color: #374151; font-size: 0.93rem; line-height: 1.7; padding: 0.85rem 1.5rem 0; flex: 1; }
  .tags { display: flex; flex-wrap: wrap; gap: 0.4rem; padding: 1.1rem 1.5rem 0; }
  .tag { background: #f3f4f6; border: none; color: #6b7280; font-family: inherit; font-size: 0.78rem; padding: 0.28rem 0.6rem; border-radius: 3px; cursor: pointer; transition: background 0.15s, color 0.15s; }
  .tag:hover { background: #ffe8e0; color: #e04a1f; }
  .rec-foot { display: flex; align-items: center; justify-content: space-between; gap: 0.75rem; margin: 1.3rem 1.5rem 1.4rem; padding-top: 1.1rem; border-top: 1px solid #f3f4f6; }
  .meta { font-family: "IBM Plex Mono", monospace; font-size: 0.74rem; color: #9ca3af; letter-spacing: 0.02em; }
  .get { display: inline-flex; align-items: center; gap: 0.45rem; border: 1.5px solid #ff5c2a; color: #ff5c2a; background: #fff; border-radius: 100px; padding: 0.5rem 1.1rem; font-size: 0.85rem; font-weight: 700; text-decoration: none; transition: background 0.15s, color 0.15s; }
  .get svg { width: 14px; height: 14px; flex-shrink: 0; }
  .get:hover { background: #ff5c2a; color: #fff; }

  /* ── EMPTY ── */
  .empty { background: #fff; border: 1px dashed #d1d5db; padding: 3.5rem 1.5rem; text-align: center; }
  .empty p { color: #6b7280; font-size: 0.95rem; margin-bottom: 1.25rem; }
  .clear { background: none; border: 1.5px solid #d1d5db; color: #374151; font-family: inherit; font-size: 0.85rem; font-weight: 700; padding: 0.55rem 1.2rem; border-radius: 100px; cursor: pointer; transition: border-color 0.15s, color 0.15s; }
  .clear:hover { border-color: #ff5c2a; color: #ff5c2a; }

  /* ── CTA ── */
  .cta { margin-top: 5rem; background: #050d1e; padding: 5rem 0; text-align: center; }
  .cta h2 { font-size: 1.75rem; font-weight: 800; letter-spacing: -0.025em; color: #f9fafb; margin-bottom: 0.85rem; }
  .cta p { color: rgba(255,255,255,0.55); max-width: 460px; margin: 0 auto 2rem; font-size: 0.95rem; }
  .btn-primary { display: inline-block; text-decoration: none; background: #ff5c2a; color: #fff; padding: 0.85rem 1.9rem; border-radius: 8px; font-size: 0.92rem; font-weight: 700; transition: background 0.2s, transform 0.15s; }
  .btn-primary:hover { background: #e04a1f; transform: translateY(-2px); }

  /* ── FOOTER ── */
  footer { background: #050d1e; border-top: 1px solid rgba(255,255,255,0.07); padding: 3rem 0 2.5rem; }
  .foot { display: flex; flex-direction: column; align-items: center; gap: 1.3rem; text-align: center; }
  .foot-brand { font-size: 1.15rem; font-weight: 800; color: #fff; }
  .foot-brand span { color: #ff5c2a; }
  .foot-links { display: flex; gap: 1.9rem; flex-wrap: wrap; justify-content: center; }
  .foot-links a { color: rgba(255,255,255,0.5); text-decoration: none; font-size: 0.85rem; transition: color 0.15s; }
  .foot-links a:hover { color: #ff5c2a; }
  .foot-note p { color: rgba(255,255,255,0.32); font-size: 0.78rem; margin-bottom: 0.25rem; }

  /* ── A11Y / MOTION ── */
  a:focus-visible, button:focus-visible, input:focus-visible { outline: 2px solid #ff5c2a; outline-offset: 3px; }
  @media (prefers-reduced-motion: reduce) {
    :global(html) { scroll-behavior: auto; }
    .rec { transition: none; }
    .rec:hover { transform: none; }
  }

  /* ── RESPONSIVE ── */
  @media (max-width: 1000px) {
    .grid { grid-template-columns: repeat(2, 1fr); }
  }
  @media (max-width: 700px) {
    main { padding-top: 6.5rem; }
    .links { display: none; }
    .grid { grid-template-columns: 1fr; }
    .search { max-width: none; }
    .cta { margin-top: 3.5rem; padding: 4rem 0; }
  }
</style>