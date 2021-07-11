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
		{
			path: '/bus/:productId/:productHandle?',
			component: React.lazy(() => import('./Bus/Product')),
		},
		{
			path: '/bus',
			component: React.lazy(() => import('./Bus/Bus')),
		},
	],
};
