import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import {DatePipe} from '@angular/common';

import {
    AccountService,
    AuthServerProvider,
    CSRFService,
    HasAnyAuthorityDirective,
    HasAnyAuthorityDisabledDirective, HasAnyUserTypeDirective,
    HasNotAnyAuthorityDirective,
    JhiLoginModalComponent,
    LoginModalService,
    LoginService,
    NiopdcgatewaySharedCommonModule,
    NiopdcgatewaySharedLibsModule,
    Principal,
    StateStorageService
} from './';
import {
    CustomerSelectorComponent,
    LocationLevelSelectorComponent,
    OrderCostTableComponent,
    PaymentSelectorComponent,
    PersonSelectorComponent,
    ProductSelectorComponent,
    SellContractCustomerPersonSelectorComponent,
    SellContractCustomerSelectorComponent,
    SellContractPersonSelectorComponent,
    SellContractProductSelectorComponent,
} from './selectors';
import {RemoteService} from './remoteService';
import {SixtyDegreeConverterService} from './sixty-degree-converter';
import {StimulsoftService} from './stimulsoft/stimulsoft.service';
import {AirportSelectorComponent} from './selectors/airport-selector/airport-selector.component';
import {EPaymentComponent} from './e-payment/e-payment.component';
import {MelliPosService} from './e-payment/melli-pos.service';
import {BoundaryDiscountSelectorComponent} from './selectors/boundary-discount-selector/boundary-discount-selector.component';
import {InputTransitPlaqueComponent} from './input-transit-plaque/input-transit-plaque.component';
import {ScriptService} from './script/script.service';
import {TagRateSelectorComponent} from './selectors/tag-rate-selector/tag-rate-selector.component';
import {PasswordStrengthBarComponent} from './password-strength/password-strength-bar.component';
import {InputPlaqueComponent} from './input-plaque/input-plaque.component';
import {AirportOrderSelectorComponent} from './selectors/airport-order-selector/airport-order-selector.component';
import {HotkeyService} from './hotkey/HotkeyService';
import {MellatPosService} from './e-payment/mellat-pos.service';
import {OilTankSelectorComponent} from './selectors/oil-tank-selector/oil-tank-selector.component';
import {InputIrPlaqueComponent} from './input-ir-plaque/input-ir-plaque.component';
import {SellContractCustomerPersonService} from './selectors/sell-contract-customer-person-selector/sell-contract-customer-person-selector.service';
import {HttpCacheService} from './http-cache/http-cache.service';
import {PlaqueFormatPipeModule} from './plaque-pipe/plaque-pipe.module';
import {CarSelectorComponent} from './selectors/car-selector/car-selector.component';
import {DriverSelectorComponent} from './selectors/driver-selector/driver-selector.component';
import {NumberToPersianPipeModule} from './number-to-persian-pipe/number-to-persian.module';
import {BotDetectCaptchaModule} from 'angular-captcha';
import {SERVER_API_URL} from 'app/app.constants';
import {OrderSelectorComponent} from './selectors/order-selector/order-selector.component';
import {HTTP_INTERCEPTORS} from "@angular/common/http";
import {AuthExpiredInterceptor} from "app/blocks/interceptor/auth-expired.interceptor";
import {ErrorHandlerInterceptor} from "app/blocks/interceptor/errorhandler.interceptor";
import {NotificationInterceptor} from "app/blocks/interceptor/notification.interceptor";

