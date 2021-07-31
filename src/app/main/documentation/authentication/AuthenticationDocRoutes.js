import React from 'react';

export const AuthenticationDocRoutes = [
	{
		path: '/documentation/authentication/jwt',
		component: React.lazy(() => import('./jwt/jwtAuthDoc')),
	},
];
