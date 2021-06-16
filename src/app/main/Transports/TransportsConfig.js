import React from 'react';

export const TransportsConfig = {
	settings: {
		layout: {
			config: {},
		},
	},
	routes: [
		{
			path: '/transports',
			component: React.lazy(() => import('./Transports')),
		},
	],
};
