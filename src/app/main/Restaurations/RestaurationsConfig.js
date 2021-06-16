import React from 'react';

export const RestaurationsConfig = {
    settings: {
        layout: {
            config: {}
        }
    },
    routes  : [
        {
            path     : '/restaurations',
            component: React.lazy(() => import('./Restaurations'))
        }
    ]
};
