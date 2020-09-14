import {Component, OnDestroy, OnInit} from '@angular/core';
import {HttpErrorResponse, HttpResponse} from '@angular/common/http';
import {ActivatedRoute, Router} from '@angular/router';
import {Subscription} from 'rxjs/Subscription';
import {JhiAlertService, JhiEventManager, JhiParseLinks} from 'ng-jhipster';

import {VoucherMapping} from './voucher-mapping.model';
import {VoucherMappingService} from './voucher-mapping.service';
import {Principal} from '../../shared';

import {BaseQuery, BaseQueryService} from '../base-query/.';
import {VoucherTemplate, VoucherTemplateService} from '../voucher-template/.';
import {LazyLoadEvent} from 'primeng/primeng';
import {TranslateService} from '@ngx-translate/core';

@Component({
    selector: 'jhi-voucher-mapping',
    templateUrl: './voucher-mapping.component.html'
})
export class VoucherMappingComponent implements OnInit, OnDestroy {

    currentAccount: any;
    voucherMappings: VoucherMapping[];
    voucherMapping: VoucherMapping = new VoucherMapping();
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

    basequeries: BaseQuery[];
    vouchertemplates: VoucherTemplate[];

    constructor(
        private voucherMappingService: VoucherMappingService,
        private baseQueryService: BaseQueryService,
        private voucherTemplateService: VoucherTemplateService,
        private parseLinks: JhiParseLinks,
        private jhiAlertService: JhiAlertService,
        private principal: Principal,
        private activatedRoute: ActivatedRoute,
        private router: Router,
        private translateService: TranslateService,
        private eventManager: JhiEventManager
    ) {
        this.routeData = this.activatedRoute.data.subscribe((data) => {
            this.page = data.pagingParams.page;
            this.itemsPerPage = data.pagingParams.size;
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
                    this.voucherMapping[value[0]] = Number(value[1]);
                } else {
                    this.voucherMapping[value[0]] = value[1];
                }
            }
        }
    }

    loadAll() {
        this.voucherMappingService.query({
            query: this.currentSearch.length > 0 ? this.currentSearch : null,
            page: this.page,
            size: this.itemsPerPage,
            sort: this.sort()
        }).subscribe(
            (res: HttpResponse<VoucherMapping[]>) => this.onSuccess(res.body, res.headers),
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    clear() {
        this.page = 0;
        this.currentSearch = '';
        this.router.navigate(['/voucher-mapping'], {
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
        if (this.voucherMapping.extraMap) {
            this.currentSearch += 'extraMap$' + this.voucherMapping.extraMap + '&';
        }
        if (this.voucherMapping.specialMap) {
            this.currentSearch += 'specialMap$' + this.voucherMapping.specialMap + '&';
        }
        if (this.voucherMapping.creditMap) {
            this.currentSearch += 'creditMap$' + this.voucherMapping.creditMap + '&';
        }
        if (this.voucherMapping.debitMap) {
            this.currentSearch += 'debitMap$' + this.voucherMapping.debitMap + '&';
        }
        if (this.voucherMapping.descriptionMap) {
            this.currentSearch += 'descriptionMap$' + this.voucherMapping.descriptionMap + '&';
        }
        if (this.voucherMapping.accountNoMap) {
            this.currentSearch += 'accountNoMap$' + this.voucherMapping.accountNoMap + '&';
        }
        if (this.voucherMapping.suffixMap) {
            this.currentSearch += 'suffixMap$' + this.voucherMapping.suffixMap + '&';
        }
        if (this.voucherMapping.keyMap) {
            this.currentSearch += 'keyMap$' + this.voucherMapping.keyMap + '&';
        }
        if (this.voucherMapping.baseQueryId) {
            this.currentSearch += 'baseQuery.id☼' + this.voucherMapping.baseQueryId + '&';
        }
        if (this.voucherMapping.voucherTemplateId) {
            this.currentSearch += 'voucherTemplate.id☼' + this.voucherMapping.voucherTemplateId + '&';
        }
        if (this.currentSearch.length > 0) {
            this.currentSearch = this.currentSearch.substring(0, this.currentSearch.length - 1);
        }

        this.router.navigate(['/voucher-mapping'], {
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
        this.translateService.get('niopdcgatewayApp.voucherMapping.home.title').subscribe((title) => {
            this.breadcrumbItems.push({label: title});
        });
    }

    ngOnInit() {
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });

        this.baseQueryService.query().subscribe(
            (res) => {
                this.basequeries = res.body;
            }
        );
        this.voucherTemplateService.query().subscribe(
            (res) => {
                this.vouchertemplates = res.body;
            }
        );

        this.registerChangeInVoucherMappings();

        this.setBreadCrumb();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: VoucherMapping) {
        return item.id;
    }

    trackBaseQueryById(index: number, item: BaseQuery) {
        return item.id;
    }

    trackVoucherTemplateById(index: number, item: VoucherTemplate) {
        return item.id;
    }

    registerChangeInVoucherMappings() {
        this.eventSubscriber = this.eventManager.subscribe('voucherMappingListModification', (response) => this.loadAll());
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

            this.router.navigate(['/voucher-mapping'], {
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
        this.voucherMappings = data;
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }

}
