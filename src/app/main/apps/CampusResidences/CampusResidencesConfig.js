import React from 'react';

export const CampusResidencesConfig = {
	settings: {
		layout: {
			config: {},
		},
	},
	routes: [
		{
			path: '/campus',
			component: React.lazy(() => import('./CampusResidences')),
		},
	],
};
