const navigationConfig = [
    {
		id: 'menu',
		title: 'Menu',
		type: 'group',
		icon: 'apps',
		children: [
			{
				id: 'chambres',
				title: 'List Des Chambres',
				type: 'item',
				icon: 'person',
				url: '_blank',
			},
			{
				id: 'restauration',
				title: 'Restauration',
				type: 'item',
				icon: 'fastfood',
				url: '_blank',
			},
			{
				id: 'bourse',
				title: 'Bourse',
				type: 'item',
				icon: 'attach_money',
				url: '/apps/bourses',
			},
			{
				id: 'transport',
				title: 'Transport',
				type: 'item',
				icon: 'directions_bus',
				url: '_blank',
			},
		],
	},
    {
        'id'      : 'applications',
        'title'   : 'Applications',
        'type'    : 'group',
        'icon'    : 'apps',
        'children': [
            {
                'id'   : 'example-component',
                'title': 'Example',
                'type' : 'item',
                'icon' : 'whatshot',
                'url'  : '/example'
            }
        ]
    },
];

export default navigationConfig;
