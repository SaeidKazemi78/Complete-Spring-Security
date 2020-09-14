import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Subscription} from 'rxjs/Rx';
import {JhiAlertService, JhiEventManager, JhiParseLinks} from 'ng-jhipster';

import {CostRate} from './cost-rate.model';
import {CostRateService} from './cost-rate.service';
import {Principal} from '../../shared';
import {Currency, CurrencyService} from '../currency/.';
import {Cost, CostService, RateType} from '../cost/.';
import {LazyLoadEvent} from 'primeng/primeng';
import {TranslateService} from '@ngx-translate/core';
import {CostGroup} from '../cost-group/cost-group.model';
import {CostGroupService} from '../cost-group/cost-group.service';
import {HttpErrorResponse, HttpResponse} from '@angular/common/http';

@Component({
    selector: 'jhi-cost-rate',
    templateUrl: './cost-rate.component.html'
})
export class CostRateComponent implements OnInit, OnDestroy {
    currentAccount: any;
    costRates: CostRate[];
    costRate: CostRate = new CostRate();
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
    costId: number;
    costGroupId: number;
    cost: Cost;
    parentCost: Cost;
    breadcrumbItems: any[];
    rateType = RateType;
    currencies: Currency[];
    costs: Cost[];
    costGroup: CostGroup;

    constructor(private costRateService: CostRateService,
                private currencyService: CurrencyService,
                private costService: CostService,
                private costGroupService: CostGroupService,
                private parseLinks: JhiParseLinks,
                private jhiAlertService: JhiAlertService,
                private principal: Principal,
                private activatedRoute: ActivatedRoute,
                private router: Router,
                private translateService: TranslateService,
                private eventManager: JhiEventManager) {
        this.routeData = this.activatedRoute.data.subscribe(data => {
            this.itemsPerPage = data.pagingParams.size;
            this.page = data.pagingParams.page;
            this.previousPage = data.pagingParams.page;
            this.reverse = !data.pagingParams.ascending;
            this.predicate = data.pagingParams.predicate;
        });
        this.currentSearch = activatedRoute.snapshot.queryParams['search'] ? activatedRoute.snapshot.queryParams['search'] : '';
        this.costId = activatedRoute.snapshot.params['costId'];
        this.costGroupId = activatedRoute.snapshot.params['costGroupId'];

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
                if (value[0].indexOf('.') > 0) {
                    const z = value[0].split('.');
                    value[0] = z[0] + z[1].substring(0, 1).toUpperCase() + z[1].substring(1);
                    this.costRate[value[0]] = Number(value[1]);
                } else {
                    this.costRate[value[0]] = value[1];
                }
            }
        }
    }

    loadAll() {
        this.costRateService.query(this.costId, {
            query: this.currentSearch.length > 0 ? this.currentSearch : null,
            page: this.page - 1,
            size: this.itemsPerPage,
            sort: this.sort()
        }).subscribe(
            (res: HttpResponse<CostRate[]>) => this.onSuccess(res.body, res.headers),
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    clear() {
        this.page = 0;
        this.currentSearch = '';

        this.router.navigate([`cost-group/${this.costGroupId}/cost/${this.costId}/cost-rate`], {
            queryParams: {
                page: this.page,
                sort: this.predicate + ',' + (this.reverse ? 'desc' : 'asc')
            }
        });
        this.costRate = new CostRate();
        this.loadAll();
    }

    getRateTypeCurrency(currencyTitle) {
        if ( this.cost.rateType === this.rateType[RateType.PERCENT]) {
             return 'درصد';
        }
        return currencyTitle;
    }

    search() {
        this.page = 0;
        this.currentSearch = '';
        if (this.costRate.startDate) {
            this.currentSearch += 'startDate→' + this.costRate.startDate.toISOString() + '&';
        }
        if (this.costRate.finishDate) {
            this.currentSearch += 'finishDate→' + this.costRate.finishDate.toISOString() + '&';
        }
        if (this.costRate.rate) {
            this.currentSearch += 'rate☼' + this.costRate.rate + '&';
        }
        if (this.costRate.currencyId) {
            this.currentSearch += 'currency.id☼' + this.costRate.currencyId + '&';
        }
        if (this.costRate.costId) {
            this.currentSearch += 'cost.id☼' + this.costRate.costId + '&';
        }
        if (this.currentSearch.length > 0) {
            this.currentSearch = this.currentSearch.substring(0, this.currentSearch.length - 1);
        }
        this.router.navigate([`cost-group/${this.costGroupId}/cost/${this.costId}/cost-rate`], {
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
        this.translateService.get('niopdcgatewayApp.costRate.home.costGroupTitle').subscribe(title => {
            this.breadcrumbItems.push({
                label: title + ` (${(this.costGroup) ? this.costGroup.title : ''})`,
                routerLink: ['/cost-group']
            });
        });

        if (!this.costGroup.singleCost) {
            this.translateService.get('niopdcgatewayApp.costRate.home.costTitle').subscribe(title => {
                this.breadcrumbItems.push({
                    label: title,
                    routerLink: ['/cost-group/' + this.costGroupId + '/cost']
                });
            });
        }
        if (this.parentCost) {
            this.translateService.get('niopdcgatewayApp.costRate.home.costTitle').subscribe(title => {
                this.breadcrumbItems.push({
                    label: title,
                    routerLink: ['/cost-group/' + this.costGroupId + '/cost/' + this.parentCost.id + '/cost']
                });
            });
        }
        this.translateService.get('niopdcgatewayApp.costRate.home.title').subscribe(title => {
            this.breadcrumbItems.push({label: title});
        });
    }

    ngOnInit() {
        this.costGroupService.find(this.costGroupId).subscribe(costGroup => {
            this.costGroup = costGroup.body;
            this.costService.find(this.costId).subscribe(cost => {
                    this.cost = cost.body;
                    if (this.cost.parentId) {
                        this.costService.find(this.cost.parentId)
                            .subscribe(parentCost => {
                                this.parentCost = parentCost.body;
                                this.setBreadCrumb();
                            });
                    } else {
                        this.setBreadCrumb();
                    }
                }
            );
        });
        this.principal.identity().then(account => {
            this.currentAccount = account;
        });

        this.currencyService.query().subscribe(res => {
                this.currencies = res.body;
            }
        );
        this.costService.query(this.costGroupId).subscribe(res => {
                this.costs = res.body;
            }
        );

        this.registerChangeInCostRates();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: CostRate) {
        return item.id;
    }

    trackCurrencyById(index: number, item: Currency) {
        return item.id;
    }

    trackCostById(index: number, item: Cost) {
        return item.id;
    }

    registerChangeInCostRates() {
        this.eventSubscriber = this.eventManager.subscribe('costRateListModification', response => this.loadAll());
    }

    sort() {
        const result = [this.predicate + ',' + (this.reverse ? 'desc' : 'asc')];

        return result;
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
            this.reverse !== reverse) {

            this.router.navigate([`cost-group/${this.costGroupId}/cost/${this.costId}/cost-rate`], {
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

    private onSuccess(data, headers) {
        this.links = this.parseLinks.parse(headers.get('link'));
        this.totalItems = headers.get('X-Total-Count');
        this.queryCount = this.totalItems;
        // this.page = pagingParams.page;
        this.costRates = data;
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
