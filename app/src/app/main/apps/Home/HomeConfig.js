import React from 'react';

export const HomeConfig = {
	settings: {
		layout: {
			config: {},
		},
	},
	routes: [
		{
			path: '/home',
			component: React.lazy(() => import('./Home')),
		},
	],
};
