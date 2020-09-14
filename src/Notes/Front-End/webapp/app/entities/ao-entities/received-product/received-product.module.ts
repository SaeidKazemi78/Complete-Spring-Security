import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {JhiLanguageHelper} from 'app/core/language.helper';
import {JhiLanguageService} from 'ng-jhipster';
import {NiopdcgatewaySharedModule} from '../../../shared/index';
import {
    ReceivedProductComponent,
    ReceivedProductDeleteDialogComponent,
    ReceivedProductDeletePopupComponent,
    ReceivedProductDialogComponent,
    ReceivedProductPopupComponent,
    receivedProductPopupRoute,
    ReceivedProductPopupService,
    ReceivedProductResolvePagingParams,
    receivedProductRoute,
    ReceivedProductService,
} from './index';

const ENTITY_STATES = [
    ...receivedProductRoute,
    ...receivedProductPopupRoute,
];

@NgModule({
    imports: [
        NiopdcgatewaySharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        ReceivedProductComponent,
        ReceivedProductDialogComponent,
        ReceivedProductDeleteDialogComponent,
        ReceivedProductPopupComponent,
        ReceivedProductDeletePopupComponent,
    ],
    entryComponents: [
        ReceivedProductComponent,
        ReceivedProductDialogComponent,
        ReceivedProductPopupComponent,
        ReceivedProductDeleteDialogComponent,
        ReceivedProductDeletePopupComponent,
    ],
    providers: [
        ReceivedProductService,
        ReceivedProductPopupService,
        ReceivedProductResolvePagingParams,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class NiopdcgatewayReceivedProductModule {
    constructor(private languageService: JhiLanguageService, private languageHelper: JhiLanguageHelper) {
        this.languageHelper.language.subscribe((languageKey: string) => {
            if (languageKey) {
                this.languageService.changeLanguage(languageKey);
            }
        });
    }
}
