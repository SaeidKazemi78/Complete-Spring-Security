import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {JhiLanguageHelper} from 'app/core/language.helper';
import {JhiLanguageService} from 'ng-jhipster';
import {NiopdcgatewaySharedModule} from '../../../shared';
import {
    AirportComponent,
    AirportDeleteDialogComponent,
    AirportDeletePopupComponent,
    AirportDialogComponent,
    AirportPopupComponent,
    airportPopupRoute,
    AirportPopupService,
    AirportResolvePagingParams,
    airportRoute,
    AirportService,
} from './index';

const ENTITY_STATES = [
    ...airportRoute,
    ...airportPopupRoute,
];

@NgModule({
    imports: [
        NiopdcgatewaySharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        AirportComponent,
        AirportDialogComponent,
        AirportDeleteDialogComponent,
        AirportPopupComponent,
        AirportDeletePopupComponent,
    ],
    entryComponents: [
        AirportComponent,
        AirportDialogComponent,
        AirportPopupComponent,
        AirportDeleteDialogComponent,
        AirportDeletePopupComponent,
    ],
    providers: [
        AirportService,
        AirportPopupService,
        AirportResolvePagingParams,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class NiopdcgatewayAirportModule {
    constructor(private languageService: JhiLanguageService, private languageHelper: JhiLanguageHelper) {
        this.languageHelper.language.subscribe((languageKey: string) => {
            if (languageKey) {
                this.languageService.changeLanguage(languageKey);
            }
        });
    }
}
