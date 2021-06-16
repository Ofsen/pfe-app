import React from 'react';

export const HebergementsConfig = {
	settings: {
		layout: {
			config: {},
		},
	},
	routes: [
		{
			path: '/hebergements',
			component: React.lazy(() => import('./Hebergements')),
		},
	],
};
