import { startDevServer } from '@cypress/vite-dev-server';
import path from 'path';

module.exports = (on, config) => {
	on('dev-server:start', async (options) => {
		return startDevServer({
			options,
			viteConfig: {
				configFile: path.resolve(__dirname, '..', '..', 'vite.config.js')
			}
		});
	});
	require('@cypress/code-coverage/task')(on, config);

	return config;
};
