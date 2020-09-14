import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {JhiLanguageHelper} from 'app/core/language.helper';
import {JhiLanguageService} from 'ng-jhipster';
import {NiopdcgatewaySharedModule} from '../../../shared/index';
import {
    DayDepotComponent,
    DayDepotDeleteDialogComponent,
    DayDepotDeletePopupComponent,
    DayDepotDialogComponent,
    DayDepotPopupComponent,
    dayDepotPopupRoute,
    DayDepotPopupService,
    DayDepotResolvePagingParams,
    dayDepotRoute,
    DayDepotService,
    FullEndMeasurementDialogComponent,
    FullEndMeasurementPopupComponent,
} from './index';
import {NiopdcgatewayTransferDirtyPopupModule} from "app/entities/ao-entities/transfer/transfer-dirty-popup.module";
import {NiopdcgatewayMainAuthorityModule} from "app/entities/main-authority/main-authority.module";

const ENTITY_STATES = [
    ...dayDepotRoute,
    ...dayDepotPopupRoute,
];

@NgModule({
    imports: [
        NiopdcgatewaySharedModule,
        NiopdcgatewayTransferDirtyPopupModule,
        RouterModule.forChild(ENTITY_STATES),
        NiopdcgatewayMainAuthorityModule
    ],
    declarations: [
        DayDepotComponent,
        DayDepotDialogComponent,
        DayDepotDeleteDialogComponent,
        FullEndMeasurementPopupComponent,
        FullEndMeasurementDialogComponent,
        DayDepotPopupComponent,
        DayDepotDeletePopupComponent,
    ],
    entryComponents: [
        DayDepotComponent,
        DayDepotDialogComponent,
        DayDepotPopupComponent,
        DayDepotDeleteDialogComponent,
        DayDepotDeletePopupComponent,
        FullEndMeasurementPopupComponent,
        FullEndMeasurementDialogComponent,
    ],
    providers: [
        DayDepotService,
        DayDepotPopupService,
        DayDepotResolvePagingParams,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class NiopdcgatewayDayDepotModule {
    constructor(private languageService: JhiLanguageService, private languageHelper: JhiLanguageHelper) {
        this.languageHelper.language.subscribe((languageKey: string) => {
            if (languageKey) {
                this.languageService.changeLanguage(languageKey);
            }
        });
    }
}
