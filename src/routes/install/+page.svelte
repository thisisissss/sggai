<script>
  import { onMount } from "svelte";

  const R2 = "https://media.sustainablegreengold.com";
  const LINE_URL = "https://line.me/ti/p/eZ2GG61uIe";

  let lang = "en";
  $: t = tr[lang];
  function toggleLang() { lang = lang === "en" ? "th" : "en"; }

  // GA4 event helper — safe on SSR and when gtag is blocked
  function track(name, params = {}) {
    if (typeof window !== "undefined" && typeof window.gtag === "function") {
      window.gtag("event", name, params);
    }
  }

  let scrolled = false;
  let menuOpen = false;
  let visible = {};

  onMount(() => {
    const onScroll = () => { scrolled = window.scrollY > 24; };
    window.addEventListener("scroll", onScroll);
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          const k = e.target.dataset.reveal;
          if (k) { visible[k] = true; visible = visible; }
        }
      });
    }, { threshold: 0.12 });
    document.querySelectorAll("[data-reveal]").forEach((el) => observer.observe(el));
    return () => { window.removeEventListener("scroll", onScroll); observer.disconnect(); };
  });

  const tr = {
    en: {
      nav: {
        what: "What is Aquaponics",
        system: "The System",
        growers: "For Growers",
        farm: "The Farm",
        contact: "Contact Us",
      },
      what: {
        eyebrow: "THE METHOD",
        h2: "WHAT IS AQUAPONICS?",
        p: "Fish excrete ammonia. Bacteria in the biofilter convert it to nitrate. Plant roots absorb it straight from the circulating water — the same nitrogen cycle a fertilizer schedule imitates, running 24 hours a day at zero cost. One closed loop grows fish and crops together: no fertilizer, no pesticides, a fraction of the water of soil farming, and sensors logging the chemistry the whole way.",
        loop: ["FISH", "AMMONIA", "BACTERIA", "NITRATE", "PLANTS", "CLEAN WATER"],
      },
      hero: {
        kicker: "AQUAPONICS · CHIANG RAI, THAILAND · OPERATIONAL",
        h1_1: "FISH FEED THE PLANTS.",
        h1_2: "THE SYSTEM FEEDS YOU.",
        sub: "One closed loop grows fish and crops together — zero fertilizer, a fraction of the water, sensors on every tank. We design and install these systems anywhere in Thailand.",
        cta: "GET YOUR SYSTEM",
        cta2: "HOW IT WORKS ↓",
      },
      next: {
        eyebrow: "NEXT STEPS",
        h2: "LOOKING TO START GROWING?",
        sub: "Four ways in — from a compact demo to a fully monitored production system.",
        cards: [
          { icon: "⬡", title: "FULL INSTALLATION", body: "A turnkey ecosystem designed for your site: tanks, grow beds, biofilter, and live water-chemistry monitoring." },
          { icon: "◈", title: "DEMO SYSTEM", body: "A compact working setup — see the closed loop run on your own land before committing to a full build." },
          { icon: "◉", title: "AI MONITORING", body: "pH, EC, DO and ORP sensors logging around the clock, with alerts before fish or plants are affected." },
          { icon: "⬟", title: "CANNABIS GROWERS", body: "Outdoor aquaponic beds that cut the two biggest cost lines — energy and fertilizer — for licensed cultivation." },
        ],
        cta: "EXPLORE THE OPTIONS",
      },
      farm: {
        eyebrow: "OPERATIONAL FARM",
        h2: "SEE A LIVE INSTALLATION IN CHIANG RAI.",
        p: "This is not a concept. Our facility runs today: fish waste feeds plants, plants purify water, and a proprietary sensor network logs the chemistry hour by hour. Visit the farm, see the harvests, and talk through a system for your own site.",
        log: "SENSOR LOG · HARVEST — TANK ROW A · CHIANG RAI",
        cta: "BOOK A FARM VISIT",
      },
      growers: {
        eyebrow: "FOR LICENSED GROWERS",
        h2: "CANNABIS ON AQUAPONICS. PROVEN OUTDOORS.",
        p: "Thailand's flower prices fell while indoor electricity bills didn't. Our outdoor aquaponic beds grow 3–4 meter plants under natural sun with zero fertilizer cost — and the same water raises market fish.",
        points: [
          "Sunlight replaces the entire lighting bill",
          "The biofilter replaces the fertilizer schedule",
          "Water chemistry logged 24/7 for traceable batches",
          "A second revenue stream: market fish from the same loop",
        ],
        cta: "GET A SYSTEM FOR YOUR GROW",
        log: "FIELD LOG · OUTDOOR AQUAPONIC BEDS — NATURAL SUN",
        note: "For licensed cultivators operating under Thai cannabis regulations.",
      },
      quote: {
        line: "The fish feed the plants. The plants clean the water. The system feeds you.",
        attr: "SGG·AI — CHIANG RAI, THAILAND",
      },
      contact: {
        h2: "READY TO GROW?",
        p: "Tell us about your land, your budget, and what you want to harvest. We answer on Line, usually within the day.",
        cta: "CONTACT US ON LINE",
      },
      footer: {
        rights: "© 2026 Sustainable Green Gold AI. All rights reserved.",
        location: "207 Moo 4, Tambon Nang Lae, Chiang Rai, Thailand",
        email: "contact@sustainablegreengold.com",
        home: "Main site",
      },
    },
    th: {
      nav: {
        what: "อควาโพนิกส์คืออะไร",
        system: "ระบบของเรา",
        growers: "สำหรับผู้ปลูก",
        farm: "ฟาร์มของเรา",
        contact: "ติดต่อเรา",
      },
      what: {
        eyebrow: "หลักการทำงาน",
        h2: "อควาโพนิกส์คืออะไร?",
        p: "ปลาขับแอมโมเนีย แบคทีเรียในไบโอฟิลเตอร์เปลี่ยนเป็นไนเตรต และรากพืชดูดซึมโดยตรงจากน้ำที่หมุนเวียน — วัฏจักรไนโตรเจนเดียวกับที่ตารางให้ปุ๋ยเลียนแบบ แต่ทำงานตลอด 24 ชั่วโมงโดยไม่มีต้นทุน วงจรปิดเดียวเลี้ยงปลาและปลูกพืชไปพร้อมกัน: ไม่ใช้ปุ๋ย ไม่ใช้ยาฆ่าแมลง ใช้น้ำเพียงเศษเสี้ยวของการเกษตรในดิน และมีเซ็นเซอร์บันทึกเคมีน้ำตลอดเส้นทาง",
        loop: ["ปลา", "แอมโมเนีย", "แบคทีเรีย", "ไนเตรต", "พืช", "น้ำสะอาด"],
      },
      hero: {
        kicker: "อควาโพนิกส์ · เชียงราย ประเทศไทย · เปิดดำเนินการ",
        h1_1: "ปลาเลี้ยงพืช",
        h1_2: "ระบบเลี้ยงคุณ",
        sub: "วงจรปิดเดียวเลี้ยงปลาและปลูกพืชไปพร้อมกัน — ไม่ใช้ปุ๋ย ใช้น้ำเพียงเศษเสี้ยว มีเซ็นเซอร์ทุกถัง เราออกแบบและติดตั้งระบบนี้ได้ทุกที่ในประเทศไทย",
        cta: "ขอระบบของคุณ",
        cta2: "ดูวิธีทำงาน ↓",
      },
      next: {
        eyebrow: "ขั้นตอนถัดไป",
        h2: "อยากเริ่มปลูกใช่ไหม?",
        sub: "สี่ทางเลือกในการเริ่มต้น — จากระบบสาธิตขนาดเล็กไปจนถึงระบบผลิตเต็มรูปแบบพร้อมการตรวจวัด",
        cards: [
          { icon: "⬡", title: "ติดตั้งเต็มรูปแบบ", body: "ระบบนิเวศครบวงจรออกแบบตามพื้นที่ของคุณ: ถังปลา แปลงปลูก ไบโอฟิลเตอร์ และการตรวจวัดเคมีน้ำแบบเรียลไทม์" },
          { icon: "◈", title: "ระบบสาธิต", body: "ระบบขนาดกะทัดรัดที่ทำงานได้จริง — เห็นวงจรปิดทำงานในพื้นที่ของคุณเองก่อนตัดสินใจติดตั้งเต็มรูปแบบ" },
          { icon: "◉", title: "การตรวจวัดด้วย AI", body: "เซ็นเซอร์ pH, EC, DO และ ORP บันทึกตลอด 24 ชั่วโมง พร้อมแจ้งเตือนก่อนที่ปลาหรือพืชจะได้รับผลกระทบ" },
          { icon: "⬟", title: "ผู้ปลูกกัญชา", body: "แปลงอควาโพนิกส์กลางแจ้งที่ตัดต้นทุนสองรายการใหญ่ที่สุด — พลังงานและปุ๋ย — สำหรับการปลูกที่มีใบอนุญาต" },
        ],
        cta: "ดูตัวเลือกทั้งหมด",
      },
      farm: {
        eyebrow: "ฟาร์มที่เปิดดำเนินการ",
        h2: "ชมระบบจริงที่เชียงราย",
        p: "นี่ไม่ใช่แค่แนวคิด ฟาร์มของเราทำงานอยู่ทุกวัน: ของเสียจากปลาหล่อเลี้ยงพืช พืชช่วยทำให้น้ำบริสุทธิ์ และเครือข่ายเซ็นเซอร์บันทึกเคมีน้ำทุกชั่วโมง มาเยี่ยมชมฟาร์ม ดูผลผลิตจริง และพูดคุยเรื่องระบบสำหรับพื้นที่ของคุณ",
        log: "บันทึกเซ็นเซอร์ · การเก็บเกี่ยว — แถวถัง A · เชียงราย",
        cta: "นัดเยี่ยมชมฟาร์ม",
      },
      growers: {
        eyebrow: "สำหรับผู้ปลูกที่มีใบอนุญาต",
        h2: "กัญชาบนอควาโพนิกส์ พิสูจน์แล้วกลางแจ้ง",
        p: "ราคาดอกในไทยลดลง แต่ค่าไฟของการปลูกในร่มไม่ลดตาม แปลงอควาโพนิกส์กลางแจ้งของเราปลูกต้นสูง 3–4 เมตรใต้แสงแดดธรรมชาติ โดยไม่มีค่าปุ๋ย — และน้ำเดียวกันยังเลี้ยงปลาเชิงพาณิชย์ได้",
        points: [
          "แสงแดดแทนค่าไฟปลูกทั้งหมด",
          "ไบโอฟิลเตอร์แทนตารางให้ปุ๋ย",
          "บันทึกเคมีน้ำตลอด 24 ชม. เพื่อล็อตที่ตรวจสอบย้อนกลับได้",
          "รายได้ทางที่สอง: ปลาเชิงพาณิชย์จากวงจรเดียวกัน",
        ],
        cta: "ขอระบบสำหรับการปลูกของคุณ",
        log: "บันทึกภาคสนาม · แปลงอควาโพนิกส์กลางแจ้ง — แสงแดดธรรมชาติ",
        note: "สำหรับผู้ปลูกที่มีใบอนุญาตภายใต้กฎระเบียบกัญชาของไทย",
      },
      quote: {
        line: "ปลาหล่อเลี้ยงพืช พืชทำให้น้ำสะอาด ระบบหล่อเลี้ยงคุณ",
        attr: "SGG·AI — เชียงราย ประเทศไทย",
      },
      contact: {
        h2: "พร้อมจะปลูกหรือยัง?",
        p: "เล่าให้เราฟังเกี่ยวกับพื้นที่ งบประมาณ และสิ่งที่คุณอยากเก็บเกี่ยว เราตอบทาง Line โดยปกติภายในวันเดียวกัน",
        cta: "ติดต่อเราทาง Line",
      },
      footer: {
        rights: "© 2026 Sustainable Green Gold AI สงวนลิขสิทธิ์",
        location: "207 หมู่ 4 ตำบลนางแล อำเภอเมืองเชียงราย จังหวัดเชียงราย ประเทศไทย",
        email: "contact@sustainablegreengold.com",
        home: "เว็บไซต์หลัก",
      },
    },
  };
