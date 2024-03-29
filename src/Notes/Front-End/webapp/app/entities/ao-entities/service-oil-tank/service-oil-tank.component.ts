import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Subscription} from 'rxjs/Subscription';
import {JhiAlertService, JhiEventManager, JhiParseLinks} from 'ng-jhipster';

import {ServiceOilTank} from './service-oil-tank.model';
import {ServiceOilTankService} from './service-oil-tank.service';
import {Principal} from '../../../shared';
import {OilTank, OilTankService} from '../oil-tank/.';
import {LazyLoadEvent} from 'primeng/primeng';
import {TranslateService} from '@ngx-translate/core';
import {HttpErrorResponse, HttpResponse} from '@angular/common/http';
import {HotkeyService} from '../../../shared/hotkey/HotkeyService';

@Component({
    selector: 'jhi-service-oil-tank',
    templateUrl: './service-oil-tank.component.html'
})
export class ServiceOilTankComponent implements OnInit, OnDestroy {

    currentAccount: any;
    serviceOilTanks: ServiceOilTank[];
    serviceOilTank: ServiceOilTank = new ServiceOilTank();
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
    oilTankId: number;
    oilTank: OilTank;
    breadcrumbItems: any[];

    oiltanks: OilTank[];

    constructor(private serviceOilTankService: ServiceOilTankService,
                private oilTankService: OilTankService,
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
            this.page = data['pagingParams'].page;
            this.previousPage = data['pagingParams'].page;
            this.reverse = data['pagingParams'].ascending;
            this.predicate = data['pagingParams'].predicate;
        });
        this.currentSearch = activatedRoute.snapshot.queryParams['search'] ? activatedRoute.snapshot.queryParams['search'] : '';
        this.oilTankId = activatedRoute.snapshot.params['oilTankId'];

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
                    this.serviceOilTank[value[0]] = Number(value[1]);
                } else if (value[0] === 'active') {
                    this.serviceOilTank[value[0]] = Boolean(value[1]);
                } else {
                    this.serviceOilTank[value[0]] = value[1];
                }
            }
        }
    }

    loadAll() {
        this.serviceOilTankService.queryByOilTankId(this.oilTankId, {
            query: this.currentSearch.length > 0 ? this.currentSearch : null,
            page: this.page,
            size: this.itemsPerPage,
            sort: this.sort()
        }).subscribe(
            (res: HttpResponse<ServiceOilTank[]>) => this.onSuccess(res.body, res.headers),
            (res: HttpErrorResponse) => this.onError(res.message)
        );

    }

    clear() {
        this.page = 0;
        this.currentSearch = '';

        this.router.navigate(['oil-tank/' + this.oilTankId + '/service-oil-tank'], {
            queryParams: {
                page: this.page,
                sort: this.predicate + ',' + (this.reverse ? 'desc' : 'asc')
            }
        });
        this.serviceOilTank = new ServiceOilTank();
        this.loadAll();
    }

    search() {
        this.page = 0;
        this.currentSearch = '';
        if (this.serviceOilTank.title) {
            this.currentSearch += 'title$' + this.serviceOilTank.title + '&';
        }
        if (this.serviceOilTank.code) {
            this.currentSearch += 'code$' + this.serviceOilTank.code + '&';
        }
        if (this.serviceOilTank.virtualCapacity) {
            this.currentSearch += 'virtualCapacity☼' + this.serviceOilTank.virtualCapacity + '&';
        }
        if (this.serviceOilTank.capacity) {
            this.currentSearch += 'capacity☼' + this.serviceOilTank.capacity + '&';
        }
        if (this.serviceOilTank.oilTankStatus) {
            this.currentSearch += 'oilTankStatus#OilTankStatus.' + this.serviceOilTank.oilTankStatus + '&';
        }
        if (this.serviceOilTank.oilTankId) {
            this.currentSearch += 'oilTank.id☼' + this.serviceOilTank.oilTankId + '&';
        }
        if (this.currentSearch.length > 0) {
            this.currentSearch = this.currentSearch.substring(0, this.currentSearch.length - 1);
        }

        this.router.navigate(['oil-tank/' + this.oilTankId + '/service-oil-tank'], {
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
        this.translateService.get('niopdcgatewayApp.serviceOilTank.home.oilTankTitle').subscribe(title => {
            this.breadcrumbItems.push({label: title + ` (${this.oilTank.title})`, routerLink: ['/oil-tank']});
        });

        this.translateService.get('niopdcgatewayApp.serviceOilTank.home.title').subscribe(title => {
            this.breadcrumbItems.push({label: title});
        });
    }

    ngOnInit() {
        this.hotKeyService.add('ins', 'service-oil-tank-new/' + this.oilTankId, null, true);
        this.principal.identity().then(account => {
            this.currentAccount = account;
        });

        this.oilTankService.query().subscribe(res => {
                this.oiltanks = res.body;
            }
        );

        this.registerChangeInServiceOilTanks();

        this.oilTankService.find(this.oilTankId).subscribe(oilTank => {
                this.oilTank = oilTank.body;
                this.setBreadCrumb();
            }
        );
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: ServiceOilTank) {
        return item.id;
    }

    trackOilTankById(index: number, item: OilTank) {
        return item.id;
    }

    registerChangeInServiceOilTanks() {
        this.eventSubscriber = this.eventManager.subscribe('serviceOilTankListModification',response => this.loadAll());
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

        console.log(this.page,
            this.page, page,
            this.itemsPerPage, itemsPerPage,
            this.predicate, predicate,
            this.reverse, reverse);

        if (this.page > 1 ||
            this.page !== page ||
            this.itemsPerPage !== itemsPerPage ||
            this.predicate !== predicate ||
            this.reverse !== reverse) {

            this.router.navigate(['oil-tank', this.oilTankId, 'service-oil-tank'], {
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
        this.serviceOilTanks = data;
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }

}
