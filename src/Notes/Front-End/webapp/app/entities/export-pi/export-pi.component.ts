import {Component, OnInit, OnDestroy} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Subscription} from 'rxjs/Rx';
import {JhiEventManager, JhiParseLinks, JhiAlertService} from 'ng-jhipster';

import {ExportPi} from './export-pi.model';
import {ExportPiService} from './export-pi.service';
import {Principal} from '../../shared';
import {ExportLetter, ExportLetterService} from '../export-letter/.';
import {LazyLoadEvent} from 'primeng/primeng';
import {TranslateService} from '@ngx-translate/core';
import {HttpErrorResponse, HttpResponse} from '@angular/common/http';

@Component({
    selector: 'jhi-export-pi',
    templateUrl: './export-pi.component.html'
})
export class ExportPiComponent implements OnInit, OnDestroy {

    currentAccount: any;
    exportPis: ExportPi[];
    exportPi: ExportPi = new ExportPi();
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
    exportLetterId: number;
    exportLetter: ExportLetter;
    breadcrumbItems: any[];

    customerId: number;
    personId: number;
    sellContractId: number;
    constructor(
        private exportPiService: ExportPiService,
        private exportLetterService: ExportLetterService,
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
        this.exportLetterId = activatedRoute.snapshot.params['exportLetterId'];
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
                    this.exportPi[value[0]] = Number(value[1]);
                } else {
                    this.exportPi[value[0]] = value[1];
                }
            }
        }
    }

    loadAll() {
        this.exportPiService.query(this.exportLetterId, {
            query: this.currentSearch.length > 0 ? this.currentSearch : null,
            page: this.page,
            size: this.itemsPerPage,
            sort: this.sort()
        }).subscribe(
            (res: HttpResponse<ExportPi[]>) => this.onSuccess(res.body, res.headers),
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    clear() {
        this.page = 0;
        this.currentSearch = '';

        this.router.navigate(['sell-contract/' + this.exportLetter.sellContractId + '/export-letter/' + this.exportLetterId + '/export-pi'], {
            queryParams: {
                page: this.page,
                person: this.personId ? this.personId : null,
                customer: this.customerId ? this.customerId : null,
                sort: this.predicate + ',' + (this.reverse ? 'desc' : 'asc')
            }
        });
        this.loadAll();
    }

    search() {
        this.page = 0;
        this.currentSearch = '';
        if (this.exportPi.registerDate) {
            this.currentSearch += 'registerDate→' + this.exportPi.registerDate.toISOString() + '&';
        }
        if (this.exportPi.piNumber) {
            this.currentSearch += 'piNumber$' + this.exportPi.piNumber + '&';
        }
        if (this.exportPi.amount) {
            this.currentSearch += 'amount☼' + this.exportPi.amount + '&';
        }
        if (this.exportPi.price) {
            this.currentSearch += 'price☼' + this.exportPi.price + '&';
        }
        if (this.exportPi.type) {
            this.currentSearch += 'type#ExportPiType.' + this.exportPi.type + '&';
        }
        if (this.currentSearch.length > 0) {
            this.currentSearch = this.currentSearch.substring(0, this.currentSearch.length - 1);
        }

        this.router.navigate(['sell-contract/' + this.exportLetter.sellContractId + '/export-letter/' + this.exportLetterId + '/export-pi'], {
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
        this.translateService.get('niopdcgatewayApp.exportPi.home.exportLetterTitle').subscribe(title => {
            this.breadcrumbItems.push({label: title + ` (${this.exportLetter.declarationNumber})`,
                routerLink: ['/sell-contract/' + this.exportLetter.sellContractId + '/export-letter'],
                queryParams: {customer: this.customerId, person: this.personId}});
        });
        this.translateService.get('niopdcgatewayApp.exportPi.home.title').subscribe(title => {
            this.breadcrumbItems.push({label: title});
        });
    }

    ngOnInit() {
        this.principal.identity().then(account => {
            this.currentAccount = account;
        });

        this.registerChangeInExportPis();

        this.exportLetterService.find(this.exportLetterId).subscribe(
            (exportLetter: HttpResponse<ExportLetter>) => {
                this.exportLetter = exportLetter.body;
                this.sellContractId = this.exportLetter.sellContractId;
                this.setBreadCrumb();
            }
        );
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: ExportPi) {
        return item.id;
    }

    registerChangeInExportPis() {
        this.eventSubscriber = this.eventManager.subscribe('exportPiListModification', response => this.loadAll());
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
        this.exportPis = data;
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

            this.router.navigate(['sell-contract', this.exportLetter.sellContractId, 'export-letter', this.exportLetterId, 'export-pi'], {
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
