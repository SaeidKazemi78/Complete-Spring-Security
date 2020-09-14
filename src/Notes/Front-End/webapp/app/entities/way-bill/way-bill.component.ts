import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Subscription} from 'rxjs/Rx';
import {JhiAlertService, JhiEventManager, JhiParseLinks} from 'ng-jhipster';

import {WayBill} from './way-bill.model';
import {WayBillService} from './way-bill.service';
import {Principal} from '../../shared';
import {LazyLoadEvent} from 'primeng/primeng';
import {TranslateService} from '@ngx-translate/core';
import {HttpErrorResponse, HttpResponse} from '@angular/common/http';
import {MainDayDepot, MainDayDepotService} from '../ao-entities/main-day-depot';
import {DateJalaliPipe} from '../../shared/ng2-datetimepicker-jalali/date-jalali.pipe';
import {DayDepot, DayDepotService} from '../ao-entities/day-depot';

@Component({
    selector: 'jhi-way-bill',
    templateUrl: './way-bill.component.html'
})
export class WayBillComponent implements OnInit, OnDestroy {
    @ViewChild('myform') myform;
    currentAccount: any;
    wayBills: WayBill[];
    wayBill: WayBill = new WayBill();
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
    dayDepot: DayDepot;
    mainDayDepot: MainDayDepot;
    breadcrumbItems: any[];
    mode: string | 'send' | 'received';

    constructor(
        private wayBillService: WayBillService,
        private dayDepotService: DayDepotService,
        private parseLinks: JhiParseLinks,
        private jhiAlertService: JhiAlertService,
        private principal: Principal,
        private mainDayDepotService: MainDayDepotService,
        private activatedRoute: ActivatedRoute,
        private router: Router,
        private translateService: TranslateService,
        private eventManager: JhiEventManager
    ) {
        this.routeData = this.activatedRoute.data.subscribe(data => {
            this.itemsPerPage = data.pagingParams.size;
            this.page = data['pagingParams'].page;
            this.previousPage = data['pagingParams'].page;
            this.reverse = !data['pagingParams'].ascending;
            this.predicate = data['pagingParams'].predicate;
        });
        this.currentSearch = activatedRoute.snapshot.queryParams['search'] ? activatedRoute.snapshot.queryParams['search'] : '';
        this.dayDepotId = activatedRoute.snapshot.params['dayDepotId'];
        this.mainDayDepotId = activatedRoute.snapshot.params['mainDayDepotId'];
        this.mode = activatedRoute.snapshot.params['mode'];

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
                this.wayBill[value[0]] = value[1];
            }
        }
    }

    loadAll() {
        if(this.mode === 'send') {
            this.wayBillService.querySend(this.dayDepotId, {
                query: this.currentSearch.length > 0 ? this.currentSearch : null,
                page: this.page,
                size: this.itemsPerPage,
                sort: this.sort()
            }).subscribe(
                (res: HttpResponse<WayBill[]>) => this.onSuccess(res.body, res.headers),
                (res: HttpErrorResponse) => this.onError(res.message)
            );
        }else if(this.mode === 'received'){
            this.wayBillService.queryReceived(this.dayDepotId, {
                query: this.currentSearch.length > 0 ? this.currentSearch : null,
                page: this.page,
                size: this.itemsPerPage,
                sort: this.sort()
            }).subscribe(
                (res: HttpResponse<WayBill[]>) => this.onSuccess(res.body, res.headers),
                (res: HttpErrorResponse) => this.onError(res.message)
            );
        }
    }

    clear() {
        this.page = 0;
        this.currentSearch = '';

        this.router.navigate(['main-day-depot/' + this.mainDayDepotId + '/day-depot/' + this.dayDepotId + '/way-bill'], {
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
        if (this.wayBill.wayBillNumber) {
            this.currentSearch += 'wayBillNumber$' + this.wayBill.wayBillNumber + '&';
        }
        if (this.wayBill.natureAmount) {
            this.currentSearch += 'natureAmount☼' + this.wayBill.natureAmount + '&';
        }
        if (this.wayBill.sixtyAmount) {
            this.currentSearch += 'sixtyAmount☼' + this.wayBill.sixtyAmount + '&';
        }
        if (this.wayBill.receivedNatureAmount) {
            this.currentSearch += 'receivedNatureAmount☼' + this.wayBill.receivedNatureAmount + '&';
        }
        if (this.wayBill.receivedSixtyAmount) {
            this.currentSearch += 'receivedSixtyAmount☼' + this.wayBill.receivedSixtyAmount + '&';
        }
        if (this.wayBill.transferFuelType) {
            this.currentSearch += 'transferFuelType#TransferFuelType.' + this.wayBill.transferFuelType + '&';
        }
        if (this.currentSearch.length > 0) {
            this.currentSearch = this.currentSearch.substring(0, this.currentSearch.length - 1);
        }

        this.router.navigate(['main-day-depot/' + this.mainDayDepotId + '/day-depot/' + this.dayDepotId + '/way-bill'], {
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
        const dateJalaliPipe = new DateJalaliPipe();
        const mainDayDepotUrl = '/main-day-depot';
        this.translateService.get('global.menu.home').subscribe(title => {
            this.breadcrumbItems.push({label: title, routerLink: ['/']});
        });
        this.translateService.get('niopdcgatewayApp.transfer.home.mainDayDepotTitle').subscribe(title => {
            this.breadcrumbItems.push({
                label: `${title} (${dateJalaliPipe.transform(this.mainDayDepot.day)})`,
                routerLink: [mainDayDepotUrl]
            });
        });
        this.translateService.get('niopdcgatewayApp.wayBill.home.dayDepotTitle').subscribe(title => {
            this.breadcrumbItems.push({
                label: title + ` (${this.dayDepot.oilTankTitle})`,
                routerLink: ['/main-day-depot/' + this.mainDayDepotId + '/day-depot']
            });
        });
        if(this.mode === 'send') {
            this.translateService.get('niopdcgatewayApp.wayBill.home.title').subscribe(title => {
                this.breadcrumbItems.push({label: title});
            });
        }else {
            this.translateService.get('niopdcgatewayApp.wayBill.home.titleReceived').subscribe(title => {
                this.breadcrumbItems.push({label: title});
            });
        }
    }

    onChangeSndFile(event) {
        const fileList: FileList = event.target.files;
        if (fileList.length > 0) {
            const file = fileList[0];

            this.wayBillService.uploadSndFile(file, this.dayDepotId)
                .subscribe((res: HttpResponse<any>) => {
                    this.loadAll();
                },error => {
                    console.log(error);
                });
        }
        this.myform.nativeElement.reset();
    }

    ngOnInit() {
        this.principal.identity().then(account => {
            this.currentAccount = account;
        });

        this.registerChangeInWayBills();

        this.mainDayDepotService.find(this.mainDayDepotId)
            .subscribe(mainDayDepot => {
                this.mainDayDepot = mainDayDepot.body;
                this.dayDepotService.find(this.dayDepotId).subscribe(dayDepot => {
                        this.dayDepot = dayDepot.body;
                        this.setBreadCrumb();
                    }
                );
            });
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: WayBill) {
        return item.id;
    }

    registerChangeInWayBills() {
        this.eventSubscriber = this.eventManager.subscribe('wayBillListModification', response => this.loadAll());
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
        this.wayBills = data;
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
            this.reverse !== reverse) {

            this.router.navigate(['main-day-depot', this.mainDayDepotId, 'day-depot', this.dayDepotId, 'way-bill'], {
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
