import React from 'react';
import {Redirect} from 'react-router-dom';

export const ContactsAppConfig = {
    settings: {
        layout: {
            config: {}
        }
    },
    routes  : [
        {
            path     : '/hebergements/campus/:id',
            component: React.lazy(() => import('./ContactsApp'))
        },
        {
            path     : '/hebergements/campus',
            component: React.lazy(() => import('./ContactsApp'))
        }
    ]
};
