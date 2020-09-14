import {Component, OnInit, OnDestroy} from '@angular/core';
import {ActivatedRoute} from '@angular/router';

import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {JhiAlertService, JhiEventManager} from 'ng-jhipster';

import {DepositIdentifier} from './deposit-identifier.model';
import {DepositIdentifierPopupService} from './deposit-identifier-popup.service';
import {DepositIdentifierService} from './deposit-identifier.service';
import {Observable} from 'rxjs';
import {HttpErrorResponse, HttpResponse} from '@angular/common/http';
import {CustomerType} from '../customer-type';

@Component({
    selector: 'jhi-deposit-identifier-dialog',
    templateUrl: './deposit-identifier-dialog.component.html'
})
export class DepositIdentifierDialogComponent implements OnInit {

    depositIdentifiers: DepositIdentifier[];
    depositIdentifier: DepositIdentifier;
    isSaving;
    type = '';
    constructor(
        private jhiAlertService: JhiAlertService,
        private depositIdentifierService: DepositIdentifierService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    create() {
        const locationId = this.depositIdentifier.locationId;
        const personId = this.depositIdentifier.personId;
        const customerId = this.depositIdentifier.customerId;
        this.depositIdentifier = new DepositIdentifier();
        this.depositIdentifier.locationId = locationId;
        this.depositIdentifier.personId = personId;
        this.depositIdentifier.customerId = customerId;
        this.depositIdentifier.priority = (this.depositIdentifiers ? this.depositIdentifiers.length : 0) + 1;
    }

    edit(item) {

        this.depositIdentifier.locationId = item.locationId;
        this.depositIdentifier.personId = item.personId;
        this.depositIdentifier.customerId = item.customerId;
        this.depositIdentifier.id = item.id;
        this.depositIdentifier.code = item.code;
        this.depositIdentifier.bank = item.bank;
        this.depositIdentifier.priority = item.priority;

    }

    save() {
        this.subscribeToSaveResponse(
            this.depositIdentifierService.create(this.depositIdentifier));
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<DepositIdentifier>>) {
        result.subscribe((res: HttpResponse<DepositIdentifier>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: DepositIdentifier) {
        this.ngOnInit();
        this.isSaving = false;
        this.create();
    }

    private onSaveError() {
        this.isSaving = false;
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.isSaving = true;

        this.depositIdentifierService.delete(id).subscribe(response => {
            this.ngOnInit();
            this.isSaving = false;
            this.depositIdentifier.id = undefined;
        }, error1 => this.isSaving = false)
        ;
    }

    ngOnInit(): void {
        this.depositIdentifierService.query(this.depositIdentifier).subscribe(value => {
            this.depositIdentifiers = value.body;
        });

        if (this.depositIdentifier.locationId) {
            this.type = 'LOCATION';
        }
        if (this.depositIdentifier.customerId) {
            this.type = 'CUSTOMER';
        }
        if (this.depositIdentifier.personId) {
            this.type = 'PERSON';
        }

        this.create();
    }
}

@Component({
    selector: 'jhi-deposit-identifier-popup',
    template: ''
})
export class DepositIdentifierPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private depositIdentifierPopupService: DepositIdentifierPopupService
    ) {
    }

    ngOnInit() {
        this.routeSub = this.route.queryParams.subscribe(params => {
            this.depositIdentifierPopupService
                .open(DepositIdentifierDialogComponent as Component, params['locationId'], params['personId'], params['customerId']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
