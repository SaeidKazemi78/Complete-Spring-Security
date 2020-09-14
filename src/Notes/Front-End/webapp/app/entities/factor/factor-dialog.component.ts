import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {HttpErrorResponse, HttpResponse} from '@angular/common/http';

import {Observable} from 'rxjs/Observable';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {JhiAlertService, JhiEventManager} from 'ng-jhipster';

import {Factor, FactorType} from './factor.model';
import {FactorPopupService} from './factor-popup.service';
import {FactorService} from './factor.service';
import {SellContractPerson} from '../sell-contract';
import {PersonService} from '../person';
import {SellContractPersonService} from '../sell-contract/sell-contract-person.service';

@Component({
    selector: 'jhi-factor-dialog',
    templateUrl: './factor-dialog.component.html'
})
export class FactorDialogComponent implements OnInit {

    factor: Factor;
    factors: Factor[];
    isSaving: boolean;
    isView: boolean;
    sellContractPersons: SellContractPerson[];
    personName: string;

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private factorService: FactorService,
        private personService: PersonService,
        private sellContractPersonService: SellContractPersonService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        if (!this.factor.id) {
            this.factor.factorType = FactorType[FactorType.PRICE];
        }
        this.isView = View.isView;
        this.isSaving = false;
        if (this.factor.id) {
            this.personService.find(this.factor.personId)
                .subscribe(value => {
                    this.personName = value.body.name ? value.body.name : value.body.firstName + ' ' + value.body.lastName;
                });
        }
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.factor.id !== undefined) {
            this.subscribeToSaveResponse(
                this.factorService.update(this.factor));
        } else {
            this.subscribeToSaveResponse(
                this.factorService.create(this.factor));
        }
    }

    onChangeStartDate(data) {
        if (data) {
            this.factor.startDate = data;
            if (this.factor.finishDate) {
                this.sellContractPersonService.queryByTime(this.factor.startDate, this.factor.finishDate)
                    .subscribe(value => {
                        this.sellContractPersons = value.body;
                    });
            }
        }
        this.loadFactors();
    }

    onChangeFinishDate(data) {
        if (data) {
            this.factor.finishDate = data;
            if (this.factor.startDate) {

                this.sellContractPersonService.queryByTime(this.factor.startDate, this.factor.finishDate)
                    .subscribe(value => this.sellContractPersons = value.body);
            }
        }
        this.loadFactors();
    }

    changePerson(data) {
        this.factor.sellContractPersonId = data;
        this.factor.personId = this.sellContractPersons.find(value => {
            return value.id === data;
        }).personId;
        this.loadFactors();
    }

    loadFactors() {
        this.factors = [];
        if (this.factor.personId && this.factor.startDate && this.factor.finishDate && !this.factor.id) {
            this.factorService.queryByPerson(this.factor.personId, this.factor.startDate, this.factor.finishDate, this.factor.factorType)
                .subscribe(value => {
                    this.factors = value.body;
                });
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<Factor>>) {
        result.subscribe((res: HttpResponse<Factor>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: Factor) {
        this.eventManager.broadcast({name: 'factorListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }
}

@Component({
    selector: 'jhi-factor-popup',
    template: ''
})
export class FactorPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private factorPopupService: FactorPopupService
    ) {
    }

    ngOnInit() {
        this.routeSub = this.route.params.subscribe(params => {
            View.isView = !!params['view'];

            if (params['id']) {
                this.factorPopupService
                    .open(FactorDialogComponent as Component, params['id']);
            } else {
                this.factorPopupService
                    .open(FactorDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}

class View {
    static isView: boolean;
}
