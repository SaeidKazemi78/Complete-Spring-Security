import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {TranslateService} from '@ngx-translate/core';
import {JhiAlertService, JhiEventManager} from 'ng-jhipster';

import {Person, Personality} from './person.model';
import {PersonService} from './person.service';
import {Region, RegionService} from '../region';
import {Country, CountryService} from '../country';
import {RemoteService} from '../../shared/remoteService';
import {CustomerService} from '../customer';
import {BankAccount} from '../bank-account';
import {Bank, BankService} from '../bank';
import {UserManagementService} from 'app/entities/user-management';
import {STRONG_PASSWORD} from 'app/shared/constants/regex.constants';

@Component({
    selector: 'jhi-person-register-dialog',
    templateUrl: './person-register-dialog.component.html',
    encapsulation: ViewEncapsulation.None
})
export class PersonRegisterDialogComponent implements OnInit {

    patternPassword = STRONG_PASSWORD;
    regexCode = /^[\d]{10}$/;
    person: Person;
    isSaving: boolean;
    isView: boolean;
    canInput = false;
    blocked = false;
    regions: Region[];
    mapSiteItems: any;
    old;

    country: Country = new Country();
    nationality: Country = new Country();
    countries: Country[];
    Personality = Personality;
    lastCode: String;
    username: '';
    password: '';
    confirmPassword: '';
    selectedSellCode = [];
    shabaNumberPattern = /^[Ii][Rr][0-9]{23}$/;
    salesCode: any;
    counter: 0;
    existUser: boolean;
    existEmail: boolean;
    existPerson: boolean;
    customers = [];
    created: boolean;
    notFind = false;

    minDateTime = new Date();
    maxDateTime = new Date();
    personFind: boolean;
    notHaveIdCode: boolean;

    editable = false;
    bankAccount: BankAccount = new BankAccount();
    bankAccounts: BankAccount[] = [];
    banks: Bank[] = [];

    constructor(
        private customerService: CustomerService,
        private jhiAlertService: JhiAlertService,
        private personService: PersonService,
        private activatedRoute: ActivatedRoute,
        private router: Router,
        private bankService: BankService,
        private translateService: TranslateService,
        private regionService: RegionService,
        private userService: UserManagementService,
        private remoteService: RemoteService,
        private countryService: CountryService,
        private eventManager: JhiEventManager) {
    }

    reRegister() {
        this.person = null;
        this.customers = [];
        this.old = false;
        this.ngOnInit();
    }

    ngOnInit() {

        this.minDateTime.setFullYear(this.minDateTime.getFullYear() - 120, 2, 22);
        this.maxDateTime.setFullYear(this.maxDateTime.getFullYear());

        this.activatedRoute.data.subscribe(value => {
            this.created = value.created;
        });

        this.isView = View.isView;
        this.isSaving = false;
        if (!this.person) {
            this.person = new Person();
        }
        this.countryService.findAll()
            .subscribe(res => {
                this.countries = res.body;
                if (!this.person.id) {
                    const find = this.countries.find(value => value.checkNationalCode);
                    if (find) {
                        this.person.nationalityId = find.id;
                        this.person.countryId = find.id;
                    }
                    this.changeNationality();
                    this.changeCountry();
                } else {
                    this.changeNationality();
                    this.changeCountry();

                }
            }, res => this.onError(res.error));

        this.setBreadCrumb();

        // this.onChangeNationalCode(!this.person.id);
    }

    setBreadCrumb() {
        this.mapSiteItems = [];
        this.translateService.get('global.menu.home').subscribe(title => {
            this.mapSiteItems.push({label: title, routerLink: ['/']});
        });
        this.translateService.get('niopdcgatewayApp.person.home.title').subscribe(title => {
            this.mapSiteItems.push({
                    label: title
                    , routerLink: ['/person']
                }
            );
        });
        if (this.person && this.person.id) {
            this.translateService.get('niopdcgatewayApp.person.home.editLabel').subscribe(title => {
                this.mapSiteItems.push({label: title});
            });
        } else {
            this.translateService.get('niopdcgatewayApp.person.home.createLabel').subscribe(title => {
                this.mapSiteItems.push({label: title});
            });

        }
    }

    save() {
        this.isSaving = true;
        this.person.salesCodes = [];

        if (this.customers) {
            this.customers.forEach(value => {
                console.log(value);
                this.person.salesCodes.push({code: value.code});
                // this.person.salesCodes.push({code: value.label})
            });
        }
        if (this.bankAccounts && this.bankAccounts.length > 0) {
            this.person.bankAccounts = this.bankAccounts;
        }

        this.personService.register(this.person).subscribe(value =>
            this.onSaveSuccess(value), error => {
            this.onError(error.error);
            this.onSaveError();
        });

    }

