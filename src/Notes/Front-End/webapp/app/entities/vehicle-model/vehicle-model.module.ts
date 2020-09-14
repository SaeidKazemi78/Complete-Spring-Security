import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { NiopdcgatewaySharedModule } from '../../shared';
import {
    VehicleModelService,
    VehicleModelPopupService,
    VehicleModelComponent,
    VehicleModelDialogComponent,
    VehicleModelPopupComponent,
    VehicleModelDeletePopupComponent,
    VehicleModelDeleteDialogComponent,
    vehicleModelRoute,
    vehicleModelPopupRoute,
    VehicleModelResolvePagingParams,
} from './';
import {JhiLanguageService} from 'ng-jhipster';
import {JhiLanguageHelper} from 'app/core/language.helper';
import {
    VehicleModelConfirmDialogComponent,
    VehicleModelConfirmPopupComponent
} from "app/entities/vehicle-model/vehicle-model-confirm-dialog.component";

const ENTITY_STATES = [
    ...vehicleModelRoute,
    ...vehicleModelPopupRoute,
];

@NgModule({
    imports: [
        NiopdcgatewaySharedModule,
            RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        VehicleModelComponent,
        VehicleModelDialogComponent,
        VehicleModelDeleteDialogComponent,
        VehicleModelPopupComponent,
        VehicleModelDeletePopupComponent,
        VehicleModelConfirmDialogComponent,
        VehicleModelConfirmPopupComponent,
    ],
    entryComponents: [
        VehicleModelComponent,
        VehicleModelDialogComponent,
        VehicleModelPopupComponent,
        VehicleModelDeleteDialogComponent,
        VehicleModelDeletePopupComponent,
        VehicleModelConfirmDialogComponent,
        VehicleModelConfirmPopupComponent,
    ],
    providers: [
        VehicleModelService,
        VehicleModelPopupService,
        VehicleModelResolvePagingParams,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class NiopdcgatewayVehicleModelModule {
    constructor(private languageService: JhiLanguageService, private languageHelper: JhiLanguageHelper) {
        this.languageHelper.language.subscribe((languageKey: string) => {
            if (languageKey) {
                this.languageService.changeLanguage(languageKey);
            }
        });
    }
}
