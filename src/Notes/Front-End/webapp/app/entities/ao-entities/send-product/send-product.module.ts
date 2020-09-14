import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {JhiLanguageHelper} from 'app/core/language.helper';
import {JhiLanguageService} from 'ng-jhipster';
import {NiopdcgatewaySharedModule} from '../../../shared/index';
import {
    SendProductComponent,
    SendProductDeleteDialogComponent,
    SendProductDeletePopupComponent,
    SendProductDialogComponent,
    SendProductPopupComponent,
    sendProductPopupRoute,
    SendProductPopupService,
    SendProductResolvePagingParams,
    sendProductRoute,
    SendProductService,
} from './index';

const ENTITY_STATES = [
    ...sendProductRoute,
    ...sendProductPopupRoute,
];

@NgModule({
    imports: [
        NiopdcgatewaySharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        SendProductComponent,
        SendProductDialogComponent,
        SendProductDeleteDialogComponent,
        SendProductPopupComponent,
        SendProductDeletePopupComponent,
    ],
    entryComponents: [
        SendProductComponent,
        SendProductDialogComponent,
        SendProductPopupComponent,
        SendProductDeleteDialogComponent,
        SendProductDeletePopupComponent,
    ],
    providers: [
        SendProductService,
        SendProductPopupService,
        SendProductResolvePagingParams,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class NiopdcgatewaySendProductModule {
    constructor(private languageService: JhiLanguageService, private languageHelper: JhiLanguageHelper) {
        this.languageHelper.language.subscribe((languageKey: string) => {
            if (languageKey) {
                this.languageService.changeLanguage(languageKey);
            }
        });
    }
}
