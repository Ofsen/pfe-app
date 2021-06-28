import React from 'react';

export const BoursesConfig = {
	settings: {
		layout: {
			config: {},
		},
	},
	routes: [
		{
			path: '/bourse/:orderId',
			component: React.lazy(() => import('./Order')),
		},
		{
			path: '/bourses',
			component: React.lazy(() => import('./Bourses')),
		},
	],
};
