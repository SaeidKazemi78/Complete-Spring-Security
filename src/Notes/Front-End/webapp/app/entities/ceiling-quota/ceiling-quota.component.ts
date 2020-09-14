import {Component, OnDestroy, OnInit} from '@angular/core';
import {HttpErrorResponse, HttpResponse} from '@angular/common/http';
import {ActivatedRoute, Router} from '@angular/router';
import {Subscription} from 'rxjs/Subscription';
import {JhiAlertService, JhiEventManager, JhiParseLinks} from 'ng-jhipster';

import {CeilingQuota} from './ceiling-quota.model';
import {CeilingQuotaService} from './ceiling-quota.service';
import {ITEMS_PER_PAGE, Principal} from '../../shared';
import {CustomerCredit, CustomerCreditService} from '../customer-credit/.';
import {LazyLoadEvent} from 'primeng/primeng';
import {TranslateService} from '@ngx-translate/core';

@Component({
    selector: 'jhi-ceiling-quota',
    templateUrl: './ceiling-quota.component.html'
})
export class CeilingQuotaComponent implements OnInit, OnDestroy {

    currentAccount: any;
    ceilingQuotas: CeilingQuota[];
    ceilingQuota: CeilingQuota = new CeilingQuota();
    error: any;
    success: any;
    eventSubscriber: Subscription;
    currentSearch: string;
    routeData: any;
    links: any;
    totalItems: any;
    queryCount: any;
    itemsPerPage: any;
    page: any;
    predicate: any;
    previousPage: any;
    reverse: any;
    customerCreditId: number;
    customerId: number;
    customerCredit: CustomerCredit;
    breadcrumbItems: any[];

    constructor(
        private ceilingQuotaService: CeilingQuotaService,
        private customerCreditService: CustomerCreditService,
        private parseLinks: JhiParseLinks,
        private jhiAlertService: JhiAlertService,
        private principal: Principal,
        private activatedRoute: ActivatedRoute,
        private router: Router,
        private translateService: TranslateService,
        private eventManager: JhiEventManager
    ) {
        this.itemsPerPage = ITEMS_PER_PAGE;
        this.routeData = this.activatedRoute.data.subscribe(data => {
            this.page = data.pagingParams.page;
            this.previousPage = data.pagingParams.page;
            this.reverse = data.pagingParams.ascending;
            this.predicate = data.pagingParams.predicate;
        });
        this.currentSearch = activatedRoute.snapshot.params['search'] ? activatedRoute.snapshot.params['search'] : '';
        this.customerCreditId = activatedRoute.snapshot.params['customerCreditId'];
        this.customerId = activatedRoute.snapshot.params['customerId'];

        const x = this.currentSearch.split('&');
        for (const key of x) {
            let value = key.split('$');
            if (key.lastIndexOf('#') >= 0) { // enum
                value = key.split('#');
            } else if (key.lastIndexOf(';') >= 0) { // Boolean
                value = key.split(';');
            } else if (key.lastIndexOf('☼') >= 0) { // equal number
                value = key.split('☼');
            } else if (key.lastIndexOf('>') >= 0) { // number
                value = key.split('>');
            } else if (key.lastIndexOf('<') >= 0) { // number
                value = key.split('<');
            } else if (key.lastIndexOf('→') >= 0) { // start date
                value = key.split('→');
            } else if (key.lastIndexOf('←') >= 0) { // end date
                value = key.split('←');
            }

            if (value.length > 1) {
                this.ceilingQuota[value[0]] = value[1];
            }
        }
    }

