import {Route} from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { SettingsComponent } from './settings.component';

export const settingsRoute: Route =  {
    path: 'settings',
    component: SettingsComponent,
    data: {
        authorities: ['CHANGE_USER_INFO', 'ROLE_ADMIN'],
        pageTitle: 'global.menu.account.settings'
    },
    canActivate: [UserRouteAccessService]
};

/*, {
    path: 'settings/:force',
    component: SettingsComponent,
    data: {
        authorities: ['CHANGE_USER_INFO', 'ROLE_ADMIN'],
        pageTitle: 'global.menu.account.settings'
    },
    canActivate: [UserRouteAccessService]
}]*/
