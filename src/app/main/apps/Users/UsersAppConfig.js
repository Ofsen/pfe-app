import React from 'react';

export const UsersAppConfig = {
	settings: {
		layout: {
			config: {},
		},
	},
	routes: [
		{
			path: '/users/:id',
			component: React.lazy(() => import('./Users')),
		},
		{
			path: '/users',
			component: React.lazy(() => import('./Users')),
		},
	],
};
