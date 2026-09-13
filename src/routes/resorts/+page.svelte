<script>
  // src/routes/resorts/+page.svelte
  // Self-contained bilingual proposal page. Replace image URLs with your R2 assets.
  import { onMount } from 'svelte';

  let lang = 'en';
  onMount(() => {
    const saved = localStorage.getItem('sgg-lang');
    if (saved === 'th' || saved === 'en') lang = saved;
    else if (navigator.language?.startsWith('th')) lang = 'th';
  });
  function setLang(l) { lang = l; localStorage.setItem('sgg-lang', l); }
  $: if (typeof document !== 'undefined') document.documentElement.lang = lang;

  const IMG = {
    hero: 'https://media.sustainablegreengold.com/resorts/hero.jpg',
    beds: 'https://media.sustainablegreengold.com/resorts/beds.jpg',
    fish: 'https://media.sustainablegreengold.com/resorts/fish.jpg',
    harvest: 'https://media.sustainablegreengold.com/resorts/harvest.jpg'
  };

  const t = {
    en: {
      title: 'Aquaponics for resorts',
      lede: 'A living farm on your property. Greens and herbs for the kitchen every morning, fish for the menu, and a garden your guests can walk through.',
      cta: 'Book a free site visit',
      loopHead: 'How it works',
      loopBody: 'Fish feed the plants. Plants clean the water. Nothing touches soil, nothing is sprayed, and the same water circulates for years.',
      loop: ['Fish', 'Bacteria', 'Plants'],
      loopNote: ['produce ammonia', 'convert it to nitrate', 'absorb it and clean the water'],
      whyHead: 'What your kitchen gets',
      why: [
        ['Harvest at 6 am, on the plate at 7', 'Lettuce, rocket, basil, coriander, pak choi, chilli, cherry tomato, and fruit trees such as fig and grape in media beds.'],
        ['A second product', 'Tilapia or catfish raised in the same system, ready for the menu in 6–8 months.'],
        ['No pesticides, almost no fertiliser', 'The fish supply the nutrients. Your only inputs are fish feed, seedlings and electricity.'],
        ['A story guests remember', 'Chefs pick with guests, kids feed the fish. It photographs well and it is true.']
      ],
      tiersHead: 'Two sizes',
      tiers: [
        {
          name: 'Kitchen garden',
          price: '฿180,000',
          size: '2 fish tanks, 4 grow beds, ~5 m²',
          yield: 'About 8–12 kg of greens and herbs per week',
          for: 'Boutique resorts and villas, 10–40 keys'
        },
        {
          name: 'Resort farm',
          price: '฿420,000',
          size: '4 fish tanks, 12 grow beds, ~15 m²',
          yield: 'About 25–35 kg per week plus 100+ fish per cycle',
          for: 'Resorts with 40+ keys or a signature restaurant'
        }
      ],
      included: 'Both include site survey, design, all materials, installation, four weeks of system cycling, staff training and a six-month warranty on pumps and plumbing.',
      addHead: 'Add-ons',
      addons: [
        ['Monitoring dashboard', 'pH, oxygen, temperature and water level on your phone, with alerts.', '฿35,000'],
        ['Quarterly care visit', 'Fish health, siphon and pump service, replanting plan.', '฿4,500 / visit'],
        ['Polycarbonate greenhouse', 'Instead of shade net. Rain and pest protection, longer plant life.', 'from ฿60,000']
      ],
      timeHead: 'From first call to first harvest',
      timeline: [
        ['Site visit', 'We check sun, water, power and where the produce needs to go.'],
        ['Design', 'One week. Layout drawing, plant list and final quote.'],
        ['Installation', 'One to two weeks on site with our team.'],
        ['Cycling', 'Four weeks while the bacteria establish. We visit twice.'],
        ['First harvest', 'Greens from week six. Fish from month six.']
      ],
      aboutHead: 'Who we are',
      about: 'Sustainable Green Gold is a Thai-registered agricultural company in Chiang Rai. We have run our own aquaponics farm for several years, growing fish, leafy greens, chilli, figs and grapes in the systems we now build for others. The founder is an engineer; the monitoring dashboard is our own.',
      finalHead: 'See it before you decide',
      final: 'Visit our farm in Chiang Rai, or send us a photo of your site and we will tell you what fits.',
      contact: 'Email',
      line: 'LINE',
      footer: 'Sustainable Green Gold Co., Ltd. · 207 Moo 4, Nang Lae, Mueang Chiang Rai, Chiang Rai 57100'
    },
    th: {
      title: 'ระบบอควาโปนิกส์สำหรับรีสอร์ท',
      lede: 'ฟาร์มมีชีวิตในพื้นที่ของคุณ ผักและสมุนไพรสดส่งห้องครัวทุกเช้า ปลาสำหรับเมนู และสวนที่แขกเดินชมได้',
      cta: 'นัดสำรวจพื้นที่ฟรี',
      loopHead: 'ระบบทำงานอย่างไร',
      loopBody: 'ปลาให้ปุ๋ยแก่พืช พืชทำน้ำให้สะอาด ไม่ใช้ดิน ไม่ฉีดพ่นสารเคมี และน้ำชุดเดิมหมุนเวียนใช้ได้หลายปี',
      loop: ['ปลา', 'แบคทีเรีย', 'พืช'],
      loopNote: ['ขับแอมโมเนีย', 'เปลี่ยนเป็นไนเตรต', 'ดูดซึมและทำน้ำให้สะอาด'],
      whyHead: 'ห้องครัวของคุณจะได้อะไร',
      why: [
        ['เก็บตอนหกโมงเช้า เสิร์ฟตอนเจ็ดโมง', 'ผักสลัด ร็อกเก็ต โหระพา ผักชี ผักกวางตุ้ง พริก มะเขือเทศเชอร์รี่ และไม้ผลอย่างมะเดื่อฝรั่งและองุ่นในแปลงวัสดุปลูก'],
        ['ผลผลิตที่สอง', 'ปลานิลหรือปลาดุกเลี้ยงในระบบเดียวกัน พร้อมขึ้นเมนูใน 6–8 เดือน'],
        ['ไม่ใช้ยาฆ่าแมลง แทบไม่ใช้ปุ๋ย', 'ปลาให้ธาตุอาหารเอง ต้นทุนที่เหลือคืออาหารปลา ต้นกล้า และค่าไฟ'],
        ['เรื่องราวที่แขกจดจำ', 'เชฟเก็บผักกับแขก เด็ก ๆ ให้อาหารปลา ถ่ายรูปสวยและเป็นเรื่องจริง']
      ],
      tiersHead: 'สองขนาด',
      tiers: [
        {
          name: 'สวนครัว',
          price: '180,000 บาท',
          size: 'ถังปลา 2 ถัง แปลงปลูก 4 แปลง ประมาณ 5 ตร.ม.',
          yield: 'ผักและสมุนไพรประมาณ 8–12 กก. ต่อสัปดาห์',
          for: 'บูติกรีสอร์ทและวิลล่า 10–40 ห้อง'
        },
        {
          name: 'ฟาร์มรีสอร์ท',
          price: '420,000 บาท',
          size: 'ถังปลา 4 ถัง แปลงปลูก 12 แปลง ประมาณ 15 ตร.ม.',
          yield: 'ประมาณ 25–35 กก. ต่อสัปดาห์ และปลากว่า 100 ตัวต่อรอบ',
          for: 'รีสอร์ท 40 ห้องขึ้นไป หรือมีร้านอาหารซิกเนเจอร์'
        }
      ],
      included: 'ทั้งสองแบบรวมการสำรวจพื้นที่ ออกแบบ วัสดุทั้งหมด ติดตั้ง บ่มระบบสี่สัปดาห์ อบรมพนักงาน และรับประกันปั๊มและระบบท่อหกเดือน',
      addHead: 'บริการเสริม',
      addons: [
        ['แดชบอร์ดตรวจสอบ', 'ค่า pH ออกซิเจน อุณหภูมิ และระดับน้ำบนมือถือ พร้อมแจ้งเตือน', '35,000 บาท'],
        ['เข้าดูแลรายไตรมาส', 'ตรวจสุขภาพปลา ซ่อมบำรุงกาลักน้ำและปั๊ม วางแผนปลูกรอบใหม่', '4,500 บาท / ครั้ง'],
        ['โรงเรือนโพลีคาร์บอเนต', 'แทนตาข่ายพรางแสง กันฝนและแมลง ยืดอายุพืช', 'เริ่ม 60,000 บาท']
      ],
      timeHead: 'จากการติดต่อครั้งแรกถึงการเก็บเกี่ยวครั้งแรก',
      timeline: [
        ['สำรวจพื้นที่', 'ดูแสงแดด แหล่งน้ำ ไฟฟ้า และตำแหน่งที่ต้องส่งผลผลิต'],
        ['ออกแบบ', 'หนึ่งสัปดาห์ แบบผัง รายการพืช และใบเสนอราคาสุดท้าย'],
        ['ติดตั้ง', 'หนึ่งถึงสองสัปดาห์หน้างานกับทีมของเรา'],
        ['บ่มระบบ', 'สี่สัปดาห์ให้แบคทีเรียตั้งตัว เราเข้าดูสองครั้ง'],
        ['เก็บเกี่ยวครั้งแรก', 'ผักตั้งแต่สัปดาห์ที่หก ปลาตั้งแต่เดือนที่หก']
      ],
      aboutHead: 'เราคือใคร',
      about: 'บริษัท ซัสเทนเนเบิ้ล กรีน โกลด์ จำกัด เป็นบริษัทเกษตรจดทะเบียนในประเทศไทย ตั้งอยู่ที่เชียงราย เราดำเนินฟาร์มอควาโปนิกส์ของตัวเองมาหลายปี เลี้ยงปลา ปลูกผักใบ พริก มะเดื่อฝรั่ง และองุ่น ในระบบแบบเดียวกับที่เราติดตั้งให้ลูกค้า ผู้ก่อตั้งเป็นวิศวกร แดชบอร์ดตรวจสอบพัฒนาขึ้นเอง',
      finalHead: 'มาดูของจริงก่อนตัดสินใจ',
      final: 'แวะชมฟาร์มของเราที่เชียงราย หรือส่งรูปพื้นที่ของคุณมา เราจะบอกได้ว่าแบบไหนเหมาะ',
      contact: 'อีเมล',
      line: 'LINE',
      footer: 'บริษัท ซัสเทนเนเบิ้ล กรีน โกลด์ จำกัด · 207 หมู่ 4 ต.นางแล อ.เมืองเชียงราย จ.เชียงราย 57100'
    }
  };

  $: s = t[lang];
  const EMAIL = 'contact@sustainablegreengold.com';
  const LINE_ID = '@carbonbasedlife'; // replace
