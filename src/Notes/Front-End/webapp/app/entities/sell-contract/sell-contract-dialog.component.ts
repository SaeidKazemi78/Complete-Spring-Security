import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {HttpErrorResponse, HttpResponse} from '@angular/common/http';

import {Observable} from 'rxjs/Observable';
import {JhiAlertService, JhiEventManager} from 'ng-jhipster';

import {ContractType, SellContract, SellContractCustomer, SellContractPerson} from './sell-contract.model';
import {SellContractService} from './sell-contract.service';
import {Customer, CustomerService} from '../customer';
import {ProductService} from '../product';
import {ConsumptionService} from '../consumption';
import {TranslateService} from '@ngx-translate/core';
import {Person, PersonService} from '../person';

@Component({
    selector: 'jhi-sell-contract-dialog',
    templateUrl: './sell-contract-dialog.component.html'
})
export class SellContractDialogComponent implements OnInit {

    customerIds;
    sellContract: SellContract = new SellContract();
    sellContractPerson: SellContractPerson = new SellContractPerson();
    sellContractCustomer: SellContractCustomer = new SellContractCustomer();
    sellContractCustomerTemp: SellContractCustomer = new SellContractCustomer();
    isSaving: boolean;
    isView: boolean;
    sellContractPeopleEdit: boolean;
    sellContractCustomerEdit: boolean;
    personExists: boolean;
    sharePercentMax: boolean;
    sharePercentMaxed: boolean;
    personCreate: boolean;
    customerExists: boolean;
    customerCreate: boolean;

    notExistMainPerson: boolean;

    customers: Customer[];
    mapSiteItems: any[];

    firstLocation: any;
    customerLevel: number;
    contractTypes: ContractType[] | null;
    ContractType = ContractType;
    customerId: number;
    personId: number;
    activeCustomer = true;
    defaultCustomer: Customer;
    defaultPerson: Person;

    constructor(private router: Router,
                private route: ActivatedRoute,
                private alertService: JhiAlertService,
                private sellContractService: SellContractService,
                private customerService: CustomerService,
                private personService: PersonService,
                private eventManager: JhiEventManager,
                private consumptionService: ConsumptionService,
                private productService: ProductService,
                private translateService: TranslateService) {
        this.customerId = route.snapshot.queryParams['customer'] ? +route.snapshot.queryParams['customer'] : null;
        this.personId = route.snapshot.queryParams['person'] ? +route.snapshot.queryParams['person'] : null;
        console.log(this.customerId);
    }

    // region Sell Contract

    ngOnInit() {
        this.isSaving = false;
        this.route.params.subscribe(params => {
            this.route.data.subscribe(data => {
                this.isView = !!data['isView'];
            });
            if (params['id']) {
                this.sellContractService.find(params['id']).subscribe(sellContract => {
                    this.sellContract = sellContract.body;
                    this.sellContract.finishDateServer = this.sellContract.finishDate;
                    this.calcSharePercent();
                    this.setBreadCrumb();
                });
            } else {
                this.sellContract = new SellContract();
                this.sellContract.sellContractPeople = [];
                this.sellContract.sellContractCustomers = [];
                this.sellContract.startDate = new Date();
                this.sellContract.finishDate = new Date();
                this.sellContract.finishDate.setFullYear(this.sellContract.finishDate.getFullYear() + 1);
                this.sellContract.exportationDate = new Date();
                if (this.customerId) {
                    this.customerService.find(this.customerId).subscribe(value => {
                        this.defaultCustomer = value.body;
                        this.sellContractCustomerTemp = new SellContractCustomer();
                        this.sellContractCustomerTemp.customerName = value.body.name;
                        this.sellContractCustomerTemp.customerId = value.body.id;
                        this.sellContractCustomerTemp.creditAccount = value.body.creditAccount;
                    });
                }
                this.setBreadCrumb();
            }
        });

        this.sellContractService.queryTypes(this.customerId)
            .subscribe((res: HttpResponse<ContractType[]>) => {
                this.contractTypes = res.body.filter(contractType => {
                    return !(this.customerId && (contractType.toString() === ContractType[ContractType.EXPORT]));
                });
            });
    }

