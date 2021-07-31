import React from 'react';
import {Redirect} from 'react-router-dom';

export const CampusConfig = {
    settings: {
        layout: {}
    },
    routes  : [
        {
            path     : [
                '/hebergements/campus/label/:labelHandle/:mailId?',
                '/hebergements/campus/filter/:filterHandle/:mailId?',
                '/hebergements/campus/:folderHandle/:mailId?'
            ],
            component: React.lazy(() => import('./Campus'))
        },
        {
            path     : '/hebergements/campus',
            component: () => <Redirect to="/hebergements/campus/inbox"/>
        }
    ]
};
