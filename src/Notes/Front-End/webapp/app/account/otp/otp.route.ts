import { Route } from '@angular/router';
import {OtpComponent} from './otp.component';

export const otpRoute: Route = {
    path: 'reset/otp',
    component: OtpComponent,
    data: {
        pageTitle: 'global.menu.account.reset'
    }
};
