import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {JhiLanguageHelper} from 'app/core/language.helper';
import {JhiLanguageService} from 'ng-jhipster';
import {NiopdcgatewaySharedModule} from '../../../shared/index';
import {
    ReceivedProductContainerComponent,
    ReceivedProductContainerDeleteDialogComponent,
    ReceivedProductContainerDeletePopupComponent,
    ReceivedProductContainerDialogComponent,
    ReceivedProductContainerPopupComponent,
    receivedProductContainerPopupRoute,
    ReceivedProductContainerPopupService,
    ReceivedProductContainerResolvePagingParams,
    receivedProductContainerRoute,
    ReceivedProductContainerService,
} from './index';

const ENTITY_STATES = [
    ...receivedProductContainerRoute,
    ...receivedProductContainerPopupRoute,
];

@NgModule({
    imports: [
        NiopdcgatewaySharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        ReceivedProductContainerComponent,
        ReceivedProductContainerDialogComponent,
        ReceivedProductContainerDeleteDialogComponent,
        ReceivedProductContainerPopupComponent,
        ReceivedProductContainerDeletePopupComponent,
    ],
    entryComponents: [
        ReceivedProductContainerComponent,
        ReceivedProductContainerDialogComponent,
        ReceivedProductContainerPopupComponent,
        ReceivedProductContainerDeleteDialogComponent,
        ReceivedProductContainerDeletePopupComponent,
    ],
    providers: [
        ReceivedProductContainerService,
        ReceivedProductContainerPopupService,
        ReceivedProductContainerResolvePagingParams,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class NiopdcgatewayReceivedProductContainerModule {
    constructor(private languageService: JhiLanguageService, private languageHelper: JhiLanguageHelper) {
        this.languageHelper.language.subscribe((languageKey: string) => {
            if (languageKey) {
                this.languageService.changeLanguage(languageKey);
            }
        });
    }
}
