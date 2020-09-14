import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {JhiLanguageHelper} from 'app/core/language.helper';
import {JhiLanguageService} from 'ng-jhipster';
import {NiopdcgatewaySharedModule} from '../../../shared/index';
import {
    SendContainerProductComponent,
    SendContainerProductDeleteDialogComponent,
    SendContainerProductDeletePopupComponent,
    SendContainerProductDialogComponent,
    SendContainerProductPopupComponent,
    sendContainerProductPopupRoute,
    SendContainerProductPopupService,
    SendContainerProductResolvePagingParams,
    sendContainerProductRoute,
    SendContainerProductService,
} from './index';

const ENTITY_STATES = [
    ...sendContainerProductRoute,
    ...sendContainerProductPopupRoute,
];

@NgModule({
    imports: [
        NiopdcgatewaySharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        SendContainerProductComponent,
        SendContainerProductDialogComponent,
        SendContainerProductDeleteDialogComponent,
        SendContainerProductPopupComponent,
        SendContainerProductDeletePopupComponent,
    ],
    entryComponents: [
        SendContainerProductComponent,
        SendContainerProductDialogComponent,
        SendContainerProductPopupComponent,
        SendContainerProductDeleteDialogComponent,
        SendContainerProductDeletePopupComponent,
    ],
    providers: [
        SendContainerProductService,
        SendContainerProductPopupService,
        SendContainerProductResolvePagingParams,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class NiopdcgatewaySendContainerProductModule {
    constructor(private languageService: JhiLanguageService, private languageHelper: JhiLanguageHelper) {
        this.languageHelper.language.subscribe((languageKey: string) => {
            if (languageKey) {
                this.languageService.changeLanguage(languageKey);
            }
        });
    }
}
