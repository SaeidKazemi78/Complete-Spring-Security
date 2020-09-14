import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {JhiLanguageHelper} from 'app/core/language.helper';
import {JhiLanguageService} from 'ng-jhipster';
import {NiopdcgatewaySharedModule} from '../../shared';

import {BoundarySellDialogComponent} from '../boundary-sell/boundary-sell-dialog.component';
import {BoundarySellComponent} from '../boundary-sell/boundary-sell.component';
import {BoundarySellReportComponent} from '../boundary-sell/boundary-sell-report.component';
import {NiopdcgatewayOpenCloseShiftWorkPopupModule} from 'app/entities/shift-work/shift-work-open-close-popup.module';
import {NiopdcgatewayBoundaryCustomerPopupModule} from 'app/entities/customer/boundary-customer.popup.module';
import {BoundarySellDeleteDialogComponent, BoundarySellDeletePopupComponent} from 'app/entities/boundary-sell/boundary-sell-delete-dialog.component';
import {BoundarySellConfirmDialogComponent, BoundarySellConfirmPopupComponent} from 'app/entities/boundary-sell/boundary-sell-confirm-dialog.component';
import {boundarySellPopupRoute, BoundarySellResolvePagingParams, boundarySellRoute} from 'app/entities/boundary-sell/boundary-sell.route';
import {BoundarySellPopupService} from 'app/entities/boundary-sell/boundary-sell-popup.service';
import {OrderService} from 'app/entities/order';
import {BoundarySellDeActiveDialogComponent, BoundarySellDeActivePopupComponent} from 'app/entities/boundary-sell/boundary-sell-de-active-dialog.component';
import {BoundarySellActiveDialogComponent, BoundarySellActivePopupComponent} from 'app/entities/boundary-sell/boundary-sell-active-dialog.component';

const ENTITY_STATES = [
    ...boundarySellRoute,
    ...boundarySellPopupRoute
];

@NgModule({
    imports: [
        NiopdcgatewaySharedModule,
        NiopdcgatewayOpenCloseShiftWorkPopupModule,
        NiopdcgatewayBoundaryCustomerPopupModule,
        RouterModule.forChild(ENTITY_STATES),
    ],
    declarations: [
        BoundarySellActivePopupComponent,
        BoundarySellActiveDialogComponent,
        BoundarySellDialogComponent,
        BoundarySellDeleteDialogComponent,
        BoundarySellDeActiveDialogComponent,
        BoundarySellDeActivePopupComponent,
        BoundarySellDeletePopupComponent,
        BoundarySellConfirmDialogComponent,
        BoundarySellConfirmPopupComponent,
        BoundarySellReportComponent,
        BoundarySellComponent,
        BoundarySellReportComponent,
    ],
    entryComponents: [
        BoundarySellActivePopupComponent,
        BoundarySellActiveDialogComponent,
        BoundarySellDialogComponent,
        BoundarySellDeleteDialogComponent,
        BoundarySellDeletePopupComponent,
        BoundarySellDeActiveDialogComponent,
        BoundarySellDeActivePopupComponent,
        BoundarySellConfirmDialogComponent,
        BoundarySellConfirmPopupComponent,
        BoundarySellReportComponent,
        BoundarySellComponent,
        BoundarySellReportComponent,

    ],
    providers: [
        {provide: JhiLanguageService, useClass: JhiLanguageService},
        OrderService,
        BoundarySellPopupService,
        BoundarySellResolvePagingParams
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class NiopdcgatewayBoundarySellModule {
    constructor(private languageService: JhiLanguageService, private languageHelper: JhiLanguageHelper) {
        this.languageHelper.language.subscribe((languageKey: string) => {
            if (languageKey) {
                this.languageService.changeLanguage(languageKey);
            }
        });
    }
}
