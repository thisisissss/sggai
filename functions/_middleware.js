/**
 * Cloudflare Pages edge middleware — A/B split between the main page (variant A)
 * and /install (variant B).
 *
 * Bots are deliberately excluded: coin-flipping crawlers between / and /install
 * produces unstable indexing and pollutes the experiment with non-human traffic.
 * Bots always get variant A at the canonical URL, and never receive a cookie.
 */

const COOKIE = 'ab_variant';
const MAX_AGE = 7776000; // 90 days

// Search engines, social/link-preview scrapers, AI crawlers, SEO and audit tools.
const BOT_UA = new RegExp(
  [
    'bot', 'crawl', 'spider', 'slurp', 'archiver', 'monitor', 'preview',
    'facebookexternalhit', 'whatsapp', 'telegram', 'skypeuripreview',
    'line-poker', 'linespider', 'discord', 'embedly', 'quora link',
    'vkshare', 'pinterest', 'tumblr', 'nuzzel', 'outbrain',
    'gptbot', 'oai-searchbot', 'chatgpt-user', 'claudebot', 'claude-web',
    'anthropic-ai', 'perplexity', 'youbot', 'ccbot', 'diffbot',
    'lighthouse', 'pagespeed', 'headlesschrome', 'chrome-lighthouse',
    'ahrefs', 'semrush', 'mj12', 'dotbot', 'dataforseo', 'screaming frog'
  ].join('|'),
  'i'
);

function isBot(request) {
  const ua = request.headers.get('user-agent') || '';
  if (!ua) return true; // no UA at all — treat as a bot, not a coin flip
  return BOT_UA.test(ua);
}

// Don't bother tagging asset requests with a cookie.
function isAsset(pathname) {
  return pathname.startsWith('/_app/') || /\.[a-z0-9]+$/i.test(pathname);
}

export async function onRequest(context) {
  const { request, next } = context;
  const url = new URL(request.url);

  // Bots: never split, never redirect, never set a cookie.
  if (isBot(request)) {
    return next();
  }

  const cookie = request.headers.get('cookie') || '';
  const m = cookie.match(new RegExp(`(?:^|;\\s*)${COOKIE}=([ab])`));
  const forced = url.searchParams.get('v');

  let variant = forced === 'a' || forced === 'b' ? forced : m ? m[1] : null;
  if (variant !== 'a' && variant !== 'b') {
    variant = Math.random() < 0.5 ? 'a' : 'b';
  }

  const setCookie = `${COOKIE}=${variant}; Path=/; Max-Age=${MAX_AGE}; SameSite=Lax; Secure`;

  if (url.pathname === '/' && variant === 'b' && forced !== 'a') {
    return new Response(null, {
      status: 302,
      headers: { Location: '/install', 'Set-Cookie': setCookie }
    });
  }

  const res = await next();
  if (isAsset(url.pathname)) return res;

  const out = new Response(res.body, res);
  out.headers.append('Set-Cookie', setCookie);
  return out;
}