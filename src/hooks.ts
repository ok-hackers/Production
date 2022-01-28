import { sequence } from '@sveltejs/kit/hooks';

async function SSRHomepage({ event, resolve }) {
	const response = await resolve(event, {
		ssr: !event.url.pathname.startsWith('/homePage')
	});

	return response;
}

async function SSRlogin({ event, resolve }) {
	const response = await resolve(event, {
		ssr: !event.url.pathname.startsWith('/login')
	});

	return response;
}

export const handle = sequence(SSRHomepage, SSRlogin);