import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Subscription} from 'rxjs/Subscription';
import {JhiAlertService, JhiEventManager, JhiParseLinks} from 'ng-jhipster';

import {Principal} from '../../shared';
import {CostGroup, CostGroupService, CostGroupType, CostMethod} from '../cost-group/.';
import {Cost, CostService} from '../cost/.';
import {LazyLoadEvent} from 'primeng/primeng';
import {TranslateService} from '@ngx-translate/core';
import {HttpErrorResponse, HttpResponse} from '@angular/common/http';

@Component({
    selector: 'jhi-cost',
    templateUrl: './cost.component.html'
})
export class CostComponent implements OnInit, OnDestroy {

    currentAccount: any;
    costs: Cost[];
    cost: Cost = new Cost();
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
    costGroup: CostGroup = new CostGroup();
    CostGroupType = CostGroupType;
    CostMethod = CostMethod;
    breadcrumbItems: any[];
    costId: number;

    costgroups: CostGroup[];
    parents: Cost[];

    constructor(private costService: CostService,
                private parentService: CostService,
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
        this.costGroupId = activatedRoute.snapshot.params['costGroupId'];
        this.costId = activatedRoute.snapshot.params['costId'];

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
                    this.cost[value[0]] = Number(value[1]);
                } else {
                    this.cost[value[0]] = value[1];
                }
            }
        }
    }

    loadAll() {
        if (!this.costId) {
            this.costService.query(this.costGroupId, {
                query: this.currentSearch.length > 0 ? this.currentSearch : null,
                page: this.page - 1,
                size: this.itemsPerPage,
                sort: this.sort()
            }).subscribe(
                (res: HttpResponse<Cost[]>) => this.onSuccess(res.body, res.headers),
                (res: HttpErrorResponse) => this.onError(res.message)
            );
        } else {
            this.costService.queryByCost(this.costId, {
                query: this.currentSearch.length > 0 ? this.currentSearch : null,
                page: this.page - 1,
                size: this.itemsPerPage,
                sort: this.sort()
            }).subscribe(
                (res: HttpResponse<Cost[]>) => this.onSuccess(res.body, res.headers),
                (res: HttpErrorResponse) => this.onError(res.message)
            );
        }
    }

    clear() {
        this.page = 0;
        this.currentSearch = '';
        if (!this.costId) {
            this.router.navigate([`cost-group/${this.costGroupId}/cost`, {
                page: this.page,
                sort: this.predicate + ',' + (this.reverse ? 'desc' : 'asc')
            }]);
        } else {
            this.router.navigate([`cost-group/${this.costGroupId}/cost/${this.costId}/cost`, {
                page: this.page,
                sort: this.predicate + ',' + (this.reverse ? 'desc' : 'asc')
            }]);
        }
        this.cost = new Cost();
        this.loadAll();
    }

    search() {
        this.page = 0;
        this.currentSearch = '';
        if (this.cost.rateType) {
            this.currentSearch += 'rateType#RateType.' + this.cost.rateType + '&';
        }
        if (this.cost.effect) {
            this.currentSearch += 'effect#Effect.' + this.cost.effect + '&';
        }
        if (this.cost.costAction) {
            this.currentSearch += 'costAction#CostAction.' + this.cost.costAction + '&';
        }
        if (this.cost.costRelated) {
            this.currentSearch += 'costRelated#CostRelated.' + this.cost.costRelated + '&';
        }
        if (this.cost.costType) {
            this.currentSearch += 'costType#CostType.' + this.cost.costType + '&';
        }
        if (this.cost.startLitre) {
            this.currentSearch += 'startLitre☼' + this.cost.startLitre + '&';
        }
        if (this.cost.endLitre) {
            this.currentSearch += 'endLitre☼' + this.cost.endLitre + '&';
        }
        if (this.cost.costGroupId) {
            this.currentSearch += 'costGroup.id☼' + this.cost.costGroupId + '&';
        }
        if (this.cost.parentId) {
            this.currentSearch += 'parent.id☼' + this.cost.parentId + '&';
        }
        if (this.currentSearch.length > 0) {
            this.currentSearch = this.currentSearch.substring(0, this.currentSearch.length - 1);
        }

        if (!this.costId) {
            this.router.navigate([`cost-group/${this.costGroupId}/cost`, {
                search: this.currentSearch,
                page: this.page,
                sort: this.predicate + ',' + (this.reverse ? 'desc' : 'asc')
            }]);
        } else {
            this.router.navigate([`cost-group/${this.costGroupId}/cost/${this.costId}/cost`, {
                search: this.currentSearch,
                page: this.page,
                sort: this.predicate + ',' + (this.reverse ? 'desc' : 'asc')
            }]);
        }
        this.loadAll();
    }

    setBreadCrumb() {
        this.breadcrumbItems = [];
        this.translateService.get('global.menu.home').subscribe(title => {
            this.breadcrumbItems.push({label: title, routerLink: ['/']});
        });
        this.translateService.get('niopdcgatewayApp.cost.home.costGroupTitle').subscribe(title => {
            this.breadcrumbItems.push({label: title + ` (${this.costGroup.title})`, routerLink: ['/cost-group']});
        });

      if (!this.costGroup.singleCost) {
        this.translateService.get('niopdcgatewayApp.cost.home.title').subscribe(title => {
            this.breadcrumbItems.push({label: title, routerLink: ['/cost-group/' + this.costGroupId + '/cost']});
        });
      }

        if (this.costId) {
            this.translateService.get('niopdcgatewayApp.cost.home.title').subscribe(title => {
                this.breadcrumbItems.push({label: title});
            });
        }

    }

    ngOnInit() {
        this.principal.identity().then(account => {
            this.currentAccount = account;
        });

        this.costGroupService.query().subscribe(res => {
                this.costgroups = res.body;
            }
        );
        this.parentService.query(this.costGroupId).subscribe(res => {
                this.parents = res.body;
            }
        );

        this.registerChangeInCosts();

        if (this.costGroupId) {
            this.costGroupService.find(this.costGroupId).subscribe(
                (costGroup: HttpResponse<CostGroup>) => {
                    this.costGroup = costGroup.body;
                    this.setBreadCrumb();
                }
            );
        } else if (this.costId) {
            this.costService.find(this.costId).subscribe(cost => {
                this.cost = cost.body;
                this.costGroupService.find(this.cost.costGroupId).subscribe(costGroup => {
                        this.costGroup = costGroup.body;
                        this.setBreadCrumb();
                    }
                );
            });
        }
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: Cost) {
        return item.id;
    }

    trackCostGroupById(index: number, item: CostGroup) {
        return item.id;
    }

    trackCostById(index: number, item: Cost) {
        return item.id;
    }

    registerChangeInCosts() {
        this.eventSubscriber = this.eventManager.subscribe('costListModification',response => this.loadAll());
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

            if (!this.costId) {
                this.router.navigate(['cost-group', this.costGroupId, 'cost'], {
                    queryParams: {
                        page: this.page,
                        size: this.itemsPerPage,
                        search: this.currentSearch,
                        sort: this.predicate + ',' + (this.reverse ? 'desc' : 'asc')
                    }
                });
            } else {
                this.router.navigate(['cost-group', this.costGroupId, 'cost', this.costId, 'cost'], {
                    queryParams: {
                        page: this.page,
                        size: this.itemsPerPage,
                        search: this.currentSearch,
                        sort: this.predicate + ',' + (this.reverse ? 'desc' : 'asc')
                    }
                });
            }
        }

        this.loadAll();
    }

    private onSuccess(data, headers) {
        this.links = this.parseLinks.parse(headers.get('link'));
        this.totalItems = headers.get('X-Total-Count');
        this.queryCount = this.totalItems;
        // this.page = pagingParams.page;
        this.costs = data;
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
