import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Subscription} from 'rxjs/Subscription';
import {JhiAlertService, JhiEventManager, JhiParseLinks} from 'ng-jhipster';

import {UserAccConfig} from './user-acc-config.model';
import {UserAccConfigService} from './user-acc-config.service';
import {Principal} from '../../shared';
import {TranslateService} from '@ngx-translate/core';
import {DateJalaliPipe} from 'app/shared/ng2-datetimepicker-jalali/date-jalali.pipe';

@Component({
    templateUrl: './user-acc-config.component.html'
})
export class UserAccConfigComponent implements OnInit, OnDestroy {

    currentAccount: any;
    error: any;
    success: any;
    eventSubscriber: Subscription;
    currentSearch: string;
    routeData: any;
    links: any;
    totalItems: any;
    financialYears: number[];
    queryCount: any;
    itemsPerPage: any;
    page: any;
    predicate: any;
    previousPage: any;
    reverse: any;
    breadcrumbItems: any[];
    userAccConfig: UserAccConfig;

    constructor(
        private userAccConfigService: UserAccConfigService,
        private parseLinks: JhiParseLinks,
        private jhiAlertService: JhiAlertService,
        private principal: Principal,
        private activatedRoute: ActivatedRoute,
        private router: Router,
        private translateService: TranslateService,
        private eventManager: JhiEventManager
    ) {
    }

    save() {
        this.userAccConfigService.update(this.userAccConfig).subscribe((resp) => {
            this.onSuccess(resp);
        }, error1 => this.onError(error1));
    }

    setBreadCrumb() {

        this.breadcrumbItems = [];
        this.translateService.get('global.menu.home').subscribe((title) => {
            this.breadcrumbItems.push({label: title, routerLink: ['/']});
        });
        this.translateService.get('niopdcgatewayApp.userAccConfig.home.title').subscribe((title) => {
            this.breadcrumbItems.push({label: title});
        });
    }

    ngOnInit() {
        this.financialYears = [];
        const date = new DateJalaliPipe().transform(new Date());
        const currentYear = date.toString().substr(0, 4);
        for (let i = currentYear - 5; i <= currentYear; i++) {
            this.financialYears.push(i);
        }
        this.userAccConfig = {};
        this.userAccConfigService.find().subscribe((resp) => {
            this.onSuccess(resp);
        }, error1 => this.onError(error1));

        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.setBreadCrumb();
    }

    private onSuccess(data) {
        this.userAccConfig = data.body;
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }

    ngOnDestroy() {
        // this.eventManager.destroy(this.eventSubscriber);
    }

}
