import React from 'react';

export const BoursesConfig = {
    settings: {
        layout: {
            config: {}
        }
    },
    routes  : [
        {
            path     : '/bourses',
            component: React.lazy(() => import('./Bourses'))
        }
    ]
};
