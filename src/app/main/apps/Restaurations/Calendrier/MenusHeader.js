import React from 'react';
import {
	withStyles,
	Icon,
	Button,
	IconButton,
	Tooltip,
	Typography,
	FormControl,
	InputLabel,
	OutlinedInput,
	MenuItem,
	Select,
} from '@material-ui/core';
import { ThemeProvider } from '@material-ui/styles';
import Toolbar from 'react-big-calendar/lib/Toolbar';
import { navigate } from 'react-big-calendar/lib/utils/constants';
import connect from 'react-redux/es/connect/connect';
import clsx from 'clsx';
import moment from 'moment';
import IngredientsInvoiceDialog from './IngredientsInvoiceDialog';
import { FuseUtils } from '@fuse';
import { authRoles } from 'app/auth';

const styles = (theme) => ({
	root: {
		backgroundImage: 'url("../../assets/images/backgrounds/header-bg.png")',
		backgroundColor: '#FAFAFA',
		color: '#FFFFFF',
		backgroundSize: 'cover',
		backgroundPosition: '0 50%',
		backgroundRepeat: 'no-repeat',
		'&:before': {
			content: "''",
			position: 'absolute',
			top: 0,
			right: 0,
			bottom: 0,
			left: 0,
			zIndex: 1,
			background: 'rgba(0, 0, 0, 0.45)',
		},
		'&.Jan': {
			backgroundImage: "url('/assets/images/calendar/winter.jpg')",
			backgroundPosition: '0 85%',
		},
		'&.Feb': {
			backgroundImage: "url('/assets/images/calendar/winter.jpg')",
			backgroundPosition: '0 85%',
		},
		'&.Mar': {
			backgroundImage: "url('/assets/images/calendar/spring.jpg')",
			backgroundPosition: '0 40%',
		},
		'&.Apr': {
			backgroundImage: "url('/assets/images/calendar/spring.jpg')",
			backgroundPosition: '0 40%',
		},
		'&.May': {
			backgroundImage: "url('/assets/images/calendar/spring.jpg')",
			backgroundPosition: '0 40%',
		},
		'&.Jun': {
			backgroundImage: "url('/assets/images/calendar/summer.jpg')",
			backgroundPosition: '0 80%',
		},
		'&.Jul': {
			backgroundImage: "url('/assets/images/calendar/summer.jpg')",
			backgroundPosition: '0 80%',
		},
		'&.Aug': {
			backgroundImage: "url('/assets/images/calendar/summer.jpg')",
			backgroundPosition: '0 80%',
		},
		'&.Sep': {
			backgroundImage: "url('/assets/images/calendar/autumn.jpg')",
			backgroundPosition: '0 40%',
		},
		'&.Oct': {
			backgroundImage: "url('/assets/images/calendar/autumn.jpg')",
			backgroundPosition: '0 40%',
		},
		'&.Nov': {
			backgroundImage: "url('/assets/images/calendar/autumn.jpg')",
			backgroundPosition: '0 40%',
		},
		'&.Dec': {
			backgroundImage: "url('/assets/images/calendar/winter.jpg')",
			backgroundPosition: '0 85%',
		},
	},
});

const viewNamesObj = {
	month: {
		title: 'Mois',
		icon: 'view_module',
	},
	week: {
		title: 'Semaine',
		icon: 'view_week',
	},
	work_week: {
		title: 'Jour de travail',
		icon: 'view_array',
	},
	day: {
		title: 'Jour',
		icon: 'view_day',
	},
	agenda: {
		title: 'Agenda',
		icon: 'view_agenda',
	},
};

class MenusHeader extends Toolbar {
	viewButtons() {
		let viewNames = this.props.views;
		const view = this.props.view;

		if (viewNames.length > 1) {
			return viewNames.map((name) => (
				<Tooltip title={viewNamesObj[name].title} key={name}>
					<div>
						<IconButton aria-label={name} onClick={() => this.props.onView(name)} disabled={view === name}>
							<Icon>{viewNamesObj[name].icon}</Icon>
						</IconButton>
					</div>
				</Tooltip>
			));
		}
	}

	render() {
		const {
			classes,
			mainThemeDark,
			label,
			date,
			restos,
			setSelectedResto,
			selectedResto,
			setOpenInvoice,
			openInvoice,
			userRole,
		} = this.props;

		return (
			<React.Fragment>
				<ThemeProvider theme={mainThemeDark}>
					<div
						className={clsx(classes.root, 'flex h-200 min-h-200 relative', moment(date).locale('en').format('MMM'))}
					>
						<div className='flex flex-1 flex-col p-12 justify-between z-10 container'>
							<div className='flex flex-col items-center justify-between sm:flex-row'>
								<div className='flex items-center my-16 sm:mb-0'>
									<Icon className='text-32 mx-12'>fastfood</Icon>
									<Typography variant='h6'>Calendrier des menus</Typography>
								</div>

								<FormControl className='flex items-center my-16 sm:mb-0 w-2/6' variant='outlined'>
									<InputLabel htmlFor='freq-label-placeholder'>Restaurant</InputLabel>

									<Select
										className='w-full'
										value={selectedResto === null ? '' : selectedResto}
										onChange={(value) => setSelectedResto(value.target.value)}
										input={
											<OutlinedInput
												labelWidth={'Restaurant'.length * 7.5}
												name='freq'
												id='freq-label-placeholder'
											/>
										}
									>
										<MenuItem value={null}>
											<em>Selectionner un réstaurant</em>
										</MenuItem>

										{restos !== null &&
											restos.map((e, i) => (
												<MenuItem value={e.id_restaurant} key={i}>
													{e.nom}
												</MenuItem>
											))}
									</Select>
								</FormControl>

								<div className='flex items-center'>
									<Tooltip title="Aujourd'hui">
										<div>
											<IconButton aria-label='today' onClick={this.navigate.bind(null, navigate.TODAY)}>
												<Icon>today</Icon>
											</IconButton>
										</div>
									</Tooltip>
									{this.viewButtons()}
								</div>
							</div>
							<div className='flex items-center justify-center'>
								{FuseUtils.hasPermission(authRoles.staff, userRole) && (
									<Button
										variant='contained'
										color='secondary'
										type='submit'
										className='mx-12 py-8 px-28'
										onClick={() => setOpenInvoice(true)}
									>
										<Icon className='mr-12'>assignment</Icon>
										Details
									</Button>
								)}
								<div className='flex w-full items-center justify-center mr-64'>
									<Tooltip title='Previous'>
										<IconButton aria-label='Previous' onClick={this.navigate.bind(null, navigate.PREVIOUS)}>
											<Icon>chevron_left</Icon>
										</IconButton>
									</Tooltip>
									<Typography variant='h6'>{label}</Typography>
									<Tooltip title='Next'>
										<IconButton aria-label='Next' onClick={this.navigate.bind(null, navigate.NEXT)}>
											<Icon>chevron_right</Icon>
										</IconButton>
									</Tooltip>
								</div>
							</div>
						</div>
					</div>
				</ThemeProvider>
				<IngredientsInvoiceDialog openInvoice={openInvoice} setOpenInvoice={setOpenInvoice} />
			</React.Fragment>
		);
	}
}

function mapStateToProps({ fuse }) {
	return {
		mainThemeDark: fuse.settings.mainThemeDark,
	};
}

export default connect(mapStateToProps)(withStyles(styles, { withTheme: true })(MenusHeader));
