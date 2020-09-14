import {Component, OnDestroy, OnInit} from '@angular/core';
import {HttpErrorResponse, HttpResponse} from '@angular/common/http';
import {ActivatedRoute, Router} from '@angular/router';
import {Subscription} from 'rxjs/Subscription';
import {JhiAlertService, JhiEventManager, JhiParseLinks} from 'ng-jhipster';

import {VoucherMaster, VoucherMasterStatus} from './voucher-master.model';
import {VoucherMasterService} from './voucher-master.service';
import {Principal} from '../../shared';

import {VoucherType, VoucherTypeService} from '../voucher-type/.';
import {LazyLoadEvent} from 'primeng/primeng';
import {TranslateService} from '@ngx-translate/core';
import {VoucherTemplate} from '../voucher-template/voucher-template.model';
import {VoucherTemplateService} from '../voucher-template';
import {RefuelCenter, RefuelCenterService} from '../ao-entities/refuel-center';
import {saveAs} from 'file-saver/FileSaver';

@Component({
    selector: 'jhi-voucher-master',
    templateUrl: './voucher-master.component.html'
})
export class VoucherMasterComponent implements OnInit, OnDestroy {

    voucherTemplates: VoucherTemplate[];
    voucherTemplate: VoucherTemplate;
    locationId: any;
    customerId: any;
    date: any;
    startDate: any;
    finishDate: any;
    queryCategory: string;

    parameterDate = true;
    parameterStartDate = true;
    parameterFinishDate = true;
    parameterLocation = true;
    parameterCustomer = true;

    currentAccount: any;
    voucherMasters: VoucherMaster[];
    voucherMaster: VoucherMaster = new VoucherMaster();
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
    refuelCenters: RefuelCenter[];
    baseQueryParams: string[];
    vouchertypes: VoucherType[];
    VoucherMasterStatus = VoucherMasterStatus;

