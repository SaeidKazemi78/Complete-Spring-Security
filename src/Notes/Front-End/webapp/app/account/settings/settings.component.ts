import {Component, OnInit} from '@angular/core';
import {JhiLanguageService} from 'ng-jhipster';

import {AccountService, LoginService, Principal} from '../../shared';
import {MelliPosService} from '../../shared/e-payment/melli-pos.service';
import {CookieService} from 'ngx-cookie';
import {Person, Personality, PersonService} from '../../entities/person';
import {Country, CountryService} from '../../entities/country';
import {Region, RegionService} from '../../entities/region';
import {RemoteService} from '../../shared/remoteService';
import {ActivatedRoute, Router} from '@angular/router';
import {BankAccount, BankAccountService} from '../../entities/bank-account';
import {Bank, BankService} from '../../entities/bank';
import {CarTank} from '../../entities/car-tank';
import {StateStorageService} from '../../shared/auth/state-storage.service';
import {JhiLanguageHelper} from 'app/core/language.helper';
import {DateJalaliPipe} from 'app/shared/ng2-datetimepicker-jalali/date-jalali.pipe';

@Component({
    selector: 'jhi-settings',
    templateUrl: './settings.component.html'
})
export class SettingsComponent implements OnInit {
    error: string;
    success: string;
    regexCode = /^[\d]{10}$/;
    settingsAccount: any;
    languages: any[];
    addresses = 'localhost:8050';
    addressInvalid = false;
    portInvalid = false;
    person: Person;
    Personality = Personality;
    countries: Country[];
    country: Country = new Country();
    nationality: Country = new Country();
    regions: Region[];
    blocked = false;

    old;

    lastCode: String;
    username: '';
    password: '';
    confirmPassword: '';
    selectedSellCode = [];
    salesCode: any;
    counter: 0;
    existUser: boolean;
    existEmail: boolean;
    existPerson: boolean;
    customers = [];
    banks: Bank[];
    created: boolean;
    notFind = false;

    minDateTime = new Date();
    maxDateTime = new Date();

    minDateTimeAccount = new Date();
    maxDateTimeAccount = new Date();
    personFind: boolean;
    notHaveIdCode: boolean;

    bankAccountCreate: boolean;
    bankAccountEdit: boolean;

    bankAccount: BankAccount = new BankAccount();
    tempEditBankAccount: BankAccount = new BankAccount();
    bankAccounts: BankAccount[] = [];
    canEditFatherName = false;
    canEditIdCode = false;
    canEditFirstName = false;
    canEditLastName = false;
    force = false;
    isInquiryValid = false;
    isAccountValid = false;
    isInquiry = false;
    validCellPhone = true;

    constructor(
        private account: AccountService,
        private principal: Principal,
        private languageService: JhiLanguageService,
        private personService: PersonService,
        private posService: MelliPosService,
        private router: Router,
        private bankAccountService: BankAccountService,
        private bankService: BankService,
        private remoteService: RemoteService,
        private regionService: RegionService,
        private countryService: CountryService,
        private cookieService: CookieService,
        private languageHelper: JhiLanguageHelper,
        private loginService: LoginService,
        private stateStorageService: StateStorageService,
        private activatedRoute: ActivatedRoute,
    ) {
        this.principal.identity(true).then(account => {
            this.isAccountValid = account.valid;
            if (!account.valid) {
                this.force = true;
            }
            this.validCellPhone = account.validCellPhone ;
        });
    }

    ngOnInit() {


        this.principal.identity().then(account => {
            this.settingsAccount = this.copyAccount(account);
            this.minDateTimeAccount.setFullYear(this.minDateTime.getFullYear() - 120, 2, 22);
            this.maxDateTimeAccount.setFullYear(this.maxDateTime.getFullYear() - 18);

            if (account.person) {
                this.personService.find(account.person.id).subscribe(personRes => {
                    this.person = personRes.body;
                 // todo enable later
                  /*  this.bankAccountService.query(this.person.id)
                        .subscribe((value) => {
                            this.bankAccounts = value.body;
                        });
                    this.bankService.query()
                        .subscribe((value) => {
                            this.banks = value.body;
                        });*/
                    this.loadCountries();
                });
            }
        });
        this.languageHelper.getAll().then(languages => {
            this.languages = languages;
        });
        this.addresses = this.cookieService.get('posIp');
        this.checkAddress();
    }

