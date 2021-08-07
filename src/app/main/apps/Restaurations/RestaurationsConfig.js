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
			component: React.lazy(() => import('./Calendrier/Menus')),
		},
		{
			path: '/restaurations/restaurants',
			component: React.lazy(() => import('./Restos/Restos')),
		},
		{
			path: '/restaurations/plats-desserts',
			component: React.lazy(() => import('./Plats&Desserts/Menus')),
		},
		{
			path: '/restaurations/ingredients',
			component: React.lazy(() => import('./Ingredients/Ingredients')),
		},
	],
};
