import { sequence } from '@sveltejs/kit/hooks';

async function SSRAll({ event, resolve }) {
	const response = await resolve(event, {
		ssr: false
	});

	return response;
}

export const handle = sequence(SSRAll);