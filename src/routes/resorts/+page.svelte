<script>
  // src/routes/resorts/+page.svelte
  // Self-contained bilingual proposal page.

  import { onMount } from 'svelte';

  let lang = 'en';

  onMount(() => {
    const saved = localStorage.getItem('sgg-lang');

    if (saved === 'th' || saved === 'en') {
      lang = saved;
    } else if (navigator.language?.startsWith('th')) {
      lang = 'th';
    }
  });

  function setLang(l) {
    lang = l;
    localStorage.setItem('sgg-lang', l);
  }

  $: if (typeof document !== 'undefined') {
    document.documentElement.lang = lang;
  }

  const IMG = {
    hero: 'https://media.sustainablegreengold.com/resorts/hero.jpg',
    beds: 'https://media.sustainablegreengold.com/resorts/beds.jpg',
    fish: 'https://media.sustainablegreengold.com/resorts/fish.jpg',
    harvest: 'https://media.sustainablegreengold.com/resorts/harvest.jpg'
  };

  const t = {
    en: {
      title: 'Aquaponics for resorts',

      lede:
        'A living farm on your property. Greens and herbs for the kitchen every morning, fish for the menu, and a garden your guests can walk through.',

      cta: 'Book a free site visit',

      loopKicker: 'THE CYCLE',

      loopHead:
        'A natural cycle that keeps plants thriving',

      loopBody:
        'Fish feed the plants. Plants clean the water. Nothing touches soil, nothing is sprayed, and the same water circulates again and again.',

      loop: [
        'Fish',
        'Bacteria',
        'Plants',
        'Clean water'
      ],

      loopNote: [
        'Fish waste releases ammonia',
        'Convert ammonia into nitrate',
        'Absorb nutrients and clean the water',
        'Returns to the fish'
      ],

      loopAria:
        'Aquaponics cycle: fish waste releases ammonia, bacteria convert ammonia into nitrate, plants absorb the nutrients and clean the water, and clean water returns to the fish.',

      whyHead: 'What your kitchen gets',

      why: [
        [
          'Harvest at 6 am, on the plate at 7',
          'Lettuce, rocket, basil, coriander, pak choi, chilli, cherry tomato, and fruit trees such as fig and grape in media beds.'
        ],
        [
          'A second product',
          'Tilapia or catfish raised in the same system, ready for the menu in 6–8 months.'
        ],
        [
          'No pesticides, almost no fertiliser',
          'The fish supply the nutrients. Your only inputs are fish feed, seedlings and electricity.'
        ],
        [
          'A story guests remember',
          'Chefs pick with guests, kids feed the fish. It photographs well and it is true.'
        ]
      ],

      tiersHead: 'Two sizes',

      tiers: [
        {
          name: 'Kitchen garden',
          price: '฿180,000',
          size: '2 fish tanks, 4 grow beds, ~5 m²',
          yield: 'Daily herbs and greens for a small kitchen',
          for: 'Boutique resorts and villas, 10–40 keys'
        },
        {
          name: 'Resort farm',
          price: '฿420,000',
          size: '4 fish tanks, 12 grow beds, ~15 m²',
          yield: 'Daily produce for a full restaurant kitchen, plus fish for the menu',
          for: 'Resorts with 40+ keys or a signature restaurant'
        }
      ],

      included:
        'Both include site survey, design, all materials, installation, four weeks of system cycling, staff training and a six-month warranty on pumps and plumbing.',

      addHead: 'Add-ons',

      addons: [
        [
          'Monitoring dashboard',
          'pH, oxygen, temperature and water level on your phone, with alerts.',
          '฿35,000'
        ],
        [
          'Quarterly care visit',
          'Fish health, siphon and pump service, replanting plan.',
          '฿4,500 / visit'
        ]
      ],

      timeHead: 'From first call to first harvest',

      timeline: [
        [
          'Site visit',
          'We check sun, water, power and where the produce needs to go.'
        ],
        [
          'Design',
          'One week. Layout drawing, plant list and final quote.'
        ],
        [
          'Installation',
          'One to two weeks on site with our team.'
        ],
        [
          'Cycling',
          'Four weeks while the bacteria establish. We visit twice.'
        ],
        [
          'First harvest',
          'Greens from week six. Fish from month six.'
        ]
      ],

      aboutHead: 'Who we are',

      about:
        'Sustainable Green Gold is a Thai-registered agricultural company in Chiang Rai. We have run our own aquaponics farm for several years, growing fish, leafy greens, chilli, figs and grapes in the systems we now build for others. The founder is an engineer; the monitoring dashboard is our own.',

      finalHead: 'See it before you decide',

      final:
        'Visit our farm in Chiang Rai, or send us a photo of your site and we will tell you what fits.',

      contact: 'Email',
      line: 'LINE',
      contactBtn: 'Contact Us',

      footer:
        'Sustainable Green Gold Co., Ltd. · 207 Moo 4, Nang Lae, Mueang Chiang Rai, Chiang Rai 57100'
    },

    th: {
      title: 'ระบบอควาโปนิกส์สำหรับรีสอร์ท',

      lede:
        'ฟาร์มมีชีวิตในพื้นที่ของคุณ ผักและสมุนไพรสดส่งห้องครัวทุกเช้า ปลาสำหรับเมนู และสวนที่แขกเดินชมได้',

      cta: 'นัดสำรวจพื้นที่ฟรี',

      loopKicker: 'วงจร',

      loopHead:
        'วงจรธรรมชาติที่ทำให้พืชเติบโตอย่างต่อเนื่อง',

      loopBody:
        'ปลาให้ธาตุอาหารแก่พืช พืชช่วยทำให้น้ำสะอาด ไม่ใช้ดิน ไม่ฉีดพ่นสารเคมี และน้ำชุดเดิมหมุนเวียนกลับมาใช้ซ้ำอย่างต่อเนื่อง',

      loop: [
        'ปลา',
        'แบคทีเรีย',
        'พืช',
        'น้ำสะอาด'
      ],

      loopNote: [
        'ของเสียจากปลาปล่อยแอมโมเนีย',
        'เปลี่ยนแอมโมเนียเป็นไนเตรต',
        'ดูดซึมธาตุอาหารและช่วยทำน้ำให้สะอาด',
        'ไหลกลับไปหาปลา'
      ],

      loopAria:
        'วงจรอควาโปนิกส์: ของเสียจากปลาปล่อยแอมโมเนีย แบคทีเรียเปลี่ยนแอมโมเนียเป็นไนเตรต พืชดูดซึมธาตุอาหารและช่วยทำให้น้ำสะอาด จากนั้นน้ำสะอาดจะไหลกลับไปหาปลา',

      whyHead:
        'ห้องครัวของคุณจะได้อะไร',

      why: [
        [
          'เก็บตอนหกโมงเช้า เสิร์ฟตอนเจ็ดโมง',
          'ผักสลัด ร็อกเก็ต โหระพา ผักชี ผักกวางตุ้ง พริก มะเขือเทศเชอร์รี่ และไม้ผลอย่างมะเดื่อฝรั่งและองุ่นในแปลงวัสดุปลูก'
        ],
        [
          'ผลผลิตที่สอง',
          'ปลานิลหรือปลาดุกเลี้ยงในระบบเดียวกัน พร้อมขึ้นเมนูใน 6–8 เดือน'
        ],
        [
          'ไม่ใช้ยาฆ่าแมลง แทบไม่ใช้ปุ๋ย',
          'ปลาให้ธาตุอาหารเอง ต้นทุนที่เหลือคืออาหารปลา ต้นกล้า และค่าไฟ'
        ],
        [
          'เรื่องราวที่แขกจดจำ',
          'เชฟเก็บผักกับแขก เด็ก ๆ ให้อาหารปลา ถ่ายรูปสวยและเป็นเรื่องจริง'
        ]
      ],

      tiersHead: 'สองขนาด',

      tiers: [
        {
          name: 'สวนครัว',
          price: '180,000 บาท',
          size: 'ถังปลา 2 ถัง แปลงปลูก 4 แปลง ประมาณ 5 ตร.ม.',
          yield: 'สมุนไพรและผักสดทุกวันสำหรับครัวขนาดเล็ก',
          for: 'บูติกรีสอร์ทและวิลล่า 10–40 ห้อง'
        },
        {
          name: 'ฟาร์มรีสอร์ท',
          price: '420,000 บาท',
          size: 'ถังปลา 4 ถัง แปลงปลูก 12 แปลง ประมาณ 15 ตร.ม.',
          yield: 'ผลผลิตทุกวันสำหรับครัวร้านอาหารเต็มรูปแบบ พร้อมปลาสำหรับเมนู',
          for: 'รีสอร์ท 40 ห้องขึ้นไป หรือมีร้านอาหารซิกเนเจอร์'
        }
      ],

      included:
        'ทั้งสองแบบรวมการสำรวจพื้นที่ ออกแบบ วัสดุทั้งหมด ติดตั้ง บ่มระบบสี่สัปดาห์ อบรมพนักงาน และรับประกันปั๊มและระบบท่อหกเดือน',

      addHead: 'บริการเสริม',

      addons: [
        [
          'แดชบอร์ดตรวจสอบ',
          'ค่า pH ออกซิเจน อุณหภูมิ และระดับน้ำบนมือถือ พร้อมแจ้งเตือน',
          '35,000 บาท'
        ],
        [
          'เข้าดูแลรายไตรมาส',
          'ตรวจสุขภาพปลา ซ่อมบำรุงกาลักน้ำและปั๊ม วางแผนปลูกรอบใหม่',
          '4,500 บาท / ครั้ง'
        ]
      ],

      timeHead:
        'จากการติดต่อครั้งแรกถึงการเก็บเกี่ยวครั้งแรก',

      timeline: [
        [
          'สำรวจพื้นที่',
          'ดูแสงแดด แหล่งน้ำ ไฟฟ้า และตำแหน่งที่ต้องส่งผลผลิต'
        ],
        [
          'ออกแบบ',
          'หนึ่งสัปดาห์ แบบผัง รายการพืช และใบเสนอราคาสุดท้าย'
        ],
        [
          'ติดตั้ง',
          'หนึ่งถึงสองสัปดาห์หน้างานกับทีมของเรา'
        ],
        [
          'บ่มระบบ',
          'สี่สัปดาห์ให้แบคทีเรียตั้งตัว เราเข้าดูสองครั้ง'
        ],
        [
          'เก็บเกี่ยวครั้งแรก',
          'ผักตั้งแต่สัปดาห์ที่หก ปลาตั้งแต่เดือนที่หก'
        ]
      ],

      aboutHead: 'เราคือใคร',

      about:
        'บริษัท ซัสเทนเนเบิ้ล กรีน โกลด์ จำกัด เป็นบริษัทเกษตรจดทะเบียนในประเทศไทย ตั้งอยู่ที่เชียงราย เราดำเนินฟาร์มอควาโปนิกส์ของตัวเองมาหลายปี เลี้ยงปลา ปลูกผักใบ พริก มะเดื่อฝรั่ง และองุ่น ในระบบแบบเดียวกับที่เราติดตั้งให้ลูกค้า ผู้ก่อตั้งเป็นวิศวกร แดชบอร์ดตรวจสอบพัฒนาขึ้นเอง',

      finalHead:
        'มาดูของจริงก่อนตัดสินใจ',

      final:
        'แวะชมฟาร์มของเราที่เชียงราย หรือส่งรูปพื้นที่ของคุณมา เราจะบอกได้ว่าแบบไหนเหมาะ',

      contact: 'อีเมล',
      line: 'LINE',
      contactBtn: 'ติดต่อเรา',

      footer:
        'บริษัท ซัสเทนเนเบิ้ล กรีน โกลด์ จำกัด · 207 หมู่ 4 ต.นางแล อ.เมืองเชียงราย จ.เชียงราย 57100'
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

  <!-- =====================================================
       NAVIGATION
       ===================================================== -->

  <header class="top">
    <div class="top-inner">

      <a class="brand" href="/">SGG·AI</a>

      <nav class="nav" aria-label="Main navigation">
        <a href="/">Ecosystem</a>
        <a href="/">Automation</a>
        <a href="/">Species</a>
        <a href="/">Media</a>
        <a href="/">Resources</a>
      </nav>

      <div class="right">

        <button
          class="pill"
          type="button"
          on:click={() => setLang(lang === 'en' ? 'th' : 'en')}
          aria-label={lang === 'en' ? 'Switch to Thai' : 'Switch to English'}
        >
          {lang === 'en' ? '🇹🇭 ภาษาไทย' : '🇬🇧 English'}
        </button>

        <a class="pill solid" href="#contact">
          {s.contactBtn}
        </a>

      </div>

    </div>
  </header>


  <!-- =====================================================
       HERO
       ===================================================== -->

  <section class="hero">

    <div class="hero-text">

      <p class="eyebrow">
        {lang === 'en'
          ? 'A living farm for your resort'
          : 'ฟาร์มมีชีวิตสำหรับรีสอร์ทของคุณ'}
      </p>

      <h1>{s.title}</h1>

      <p class="lede">{s.lede}</p>

      <a
        class="btn"
        href={`mailto:${EMAIL}?subject=${encodeURIComponent(s.title)}`}
      >
        {s.cta}
      </a>

    </div>

    <img
      class="hero-img"
      src={IMG.hero}
      alt=""
      loading="eager"
    />

  </section>


  <!-- =====================================================
       HOW IT WORKS
       ===================================================== -->

  <section class="loop">

    <div class="loop-text">

      <p class="section-kicker">
        {s.loopKicker}
      </p>

      <h2>{s.loopHead}</h2>

      <p class="loop-body">
        {s.loopBody}
      </p>

    </div>


    <!-- CYCLE DIAGRAM -->

    <div
      class="cycle"
      role="img"
      aria-label={s.loopAria}
    >

      <!-- FLOW LINES -->

      <svg
        class="cycle-flow"
        viewBox="0 0 600 500"
        aria-hidden="true"
        preserveAspectRatio="xMidYMid meet"
      >

        <defs>

          <marker
            id="cycle-arrow"
            viewBox="0 0 10 10"
            refX="8"
            refY="5"
            markerWidth="6"
            markerHeight="6"
            orient="auto-start-reverse"
          >
            <path d="M 0 0 L 10 5 L 0 10 Z" />
          </marker>

        </defs>


        <!-- FISH → BACTERIA -->

        <path
          class="cycle-path"
          d="M 330 85
             C 425 90, 485 165, 478 270"
          marker-end="url(#cycle-arrow)"
        />


        <!-- BACTERIA → PLANTS -->

        <path
          class="cycle-path"
          d="M 450 345
             C 385 425, 215 425, 150 345"
          marker-end="url(#cycle-arrow)"
        />


        <!-- PLANTS → FISH -->

        <path
          class="cycle-path"
          d="M 122 270
             C 115 165, 175 90, 270 85"
          marker-end="url(#cycle-arrow)"
        />

      </svg>


      <!-- FISH -->

      <div class="cycle-node fish-node">

        <div class="node-circle">
          {s.loop[0]}
        </div>

        <p class="node-description">
          {s.loopNote[0]}
        </p>

      </div>


      <!-- BACTERIA -->

      <div class="cycle-node bacteria-node">

        <div class="node-circle">
          {s.loop[1]}
        </div>

        <p class="node-description">
          {s.loopNote[1]}
        </p>

      </div>


      <!-- PLANTS -->

      <div class="cycle-node plants-node">

        <div class="node-circle">
          {s.loop[2]}
        </div>

        <p class="node-description">
          {s.loopNote[2]}
        </p>

      </div>


      <!-- CLEAN WATER -->

      <div class="water-node">

        <div class="water-circle">
          <span>💧</span>
        </div>

        <span class="water-label">
          {s.loop[3]}
        </span>

      </div>

    </div>

  </section>


  <!-- =====================================================
       KITCHEN BENEFITS
       ===================================================== -->

  <section class="why">

    <p class="section-kicker">
      {lang === 'en' ? 'THE OUTPUT' : 'ผลผลิต'}
    </p>

    <h2>{s.whyHead}</h2>


    <div class="why-grid">

      {#each s.why as [h, p], i}

        <article class="why-item">

          <span class="why-number">
            0{i + 1}
          </span>

          <h3>{h}</h3>

          <p>{p}</p>

        </article>

      {/each}

    </div>


    <div class="strip">

      <img
        src={IMG.beds}
        alt=""
        loading="lazy"
      />

      <img
        src={IMG.fish}
        alt=""
        loading="lazy"
      />

      <img
        src={IMG.harvest}
        alt=""
        loading="lazy"
      />

    </div>

  </section>


  <!-- =====================================================
       PACKAGES
       ===================================================== -->

  <section class="tiers">

    <p class="section-kicker">
      {lang === 'en'
        ? 'CHOOSE YOUR SCALE'
        : 'เลือกขนาดที่เหมาะกับคุณ'}
    </p>

    <h2>{s.tiersHead}</h2>


    <div class="tier-row">

      {#each s.tiers as tier}

        <article class="tier">

          <h3>{tier.name}</h3>

          <p class="price">{tier.price}</p>

          <dl>

            <dt>{lang === 'en' ? 'Size' : 'ขนาด'}</dt>
            <dd>{tier.size}</dd>

            <dt>{lang === 'en' ? 'Yield' : 'ผลผลิต'}</dt>
            <dd>{tier.yield}</dd>

            <dt>{lang === 'en' ? 'For' : 'เหมาะสำหรับ'}</dt>
            <dd class="for">{tier.for}</dd>

          </dl>

        </article>

      {/each}

    </div>


    <p class="included">
      {s.included}
    </p>


    <h2 class="sub-h">
      {s.addHead}
    </h2>


    <div class="addons">

      {#each s.addons as [n, d, p]}

        <article class="addon-row">

          <h3>{n}</h3>

          <p>{d}</p>

          <strong>{p}</strong>

        </article>

      {/each}

    </div>

  </section>


  <!-- =====================================================
       TIMELINE
       ===================================================== -->

  <section class="time">

    <p class="section-kicker">
      {lang === 'en' ? 'THE JOURNEY' : 'ขั้นตอน'}
    </p>

    <h2>{s.timeHead}</h2>


    <ol>

      {#each s.timeline as [h, p], i}

        <li>

          <span class="timeline-number">
            0{i + 1}
          </span>

          <div>
            <strong>{h}</strong>
            <span>{p}</span>
          </div>

        </li>

      {/each}

    </ol>

  </section>


  <!-- =====================================================
       ABOUT
       ===================================================== -->

  <section class="about">

    <p class="section-kicker">
      {lang === 'en' ? 'SGG' : 'เกี่ยวกับเรา'}
    </p>

    <h2>{s.aboutHead}</h2>

    <p>{s.about}</p>

  </section>


  <!-- =====================================================
       CONTACT
       ===================================================== -->

  <section class="final" id="contact">

    <p class="section-kicker">
      {lang === 'en' ? 'COME SEE IT' : 'มาดูของจริง'}
    </p>

    <h2>{s.finalHead}</h2>

    <p>{s.final}</p>


    <div class="contact">

      <a
        class="btn"
        href={`mailto:${EMAIL}`}
      >
        {s.contact}: {EMAIL}
      </a>

      <a
        class="btn ghost"
        href={LINE_URL}
        target="_blank"
        rel="noopener noreferrer"
      >
        {s.line}
      </a>

    </div>

  </section>


  <!-- =====================================================
       FOOTER
       ===================================================== -->

  <footer>
    {s.footer}
  </footer>

</main>


<style>

/* =========================================================
   DESIGN SYSTEM
   ========================================================= */

:global(html) {
  scroll-behavior: smooth;
}

:global(body) {
  margin: 0;
  background: #fbfcfa;
  color: #20342c;
  font-family:
    Inter,
    ui-sans-serif,
    system-ui,
    -apple-system,
    BlinkMacSystemFont,
    "Segoe UI",
    sans-serif;
}

:global(*) {
  box-sizing: border-box;
}


/* =========================================================
   PAGE
   ========================================================= */

.page {
  --green: #245b47;
  --green-dark: #173f31;
  --green-soft: #e9f0ec;
  --text: #20342c;
  --muted: #65746d;
  --line: #dfe7e2;
  --paper: #fbfcfa;
  --white: #ffffff;

  width: 100%;
  overflow: hidden;
}


/* =========================================================
   NAVIGATION
   ========================================================= */

.top {
  position: sticky;
  top: 0;
  z-index: 20;

  border-bottom: 1px solid rgba(36, 91, 71, 0.08);

  background: rgba(251, 252, 250, 0.92);

  backdrop-filter: blur(14px);
  -webkit-backdrop-filter: blur(14px);
}

.top-inner {
  width: min(1180px, calc(100% - 48px));
  min-height: 76px;
  margin: 0 auto;

  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 30px;
}

.brand {
  color: var(--green-dark);
  text-decoration: none;
  font-size: 18px;
  font-weight: 800;
  letter-spacing: -0.04em;
}

.nav {
  display: flex;
  align-items: center;
  gap: 28px;
}

.nav a {
  color: #53635c;
  text-decoration: none;
  font-size: 13px;
  font-weight: 500;
  transition: color 180ms ease;
}

.nav a:hover {
  color: var(--green);
}

.right {
  display: flex;
  align-items: center;
  gap: 9px;
}

.pill {
  display: inline-flex;
  min-height: 38px;
  padding: 0 14px;

  align-items: center;
  justify-content: center;

  border: 1px solid var(--line);
  border-radius: 999px;

  background: transparent;
  color: var(--green);

  font: inherit;
  font-size: 12px;
  font-weight: 650;

  text-decoration: none;
  cursor: pointer;

  transition:
    background 180ms ease,
    border-color 180ms ease,
    transform 180ms ease;
}

.pill:hover {
  border-color: rgba(36, 91, 71, 0.3);
  transform: translateY(-1px);
}

.pill.solid {
  border-color: var(--green);
  background: var(--green);
  color: white;
}

.pill.solid:hover {
  background: var(--green-dark);
}


/* =========================================================
   GENERAL SECTIONS
   ========================================================= */

.hero,
.loop,
.why,
.tiers,
.time,
.about,
.final {
  width: min(1180px, calc(100% - 48px));
  margin-inline: auto;
}

.hero,
.loop,
.why,
.tiers,
.time,
.about,
.final {
  padding-block: clamp(80px, 10vw, 140px);
}

.section-kicker {
  margin: 0 0 18px;

  color: var(--green);
  font-size: 11px;
  font-weight: 800;
  letter-spacing: 0.16em;
  text-transform: uppercase;
}

h1,
h2,
h3,
p {
  margin-top: 0;
}

h1 {
  max-width: 780px;
  margin-bottom: 28px;

  color: var(--green-dark);

  font-size: clamp(52px, 7vw, 92px);
  line-height: 0.96;
  letter-spacing: -0.065em;
}

h2 {
  max-width: 720px;
  margin-bottom: 25px;

  color: var(--green-dark);

  font-size: clamp(36px, 4.5vw, 62px);
  line-height: 1.02;
  letter-spacing: -0.055em;
}

h3 {
  color: var(--green-dark);
}


/* =========================================================
   HERO
   ========================================================= */

.hero {
  display: grid;
  grid-template-columns: 0.9fr 1.1fr;
  align-items: center;
  gap: clamp(50px, 7vw, 100px);

  min-height: calc(100vh - 76px);
}

.hero-text {
  max-width: 570px;
}

.eyebrow {
  margin-bottom: 22px;

  color: var(--green);
  font-size: 13px;
  font-weight: 700;
  letter-spacing: 0.02em;
}

.lede {
  max-width: 570px;
  margin-bottom: 32px;

  color: var(--muted);
  font-size: clamp(17px, 1.5vw, 20px);
  line-height: 1.65;
}

.hero-img {
  display: block;
  width: 100%;
  height: min(680px, 72vh);

  object-fit: cover;

  border-radius: 3px;

  box-shadow:
    0 30px 70px rgba(22, 61, 47, 0.12);
}


/* =========================================================
   BUTTONS
   ========================================================= */

.btn {
  display: inline-flex;
  min-height: 50px;
  padding: 0 22px;

  align-items: center;
  justify-content: center;

  border: 1px solid var(--green);
  border-radius: 999px;

  background: var(--green);
  color: white;

  font-size: 13px;
  font-weight: 700;
  text-decoration: none;

  transition:
    transform 180ms ease,
    background 180ms ease,
    box-shadow 180ms ease;
}

.btn:hover {
  background: var(--green-dark);
  transform: translateY(-2px);
  box-shadow: 0 10px 25px rgba(36, 91, 71, 0.14);
}

.btn.ghost {
  background: transparent;
  color: var(--green);
}

.btn.ghost:hover {
  background: var(--green-soft);
  box-shadow: none;
}


/* =========================================================
   HOW IT WORKS
   ========================================================= */

.loop {
  display: grid;
  grid-template-columns:
    minmax(0, 0.82fr)
    minmax(520px, 1.18fr);

  gap: clamp(55px, 8vw, 110px);

  align-items: center;

  border-top: 1px solid var(--line);
}

.loop-text {
  max-width: 500px;
}

.loop-text h2 {
  margin-bottom: 25px;
}

.loop-body {
  max-width: 500px;
  margin: 0;

  color: var(--muted);
  font-size: 16px;
  line-height: 1.8;
}


/* =========================================================
   CYCLE DIAGRAM
   ========================================================= */

.cycle {
  position: relative;

  width: 100%;
  max-width: 620px;
  aspect-ratio: 1.2 / 1;

  margin-inline: auto;
}


/* SVG */

.cycle-flow {
  position: absolute;
  inset: 0;

  width: 100%;
  height: 100%;

  overflow: visible;

  pointer-events: none;
}

.cycle-path {
  fill: none;

  stroke: var(--green);
  stroke-width: 2.4;

  stroke-linecap: round;
  stroke-linejoin: round;

  opacity: 0.7;
}

.cycle-flow marker path {
  fill: var(--green);
}


/* =========================================================
   CYCLE NODES
   ========================================================= */

.cycle-node {
  position: absolute;
  z-index: 2;

  width: 145px;

  text-align: center;
}

.node-circle {
  display: flex;

  width: 108px;
  height: 108px;

  margin-inline: auto;

  align-items: center;
  justify-content: center;

  border-radius: 50%;

  background: var(--green);

  color: white;

  font-size: 16px;
  font-weight: 700;

  box-shadow:
    0 12px 35px rgba(36, 91, 71, 0.13);
}


/* FISH */

.fish-node {
  top: 0;
  left: 50%;

  transform: translateX(-50%);
}


/* BACTERIA */

.bacteria-node {
  right: 0;
  bottom: 7%;
}


/* PLANTS */

.plants-node {
  left: 0;
  bottom: 7%;
}


/* =========================================================
   NODE TEXT
   ========================================================= */

.node-description {
  width: 180px;

  margin: 16px auto 0;

  color: var(--muted);

  font-size: 11px;
  line-height: 1.5;
}


/* =========================================================
   CLEAN WATER
   ========================================================= */

.water-node {
  position: absolute;
  z-index: 4;

  top: 48%;
  left: 50%;

  display: flex;

  flex-direction: column;
  align-items: center;

  transform: translate(-50%, -50%);
}

.water-circle {
  display: flex;

  width: 76px;
  height: 76px;

  align-items: center;
  justify-content: center;

  border: 1px solid rgba(36, 91, 71, 0.18);
  border-radius: 50%;

  background: rgba(251, 252, 250, 0.96);

  box-shadow:
    0 12px 35px rgba(36, 91, 71, 0.08);
}

.water-circle span {
  font-size: 24px;
  line-height: 1;
}

.water-label {
  margin-top: 9px;

  color: var(--green);

  font-size: 11px;
  font-weight: 700;
}


/* =========================================================
   KITCHEN BENEFITS
   ========================================================= */

.why {
  border-top: 1px solid var(--line);
}

.why-grid {
  display: grid;

  grid-template-columns: repeat(4, 1fr);

  border-top: 1px solid var(--line);
  border-bottom: 1px solid var(--line);
}

.why-item {
  min-height: 270px;
  padding: 30px 28px 35px;

  border-right: 1px solid var(--line);
}

.why-item:last-child {
  border-right: 0;
}

.why-number {
  display: block;

  margin-bottom: 55px;

  color: #94a39b;

  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.08em;
}

.why-item h3 {
  margin-bottom: 13px;

  font-size: 18px;
  line-height: 1.25;
  letter-spacing: -0.02em;
}

.why-item p {
  margin: 0;

  color: var(--muted);

  font-size: 13px;
  line-height: 1.65;
}


/* =========================================================
   IMAGE STRIP
   ========================================================= */

.strip {
  display: grid;

  grid-template-columns: 1.2fr 0.8fr 1fr;

  height: 310px;

  margin-top: 50px;

  gap: 8px;
}

.strip img {
  width: 100%;
  height: 100%;

  object-fit: cover;
}


/* =========================================================
   PACKAGES
   ========================================================= */

.tiers {
  border-top: 1px solid var(--line);
}

.tier-row {
  display: grid;

  grid-template-columns: repeat(2, 1fr);

  gap: 18px;

  margin-top: 50px;
}

.tier {
  padding: 38px;

  border: 1px solid var(--line);

  background: white;
}

.tier h3 {
  margin-bottom: 14px;

  font-size: 22px;
}

.price {
  margin-bottom: 35px;

  color: var(--green);

  font-size: 34px;
  font-weight: 750;
  letter-spacing: -0.04em;
}

.tier dl {
  display: grid;

  grid-template-columns: 70px 1fr;

  gap: 12px 20px;

  margin: 0;
}

.tier dt {
  color: #89968f;

  font-size: 10px;
  font-weight: 800;

  letter-spacing: 0.08em;
  text-transform: uppercase;
}

.tier dd {
  margin: 0;

  color: var(--muted);

  font-size: 13px;
  line-height: 1.55;
}

.tier dd.for {
  color: var(--green-dark);
  font-weight: 600;
}

.included {
  max-width: 850px;

  margin: 28px 0 75px;

  color: var(--muted);

  font-size: 13px;
  line-height: 1.7;
}

.sub-h {
  margin-bottom: 25px;

  font-size: 28px;
}

.addons {
  border-top: 1px solid var(--line);
}

.addon-row {
  display: grid;

  grid-template-columns: 0.8fr 1.5fr auto;

  gap: 30px;

  align-items: center;

  padding: 22px 0;

  border-bottom: 1px solid var(--line);
}

.addon-row h3 {
  margin: 0;

  font-size: 15px;
}

.addon-row p {
  margin: 0;

  color: var(--muted);

  font-size: 13px;
  line-height: 1.5;
}

.addon-row strong {
  color: var(--green);

  font-size: 14px;

  white-space: nowrap;
}


/* =========================================================
   TIMELINE
   ========================================================= */

.time {
  border-top: 1px solid var(--line);
}

.time ol {
  display: grid;

  grid-template-columns: repeat(5, 1fr);

  margin: 55px 0 0;
  padding: 0;

  list-style: none;
}

.time li {
  position: relative;

  min-height: 190px;

  padding: 0 25px;

  border-left: 1px solid var(--line);
}

.time li:last-child {
  border-right: 1px solid var(--line);
}

.timeline-number {
  display: block;

  margin-bottom: 45px;

  color: var(--green);

  font-size: 11px;
  font-weight: 800;
}

.time li strong {
  display: block;

  margin-bottom: 12px;

  color: var(--green-dark);

  font-size: 15px;
}

.time li span:not(.timeline-number) {
  display: block;

  color: var(--muted);

  font-size: 12px;
  line-height: 1.6;
}


/* =========================================================
   ABOUT
   ========================================================= */

.about {
  display: grid;

  grid-template-columns: 0.7fr 1fr;

  column-gap: 100px;

  border-top: 1px solid var(--line);
}

.about .section-kicker {
  grid-column: 1;
}

.about h2 {
  grid-column: 1;

  margin-top: 0;
}

.about > p:last-child {
  grid-column: 2;
  grid-row: 1 / span 2;

  max-width: 620px;

  margin: 0;

  color: var(--muted);

  font-size: 17px;
  line-height: 1.8;
}


/* =========================================================
   FINAL CTA
   ========================================================= */

.final {
  border-top: 1px solid var(--line);
}

.final > p:not(.section-kicker) {
  max-width: 620px;

  margin-bottom: 30px;

  color: var(--muted);

  font-size: 17px;
  line-height: 1.7;
}

.contact {
  display: flex;

  flex-wrap: wrap;

  gap: 10px;
}


/* =========================================================
   FOOTER
   ========================================================= */

footer {
  width: min(1180px, calc(100% - 48px));

  margin: 0 auto;

  padding: 30px 0 45px;

  border-top: 1px solid var(--line);

  color: #89968f;

  font-size: 11px;
  line-height: 1.6;
}


/* =========================================================
   THAI TYPOGRAPHY
   ========================================================= */

.page.th {
  font-family:
    "Noto Sans Thai",
    "Leelawadee UI",
    Tahoma,
    sans-serif;
}

.page.th h1,
.page.th h2 {
  letter-spacing: -0.045em;
}


/* =========================================================
   TABLET
   ========================================================= */

@media (max-width: 1000px) {

  .nav {
    display: none;
  }

  .hero {
    grid-template-columns: 1fr;
    min-height: auto;
  }

  .hero-text {
    max-width: 700px;
  }

  .hero-img {
    height: 55vw;
    max-height: 600px;
  }

  .loop {
    grid-template-columns: 1fr;
  }

  .loop-text {
    max-width: 700px;
  }

  .cycle {
    max-width: 620px;
  }

  .why-grid {
    grid-template-columns: repeat(2, 1fr);
  }

  .why-item:nth-child(2) {
    border-right: 0;
  }

  .why-item:nth-child(-n + 2) {
    border-bottom: 1px solid var(--line);
  }

  .time ol {
    grid-template-columns: repeat(2, 1fr);
  }

  .time li {
    border-bottom: 1px solid var(--line);
    padding: 25px;
  }

  .time li:last-child {
    border-right: 0;
  }

  .about {
    grid-template-columns: 1fr;
    gap: 25px;
  }

  .about .section-kicker,
  .about h2,
  .about > p:last-child {
    grid-column: auto;
    grid-row: auto;
  }

  .about > p:last-child {
    max-width: 700px;
  }
}


/* =========================================================
   MOBILE
   ========================================================= */

@media (max-width: 650px) {

  .top-inner,
  .hero,
  .loop,
  .why,
  .tiers,
  .time,
  .about,
  .final,
  footer {
    width: min(100% - 32px, 1180px);
  }

  .top-inner {
    min-height: 68px;
  }

  .brand {
    font-size: 16px;
  }

  .right .pill:first-child {
    padding-inline: 10px;
  }

  .right .solid {
    display: none;
  }

  .hero,
  .loop,
  .why,
  .tiers,
  .time,
  .about,
  .final {
    padding-block: 75px;
  }

  h1 {
    font-size: clamp(48px, 15vw, 72px);
  }

  h2 {
    font-size: clamp(36px, 11vw, 52px);
  }

  .hero-img {
    height: 110vw;
    max-height: 520px;
  }


  /* -------------------------
     MOBILE CYCLE
     ------------------------- */

  .cycle {
    width: 100%;
    aspect-ratio: 1 / 0.95;
  }

  .cycle-path {
    stroke-width: 2;
  }

  .cycle-node {
    width: 110px;
  }

  .node-circle {
    width: 82px;
    height: 82px;

    font-size: 13px;
  }

  .node-description {
    width: 135px;

    margin-top: 12px;

    font-size: 9px;
    line-height: 1.45;
  }

  .fish-node {
    top: 0;
    left: 50%;
  }

  .plants-node {
    left: -3%;
    bottom: 8%;
  }

  .bacteria-node {
    right: -3%;
    bottom: 8%;
  }

  .water-circle {
    width: 58px;
    height: 58px;
  }

  .water-circle span {
    font-size: 19px;
  }

  .water-label {
    font-size: 9px;
  }


  /* -------------------------
     BENEFITS
     ------------------------- */

  .why-grid {
    grid-template-columns: 1fr;
  }

  .why-item,
  .why-item:nth-child(2) {
    min-height: auto;

    border-right: 0;
    border-bottom: 1px solid var(--line);
  }

  .why-item:last-child {
    border-bottom: 0;
  }

  .why-number {
    margin-bottom: 35px;
  }

  .strip {
    grid-template-columns: 1fr;

    height: auto;
  }

  .strip img {
    height: 220px;
  }


  /* -------------------------
     PACKAGES
     ------------------------- */

  .tier-row {
    grid-template-columns: 1fr;
  }

  .tier {
    padding: 28px 24px;
  }

  .tier dl {
    grid-template-columns: 65px 1fr;
  }

  .addon-row {
    grid-template-columns: 1fr;
    gap: 8px;
  }

  .addon-row strong {
    margin-top: 6px;
  }


  /* -------------------------
     TIMELINE
     ------------------------- */

  .time ol {
    grid-template-columns: 1fr;
  }

  .time li,
  .time li:last-child {
    min-height: auto;

    border-right: 0;
    border-bottom: 1px solid var(--line);

    padding: 25px 0;
  }

  .time li:last-child {
    border-bottom: 0;
  }

  .timeline-number {
    margin-bottom: 20px;
  }


  /* -------------------------
     CONTACT
     ------------------------- */

  .contact {
    align-items: stretch;
    flex-direction: column;
  }

  .contact .btn {
    width: 100%;
  }

}

</style>