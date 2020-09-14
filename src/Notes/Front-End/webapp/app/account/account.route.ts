import { Routes } from '@angular/router';

import {
    activateRoute,
    passwordRoute,

    passwordResetFinishRoute,
    passwordResetInitRoute,
    registerRoute,
    settingsRoute
} from './';
import {otpRoute} from './otp/otp.route';

const ACCOUNT_ROUTES = [
    activateRoute,
    passwordRoute,
    otpRoute,
    passwordResetFinishRoute,
    passwordResetInitRoute,
    registerRoute,
    settingsRoute
];

export const accountState: Routes = [{
    path: '',
    children: ACCOUNT_ROUTES
}];
