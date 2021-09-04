import React from 'react';
import { Redirect } from 'react-router-dom';

export const BoursesConfig = {
	settings: {
		layout: {},
	},
	routes: [
		{
			path: '/bourses/dossiers/:dossierBourseId',
			component: React.lazy(() => import('./DossierBourse')),
		},
		{
			path: '/bourses/dossiers',
			component: React.lazy(() => import('./DossiersBourse')),
		},
		{
			path: '/bourses',
			component: () => <Redirect to='/bourses/dossiers' />,
		},
	],
};
