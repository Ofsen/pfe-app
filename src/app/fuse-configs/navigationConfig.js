const navigationConfig = [
	{
		id: 'home',
		title: 'Accueil',
		type: 'item',
		icon: 'home',
		url: '/home',
	},
	{
		id: 'applications',
		title: 'Applications',
		type: 'group',
		icon: 'apps',
		children: [
			{
				id: 'hebergements',
				title: 'Hébergement',
				type: 'item',
				icon: 'person',
				url: '/hebergements',
			},
			{
				id: 'restaurations',
				title: 'Restauration',
				type: 'item',
				icon: 'fastfood',
				url: '/restaurations',
			},
			{
				id: 'transports',
				title: 'Transport',
				type: 'item',
				icon: 'directions_bus',
				url: '/transports',
			},
			{
				id: 'bourses',
				title: 'Bourse',
				type: 'item',
				icon: 'attach_money',
				url: '/bourses',
			},
		],
	},
];

export default navigationConfig;
