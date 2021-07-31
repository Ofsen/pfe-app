import React from 'react';
import { List, ListItem, ListItemText } from '@material-ui/core';
import { NavLinkAdapter } from '@fuse';

function SidebarContent() {
	const menus = ['Accueil', 'Hébergement', 'Restauration', 'Transport', 'Bourses'];
	return (
		<div>
			<List dense={true}>
				{menus.length > 0 &&
					menus.map((label, index) => (
						<ListItem button component={NavLinkAdapter} to={'/services/' + label} key={index}>
							<ListItemText primary={label} disableTypography={true} />
						</ListItem>
					))}
			</List>
		</div>
	);
}

export default React.memo(SidebarContent);
