import React from 'react';
import { Redirect } from 'react-router-dom';

export const BoursesConfigApp = {
	settings: {
		layout: {},
	},
	routes: [
		{
			path: '/apps/bourses',
			component: React.lazy(() => import('./Bourses')),
		},
		{
			path: '/apps/bourses',
			component: () => <Redirect to='/apps/bourses' />,
		},
	],
};
