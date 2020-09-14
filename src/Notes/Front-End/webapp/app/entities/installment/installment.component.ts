import {Component, OnInit, OnDestroy} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Subscription} from 'rxjs/Rx';
import {JhiEventManager, JhiParseLinks, JhiAlertService} from 'ng-jhipster';

import {Installment, InstallmentStatus, LoanDetail} from './installment.model';
import {InstallmentService} from './installment.service';
import {Principal} from '../../shared';
import {Loan, LoanService} from '../loan/.';

import {TranslateService} from '@ngx-translate/core';
import {HttpErrorResponse, HttpResponse} from '@angular/common/http';
import {MenuItem} from 'primeng/api';
import {BankTransaction, BankTransactionRef} from '../bank-transaction/bank-transaction.model';
import {BankTransactionService} from '../bank-transaction';

@Component({
    selector: 'jhi-installment',
    templateUrl: './installment.component.html'
})
export class InstallmentComponent implements OnInit, OnDestroy {

    currentAccount: any;
    // installments: Installment[];
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
    loanId: number;
    loan: Loan;
    breadcrumbItems: any[];
    loanDetail: LoanDetail;
    printLayout: boolean;
    items: MenuItem[];
    InstallmentStatus = InstallmentStatus;


    constructor(
        private installmentService: InstallmentService,
        private bankTransactionService: BankTransactionService,
        private loanService: LoanService,
        private parseLinks: JhiParseLinks,
        private jhiAlertService: JhiAlertService,
        private principal: Principal,
        private activatedRoute: ActivatedRoute,
        private router: Router,
        private translateService: TranslateService,
        private eventManager: JhiEventManager
    ) {
        this.loanId = activatedRoute.snapshot.params['loanId'];

        this.items = [
            {
                label: this.translateService.instant('entity.action.print'),
                icon: 'pi pi-fw pi-print',
                command: () => {
                    this.printComponent('printLayout');
                }
            },
            {
                label: this.translateService.instant('entity.action.update'),
                icon: 'pi pi-fw pi-refresh',
                command: () => {
                    this.loadAll();
                }
            }/*,
            {
                label: this.translateService.instant('niopdcgatewayApp.installment.payment'),
                icon: 'pi pi-fw pi-payment',
                command: () => {
                    this.loadAll();
                }
            }*/
        ];
    }

    printComponent(cmpName) {

        let printContents, popupWin;
        const head = document.getElementsByTagName('head')[0].innerHTML.replace('<script src="/content/pace-progress/pace.js"></script>', '');
        printContents = document.getElementById(cmpName).innerHTML;
        popupWin = window.open('', '_blank', 'top=0,left=0,height=100%,width=auto');
        popupWin.document.open();
        popupWin.document.write(`
      <html dir="rtl">
        <head>
          ${head}
        </head>
    <body onload="window.print();window.close()">${printContents}</body>
      </html>`
        );
        popupWin.document.close();

    }

    pay() {

        const installments = this.loanDetail.installments
            .filter(value => value.status === this.InstallmentStatus[InstallmentStatus.DUE_DATE]);
        if (installments == null || installments.length == 0) {
            this.jhiAlertService.success('niopdcgatewayApp.installment.dueDate.allIsPay');
            return;
        }


        this.installmentService.startBankTransaction(this.loan.id, this.currentAccount.person.id, this.loanDetail.loan.customerId)
            .subscribe(value => {
                this.router.navigate(['/', 'loan', this.loan.id, 'installment', 'payment', value.body]);
            });

    }

    loadAll() {
        this.installmentService.loanDetail(this.loanId).subscribe(
            (res: HttpResponse<LoanDetail>) => this.onSuccess(res.body, res.headers),
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    clear() {
        this.page = 0;
        this.currentSearch = '';

        this.router.navigate(['loan/' + this.loanId + '/installment']);
        this.loadAll();
    }

    setBreadCrumb() {
        this.breadcrumbItems = [];
        this.translateService.get('global.menu.home').subscribe(title => {
            this.breadcrumbItems.push({label: title, routerLink: ['/']});
        });
        this.translateService.get('niopdcgatewayApp.installment.home.loanTitle').subscribe(title => {
            this.breadcrumbItems.push({
                label: title + ` (${this.loan.customerName.trim()})`, routerLink: ['/loan']
            });
        });
        this.translateService.get('niopdcgatewayApp.installment.home.title').subscribe(title => {
            this.breadcrumbItems.push({label: title});
        });
    }

    async ngOnInit() {
        this.principal.identity().then(account => {
            this.currentAccount = account;
        });

        this.registerChangeInInstallments();

        this.loadAll();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: Installment) {
        return item.id;
    }

    registerChangeInInstallments() {
        this.eventSubscriber = this.eventManager.subscribe('installmentListModification', response => this.loadAll());
    }

    private onSuccess(data, headers) {
        // this.links = this.parseLinks.parse(headers.get('link'));
        this.totalItems = data.length;
        this.queryCount = this.totalItems;
        // this.page = pagingParams.page;
        this.loanDetail = data;
        this.loan = this.loanDetail.loan;
        this.setBreadCrumb();

    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }

    getInstallmentPrice() {
        const interest = this.loan.loanTypeInterest;
        if (!interest) {
            return this.loan.amount / this.loan.installmentCount;
        }
        const pow = Math.pow((1 + (interest / 1200)), this.loan.installmentCount);
        const top = this.loan.amount * (interest / 1200) * pow;
        const down = pow - 1;
        return Math.floor(top / down);
    }

}
