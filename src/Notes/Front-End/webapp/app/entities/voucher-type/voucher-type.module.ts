import {NgModule, CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {RouterModule} from '@angular/router';

import {NiopdcgatewaySharedModule} from '../../shared';
import {
    VoucherTypeService,
    VoucherTypePopupService,
    VoucherTypeComponent,
    VoucherTypeDialogComponent,
    VoucherTypePopupComponent,
    VoucherTypeDeletePopupComponent,
    VoucherTypeDeleteDialogComponent,
    voucherTypeRoute,
    voucherTypePopupRoute,
    VoucherTypeResolvePagingParams,
} from './';
import {JhiLanguageService} from 'ng-jhipster';
import {JhiLanguageHelper} from 'app/core/language.helper';

const ENTITY_STATES = [
    ...voucherTypeRoute,
    ...voucherTypePopupRoute,
];

@NgModule({
    imports: [
        NiopdcgatewaySharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        VoucherTypeComponent,
        VoucherTypeDialogComponent,
        VoucherTypeDeleteDialogComponent,
        VoucherTypePopupComponent,
        VoucherTypeDeletePopupComponent,
    ],
    entryComponents: [
        VoucherTypeComponent,
        VoucherTypeDialogComponent,
        VoucherTypePopupComponent,
        VoucherTypeDeleteDialogComponent,
        VoucherTypeDeletePopupComponent,
    ],
    providers: [
        { provide: JhiLanguageService, useClass: JhiLanguageService },
        VoucherTypeService,
        VoucherTypePopupService,
        VoucherTypeResolvePagingParams,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class NiopdcgatewayVoucherTypeModule {
    constructor(private languageService: JhiLanguageService, private languageHelper: JhiLanguageHelper) {
        this.languageHelper.language.subscribe((languageKey: string) => {
            if (languageKey) {
                this.languageService.changeLanguage(languageKey);
            }
        });
    }
}