</script>

<svelte:head>
  <title>{s.title} — Sustainable Green Gold</title>
  <meta name="description" content={s.lede} />
</svelte:head>

<main class="page" class:th={lang === 'th'}>
  <header class="top">
    <a class="brand" href="/">SGG</a>
    <div class="lang" role="group" aria-label="Language">
      <button class:on={lang === 'en'} on:click={() => setLang('en')}>EN</button>
      <button class:on={lang === 'th'} on:click={() => setLang('th')}>ไทย</button>
    </div>
  </header>

  <section class="hero">
    <div class="hero-text">
      <h1>{s.title}</h1>
      <p class="lede">{s.lede}</p>
      <a class="btn" href="mailto:{EMAIL}?subject={encodeURIComponent(s.title)}">{s.cta}</a>
    </div>
    <img class="hero-img" src={IMG.hero} alt="" loading="eager" />
  </section>

  <section class="loop">
    <div class="loop-text">
      <h2>{s.loopHead}</h2>
      <p>{s.loopBody}</p>
    </div>
    <svg class="loop-svg" viewBox="0 0 320 300" aria-hidden="true">
      <defs>
        <marker id="arr" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
          <path d="M0 0L10 5L0 10z" fill="currentColor" />
        </marker>
      </defs>
      <path d="M160 60 A105 105 0 0 1 251 218" fill="none" stroke="currentColor" stroke-width="2" marker-end="url(#arr)" />
      <path d="M232 240 A105 105 0 0 1 88 240" fill="none" stroke="currentColor" stroke-width="2" marker-end="url(#arr)" />
      <path d="M69 218 A105 105 0 0 1 160 60" fill="none" stroke="currentColor" stroke-width="2" marker-end="url(#arr)" />
      <g class="node" transform="translate(160,40)">
        <circle r="34" /><text y="5">{s.loop[0]}</text><text class="sub" y="52">{s.loopNote[0]}</text>
      </g>
      <g class="node" transform="translate(262,232)">
        <circle r="34" /><text y="5">{s.loop[1]}</text><text class="sub" y="52">{s.loopNote[1]}</text>
      </g>
      <g class="node" transform="translate(58,232)">
        <circle r="34" /><text y="5">{s.loop[2]}</text><text class="sub" y="52">{s.loopNote[2]}</text>
      </g>
    </svg>
  </section>

  <section class="why">
    <h2>{s.whyHead}</h2>
    <div class="why-grid">
      {#each s.why as [h, p]}
        <div class="why-item"><h3>{h}</h3><p>{p}</p></div>
      {/each}
    </div>
    <div class="strip">
      <img src={IMG.beds} alt="" loading="lazy" />
      <img src={IMG.fish} alt="" loading="lazy" />
      <img src={IMG.harvest} alt="" loading="lazy" />
    </div>
  </section>

  <section class="tiers">
    <h2>{s.tiersHead}</h2>
    <div class="tier-row">
      {#each s.tiers as tier}
        <article class="tier">
          <h3>{tier.name}</h3>
          <p class="price">{tier.price}</p>
          <dl>
            <dd>{tier.size}</dd>
            <dd>{tier.yield}</dd>
            <dd class="for">{tier.for}</dd>
          </dl>
        </article>
      {/each}
    </div>
    <p class="included">{s.included}</p>

    <h2 class="sub-h">{s.addHead}</h2>
    <table class="addons">
      <tbody>
        {#each s.addons as [n, d, p]}
          <tr><th scope="row">{n}</th><td>{d}</td><td class="num">{p}</td></tr>
        {/each}
      </tbody>
    </table>
  </section>

  <section class="time">
    <h2>{s.timeHead}</h2>
    <ol>
      {#each s.timeline as [h, p]}
        <li><strong>{h}</strong><span>{p}</span></li>
      {/each}
    </ol>
  </section>

  <section class="about">
    <h2>{s.aboutHead}</h2>
    <p>{s.about}</p>
  </section>

  <section class="final">
    <h2>{s.finalHead}</h2>
    <p>{s.final}</p>
    <div class="contact">
      <a class="btn" href="mailto:{EMAIL}">{s.contact}: {EMAIL}</a>
      <a class="btn ghost" href="https://line.me/R/ti/p/{LINE_ID}">{s.line}: {LINE_ID}</a>
    </div>
  </section>

  <footer>{s.footer}</footer>
</main>

<style>
  :global(body) { margin: 0; }
  .page {
    --ink: #17231D;
    --green: #1F4D3A;
    --mist: #E9EFE9;
    --gold: #A67C2E;
    --white: #FFFFFF;
    font-family: 'Manrope', system-ui, sans-serif;
    color: var(--ink);
    background: var(--white);
    line-height: 1.55;
    -webkit-font-smoothing: antialiased;
  }
  .page.th { font-family: 'Manrope', 'Noto Sans Thai', 'Sarabun', system-ui, sans-serif; line-height: 1.7; }

  .page > section, .page > header, .page > footer {
    max-width: 1040px; margin: 0 auto; padding: 0 24px;
  }
  h1, h2, h3 { font-weight: 700; letter-spacing: -0.01em; margin: 0; }
  h1 { font-size: clamp(2.2rem, 5vw, 3.6rem); line-height: 1.05; }
  h2 { font-size: clamp(1.5rem, 3vw, 2rem); margin-bottom: 20px; color: var(--green); }
  h3 { font-size: 1.1rem; }
  p { margin: 0 0 12px; max-width: 62ch; }

  .top { display: flex; justify-content: space-between; align-items: center; padding-top: 22px; padding-bottom: 22px; }
  .brand { font-weight: 800; color: var(--green); text-decoration: none; font-size: 1.2rem; letter-spacing: 0.04em; }
  .lang button {
    background: none; border: 1px solid var(--mist); color: var(--ink); padding: 6px 12px;
    font: inherit; font-weight: 600; cursor: pointer; border-radius: 6px;
  }
  .lang button + button { margin-left: 6px; }
  .lang button.on { background: var(--green); color: var(--white); border-color: var(--green); }
  .lang button:focus-visible, .btn:focus-visible { outline: 3px solid var(--gold); outline-offset: 2px; }

  .hero { display: grid; grid-template-columns: 1fr 1fr; gap: 40px; align-items: center; padding-top: 32px; padding-bottom: 64px; }
  .lede { font-size: 1.2rem; margin: 20px 0 28px; }
  .hero-img { width: 100%; aspect-ratio: 4 / 5; object-fit: cover; border-radius: 10px; background: var(--mist); }

  .btn {
    display: inline-block; background: var(--green); color: var(--white); text-decoration: none;
    padding: 14px 22px; border-radius: 8px; font-weight: 700;
  }
  .btn.ghost { background: transparent; color: var(--green); border: 2px solid var(--green); }

  .loop {
    display: grid; grid-template-columns: 1fr 1fr; gap: 40px; align-items: center;
    background: var(--green); color: var(--white); border-radius: 14px;
    padding: 48px 40px !important; margin-bottom: 72px;
  }
  .loop h2 { color: var(--white); }
  .loop-svg { width: 100%; max-width: 360px; justify-self: center; color: var(--white); }
  .loop-svg .node circle { fill: var(--white); }
  .loop-svg .node text { text-anchor: middle; fill: var(--green); font-weight: 700; font-size: 15px; font-family: inherit; }
  .loop-svg .node text.sub { fill: var(--white); font-weight: 500; font-size: 11.5px; }

  .why { padding-bottom: 72px; }
  .why-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 28px 40px; margin-bottom: 40px; }
  .why-item h3 { margin-bottom: 6px; }
  .strip { display: grid; grid-template-columns: repeat(3, 1fr); gap: 12px; }
  .strip img { width: 100%; aspect-ratio: 1; object-fit: cover; border-radius: 8px; background: var(--mist); }

  .tiers { padding-bottom: 72px; }
  .tier-row { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; }
  .tier { background: var(--mist); border-radius: 12px; padding: 28px; }
  .tier:nth-child(2) { border: 2px solid var(--gold); }
  .price { font-size: 2.2rem; font-weight: 800; color: var(--green); margin: 8px 0 16px; letter-spacing: -0.02em; }
  .tier dl { margin: 0; }
  .tier dd { margin: 0 0 8px; }
  .tier dd.for { color: #4B5A52; }
  .included { margin-top: 20px; color: #4B5A52; max-width: 70ch; }
  .sub-h { font-size: 1.3rem; margin-top: 44px; }
  .addons { width: 100%; border-collapse: collapse; }
  .addons th, .addons td { text-align: left; padding: 14px 12px 14px 0; border-top: 1px solid var(--mist); vertical-align: top; }
  .addons th { font-weight: 700; width: 28%; }
  .addons td.num { white-space: nowrap; font-weight: 700; color: var(--green); text-align: right; padding-right: 0; }

  .time { padding-bottom: 72px; }
  .time ol { list-style: none; padding: 0; margin: 0; counter-reset: step; }
  .time li {
    display: grid; grid-template-columns: 48px 200px 1fr; gap: 16px; padding: 16px 0;
    border-top: 1px solid var(--mist); counter-increment: step;
  }
  .time li::before { content: counter(step); font-weight: 800; color: var(--gold); font-size: 1.3rem; }
  .time li:last-child { border-bottom: 1px solid var(--mist); }

  .about { padding-bottom: 72px; }
  .about p { max-width: 70ch; }

  .final { background: var(--mist); border-radius: 14px; padding: 48px 40px !important; margin-bottom: 40px; }
  .contact { display: flex; gap: 12px; flex-wrap: wrap; margin-top: 8px; }

  footer { padding-top: 24px; padding-bottom: 40px; font-size: 0.85rem; color: #4B5A52; }

  @media (max-width: 760px) {
    .hero, .loop, .why-grid, .tier-row { grid-template-columns: 1fr; }
    .hero { gap: 24px; padding-bottom: 48px; }
    .hero-img { aspect-ratio: 4 / 3; order: -1; }
    .loop { padding: 32px 24px !important; }
    .strip { grid-template-columns: 1fr 1fr; }
    .time li { grid-template-columns: 36px 1fr; }
    .time li span { grid-column: 2; }
    .addons th { width: 40%; }
    .addons td.num { text-align: left; }
  }
  @media (prefers-reduced-motion: no-preference) {
    .lang button, .btn { transition: background-color .15s ease; }
  }
</style>