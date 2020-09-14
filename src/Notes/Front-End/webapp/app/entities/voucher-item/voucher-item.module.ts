import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { NiopdcgatewaySharedModule } from '../../shared';
import {
    VoucherItemService,
    VoucherItemPopupService,
    VoucherItemComponent,
    VoucherItemDialogComponent,
    VoucherItemPopupComponent,
    VoucherItemDeletePopupComponent,
    VoucherItemDeleteDialogComponent,
    voucherItemRoute,
    voucherItemPopupRoute,
    VoucherItemResolvePagingParams,
} from './';
import {JhiLanguageService} from 'ng-jhipster';
import {JhiLanguageHelper} from 'app/core/language.helper';

const ENTITY_STATES = [
    ...voucherItemRoute,
    ...voucherItemPopupRoute,
];

@NgModule({
    imports: [
        NiopdcgatewaySharedModule,
            RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        VoucherItemComponent,
        VoucherItemDialogComponent,
        VoucherItemDeleteDialogComponent,
        VoucherItemPopupComponent,
        VoucherItemDeletePopupComponent,
    ],
    entryComponents: [
        VoucherItemComponent,
        VoucherItemDialogComponent,
        VoucherItemPopupComponent,
        VoucherItemDeleteDialogComponent,
        VoucherItemDeletePopupComponent,
    ],
    providers: [
        { provide: JhiLanguageService, useClass: JhiLanguageService },
        VoucherItemService,
        VoucherItemPopupService,
        VoucherItemResolvePagingParams,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class NiopdcgatewayVoucherItemModule {}
