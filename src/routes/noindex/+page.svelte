<script>
  const videos = [
    {
      id: '4lStpR8OYYQ',
      accent: '#2f7a4d',
      gradient: 'linear-gradient(135deg, #1b4d31 0%, #3f9e63 100%)',
      th: {
        title: 'การรดน้ำต้นไม้ในเรือนเพาะชำ',
        steps: [
          'เติมน้ำใส่บัวรดน้ำจากก๊อกน้ำ',
          'รดน้ำต้นไม้ทุกต้นที่อยู่ใต้ถุนบ้านให้ทั่ว'
        ]
      },
      en: {
        title: 'Watering the nursery',
        steps: [
          'Fill the watering can with water from the tap.',
          'Water all the plants under the house.'
        ]
      }
    },
    {
      id: '37criRmqMoY',
      accent: '#b56a15',
      gradient: 'linear-gradient(135deg, #6b3410 0%, #c9821f 100%)',
      th: {
        title: 'กรณีฉุกเฉิน น้ำไม่ไหลเข้าแปลงปลูก',
        steps: [
          'ไปปิดสวิตช์ไฟก่อนเป็นอันดับแรก',
          'เปิดฝาถัง',
          'ยกปั๊มน้ำขึ้นมาวางไว้บนพื้นปูน',
          'ขันไส้กรองด้านนอกออก',
          'ตรวจดูภายในว่ามีเศษสิ่งสกปรกอุดตันหรือไม่ ถ้ามีให้เอาออกให้หมด',
          'ประกอบทุกอย่างกลับเข้าที่เหมือนเดิม',
          'เปิดสวิตช์ไฟ แล้วเปิดปั๊มน้ำ'
        ]
      },
      en: {
        title: 'Emergency: no water in the growbeds',
        steps: [
          'Switch off the electricity first.',
          'Open the barrel.',
          'Lift the pump out and set it down on the cement.',
          'Unscrew the external filter.',
          'Check inside for waste. Remove anything you find.',
          'Put everything back together.',
          'Switch the electricity back on, then start the pump.'
        ]
      }
    },
    {
      id: '3tnJMz0twKU',
      accent: '#1c7b90',
      gradient: 'linear-gradient(135deg, #0f4252 0%, #2f9aae 100%)',
      th: {
        title: 'การล้างท่อ',
        steps: [
          'ถ้าน้ำในถังลดต่ำลง ให้ลองเปิดวาล์วท่อ',
          'สังเกตน้ำที่ไหลออกมาประมาณ 5–10 วินาที',
          'ถ้าน้ำใสแล้ว ให้ปิดวาล์ว'
        ]
      },
      en: {
        title: 'Cleaning the pipes',
        steps: [
          'If the water in the barrels is low, open the pipes.',
          'Watch the flow for 5–10 seconds.',
          'Once the water runs clean, close the taps.'
        ]
      }
    }
  ];
</script>

<svelte:head>
  <meta name="robots" content="noindex, nofollow" />
  <title>คู่มือการดูแลต้นไม้</title>
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link
    rel="stylesheet"
    href="https://fonts.googleapis.com/css2?family=Noto+Sans+Thai:wght@400;600;800&family=Oswald:wght@500;700&display=swap"
  />
</svelte:head>

