import {Routes} from '@angular/router';

import {UserRouteAccessService} from '../../shared';
import {UserRegisterDialogComponent} from 'app/entities/user-register/user-register-dialog.component';

export const userRequestRoute: Routes = [
    {
        path: 'register',
        component: UserRegisterDialogComponent,
        data: {
            pageTitle: 'userManagement.home.title'
        }
    },
    {
        path: ':login/register',
        component: UserRegisterDialogComponent,
        data: {
            pageTitle: 'userManagement.home.title'
        }
    },
    {
        path: ':code/edit-register',
        component: UserRegisterDialogComponent,
        data: {
            pageTitle: 'userManagement.home.title'
        }
    }
];
