import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { NiopdcgatewaySharedModule } from '../../shared';
import {
    VoucherTypeGroupService,
    VoucherTypeGroupPopupService,
    VoucherTypeGroupComponent,
    VoucherTypeGroupDialogComponent,
    VoucherTypeGroupPopupComponent,
    VoucherTypeGroupDeletePopupComponent,
    VoucherTypeGroupDeleteDialogComponent,
    voucherTypeGroupRoute,
    voucherTypeGroupPopupRoute,
    VoucherTypeGroupResolvePagingParams,
} from './';
import {JhiLanguageService} from 'ng-jhipster';
import {JhiLanguageHelper} from 'app/core/language.helper';
const ENTITY_STATES = [
    ...voucherTypeGroupRoute,
    ...voucherTypeGroupPopupRoute,
    {
        path: ':voucherTypeGroupId/voucher-type',
        loadChildren: '../voucher-type/voucher-type.module#NiopdcgatewayVoucherTypeModule'
    },
];

@NgModule({
    imports: [
        NiopdcgatewaySharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        VoucherTypeGroupComponent,
        VoucherTypeGroupDialogComponent,
        VoucherTypeGroupDeleteDialogComponent,
        VoucherTypeGroupPopupComponent,
        VoucherTypeGroupDeletePopupComponent,
    ],
    entryComponents: [
        VoucherTypeGroupComponent,
        VoucherTypeGroupDialogComponent,
        VoucherTypeGroupPopupComponent,
        VoucherTypeGroupDeleteDialogComponent,
        VoucherTypeGroupDeletePopupComponent,
    ],
    providers: [
        { provide: JhiLanguageService, useClass: JhiLanguageService },
        VoucherTypeGroupService,
        VoucherTypeGroupPopupService,
        VoucherTypeGroupResolvePagingParams,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class NiopdcgatewayVoucherTypeGroupModule {
    constructor(private languageService: JhiLanguageService, private languageHelper: JhiLanguageHelper) {
        this.languageHelper.language.subscribe((languageKey: string) => {
            if (languageKey) {
                this.languageService.changeLanguage(languageKey);
            }
        });
    }
}
