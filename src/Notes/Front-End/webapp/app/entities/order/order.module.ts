import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {JhiLanguageHelper} from 'app/core/language.helper';
import {JhiLanguageService} from 'ng-jhipster';
import {NiopdcgatewaySharedModule} from '../../shared';
import {
    AirplaneReportComponent,
    ConnectDepotService,
    OrderComponent, OrderConfirmAllDialogComponent, OrderConfirmAllPopupComponent,
    OrderConfirmDialogComponent,
    OrderConfirmPopupComponent,
    OrderDeleteDialogComponent,
    OrderDeletePopupComponent,
    OrderDialogComponent,
    orderPopupRoute,
    OrderPopupService,
    OrderReportComponent,
    OrderResolvePagingParams,
    OrderRevertConfirmDialogComponent,
    OrderRevertConfirmPopupComponent,
    OrderRevocationDialogComponent,
    OrderRevocationPopupComponent,
    orderRoute,
    OrderService
} from './';
import {OrderCreditNotDepositedComponent} from './order-credit-not-deposited-component';
import {ConnectDepotComponent} from './connect-depot.component';
import {OrderInvoiceDialogComponent, OrderInvoicePopupComponent} from './order-invoice-dialog.component';
import {TicketStepComponent} from './ticket-step.component';
import {WayBillStepComponent} from './way-bill-step.component';
import {NiopdcgatewayOpenCloseShiftWorkPopupModule} from 'app/entities/shift-work/shift-work-open-close-popup.module';

const ENTITY_STATES = [
    ...orderRoute,
    ...orderPopupRoute
];

@NgModule({
    imports: [
        NiopdcgatewaySharedModule,
        NiopdcgatewayOpenCloseShiftWorkPopupModule,
        RouterModule.forChild(ENTITY_STATES),
    ],
    declarations: [
        OrderComponent,
        OrderCreditNotDepositedComponent,
        OrderDialogComponent,
        OrderDeleteDialogComponent,
        OrderDeletePopupComponent,
        OrderConfirmDialogComponent,
        OrderRevertConfirmDialogComponent,
        OrderConfirmPopupComponent,
        OrderRevertConfirmPopupComponent,
        ConnectDepotComponent,
        OrderReportComponent,
        OrderRevocationPopupComponent,
        OrderRevocationDialogComponent,
        OrderInvoiceDialogComponent,
        OrderInvoicePopupComponent,
        TicketStepComponent,
        WayBillStepComponent,
        OrderConfirmAllPopupComponent,
        OrderConfirmAllDialogComponent,
        AirplaneReportComponent
    ],
    entryComponents: [
        OrderComponent,
        OrderCreditNotDepositedComponent,
        OrderDialogComponent,
        OrderDeleteDialogComponent,
        OrderDeletePopupComponent,
        OrderConfirmDialogComponent,
        OrderRevertConfirmDialogComponent,
        OrderConfirmPopupComponent,
        OrderRevertConfirmPopupComponent,
        ConnectDepotComponent,
        OrderReportComponent,
        OrderRevocationPopupComponent,
        OrderRevocationDialogComponent,
        OrderInvoiceDialogComponent,
        OrderInvoicePopupComponent,
        TicketStepComponent,
        WayBillStepComponent,
        OrderConfirmAllPopupComponent,
        OrderConfirmAllDialogComponent,
        AirplaneReportComponent

    ],
    providers: [
        {provide: JhiLanguageService, useClass: JhiLanguageService},
        OrderService,
        ConnectDepotService,
        OrderPopupService,
        OrderResolvePagingParams
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class NiopdcgatewayOrderModule {
    constructor(private languageService: JhiLanguageService, private languageHelper: JhiLanguageHelper) {
        this.languageHelper.language.subscribe((languageKey: string) => {
            if (languageKey) {
                this.languageService.changeLanguage(languageKey);
            }
        });
    }
}