    sellContractTypeChange() {
        if (this.customerId && this.sellContractCustomerTemp
            && this.sellContractCustomerTemp.customerId && this.sellContract.contractType !== ContractType[ContractType.EXPORT]) {
            const exist = this.sellContract.sellContractCustomers.find(c => c.customerId === this.sellContractCustomerTemp.customerId);
            if (!exist) {
                this.sellContract.sellContractCustomers.push(this.sellContractCustomerTemp);
            }
        }
    }

    setBreadCrumb() {
        this.mapSiteItems = [];
        this.translateService.get('global.menu.home').subscribe(title => {
            this.mapSiteItems.push({label: title, routerLink: ['/']});
        });
        this.translateService.get('niopdcgatewayApp.sellContract.home.title').subscribe(title => {
            this.mapSiteItems.push({
                label: title,
                routerLink: ['/sell-contract'],
                queryParams: {customer: this.customerId, person: this.personId}
            });
        });
        if (this.sellContract && this.sellContract.id) {
            this.translateService.get('niopdcgatewayApp.sellContract.home.editLabel').subscribe(title => {
                this.mapSiteItems.push({label: title});
            });
        } else {
            this.translateService.get('niopdcgatewayApp.sellContract.home.createLabel').subscribe(title => {
                this.mapSiteItems.push({label: title});
            });
        }
    }

    clear() {
        this.router.navigate(['/sell-contract'], {queryParams: {customer: this.customerId, person: this.personId}});
    }

    save() {
        this.isSaving = true;
        if (this.sellContract.id !== undefined) {
            this.subscribeToSaveResponse(
                this.sellContractService.update(this.sellContract));
        } else {
            this.subscribeToSaveResponse(
                this.sellContractService.create(this.sellContract));
        }
    }

    personSelected(event) {
        this.sellContractPerson.personFullName = event.fullName;
        this.sellContractPerson.creditAccount = event.creditAccount;
        this.sellContractPerson.costAccount = event.costAccount;
    }

    newSellContractPerson() {
        this.customerIds = [];
        this.sellContractPerson = new SellContractPerson();
        this.personCreate = true;
        if (this.sellContract.sellContractPeople.length > 0) {
            const amount = this.sellContract.sellContractPeople.map(value => Number(value.sharePercent))
                .reduce((previousValue, currentValue) => previousValue + currentValue);
            this.sellContractPerson.sharePercent = 100 - amount;
            if (this.sellContract.sellContractPeople.map(value => value.main).indexOf(true) !== -1) {
                this.sellContractPerson.disableMain = true;
            }
        } else {
            this.sellContractPerson.sharePercent = 100;
            this.sellContractPerson.main = true;
        }
        if (this.personId) {
            this.sellContractPerson.personId = this.personId;
            if (this.defaultPerson) {
                this.sellContractPerson.personFullName = this.defaultPerson.fullName;
            } else {
                this.personService.find(this.personId).subscribe(value => {
                    this.defaultPerson = value.body;
                    this.sellContractPerson.personFullName = value.body.fullName;
                });
            }
        }
        this.sellContractPeopleEdit = false;
    }

    addSellContractPerson() {
        this.personExists = false;
        this.sharePercentMax = false;
        const find = this.sellContract.sellContractPeople.find(value => value.personId === this.sellContractPerson.personId);
        if (!this.sellContractPeopleEdit && find) {
            this.personExists = true;
        } else if (this.sellContract.sellContractPeople && this.sellContract.sellContractPeople.length > 0 &&
            (+this.sellContract.sellContractPeople.map(value => value.sharePercent)
                    .reduce((sum, current) => +sum + +current) + (+this.sellContractPerson.sharePercent) +
                (this.sellContractPeopleEdit ? find.sharePercent * -1 : 0)
            ) > 100) {
            this.sharePercentMax = true;
        } else {
            if (this.sellContractPeopleEdit) {
                find.sharePercent = +this.sellContractPerson.sharePercent;
                find.main = this.sellContractPerson.main;
            } else {
                this.sellContract.sellContractPeople.push(this.sellContractPerson);
                this.calcSharePercent();
            }
            this.personCreate = false;
            this.sellContractPeopleEdit = false;
        }
        this.notExistMainPerson = this.sellContract.sellContractPeople.map(value => value.main).indexOf(true) === -1;
    }

    removePerson(personId) {
        this.sellContract.sellContractPeople.splice(this.sellContract.sellContractPeople.findIndex(value => value.personId === personId), 1);
        this.calcSharePercent();
    }

