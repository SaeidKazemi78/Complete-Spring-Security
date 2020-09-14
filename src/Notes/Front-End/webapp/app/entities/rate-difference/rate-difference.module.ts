import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {JhiLanguageHelper} from 'app/core/language.helper';
import {JhiLanguageService} from 'ng-jhipster';
import {NiopdcgatewaySharedModule} from '../../shared';
import {
    RateDifferenceComponent,
    RateDifferenceDeleteDialogComponent,
    RateDifferenceDeletePopupComponent, RateDifferencePaymentComponent,
    rateDifferencePopupRoute,
    RateDifferencePopupService,
    RateDifferenceResolvePagingParams,
    rateDifferenceRoute,
    RateDifferenceService,
} from './';

const ENTITY_STATES = [
    ...rateDifferenceRoute,
    ...rateDifferencePopupRoute,

];

@NgModule({
    imports: [
        NiopdcgatewaySharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        RateDifferenceComponent,
        RateDifferenceDeleteDialogComponent,
        RateDifferenceDeletePopupComponent,
        RateDifferencePaymentComponent,
    ],
    entryComponents: [
        RateDifferenceComponent,
        RateDifferenceDeleteDialogComponent,
        RateDifferenceDeletePopupComponent,
        RateDifferencePaymentComponent,
    ],
    providers: [
        RateDifferenceService,
        RateDifferencePopupService,
        RateDifferenceResolvePagingParams,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class NiopdcgatewayRateDifferenceModule {
    constructor(private languageService: JhiLanguageService, private languageHelper: JhiLanguageHelper) {
        this.languageHelper.language.subscribe((languageKey: string) => {
            if (languageKey) {
                this.languageService.changeLanguage(languageKey);
            }
        });
    }
}
