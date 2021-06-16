import React from 'react';
import { Redirect } from 'react-router-dom';
import { FuseUtils } from '@fuse';
import { BoursesConfig } from 'app/main/Bourses/BoursesConfig';
import { HebergementsConfig } from 'app/main/Hebergements/HebergementsConfig';
import { TransportsConfig } from 'app/main/Transports/TransportsConfig';
import { RestaurationsConfig } from 'app/main/Restaurations/RestaurationsConfig';
import { HomeConfig } from 'app/main/Home/HomeConfig';

const routeConfigs = [BoursesConfig, HebergementsConfig, TransportsConfig, RestaurationsConfig, HomeConfig];

const routes = [
	...FuseUtils.generateRoutesFromConfigs(routeConfigs),
	{
		path: '/',
		component: () => <Redirect to='/home' />,
	},
];

export default routes;
