import {Component, OnInit} from '@angular/core';

import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {JhiEventManager} from 'ng-jhipster';
import {Person} from '../person';
import {CustomerAccounting} from './customer-accounting.model';
import {CustomerAccountingService} from './customer-accounting.service';
import {TranslateService} from '@ngx-translate/core';
import {Customer, CustomerService} from '../customer';
import {BankAccount} from '../bank-account/bank-account.model';
import {ContractType} from '../sell-contract';
import {BankAccountService} from '../bank-account';
import {Subscription} from 'rxjs/Subscription';

@Component({
    selector: 'jhi-sell-contract-account',
    templateUrl: './customer-accounting.component.html'
})
export class CustomerAccountingComponent implements OnInit {
    breadcrumbItems: any[];
    eventSubscriber: Subscription;

    person: Person;
    customerAccounting: CustomerAccounting = {};
    customers: Customer[];
    bankAccounts: BankAccount[];
    ContractType = ContractType;

    constructor(
        private customerAccountingService: CustomerAccountingService,
        private customerService: CustomerService,
        private bankAccountService: BankAccountService,
        private eventManager: JhiEventManager,
        private translateService: TranslateService
    ) {
    }

    personChange(person) {
        console.log(person);
        this.customerService.queryByPerson(this.customerAccounting.personId).subscribe(value => {
            this.customerAccounting.customerId = null;
            this.customerAccounting.contractType = null;
            this.customerAccounting.creditAccountCustomer = null;
            this.customerAccounting.creditAccountPerson = null;
            this.customerAccounting.bankAccountId = null;
            this.customers = value.body;
        });
    }

    changeCustomer() {
        this.customerAccountingService.find(this.customerAccounting.personId, this.customerAccounting.customerId).subscribe(value => {
            this.customerAccounting = value.body;
            if (this.customerAccounting.contractType === this.ContractType[ContractType.BRAND]) {
                this.loadBankAccount();
            }
        });
    }

    loadBankAccount() {
        this.bankAccountService.query(this.customerAccounting.personId).subscribe(value1 => {
            this.bankAccounts = value1.body;
        });
    }

    clear() {
    }

    confirm() {
        this.customerAccountingService.update(this.customerAccounting).subscribe(response => {
            this.customerAccounting = {};
        });
    }

    ngOnInit(): void {
        this.setBreadCrumb();
        this.eventSubscriber = this.eventManager.subscribe('bankAccountListModification',response => this.loadBankAccount());

    }

    setBreadCrumb() {
        this.breadcrumbItems = [
            {
                label: this.translateService.instant('global.menu.home'),
                routerLink: ['/']
            },
            {
                label: this.translateService.instant('niopdcgatewayApp.customerAccounting.home.title')
            }
        ];

    }
}
