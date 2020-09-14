import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { NiopdcgatewaySharedModule } from '../../shared';
import {
    VoucherMappingService,
    VoucherMappingPopupService,
    VoucherMappingComponent,
    VoucherMappingDialogComponent,
    VoucherMappingPopupComponent,
    VoucherMappingDeletePopupComponent,
    VoucherMappingDeleteDialogComponent,
    voucherMappingRoute,
    voucherMappingPopupRoute,
    VoucherMappingResolvePagingParams,
} from './';
import {JhiLanguageService} from 'ng-jhipster';
import {JhiLanguageHelper} from 'app/core/language.helper';

const ENTITY_STATES = [
    ...voucherMappingRoute,
    ...voucherMappingPopupRoute,
];

@NgModule({
    imports: [
        NiopdcgatewaySharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        VoucherMappingComponent,
        VoucherMappingDialogComponent,
        VoucherMappingDeleteDialogComponent,
        VoucherMappingPopupComponent,
        VoucherMappingDeletePopupComponent,
    ],
    entryComponents: [
        VoucherMappingComponent,
        VoucherMappingDialogComponent,
        VoucherMappingPopupComponent,
        VoucherMappingDeleteDialogComponent,
        VoucherMappingDeletePopupComponent,
    ],
    providers: [
        { provide: JhiLanguageService, useClass: JhiLanguageService },
        VoucherMappingService,
        VoucherMappingPopupService,
        VoucherMappingResolvePagingParams,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class NiopdcgatewayVoucherMappingModule {
    constructor(private languageService: JhiLanguageService, private languageHelper: JhiLanguageHelper) {
        this.languageHelper.language.subscribe((languageKey: string) => {
            if (languageKey) {
                this.languageService.changeLanguage(languageKey);
            }
        });
    }
}
