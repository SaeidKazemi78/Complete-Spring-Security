import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { NiopdcgatewaySharedModule } from '../../shared';
import {
    CustomerStationInfoService,
    CustomerStationInfoPopupService,
    CustomerStationInfoDialogComponent,
    CustomerStationInfoPopupComponent,
    customerStationInfoRoute,
    customerStationInfoPopupRoute,
    CustomerStationInfoResolvePagingParams,
} from './';
import {JhiLanguageService} from 'ng-jhipster';
import {JhiLanguageHelper} from 'app/core/language.helper';
const ENTITY_STATES = [
    ...customerStationInfoRoute,
    ...customerStationInfoPopupRoute,
];

@NgModule({
    imports: [
        NiopdcgatewaySharedModule,
            RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [

        CustomerStationInfoDialogComponent,
        CustomerStationInfoPopupComponent
    ],
    entryComponents: [

        CustomerStationInfoDialogComponent,
        CustomerStationInfoPopupComponent
    ],
    providers: [
        { provide: JhiLanguageService, useClass: JhiLanguageService },
        CustomerStationInfoService,
        CustomerStationInfoPopupService,
        CustomerStationInfoResolvePagingParams,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class NiopdcgatewayCustomerStationInfoModule {
    constructor(private languageService: JhiLanguageService, private languageHelper: JhiLanguageHelper) {
        this.languageHelper.language.subscribe((languageKey: string) => {
            if (languageKey) {
                this.languageService.changeLanguage(languageKey);
            }
        });
    }
}
