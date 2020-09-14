import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Subscription} from 'rxjs/Rx';
import {JhiAlertService, JhiEventManager, JhiParseLinks} from 'ng-jhipster';

import {Transfer} from './transfer.model';
import {TransferService} from './transfer.service';
import {Principal} from '../../../shared/index';
import {TransferType, TransferTypeService} from '../../transfer-type/index';
import {OilTank, OilTankService} from '../oil-tank/.';
import {Metre, MetreService} from '../metre/.';
import {LazyLoadEvent} from 'primeng/primeng';
import {TranslateService} from '@ngx-translate/core';
import {DayDepotService} from '../day-depot/day-depot.service';
import {DayDepot} from '../day-depot/day-depot.model';
import {MainDayDepot} from '../main-day-depot/main-day-depot.model';
import {MainDayDepotService} from '../main-day-depot/main-day-depot.service';
import {MainDayOperation} from '../main-day-operation/main-day-operation.model';
import {MainDayOperationService} from '../main-day-operation/main-day-operation.service';
import {HttpErrorResponse, HttpResponse} from '@angular/common/http';
import {DateJalaliPipe} from '../../../shared/ng2-datetimepicker-jalali/date-jalali.pipe';
import {Hotkey, HotkeysService} from 'angular2-hotkeys';
import {getPath} from 'app/core/router';

@Component({
    selector: 'jhi-transfer',
    templateUrl: './transfer.component.html'
})
export class TransferComponent implements OnInit, OnDestroy {

    currentAccount: any;
    transfers: Transfer[];
    transfer: Transfer = new Transfer();
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
    mainDayDepotId: number;
    dayDepotId: number;
    dayDepot: DayDepot;
    type: string;
    breadcrumbItems: any[];
    mainDayOperationId: number;

    transfertypes: TransferType[];
    fromoiltanks: OilTank[];
    tooiltanks: OilTank[];
    metres: Metre[];
    daydepots: DayDepot[];
    mainDayDepot: MainDayDepot;
    mainDayOperation: MainDayOperation;
    editable: Boolean;

