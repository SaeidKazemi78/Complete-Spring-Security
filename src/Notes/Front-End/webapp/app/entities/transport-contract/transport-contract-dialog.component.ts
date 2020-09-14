import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';

import {Observable} from 'rxjs/Observable';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {JhiAlertService, JhiEventManager} from 'ng-jhipster';

import {TransportContract} from './transport-contract.model';
import {TransportContractPopupService} from './transport-contract-popup.service';
import {TransportContractService} from './transport-contract.service';
import {Customer, CustomerService} from '../customer';
import {Person, PersonGroup, PersonService} from '../person';
import {HttpErrorResponse, HttpResponse} from '@angular/common/http';
import {CustomerGroup} from '../customer-type';

@Component({
    selector: 'jhi-transport-contract-dialog',
    templateUrl: './transport-contract-dialog.component.html'
})
export class TransportContractDialogComponent implements OnInit {

    transportContract: TransportContract;
    isSaving: boolean;
    isView: boolean;
    mode: string;
    PersonGroup = PersonGroup;
    customer: Customer | null;
    CustomerGroup = CustomerGroup;

    constructor(public activeModal: NgbActiveModal,
                private jhiAlertService: JhiAlertService,
                private transportContractService: TransportContractService,
                private customerService: CustomerService,
                private personService: PersonService,
                private activatedRoute: ActivatedRoute,
                private eventManager: JhiEventManager) {
    }

    ngOnInit() {
        this.mode = View.mode;
        this.isView = View.isView;
        this.isSaving = false;
        this.customerService.find(this.transportContract.customerId)
            .subscribe(value => {
                this.customer = value.body;
            });
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.transportContract.id !== undefined) {
            this.subscribeToSaveResponse(
                this.transportContractService.update(this.transportContract));
        } else {
            this.subscribeToSaveResponse(
                this.transportContractService.create(this.transportContract));
        }
    }

    trackCustomerById(index: number, item: Customer) {
        return item.id;
    }

    trackPersonById(index: number, item: Person) {
        return item.id;
    }

    personSelected(event) {
        this.transportContract.personName = event.fullName;
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<TransportContract>>) {
        result.subscribe((res: HttpResponse<TransportContract>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: TransportContract) {
        this.eventManager.broadcast({name: 'transportContractListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }
}

@Component({
    selector: 'jhi-transport-contract-popup',
    template: ''
})
export class TransportContractPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(private route: ActivatedRoute,
                private transportContractPopupService: TransportContractPopupService) {
    }

    ngOnInit() {
        this.routeSub = this.route.params.subscribe(params => {
            View.isView = !!params['view'];

            if (params['id'] && !params['mode']) {
                this.transportContractPopupService
                    .open(TransportContractDialogComponent as Component, params['id']);
            } else if (params['id'] && params['mode'] && params['mode'] === 'customer') {
                View.mode = 'customer';
                this.transportContractPopupService
                    .open(TransportContractDialogComponent as Component, null, params['id']);
            } else {
                this.transportContractPopupService
                    .open(TransportContractDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}

class View {
    static isView: boolean;
    static mode: string;
}