<div class="page">
  <header>
    <p class="eyebrow">Sustainable Green Gold · Field guide</p>
    <h1>คู่มือการดูแลต้นไม้</h1>
    <p class="sub">Plant care guide · 3 videos</p>
  </header>

  {#each videos as v, i}
    <section style="--accent: {v.accent}">
      <div class="card" style="background: {v.gradient}">
        <span class="ghost">{i + 1}</span>
        <p class="index">Part {i + 1} / {videos.length}</p>
        <h2>{v.th.title}</h2>
        <p class="card-en">{v.en.title}</p>
      </div>

      <div class="body">
        <div class="frame">
          <iframe
            src="https://www.youtube-nocookie.com/embed/{v.id}?rel=0"
            title={v.en.title}
            loading="lazy"
            allow="accelerometer; encrypted-media; gyroscope; picture-in-picture"
            allowfullscreen
          ></iframe>
        </div>

        <ol class="th">
          {#each v.th.steps as step}<li>{step}</li>{/each}
        </ol>

        <div class="en">
          <p class="en-label">English</p>
          <ol>
            {#each v.en.steps as step}<li>{step}</li>{/each}
          </ol>
        </div>
      </div>
    </section>
  {/each}

  <footer>
    <p>Sustainable Green Gold Co., Ltd.</p>
  </footer>
</div>

<style>
  .page {
    --ink: #15211b;
    --muted: #6f7d74;
    --paper: #f3f4f1;
    --line: #dfe3dd;

    background: var(--paper);
    color: var(--ink);
    font-family: 'Noto Sans Thai', system-ui, sans-serif;
    min-height: 100vh;
    padding: 3rem 1.25rem 0;
  }

  header {
    max-width: 680px;
    margin: 0 auto 3rem;
  }

  .eyebrow,
  .index,
  .en-label {
    font-family: 'Oswald', system-ui, sans-serif;
    font-weight: 500;
    text-transform: uppercase;
    letter-spacing: 0.16em;
    font-size: 0.72rem;
  }

  .eyebrow {
    color: var(--muted);
    margin: 0 0 1.25rem;
  }

  h1 {
    font-size: clamp(1.9rem, 7vw, 2.75rem);
    font-weight: 800;
    line-height: 1.35;
    margin: 0;
    letter-spacing: -0.01em;
  }

  .sub {
    margin: 0.75rem 0 0;
    padding-top: 1.25rem;
    border-top: 1px solid var(--line);
    color: var(--muted);
    font-size: 0.9rem;
  }

  section {
    max-width: 680px;
    margin: 0 auto 3.5rem;
  }

  .card {
    position: relative;
    overflow: hidden;
    border-radius: 14px;
    padding: 1.75rem 1.5rem 1.6rem;
    color: #fff;
  }

  .ghost {
    position: absolute;
    right: -0.5rem;
    bottom: -3.5rem;
    font-family: 'Oswald', sans-serif;
    font-weight: 700;
    font-size: 11rem;
    line-height: 1;
    opacity: 0.16;
    pointer-events: none;
  }

  .index {
    margin: 0 0 0.9rem;
    opacity: 0.75;
  }

  h2 {
    position: relative;
    font-size: clamp(1.2rem, 4.5vw, 1.5rem);
    font-weight: 800;
    line-height: 1.45;
    margin: 0;
  }

  .card-en {
    position: relative;
    margin: 0.4rem 0 0;
    font-size: 0.92rem;
    opacity: 0.82;
  }

  .body {
    padding: 1.75rem 0 0;
  }

  .frame {
    position: relative;
    width: 100%;
    max-width: 300px;
    padding-top: min(177.78%, 533px);
    margin-bottom: 1.75rem;
  }

  .frame iframe {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    border: 0;
    border-radius: 12px;
    background: #000;
  }

  ol {
    list-style: none;
    margin: 0;
    padding: 0;
    counter-reset: step;
  }

  ol li {
    counter-increment: step;
    position: relative;
    padding-left: 2.4rem;
    margin-bottom: 0.9rem;
    line-height: 1.7;
  }

  ol li::before {
    content: counter(step);
    position: absolute;
    left: 0;
    top: 0.15rem;
    width: 1.6rem;
    height: 1.6rem;
    border-radius: 5px;
    background: var(--accent);
    color: #fff;
    font-family: 'Oswald', sans-serif;
    font-size: 0.85rem;
    font-weight: 500;
    display: grid;
    place-items: center;
  }

  ol.th li {
    font-size: 1.08rem;
  }

  .en {
    margin-top: 2rem;
    padding-top: 1.5rem;
    border-top: 1px solid var(--line);
    color: var(--muted);
  }

  .en-label {
    margin: 0 0 1rem;
    color: var(--muted);
  }

  .en ol li {
    font-size: 0.92rem;
  }

  .en ol li::before {
    background: transparent;
    color: var(--muted);
    border: 1px solid var(--line);
  }

  footer {
    max-width: 680px;
    margin: 0 auto;
    padding: 2rem 0 3rem;
    border-top: 1px solid var(--line);
  }

  footer p {
    margin: 0;
    font-family: 'Oswald', sans-serif;
    text-transform: uppercase;
    letter-spacing: 0.16em;
    font-size: 0.7rem;
    color: var(--muted);
  }

  @media (min-width: 720px) {
    .body {
      display: grid;
      grid-template-columns: 300px 1fr;
      gap: 2.25rem;
      align-items: start;
    }

    .frame {
      margin-bottom: 0;
    }

    .en {
      grid-column: 1 / -1;
    }
  }
</style>