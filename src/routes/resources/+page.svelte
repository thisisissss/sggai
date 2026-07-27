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
  let visible = {};
  let openFaq = null;

  function toggleFaq(i, question) {
    const wasOpen = openFaq === i;
    openFaq = wasOpen ? null : i;
    if (!wasOpen) track("faq_open", { question });
  }

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
      nav: { home: "Main site", install: "Installations", contact: "Contact Us" },
      head: {
        tag: "Resources",
        h2_1: "Everything we know,",
        h2_2: "written down.",
        sub: "Our full system presentation, straight answers to the questions we get asked most, and the sensor vocabulary you will see on every monitoring dashboard we install.",
      },
      dl: {
        tag: "Downloads",
        h2_1: "Take the whole",
        h2_2: "system with you.",
        sub: "The Smart Polyponics presentation covers the closed loop, the sensor stack, the species program, and how an installation is scoped for a site. Same document in both languages.",
        items: [
          { title: "Smart Polyponics — Presentation", meta: "PDF · English", body: "The complete overview: how the loop works, what we install, what it monitors, and what a build involves.", file: "/Smart_Polyponics_EN.pdf", btn: "Open PDF" },
          { title: "Smart Polyponics — เอกสารนำเสนอ", meta: "PDF · ภาษาไทย", body: "The same presentation in Thai, for sharing with partners, staff, or licensing authorities.", file: "/Smart_Polyponics_TH.pdf", btn: "Open PDF" },
        ],
      },
      faq: {
        tag: "Questions",
        h2_1: "Asked before",
        h2_2: "every build.",
        items: [
          {
            q: "How much water does an aquaponic system actually use?",
            a: "The loop is closed — water circulates between the fish tanks and the grow beds instead of draining into soil. Nothing is flushed and nothing is discarded, so the only real loss is evaporation, which you top up. Compared with irrigating the same crop in soil, consumption is a fraction of it.",
          },
          {
            q: "Do I need to buy fertilizer?",
            a: "No. Fish excrete ammonia, nitrifying bacteria in the biofilter convert it to nitrate, and plant roots take it up directly from the circulating water. That is the nitrogen cycle a fertilizer schedule tries to imitate — it runs continuously, at zero marginal cost, with no salt build-up and no nutrient lockout.",
          },
          {
            q: "What does the sensor network actually measure?",
            a: "pH, electrical conductivity, dissolved oxygen, and oxidation-reduction potential across the tanks and beds, plus temperature. Readings are logged around the clock, and thresholds fire alerts before fish or plants are affected rather than after.",
          },
          {
            q: "I am not ready for a full build. What are my options?",
            a: "Start with the demo system — a compact working setup with the same closed-loop biology and the same monitoring, installed on your land so you can watch it run through a full growth cycle. It upgrades into a full installation whenever you decide to scale.",
          },
          {
            q: "How long does an installation take?",
            a: "It depends on scale, site access, and water source, so we scope it after seeing the land. Tell us the area, your budget, and what you want to harvest, and we come back with a layout, a species plan, and a timeline.",
          },
          {
            q: "Can I visit before committing to anything?",
            a: "Yes — our farm in Chiang Rai is operational and open to visits. You can see the tanks, the grow beds, the sensor points, and the current harvest, and walk through what the same system would look like on your site.",
          },
          {
            q: "Does this work for licensed cannabis cultivation?",
            a: "It does, outdoors. Sunlight removes the largest line item on an indoor grow — electricity — and the biofilter removes the fertilizer bill. Our outdoor aquaponic beds have carried plants to three and four metres under natural sun, and the same water raises market fish alongside the crop.",
          },
        ],
      },
      gl: {
        tag: "Glossary",
        h2_1: "The four readings",
        h2_2: "that run a farm.",
        sub: "These are the values on the dashboard of every system we install. Knowing what they mean is most of knowing whether a farm is healthy.",
        items: [
          { k: "pH", unit: "—", name: "Acidity", body: "How acidic or alkaline the water is. Fish, bacteria, and plants each prefer a slightly different range, so the working target is a compromise around neutral. Drift is the earliest warning that something in the loop has changed." },
          { k: "EC", unit: "mS/cm", name: "Conductivity", body: "How much dissolved mineral content the water carries — a direct proxy for how much food is available to the roots. Rising EC with flat growth usually means uptake has stalled." },
          { k: "DO", unit: "mg/L", name: "Dissolved oxygen", body: "Oxygen available in the water. Fish need it, and so do the nitrifying bacteria doing the conversion work. This is the reading that turns a problem into a loss fastest, which is why it is alarmed first." },
          { k: "ORP", unit: "mV", name: "Redox potential", body: "How oxidising or reducing the water is overall — a single number for water quality and biological load. Useful for spotting a decline before any individual reading looks wrong." },
        ],
      },
      cta: {
        h2: "Still have a question?",
        p: "Send it on Line. We answer with specifics about your site, not a brochure — usually within the day.",
        btn: "Ask us on Line",
      },
      footer: {
        rights: "© 2026 Sustainable Green Gold AI. All rights reserved.",
        location: "207 Moo 4, Tambon Nang Lae, Chiang Rai, Thailand",
        email: "contact@sustainablegreengold.com",
      },
    },
    th: {
      nav: { home: "เว็บไซต์หลัก", install: "การติดตั้งระบบ", contact: "ติดต่อเรา" },
      head: {
        tag: "แหล่งข้อมูล",
        h2_1: "ทุกอย่างที่เรารู้",
        h2_2: "รวบรวมไว้ที่นี่",
        sub: "เอกสารนำเสนอระบบฉบับเต็ม คำตอบตรงประเด็นสำหรับคำถามที่เราได้รับบ่อยที่สุด และคำศัพท์เซ็นเซอร์ที่คุณจะเห็นบนแดชบอร์ดของทุกระบบที่เราติดตั้ง",
      },
      dl: {
        tag: "ดาวน์โหลด",
        h2_1: "นำระบบทั้งหมด",
        h2_2: "ไปอ่านต่อได้",
        sub: "เอกสาร Smart Polyponics ครอบคลุมวงจรปิด ชุดเซ็นเซอร์ โปรแกรมสายพันธุ์ และวิธีที่เราประเมินการติดตั้งสำหรับแต่ละพื้นที่ เอกสารเดียวกันมีทั้งสองภาษา",
        items: [
          { title: "Smart Polyponics — เอกสารนำเสนอ", meta: "PDF · ภาษาไทย", body: "ภาพรวมฉบับเต็ม: วงจรทำงานอย่างไร เราติดตั้งอะไร ระบบตรวจวัดอะไร และการสร้างระบบมีขั้นตอนแบบไหน", file: "/Smart_Polyponics_TH.pdf", btn: "เปิดไฟล์ PDF" },
          { title: "Smart Polyponics — Presentation", meta: "PDF · English", body: "เอกสารเดียวกันฉบับภาษาอังกฤษ สำหรับส่งต่อให้พาร์ทเนอร์หรือผู้ร่วมลงทุนต่างชาติ", file: "/Smart_Polyponics_EN.pdf", btn: "เปิดไฟล์ PDF" },
        ],
      },
      faq: {
        tag: "คำถามที่พบบ่อย",
        h2_1: "คำถามก่อนเริ่ม",
        h2_2: "ทุกโครงการ",
        items: [
          {
            q: "ระบบอควาโพนิกส์ใช้น้ำมากแค่ไหน?",
            a: "วงจรเป็นระบบปิด — น้ำหมุนเวียนระหว่างถังปลาและแปลงปลูก ไม่ได้ซึมลงดินหรือปล่อยทิ้ง ไม่มีการถ่ายน้ำทิ้ง การสูญเสียจริงมีเพียงการระเหยที่เราเติมกลับ เทียบกับการรดน้ำพืชชนิดเดียวกันในดิน ปริมาณที่ใช้เป็นเพียงเศษเสี้ยว",
          },
          {
            q: "ต้องซื้อปุ๋ยหรือไม่?",
            a: "ไม่ต้อง ปลาขับแอมโมเนีย แบคทีเรียไนตริฟายอิงในไบโอฟิลเตอร์เปลี่ยนเป็นไนเตรต และรากพืชดูดซึมโดยตรงจากน้ำที่หมุนเวียน นั่นคือวัฏจักรไนโตรเจนเดียวกับที่ตารางให้ปุ๋ยพยายามเลียนแบบ — แต่ทำงานต่อเนื่องโดยไม่มีต้นทุนเพิ่ม ไม่มีเกลือสะสม และไม่มีภาวะธาตุอาหารถูกล็อก",
          },
          {
            q: "เครือข่ายเซ็นเซอร์วัดอะไรบ้าง?",
            a: "pH ค่าการนำไฟฟ้า (EC) ออกซิเจนละลาย (DO) และศักย์ออกซิเดชัน-รีดักชัน (ORP) ทั่วถังและแปลงปลูก รวมถึงอุณหภูมิ ค่าทั้งหมดถูกบันทึกตลอด 24 ชั่วโมง และเกณฑ์แจ้งเตือนจะทำงานก่อนที่ปลาหรือพืชจะได้รับผลกระทบ ไม่ใช่หลังจากนั้น",
          },
          {
            q: "ยังไม่พร้อมติดตั้งเต็มรูปแบบ มีทางเลือกอะไร?",
            a: "เริ่มจากระบบสาธิต — ระบบขนาดกะทัดรัดที่ทำงานได้จริง ใช้ชีววิทยาวงจรปิดและระบบตรวจวัดเดียวกัน ติดตั้งในพื้นที่ของคุณเพื่อดูการทำงานครบหนึ่งรอบการเติบโต และอัปเกรดเป็นการติดตั้งเต็มรูปแบบได้เมื่อคุณพร้อมขยาย",
          },
          {
            q: "การติดตั้งใช้เวลานานเท่าไร?",
            a: "ขึ้นกับขนาด การเข้าถึงพื้นที่ และแหล่งน้ำ เราจึงประเมินหลังจากดูพื้นที่จริง บอกเราเรื่องขนาดพื้นที่ งบประมาณ และสิ่งที่คุณอยากเก็บเกี่ยว แล้วเราจะกลับมาพร้อมผังระบบ แผนสายพันธุ์ และกรอบเวลา",
          },
          {
            q: "เข้าเยี่ยมชมก่อนตัดสินใจได้ไหม?",
            a: "ได้ — ฟาร์มของเราที่เชียงรายเปิดดำเนินการและยินดีให้เข้าชม คุณจะเห็นถังปลา แปลงปลูก จุดติดตั้งเซ็นเซอร์ และผลผลิตปัจจุบัน พร้อมพูดคุยว่าระบบเดียวกันจะเป็นอย่างไรในพื้นที่ของคุณ",
          },
          {
            q: "ใช้กับการปลูกกัญชาที่มีใบอนุญาตได้หรือไม่?",
            a: "ได้ สำหรับการปลูกกลางแจ้ง แสงแดดตัดค่าใช้จ่ายก้อนใหญ่ที่สุดของการปลูกในร่มออกไป คือค่าไฟ และไบโอฟิลเตอร์ตัดค่าปุ๋ยออก แปลงอควาโพนิกส์กลางแจ้งของเราปลูกต้นสูงถึงสามถึงสี่เมตรใต้แสงแดดธรรมชาติ และน้ำเดียวกันยังเลี้ยงปลาเชิงพาณิชย์ควบคู่ไปกับพืชหลัก",
          },
        ],
      },
      gl: {
        tag: "คำศัพท์",
        h2_1: "สี่ค่าที่ใช้",
        h2_2: "ดูแลฟาร์ม",
        sub: "ค่าเหล่านี้คือสิ่งที่ปรากฏบนแดชบอร์ดของทุกระบบที่เราติดตั้ง การเข้าใจว่าแต่ละค่าหมายถึงอะไร คือเกือบทั้งหมดของการรู้ว่าฟาร์มยังแข็งแรงอยู่หรือไม่",
        items: [
          { k: "pH", unit: "—", name: "ความเป็นกรด-ด่าง", body: "ระดับความเป็นกรดหรือด่างของน้ำ ปลา แบคทีเรีย และพืชต้องการช่วงที่ต่างกันเล็กน้อย ค่าที่ใช้จริงจึงเป็นจุดสมดุลใกล้กลาง การเบี่ยงเบนของค่านี้คือสัญญาณเตือนแรกสุดว่ามีบางอย่างในวงจรเปลี่ยนไป" },
          { k: "EC", unit: "mS/cm", name: "ค่าการนำไฟฟ้า", body: "ปริมาณแร่ธาตุที่ละลายอยู่ในน้ำ — ตัวชี้วัดโดยตรงว่ามีอาหารพร้อมให้รากพืชมากเท่าไร หาก EC สูงขึ้นแต่พืชไม่โต มักหมายถึงการดูดซึมหยุดชะงัก" },
          { k: "DO", unit: "mg/L", name: "ออกซิเจนละลาย", body: "ออกซิเจนที่มีอยู่ในน้ำ ทั้งปลาและแบคทีเรียไนตริฟายอิงต้องใช้ ค่านี้เปลี่ยนปัญหาให้เป็นความเสียหายได้เร็วที่สุด จึงเป็นค่าที่ตั้งแจ้งเตือนก่อนใคร" },
          { k: "ORP", unit: "mV", name: "ศักย์รีดอกซ์", body: "ระดับการเกิดออกซิเดชันหรือรีดักชันโดยรวมของน้ำ — ตัวเลขเดียวที่บอกคุณภาพน้ำและภาระทางชีวภาพ มีประโยชน์ในการเห็นแนวโน้มถดถอยก่อนที่ค่าอื่นจะดูผิดปกติ" },
        ],
      },
      cta: {
        h2: "ยังมีคำถามอยู่ไหม?",
        p: "ส่งมาทาง Line เราตอบด้วยรายละเอียดที่ตรงกับพื้นที่ของคุณ ไม่ใช่โบรชัวร์ — โดยปกติภายในวันเดียวกัน",
        btn: "ถามเราทาง Line",
      },
      footer: {
        rights: "© 2026 Sustainable Green Gold AI สงวนลิขสิทธิ์",
        location: "207 หมู่ 4 ตำบลนางแล อำเภอเมืองเชียงราย จังหวัดเชียงราย ประเทศไทย",
        email: "contact@sustainablegreengold.com",
      },
    },
  };
