import {Component, OnDestroy, OnInit} from '@angular/core';
import {HttpErrorResponse, HttpResponse} from '@angular/common/http';
import {ActivatedRoute, Router} from '@angular/router';
import {Subscription} from 'rxjs/Subscription';
import {JhiAlertService, JhiEventManager, JhiParseLinks} from 'ng-jhipster';

import {ChangeContainer} from './change-container.model';
import {ChangeContainerService} from './change-container.service';
import {Principal} from '../../../shared';
import {LazyLoadEvent} from 'primeng/primeng';
import {TranslateService} from '@ngx-translate/core';
import {Container, ContainerService} from '../../container';
import {Product, ProductService} from '../../product';
import {DateJalaliPipe} from '../../../shared/ng2-datetimepicker-jalali/date-jalali.pipe';
import {HotkeyService} from '../../../shared/hotkey/HotkeyService';
import {DayDepotContainer, DayDepotContainerService} from '../day-depot-container';
import {DayDepot, DayDepotService} from '../day-depot';
import {MainDayDepot, MainDayDepotService} from '../main-day-depot';
import {MainDayOperation, MainDayOperationService} from '../main-day-operation';
import {OilTankContainer, OilTankContainerService} from '../oil-tank-container';

@Component({
    selector: 'jhi-change-container',
    templateUrl: './change-container.component.html'
})
export class ChangeContainerComponent implements OnInit, OnDestroy {

    currentAccount: any;
    changeContainers: ChangeContainer[];
    changeContainer: ChangeContainer = new ChangeContainer();
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
    dayDepotContainerId: number;
    dayDepotId: number;
    mainDayDepotId: number;
    dayDepotContainer: DayDepotContainer;
    dayDepotContainerTitle: any;
    dayDepot: DayDepot;
    breadcrumbItems: any[];
    sources: DayDepotContainer[];
    targets: DayDepotContainer[];
    mainDayDepot: MainDayDepot;
    mainDayOperationId: number;
    mainDayOperation: MainDayOperation;
    editable: Boolean;