    trackBankById(index: number, item: Bank) {
        return item.id;
    }

    trackBirthRegionById(index: number, item: Region) {
        return item.id;
    }

    trackCountryById(index: number, item: Country) {
        return item.id;
    }

    trackNationalityById(index: number, item: Country) {
        return item.id;
    }

    onBlurPostalCode() {
        if (this.country.checkNationalCode &&
            this.regexCode.test(this.person.postalCode)) {
            this.remoteService.getAddressByPostcode(this.person.postalCode).subscribe(value => {
                this.person.address = value.body.address;
            }, error1 => {
            });
        }
    }

    changeCountry() {
        this.country = this.countries.find((value: Country) =>
            value.id === this.person.countryId
        );
        if (!this.country.checkNationalCode) {
            this.person.regionId = null;
        } else {
            this.onBlurPostalCode();
        }
    }

    changeBirthday() {
        this.notHaveIdCode = !this.person.birthday || this.person.birthday > new Date(1989, 3, 21);
        if (this.notHaveIdCode) {
            this.person.idCode = '0';
        }
        this.onChangeBaseInfo();
    }

    changeNationality() {
        this.nationality = this.countries.find((value: Country) =>
            value.id === this.person.nationalityId
        );
        if (this.nationality.checkNationalCode) {
            this.person.locations = null;
        }
        this.regionService.queryCity(this.person.nationalityId, 0).subscribe(res => {
            this.regions = res.body;
        });
    }

    onChangeNationalCode(disable: boolean) {

        if (disable) {
            return;
        }

        if (this.person.code !== this.lastCode) {
            this.blocked = true;
            this.personService.existByCode(this.person.code).subscribe(exist => {
                this.existPerson = exist.body;
                this.onChangeBaseInfo();
            });
        }
    }

    onChangeBaseInfo() {
        if (!this.existPerson && this.person.personality && this.person.code && this.nationality && this.nationality.checkNationalCode && (
            (this.person.personality === this.Personality[this.Personality.NATURAL] && this.person.birthday && this.person.idCode)
            || (this.person.personality === this.Personality[this.Personality.LEGAL] && this.person.birthday && this.person.registerNo))) {

            this.personService.findByBaseInfo(this.person).subscribe(value => {
                const person1 = value.body;
                this.editable = false;
                if (this.person.personality === this.Personality[this.Personality.NATURAL]) {
                    this.person.firstName = person1.firstName;
                    this.person.lastName = person1.lastName;
                    this.person.fatherName = person1.fatherName;
                    if (person1.fatherName || person1.fatherName === '') {
                        this.editable = false;
                    }
                } else if (this.person.personality === this.Personality[this.Personality.LEGAL]) {
                    this.person.name = person1.name;
                    this.person.postalCode = person1.postalCode;
                    this.person.address = person1.address;
                }
                this.personFind = true;
            }, error1 => {
                this.person.firstName = '';
                this.person.lastName = '';
                this.person.fatherName = '';
                this.person.name = '';
                this.person.postalCode = '';
                this.person.address = '';
                this.onError(error1.error);
                this.personFind = false;
            });
        }
    }

    clear() {
        this.router.navigate(['/']);
    }

    searchSalesCode() {
        this.notFind = false;
        this.customerService.findOldCustomer(this.salesCode, this.person.code)
            .subscribe(value => {
                if (value.body && value.body.code) {
                    if (!this.customers.find(c => c.code === value.body.code)) {
                        this.customers.push({
                            code: value.body.code,
                            name: value.body.customerName
                        });
                        this.salesCode = null;
                    }
                } else {
                    this.notFind = true;
                }
            });
    }

    removeSalesCode(data) {
        const index = this.customers.indexOf(data);
        if (index !== -1) {
            this.customers.splice(index, 1);
        }
    }

    checkUserExistByLogin(invalid) {
        if (this.person.username && !invalid) {
            this.userService.existUserByLogin(this.person.username)
                .subscribe(value => {
                    this.existUser = value.body;
                });
        }
    }

    checkUserExistByEmail() {
        if (this.person.email) {
            this.userService.existUserByEmail(this.person.email, null)
                .subscribe(value => {
                    this.existEmail = value.body;
                });
        }
    }

    private onSaveSuccess(result: any) {
        this.isSaving = true;
        this.created = true;
        // setTimeout(() => {
        // this.router.navigate(['/person/register/created']);
        // }, 3000);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        console.log('error', error);
        if (error && error.message) {
            this.jhiAlertService.error(error.message, null, null);
        }
    }
}

class View {
    static isView: boolean;
}
