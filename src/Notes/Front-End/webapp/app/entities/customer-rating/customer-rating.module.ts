import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { NiopdcgatewaySharedModule } from '../../shared';
import {
    CustomerRatingService,
    CustomerRatingPopupService,
    CustomerRatingComponent,
    CustomerRatingDialogComponent,
    CustomerRatingPopupComponent,
    CustomerRatingDeletePopupComponent,
    CustomerRatingDeleteDialogComponent,
    customerRatingRoute,
    customerRatingPopupRoute,
    CustomerRatingResolvePagingParams,
} from './';
import {JhiLanguageService} from 'ng-jhipster';
import {JhiLanguageHelper} from 'app/core/language.helper';
const ENTITY_STATES = [
    ...customerRatingRoute,
    ...customerRatingPopupRoute,
];

@NgModule({
    imports: [
        NiopdcgatewaySharedModule,
            RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        CustomerRatingComponent,
        CustomerRatingDialogComponent,
        CustomerRatingDeleteDialogComponent,
        CustomerRatingPopupComponent,
        CustomerRatingDeletePopupComponent,
    ],
    entryComponents: [
        CustomerRatingComponent,
        CustomerRatingDialogComponent,
        CustomerRatingPopupComponent,
        CustomerRatingDeleteDialogComponent,
        CustomerRatingDeletePopupComponent,
    ],
    providers: [
        { provide: JhiLanguageService, useClass: JhiLanguageService },
        CustomerRatingService,
        CustomerRatingPopupService,
        CustomerRatingResolvePagingParams,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class NiopdcgatewayCustomerRatingModule {
    constructor(private languageService: JhiLanguageService, private languageHelper: JhiLanguageHelper) {
        this.languageHelper.language.subscribe((languageKey: string) => {
            if (languageKey) {
                this.languageService.changeLanguage(languageKey);
            }
        });
    }
}
