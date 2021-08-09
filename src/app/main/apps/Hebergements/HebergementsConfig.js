import React from 'react';
import { Redirect } from 'react-router-dom';

export const HebergementsConfig = {
	settings: {
		layout: {},
	},
	routes: [
		{
			path: '/hebergements/chambre/:chambreId?',
			component: React.lazy(() => import('./Chambres/Chambre')),
		},
		{
			path: [
				'/hebergements/chambres/label/:labelHandle/:todoId?',
				'/hebergements/chambres/filter/:filterHandle/:todoId?',
				'/hebergements/chambres/:folderHandle/:todoId?',
			],
			component: React.lazy(() => import('./Chambres/Chambres')),
		},
		{
			path: '/hebergements/chambres',
			component: React.lazy(() => import('./Chambres/Chambres')),
		},
		{
			path: '/hebergements/dossiers/:dossierId',
			component: React.lazy(() => import('./Dossiers/Dossier')),
		},
		{
			path: '/hebergements/dossiers',
			component: React.lazy(() => import('./Dossiers/Dossiers')),
		},
		{
			path: '/hebergements',
			component: () => <Redirect to='/hebergements/chambres' />,
		},
	],
};
