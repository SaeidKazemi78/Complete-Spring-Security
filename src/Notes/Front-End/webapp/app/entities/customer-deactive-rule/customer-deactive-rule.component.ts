import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Subscription} from 'rxjs/Rx';
import {JhiAlertService, JhiEventManager, JhiParseLinks} from 'ng-jhipster';

import {CustomerDeactiveRule} from './customer-deactive-rule.model';
import {CustomerDeactiveRuleService} from './customer-deactive-rule.service';
import {ITEMS_PER_PAGE, Principal} from '../../shared';

import {LazyLoadEvent} from 'primeng/primeng';
import {TranslateService} from '@ngx-translate/core';
import {HttpErrorResponse, HttpResponse} from '@angular/common/http';
import {getPath} from '../../core/router';
import {Customer, CustomerService} from '../customer';

@Component({
    selector: 'jhi-customer-deactive-rule',
    templateUrl: './customer-deactive-rule.component.html'
})
export class CustomerDeactiveRuleComponent implements OnInit, OnDestroy {

    currentAccount: any;
    customerDeactiveRules: CustomerDeactiveRule[];
    customerDeactiveRule: CustomerDeactiveRule = new CustomerDeactiveRule();
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
    breadcrumbItems: any[];
    customerId : number;
    customer : Customer;

    constructor(
        private customerDeactiveRuleService: CustomerDeactiveRuleService,
        private parseLinks: JhiParseLinks,
        private jhiAlertService: JhiAlertService,
        private principal: Principal,
        private activatedRoute: ActivatedRoute,
        private router: Router,
        private translateService: TranslateService,
        private eventManager: JhiEventManager,
        private customerService: CustomerService
    ) {
        this.itemsPerPage = ITEMS_PER_PAGE;
        this.routeData = this.activatedRoute.data.subscribe(data => {
            this.page = data.pagingParams.page;
            this.previousPage = data.pagingParams.page;
            this.reverse = !data.pagingParams.ascending;
            this.predicate = data.pagingParams.predicate;
        });

        this.customerId = this.activatedRoute.snapshot.params['customerId'];

        this.currentSearch = activatedRoute.snapshot.queryParams['search'] ? activatedRoute.snapshot.queryParams['search'] : '';

        if(this.customerId){
            this.currentSearch += 'customer.id☼'+this.customerId +'&';
        }


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
                this.customerDeactiveRule[value[0]] = value[1];
            }
        }
    }

    loadAll() {
        this.customerDeactiveRuleService.query({
            query: this.currentSearch.length > 0 ? this.currentSearch : null,
            page: this.page,
            size: this.itemsPerPage,
            sort: this.sort()
        }).subscribe(
            (res: HttpResponse<CustomerDeactiveRule[]>) => this.onSuccess(res.body, res.headers),
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    clear() {
        this.customerDeactiveRule = new CustomerDeactiveRule();
        this.page = 0;
        this.currentSearch = '';
        this.router.navigate(['/customer-deactive-rule'], {
            queryParams: {
                page: this.page,
                sort: this.predicate + ',' + (this.reverse ? 'desc' : 'asc')
            }
        });
        this.loadAll();
    }

    search() {
        this.page = 0;
        this.currentSearch = '';

        if(this.customerId) {
            this.currentSearch += 'customer.id☼'+this.customerId +'&';
        }

        if (this.customerDeactiveRule.customerName) {
            this.currentSearch += 'customer.name$' + this.customerDeactiveRule.customerName + '&';
        }
        if (this.customerDeactiveRule.startDate) {
            this.currentSearch += 'startDate→' + this.customerDeactiveRule.startDate.toISOString() + '&';
        }
        if (this.customerDeactiveRule.finishDate) {
            this.currentSearch += 'finishDate→' + this.customerDeactiveRule.finishDate.toISOString() + '&';
        }
        if (this.currentSearch.length > 0) {
            this.currentSearch = this.currentSearch.substring(0, this.currentSearch.length - 1);
        }

        this.router.navigate(['/customer-deactive-rule'], {
            queryParams: {
                search: this.currentSearch,
                page: this.page,
                sort: this.predicate + ',' + (this.reverse ? 'desc' : 'asc')
            }
        });
        this.loadAll();
    }

    setBreadCrumb() {
        this.breadcrumbItems = [];
        this.translateService.get('global.menu.home').subscribe(title => {
            this.breadcrumbItems.push({label: title, routerLink: ['/']});
        });

        if(this.customer){
            this.translateService.get('niopdcgatewayApp.customerVisit.home.customerTitle').subscribe((title) => {
                this.breadcrumbItems.push({label: title + ` (${this.customer.name})`, routerLink: ['/customer']});
            });
        }


        this.translateService.get('niopdcgatewayApp.customerDeactiveRule.home.title').subscribe(title => {
            this.breadcrumbItems.push({label: title});
        });
    }

    ngOnInit() {
        this.principal.identity().then(account => {
            this.currentAccount = account;
        });

        this.registerChangeInCustomerDeactiveRules();

        if(this.customerId) {
            this.customerService.find(this.customerId).subscribe(
                (response) => {
                    this.customer = response.body;
                    this.setBreadCrumb();
                }
            );
        }else this.setBreadCrumb();


    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: CustomerDeactiveRule) {
        return item.id;
    }

    registerChangeInCustomerDeactiveRules() {
        this.eventSubscriber = this.eventManager.subscribe('customerDeactiveRuleListModification',response => this.loadAll());
    }

    sort() {
        const result = [this.predicate + ',' + (this.reverse ? 'desc' : 'asc')];

        return result;
    }

    private onSuccess(data, headers) {
        this.links = this.parseLinks.parse(headers.get('link'));
        this.totalItems = headers.get('X-Total-Count');
        this.queryCount = this.totalItems;
        // this.page = pagingParams.page;
        this.customerDeactiveRules = data;
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
            this.reverse = event.sortOrder !== 1;
        }

        if (this.page > 1 ||
            this.page !== page ||
            this.itemsPerPage !== itemsPerPage ||
            this.predicate !== predicate ||
            this.reverse != reverse) {

            this.router.navigate([...getPath(this.router, '/').pathParts], {
                queryParams: {
                    page: this.page,
                    size: this.itemsPerPage,
                    search: this.currentSearch,
                    sort: this.predicate + ',' + (this.reverse ? 'desc' : 'asc')
                }
            });
        }

        this.loadAll();
    }

}