@NgModule({
    imports: [
        NiopdcgatewaySharedLibsModule,
        NiopdcgatewaySharedCommonModule
    ],
    declarations: [
        JhiLoginModalComponent,
        HasAnyAuthorityDirective,
        HasAnyUserTypeDirective,
        HasNotAnyAuthorityDirective,
        HasAnyAuthorityDisabledDirective,
        EPaymentComponent,
        PasswordStrengthBarComponent,
        /*selector-start*/
        PersonSelectorComponent,
        LocationLevelSelectorComponent,
        OrderCostTableComponent,
        SellContractProductSelectorComponent,
        SellContractCustomerPersonSelectorComponent,
        SellContractCustomerSelectorComponent,
        SellContractProductSelectorComponent,
        CustomerSelectorComponent,
        PaymentSelectorComponent,
        SellContractPersonSelectorComponent,
        AirportSelectorComponent,
        AirportOrderSelectorComponent,
        InputTransitPlaqueComponent,
        InputIrPlaqueComponent,
        ProductSelectorComponent,
        BoundaryDiscountSelectorComponent,
        InputPlaqueComponent,
        TagRateSelectorComponent,
        OilTankSelectorComponent,
        CarSelectorComponent,
        DriverSelectorComponent,
        OrderSelectorComponent
        /*selector-end*/
    ],
    providers: [
        {
            provide: HTTP_INTERCEPTORS,
            useClass: AuthExpiredInterceptor,
            multi: true
        },
        {
            provide: HTTP_INTERCEPTORS,
            useClass: ErrorHandlerInterceptor,
            multi: true
        },
        {
            provide: HTTP_INTERCEPTORS,
            useClass: NotificationInterceptor,
            multi: true
        },
        LoginService,
        LoginModalService,
        AccountService,
        StateStorageService,
        Principal,
        CSRFService,
        AuthServerProvider,
        DatePipe,
        PlaqueFormatPipeModule,
        NumberToPersianPipeModule,
        RemoteService,
        SixtyDegreeConverterService,
        StimulsoftService,
        MelliPosService,
        MellatPosService,
        ScriptService,
        HotkeyService,
        HttpCacheService,
        SellContractCustomerPersonService
    ],
    entryComponents: [
        JhiLoginModalComponent,
        EPaymentComponent,
        PasswordStrengthBarComponent,
        InputPlaqueComponent,
        /*selector-start*/
        PersonSelectorComponent,
        LocationLevelSelectorComponent,
        OrderCostTableComponent,
        SellContractProductSelectorComponent,
        SellContractCustomerPersonSelectorComponent,
        SellContractCustomerSelectorComponent,
        SellContractProductSelectorComponent,
        CustomerSelectorComponent,
        PaymentSelectorComponent,
        SellContractPersonSelectorComponent,
        AirportSelectorComponent,
        AirportOrderSelectorComponent,
        InputTransitPlaqueComponent,
        InputIrPlaqueComponent,
        ProductSelectorComponent,
        BoundaryDiscountSelectorComponent,
        TagRateSelectorComponent,
        OilTankSelectorComponent,
        CarSelectorComponent,
        DriverSelectorComponent,
        OrderSelectorComponent
        /*selector-end*/
    ],
    exports: [
        NiopdcgatewaySharedCommonModule,
        JhiLoginModalComponent,
        HasAnyAuthorityDirective,
        HasAnyUserTypeDirective,
        HasNotAnyAuthorityDirective,
        HasAnyAuthorityDisabledDirective,
        DatePipe,
        PlaqueFormatPipeModule,
        NumberToPersianPipeModule,
        EPaymentComponent,
        PasswordStrengthBarComponent,
        InputPlaqueComponent,
        /*selector-start*/
        PersonSelectorComponent,
        LocationLevelSelectorComponent,
        OrderCostTableComponent,
        SellContractProductSelectorComponent,
        SellContractCustomerPersonSelectorComponent,
        SellContractCustomerSelectorComponent,
        SellContractProductSelectorComponent,
        CustomerSelectorComponent,
        PaymentSelectorComponent,
        SellContractPersonSelectorComponent,
        AirportSelectorComponent,
        AirportOrderSelectorComponent,
        InputTransitPlaqueComponent,
        InputIrPlaqueComponent,
        ProductSelectorComponent,
        BoundaryDiscountSelectorComponent,
        TagRateSelectorComponent,
        OilTankSelectorComponent,
        CarSelectorComponent,
        DriverSelectorComponent,
        OrderSelectorComponent,
        /*selector-end*/
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]

})
export class NiopdcgatewaySharedModule {
    static forRoot() {
        return {
            ngModule: NiopdcgatewaySharedModule
        };
    }
}
