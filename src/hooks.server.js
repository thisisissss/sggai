import { redirect } from '@sveltejs/kit';

const COOKIE = 'ab_variant';
const MAX_AGE = 60 * 60 * 24 * 90; // 90 days

export async function handle({ event, resolve }) {
	const { url, cookies } = event;

	// Manual override for your own testing: /?v=a or /?v=b
	const forced = url.searchParams.get('v');
	let variant = forced === 'a' || forced === 'b' ? forced : cookies.get(COOKIE);

	if (variant !== 'a' && variant !== 'b') {
		variant = Math.random() < 0.5 ? 'a' : 'b';
	}

	// httpOnly:false so the client-side track() helper can read it
	cookies.set(COOKIE, variant, {
		path: '/',
		maxAge: MAX_AGE,
		httpOnly: false,
		sameSite: 'lax',
		secure: true
	});

	if (url.pathname === '/' && variant === 'b' && forced !== 'a') {
		redirect(302, '/install');
	}

	return resolve(event);
}
