import './vendor.ts';

import {NgModule, Injector} from '@angular/core';
import {HTTP_INTERCEPTORS} from '@angular/common/http';
import {Ng2Webstorage} from 'ngx-webstorage';
import {JhiEventManager, NgJhipsterModule} from 'ng-jhipster';

import {AuthExpiredInterceptor} from './blocks/interceptor/auth-expired.interceptor';
import {ErrorHandlerInterceptor} from './blocks/interceptor/errorhandler.interceptor';
import {NotificationInterceptor} from './blocks/interceptor/notification.interceptor';
import {NiopdcgatewaySharedModule, UserRouteAccessService} from './shared';
import {NiopdcgatewayAppRoutingModule} from './app-routing.module';
import {NiopdcgatewayHomeModule} from './home';
import {NiopdcgatewayAdminModule} from './admin/admin.module';
import {NiopdcgatewayAccountModule} from './account/account.module';
import {NiopdcgatewayEntityModule} from './entities/entity.module';
import {HttpClientModule} from '@angular/common/http';
import {NiopdcgatewayReportModule} from './reports/report.module';
import {PaginationConfig} from './blocks/config/uib-pagination.config';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import * as moment from 'moment';
import {LoadingBarHttpClientModule} from '@ngx-loading-bar/http-client';
import {LoadingBarRouterModule} from '@ngx-loading-bar/router';
import {LoadingBarModule} from '@ngx-loading-bar/core';
// jhipster-needle-angular-add-module-import JHipster will add new module here
import {
    JhiMainComponent,
    NavbarComponent,
    FooterComponent,
    ProfileService,
    PageRibbonComponent,
    ActiveMenuDirective,
    ErrorComponent
} from './layouts';
import {NiopdcgatewayBoundaryReportModule} from './reports/boundary-sell-reports/report.module';
import {BrowserModule} from '@angular/platform-browser';
import {NgbDatepickerConfig} from '@ng-bootstrap/ng-bootstrap';
import {CustomReuseStrategy} from 'app/shared/utils/custom-reuse-strategy';
import {RouteReuseStrategy} from '@angular/router';

@NgModule({
    imports: [
        BrowserModule,
        NiopdcgatewayAppRoutingModule,
        Ng2Webstorage.forRoot({prefix: 'jhi', separator: '-'}),
        NgJhipsterModule.forRoot({
            // set below to true to make alerts look like toast
            alertAsToast: false,
            alertTimeout: 5000,
            i18nEnabled: true,
            defaultI18nLang: 'fa'
        }),
        NiopdcgatewaySharedModule.forRoot(),
        NiopdcgatewayHomeModule,
        NiopdcgatewayAdminModule,
        NiopdcgatewayAccountModule,
        NiopdcgatewayReportModule,
        NiopdcgatewayBoundaryReportModule,
        BrowserAnimationsModule,
        HttpClientModule,
        // jhipster-needle-angular-add-module JHipster will add new module here
        NiopdcgatewayEntityModule,
        LoadingBarHttpClientModule,
        LoadingBarRouterModule,
        LoadingBarModule
    ],
    declarations: [
        JhiMainComponent,
        NavbarComponent,
        ErrorComponent,
        PageRibbonComponent,
        ActiveMenuDirective,
        FooterComponent
    ],
    providers: [
        ProfileService,
        PaginationConfig,
        UserRouteAccessService,
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
        }
    ],
    bootstrap: [JhiMainComponent]
})
export class NiopdcgatewayAppModule {
    constructor(private dpConfig: NgbDatepickerConfig) {
        this.dpConfig.minDate = {year: moment().year() - 100, month: 1, day: 1};
    }
}
