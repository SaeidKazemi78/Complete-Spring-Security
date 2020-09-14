import {Component, OnDestroy, OnInit} from '@angular/core';
import {HttpErrorResponse, HttpResponse} from '@angular/common/http';
import {ActivatedRoute, Router} from '@angular/router';
import {Subscription} from 'rxjs/Subscription';
import {JhiAlertService, JhiEventManager, JhiParseLinks} from 'ng-jhipster';

import {Wallet} from './wallet.model';
import {WalletService} from './wallet.service';
import {Principal} from '../../shared';

import {LazyLoadEvent} from 'primeng/primeng';
import {TranslateService} from '@ngx-translate/core';
import {Person} from '../person';
import {CustomerService} from '../customer';
import {NiopdcBankAccountType, NiopdcBankAccountTypeService} from '../niopdc-bank-account-type';
import {BankTransaction, BankTransactionRef, BankTransactionService} from '../bank-transaction';

@Component({
    selector: 'jhi-wallet',
    templateUrl: './wallet.component.html'
})
export class WalletComponent implements OnInit, OnDestroy {

    currentAccount: any;
    wallets: Wallet[];
    error: any;
    success: any;
    eventSubscriber: Subscription;
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
    customerOptions: any[];
    niopdcbankaccountTypes: NiopdcBankAccountType[];
    wallet = new Wallet();
    transactionStarted = false;


    constructor(
        private walletService: WalletService,
        private parseLinks: JhiParseLinks,
        private jhiAlertService: JhiAlertService,
        private principal: Principal,
        private activatedRoute: ActivatedRoute,
        private router: Router,
        private translateService: TranslateService,
        private eventManager: JhiEventManager,
        private customerService: CustomerService,
        private niopdcBankAccountTypeService: NiopdcBankAccountTypeService,
        private bankTransactionService: BankTransactionService
    ) {
        this.routeData = this.activatedRoute.data.subscribe((data) => {
            this.itemsPerPage = data.pagingParams.size;
            this.page = data.pagingParams.page;
            this.previousPage = data.pagingParams.page;
            this.reverse = !data.pagingParams.ascending;
            this.predicate = data.pagingParams.predicate;
        });

    }

    loadAll() {
        this.walletService.query({
            personId: this.currentAccount.person.id,
            page: this.page - 1,
            size: this.itemsPerPage,
            sort: this.sort()
        }).subscribe(
            (res: HttpResponse<Wallet[]>) => this.onSuccess(res.body, res.headers),
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }


    trackNiopdcBankAccountTypeById(index: number, item: NiopdcBankAccountType) {
        return item.id;
    }

    setBreadCrumb() {
        this.breadcrumbItems = [];
        this.translateService.get('global.menu.home').subscribe((title) => {
            this.breadcrumbItems.push({label: title, routerLink: ['/']});
        });
        this.translateService.get('niopdcgatewayApp.wallet.home.title').subscribe((title) => {
            this.breadcrumbItems.push({label: title});
        });
    }

    ngOnInit() {

        this.principal.identity(true).then((identity) => {
            this.currentAccount = identity;
            this.customerOptions = [];
            this.customerOptions.push({'value': null, 'label': ''});

            this.customerService.queryByPerson(this.currentAccount.person.id)
                .subscribe((res) => {
                    res.body.forEach((customer) => {
                        this.customerOptions.push({'value': customer.id, 'label': customer.name});
                    });
                });

            this.loadAll();
        });


        this.niopdcBankAccountTypeService.query()
            .subscribe((res: HttpResponse<NiopdcBankAccountType[]>) => {
                this.niopdcbankaccountTypes = res.body;
            }, (res: HttpErrorResponse) => this.onError(res.message));


        this.registerChangeInWallets();
        this.setBreadCrumb();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: Wallet) {
        return item.id;
    }

    registerChangeInWallets() {
        this.eventSubscriber = this.eventManager.subscribe('walletListModification', (response) => this.loadAll());
    }

    sort() {
        const result = [this.predicate + ',' + (this.reverse ? 'desc' : 'asc')];

        return result;
    }

    startBankTransaction() {
        this.transactionStarted = true;
        this.walletService.startTransaction({
            amount:this.wallet.amount,
            personId: this.currentAccount.person.id,
            customerId: this.wallet.customerId,
            bankAccountTypeId: this.wallet.bankAccountTypeId
        }).subscribe((value) => {
            this.router.navigate(['/','wallet','e-payment', value.body])
                .then((result) => {
                    console.log(result);
                }).catch((error) => {
                console.log(error);
            });
        }, (error1 => {
            this.transactionStarted = false;
            this.onError(error1);
        }));
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

            this.router.navigate(['/','wallet'], {
                queryParams: {
                    page: this.page,
                    size: this.itemsPerPage,
                    sort: this.predicate + ',' + (this.reverse ? 'desc' : 'asc')
                }
            });
        }

        if (this.currentAccount)
            this.loadAll();
    }

    private onSuccess(data, headers) {
        this.links = this.parseLinks.parse(headers.get('link'));
        this.totalItems = headers.get('X-Total-Count');
        this.queryCount = this.totalItems;
        // this.page = pagingParams.page;
        this.wallets = data;
    }

    private onError(error) {
       console.log(error);
    }

}
