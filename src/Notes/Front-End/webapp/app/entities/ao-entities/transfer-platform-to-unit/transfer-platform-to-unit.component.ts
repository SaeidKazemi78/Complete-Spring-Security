import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Subscription} from 'rxjs/Subscription';
import {JhiAlertService, JhiEventManager, JhiParseLinks} from 'ng-jhipster';

import {TransferPlatformToUnit} from './transfer-platform-to-unit.model';
import {TransferPlatformToUnitService} from './transfer-platform-to-unit.service';
import {Principal} from '../../../shared/index';
import {Metre, MetreService} from '../metre/.';
import {OilTank, OilTankService, OilTankType} from '../oil-tank/.';
import {LazyLoadEvent} from 'primeng/primeng';
import {TranslateService} from '@ngx-translate/core';
import {DayDepot} from '../day-depot/day-depot.model';
import {DayDepotService} from '../day-depot/day-depot.service';
import {MainDayOperation} from '../main-day-operation/main-day-operation.model';
import {MainDayDepot} from '../main-day-depot/main-day-depot.model';
import {MainDayDepotService} from '../main-day-depot/main-day-depot.service';
import {MainDayOperationService} from '../main-day-operation/main-day-operation.service';
import {HttpErrorResponse, HttpResponse} from '@angular/common/http';
import {DateJalaliPipe} from '../../../shared/ng2-datetimepicker-jalali/date-jalali.pipe';
import {Hotkey, HotkeysService} from 'angular2-hotkeys';
import {getPath} from 'app/core/router';

@Component({
    selector: 'jhi-transfer-platform-to-unit',
    templateUrl: './transfer-platform-to-unit.component.html'
})
export class TransferPlatformToUnitComponent implements OnInit, OnDestroy {

    currentAccount: any;
    transferPlatformToUnits: TransferPlatformToUnit[];
    transferPlatformToUnit: TransferPlatformToUnit = new TransferPlatformToUnit();
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
    dayDepotId: number;
    mainDayDepotId: number;
    mainDayOperationId: number;
    dayDepot: DayDepot;
    mainDayOperation: MainDayOperation;
    mainDayDepot: MainDayDepot;

    breadcrumbItems: any[];
    metres: Metre[];
    platforms: DayDepot[];
    units: DayDepot[];
    daydepots: DayDepot[];
    editable: Boolean;

