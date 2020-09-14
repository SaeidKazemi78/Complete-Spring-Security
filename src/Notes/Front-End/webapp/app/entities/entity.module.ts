import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {VersionShowPopupComponent} from 'app/entities/version';
import {UserRouteAccessService} from 'app/shared';

@NgModule({
    imports: [
        RouterModule.forChild([
            {
                path: 'version-show',
                component: VersionShowPopupComponent,
                data: {
                    pageTitle: 'niopdcgatewayApp.version.home.title'
                },
                canActivate: [UserRouteAccessService],
                outlet: 'popup'
            },
            {
                path: 'wallet',
                loadChildren: './wallet/wallet.module#NiopdcgatewayWalletModule'
            },
            {
                path: 'order',
                loadChildren: './order/order.module#NiopdcgatewayOrderModule'
            },
            {
                path: 'boundary-sell',
                loadChildren: './boundary-sell/boundary-sell.module#NiopdcgatewayBoundarySellModule'
            },
            {
                path: 'product-rate-difference',
                loadChildren: './product-rate-difference/product-rate-difference.module#NiopdcgatewayProductRateDifferenceModule'
            },
            {
                path: 'product-rate/:type',
                loadChildren: './product-rate/product-rate.module#NiopdcgatewayProductRateModule'
            },
            {
                path: 'refuel-center',
                loadChildren: './ao-entities/refuel-center/refuel-center.module#NiopdcgatewayRefuelCenterModule'
            },
            {
                path: 'airport',
                loadChildren: './ao-entities/airport/airport.module#NiopdcgatewayAirportModule'
            },
            {
                path: 'oil-tank',
                loadChildren: './ao-entities/oil-tank/oil-tank.module#NiopdcgatewayOilTankModule'
            },
            {
                path: 'transfer-type',
                loadChildren: './transfer-type/transfer-type.module#NiopdcgatewayTransferTypeModule'
            },
            {
                path: 'main-day-depot',
                loadChildren: './ao-entities/main-day-depot/main-day-depot.module#NiopdcgatewayMainDayDepotModule'
            },
            {
                path: 'main-day-operation',
                loadChildren: './ao-entities/main-day-operation/main-day-operation.module#NiopdcgatewayMainDayOperationModule'
            },
            {
                path: 'oil-tank-container/:status',
                loadChildren: './ao-entities/oil-tank-container/oil-tank-container.module#NiopdcgatewayOilTankContainerModule'
            },
            {
                path: 'product-step',
                loadChildren: './product-step/product-step.module#NiopdcgatewayProductStepModule'
            },
            {
                path: 'product-src',
                loadChildren: './product-src/product-src.module#NiopdcgatewayProductSrcModule'
            },
            {
                path: 'rate-group',
                loadChildren: './rate-group/rate-group.module#NiopdcgatewayRateGroupModule'
            },
            {
                path: 'currency',
                loadChildren: './currency/currency.module#NiopdcgatewayCurrencyModule'
            },
            {
                path: 'depot',
                loadChildren: './depot/depot.module#NiopdcgatewayDepotModule'
            },
            {
                path: 'currency-rate-group',
                loadChildren: './currency-rate-group/currency-rate-group.module#NiopdcgatewayCurrencyRateGroupModule'
            },
            {
                path: 'cost-group',
                loadChildren: './cost-group/cost-group.module#NiopdcgatewayCostGroupModule'
            },
            {
                path: 'parent-base-test-result',
                loadChildren: './ao-entities/parent-base-test-result/parent-base-test-result.module#NiopdcgatewayParentBaseTestResultModule'
            },
            {
                path: 'request-test-result/:mode',
                loadChildren: './ao-entities/request-test-result/request-test-result.module#NiopdcgatewayRequestTestResultModule'
            },
            {
                path: 'request-filter-element/:mode',
                loadChildren: './ao-entities/request-filter-element/request-filter-element.module#NiopdcgatewayRequestFilterElementModule'
            },
            {
                path: 'cleaning-report-oil-tank/:mode',
                loadChildren: './ao-entities/cleaning-report-oil-tank/cleaning-report-oil-tank.module#NiopdcgatewayCleaningReportOilTankModule'
            },
            {
                path: 'manufacture',
                loadChildren: './manufacture/manufacture.module#NiopdcgatewayManufactureModule'
            },
            {
                path: 'request-plunging',
                loadChildren: './ao-entities/request-plunging/request-plunging.module#NiopdcgatewayRequestPlungingModule'
            },
            {
                path: 'milli-poor',
                loadChildren: './ao-entities/milli-poor/milli-poor.module#NiopdcgatewayMilliPoorModule'
            },
            {
                path: 'filter',
                loadChildren: './ao-entities/filter/filter.module#NiopdcgatewayFilterModule'
            },
            {
                path: 'user-acc-config',
                loadChildren: './user-acc-config/user-acc-config.module#NiopdcgatewayUserAccConfigModule'
            },
            {
                path: 'base-query',
                loadChildren: './base-query/base-query.module#NiopdcgatewayBaseQueryModule'
            },
            {
                path: 'voucher-template',
                loadChildren: './voucher-template/voucher-template.module#NiopdcgatewayVoucherTemplateModule'
            },
            {
                path: 'voucher-master',
                loadChildren: './voucher-master/voucher-master.module#NiopdcgatewayVoucherMasterModule'
            },
            {
                path: 'voucher-payment',
                loadChildren: './voucher-payment/voucher-payment.module#NiopdcgatewayVoucherPaymentModule'
            },
            {
                path: 'voucher-type-group',
                loadChildren: './voucher-type-group/voucher-type-group.module#NiopdcgatewayVoucherTypeGroupModule'
            },
            {
                path: 'loan-type',
                loadChildren: './loan-type/loan-type.module#NiopdcgatewayLoanTypeModule'
            },
            {
                path: 'loan',
                loadChildren: './loan/loan.module#NiopdcgatewayLoanModule'
            },
            {
                path: 'bill',
                loadChildren: './bill/bill.module#NiopdcgatewayBillModule'
            },
            {
                path: 'factor',
                loadChildren: './factor/factor.module#NiopdcgatewayFactorModule'
            },
            {
                path: 'bank',
                loadChildren: './bank/bank.module#NiopdcgatewayBankModule'
            },
            {
                path: 'niopdc-bank-account',
                loadChildren: './niopdc-bank-account/niopdc-bank-account.module#NiopdcgatewayNiopdcBankAccountModule'
            },
            {
                path: 'niopdc-bank-account-type',
                loadChildren: './niopdc-bank-account-type/niopdc-bank-account-type.module#NiopdcgatewayNiopdcBankAccountTypeModule'
            },
            {
                path: 'customer-accounting',
                loadChildren: './customer-accounting/customer-accounting.module#NiopdcgatewayCustomerAccountingModule'
            },
            {
                path: 'account-number-format',
                loadChildren: './account-number-format/account-number-format.module#NiopdcgatewayAccountNumberFormatModule'
            },
            {
                path: 'account-number-items',
                loadChildren: './account-number-items/account-number-items.module#NiopdcgatewayAccountNumberItemsModule'
            },
            {
                path: 'product',
                loadChildren: './product/product.module#NiopdcgatewayProductModule'
            },
            {
                path: 'person',
                loadChildren: './person/person.module#NiopdcgatewayPersonModule'
            },
            {
                path: 'customer',
                loadChildren: './customer/customer.module#NiopdcgatewayCustomerModule'
            },
            {
                path: 'customer/boundary-customer',
                loadChildren: './customer/boundary-customer.module#NiopdcgatewayBoundaryCustomerModule'
            },
            {
                path: 'sell-contract',
                loadChildren: './sell-contract/sell-contract.module#NiopdcgatewaySellContractModule'
            },
            {
                path: 'payment',
                loadChildren: './payment/payment.module#NiopdcgatewayPaymentModule'
            },
            {
                path: 'location',
                loadChildren: './location/location.module#NiopdcgatewayLocationModule'
            },
            {
                path: 'country',
                loadChildren: './country/country.module#NiopdcgatewayCountryModule'
            },
            {
                path: 'product-group',
                loadChildren: './product-group/product-group.module#NiopdcgatewayProductGroupModule'
            },
            {
                path: 'product-unit',
                loadChildren: './product-unit/product-unit.module#NiopdcgatewayProductUnitModule'
            },
            {
                path: 'container',
                loadChildren: './container/container.module#NiopdcgatewayContainerModule'
            },
            {
                path: 'customer-type',
                loadChildren: './customer-type/customer-type.module#NiopdcgatewayCustomerTypeModule'
            },
            {
                path: 'consumption',
                loadChildren: './consumption/consumption.module#NiopdcgatewayConsumptionModule'
            },
            {
                path: 'buy-type',
                loadChildren: './buy-type/buy-type.module#NiopdcgatewayBuyTypeModule'
            },
            {
                path: 'customer-deactive-rule',
                loadChildren: './customer-deactive-rule/customer-deactive-rule.module#NiopdcgatewayCustomerDeactiveRuleModule'
            },
            {
                path: 'vehicle-model',
                loadChildren: './vehicle-model/vehicle-model.module#NiopdcgatewayVehicleModelModule'
            },
            {
                path: 'boundary-discount',
                loadChildren: './boundary-discount/boundary-discount.module#NiopdcgatewayBoundaryDiscountModule'
            },
            {
                path: 'plaque',
                loadChildren: './plaque/plaque.module#NiopdcgatewayPlaqueModule'
            },
            {
                path: 'car',
                loadChildren: './car/car.module#NiopdcgatewayCarModule'
            },
            {
                path: 'car-ref-id',
                loadChildren: './car-rf-id/car-rf-id.module#NiopdcgatewayCarRfIdModule'
            },
            {
                path: 'car-tank',
                loadChildren: './car-tank/car-tank.module#NiopdcgatewayCarTankModule'
            },
            {
                path: 'sixty-base-information/:mode',
                loadChildren: './sixty-base-information/sixty-base-information.module#NiopdcgatewaySixtyBaseInformationModule'
            },
            {
                path: 'route',
                loadChildren: './route/route.module#NiopdcgatewayRouteModule'
            },
            {
                path: 'user-management',
                loadChildren: './user-management/user-management.module#NiopdcgatewayUserManagementModule'
            },
            {
                path: 'user',
                loadChildren: './user-register/user-register.module#NiopdcgatewayUserRegisterModule'
            },
            {
                path: 'user-request',
                loadChildren: './user-request/user-request.module#NiopdcgatewayUserRequestModule'
            },
            {
                path: 'user-token',
                loadChildren: './user-token/user-token.module#NiopdcgatewayUserTokenModule'
            },
            {
                path: 'parent-authority',
                loadChildren: './parent-authority/parent-authority.module#NiopdcgatewayParentAuthorityModule'
            },
            {
                path: 'pos-device',
                loadChildren: './pos-device/pos-device.module#NiopdcgatewayPosDeviceModule'
            },
            {
                path: 'user-pos-device',
                loadChildren: './user-pos-device/user-pos-device.module#NiopdcgatewayUserPosDeviceModule'
            },
            {
                path: 'psp-config',
                loadChildren: './psp-config/psp-config.module#NiopdcgatewayPspConfigModule'
            },
            // {
            //     path: 'jhi-metrics',
            //     loadChildren: './jhi-metrics/jhi-metrics.module#NiopdcgatewayNiopdcBankAccountModule'
            // },
            // {
            //     path: 'jhi-health',
            //     loadChildren: './jhi-health/jhi-health.module#NiopdcgatewayNiopdcBankAccountModule'
            // },
            // {
            //     path: 'jhi-configuration',
            //     loadChildren: './jhi-configuration/jhi-configuration.module#NiopdcgatewayNiopdcBankAccountModule'
            // },
            // {
            //     path: 'audits',
            //     loadChildren: './audits/audits.module#NiopdcgatewayNiopdcBankAccountModule'
            // },
            // {
            //     path: 'logs',
            //     loadChildren: './logs/logs.module#NiopdcgatewayNiopdcBankAccountModule'
            // },
            {
                path: 'news',
                loadChildren: './news/news.module#NiopdcgatewayNewsModule'
            },
            {
                path: 'version',
                loadChildren: './version/version.module#NiopdcgatewayVersionModule'
            },
            {
                path: 'menu',
                loadChildren: './menu/menu.module#NiopdcgatewayMenuModule'
            },
            // {
            //     path: 'docs',
            //     loadChildren: './docs/docs.module#NiopdcgatewayNiopdcBankAccountModule'
            // },
            // {
            //     path: 'entity-audit',
            //     loadChildren: './entity-audit/entity-audit.module#NiopdcgatewayEntityAuditModule'
            // },
            {
                path: 'niopdc-config',
                loadChildren: './niopdc-config/niopdc-config.module#NiopdcgatewayNiopdcConfigModule'
            },
            {
                path: 'rate-group/confirm',
                loadChildren: './product-rate/product-rate.module#NiopdcgatewayNiopdcProductRateModule'
            },
            {
                path: 'role',
                loadChildren: './role/role.module#NiopdcgatewayRoleModule'
            },
            {
                path: 'role-level',
                loadChildren: './role-level/role-level.module#NiopdcgatewayRoleLevelModule'
            },
            {
                path: 'customer-visit',
                loadChildren: './customer-visit/customer-visit.module#NiopdcgatewayCustomerVisitModule'
            },
            {
                path: 'rate-difference',
                loadChildren: './rate-difference/rate-difference.module#NiopdcgatewayRateDifferenceModule'
            },
            {
                path: 'action-log',
                loadChildren: './action-log/action-log.module#NiopdcgatewayActionLogModule'
            },
            {
                path: 'action-log-mapping',
                loadChildren: './action-log-mapping/action-log-mapping.module#NiopdcgatewayActionLogMappingModule'
            },
            {
                path: 'infringement',
                loadChildren: './infringement/infringement.module#NiopdcgatewayInfringementModule'
            },
            {
                path: 'supply',
                loadChildren: './supply/supply.module#NiopdcgatewaySupplyModule'
            },

        ])
        // todo NiopdcgatewaySixtyBaseInformationModule
    ],
    declarations: [],
    entryComponents: [],
    providers: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class NiopdcgatewayEntityModule {
}
