import {Component, OnDestroy, OnInit} from '@angular/core';
import {HttpErrorResponse, HttpResponse} from '@angular/common/http';
import {ActivatedRoute, Router} from '@angular/router';
import {Subscription} from 'rxjs/Subscription';
import {JhiAlertService, JhiEventManager, JhiParseLinks} from 'ng-jhipster';

import {CostElement} from './cost-element.model';
import {CostElementService} from './cost-element.service';
import {ITEMS_PER_PAGE, Principal} from '../../shared';
import {CostGroup, CostGroupService} from '../cost-group/.';
import {Cost, CostService} from '../cost/.';
import {LazyLoadEvent} from 'primeng/primeng';
import {TranslateService} from '@ngx-translate/core';

@Component({
    selector: 'jhi-cost-element',
    templateUrl: './cost-element.component.html'
})
export class CostElementComponent implements OnInit, OnDestroy {

    currentAccount: any;
    costElements: CostElement[];
    costElement: CostElement = new CostElement();
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
    costGroupId: number;
    costId: number;
    parentCostId: number;
    costGroup: CostGroup;
    cost: Cost;
    parentCost: Cost;
    breadcrumbItems: any[];

    costgroups: CostGroup[];
    costs: Cost[];

    constructor(
        private costElementService: CostElementService,
        private costGroupService: CostGroupService,
        private costService: CostService,
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
            this.reverse = !data.pagingParams.ascending;
            this.predicate = data.pagingParams.predicate;
        });
        this.currentSearch = activatedRoute.snapshot.queryParams['search'] ? activatedRoute.snapshot.queryParams['search'] : '';
        this.costGroupId = activatedRoute.snapshot.params['costGroupId'];
        this.costId = activatedRoute.snapshot.params['costId'];
        this.parentCostId = activatedRoute.snapshot.params['parentCostId'];

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
                    this.costElement[value[0]] = Number(value[1]);
                } else {
                    this.costElement[value[0]] = value[1];
                }
            }
        }
    }

    loadAll() {
        if (!this.costId) {
            this.costElementService.query(this.costGroupId, {
                query: this.currentSearch.length > 0 ? this.currentSearch : null,
                page: this.page - 1,
                size: this.itemsPerPage,
                sort: this.sort()
            }).subscribe(
                (res: HttpResponse<CostElement[]>) => this.onSuccess(res.body, res.headers),
                (res: HttpErrorResponse) => this.onError(res.message)
            );
        } else if (this.costId) {
            this.costElementService.queryByCost(this.costId, {
                query: this.currentSearch.length > 0 ? this.currentSearch : null,
                page: this.page - 1,
                size: this.itemsPerPage,
                sort: this.sort()
            }).subscribe(
                (res: HttpResponse<CostElement[]>) => this.onSuccess(res.body, res.headers),
                (res: HttpErrorResponse) => this.onError(res.message)
            );
        }
    }

    clear() {
        this.page = 0;
        this.currentSearch = '';

        if (!this.costId) {
            this.router.navigate(['cost-group/' + this.costGroupId + '/cost-element', {
                page: this.page,
                sort: this.predicate + ',' + (this.reverse ? 'desc' : 'asc')
            }]);
            this.loadAll();
        } else if (this.parentCostId) {
            this.router.navigate(['cost-group/' + this.costGroupId + '/cost' + this.parentCostId + '/cost' + this.costId + '/cost-element', {
                page: this.page,
                sort: this.predicate + ',' + (this.reverse ? 'desc' : 'asc')
            }]);
            this.loadAll();
        } else {
            this.router.navigate(['cost-group/' + this.costGroupId + '/cost' + this.costId + '/cost-element', {
                page: this.page,
                sort: this.predicate + ',' + (this.reverse ? 'desc' : 'asc')
            }]);
            this.loadAll();
        }
        this.costElement = new CostElement();

    }

    search() {
        this.page = 0;
        this.currentSearch = '';
        if (this.costElement.code) {
            this.currentSearch += 'code$' + this.costElement.code + '&';
        }
        if (this.costElement.customerGroup) {
            this.currentSearch += 'customerGroup#CustomerGroup.' + this.costElement.customerGroup + '&';
        }
        if (this.costElement.costGroupId) {
            this.currentSearch += 'costGroup.id☼' + this.costElement.costGroupId + '&';
        }
        if (this.costElement.costId) {
            this.currentSearch += 'cost.id☼' + this.costElement.costId + '&';
        }
        if (this.currentSearch.length > 0) {
            this.currentSearch = this.currentSearch.substring(0, this.currentSearch.length - 1);
        }

        if (!this.costId) {
            this.router.navigate(['cost-group/' + this.costGroupId + '/cost-element', {
                search: this.currentSearch,
                page: this.page,
                sort: this.predicate + ',' + (this.reverse ? 'desc' : 'asc')
            }]);
            this.loadAll();
        } else {
            this.router.navigate(['cost-group/' + this.costGroupId + '/cost' + this.costId + '/cost-element', {
                search: this.currentSearch,
                page: this.page,
                sort: this.predicate + ',' + (this.reverse ? 'desc' : 'asc')
            }]);
            this.loadAll();
        }
    }

    setBreadCrumb() {
        this.breadcrumbItems = [];
        this.translateService.get('global.menu.home').subscribe(title => {
            this.breadcrumbItems.push({label: title, routerLink: ['/']});
        });
        this.translateService.get('niopdcgatewayApp.costElement.home.costGroupTitle').subscribe(title => {
            this.breadcrumbItems.push({label: title + ` (${this.costGroup.title})`, routerLink: ['/cost-group']});
        });
        if (this.parentCost) {
            this.translateService.get('niopdcgatewayApp.costElement.home.costTitle').subscribe(title => {
                this.breadcrumbItems.push({
                    label: title,
                    routerLink: [`/cost-group/${this.costGroupId}/cost/${this.parentCostId}/cost`]
                });
            });
            this.translateService.get('niopdcgatewayApp.costElement.home.costTitle').subscribe(title => {
                this.breadcrumbItems.push({
                    label: title,
                    routerLink: [`/cost-group/${this.costGroupId}/cost`]
                });
            });
        } else if (this.costId) {
            this.translateService.get('niopdcgatewayApp.costElement.home.costTitle').subscribe(title => {
                this.breadcrumbItems.push({
                    label: title,
                    routerLink: [`/cost-group/${this.costGroupId}/cost`]
                });
            });
        }
        this.translateService.get('niopdcgatewayApp.costElement.home.title').subscribe(title => {
            this.breadcrumbItems.push({label: title});
        });
    }

    ngOnInit() {
        this.principal.identity().then(account => {
            this.currentAccount = account;
        });

        this.registerChangeInCostElements();

        this.costGroupService.find(this.costGroupId).subscribe(costGroup => {
                this.costGroup = costGroup.body;
                if (this.parentCostId) {
                    this.costService.find(this.parentCostId)
                        .subscribe(parentCost => {
                            this.parentCost = parentCost.body;
                            this.costService.find(this.costId)
                                .subscribe(value => {
                                    this.cost = value.body;
                                    this.setBreadCrumb();
                                });
                        });
                } else if (this.costId) {
                    this.costService.find(this.costId)
                        .subscribe(value => {
                            this.cost = value.body;
                            this.setBreadCrumb();
                        });
                } else {
                    this.setBreadCrumb();
                }
            }
        );
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: CostElement) {
        return item.id;
    }

    trackCostGroupById(index: number, item: CostGroup) {
        return item.id;
    }

    trackCostById(index: number, item: Cost) {
        return item.id;
    }

    registerChangeInCostElements() {
        this.eventSubscriber = this.eventManager.subscribe('costElementListModification',response => this.loadAll());
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
        this.costElements = data;
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

            if (!this.costId) {
                this.router.navigate(['cost-group/' + this.costGroupId + '/cost-element'], {
                    queryParams: {
                        page: this.page,
                        size: this.itemsPerPage,
                        search: this.currentSearch,
                        sort: this.predicate + ',' + (this.reverse ? 'desc' : 'asc')
                    }
                });
                this.loadAll();
            } else if (this.parentCostId) {
                this.router.navigate(['cost-group/' + this.costGroupId + '/cost' + this.parentCostId + '/cost' + this.costId + '/cost-element'], {
                    queryParams: {
                        page: this.page,
                        size: this.itemsPerPage,
                        search: this.currentSearch,
                        sort: this.predicate + ',' + (this.reverse ? 'desc' : 'asc')
                    }
                });
                this.loadAll();
            } else {
                this.router.navigate(['cost-group/' + this.costGroupId + '/cost' + this.costId + '/cost-element'], {
                    queryParams: {
                        page: this.page,
                        size: this.itemsPerPage,
                        search: this.currentSearch,
                        sort: this.predicate + ',' + (this.reverse ? 'desc' : 'asc')
                    }
                });
                this.loadAll();
            }

        }

        this.loadAll();
    }

}
