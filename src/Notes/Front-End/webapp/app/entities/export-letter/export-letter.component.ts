import {Component, OnInit, OnDestroy} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Subscription} from 'rxjs/Rx';
import {JhiEventManager, JhiParseLinks, JhiAlertService} from 'ng-jhipster';

import {SellContract, ContractType, SellContractService} from '../sell-contract';
import {ExportLetter} from './export-letter.model';
import {ExportLetterService} from './export-letter.service';
import {Principal} from '../../shared';

import {Person, PersonService} from '../person/.';
import {Product, ProductService} from '../product/.';
import {LazyLoadEvent} from 'primeng/primeng';
import {TranslateService} from '@ngx-translate/core';
import {HttpErrorResponse, HttpResponse} from '@angular/common/http';

@Component({
    selector: 'jhi-export-letter',
    templateUrl: './export-letter.component.html'
})
export class ExportLetterComponent implements OnInit, OnDestroy {

    currentAccount: any;
    exportLetters: ExportLetter[];
    exportLetter: ExportLetter = new ExportLetter();
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
    sellContractId: number;
    sellContract: SellContract;
    breadcrumbItems: any[];

    buyers: Person[];
    products: Product[];

    customerId: number;
    personId: number;

    constructor(
        private exportLetterService: ExportLetterService,
        private buyerService: PersonService,
        private productService: ProductService,
        private sellContractService: SellContractService,
        private parseLinks: JhiParseLinks,
        private jhiAlertService: JhiAlertService,
        private principal: Principal,
        private activatedRoute: ActivatedRoute,
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
        this.sellContractId = activatedRoute.snapshot.params['sellContractId'];
        this.customerId = activatedRoute.snapshot.queryParams['customer'] ? +activatedRoute.snapshot.queryParams['customer'] : null;
        this.personId = activatedRoute.snapshot.queryParams['person'] ? +activatedRoute.snapshot.queryParams['person'] : null;
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
                    this.exportLetter[value[0]] = Number(value[1]);
                } else {
                    this.exportLetter[value[0]] = value[1];
                }
            }
        }
    }

    loadAll() {
        this.exportLetterService.query(this.sellContractId, {
            query: this.currentSearch.length > 0 ? this.currentSearch : null,
            page: this.page,
            size: this.itemsPerPage,
            sort: this.sort()
        }).subscribe(
            (res: HttpResponse<ExportLetter[]>) => this.onSuccess(res.body, res.headers),
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    clear() {
        this.page = 0;
        this.currentSearch = '';
        this.router.navigate(['sell-contract/' + this.sellContractId + '/export-letter'], {
            queryParams: {
                page: this.page,
                person: this.personId ? this.personId : null,
                customer: this.customerId ? this.customerId : null,
                sort: this.predicate + ',' + (this.reverse ? 'desc' : 'asc')
            }
        });
        this.exportLetter = new ExportLetter();
        this.loadAll();
    }

    search() {
        this.page = 0;
        this.currentSearch = '';
        if (this.exportLetter.type) {
            this.currentSearch += 'type#ExportLetterType.' + this.exportLetter.type + '&';
        }
        if (this.exportLetter.status) {
            this.currentSearch += 'status#ExportLetterStatus.' + this.exportLetter.status + '&';
        }
        if (this.exportLetter.declarationNumber) {
            this.currentSearch += 'declarationNumber$' + this.exportLetter.declarationNumber + '&';
        }
        if (this.exportLetter.registerDate) {
            this.currentSearch += 'registerDate→' + this.exportLetter.registerDate.toISOString() + '&';
        }
        if (this.exportLetter.amount) {
            this.currentSearch += 'amount☼' + this.exportLetter.amount + '&';
        }
        if (this.exportLetter.price) {
            this.currentSearch += 'price☼' + this.exportLetter.price + '&';
        }
        if (this.exportLetter.buyerId) {
            this.currentSearch += 'buyer.id☼' + this.exportLetter.buyerId + '&';
        }
        if (this.exportLetter.productId) {
            this.currentSearch += 'product.id☼' + this.exportLetter.productId + '&';
        }
        if (this.currentSearch.length > 0) {
            this.currentSearch = this.currentSearch.substring(0, this.currentSearch.length - 1);
        }

        this.router.navigate(['sell-contract/' + this.sellContractId + '/export-letter'], {
            queryParams: {
                search: this.currentSearch,
                page: this.page,
                person: this.personId ? this.personId : null,
                customer: this.customerId ? this.customerId : null,
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
        this.translateService.get('niopdcgatewayApp.sellContract.home.title').subscribe(title => {
            this.breadcrumbItems.push({
                label: title + ` (${this.sellContract.contractNo})`,
                routerLink: ['/sell-contract'],
                queryParams: {customer: this.customerId, person: this.personId}
            });
        });
        this.translateService.get('niopdcgatewayApp.exportLetter.home.title').subscribe(title => {
            this.breadcrumbItems.push({label: title});
        });
    }

    ngOnInit() {
        this.principal.identity().then(account => {
            this.currentAccount = account;
        });

        this.registerChangeInExportLetters();

        this.sellContractService.find(this.sellContractId).subscribe(
            (sellContract: HttpResponse<SellContract>) => {
                this.sellContract = sellContract.body;
                this.setBreadCrumb();
            }
        );
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: ExportLetter) {
        return item.id;
    }

    registerChangeInExportLetters() {
        this.eventSubscriber = this.eventManager.subscribe('exportLetterListModification',response => this.loadAll());
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
        this.exportLetters = data;
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

            this.router.navigate(['sell-contract', this.sellContractId, '/export-letter'], {
                queryParams: {
                    page: this.page,
                    size: this.itemsPerPage,
                    person: this.personId ? this.personId : null,
                    customer: this.customerId ? this.customerId : null,
                    search: this.currentSearch,
                    sort: this.predicate + ',' + (this.reverse ? 'desc' : 'asc')
                }
            });
        }

        this.loadAll();
    }

    print(item) {
        this.jhiAlertService.info('error.notImplement', null, null);
    }
}
