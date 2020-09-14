import {Component, OnInit, OnDestroy} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Subscription} from 'rxjs/Rx';
import {JhiEventManager, JhiParseLinks, JhiAlertService} from 'ng-jhipster';

import {Principal} from '../../shared';
import {ExportPi, ExportPiService} from '../export-pi/.';
import {LazyLoadEvent} from 'primeng/primeng';
import {TranslateService} from '@ngx-translate/core';
import {HttpErrorResponse, HttpResponse} from '@angular/common/http';
import {ExportLetter, ExportLetterService} from 'app/entities/export-letter';
import {Currency, CurrencyService} from 'app/entities/currency';
import {CustomerCredit, CustomerCreditService} from 'app/entities/customer-credit';

@Component({
    selector: 'jhi-export-pi-credit',
    templateUrl: './export-pi-credit.component.html'
})
export class ExportPiCreditComponent implements OnInit, OnDestroy {

    currentAccount: any;
    customerCredits: CustomerCredit[];
    value = 0;
    error: any;
    success: any;
    eventSubscriber: Subscription;
    routeData: any;
    links: any;
    totalItems: any;
    exportPiId: number;
    exportPi: ExportPi;
    exportLetterId: number;
    exportLetter: ExportLetter;
    currency: Currency;
    breadcrumbItems: any[];

    customerId: number;
    personId: number;

    constructor(
        private customerCreditService: CustomerCreditService,
        private exportPiService: ExportPiService,
        private exportLetterService: ExportLetterService,
        private currencyService: CurrencyService,
        private parseLinks: JhiParseLinks,
        private jhiAlertService: JhiAlertService,
        private principal: Principal,
        private activatedRoute: ActivatedRoute,
        private router: Router,
        private translateService: TranslateService,
        private eventManager: JhiEventManager
    ) {
        this.exportPiId = activatedRoute.snapshot.params['exportPiId'];
        this.exportLetterId = activatedRoute.snapshot.params['exportLetterId'];
        this.customerId = activatedRoute.snapshot.queryParams['customer'] ? +activatedRoute.snapshot.queryParams['customer'] : null;
        this.personId = activatedRoute.snapshot.queryParams['person'] ? +activatedRoute.snapshot.queryParams['person'] : null;
    }

    loadAll() {
        this.customerCreditService.queryByExportPi(this.exportPiId).subscribe(
            (res: HttpResponse<CustomerCredit[]>) => this.onSuccess(res.body, res.headers),
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    search() {
        this.router.navigate(['sell-contract/' + this.exportLetter.sellContractId + '/export-letter/' + this.exportLetterId + '/export-pi/' + this.exportPiId + '/export-pi-credit'], {
            queryParams: {
                person: this.personId ? this.personId : null,
                customer: this.customerId ? this.customerId : null,
            }
        });
        this.loadAll();
    }

    setBreadCrumb() {
        this.breadcrumbItems = [];
        this.translateService.get('global.menu.home').subscribe(title => {
            this.breadcrumbItems.push({label: title, routerLink: ['/']});
        });
        this.translateService.get('niopdcgatewayApp.exportPiCredit.home.exportPiTitle').subscribe(title => {
            this.breadcrumbItems.push({
                label: title + ` (${this.exportPi.piNumber})`,
                routerLink: ['/sell-contract/' + this.exportLetter.sellContractId + '/export-letter/' + this.exportLetter.id + '/export-pi'],
                queryParams: {customer: this.customerId, person: this.personId}
            });
        });
        this.translateService.get('niopdcgatewayApp.exportPiCredit.home.title').subscribe(title => {
            this.breadcrumbItems.push({label: title});
        });
    }

    ngOnInit() {
        this.principal.identity().then(account => {
            this.currentAccount = account;
        });

        this.registerChangeInExportPiCredits();

        this.exportPiService.find(this.exportPiId).subscribe(
            (exportPi: HttpResponse<ExportPi>) => {
                this.exportPi = exportPi.body;
                this.exportLetterService.find(this.exportPi.exportLetterId).subscribe(
                    (exportLetter: HttpResponse<ExportLetter>) => {
                        this.exportLetter = exportLetter.body;
                        this.setBreadCrumb();
                        this.loadAll();
                    }
                );
            }
        );
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInExportPiCredits() {
        this.eventSubscriber = this.eventManager.subscribe('exportPiCreditListModification', response => this.loadAll());
    }

    private onSuccess(data, headers) {
        // this.links = this.parseLinks.parse(headers.get('link'));
        // this.totalItems = headers.get('X-Total-Count');
        this.totalItems = data.length;
        this.customerCredits = data;
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }

    round(number: number) {
        return Math.round(number * 1000) / 1000;
    }

}
