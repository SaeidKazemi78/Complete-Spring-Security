import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Subscription} from 'rxjs/Rx';
import {JhiAlertService, JhiEventManager, JhiParseLinks} from 'ng-jhipster';

import {Seal} from './seal.model';
import {SealService} from './seal.service';
import {Principal} from '../../shared';
import {LazyLoadEvent} from 'primeng/primeng';
import {TranslateService} from '@ngx-translate/core';
import {HttpErrorResponse, HttpResponse} from '@angular/common/http';
import {RefuelCenter, RefuelCenterService} from "app/entities/ao-entities/refuel-center";

@Component({
    selector: 'jhi-seal',
    templateUrl: './seal.component.html'
})
export class SealComponent implements OnInit, OnDestroy {


    currentAccount: any;
    seals: Seal[];
    seal: Seal = new Seal();
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
    refuelCenterId: number;
    refuelCenter: RefuelCenter;
    breadcrumbItems: any[];



    constructor(
        private sealService: SealService,
        private refuelCenterService: RefuelCenterService,
        private parseLinks: JhiParseLinks,
        private jhiAlertService: JhiAlertService,
        private principal: Principal,
        private activatedRoute: ActivatedRoute,
        private router: Router,
        private translateService: TranslateService,
        private eventManager: JhiEventManager
    ) {
        this.routeData = this.activatedRoute.data.subscribe((data) => {
            this.itemsPerPage = data.pagingParams.size;
            this.page = data['pagingParams'].page;
            this.previousPage = data['pagingParams'].page;
            this.reverse = !data['pagingParams'].ascending;
            this.predicate = data['pagingParams'].predicate;
        });
        this.currentSearch = activatedRoute.snapshot.queryParams['search'] ? activatedRoute.snapshot.queryParams['search'] : '';
        this.refuelCenterId = activatedRoute.snapshot.params['refuelCenterId'];

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
                    this.seal[value[0]] = Number(value[1]);
                }
                else {
                    this.seal[value[0]] = value[1];
                }
            }
        }
    }

    loadAll() {
        this.sealService.query(this.refuelCenterId, {
            query: this.currentSearch.length > 0 ? this.currentSearch : null,
            page: this.page,
            size: this.itemsPerPage,
            sort: this.sort()
        }).subscribe(
            (res: HttpResponse<Seal[]>) => this.onSuccess(res.body, res.headers),
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    clear() {
        this.page = 0;
        this.currentSearch = '';

        this.router.navigate(['refuel-center/' + this.refuelCenterId + '/seal'], {
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
        if (this.seal.boxNo) {
            this.currentSearch += 'boxNo$' + this.seal.boxNo + '&';
        }
        if (this.seal.prefix) {
            this.currentSearch += 'prefix$' + this.seal.prefix + '&';
        }
        if (this.seal.startSealNumber) {
            this.currentSearch += 'startSealNumber☼' + this.seal.startSealNumber + '&';
        }
        if (this.seal.endSealNumber) {
            this.currentSearch += 'endSealNumber☼' + this.seal.endSealNumber + '&';
        }
        if (this.seal.currentSealNumber) {
            this.currentSearch += 'currentSealNumber☼' + this.seal.currentSealNumber + '&';
        }
        if (this.seal.refuelCenterId) {
            this.currentSearch += 'refuelCenter.id☼' + this.seal.refuelCenterId + '&';
        }
        if (this.currentSearch.length > 0) {
            this.currentSearch = this.currentSearch.substring(0, this.currentSearch.length - 1);
        }


        this.router.navigate(['refuel-center/' + this.refuelCenterId + '/seal'], {
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
        this.translateService.get('global.menu.home').subscribe((title) => {
            this.breadcrumbItems.push({label: title, routerLink: ['/']});
        });
        this.translateService.get('niopdcgatewayApp.seal.home.refuelCenterTitle').subscribe((title) => {
            this.breadcrumbItems.push({label: title + ` (${this.refuelCenter.persianTitle})`, routerLink: ['/refuel-center']});
        });
        this.translateService.get('niopdcgatewayApp.seal.home.title').subscribe((title) => {
            this.breadcrumbItems.push({label: title});
        });
    }

    ngOnInit() {
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });

        this.registerChangeInSeals();

        this.refuelCenterService.find(this.refuelCenterId).subscribe(
            (refuelCenter) => {
                this.refuelCenter = refuelCenter.body;
                this.setBreadCrumb();
            }
        );
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: Seal) {
        return item.id;
    }

    trackRefuelCenterById(index: number, item: RefuelCenter) {
        return item.id;
    }

    registerChangeInSeals() {
        this.eventSubscriber = this.eventManager.subscribe('sealListModification', (response) => this.loadAll());
    }

    sort() {
        const result = [this.predicate + ',' + (this.reverse ? 'desc' : 'asc')];
        return result;
    }

    loadLazy(event: LazyLoadEvent) {
        let predicate = this.predicate;
        let reverse = this.reverse;
        let page = this.page;
        let itemsPerPage = this.itemsPerPage;
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


            this.router.navigate(['refuel-center', this.refuelCenterId, 'seal'], {
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
        this.seals = data;
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }


}
