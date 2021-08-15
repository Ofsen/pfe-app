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
			component: React.lazy(() => import('./Calendrier/Transports')),
		},
		{
			path: '/bus',
			component: React.lazy(() => import('./Bus/Bus')),
		},
	],
};