    loadCountries() {
        this.countryService.findAll()
            .subscribe(res => {
                this.countries = res.body;
                this.changeNationality();
                this.changeCountry();
            });
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

    changeNationality() {
        this.nationality = this.countries.find((value: Country) =>
            value.id === this.person.nationalityId
        );
        this.regionService.queryCity(this.person.nationalityId, 0).subscribe(res => {
            this.regions = res.body;
        });
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

    save() {
        if (!this.addressInvalid) {
            this.cookieService.put('posIp', this.addresses);
        }
        if (this.person) {
            if (this.bankAccounts && this.bankAccounts.length > 0) {
                this.person.bankAccounts = this.bankAccounts;
            }
            this.personService.updateUserPerson(this.person)
                .subscribe(value => {
                    this.router.navigate(['/']);
                });
        } else {
            this.account.save(this.settingsAccount).subscribe(() => {
                this.error = null;
                this.success = 'OK';
                this.principal.identity(true).then(account => {
                    if (!account.valid) {
                        this.logout();
                    }
                    this.settingsAccount = this.copyAccount(account);
                });
                this.languageService.getCurrent().then(current => {
                    if (this.settingsAccount.langKey !== current) {
                        this.languageService.changeLanguage(this.settingsAccount.langKey);
                    }
                });
                this.router.navigate(['/']);
            }, () => {
                this.success = null;
                this.error = 'ERROR';
            });
        }
    }

    copyAccount(account) {
        return {
            id: account.id,
            activated: account.activated,
            email: account.email,
            firstName: account.firstName,
            personnelCode: account.personnelCode,
            nationalCode: account.nationalCode,
            cellPhone: account.cellPhone,
            langKey: account.langKey,
            lastName: account.lastName,
            login: account.login,
            imageUrl: account.imageUrl,
            birthday: account.birthday,
            fatherName: account.fatherName,
            idCode: account.idCode,
        };
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

    changeBirthday() {
        this.notHaveIdCode = !this.person.birthday || this.person.birthday > new Date(1989, 3, 21);
        if (this.notHaveIdCode) {
            this.person.idCode = '0';
        }
        this.onChangeBaseInfo();
    }

    onChangeBaseInfo() {
        if (!this.existPerson && this.person.personality && this.person.code && this.nationality && this.nationality.checkNationalCode && (
            (this.person.personality === this.Personality[this.Personality.NATURAL] && this.person.birthday && this.person.idCode)
            || (this.person.personality === this.Personality[this.Personality.LEGAL] && this.person.birthday && this.person.registerNo))) {

            this.personService.findByBaseInfo(this.person).subscribe(value => {
                const person1 = value.body;
                if (this.person.personality === this.Personality[this.Personality.NATURAL]) {
                    this.person.firstName = person1.firstName;
                    this.person.lastName = person1.lastName;
                    this.person.fatherName = person1.fatherName;
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
                this.personFind = false;
            });
        }
    }

    trackBankById(index: number, item: Bank) {
        return item.id;
    }

    newBankAccount() {
        if (!this.banks || this.banks.length < 1) {
            this.bankService.query()
                .subscribe(value => {
                    this.banks = value.body;
                });
        }
        this.bankAccountCreate = true;
        this.bankAccount = new BankAccount();
    }

    editBankAccount(item) {
        this.bankAccountEdit = true;
        this.tempEditBankAccount = this.bankAccounts[this.bankAccounts.indexOf(item)];
        this.bankAccount = this.bankAccounts[this.bankAccounts.indexOf(item)];
    }

    deleteBankAccount(item) {
        this.bankAccounts.remove(item);
    }

    cancelBankAccount() {
        if (this.bankAccountCreate) {
            this.bankAccount = new BankAccount();
            this.bankAccountCreate = false;
        } else {
            this.bankAccount = this.bankAccount[0];
            this.bankAccountEdit = false;
        }
    }

    saveBankAccount() {
        const bank = this.banks.find(value => value.id === this.bankAccount.bankId);
        this.bankAccount.bankName = bank.name;
        if (this.bankAccountCreate) {
            this.bankAccounts.push(this.bankAccount);
            this.bankAccountCreate = false;
        } else {
            this.bankAccounts[this.bankAccounts.indexOf(this.tempEditBankAccount)] = this.bankAccount;
            this.bankAccountEdit = false;
        }
        this.bankAccount = new CarTank();
    }

    private checkAddress() {
        if (this.addresses) {
            if (this.addresses !== 'localhost' &&
                !this.addresses.startsWith('http://') &&
                !this.addresses.startsWith('https://')) {
                this.addresses = 'http://' + this.addresses;
            }
            this.posService.getInfo(this.addresses).subscribe(value => {
                this.addressInvalid = false;
            }, error1 => {
                this.addressInvalid = true;
            });
        }
    }

    changeBirthdayAccount() {
        this.notHaveIdCode = !this.settingsAccount.birthday || this.settingsAccount.birthday > new Date(1989, 3, 21);
        if (this.notHaveIdCode) {
            this.settingsAccount.idCode = '0';
        } else if (this.settingsAccount.idCode === '0') {
            this.settingsAccount.idCode = '';
        }
        //  this.onChangeBaseInfo();
    }

    inquiry() {

        if (this.settingsAccount.nationalCode && this.settingsAccount.birthday) {
            this.personService.findByBaseInfo({
                code: this.settingsAccount.nationalCode,
                idCode: this.settingsAccount.idCode,
                birthday: this.settingsAccount.birthday,
                personality: 'NATURAL'
            }).subscribe(value => {
                const person = value.body;
                this.settingsAccount.firstName = person.firstName;
                this.settingsAccount.lastName = person.lastName;
                this.settingsAccount.fatherName = person.fatherName;
                this.settingsAccount.idCode = person.idCode;

                if (!person.fatherName) {
                    this.canEditFatherName = true;
                }
                if (!person.firstName) {
                    this.canEditFirstName = true;
                }
                if (!person.idCode) {
                    this.canEditIdCode = true;
                }
                if (!person.lastName) {
                    this.canEditLastName = true;
                }

                this.isInquiryValid = true;
                this.isInquiry = true;

            }, error => {
                this.isInquiryValid = false;
                this.isInquiry = true;

                    this.canEditFatherName = true;

                    this.canEditFirstName = true;

                    this.canEditIdCode = true;

                    this.canEditLastName = true;

            });
        }
    }

    logout() {
        this.loginService.logout();
        this.router.navigate(['']);
    }
}
