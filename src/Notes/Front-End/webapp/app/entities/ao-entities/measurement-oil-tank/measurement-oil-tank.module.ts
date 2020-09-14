import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {JhiLanguageHelper} from 'app/core/language.helper';
import {JhiLanguageService} from 'ng-jhipster';
import {NiopdcgatewaySharedModule} from '../../../shared/index';
import {
    MeasurementOilTankComponent,
    MeasurementOilTankDeleteDialogComponent,
    MeasurementOilTankDeletePopupComponent,
    MeasurementOilTankDialogComponent,
    MeasurementOilTankPopupComponent,
    measurementOilTankPopupRoute,
    MeasurementOilTankPopupService,
    MeasurementOilTankResolvePagingParams,
    measurementOilTankRoute,
    MeasurementOilTankService,
} from './index';

const ENTITY_STATES = [
    ...measurementOilTankRoute,
    ...measurementOilTankPopupRoute,
];

@NgModule({
    imports: [
        NiopdcgatewaySharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        MeasurementOilTankComponent,
        MeasurementOilTankDialogComponent,
        MeasurementOilTankDeleteDialogComponent,
        MeasurementOilTankPopupComponent,
        MeasurementOilTankDeletePopupComponent,
    ],
    entryComponents: [
        MeasurementOilTankComponent,
        MeasurementOilTankDialogComponent,
        MeasurementOilTankPopupComponent,
        MeasurementOilTankDeleteDialogComponent,
        MeasurementOilTankDeletePopupComponent,
    ],
    providers: [
        MeasurementOilTankService,
        MeasurementOilTankPopupService,
        MeasurementOilTankResolvePagingParams,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class NiopdcgatewayMeasurementOilTankModule {
    constructor(private languageService: JhiLanguageService, private languageHelper: JhiLanguageHelper) {
        this.languageHelper.language.subscribe((languageKey: string) => {
            if (languageKey) {
                this.languageService.changeLanguage(languageKey);
            }
        });
    }
}
