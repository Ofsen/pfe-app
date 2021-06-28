import React from 'react';

export const HebergementsConfig = {
	settings: {
		layout: {},
	},
	routes: [
		{
            path     : '/hebergements/chambre/:productId?',
            component: React.lazy(() => import('./Product'))
        },
		{
			path: [
				'/hebergements/label/:labelHandle/:todoId?',
				'/hebergements/filter/:filterHandle/:todoId?',
				'/hebergements/:folderHandle/:todoId?',
			],
			component: React.lazy(() => import('./Hebergements')),
		},
		{
			path: '/hebergements',
			component: React.lazy(() => import('./Hebergements')),
		},
	],
};