</script>

<svelte:head>
  <title>Resources — Sustainable Green Gold AI</title>
  <meta name="description" content="Aquaponics system presentation, answers to the questions we are asked before every build, and the sensor readings behind a monitored farm." />
  <link href="https://fonts.googleapis.com/css2?family=Manrope:wght@400;500;600;700;800&family=Fraunces:ital,wght@1,300;1,600&family=IBM+Plex+Mono:wght@400;500&display=swap" rel="stylesheet" />
</svelte:head>

<!-- NAV -->
<header class:scrolled>
  <nav class="nav-inner">
    <a href="/" class="brand">SGG<span class="brand-accent">·AI</span></a>
    <ul class="links">
      <li><a href="/">{t.nav.home}</a></li>
      <li><a href="/install">{t.nav.install}</a></li>
    </ul>
    <div class="nav-right">
      <button class="lang-toggle" on:click={toggleLang}>{lang === "en" ? "🇹🇭 ภาษาไทย" : "🇬🇧 English"}</button>
      <a href={LINE_URL} target="_blank" rel="noopener" class="btn-nav" on:click={() => track("line_click", { location: "resources_nav" })}>{t.nav.contact}</a>
    </div>
  </nav>
</header>

<!-- PAGE HEAD -->
<section class="page-head">
  <div class="container">
    <div class="stag light">{t.head.tag}</div>
    <h1>{t.head.h2_1}<br /><em>{t.head.h2_2}</em></h1>
    <p class="lead">{t.head.sub}</p>
  </div>
