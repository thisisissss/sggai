<script>
  // src/routes/resorts/+page.svelte
  // Self-contained bilingual proposal page. Replace image URLs with your R2 assets.
  import { onMount } from 'svelte';
  import './resorts.css';

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
  const EMAIL = 'sustainablegreengold@gmail.com';
  const LINE_URL = 'https://line.me/ti/p/eZ2GG61uIe';
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
      <g class="node" transform="translate(160,40)"><circle r="34" /><text y="5">{s.loop[0]}</text><text class="sub" y="52">{s.loopNote[0]}</text></g>
      <g class="node" transform="translate(262,232)"><circle r="34" /><text y="5">{s.loop[1]}</text><text class="sub" y="52">{s.loopNote[1]}</text></g>
      <g class="node" transform="translate(58,232)"><circle r="34" /><text y="5">{s.loop[2]}</text><text class="sub" y="52">{s.loopNote[2]}</text></g>
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
      <a class="btn ghost" href={LINE_URL}>{s.line}</a>
    </div>
  </section>

  <footer>{s.footer}</footer>
</main>