    constructor(private changeContainerService: ChangeContainerService,
                private mainDayDepotService: MainDayDepotService,
                private dayDepotContainerService: DayDepotContainerService,
                private containerService: ContainerService,
                private productService: ProductService,
                private dayDepotService: DayDepotService,
                private oilTankContainerService: OilTankContainerService,
                private mainDayOperationService: MainDayOperationService,
                private parseLinks: JhiParseLinks,
                private jhiAlertService: JhiAlertService,
                private principal: Principal,
                private activatedRoute: ActivatedRoute,
                private router: Router,
                private hotKeyService: HotkeyService,
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
        this.mainDayDepotId = activatedRoute.snapshot.params['mainDayDepotId'];
        this.mainDayOperationId = activatedRoute.snapshot.params['mainDayOperationId'];
        this.dayDepotContainerId = activatedRoute.snapshot.params['dayDepotContainerId'];
        this.dayDepotId = activatedRoute.snapshot.params['dayDepotId'];

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
                    this.changeContainer[value[0]] = Number(value[1]);
                } else {
                    this.changeContainer[value[0]] = value[1];
                }
            }
        }
        let url;
        if (this.dayDepotContainerId) {
            url = 'change-container-new\/day-depot-container\/' + this.dayDepotContainerId;
        } else {
            url = 'change-container-new\/day-depot\/' + this.dayDepotId;
        }
        this.hotKeyService.add('ins',
            url, null, true);
    }

    loadAll() {
        if (this.dayDepotContainerId != null) {
            this.changeContainerService.queryDayDepotContainerId(this.dayDepotContainerId, {
                query: this.currentSearch.length > 0 ? this.currentSearch : null,
                page: this.page,
                size: this.itemsPerPage,
                sort: this.sort()
            }).subscribe(
                (res: HttpResponse<ChangeContainer[]>) => this.onSuccess(res.body, res.headers),
                (res: HttpErrorResponse) => this.onError(res.message)
            );
        } else if (this.dayDepotId != null) {
            this.changeContainerService.queryDayDepotId(this.dayDepotId, {
                query: this.currentSearch.length > 0 ? this.currentSearch : null,
                page: this.page,
                size: this.itemsPerPage,
                sort: this.sort()
            }).subscribe(
                (res: HttpResponse<ChangeContainer[]>) => this.onSuccess(res.body, res.headers),
                (res: HttpErrorResponse) => this.onError(res.message)
            );
        }
    }

    clear() {
        this.page = 0;
        this.currentSearch = '';
        if (this.mainDayDepotId) {
            if (this.dayDepotContainerId != null) {
                this.router.navigate(['main-day-depot/' + this.mainDayDepotId + '/day-depot-container/' + this.dayDepotContainerId + '/change-container', {
                    page: this.page,
                    sort: this.predicate + ',' + (this.reverse ? 'desc' : 'asc')
                }]);
            } else if (this.dayDepotId != null) {
                this.router.navigate(['main-day-depot/' + this.mainDayDepotId + '/day-depot/' + this.dayDepotId + '/change-container', {
                    page: this.page,
                    sort: this.predicate + ',' + (this.reverse ? 'desc' : 'asc')
                }]);
            }
        } else if (this.mainDayOperation) {
            this.router.navigate(['main-day-operation/' + this.mainDayOperationId + '/day-depot/' + this.dayDepotId + '/change-container', {
                page: this.page,
                sort: this.predicate + ',' + (this.reverse ? 'desc' : 'asc')
            }]);
        }
        this.changeContainer = new ChangeContainer();
        this.loadAll();
    }

    search() {
        this.page = 0;
        this.currentSearch = '';
        if (this.changeContainer.amount) {
            this.currentSearch += 'amount☼' + this.changeContainer.amount + '&';
        }
        if (this.changeContainer.count) {
            this.currentSearch += 'count☼' + this.changeContainer.count + '&';
        }
        if (this.changeContainer.changeContainerType) {
            this.currentSearch += 'changeContainerType#ChangeContainerType.' + this.changeContainer.changeContainerType + '&';
        }
        if (this.changeContainer.sourceId) {
            this.currentSearch += 'source.id☼' + this.changeContainer.sourceId + '&';
        }
        if (this.changeContainer.targetId) {
            this.currentSearch += 'target.id☼' + this.changeContainer.targetId + '&';
        }
        if (this.currentSearch.length > 0) {
            this.currentSearch = this.currentSearch.substring(0, this.currentSearch.length - 1);
        }

        if (this.mainDayDepotId) {
            if (this.dayDepotContainerId != null) {
                this.router.navigate(['main-day-depot/' + this.mainDayDepotId + '/day-depot-container/' + this.dayDepotContainerId + '/change-container', {
                    search: this.currentSearch,
                    page: this.page,
                    sort: this.predicate + ',' + (this.reverse ? 'desc' : 'asc')
                }]);
            } else if (this.dayDepotId != null) {
                this.router.navigate(['main-day-depot/' + this.mainDayDepotId + '/day-depot/' + this.dayDepotId + '/change-container', {
                    search: this.currentSearch,
                    page: this.page,
                    sort: this.predicate + ',' + (this.reverse ? 'desc' : 'asc')
                }]);
            }
        } else if (this.mainDayOperationId) {
            this.router.navigate(['main-day-operation/' + this.mainDayOperationId + '/day-depot/' + this.dayDepotId + '/change-container', {
                search: this.currentSearch,
                page: this.page,
                sort: this.predicate + ',' + (this.reverse ? 'desc' : 'asc')
            }]);
        }
        this.loadAll();
    }

    setBreadCrumb() {
        this.breadcrumbItems = [];
        const dateJalaliPipe = new DateJalaliPipe();
        const mainDayDepotUrl = '/main-day-depot';
        const mainDayOperationUrl = '/main-day-operation';
        const dayDepotContainerUrl = mainDayDepotUrl + '/' + this.mainDayDepotId + '/day-depot-container';
        const dayDepotUrl = mainDayDepotUrl + '/' + this.mainDayDepotId + '/day-depot';
        const dayDepotOperationUrl = mainDayOperationUrl + '/' + this.mainDayOperationId + '/day-depot';
        this.translateService.get('global.menu.home').subscribe(title => {
            this.breadcrumbItems.push({label: title, routerLink: ['/']});
        });
        if (this.mainDayDepotId) {
            this.translateService.get('niopdcgatewayApp.transfer.home.mainDayDepotTitle').subscribe(title => {
                this.breadcrumbItems.push({
                    label: `${title} (${dateJalaliPipe.transform(this.mainDayDepot.day)})`,
                    routerLink: [mainDayDepotUrl]
                });
            });
        } else if (this.mainDayOperationId) {
            this.translateService.get('niopdcgatewayApp.mainDayOperation.home.title').subscribe(title => {
                this.breadcrumbItems.push({
                    label: `${title} (${dateJalaliPipe.transform(this.mainDayOperation.day)})`,
                    routerLink: [mainDayOperationUrl]
                });
            });
        }
        if (this.dayDepotContainerId != null) {
            this.translateService.get('niopdcgatewayApp.changeContainer.home.dayDepotContainerTitle').subscribe(title => {
                this.breadcrumbItems.push({
                    label: title + `(${this.dayDepotContainerTitle})`,
                    routerLink: [dayDepotContainerUrl]
                });
            });
        } else if (this.dayDepotId != null) {
            if (this.mainDayOperationId) {
                this.translateService.get('niopdcgatewayApp.changeContainer.home.dayDepotTitle').subscribe(title => {
                    this.breadcrumbItems.push({
                        label: title + `(${this.dayDepot.oilTankTitle})`,
                        routerLink: [dayDepotOperationUrl]
                    });
                });
            } else if (this.mainDayDepotId) {
                this.translateService.get('niopdcgatewayApp.changeContainer.home.dayDepotTitle').subscribe(title => {
                    this.breadcrumbItems.push({
                        label: title + `(${this.dayDepot.oilTankTitle})`,
                        routerLink: [dayDepotUrl]
                    });
                });
            }
        }
        this.translateService.get('niopdcgatewayApp.changeContainer.home.title').subscribe(title => {
            this.breadcrumbItems.push({label: title});
        });
    }

    ngOnInit() {
        this.loadAll();
        this.principal.identity().then(account => {
            this.currentAccount = account;
        });

        if (this.mainDayDepotId) {
            this.dayDepotContainerService.query(this.mainDayDepotId).subscribe(
                (res: HttpResponse<DayDepotContainer[]>) => {
                    this.sources = res.body;
                    this.targets = res.body;
                }
            );
        } else if (this.mainDayOperationId) {
            this.dayDepotContainerService.queryByMainDayOperationId(this.mainDayOperationId).subscribe(res => {
                this.sources = res.body;
                this.targets = res.body;
            });
        }
        this.registerChangeInChangeContainers();

        if (this.dayDepotContainerId != null) {
            this.mainDayDepotService.find(this.mainDayDepotId)
                .subscribe((res: HttpResponse<MainDayDepot>) => {
                    this.mainDayDepot = res.body;
                    this.dayDepotContainerService.find(this.dayDepotContainerId).subscribe(
                        (dayDepotContainer: HttpResponse<DayDepotContainer>) => {
                            this.dayDepotContainer = dayDepotContainer.body;
                            this.oilTankContainerService.find(this.dayDepotContainer.oilTankContainerId)
                                .subscribe((oilTankContainer: HttpResponse<OilTankContainer>) => {
                                    if (oilTankContainer.body.productId) {
                                        this.productService.find(oilTankContainer.body.productId)
                                            .subscribe((product: HttpResponse<Product>) => {
                                                this.dayDepotContainerTitle = product.body.title;
                                                this.setBreadCrumb();
                                            });
                                    } else {
                                        this.containerService.find(oilTankContainer.body.productUnitId)
                                            .subscribe((container: HttpResponse<Container>) => {
                                                this.dayDepotContainerTitle = container.body.title;
                                                this.setBreadCrumb();
                                            });
                                    }
                                });
                        }
                    );
                });
        } else if (this.dayDepotId != null) {
            if (this.mainDayOperationId) {
                this.mainDayOperationService.find(this.mainDayOperationId)
                    .subscribe((res: HttpResponse<MainDayOperation>) => {
                        this.mainDayOperation = res.body;
                        this.dayDepotService.find(this.dayDepotId).subscribe(
                            (dayDepot: HttpResponse<DayDepot>) => {
                                this.dayDepot = dayDepot.body;
                                this.setBreadCrumb();
                            }
                        );
                    });
            } else if (this.mainDayDepotId) {
                this.mainDayDepotService.find(this.mainDayDepotId)
                    .subscribe((res: HttpResponse<MainDayDepot>) => {
                        this.mainDayDepot = res.body;
                        this.dayDepotService.find(this.dayDepotId).subscribe(
                            (dayDepot: HttpResponse<DayDepot>) => {
                                this.dayDepot = dayDepot.body;
                                this.setBreadCrumb();
                            }
                        );
                    });
            }
        }

        if (this.mainDayDepotId != null) {
            this.mainDayDepotService.editable(this.mainDayDepotId).subscribe(res => {
                    this.editable = res;
                }
            );
        }
        if (this.mainDayOperationId != null) {
            this.mainDayOperationService.editable(this.mainDayOperationId).subscribe(res => {
                    this.editable = res;
                }
            );
        }
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: ChangeContainer) {
        return item.id;
    }

    trackDayDepotContainerById(index: number, item: DayDepotContainer) {
        return item.id;
    }

    trackDayDepotById(index: number, item: DayDepot) {
        return item.id;
    }

    registerChangeInChangeContainers() {
        this.eventSubscriber = this.eventManager.subscribe('changeContainerListModification',response => this.loadAll());
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

            if (this.dayDepotContainerId != null) {
                this.router.navigate(['main-day-depot', this.mainDayDepotId, 'day-depot-container', this.dayDepotContainerId, 'change-container'], {
                    queryParams: {
                        page: this.page,
                        size: this.itemsPerPage,
                        search: this.currentSearch,
                        sort: this.predicate + ',' + (this.reverse ? 'desc' : 'asc')
                    }
                });
            } else if (this.dayDepotId != null) {
                if (this.mainDayDepotId) {
                    this.router.navigate(['main-day-depot', this.mainDayDepotId, 'day-depot', this.dayDepotId, 'change-container'], {
                        queryParams: {
                            page: this.page,
                            size: this.itemsPerPage,
                            search: this.currentSearch,
                            sort: this.predicate + ',' + (this.reverse ? 'desc' : 'asc')
                        }
                    });
                } else {
                    this.router.navigate(['main-day-operation', this.mainDayOperationId, 'day-depot', this.dayDepotId, 'change-container'], {
                        queryParams: {
                            page: this.page,
                            size: this.itemsPerPage,
                            search: this.currentSearch,
                            sort: this.predicate + ',' + (this.reverse ? 'desc' : 'asc')
                        }
                    });
                }
            }
        }

        this.loadAll();
    }

    private onSuccess(data, headers) {
        this.links = this.parseLinks.parse(headers.get('link'));
        this.totalItems = headers.get('X-Total-Count');
        this.queryCount = this.totalItems;
        // this.page = pagingParams.page;
        this.changeContainers = data;
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }

}
