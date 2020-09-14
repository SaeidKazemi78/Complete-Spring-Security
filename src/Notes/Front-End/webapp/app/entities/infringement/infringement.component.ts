import {Component, OnDestroy, OnInit} from '@angular/core';
import {HttpErrorResponse, HttpResponse} from '@angular/common/http';
import {ActivatedRoute, Router} from '@angular/router';
import {Subscription} from 'rxjs/Subscription';
import {JhiAlertService, JhiDataUtils, JhiEventManager, JhiParseLinks} from 'ng-jhipster';

import {Infringement} from './infringement.model';
import {InfringementService} from './infringement.service';
import {Principal} from '../../shared';
import {LazyLoadEvent} from 'primeng/api';
import {TranslateService} from '@ngx-translate/core';
import {Customer, CustomerService} from 'app/entities/customer';
import {saveAs} from 'file-saver/FileSaver';

@Component({
    selector: 'jhi-infringement',
    templateUrl: './infringement.component.html'
})
export class InfringementComponent implements OnInit, OnDestroy {

    currentAccount: any;
    infringements: Infringement[];
    infringement: Infringement = new Infringement();
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
    car: Customer;
    customerId: number;

    constructor(
        private infringementService: InfringementService,
        private customerService: CustomerService,
        private parseLinks: JhiParseLinks,
        private jhiAlertService: JhiAlertService,
        private principal: Principal,
        private activatedRoute: ActivatedRoute,
        private dataUtils: JhiDataUtils,
        private router: Router,
        private translateService: TranslateService,
        private eventManager: JhiEventManager
    ) {
        this.routeData = this.activatedRoute.data.subscribe(data => {
            this.itemsPerPage = data.pagingParams.size;
            this.page = data.pagingParams.page;
            this.previousPage = data.pagingParams.page;
            this.reverse = !data.pagingParams.ascending;
            this.predicate = data.pagingParams.predicate;
        });
        this.currentSearch = activatedRoute.snapshot.queryParams['search'] ? activatedRoute.snapshot.queryParams['search'] : '';
        this.customerId = activatedRoute.snapshot.params['customerId'];

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
                this.infringements[value[0]] = value[1];
            }
        }
    }

    loadAll() {
        this.infringementService.query({
            query: this.currentSearch.length > 0 ? this.currentSearch : null,
            customerId: this.customerId,
            page: this.page,
            size: this.itemsPerPage,
            sort: this.sort()
        }).subscribe(
            (res: HttpResponse<Infringement[]>) => this.onSuccess(res.body, res.headers),
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    clear() {
        this.page = 0;
        this.currentSearch = '';
        this.router.navigate(['/customer', 'boundary-customer', +this.customerId + '/infringement'], {
            queryParams: {
                page: this.page,
                sort: this.predicate + ',' + (this.reverse ? 'desc' : 'asc')
            }
        });
        this.loadAll();
    }

    downloadAttachmentFile(fileId) {
        this.infringementService.downloadFile(fileId)
            .subscribe(res => {
                saveAs(res.body, res.headers.get('_NAME'));
            });
    }

    search() {
        this.page = 0;
        this.currentSearch = '';
        if (this.infringement.handlingReference) {
            this.currentSearch += 'handlingReference$' + this.infringement.handlingReference + '&';
        }
        if (this.infringement.locationName) {
            this.currentSearch += 'location.name$' + this.infringement.locationName + '&';
        }
        if (this.infringement.infringementType) {
            this.currentSearch += 'infringementType#InfringementType.' + this.infringement.infringementType + '&';
        }
        if (this.infringement.active != null && this.infringement.active !== undefined) {
            this.currentSearch += 'active;' + this.infringement.active + '&';
        }
        if (this.currentSearch.length > 0) {
            this.currentSearch = this.currentSearch.substring(0, this.currentSearch.length - 1);
        }

        this.router.navigate(['/customer', 'boundary-customer', +this.customerId + '/infringement'], {
            queryParams: {
                search: this.currentSearch,
                customerId: this.customerId,
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
        this.translateService.get('niopdcgatewayApp.customer.home.titleBoundary').subscribe(title => {
            this.breadcrumbItems.push({label: title + ' ( ' + this.car.customPlaque.plaque + ' )', routerLink: ['/customer', 'boundary-customer']});
        });
        this.translateService.get('niopdcgatewayApp.infringement.home.title').subscribe(title => {
            this.breadcrumbItems.push({label: title});
        });
    }

    ngOnInit() {
        this.principal.identity().then(account => {
            this.currentAccount = account;
        });

        this.customerService.find(this.customerId).subscribe(customer => {
                this.car = customer.body;
                this.setBreadCrumb();

            }
        );
        this.registerChangeInNews();

    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: Infringement) {
        return item.id;
    }

    byteSize(field) {
        return this.dataUtils.byteSize(field);
    }

    registerChangeInNews() {
        this.eventSubscriber = this.eventManager.subscribe('infringementListModification', response => this.loadAll());
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

            this.router.navigate(['/customer', 'boundary-customer', +this.customerId + '/infringement'], {
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
        this.infringements = data;
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
