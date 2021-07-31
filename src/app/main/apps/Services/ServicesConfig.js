import React from 'react';

export const ServicesConfig = {
	settings: {
		layout: {
			config: {},
		},
	},
	routes: [
		{
			path: ['/services/:label', '/services'],
			component: React.lazy(() => import('./Services')),
		},
	],
};
