import {Component, Input} from '@angular/core';
import {ClosedSale} from './closed-sales.model';

@Component({
    selector: 'jhi-closed-sales-details-report',
    template: `
        <kendo-grid
            [data]="details">
            <ng-template kendoGridToolbarTemplate>
                <span jhiTranslate="niopdcgatewayApp.closedSales.grouping.product"></span>
            </ng-template>
            <kendo-grid-column field="locationName" [title]="'niopdcgatewayApp.closedSales.locationName' | translate" width="130">
                <ng-template kendoGridGroupHeaderTemplatе></ng-template>
            </kendo-grid-column>
            <kendo-grid-column field="productName" [title]="'niopdcgatewayApp.closedSales.productName' | translate"
                               width="130">
                <ng-template kendoGridGroupHeaderTemplatе></ng-template>
            </kendo-grid-column>
        
            <kendo-grid-column field="closeDate"
                               [title]="'niopdcgatewayApp.closedSales.closeDate' | translate" width="130">
                <ng-template kendoGridGroupHeaderTemplatе></ng-template>
                <ng-template kendoGridCellTemplate let-dataItem>
                    <span >{{dataItem.closeDate | dateJalali}}</span>
                </ng-template>
            </kendo-grid-column>
            <kendo-grid-column field="totalAmount" [title]="'niopdcgatewayApp.closedSales.totalAmount' | translate"
                               width="130">
                <ng-template kendoGridGroupHeaderTemplatе></ng-template>
            </kendo-grid-column>

            <kendo-grid-column field="totalBaseProductPrice"
                               [title]="'niopdcgatewayApp.closedSales.totalBaseProductPrice' | translate" width="130">
                <ng-template kendoGridGroupHeaderTemplatе></ng-template>
            </kendo-grid-column>
            <kendo-grid-column field="totalProductPrice"
                               [title]="'niopdcgatewayApp.closedSales.totalProductPrice' | translate" width="130">
                <ng-template kendoGridGroupHeaderTemplatе></ng-template>
            </kendo-grid-column>
            <kendo-grid-column field="orderCount" [title]="'niopdcgatewayApp.closedSales.orderCount' | translate"
                               width="130">
                <ng-template kendoGridGroupHeaderTemplatе></ng-template>
            </kendo-grid-column>
             <kendo-grid-column field="totalCost" [title]="'niopdcgatewayApp.closedSales.totalCost' | translate"
                               width="130">
            </kendo-grid-column>
            <kendo-grid-column field="totalCredit" [title]="'niopdcgatewayApp.closedSales.totalCredit' | translate" width="130">
                <ng-template kendoGridGroupHeaderTemplatе></ng-template>
            </kendo-grid-column>
            <kendo-grid-column field="totalPreBuy"
                               [title]="'niopdcgatewayApp.closedSales.totalPrePay' | translate" width="130">
                <ng-template kendoGridGroupHeaderTemplatе></ng-template>
            </kendo-grid-column>
            <kendo-grid-column field="totalBillAmount"
                               [title]="'niopdcgatewayApp.closedSales.totalBillAmount' | translate" width="130">
                <ng-template kendoGridGroupHeaderTemplatе></ng-template>
            </kendo-grid-column>
        </kendo-grid>`
})
export class ClosedSalesDetailsReportComponent  {

    @Input() details: ClosedSale  [] = [];

    constructor() {
    }

}