</script>

<svelte:head>
  <title>Sustainable Green Gold AI — Aquaponics Installations</title>
  <link href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=IBM+Plex+Mono:wght@400;500&display=swap" rel="stylesheet" />
</svelte:head>

<!-- NAV -->
<header class:scrolled>
  <nav class="nav-inner">
    <a href="/" class="brand">SGG<span>·AI</span></a>
    <ul class="links">
      <li><a href="#what">{t.nav.what}</a></li>
      <li><a href="#next">{t.nav.system}</a></li>
      <li><a href="#growers">{t.nav.growers}</a></li>
      <li><a href="#farm">{t.nav.farm}</a></li>
    </ul>
    <div class="nav-right">
      <button class="lang" on:click={toggleLang}>{lang === "en" ? "ไทย" : "EN"}</button>
      <a href="#contact" class="btn-nav" on:click={() => track("cta_click", { location: "install_nav" })}>{t.nav.contact}</a>
      <button class="burger" class:open={menuOpen} on:click={() => (menuOpen = !menuOpen)} aria-label="Toggle menu">
        <span /><span /><span />
      </button>
    </div>
  </nav>
  <div class="mmenu" class:open={menuOpen}>
    <a href="#what" on:click={() => (menuOpen = false)}>{t.nav.what}</a>
    <a href="#next" on:click={() => (menuOpen = false)}>{t.nav.system}</a>
    <a href="#growers" on:click={() => (menuOpen = false)}>{t.nav.growers}</a>
    <a href="#farm" on:click={() => (menuOpen = false)}>{t.nav.farm}</a>
    <a href="#contact" class="m-cta" on:click={() => { menuOpen = false; track("cta_click", { location: "install_mobile_nav" }); }}>{t.nav.contact} →</a>
  </div>
