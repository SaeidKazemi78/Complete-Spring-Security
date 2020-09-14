import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {JhiLanguageHelper} from 'app/core/language.helper';
import {JhiLanguageService} from 'ng-jhipster';
import {NiopdcgatewaySharedModule} from '../../../shared/index';
import {
    DayDepotServiceOilTankComponent,
    DayDepotServiceOilTankDeleteDialogComponent,
    DayDepotServiceOilTankDeletePopupComponent,
    DayDepotServiceOilTankDialogComponent,
    DayDepotServiceOilTankPopupComponent,
    dayDepotServiceOilTankPopupRoute,
    DayDepotServiceOilTankPopupService,
    DayDepotServiceOilTankResolvePagingParams,
    dayDepotServiceOilTankRoute,
    DayDepotServiceOilTankService,
    FullEndMeasurementDialogComponent,
    FullEndMeasurementPopupComponent,
} from './index';

const ENTITY_STATES = [
    ...dayDepotServiceOilTankRoute,
    ...dayDepotServiceOilTankPopupRoute,
];

@NgModule({
    imports: [
        NiopdcgatewaySharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        DayDepotServiceOilTankComponent,
        DayDepotServiceOilTankDialogComponent,
        DayDepotServiceOilTankDeleteDialogComponent,
        DayDepotServiceOilTankPopupComponent,
        DayDepotServiceOilTankDeletePopupComponent,
        FullEndMeasurementPopupComponent,
        FullEndMeasurementDialogComponent,
    ],
    entryComponents: [
        DayDepotServiceOilTankComponent,
        DayDepotServiceOilTankDialogComponent,
        DayDepotServiceOilTankPopupComponent,
        DayDepotServiceOilTankDeleteDialogComponent,
        DayDepotServiceOilTankDeletePopupComponent,
        FullEndMeasurementPopupComponent,
        FullEndMeasurementDialogComponent,
    ],
    providers: [
        DayDepotServiceOilTankService,
        DayDepotServiceOilTankPopupService,
        DayDepotServiceOilTankResolvePagingParams,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class NiopdcgatewayDayDepotServiceOilTankModule {
    constructor(private languageService: JhiLanguageService, private languageHelper: JhiLanguageHelper) {
        this.languageHelper.language.subscribe((languageKey: string) => {
            if (languageKey) {
                this.languageService.changeLanguage(languageKey);
            }
        });
    }
}
