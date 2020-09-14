
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager, JhiParseLinks, JhiAlertService } from 'ng-jhipster';

import { VoucherItem } from './voucher-item.model';
import { VoucherItemService } from './voucher-item.service';
import { Principal } from '../../shared';
import { VoucherMaster, VoucherMasterService } from '../voucher-master/.';
import { LazyLoadEvent } from 'primeng/primeng';
import { TranslateService } from '@ngx-translate/core';
import {HttpErrorResponse, HttpResponse} from '@angular/common/http';

@Component({
    selector: 'jhi-voucher-item',
    templateUrl: './voucher-item.component.html'
})
export class VoucherItemComponent implements OnInit, OnDestroy {

    currentAccount: any;
    voucherItems: VoucherItem[];
    voucherItem: VoucherItem = new VoucherItem();
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
    voucherMasterId: number;
    voucherMaster: VoucherMaster;
    breadcrumbItems: any[];

    constructor(
        private voucherItemService: VoucherItemService,
                 private voucherMasterService: VoucherMasterService,
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
        this.voucherMasterId = activatedRoute.snapshot.params['voucherMasterId'];

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
            this.voucherItem[value[0]] = value[1];
            }
        }
    }

    loadAll() {
        this.voucherItemService.query(this.voucherMasterId, {
            query: this.currentSearch.length > 0 ? this.currentSearch : null,
            page: this.page,
            size: this.itemsPerPage,
            sort: this.sort()}).subscribe(
            (res: HttpResponse<VoucherItem[]>) => this.onSuccess(res.body, res.headers),
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    clear() {
        this.page = 0;
        this.currentSearch = '';

        this.router.navigate(['voucher-master/' + this.voucherMasterId + '/voucher-item'], {
            queryParams: {  page: this.page,
                sort: this.predicate + ',' + (this.reverse ? 'desc' : 'asc')
            }
        });
        this.loadAll();
    }

    search() {
        this.page = 0;
        this.currentSearch = '';
        if (this.voucherItem.rowNo) {
            this.currentSearch += 'rowNo☼' + this.voucherItem.rowNo + '&';
        }
        if (this.voucherItem.extra) {
            this.currentSearch += 'extra$' + this.voucherItem.extra + '&';
        }
        if (this.voucherItem.special) {
            this.currentSearch += 'special$' + this.voucherItem.special + '&';
        }
        if (this.voucherItem.credit) {
            this.currentSearch += 'credit☼' + this.voucherItem.credit + '&';
        }
        if (this.voucherItem.debit) {
            this.currentSearch += 'debit☼' + this.voucherItem.debit + '&';
        }
        if (this.voucherItem.description) {
            this.currentSearch += 'description$' + this.voucherItem.description + '&';
        }
        if (this.voucherItem.accountNo) {
            this.currentSearch += 'accountNo$' + this.voucherItem.accountNo + '&';
        }
        if (this.voucherItem.suffix) {
            this.currentSearch += 'suffix$' + this.voucherItem.suffix + '&';
        }
        if (this.voucherItem.key) {
            this.currentSearch += 'key$' + this.voucherItem.key + '&';
        }
        if (this.currentSearch.length > 0) {
            this.currentSearch = this.currentSearch.substring(0, this.currentSearch.length - 1);
        }

        this.router.navigate(['voucher-master/' + this.voucherMasterId + '/voucher-item'], {
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
        this.translateService.get('niopdcgatewayApp.voucherItem.home.voucherMasterTitle').subscribe((title) => {
            this.breadcrumbItems.push({label: title, routerLink: ['/voucher-master']});
        });
        this.translateService.get('niopdcgatewayApp.voucherItem.home.title').subscribe((title) => {
            this.breadcrumbItems.push({label: title});
        });
    }

    ngOnInit() {
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });

        this.registerChangeInVoucherItems();

        this.voucherMasterService.find(this.voucherMasterId).subscribe(
            (voucherMaster: VoucherMaster) => {
                this.voucherMaster = voucherMaster;
                this.setBreadCrumb();
            }
        );
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: VoucherItem) {
        return item.id;
    }

    registerChangeInVoucherItems() {
        this.eventSubscriber = this.eventManager.subscribe('voucherItemListModification', (response) => this.loadAll());
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
        this.voucherItems = data;
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

            this.router.navigate(['voucher-master' , this.voucherMasterId , 'voucher-item'], {
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