</header>

<!-- HERO -->
<section class="hero">
  <div class="hero-bg" style="background-image: url('{R2}/aquaponics/my-system1.jpg')" aria-hidden="true"></div>
  <div class="hero-vignette" aria-hidden="true"></div>
  <div class="wrap hero-wrap">
    <div class="hero-content">
      <div class="hero-kicker">{t.hero.kicker}</div>
      <h1><span>{t.hero.h1_1}</span><span>{t.hero.h1_2}</span></h1>
      <p class="hero-sub">{t.hero.sub}</p>
      <div class="hero-cta-row">
        <a href="#contact" class="btn-solid" on:click={() => track("cta_click", { location: "install_hero" })}>{t.hero.cta}</a>
        <a href="#what" class="btn-ghost">{t.hero.cta2}</a>
      </div>
    </div>
  </div>
</section>

<!-- TELEMETRY TICKER -->
<div class="ticker" aria-hidden="true">
  <div class="ticker-track">
    <div class="ticker-items">
      <span class="tk-k">pH</span><span class="tk-v">6.82</span>
      <span class="tk-k">DO</span><span class="tk-v">7.4 mg/L</span>
      <span class="tk-k">EC</span><span class="tk-v">1.86 mS/cm</span>
      <span class="tk-k">ORP</span><span class="tk-v">312 mV</span>
      <span class="tk-k">H₂O</span><span class="tk-v">27.9°C</span>
      <span class="tk-tag">TANK ROW A · SENSOR LOG</span>
      <span class="tk-k">pH</span><span class="tk-v">6.82</span>
      <span class="tk-k">DO</span><span class="tk-v">7.4 mg/L</span>
      <span class="tk-k">EC</span><span class="tk-v">1.86 mS/cm</span>
      <span class="tk-k">ORP</span><span class="tk-v">312 mV</span>
      <span class="tk-k">H₂O</span><span class="tk-v">27.9°C</span>
      <span class="tk-tag">TANK ROW A · SENSOR LOG</span>
    </div>
  </div>
