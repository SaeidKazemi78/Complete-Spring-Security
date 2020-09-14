import {Component, OnDestroy, OnInit} from '@angular/core';
import {HttpErrorResponse, HttpResponse} from '@angular/common/http';
import {ActivatedRoute, Router} from '@angular/router';
import {Subscription} from 'rxjs/Subscription';
import {JhiAlertService, JhiEventManager, JhiParseLinks} from 'ng-jhipster';

import {VoucherType} from './voucher-type.model';
import {VoucherTypeService} from './voucher-type.service';
import {Principal} from '../../shared';

import {VoucherTypeGroup, VoucherTypeGroupService} from '../voucher-type-group/.';
import {LazyLoadEvent} from 'primeng/primeng';
import {TranslateService} from '@ngx-translate/core';

@Component({
    selector: 'jhi-voucher-type',
    templateUrl: './voucher-type.component.html'
})
export class VoucherTypeComponent implements OnInit, OnDestroy {

    currentAccount: any;
    voucherTypes: VoucherType[];
    voucherType: VoucherType = new VoucherType();
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
    voucherTypeGroupId: number;

    voucherTypeGroup: VoucherTypeGroup;

    constructor(
        private voucherTypeService: VoucherTypeService,
        private voucherTypeGroupService: VoucherTypeGroupService,
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
            this.page = data.pagingParams.page;
            this.previousPage = data.pagingParams.page;
            this.reverse = !data.pagingParams.ascending;
            this.predicate = data.pagingParams.predicate;
        });
        this.currentSearch = activatedRoute.snapshot.queryParams['search'] ? activatedRoute.snapshot.queryParams['search'] : '';
        this.voucherTypeGroupId = activatedRoute.snapshot.params['voucherTypeGroupId'];

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
                    this.voucherType[value[0]] = Number(value[1]);
                } else {
                    this.voucherType[value[0]] = value[1];
                }
            }
        }
    }

    loadAll() {
        this.voucherTypeService.queryByVoucherTypeGroupId(this.voucherTypeGroupId,
            {
                query: this.currentSearch.length > 0 ? this.currentSearch : null,
                page:
                this.page,
                size:
                this.itemsPerPage,
                sort:
                    this.sort()
            }
        ).subscribe(
            (res: HttpResponse<VoucherType[]>) => this.onSuccess(res.body, res.headers),
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    clear() {
        this.page = 0;
        this.currentSearch = '';
        this.router.navigate([`/voucher-type-group/${this.voucherTypeGroupId}/voucher-type`], {
            queryParams: {
                page: this.page,
                sort: this.predicate + ',' + (this.reverse ? 'desc' : 'asc')
            }
        });
        this.voucherType = new VoucherType();
        this.loadAll();
    }

    search() {
        this.page = 0;
        this.currentSearch = '';
        if (this.voucherType.title) {
            this.currentSearch += 'title$' + this.voucherType.title + '&';
        }
        if (this.voucherType.voucherTypeGroupId) {
            this.currentSearch += 'voucherTypeGroup.id☼' + this.voucherType.voucherTypeGroupId + '&';
        }
        if (this.currentSearch.length > 0) {
            this.currentSearch = this.currentSearch.substring(0, this.currentSearch.length - 1);
        }

        this.router.navigate([`/voucher-type-group/${this.voucherTypeGroupId}/voucher-type`], {
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
        this.translateService.get('niopdcgatewayApp.voucherTypeGroup.home.title').subscribe((title) => {
            this.breadcrumbItems.push({
                label: `${title} (${this.voucherTypeGroup.title})`,
                routerLink: ['/voucher-type-group']
            });
        });
        this.translateService.get('niopdcgatewayApp.voucherType.home.title').subscribe((title) => {
            this.breadcrumbItems.push({label: title});
        });
    }

    ngOnInit() {
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });

        this.registerChangeInVoucherTypes();
        this.voucherTypeGroupService.find(this.voucherTypeGroupId)
            .subscribe((res) => {
                this.voucherTypeGroup = res.body;
                this.setBreadCrumb();
            });
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: VoucherType) {
        return item.id;
    }

    trackVoucherTypeGroupById(index: number, item: VoucherTypeGroup) {
        return item.id;
    }

    registerChangeInVoucherTypes() {
        this.eventSubscriber = this.eventManager.subscribe('voucherTypeListModification', (response) => this.loadAll());
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
        this.voucherTypes = data;
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

            this.router.navigate([`/voucher-type-group/${this.voucherTypeGroupId}/voucher-type`], {
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