    loadAll() {
        this.ceilingQuotaService.query(this.customerCreditId, {
            query: this.currentSearch.length > 0 ? this.currentSearch : null,
            page: this.page - 1,
            size: this.itemsPerPage,
            sort: this.sort()
        }).subscribe(
            (res: HttpResponse<CeilingQuota[]>) => this.onSuccess(res.body, res.headers),
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    clear() {
        this.page = 0;
        this.currentSearch = '';

        this.router.navigate(['customer/' + this.customerId + '/customer-credit/' + this.customerCreditId + '/ceiling-quota', {
            page: this.page,
            sort: this.predicate + ',' + (this.reverse ? 'asc' : 'desc')
        }]);
        this.loadAll();
    }

    search() {
        this.page = 0;
        this.currentSearch = '';
        if (this.ceilingQuota.startDate) {
            this.currentSearch += 'startDate→' + this.ceilingQuota.startDate.toISOString() + '&';
        }
        if (this.ceilingQuota.finishDate) {
            this.currentSearch += 'finishDate→' + this.ceilingQuota.finishDate.toISOString() + '&';
        }
        if (this.ceilingQuota.amount) {
            this.currentSearch += 'amount☼' + this.ceilingQuota.amount + '&';
        }
        if (this.currentSearch.length > 0) {
            this.currentSearch = this.currentSearch.substring(0, this.currentSearch.length - 1);
        }

        this.router.navigate(['customer/' + this.customerId + '/customer-credit/' + this.customerCreditId + '/ceiling-quota', {
            search: this.currentSearch,
            page: this.page,
            sort: this.predicate + ',' + (this.reverse ? 'asc' : 'desc')
        }]);
        this.loadAll();
    }

    setBreadCrumb() {
        this.breadcrumbItems = [];
        this.translateService.get('global.menu.home').subscribe(title => {
            this.breadcrumbItems.push({label: title, routerLink: ['/']});
        });
        this.translateService.get('niopdcgatewayApp.ceilingQuota.home.customerTitle').subscribe(title => {
            this.breadcrumbItems.push({
                label: title + ` (${this.customerCredit.customerName})`,
                routerLink: ['/customer']
            });
        });
        this.translateService.get('niopdcgatewayApp.ceilingQuota.home.customerCreditTitle').subscribe(title => {
            this.breadcrumbItems.push({
                label: title,
                routerLink: [`/customer/${this.customerId}/customer-credit`]
            });
        });
        this.translateService.get('niopdcgatewayApp.ceilingQuota.home.title').subscribe(title => {
            this.breadcrumbItems.push({label: title});
        });
    }

    ngOnInit() {
        this.principal.identity().then(account => {
            this.currentAccount = account;
        });

        this.registerChangeInCeilingQuotas();

        this.customerCreditService.find(this.customerCreditId).subscribe(customerCredit => {
                this.customerCredit = customerCredit.body;
                this.setBreadCrumb();
            }
        );
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: CeilingQuota) {
        return item.id;
    }

    registerChangeInCeilingQuotas() {
        this.eventSubscriber = this.eventManager.subscribe('ceilingQuotaListModification',response => this.loadAll());
    }

    sort() {
        const result = [this.predicate + ',' + (this.reverse ? 'asc' : 'desc')];
        if (this.predicate !== 'id') {
            result.push('id');
        }
        return result;
    }

    private onSuccess(data, headers) {
        this.links = this.parseLinks.parse(headers.get('link'));
        this.totalItems = headers.get('X-Total-Count');
        this.queryCount = this.totalItems;
        // this.page = pagingParams.page;
        this.ceilingQuotas = data;
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }

    loadLazy(event: LazyLoadEvent) {
        const predicate = this.predicate;
        const reverse = this.reverse;
        const page = this.page;
        const itemsPerPage = this.itemsPerPage;
        this.page = (event.first / event.rows) + 1;
        this.itemsPerPage = event.rows;
        if (event.sortField) {
            this.predicate = event.sortField;
            this.reverse = event.sortOrder === 1;
        }

        if (this.page > 1 ||
            this.page !== page ||
            this.itemsPerPage !== itemsPerPage ||
            this.predicate !== predicate ||
            this.reverse !== reverse) {

            this.router.navigate(['customer', this.customerId, 'customer-credit', this.customerCreditId, 'ceiling-quota'], {
                queryParams: {
                    page: this.page,
                    size: this.itemsPerPage,
                    search: this.currentSearch,
                    sort: this.predicate + ',' + (this.reverse ? 'asc' : 'desc')
                }
            });
        }

        this.loadAll();
    }

}
