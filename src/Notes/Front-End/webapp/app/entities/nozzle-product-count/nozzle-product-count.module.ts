import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { NiopdcgatewaySharedModule } from '../../shared';
import {
    NozzleProductCountService
} from './';

@NgModule({
    imports: [
    ],
    declarations: [

    ],
    entryComponents: [

    ],
    providers: [
        NozzleProductCountService

    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class NiopdcgatewayNozzleProductCountModule {}
