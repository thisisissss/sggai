export async function onRequest(context) {
  const { request, next } = context;
  const url = new URL(request.url);

  const cookie = request.headers.get('cookie') || '';
  const m = cookie.match(/(?:^|;\s*)ab_variant=([ab])/);
  const forced = url.searchParams.get('v');

  let variant = forced === 'a' || forced === 'b' ? forced : m ? m[1] : null;
  if (variant !== 'a' && variant !== 'b') {
    variant = Math.random() < 0.5 ? 'a' : 'b';
  }

  const setCookie = `ab_variant=${variant}; Path=/; Max-Age=7776000; SameSite=Lax; Secure`;

  if (url.pathname === '/' && variant === 'b' && forced !== 'a') {
    return new Response(null, {
      status: 302,
      headers: { Location: '/install', 'Set-Cookie': setCookie }
    });
  }

  const res = await next();
  const out = new Response(res.body, res);
  out.headers.append('Set-Cookie', setCookie);
  return out;
}
