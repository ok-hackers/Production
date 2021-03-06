/*
    Author: Nate Fabian
    Date: 1/18/22
    Purpose: Example of how to make a rest API in svelte
*/

export async function get({ params }) {
	let { slug } = params;

	let returnObj;

	switch (slug) {
		case '1': {
			returnObj = {
				body: {
					Number: 1
				}
			};
			break;
		}
		case '2': {
			returnObj = {
				body: {
					Number: 2
				}
			};
			break;
		}
		case '3': {
			returnObj = {
				body: {
					Number: 3
				}
			};
			break;
		}
		case '4': {
			returnObj = {
				body: {
					Number: 4
				}
			};
			break;
		}
		default: {
			returnObj = {
				body: {
					Number: 'We have no idea'
				}
			};
			break;
		}
	}

	return returnObj;
}
