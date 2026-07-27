<script>
  /**
   * Every page's head tags in one place.
   * Usage:  <Seo title="…" description="…" path="/resources" />
   */
  export let title;
  export let description;
  export let path = "/";
  export let image = "https://media.sustainablegreengold.com/og/og-cover.jpg";
  /** Point a variant / duplicate page at its canonical URL. */
  export let canonicalPath = null;

  const SITE = "https://sustainablegreengold.com";
  $: url = `${SITE}${canonicalPath ?? path}`;
</script>

<svelte:head>
  <title>{title}</title>
  <meta name="description" content={description} />
  <link rel="canonical" href={url} />

  <!-- Open Graph — Facebook, LINE, Telegram, Slack, WhatsApp -->
  <meta property="og:type" content="website" />
  <meta property="og:site_name" content="Sustainable Green Gold AI" />
  <meta property="og:title" content={title} />
  <meta property="og:description" content={description} />
  <meta property="og:url" content={url} />
  <meta property="og:image" content={image} />
  <meta property="og:image:width" content="1200" />
  <meta property="og:image:height" content="630" />
  <meta property="og:locale" content="en_US" />
  <meta property="og:locale:alternate" content="th_TH" />

  <!-- Twitter / X -->
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content={title} />
  <meta name="twitter:description" content={description} />
  <meta name="twitter:image" content={image} />
</svelte:head>