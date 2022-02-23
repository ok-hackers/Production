/*
    Author: Nate Fabian
    Date: 1/27/22
    Purpose: Svelte internal function hook to prevent server side rendering for firebase support
*/

import { sequence } from '@sveltejs/kit/hooks';

async function SSRAll({ event, resolve }) {
	const response = await resolve(event, {
		ssr: false
	});
	return response;
}
export const handle = sequence(SSRAll);
