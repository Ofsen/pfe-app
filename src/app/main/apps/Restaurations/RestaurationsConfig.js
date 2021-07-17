import React from 'react';

export const RestaurationsConfig = {
	settings: {
		layout: {
			config: {},
		},
	},
	routes: [
		{
			path: '/restaurations/calendrier',
			component: React.lazy(() => import('./Calendrier/Calendrier')),
		},
		{
			path: '/restaurations/menus',
			component: React.lazy(() => import('./Menus/Menus')),
		},
		{
			path: '/restaurations/ingredients',
			component: React.lazy(() => import('./Ingredients/Ingredients')),
		},
	],
};