    constructor(private transferService: TransferService,
                private mainDayDepotService: MainDayDepotService,
                private mainDayOperationService: MainDayOperationService,
                private transferTypeService: TransferTypeService,
                private fromOilTankService: OilTankService,
                private metreService: MetreService,
                private dayDepotService: DayDepotService,
                private parseLinks: JhiParseLinks,
                private jhiAlertService: JhiAlertService,
                private principal: Principal,
                private _hotkeysService: HotkeysService,
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
        this.mainDayDepotId = activatedRoute.snapshot.params['mainDayDepotId'];
        this.mainDayOperationId = activatedRoute.snapshot.params['mainDayOperationId'];
        this.dayDepotId = activatedRoute.snapshot.params['dayDepotId'];
        this.type = activatedRoute.snapshot.params['type'];
        this.transfer.transferByMetre = null;

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
                    this.transfer[value[0]] = Number(value[1]);
                } else if (value[0] === 'transferByMetre') {
                    this.transfer[value[0]] = Boolean(value[1]);
                } else {
                    this.transfer[value[0]] = value[1];
                }
            }
        }
        this._hotkeysService.add(new Hotkey(['ins', 'enter'], (event: KeyboardEvent, k: string): boolean => {
            if (k === 'ins') {
                this.router.navigate([...getPath(this.router, '/').pathParts, {outlets: {popup: ['transfer-new', this.dayDepotId]}}]);
                return false;
            }
        }));
    }

    loadAll() {
        if (this.type === 'to') {
            this.transferService.query(this.dayDepotId, {
                query: this.currentSearch.length > 0 ? this.currentSearch : null,
                page: this.page,
                size: this.itemsPerPage,
                sort: this.sort()
            }).subscribe(
                (res: HttpResponse<Transfer[]>) => this.onSuccess(res.body, res.headers),
                (res: HttpErrorResponse) => this.onError(res.message)
            );
        } else {
            this.transferService.queryFindAllTransferTo(this.dayDepotId, {
                query: this.currentSearch.length > 0 ? this.currentSearch : null,
                page: this.page,
                size: this.itemsPerPage,
                sort: this.sort()
            }).subscribe(
                (res: HttpResponse<Transfer[]>) => this.onSuccess(res.body, res.headers),
                (res: HttpErrorResponse) => this.onError(res.message)
            );
        }
    }

    clear() {
        this.page = 0;
        this.currentSearch = '';

        if (this.mainDayDepotId) {
            this.router.navigate([`main-day-depot/${this.mainDayDepotId}/day-depot`, this.dayDepotId, 'transfer', this.type, {
                page: this.page,
                sort: this.predicate + ',' + (this.reverse ? 'desc' : 'asc')
            }]);
        } else if (this.mainDayOperationId) {
            this.router.navigate([`main-day-operation/${this.mainDayOperationId}/day-depot`, this.dayDepotId, 'transfer', this.type, {
                page: this.page,
                sort: this.predicate + ',' + (this.reverse ? 'desc' : 'asc')
            }]);
        }
        this.transfer = new Transfer();
        this.transfer.transferByMetre = null;
        this.loadAll();
    }

    search() {
        this.page = 0;
        this.currentSearch = '';
        if (this.transfer.registerDate) {
            this.currentSearch += 'registerDate→' + this.transfer.registerDate + '&';
        }
        if (this.transfer.sixtyAmount) {
            this.currentSearch += 'sixtyAmount☼' + this.transfer.sixtyAmount + '&';
        }
        if (this.transfer.natureAmount) {
            this.currentSearch += 'natureAmount☼' + this.transfer.natureAmount + '&';
        }
        if (this.transfer.productTemperature) {
            this.currentSearch += 'productTemperature☼' + this.transfer.productTemperature + '&';
        }
        if (this.transfer.environmentTemperature) {
            this.currentSearch += 'environmentTemperature☼' + this.transfer.environmentTemperature + '&';
        }
        if (this.transfer.specialWeight) {
            this.currentSearch += 'specialWeight☼' + this.transfer.specialWeight + '&';
        }
        if (this.transfer.transferByMetre) {
            this.currentSearch += 'transferByMetre;' + this.transfer.transferByMetre + '&';
        }
        if (this.transfer.description) {
            this.currentSearch += 'description$' + this.transfer.description + '&';
        }
        if (this.transfer.transferTypeId) {
            this.currentSearch += 'transferType.id☼' + this.transfer.transferTypeId + '&';
        }
        if (this.transfer.fromDayDepotTitle) {
            this.currentSearch += 'fromDayDepot.oilTank.title$' + this.transfer.fromDayDepotTitle + '&';
        }
        if (this.transfer.toDayDepotTitle) {
            this.currentSearch += 'toDayDepot.oilTank.title$' + this.transfer.toDayDepotTitle + '&';
        }
        if (this.transfer.metreId) {
            this.currentSearch += 'metre.id☼' + this.transfer.metreId + '&';
        }
        if (this.transfer.dayDepotId) {
            this.currentSearch += 'dayDepot.id☼' + this.transfer.dayDepotId + '&';
        }
        if (this.currentSearch.length > 0) {
            this.currentSearch = this.currentSearch.substring(0, this.currentSearch.length - 1);
        }

        if (this.mainDayDepotId) {
            this.router.navigate([`main-day-depot/${this.mainDayDepotId}/day-depot`, this.dayDepotId, 'transfer', this.type, {
                search: this.currentSearch,
                page: this.page,
                sort: this.predicate + ',' + (this.reverse ? 'desc' : 'asc')
            }]);
        } else if (this.mainDayOperationId) {
            this.router.navigate([`main-day-operation/${this.mainDayOperationId}/day-depot`, this.dayDepotId, 'transfer', this.type, {
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
        const mainDayDepotDayDepotUrl = mainDayDepotUrl + '/' + this.mainDayDepotId + '/day-depot';
        const mainDayOperationDayDepotUrl = mainDayOperationUrl + '/' + this.mainDayOperationId + '/day-depot';
        let transferUrl = `${mainDayDepotDayDepotUrl}/${this.dayDepotId}/transfer/${this.type}`;
        if (this.mainDayDepotId) {
            transferUrl = `${mainDayDepotDayDepotUrl}/${this.dayDepotId}/transfer/${this.type}`;
        }
        if (this.mainDayOperationId) {
            transferUrl = `${mainDayOperationDayDepotUrl}/${this.dayDepotId}/transfer/${this.type}`;
        }
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
            this.translateService.get('niopdcgatewayApp.transfer.home.dayDepotTitle').subscribe(title => {
                this.breadcrumbItems.push({
                    label: title + `(${this.dayDepot.oilTankTitle})`,
                    routerLink: [mainDayDepotDayDepotUrl]
                });
            });
        } else if (this.mainDayOperationId) {
            this.translateService.get('niopdcgatewayApp.transfer.home.mainDayOperationTitle').subscribe(title => {
                this.breadcrumbItems.push({
                    label: `${title} (${dateJalaliPipe.transform(this.mainDayOperation.day)})`,
                    routerLink: [mainDayOperationUrl]
                });
            });
            this.translateService.get('niopdcgatewayApp.transfer.home.dayDepotTitle').subscribe(title => {
                this.breadcrumbItems.push({
                    label: title + `(${this.dayDepot.oilTankTitle})`,
                    routerLink: [mainDayOperationDayDepotUrl]
                });
            });
        }
        this.translateService.get('niopdcgatewayApp.transfer.home.title').subscribe(title => {
            this.breadcrumbItems.push({label: title, routerLink: {transferUrl}});
        });
    }

    ngOnInit() {
        this.principal.identity().then(account => {
            this.currentAccount = account;
        });

        /* this.fromOilTankService.query().subscribe(
             (res) => {
                 this.fromoiltanks = res.body;
                 this.tooiltanks = res.body;
             }
         );*/
        /* this.dayDepotService.find(this.dayDepotId)
             .subscribe((res) => {
                 this.metreService.query(res.body.oilTankId).subscribe(
                     (metres) => {
                         this.metres = metres.body;
                     }
                 );
             });*/
        /* this.dayDepotService.query().subscribe(
             (res) => {
                 this.daydepots = res.body;
             }
         );*/
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

        this.registerChangeInTransfers();

        if (this.mainDayDepotId) {
            this.mainDayDepotService.find(this.mainDayDepotId)
                .subscribe(res => {
                    this.mainDayDepot = res.body;
                    this.dayDepotService.find(this.dayDepotId).subscribe(dayDepot => {
                            this.dayDepot = dayDepot.body;
                            if (this.type === 'to') {
                                this.transferTypeService.queryByRefuelCenterAndOilTankType(this.mainDayDepot.refuelCenterId, this.dayDepot.oilTankOilTankType, true).subscribe(res => {
                                        this.transfertypes = res.body;
                                    }
                                );
                            } else {
                                this.transferTypeService.queryByRefuelCenterAndOilTankType(this.mainDayDepot.refuelCenterId, this.dayDepot.oilTankOilTankType, false).subscribe(res => {
                                        this.transfertypes = res.body;
                                    }
                                );
                            }
                            this.setBreadCrumb();
                        }
                    );
                });
        } else if (this.mainDayOperationId) {
            this.mainDayOperationService.find(this.mainDayOperationId)
                .subscribe(res => {
                    this.mainDayOperation = res.body;
                    this.dayDepotService.find(this.dayDepotId).subscribe(dayDepot => {
                            this.dayDepot = dayDepot.body;
                            if (this.type === 'to') {
                                this.transferTypeService.queryByRefuelCenterAndOilTankType(this.mainDayOperation.refuelCenterId, this.dayDepot.oilTankOilTankType, true).subscribe(res => {
                                        this.transfertypes = res.body;
                                    }
                                );
                            } else {
                                this.transferTypeService.queryByRefuelCenterAndOilTankType(this.mainDayOperation.refuelCenterId, this.dayDepot.oilTankOilTankType, false).subscribe(res => {
                                        this.transfertypes = res.body;
                                    }
                                );
                            }
                            this.setBreadCrumb();
                        }
                    );
                });
        }

    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: Transfer) {
        return item.id;
    }

    trackTransferTypeById(index: number, item: TransferType) {
        return item.id;
    }

    trackOilTankById(index: number, item: OilTank) {
        return item.id;
    }

    trackMetreById(index: number, item: Metre) {
        return item.id;
    }

    trackDayDepotById(index: number, item: DayDepot) {
        return item.id;
    }

    registerChangeInTransfers() {
        this.eventSubscriber = this.eventManager.subscribe('transferListModification',response => this.loadAll());
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
                this.router.navigate(['main-day-depot/' + this.mainDayDepotId + '/day-depot', this.dayDepotId, 'transfer', this.type], {
                    queryParams: {
                        page: this.page,
                        size: this.itemsPerPage,
                        search: this.currentSearch,
                        sort: this.predicate + ',' + (this.reverse ? 'desc' : 'asc')
                    }
                });
            } else if (this.mainDayOperationId) {
                this.router.navigate(['main-day-operation/' + this.mainDayOperationId + '/day-depot', this.dayDepotId, 'transfer', this.type], {
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
        this.transfers = data;
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }

}
