import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';

import {NiopdcgatewaySharedModule} from '../../shared';
import {
    TransportContractComponent,
    TransportContractConfirmDialogComponent,
    TransportContractDeleteDialogComponent,
    TransportContractDeletePopupComponent,
    TransportContractConfirmPopupComponent,
    TransportContractDialogComponent,
    TransportContractPopupComponent,
    transportContractPopupRoute,
    TransportContractPopupService,
    TransportContractResolvePagingParams,
    transportContractRoute,
    TransportContractService,
} from './';
import {JhiLanguageHelper} from 'app/core/language.helper';
import {JhiLanguageService} from 'ng-jhipster';
const ENTITY_STATES = [
    ...transportContractRoute,
    ...transportContractPopupRoute,
];

@NgModule({
    imports: [
        NiopdcgatewaySharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        TransportContractComponent,
        TransportContractDialogComponent,
        TransportContractDeleteDialogComponent,
        TransportContractPopupComponent,
        TransportContractConfirmPopupComponent,
        TransportContractConfirmDialogComponent,
        TransportContractDeletePopupComponent,
    ],
    entryComponents: [
        TransportContractComponent,
        TransportContractDialogComponent,
        TransportContractPopupComponent,
        TransportContractDeleteDialogComponent,
        TransportContractDeletePopupComponent,
        TransportContractConfirmPopupComponent,
        TransportContractConfirmDialogComponent,

    ],
    providers: [
        TransportContractService,
        TransportContractPopupService,
        TransportContractResolvePagingParams,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class NiopdcgatewayTransportContractModule {
    constructor(private languageService: JhiLanguageService, private languageHelper: JhiLanguageHelper) {
        this.languageHelper.language.subscribe((languageKey: string) => {
            if (languageKey) {
                this.languageService.changeLanguage(languageKey);
            }
        });
    }
}
