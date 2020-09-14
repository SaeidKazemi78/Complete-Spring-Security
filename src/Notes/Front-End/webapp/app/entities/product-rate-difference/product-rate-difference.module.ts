import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {JhiLanguageHelper} from 'app/core/language.helper';
import {JhiLanguageService} from 'ng-jhipster';
import {NiopdcgatewaySharedModule} from '../../shared';
import {
    ProductRateDifferenceComponent,
    ProductRateDifferenceDeleteDialogComponent,
    ProductRateDifferenceDeletePopupComponent,
    ProductRateDifferenceDialogComponent,
    ProductRateDifferencePopupComponent,
    productRateDifferencePopupRoute,
    ProductRateDifferencePopupService,
    ProductRateDifferenceResolvePagingParams,
    productRateDifferenceRoute,
    ProductRateDifferenceService,
} from './';
import {ProductRateDifferencePaymentComponent} from './product-rate-difference-payment.component';

const ENTITY_STATES = [
    ...productRateDifferenceRoute,
    ...productRateDifferencePopupRoute,
];

@NgModule({
    imports: [
        NiopdcgatewaySharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        ProductRateDifferenceComponent,
        ProductRateDifferenceDialogComponent,
        ProductRateDifferenceDeleteDialogComponent,
        ProductRateDifferencePopupComponent,
        ProductRateDifferenceDeletePopupComponent,
        ProductRateDifferencePaymentComponent
    ],
    entryComponents: [
        ProductRateDifferenceComponent,
        ProductRateDifferenceDialogComponent,
        ProductRateDifferencePopupComponent,
        ProductRateDifferenceDeleteDialogComponent,
        ProductRateDifferenceDeletePopupComponent,
        ProductRateDifferencePaymentComponent
    ],
    providers: [
        ProductRateDifferenceService,
        ProductRateDifferencePopupService,
        ProductRateDifferenceResolvePagingParams,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class NiopdcgatewayProductRateDifferenceModule {
    constructor(private languageService: JhiLanguageService, private languageHelper: JhiLanguageHelper) {
        this.languageHelper.language.subscribe((languageKey: string) => {
            if (languageKey) {
                this.languageService.changeLanguage(languageKey);
            }
        });
    }
}
