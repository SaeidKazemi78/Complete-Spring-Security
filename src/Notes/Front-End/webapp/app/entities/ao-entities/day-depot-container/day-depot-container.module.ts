import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {JhiLanguageHelper} from 'app/core/language.helper';
import {JhiLanguageService} from 'ng-jhipster';
import {NiopdcgatewaySharedModule} from '../../../shared/index';
import {
    DayDepotContainerComponent,
    DayDepotContainerDeleteDialogComponent,
    DayDepotContainerDeletePopupComponent,
    DayDepotContainerDialogComponent,
    DayDepotContainerPopupComponent,
    dayDepotContainerPopupRoute,
    DayDepotContainerPopupService,
    DayDepotContainerResolvePagingParams,
    dayDepotContainerRoute,
    DayDepotContainerService,
    FullEndMeasurementDialogComponent,
    FullEndMeasurementPopupComponent
} from './index';

const ENTITY_STATES = [
    ...dayDepotContainerRoute,
    ...dayDepotContainerPopupRoute,
];

@NgModule({
    imports: [
        NiopdcgatewaySharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        DayDepotContainerComponent,
        DayDepotContainerDialogComponent,
        DayDepotContainerDeleteDialogComponent,
        DayDepotContainerPopupComponent,
        DayDepotContainerDeletePopupComponent,
        FullEndMeasurementDialogComponent,
        FullEndMeasurementPopupComponent
    ],
    entryComponents: [
        DayDepotContainerComponent,
        DayDepotContainerDialogComponent,
        DayDepotContainerPopupComponent,
        DayDepotContainerDeleteDialogComponent,
        DayDepotContainerDeletePopupComponent,
        FullEndMeasurementDialogComponent,
        FullEndMeasurementPopupComponent
    ],
    providers: [
        DayDepotContainerService,
        DayDepotContainerPopupService,
        DayDepotContainerResolvePagingParams,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class NiopdcgatewayDayDepotContainerModule {
    constructor(private languageService: JhiLanguageService, private languageHelper: JhiLanguageHelper) {
        this.languageHelper.language.subscribe((languageKey: string) => {
            if (languageKey) {
                this.languageService.changeLanguage(languageKey);
            }
        });
    }
}