</div>

<!-- WHAT IS AQUAPONICS -->
<section id="what" class="band band-light" data-reveal="what">
  <div class="wrap center" class:vis={visible["what"]}>
    <div class="eyebrow">{t.what.eyebrow}</div>
    <h2>{t.what.h2}</h2>
    <p class="band-sub wide">{t.what.p}</p>
    <div class="loop">
      {#each t.what.loop as node, i}
        <span class="loop-node" class:alt={i % 2 === 1}>{node}</span>
        {#if i < t.what.loop.length - 1}<span class="loop-arrow">→</span>{:else}<span class="loop-arrow back">⟲</span>{/if}
      {/each}
    </div>
  </div>
</section>

<!-- NEXT STEPS -->
<section id="next" class="band" data-reveal="next">
  <div class="wrap center" class:vis={visible["next"]}>
    <div class="eyebrow">{t.next.eyebrow}</div>
    <h2>{t.next.h2}</h2>
    <p class="band-sub">{t.next.sub}</p>
    <div class="cards">
      {#each t.next.cards as c, i}
        <div class="card" style="transition-delay:{i * 0.07}s">
          <span class="card-ico">{c.icon}</span>
          <h3>{c.title}</h3>
          <p>{c.body}</p>
        </div>
      {/each}
    </div>
    <a href="#contact" class="btn-solid" on:click={() => track("cta_click", { location: "install_next" })}>{t.next.cta}</a>
  </div>
</section>

<!-- FARM BAND -->
<section id="farm" class="band band-light" data-reveal="farm">
  <div class="wrap split" class:vis={visible["farm"]}>
    <div class="split-img">
      <img src="{R2}/aquaponics/harvest.jpg" alt="Harvest at the SGG aquaponics farm" />
      <div class="img-log">{t.farm.log}</div>
      <img class="split-img-sm" src="{R2}/aquaponics/my-system1.jpg" alt="IBC aquaponics system" />
    </div>
    <div class="split-txt">
      <div class="eyebrow">{t.farm.eyebrow}</div>
      <h2>{t.farm.h2}</h2>
      <p>{t.farm.p}</p>
      <a href={LINE_URL} target="_blank" rel="noopener" class="btn-solid" on:click={() => track("line_click", { location: "install_farm" })}>{t.farm.cta}</a>
    </div>
  </div>
</section>

<!-- GROWERS BAND -->
<section id="growers" class="band" data-reveal="growers">
  <div class="wrap split rev" class:vis={visible["growers"]}>
    <div class="split-txt">
      <div class="eyebrow green">{t.growers.eyebrow}</div>
      <h2>{t.growers.h2}</h2>
      <p>{t.growers.p}</p>
      <ul class="list">
        {#each t.growers.points as pt}<li>{pt}</li>{/each}
      </ul>
      <a href={LINE_URL} target="_blank" rel="noopener" class="btn-solid btn-green" on:click={() => track("line_click", { location: "install_growers" })}>{t.growers.cta}</a>
      <p class="fine">{t.growers.note}</p>
    </div>
    <div class="split-img">
      <img src="{R2}/growers/plant1.jpeg" alt="Cannabis grown on outdoor aquaponics" />
      <div class="img-log">{t.growers.log}</div>
      <img class="split-img-sm" src="{R2}/growers/beds.PNG" alt="Aquaponic grow beds" />
    </div>
  </div>
</section>

<!-- QUOTE -->
<section class="quote">
  <div class="wrap center">
    <p class="quote-line">“{t.quote.line}”</p>
    <p class="quote-attr">{t.quote.attr}</p>
  </div>
</section>

<!-- CONTACT -->
<section id="contact" class="band center-band" data-reveal="contact">
  <div class="wrap center" class:vis={visible["contact"]}>
    <h2>{t.contact.h2}</h2>
    <p class="band-sub">{t.contact.p}</p>
    <a href={LINE_URL} target="_blank" rel="noopener" class="btn-solid btn-big" on:click={() => track("line_click", { location: "install_contact" })}>{t.contact.cta}</a>
  </div>
</section>

<!-- FOOTER -->
<footer>
  <div class="wrap foot">
    <div class="foot-brand">SGG<span>·AI</span></div>
    <div class="foot-links">
      <a href="/">{t.footer.home}</a>
      <a href="mailto:{t.footer.email}">{t.footer.email}</a>
      <a href={LINE_URL} target="_blank" rel="noopener" on:click={() => track("line_click", { location: "install_footer" })}>Line</a>
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
  :global(body) { font-family: "Manrope", sans-serif; color: #0b0f14; background: #fff; -webkit-font-smoothing: antialiased; line-height: 1.6; }

  .wrap { max-width: 1080px; margin: 0 auto; padding: 0 1.5rem; }
  .center { text-align: center; }

  /* ── NAV ── */
  header { position: fixed; top: 0; left: 0; right: 0; z-index: 100; background: #fff; border-bottom: 1px solid transparent; transition: border-color 0.3s, box-shadow 0.3s; }
  header.scrolled { border-color: #eceff1; box-shadow: 0 2px 16px rgba(0,0,0,0.05); }
  .nav-inner { max-width: 1080px; margin: 0 auto; padding: 0 1.5rem; height: 64px; display: flex; align-items: center; justify-content: space-between; gap: 1rem; }
  .brand { font-size: 1.2rem; font-weight: 800; letter-spacing: -0.01em; text-decoration: none; color: #0b0f14; }
  .brand span { color: #ff5c2a; }
  .links { display: flex; list-style: none; gap: 1.75rem; }
  .links a { font-family: "Bebas Neue", "Manrope", sans-serif; color: #1f2937; text-decoration: none; font-size: 1.08rem; font-weight: 400; letter-spacing: 0.06em; text-transform: uppercase; position: relative; padding-bottom: 5px; transition: color 0.15s; }
  .links a::after { content: ""; position: absolute; left: 0; right: 0; bottom: 0; height: 3px; background: #ff5c2a; transform: scaleX(0); transform-origin: left; transition: transform 0.2s ease; }
  .links a:hover { color: #0b0f14; }
  .links a:hover::after { transform: scaleX(1); }
  .nav-right { display: flex; align-items: center; gap: 0.7rem; }
  .lang { background: none; border: 1.5px solid #e5e7eb; color: #374151; padding: 0.4rem 0.8rem; border-radius: 4px; font-size: 0.75rem; font-weight: 700; cursor: pointer; transition: border-color 0.15s, color 0.15s; }
  .lang:hover { border-color: #ff5c2a; color: #ff5c2a; }
  .btn-nav { font-family: "Bebas Neue", "Manrope", sans-serif; background: #ff5c2a; color: #fff; text-decoration: none; padding: 0.5rem 1.1rem; border-radius: 4px; font-size: 1rem; font-weight: 400; letter-spacing: 0.06em; text-transform: uppercase; transition: background 0.15s; }
  .btn-nav:hover { background: #e04a1f; }

  .burger { display: none; flex-direction: column; justify-content: center; gap: 5px; width: 36px; height: 36px; background: none; border: none; cursor: pointer; padding: 6px; }
  .burger span { display: block; width: 20px; height: 2px; background: #0b0f14; border-radius: 2px; transition: transform 0.3s, opacity 0.3s; transform-origin: center; }
  .burger.open span:nth-child(1) { transform: translateY(7px) rotate(45deg); }
  .burger.open span:nth-child(2) { opacity: 0; }
  .burger.open span:nth-child(3) { transform: translateY(-7px) rotate(-45deg); }
  .mmenu { display: flex; flex-direction: column; background: #fff; border-bottom: 1px solid #eceff1; max-height: 0; overflow: hidden; transition: max-height 0.35s ease; }
  .mmenu.open { max-height: 320px; }
  .mmenu a { font-family: "Bebas Neue", "Manrope", sans-serif; padding: 0.85rem 1.5rem; color: #374151; text-decoration: none; font-size: 1.05rem; font-weight: 400; letter-spacing: 0.06em; text-transform: uppercase; border-bottom: 1px solid #f3f4f6; }
  .mmenu a:hover { color: #ff5c2a; }
  .m-cta { color: #ff5c2a !important; }

  /* ── HERO ── */
  .hero { position: relative; overflow: hidden; min-height: 94vh; display: flex; align-items: flex-end; background-color: #0a1f1a; padding: 9rem 0 6.5rem; }
  .hero-bg { position: absolute; inset: -6%; background-size: cover; background-position: center; filter: blur(8px) brightness(0.62) saturate(1.15); transform: scale(1.06); animation: heroZoom 26s ease-in-out infinite alternate; will-change: transform; }
  @keyframes heroZoom { from { transform: scale(1.06); } to { transform: scale(1.16); } }
  .hero-vignette { position: absolute; inset: 0; background: linear-gradient(12deg, rgba(8,23,19,0.92) 0%, rgba(8,23,19,0.55) 42%, rgba(8,23,19,0.18) 75%, rgba(8,23,19,0.35) 100%); }
  .hero-wrap { position: relative; z-index: 1; width: 100%; }
  .hero-content { max-width: 760px; text-align: left; }
  .hero-kicker { font-family: "IBM Plex Mono", monospace; font-size: 0.72rem; letter-spacing: 0.18em; color: rgba(123,227,164,0.85); margin-bottom: 1.4rem; }
  .hero-kicker::before { content: "— "; color: #ff5c2a; }
  h1 { font-family: "Bebas Neue", "Manrope", sans-serif; font-weight: 400; font-size: clamp(3.2rem, 8vw, 6.2rem); line-height: 0.96; letter-spacing: 0.015em; text-transform: uppercase; color: #fff; margin-bottom: 1.6rem; text-shadow: 0 4px 40px rgba(0,0,0,0.55); }
  h1 span { display: block; }
  .hero-sub { max-width: 540px; margin: 0 0 2.4rem; color: rgba(255,255,255,0.88); font-size: 1.02rem; line-height: 1.8; text-shadow: 0 1px 12px rgba(0,0,0,0.4); }
  .hero-cta-row { display: flex; gap: 0.9rem; flex-wrap: wrap; align-items: center; }
  .btn-ghost { font-family: "Bebas Neue", "Manrope", sans-serif; display: inline-block; text-decoration: none; background: transparent; color: #fff; border: 1.5px solid rgba(255,255,255,0.55); padding: 0.9rem 1.9rem; border-radius: 4px; font-size: 1.1rem; font-weight: 400; letter-spacing: 0.08em; text-transform: uppercase; transition: border-color 0.15s, background 0.15s; }
  .btn-ghost:hover { border-color: #fff; background: rgba(255,255,255,0.08); }

  /* ── SHARED BANDS ── */
  .band { padding: 6.5rem 0; }
  .band-light { background: #eef1ec; }
  .center-band { padding: 7.5rem 0; }
  .eyebrow { font-size: 0.72rem; font-weight: 800; letter-spacing: 0.22em; text-transform: uppercase; color: #ff5c2a; margin-bottom: 1rem; }
  .eyebrow.green { color: #16a34a; }
  h2 { font-family: "Bebas Neue", "Manrope", sans-serif; font-weight: 400; font-size: clamp(2.2rem, 5vw, 3.8rem); line-height: 1.02; letter-spacing: 0.015em; text-transform: uppercase; color: #0b0f14; margin-bottom: 1.1rem; }
  .band-sub { max-width: 560px; margin: 0 auto 3rem; color: #4b5563; font-size: 0.98rem; line-height: 1.8; }
  .band-sub.wide { max-width: 720px; margin-bottom: 0; }
  .center-band .band-sub { margin-bottom: 2.5rem; }

  /* ── BUTTONS ── */
  .btn-solid { font-family: "Bebas Neue", "Manrope", sans-serif; display: inline-block; text-decoration: none; background: #ff5c2a; color: #fff; padding: 0.95rem 2.2rem; border-radius: 4px; font-size: 1.1rem; font-weight: 400; letter-spacing: 0.08em; text-transform: uppercase; transition: background 0.15s, transform 0.15s; }
  .btn-solid:hover { background: #e04a1f; transform: translateY(-2px); }
  .btn-green { background: #16a34a; }
  .btn-green:hover { background: #15803d; }
  .btn-big { padding: 1.15rem 2.8rem; font-size: 0.9rem; }

  /* ── CARDS ── */
  .cards { display: grid; grid-template-columns: repeat(4, 1fr); gap: 2.25rem; margin-bottom: 3rem; text-align: center; }
  .card { opacity: 0; transform: translateY(18px); transition: opacity 0.6s ease, transform 0.6s ease; }
  .vis .card { opacity: 1; transform: none; }
  .card-ico { display: inline-flex; align-items: center; justify-content: center; width: 64px; height: 64px; border: 2px solid #0b0f14; border-radius: 50%; font-size: 1.5rem; color: #ff5c2a; margin-bottom: 1.1rem; }
  .card h3 { font-family: "Bebas Neue", "Manrope", sans-serif; font-size: 1.2rem; font-weight: 400; letter-spacing: 0.06em; text-transform: uppercase; color: #0b0f14; margin-bottom: 0.55rem; }
  .card p { font-size: 0.85rem; color: #4b5563; line-height: 1.7; }

  /* ── SPLIT BANDS ── */
  .split { display: grid; grid-template-columns: 1fr 1fr; gap: 4.5rem; align-items: center; opacity: 0; transform: translateY(24px); transition: opacity 0.7s ease, transform 0.7s ease; }
  .split.vis { opacity: 1; transform: none; }
  .split-txt h2 { text-align: left; }
  .split-txt > p { color: #4b5563; font-size: 0.95rem; line-height: 1.85; margin-bottom: 1.5rem; }
  .split-img { position: relative; }
  .split-img > img:first-child { width: 100%; height: 420px; object-fit: cover; display: block; }
  .split-img-sm { position: absolute; bottom: -1.5rem; right: -1rem; width: 44%; height: 180px; object-fit: cover; border: 5px solid #fff; box-shadow: 0 10px 36px rgba(0,0,0,0.16); }
  .band-light .split-img-sm { border-color: #eef1ec; }
  .list { list-style: none; margin-bottom: 1.75rem; }
  .list li { padding: 0.5rem 0 0.5rem 1.6rem; position: relative; color: #374151; font-size: 0.92rem; border-bottom: 1px solid #e8eae7; }
  .list li::before { content: "→"; position: absolute; left: 0; color: #16a34a; font-weight: 700; font-size: 0.8rem; }
  .fine { color: #9ca3af; font-size: 0.72rem; margin-top: 1.1rem; }

  /* ── TELEMETRY TICKER ── */
  .ticker { background: #0a1f1a; border-top: 1px solid rgba(123,227,164,0.15); padding: 0.7rem 0; overflow: hidden; }
  .ticker-track { overflow: hidden; }
  .ticker-items { display: flex; align-items: center; gap: 1.6rem; width: max-content; animation: tickerScroll 28s linear infinite; font-family: "IBM Plex Mono", monospace; font-size: 0.78rem; white-space: nowrap; }
  .tk-k { color: rgba(123,227,164,0.7); font-weight: 500; }
  .tk-v { color: #eef6ef; margin-right: 0.8rem; }
  .tk-tag { color: rgba(238,246,239,0.35); letter-spacing: 0.14em; margin-right: 0.8rem; }
  @keyframes tickerScroll { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }

  /* ── NITROGEN LOOP ── */
  .loop { display: flex; flex-wrap: wrap; justify-content: center; align-items: center; gap: 0.6rem 0.75rem; margin-top: 2.75rem; font-family: "IBM Plex Mono", monospace; }
  .loop-node { font-size: 0.78rem; font-weight: 500; letter-spacing: 0.1em; color: #0b0f14; border: 1.5px solid #0b0f14; padding: 0.45rem 0.9rem; border-radius: 100px; background: #fff; }
  .loop-node.alt { color: #4b5563; border-color: #c6cec4; background: transparent; }
  .loop-arrow { color: #1e9e4f; font-size: 0.95rem; }
  .loop-arrow.back { color: #ff5c2a; font-size: 1.15rem; }

  /* ── IMG LOG CAPTION ── */
  .img-log { position: absolute; left: 0; bottom: 0; right: 0; background: rgba(10,31,26,0.82); color: rgba(238,246,239,0.85); font-family: "IBM Plex Mono", monospace; font-size: 0.68rem; letter-spacing: 0.1em; padding: 0.55rem 0.9rem; }

  /* ── QUOTE ── */
  .quote { background: #0a1f1a; padding: 7rem 0; text-align: center; }
  .quote-line { font-family: "Fraunces", serif; font-style: italic; font-weight: 300; font-size: clamp(1.6rem, 3.6vw, 2.6rem); line-height: 1.35; color: #f9fafb; max-width: 860px; margin: 0 auto 1.75rem; }
  .quote-attr { color: rgba(255,255,255,0.45); font-size: 0.75rem; font-weight: 800; letter-spacing: 0.22em; text-transform: uppercase; }

  /* ── FOOTER ── */
  footer { background: #081713; padding: 3.5rem 0; }
  .foot { display: flex; flex-direction: column; align-items: center; gap: 1.5rem; text-align: center; }
  .foot-brand { font-size: 1.2rem; font-weight: 800; color: #fff; }
  .foot-brand span { color: #ff5c2a; }
  .foot-links { display: flex; gap: 2rem; flex-wrap: wrap; justify-content: center; }
  .foot-links a { color: rgba(255,255,255,0.55); text-decoration: none; font-size: 0.82rem; font-weight: 700; letter-spacing: 0.06em; text-transform: uppercase; transition: color 0.15s; }
  .foot-links a:hover { color: #ff5c2a; }
  .foot-note p { color: rgba(255,255,255,0.32); font-size: 0.76rem; margin-bottom: 0.25rem; }

  /* ── MOTION / A11Y ── */
  @media (prefers-reduced-motion: reduce) {
    :global(html) { scroll-behavior: auto; }
    .card, .split { opacity: 1 !important; transform: none !important; transition: none !important; }
    .hero-bg { animation: none; }
    .ticker-items { animation: none; }
  }
  a:focus-visible, button:focus-visible { outline: 2px solid #ff5c2a; outline-offset: 3px; }

  /* ── RESPONSIVE ── */
  @media (max-width: 900px) {
    .links { display: none; }
    .burger { display: flex; }
    .cards { grid-template-columns: 1fr 1fr; }
    .split { grid-template-columns: 1fr; gap: 2.5rem; }
    .split.rev .split-img { order: -1; }
    .split-img > img:first-child { height: 320px; }
    .split-img-sm { display: none; }
    .hero { padding: 9rem 0 5rem; }
  }
  @media (max-width: 520px) {
    .cards { grid-template-columns: 1fr; gap: 2.5rem; }
    .btn-nav { display: none; }
  }
</style>