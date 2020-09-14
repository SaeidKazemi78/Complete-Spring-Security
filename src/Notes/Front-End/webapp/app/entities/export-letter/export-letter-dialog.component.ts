import {Component, OnInit, OnDestroy} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {HttpResponse, HttpErrorResponse} from '@angular/common/http';

import {Observable} from 'rxjs/Observable';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {JhiEventManager, JhiAlertService} from 'ng-jhipster';

import {ExportLetter, ExportLetterType} from './export-letter.model';
import {ExportLetterPopupService} from './export-letter-popup.service';
import {ExportLetterService} from './export-letter.service';
import {Person, PersonService} from '../person';
import {Country, CountryService} from '../country';
import {Product, ProductService} from '../product';
import {CustomerGroup} from '../customer-type';
import {CurrencyService, Currency} from 'app/entities/currency';
import {SellContract, SellContractService} from 'app/entities/sell-contract';

@Component({
    selector: 'jhi-export-letter-dialog',
    templateUrl: './export-letter-dialog.component.html'
})
export class ExportLetterDialogComponent implements OnInit {
    CustomerGroup = CustomerGroup;
    ExportLetterType = ExportLetterType;
    exportLetter: ExportLetter;
    isSaving: boolean;
    isView: boolean;

    countries: Country[];

    currencies: Currency[];
    rialPrice = 0;
    agentBrokerWage = 0;
    exchangeWage = 0;
    exchangeRelevantWage = 0;
    rayanCenterWage = 0;
    itWage = 0;
    sumWage = 0;
    settlementPrice = 0;
    sellContract: SellContract;
    people: { label: string; value: number }[] = [];
    currency: Currency;
    buyerCEO: any;
    buyerAgent: any;

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private exportLetterService: ExportLetterService,
        private personService: PersonService,
        private countryService: CountryService,
        private productService: ProductService,
        private currencyService: CurrencyService,
        private sellContractService: SellContractService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isView = View.isView;
        this.isSaving = false;
        this.currencyService.query().subscribe(res => {
                this.currencies = res.body;
            }
        );
        this.countryService.query()
            .subscribe((res: HttpResponse<Country[]>) => {
                this.countries = res.body;
            });
        if (this.exportLetter.id) {
            this.calcPrice();
        }

        if (this.exportLetter.sellContractId) {
            this.sellContractService.find(this.exportLetter.sellContractId).subscribe(sellContract => {
                this.sellContract = sellContract.body;
                this.people = this.sellContract.sellContractPeople.map(sellContractPeople => {
                    return {
                        value: sellContractPeople.personId,
                        label: sellContractPeople.personFullName,
                    };
                });
                if (this.people && this.people.length && this.people.length === 1) {
                    this.exportLetter.buyerId = this.people[0].value;
                    this.changeBuyer();
                }
            });
        }

    }

    changeCurrency(id) {
        this.currency = this.currencies.find(value => value.id === id);
        console.log(this.currency);
        if (this.currency.isNationalCurrency) {
            this.exportLetter.sanaRate = 1;
        } else {
            if (this.exportLetter.type === ExportLetterType[ExportLetterType.NORMAL]) {
                this.exportLetter.sanaRate = 1;
            } else {
                this.exportLetter.sanaRate = undefined;
            }
        }
    }

    calcPrice() {
        if (this.exportLetter.baseRate && this.exportLetter.amount) {
            this.exportLetter.price = this.exportLetter.amount * this.exportLetter.baseRate;
            if (this.exportLetter.sanaRate) {
                this.rialPrice = this.exportLetter.baseRate * this.exportLetter.amount * this.exportLetter.sanaRate;
                this.agentBrokerWage = Math.round(this.rialPrice * 0.0015) > 300000000 ? 300000000 : Math.round(this.rialPrice * 0.0015);
                this.exchangeWage = Math.round(this.rialPrice * 0.00048) > 120000000 ? 120000000 : Math.round(this.rialPrice * 0.00048);
                this.exchangeRelevantWage = Math.round(this.rialPrice * 0.0004) > 200000000 ? 200000000 : Math.round(this.rialPrice * 0.0004);
                this.itWage = Math.round(this.rialPrice * 0.00015) > 100000000 ? 100000000 : Math.round(this.rialPrice * 0.00015);
                this.rayanCenterWage = Math.round(this.rialPrice * 0.00025) > 100000000 ? 100000000 : Math.round(this.rialPrice * 0.00025);
                this.sumWage = this.agentBrokerWage + this.exchangeWage + this.exchangeRelevantWage + this.itWage + this.rayanCenterWage;
                this.settlementPrice = this.rialPrice - this.sumWage;
            }
        }

    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.exportLetter.id !== undefined) {
            this.subscribeToSaveResponse(
                this.exportLetterService.update(this.exportLetter));
        } else {
            this.subscribeToSaveResponse(
                this.exportLetterService.create(this.exportLetter));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<ExportLetter>>) {
        result.subscribe((res: HttpResponse<ExportLetter>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: ExportLetter) {
        this.eventManager.broadcast({name: 'exportLetterListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }

    trackPersonById(index: number, item: Person) {
        return item.id;
    }

    trackCountryById(index: number, item: Country) {
        return item.id;
    }

    trackProductById(index: number, item: Product) {
        return item.id;
    }

    changeBuyer() {
        if (this.exportLetter && this.exportLetter.buyerId) {
            this.personService.findAgentByPersonId(this.exportLetter.buyerId).subscribe(value => {
                this.buyerAgent = value.body.fullName;
            });
            this.personService.findCeoByPersonId(this.exportLetter.buyerId).subscribe(value => {
                this.buyerCEO = value.body.fullName;
            });
        }
    }
}

@Component({
    selector: 'jhi-export-letter-popup',
    template: ''
})
export class ExportLetterPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private exportLetterPopupService: ExportLetterPopupService
    ) {
    }

    ngOnInit() {
        this.routeSub = this.route.params.subscribe(params => {
            View.isView = !!params['view'];
            View.isAdjustment = params['view'] === 'adjustment';

            if (params['id']) {
                this.exportLetterPopupService
                    .open(ExportLetterDialogComponent as Component, params['id']);
            } else if (params['sellContractId']) {
                this.exportLetterPopupService
                    .open(ExportLetterDialogComponent as Component, null, params['sellContractId']);
            } else {
                console.log('not be');
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}

class View {
    static isView: boolean;
    static isAdjustment: boolean;
}