</section>

<!-- DOWNLOADS -->
<section id="downloads" class="section bg-light" data-reveal="dl">
  <div class="container">
    <div class="sec-hdr" class:vis={visible["dl"]}>
      <div class="stag">{t.dl.tag}</div>
      <h2>{t.dl.h2_1} <em>{t.dl.h2_2}</em></h2>
      <p class="sub">{t.dl.sub}</p>
    </div>
    <div class="dl-grid" class:vis={visible["dl"]}>
      {#each t.dl.items as d, i}
        <a
          class="dl-card"
          href={d.file}
          target="_blank"
          rel="noopener"
          style="transition-delay:{i * 0.08}s"
          on:click={() => track("resource_download", { file: d.file, ui_lang: lang })}
        >
          <span class="dl-meta">{d.meta}</span>
          <h3>{d.title}</h3>
          <p>{d.body}</p>
          <span class="dl-btn">
            {d.btn}
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6" /><polyline points="15 3 21 3 21 9" /><line x1="10" y1="14" x2="21" y2="3" /></svg>
          </span>
        </a>
      {/each}
    </div>
  </div>
</section>

<!-- FAQ -->
<section id="faq" class="section bg-white" data-reveal="faq">
  <div class="container">
    <div class="sec-hdr" class:vis={visible["faq"]}>
      <div class="stag">{t.faq.tag}</div>
      <h2>{t.faq.h2_1} <em>{t.faq.h2_2}</em></h2>
    </div>
    <div class="faq-list" class:vis={visible["faq"]}>
      {#each t.faq.items as f, i}
        <div class="faq-item" class:open={openFaq === i}>
          <button class="faq-q" aria-expanded={openFaq === i} on:click={() => toggleFaq(i, f.q)}>
            <span class="faq-n">{String(i + 1).padStart(2, "0")}</span>
            <span class="faq-txt">{f.q}</span>
            <span class="faq-ico" aria-hidden="true">{openFaq === i ? "−" : "+"}</span>
          </button>
          {#if openFaq === i}
            <div class="faq-a"><p>{f.a}</p></div>
          {/if}
        </div>
      {/each}
    </div>
  </div>
</section>

<!-- GLOSSARY -->
<section id="glossary" class="section bg-navy" data-reveal="gl">
  <div class="container">
    <div class="sec-hdr" class:vis={visible["gl"]}>
      <div class="stag light">{t.gl.tag}</div>
      <h2 class="light">{t.gl.h2_1} <em>{t.gl.h2_2}</em></h2>
      <p class="sub light">{t.gl.sub}</p>
    </div>
    <div class="gl-grid" class:vis={visible["gl"]}>
      {#each t.gl.items as g, i}
        <div class="gl-card" style="transition-delay:{i * 0.07}s">
          <div class="gl-head">
            <span class="gl-k">{g.k}</span>
            <span class="gl-unit">{g.unit}</span>
          </div>
          <h4>{g.name}</h4>
          <p>{g.body}</p>
        </div>
      {/each}
    </div>
  </div>
</section>

<!-- CTA -->
<section class="final-cta">
  <div class="container">
    <h2>{t.cta.h2}</h2>
    <p>{t.cta.p}</p>
    <a href={LINE_URL} target="_blank" rel="noopener" class="btn-primary btn-lg" on:click={() => track("line_click", { location: "resources_cta" })}>{t.cta.btn}</a>
  </div>
</section>

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
  :global(body) { font-family: "Manrope", sans-serif; color: #111827; background: #fff; -webkit-font-smoothing: antialiased; line-height: 1.6; }

  .container { max-width: 1080px; margin: 0 auto; padding: 0 1.5rem; }

  /* ── NAV ── */
  header { position: fixed; top: 0; left: 0; right: 0; z-index: 200; background: transparent; border-bottom: 1px solid transparent; transition: background 0.35s ease, border-color 0.35s ease, box-shadow 0.35s ease; }
  header.scrolled { background: rgba(255,255,255,0.97); border-color: #e5e7eb; box-shadow: 0 2px 20px rgba(0,0,0,0.07); }
  .nav-inner { max-width: 1080px; margin: 0 auto; padding: 0 1.5rem; height: 68px; display: flex; align-items: center; justify-content: space-between; gap: 1rem; }
  .brand { font-size: 1.3rem; font-weight: 800; text-decoration: none; color: #fff; letter-spacing: -0.01em; transition: color 0.35s; }
  header.scrolled .brand { color: #050d1e; }
  .brand-accent { color: rgba(255,255,255,0.7); transition: color 0.35s; }
  header.scrolled .brand-accent { color: #ff5c2a; }
  .links { display: flex; list-style: none; gap: 2rem; }
  .links a { color: rgba(255,255,255,0.85); text-decoration: none; font-size: 0.9rem; font-weight: 500; transition: color 0.2s; }
  header.scrolled .links a { color: #374151; }
  .links a:hover { color: #fff; }
  header.scrolled .links a:hover { color: #ff5c2a; }
  .nav-right { display: flex; align-items: center; gap: 0.75rem; }
  .lang-toggle { background: rgba(255,255,255,0.15); color: #fff; border: 1.5px solid rgba(255,255,255,0.4); backdrop-filter: blur(8px); padding: 0.45rem 0.9rem; border-radius: 100px; font-size: 0.78rem; font-weight: 600; cursor: pointer; transition: background 0.2s; }
  header.scrolled .lang-toggle { background: #f3f4f6; color: #374151; border-color: #e5e7eb; }
  .lang-toggle:hover { background: rgba(255,255,255,0.25); }
  .btn-nav { background: rgba(255,255,255,0.2); color: #fff; border: 1.5px solid rgba(255,255,255,0.5); backdrop-filter: blur(8px); padding: 0.55rem 1.2rem; border-radius: 100px; font-size: 0.85rem; font-weight: 700; text-decoration: none; transition: background 0.2s, border-color 0.2s, color 0.35s; }
  header.scrolled .btn-nav { background: #ff5c2a; border-color: #ff5c2a; color: #fff; }
  .btn-nav:hover { background: rgba(255,255,255,0.35); }

  /* ── PAGE HEAD ── */
  .page-head { background: #050d1e; padding: 11rem 0 6rem; }
  .page-head h1 { font-size: clamp(2.2rem, 4.4vw, 3.4rem); font-weight: 800; letter-spacing: -0.028em; line-height: 1.1; color: #f9fafb; margin-bottom: 1.1rem; }
  .page-head h1 em { font-family: "Fraunces", serif; font-style: italic; font-weight: 300; color: #ff5c2a; }
  .lead { max-width: 620px; color: rgba(255,255,255,0.6); font-size: 1.02rem; line-height: 1.8; }

  /* ── SHARED ── */
  .section { padding: 6rem 0; }
  .bg-white { background: #fff; }
  .bg-light { background: #f9fafb; }
  .bg-navy { background: #050d1e; }
  .stag { display: inline-block; font-size: 0.7rem; font-weight: 700; letter-spacing: 0.15em; text-transform: uppercase; color: #ff5c2a; margin-bottom: 0.85rem; }
  .stag.light { color: rgba(255,130,80,0.95); }
  h2 { font-size: clamp(1.9rem, 3.4vw, 2.8rem); font-weight: 800; letter-spacing: -0.025em; color: #050d1e; line-height: 1.12; margin-bottom: 1rem; }
  h2.light { color: #f9fafb; }
  h2 em { font-family: "Fraunces", serif; font-style: italic; font-weight: 300; color: #ff5c2a; }
  .sub { color: #6b7280; font-size: 1rem; line-height: 1.75; max-width: 640px; }
  .sub.light { color: rgba(255,255,255,0.55); }
  .sec-hdr { margin-bottom: 3rem; opacity: 0; transform: translateY(24px); transition: opacity 0.7s ease, transform 0.7s ease; }
  .sec-hdr.vis { opacity: 1; transform: none; }

  /* ── BUTTONS ── */
  .btn-primary { display: inline-block; text-decoration: none; background: #ff5c2a; color: #fff; padding: 0.8rem 1.75rem; border-radius: 8px; font-size: 0.9rem; font-weight: 700; transition: background 0.2s, transform 0.15s, box-shadow 0.2s; box-shadow: 0 4px 16px rgba(255,92,42,0.3); }
  .btn-primary:hover { background: #e04a1f; transform: translateY(-2px); box-shadow: 0 8px 24px rgba(255,92,42,0.35); }
  .btn-primary.btn-lg { padding: 1rem 2.25rem; font-size: 1rem; }

  /* ── DOWNLOADS ── */
  .dl-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 1.5rem; opacity: 0; transform: translateY(24px); transition: opacity 0.8s ease, transform 0.8s ease; }
  .dl-grid.vis { opacity: 1; transform: none; }
  .dl-card { display: block; text-decoration: none; background: #fff; border: 1px solid #e5e7eb; border-radius: 12px; padding: 2rem 1.9rem; transition: border-color 0.2s, box-shadow 0.2s, transform 0.15s; }
  .dl-card:hover { border-color: #ff5c2a; box-shadow: 0 12px 40px rgba(5,13,30,0.09); transform: translateY(-3px); }
  .dl-meta { display: block; font-family: "IBM Plex Mono", monospace; font-size: 0.7rem; letter-spacing: 0.12em; text-transform: uppercase; color: #9ca3af; margin-bottom: 0.9rem; }
  .dl-card h3 { font-size: 1.12rem; font-weight: 800; color: #050d1e; letter-spacing: -0.01em; margin-bottom: 0.6rem; }
  .dl-card p { font-size: 0.9rem; color: #4b5563; line-height: 1.75; margin-bottom: 1.4rem; }
  .dl-btn { display: inline-flex; align-items: center; gap: 0.5rem; color: #ff5c2a; font-size: 0.85rem; font-weight: 700; }
  .dl-btn svg { flex-shrink: 0; }

  /* ── FAQ ── */
  .faq-list { border-top: 1px solid #e5e7eb; opacity: 0; transform: translateY(20px); transition: opacity 0.8s ease, transform 0.8s ease; }
  .faq-list.vis { opacity: 1; transform: none; }
  .faq-item { border-bottom: 1px solid #e5e7eb; }
  .faq-q { width: 100%; display: flex; align-items: baseline; gap: 1.1rem; background: none; border: none; cursor: pointer; text-align: left; padding: 1.35rem 0; font-family: inherit; transition: color 0.15s; }
  .faq-n { font-family: "IBM Plex Mono", monospace; font-size: 0.75rem; color: #ff5c2a; flex-shrink: 0; padding-top: 0.15rem; }
  .faq-txt { flex: 1; font-size: 1.02rem; font-weight: 700; color: #050d1e; letter-spacing: -0.01em; line-height: 1.45; }
  .faq-q:hover .faq-txt { color: #ff5c2a; }
  .faq-ico { font-size: 1.35rem; font-weight: 400; color: #9ca3af; line-height: 1; flex-shrink: 0; }
  .faq-item.open .faq-ico { color: #ff5c2a; }
  .faq-a { padding: 0 2.4rem 1.6rem 2.5rem; animation: faqIn 0.3s ease; }
  .faq-a p { color: #4b5563; font-size: 0.94rem; line-height: 1.85; max-width: 720px; }
  @keyframes faqIn { from { opacity: 0; transform: translateY(-6px); } to { opacity: 1; transform: none; } }

  /* ── GLOSSARY ── */
  .gl-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 1px; background: rgba(255,255,255,0.07); border-radius: 12px; overflow: hidden; opacity: 0; transform: translateY(24px); transition: opacity 0.8s ease, transform 0.8s ease; }
  .gl-grid.vis { opacity: 1; transform: none; }
  .gl-card { background: rgba(255,255,255,0.04); padding: 2rem 1.75rem; transition: background 0.2s; }
  .gl-card:hover { background: rgba(255,255,255,0.08); }
  .gl-head { display: flex; align-items: baseline; gap: 0.5rem; margin-bottom: 1rem; }
  .gl-k { font-family: "IBM Plex Mono", monospace; font-size: 1.35rem; font-weight: 500; color: #ff5c2a; letter-spacing: 0.02em; }
  .gl-unit { font-family: "IBM Plex Mono", monospace; font-size: 0.72rem; color: rgba(255,255,255,0.35); }
  .gl-card h4 { color: #f9fafb; font-size: 0.95rem; font-weight: 700; margin-bottom: 0.55rem; }
  .gl-card p { color: rgba(255,255,255,0.5); font-size: 0.85rem; line-height: 1.75; }

  /* ── CTA ── */
  .final-cta { padding: 6rem 0; text-align: center; background: #fff; }
  .final-cta h2 { font-size: 2.1rem; margin-bottom: 1rem; }
  .final-cta p { color: #6b7280; max-width: 500px; margin: 0 auto 2.5rem; }

  /* ── FOOTER ── */
  footer { background: #050d1e; padding: 3.5rem 0 3rem; }
  .foot { display: flex; flex-direction: column; align-items: center; gap: 1.4rem; text-align: center; }
  .foot-brand { font-size: 1.2rem; font-weight: 800; color: #fff; }
  .foot-brand span { color: #ff5c2a; }
  .foot-links { display: flex; gap: 2rem; flex-wrap: wrap; justify-content: center; }
  .foot-links a { color: rgba(255,255,255,0.5); text-decoration: none; font-size: 0.85rem; transition: color 0.2s; }
  .foot-links a:hover { color: #ff5c2a; }
  .foot-note p { color: rgba(255,255,255,0.33); font-size: 0.78rem; margin-bottom: 0.25rem; }

  /* ── A11Y / MOTION ── */
  a:focus-visible, button:focus-visible { outline: 2px solid #ff5c2a; outline-offset: 3px; }
  @media (prefers-reduced-motion: reduce) {
    :global(html) { scroll-behavior: auto; }
    .sec-hdr, .dl-grid, .gl-grid, .faq-list { opacity: 1 !important; transform: none !important; transition: none !important; }
    .faq-a { animation: none; }
  }

  /* ── RESPONSIVE ── */
  @media (max-width: 900px) {
    .gl-grid { grid-template-columns: 1fr 1fr; }
  }
  @media (max-width: 768px) {
    .links { display: none; }
    .page-head { padding: 9rem 0 4.5rem; }
    .dl-grid { grid-template-columns: 1fr; }
    .section { padding: 4.5rem 0; }
  }
  @media (max-width: 480px) {
    .gl-grid { grid-template-columns: 1fr; }
    .faq-a { padding-left: 0; padding-right: 0; }
    .btn-nav { display: none; }
  }
</style>