import React from 'react';

export const ContactsAppConfig = {
	settings: {
		layout: {
			config: {},
		},
	},
	routes: [
		{
			path: '/hebergements/dossier/:id',
			component: React.lazy(() => import('./Bus')),
		},
		{
			path: '/hebergements/dossiers',
			component: React.lazy(() => import('./Bus')),
		},
	],
};