    constructor(private transferPlatformToUnitService: TransferPlatformToUnitService,
                private metreService: MetreService,
                private oilTankService: OilTankService,
                private mainDayOperationService: MainDayOperationService,
                private mainDayDepotService: MainDayDepotService,
                private dayDepotService: DayDepotService,
                private parseLinks: JhiParseLinks,
                private jhiAlertService: JhiAlertService,
                private principal: Principal,
                private activatedRoute: ActivatedRoute,
                private router: Router,
                private translateService: TranslateService,
                private _hotkeysService: HotkeysService,
                private eventManager: JhiEventManager) {
        this.routeData = this.activatedRoute.data.subscribe(data => {
            this.itemsPerPage = data.pagingParams.size;
            this.page = data['pagingParams'].page;
            this.previousPage = data['pagingParams'].page;
            this.reverse = data['pagingParams'].ascending;
            this.predicate = data['pagingParams'].predicate;
        });
        this.currentSearch = activatedRoute.snapshot.queryParams['search'] ? activatedRoute.snapshot.queryParams['search'] : '';
        this.mainDayDepotId = activatedRoute.snapshot.params['mainDayDepotId'];
        this.mainDayOperationId = activatedRoute.snapshot.params['mainDayOperationId'];
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
                    this.transferPlatformToUnit[value[0]] = Number(value[1]);
                } else {
                    this.transferPlatformToUnit[value[0]] = value[1];
                }
            }
        }
        this._hotkeysService.add(new Hotkey(['ins', 'enter'], (event: KeyboardEvent, k: string): boolean => {
            if (k === 'ins') {
                this.router.navigate([...getPath(this.router, '/').pathParts, {outlets: {popup: ['transfer-platform-to-unit-new', this.dayDepotId]}}]);
                return false;
            }
        }));
    }

    loadAll() {
        if (this.mainDayDepotId != null) {
            this.transferPlatformToUnitService.query(this.dayDepotId, {
                query: this.currentSearch.length > 0 ? this.currentSearch : null,
                page: this.page,
                size: this.itemsPerPage,
                sort: this.sort()
            }).subscribe(
                (res: HttpResponse<TransferPlatformToUnit[]>) => this.onSuccess(res.body, res.headers),
                (res: HttpErrorResponse) => this.onError(res.message)
            );
        } else if (this.mainDayOperationId != null) {
            this.transferPlatformToUnitService.queryFromPlatform(this.dayDepotId, {
                query: this.currentSearch.length > 0 ? this.currentSearch : null,
                page: this.page,
                size: this.itemsPerPage,
                sort: this.sort()
            }).subscribe(
                (res: HttpResponse<TransferPlatformToUnit[]>) => this.onSuccess(res.body, res.headers),
                (res: HttpErrorResponse) => this.onError(res.message)
            );
        }
    }

    clear() {
        this.page = 0;
        this.currentSearch = '';

        if (this.mainDayDepotId) {
            this.router.navigate([`main-day-depot/${this.mainDayDepotId}/day-depot/${this.dayDepotId}/transfer-platform-to-unit`, {
                page: this.page,
                sort: this.predicate + ',' + (this.reverse ? 'desc' : 'asc')
            }]);
        } else if (this.mainDayOperationId) {
            this.router.navigate([`main-day-operation/${this.mainDayOperationId}/day-depot/${this.dayDepotId}/transfer-platform-to-unit`, {
                page: this.page,
                sort: this.predicate + ',' + (this.reverse ? 'desc' : 'asc')
            }]);
        }
        this.transferPlatformToUnit = new TransferPlatformToUnit();
        this.loadAll();
    }

    search() {
        this.page = 0;
        this.currentSearch = '';
        if (this.transferPlatformToUnit.registerDate) {
            this.currentSearch += 'registerDate→' + this.transferPlatformToUnit.registerDate + '&';
        }
        if (this.transferPlatformToUnit.amount) {
            this.currentSearch += 'metreLog.amount☼' + this.transferPlatformToUnit.amount + '&';
        }
        if (this.transferPlatformToUnit.unitMetreNumber) {
            this.currentSearch += 'unitMetreNumber☼' + this.transferPlatformToUnit.unitMetreNumber + '&';
        }
        if (this.transferPlatformToUnit.metreId) {
            this.currentSearch += 'metre.id☼' + this.transferPlatformToUnit.metreId + '&';
        }
        if (this.transferPlatformToUnit.startMeter) {
            this.currentSearch += 'metreLog.startMeter☼' + this.transferPlatformToUnit.startMeter + '&';
        }
        if (this.transferPlatformToUnit.endMeter) {
            this.currentSearch += 'metreLog.endMeter☼' + this.transferPlatformToUnit.endMeter + '&';
        }
        if (this.transferPlatformToUnit.platformId) {
            this.currentSearch += 'platform.id☼' + this.transferPlatformToUnit.platformId + '&';
        }
        if (this.transferPlatformToUnit.unitId) {
            this.currentSearch += 'unit.id☼' + this.transferPlatformToUnit.unitId + '&';
        }
        if (this.currentSearch.length > 0) {
            this.currentSearch = this.currentSearch.substring(0, this.currentSearch.length - 1);
        }

        if (this.mainDayDepotId) {
            this.router.navigate([`main-day-depot/${this.mainDayDepotId}/day-depot/${this.dayDepotId}/transfer-platform-to-unit`, {
                search: this.currentSearch,
                page: this.page,
                sort: this.predicate + ',' + (this.reverse ? 'desc' : 'asc')
            }]);
        } else if (this.mainDayOperationId) {
            this.router.navigate([`main-day-operation/${this.mainDayOperationId}/day-depot/${this.dayDepotId}/transfer-platform-to-unit`, {
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
        const dayDepotUrl = mainDayDepotUrl + '/' + this.mainDayDepotId + '/day-depot';
        const dayOperationUrl = mainDayOperationUrl + '/' + this.mainDayOperationId + '/day-depot';
        this.translateService.get('global.menu.home').subscribe(title => {
            this.breadcrumbItems.push({label: title, routerLink: ['/']});
        });
        if (this.mainDayDepotId != null) {
            this.translateService.get('niopdcgatewayApp.transfer.home.mainDayDepotTitle').subscribe(title => {
                this.breadcrumbItems.push({
                    label: `${title} (${dateJalaliPipe.transform(this.mainDayDepot.day)})`,
                    routerLink: [mainDayDepotUrl]
                });
            });
            this.translateService.get('niopdcgatewayApp.transferPlatformToUnit.home.dayDepotTitle').subscribe(title => {
                this.breadcrumbItems.push({
                    label: title + `(${this.dayDepot.oilTankTitle})`,
                    routerLink: [dayDepotUrl]
                });
            });
        } else if (this.mainDayOperationId != null) {
            this.translateService.get('niopdcgatewayApp.mainDayOperation.home.title').subscribe(title => {
                this.breadcrumbItems.push({
                    label: `${title} (${dateJalaliPipe.transform(this.mainDayOperation.day)})`,
                    routerLink: [mainDayOperationUrl]
                });
            });
            this.translateService.get('niopdcgatewayApp.dayDepot.home.title').subscribe(title => {
                this.breadcrumbItems.push({
                    label: title + `(${this.dayDepot.oilTankTitle})`,
                    routerLink: [dayOperationUrl]
                });
            });
        }
        this.translateService.get('niopdcgatewayApp.transferPlatformToUnit.home.title').subscribe(title => {
            this.breadcrumbItems.push({label: title});
        });
    }

    ngOnInit() {
        this.principal.identity().then(account => {
            this.currentAccount = account;
        });
        if (this.mainDayDepotId) {
            this.mainDayDepotService.find(this.mainDayDepotId)
                .subscribe(res => {
                    this.mainDayDepot = res.body;
                    /*this.dayDepotService.queryByRefuelCenterAndOilTank(this.mainDayDepot.refuelCenterId, OilTankType[OilTankType.PLATFORM])
                        .subscribe((res) => {
                            this.platforms = res.body;
                            this.extracted();

                        });*/
                    this.dayDepotService.queryByRefuelCenterAndOilTank(this.mainDayDepot.refuelCenterId, OilTankType[OilTankType.UNIT])
                        .subscribe(res => {
                            this.units = res.body;
                            this.extracted();

                        });
                });
        } else if (this.mainDayOperationId) {
            this.mainDayOperationService.find(this.mainDayOperationId)
                .subscribe(res => {
                    this.mainDayOperation = res.body;
                    this.dayDepotService.queryByRefuelCenterAndOilTank(this.mainDayOperation.refuelCenterId, OilTankType[OilTankType.PLATFORM])
                        .subscribe(res => {
                            this.platforms = res.body;
                            this.extracted();

                        });
                    /*    this.dayDepotService.queryByRefuelCenterAndOilTank(this.mainDayOperation.refuelCenterId, OilTankType[OilTankType.UNIT])
                            .subscribe((res) => {
                                this.units = res.body;
                                this.extracted();
                            });*/
                });
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

        this.registerChangeInTransferPlatformToUnits();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: TransferPlatformToUnit) {
        return item.id;
    }

    trackMetreById(index: number, item: Metre) {
        return item.id;
    }

    trackOilTankById(index: number, item: OilTank) {
        return item.id;
    }

    trackDayDepotById(index: number, item: DayDepot) {
        return item.id;
    }

    registerChangeInTransferPlatformToUnits() {
        this.eventSubscriber = this.eventManager.subscribe('transferPlatformToUnitListModification',response => this.loadAll());
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

            if (this.mainDayDepotId) {
                this.router.navigate([`main-day-depot/${this.mainDayDepotId}/day-depot/${this.dayDepotId}/transfer-platform-to-unit`], {
                    queryParams: {
                        page: this.page,
                        size: this.itemsPerPage,
                        search: this.currentSearch,
                        sort: this.predicate + ',' + (this.reverse ? 'desc' : 'asc')
                    }
                });
            } else if (this.mainDayOperationId) {
                this.router.navigate([`main-day-operation/${this.mainDayOperationId}/day-depot/${this.dayDepotId}/transfer-platform-to-unit`], {
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

    private extracted() {
        this.dayDepotService.find(this.dayDepotId).subscribe(dayDepot => {
                this.dayDepot = dayDepot.body;
                this.setBreadCrumb();
            }
        );
    }

    private onSuccess(data, headers) {
        this.links = this.parseLinks.parse(headers.get('link'));
        this.totalItems = headers.get('X-Total-Count');
        this.queryCount = this.totalItems;
        // this.page = pagingParams.page;
        this.transferPlatformToUnits = data;
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