    constructor(
        private voucherMasterService: VoucherMasterService,
        private voucherTypeService: VoucherTypeService,
        private voucherTemplateService: VoucherTemplateService,
        private parseLinks: JhiParseLinks,
        private refuelCenterService: RefuelCenterService,
        private jhiAlertService: JhiAlertService,
        private principal: Principal,
        private activatedRoute: ActivatedRoute,
        private router: Router,
        private translateService: TranslateService,
        private eventManager: JhiEventManager
    ) {
        this.routeData = this.activatedRoute.data.subscribe((data) => {
            this.itemsPerPage = data.pagingParams.size;
            this.page = data.pagingParams.page;
            this.previousPage = data.pagingParams.page;
            this.reverse = !data.pagingParams.ascending;
            this.predicate = data.pagingParams.predicate;
        });
        this.currentSearch = activatedRoute.snapshot.queryParams['search'] ? activatedRoute.snapshot.queryParams['search'] : '';

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
                    this.voucherMaster[value[0]] = Number(value[1]);
                } else if (value[0] === 'valid') {
                    this.voucherMaster[value[0]] = Boolean(value[1]);
                } else if (value[0] === 'send') {
                    this.voucherMaster[value[0]] = Boolean(value[1]);
                } else {
                    this.voucherMaster[value[0]] = value[1];
                }
            }
        }
    }

    exec() {
        this.voucherTemplateService.executeQuery(this.voucherTemplate.id, this.date, this.locationId, this.customerId, this.startDate, this.finishDate, this.queryCategory)
            .subscribe((value) => {
                this.loadAll();
            }, (res: HttpErrorResponse) => {
                this.onError(res.error);
            });
    }

    loadAllRefuelCenter() {
        this.refuelCenterService.query({}).subscribe((res: HttpResponse<RefuelCenter[]>) => {
            this.refuelCenters = res.body;
        });
    }

    downloacAccFile(voucherMasterId: number) {
        this.voucherMasterService.downloacAccFile(voucherMasterId).subscribe(response => {
            saveAs(response.body, voucherMasterId + 'acc-file.txt');
        });
    }

    loadAll() {
        this.voucherMasterService.query({
            query: this.currentSearch.length > 0 ? this.currentSearch : null,
            page: this.page,
            size: this.itemsPerPage,
            sort: this.sort()
        }).subscribe(
            (res: HttpResponse<VoucherMaster[]>) => this.onSuccess(res.body, res.headers),
            (res: HttpErrorResponse) => this.onError(res.error)
        );
    }

    clear() {
        this.page = 0;
        this.currentSearch = '';
        this.router.navigate(['/voucher-master'], {
            queryParams: {
                page: this.page,
                sort: this.predicate + ',' + (this.reverse ? 'desc' : 'asc')
            }
        });
        this.loadAll();
        this.voucherMaster = new VoucherMaster();
    }

    search() {
        this.page = 0;
        this.currentSearch = '';

        if (this.voucherMaster.locationTitle) {
            this.currentSearch += 'location|name$' + this.voucherMaster.locationTitle + '&';
        }
        if (this.voucherMaster.voucherTypeTitle) {
            this.currentSearch += 'voucherType.title$' + this.voucherMaster.voucherTypeTitle + '&';
        }
        if (this.voucherMaster.docDate) {
            this.currentSearch += 'docDate→' + this.voucherMaster.docDate.toISOString() + '&';
        }
        if (this.voucherMaster.userConfirm) {
            this.currentSearch += 'userConfirm$' + this.voucherMaster.userConfirm + '&';
        }
        if (this.voucherMaster.docNumber) {
            this.currentSearch += 'docNumber$' + this.voucherMaster.docNumber + '&';
        }
        if (this.voucherMaster.description) {
            this.currentSearch += 'description$' + this.voucherMaster.description + '&';
        }
        if (this.voucherMaster.voucherTypeId) {
            this.currentSearch += 'voucherType.id☼' + this.voucherMaster.voucherTypeId + '&';
        }
        if (this.voucherMaster.status) {
            this.currentSearch += 'status#VoucherMasterStatus.' + this.voucherMaster.status + '&';
        }
        if (this.currentSearch.length > 0) {
            this.currentSearch = this.currentSearch.substring(0, this.currentSearch.length - 1);
        }

        this.router.navigate(['/voucher-master'], {
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
        this.translateService.get('niopdcgatewayApp.voucherMaster.home.title').subscribe((title) => {
            this.breadcrumbItems.push({label: title});
        });
    }

    ngOnInit() {
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });

        this.voucherTypeService.query().subscribe(
            (res) => {
                this.vouchertypes = res.body;
            }
        );

        this.voucherTemplateService.query().subscribe((value) => {
            this.voucherTemplates = value.body.filter((value) => value.referrer === 'NORMAL');
        });

        this.registerChangeInVoucherMasters();

        this.setBreadCrumb();
        this.loadAllRefuelCenter();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: VoucherMaster) {
        return item.id;
    }

    trackVoucherTypeById(index: number, item: VoucherType) {
        return item.id;
    }

    registerChangeInVoucherMasters() {
        this.eventSubscriber = this.eventManager.subscribe('voucherMasterListModification', (response) => this.loadAll());
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

            this.router.navigate(['/voucher-master'], {
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

    changeVoucherType($event: Event) {
        if (this.voucherTemplate.voucherMappings.length > 0) {
            this.baseQueryParams = this.voucherTemplate.baseQueryParameters;
            if (this.baseQueryParams.includes('LOCATION')) {
                this.parameterLocation = true;
            } else {
                this.parameterLocation = false;
            }
            if (this.baseQueryParams.includes('CUSTOMER')) {
                this.parameterCustomer = true;
            } else {
                this.parameterCustomer = false;
            }
            if (this.baseQueryParams.includes('START_DATE')) {
                this.parameterStartDate = true;
            } else {
                this.parameterStartDate = false;
            }

            if (this.baseQueryParams.includes('FINISH_DATE')) {
                this.parameterFinishDate = true;
            } else {
                this.parameterFinishDate = false;
            }

            if (this.baseQueryParams.includes('DATE')) {
                this.parameterDate = true;
            } else {
                this.parameterDate = false;
            }

            this.queryCategory = this.voucherTemplate.voucherMappings[0].queryCategory;
            if (!this.queryCategory) {
                this.queryCategory = '';
            }
        }

    }

    private onSuccess(data, headers) {
        this.links = this.parseLinks.parse(headers.get('link'));
        this.totalItems = headers.get('X-Total-Count');
        this.queryCount = this.totalItems;
        // this.page = pagingParams.page;
        this.voucherMasters = data;
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
