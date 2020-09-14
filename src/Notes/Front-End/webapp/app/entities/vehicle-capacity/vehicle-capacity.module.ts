import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { NiopdcgatewaySharedModule } from '../../shared';
import {
    VehicleCapacityService,
    VehicleCapacityPopupService,
    VehicleCapacityComponent,
    VehicleCapacityDialogComponent,
    VehicleCapacityPopupComponent,
    VehicleCapacityDeletePopupComponent,
    VehicleCapacityDeleteDialogComponent,
    vehicleCapacityRoute,
    vehicleCapacityPopupRoute,
    VehicleCapacityResolvePagingParams,
} from './';
import {JhiLanguageService} from 'ng-jhipster';
import {JhiLanguageHelper} from 'app/core/language.helper';

const ENTITY_STATES = [
    ...vehicleCapacityRoute,
    ...vehicleCapacityPopupRoute,
];

@NgModule({
    imports: [
        NiopdcgatewaySharedModule,
            RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        VehicleCapacityComponent,
        VehicleCapacityDialogComponent,
        VehicleCapacityDeleteDialogComponent,
        VehicleCapacityPopupComponent,
        VehicleCapacityDeletePopupComponent,
    ],
    entryComponents: [
        VehicleCapacityComponent,
        VehicleCapacityDialogComponent,
        VehicleCapacityPopupComponent,
        VehicleCapacityDeleteDialogComponent,
        VehicleCapacityDeletePopupComponent,
    ],
    providers: [
        VehicleCapacityService,
        VehicleCapacityPopupService,
        VehicleCapacityResolvePagingParams,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class NiopdcgatewayVehicleCapacityModule {
    constructor(private languageService: JhiLanguageService, private languageHelper: JhiLanguageHelper) {
        this.languageHelper.language.subscribe((languageKey: string) => {
            if (languageKey) {
                this.languageService.changeLanguage(languageKey);
            }
        });
    }
}