    // endregion

    // region Sell Contract Person

    calcSharePercent() {
        this.sharePercentMaxed = this.sellContract.sellContractPeople &&
            this.sellContract.sellContractPeople.length &&
            (+this.sellContract.sellContractPeople.map(value => value.sharePercent)
                .reduce((sum, current) => +sum + +current)) >= 100;
    }

    editPerson(personId) {
        this.sellContractPeopleEdit = true;
        const find = this.sellContract.sellContractPeople.find(value => value.personId === personId);
        this.sellContractPerson = new SellContractPerson();
        this.sellContractPerson.sharePercent = find.sharePercent;
        this.sellContractPerson.creditAccount = find.creditAccount;
        this.sellContractPerson.id = find.id;
        this.sellContractPerson.main = find.main;
        this.sellContractPerson.personId = find.personId;
        this.sellContractPerson.personFullName = find.personFullName;
        this.sellContractPerson.sellContractId = find.sellContractId;
    }

    cancelPerson() {
        this.personCreate = false;
        this.sellContractPeopleEdit = false;
    }

    customerSelected(event) {
        if (event != null) {
            this.sellContractCustomer.customerName = event.name;
            this.customerLevel = Math.max(event.locations.map(value => value.level));
            this.customerIds = [event.id];
            this.sellContractCustomer.creditAccount = event.creditAccount;
        } else {
            this.customerIds = [];
        }
    }

    newSellContractCustomer() {
        this.sellContractCustomer = new SellContractCustomer();
        if (this.customerId) {
            this.sellContractCustomer.customerId = this.customerId;
            if (this.defaultCustomer) {
                this.sellContractCustomer.customerName = this.defaultCustomer.name;
            } else {
                this.customerService.find(this.customerId).subscribe(value => {
                    this.defaultCustomer = value.body;
                    this.sellContractCustomer.customerName = value.body.name;
                });
            }
        }
        this.customerIds = [];
        this.customerCreate = true;
        this.sellContractCustomerEdit = false;
    }

    addSellContractCustomer() {
        this.customerExists = false;
        const find = this.sellContract.sellContractCustomers.find(value => value.customerId === this.sellContractCustomer.customerId);
        if (!this.sellContractCustomerEdit && find) {
            this.customerExists = true;
        } else {

            if (this.sellContractCustomerEdit) {
                find.locationName = this.sellContractCustomer.locationName;
                find.locationId = this.sellContractCustomer.locationId;
                find.hasTransport = this.sellContractCustomer.hasTransport;
            } else {
                this.sellContract.sellContractCustomers.push(this.sellContractCustomer);
            }
            this.customerExists = false;
            this.customerCreate = false;
            this.sellContractCustomerEdit = false;

        }
        this.sellContractTypeChange();
    }

    removeCustomer(customerId) {
        this.sellContract.sellContractCustomers.splice(this.sellContract.sellContractCustomers.findIndex(value => value.customerId === customerId), 1);
    }

    // endregion

    // region Sell Contract Person

    editCustomer(customerId) {
        this.sellContractCustomerEdit = true;
        const find = this.sellContract.sellContractCustomers.find(value => value.customerId === customerId);
        this.sellContractCustomer = new SellContractCustomer();
        this.sellContractCustomer.locationId = find.locationId;
        this.sellContractCustomer.locationName = find.locationName;
        this.sellContractCustomer.id = find.id;
        this.sellContractCustomer.customerId = find.customerId;
        this.sellContractCustomer.customerName = find.customerName;
        this.sellContractCustomer.sellContractId = find.sellContractId;
        this.sellContractCustomer.hasTransport = find.hasTransport;
    }

    onChangeCustomer(customerId) {
        const ids = [];
        ids.push(customerId);
        this.customerService.checkActiveCustomer(ids)
            .subscribe(value => {
                this.activeCustomer = value.body;
            });
    }

    cancelCustomer() {
        this.customerCreate = false;
        this.sellContractCustomerEdit = false;
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<SellContract>>) {
        result.subscribe((res: HttpResponse<SellContract>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: SellContract) {
        setTimeout(() => {
            this.isSaving = false;
            this.router.navigate(['/sell-contract'], {queryParams: {customer: this.customerId, person: this.personId}});
        }, 3000);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.alertService.error(error.message, null, null);
    }

    // endregion
}
