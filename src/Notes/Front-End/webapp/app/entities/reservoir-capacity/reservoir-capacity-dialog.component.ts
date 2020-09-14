import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { ReservoirCapacity } from './reservoir-capacity.model';
import { ReservoirCapacityPopupService } from './reservoir-capacity-popup.service';
import { ReservoirCapacityService } from './reservoir-capacity.service';
import { Product, ProductService } from '../product';
import { Person, PersonService } from '../person';

@Component({
    selector: 'jhi-reservoir-capacity-dialog',
    templateUrl: './reservoir-capacity-dialog.component.html'
})
export class ReservoirCapacityDialogComponent implements OnInit {

    reservoirCapacity: ReservoirCapacity;
    isSaving: boolean;

    products: Product[];

    people: Person[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private reservoirCapacityService: ReservoirCapacityService,
        private productService: ProductService,
        private personService: PersonService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.productService.query()
            .subscribe((res: HttpResponse<Product[]>) => { this.products = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
        this.personService.query()
            .subscribe((res: HttpResponse<Person[]>) => { this.people = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.reservoirCapacity.id !== undefined) {
            this.subscribeToSaveResponse(
                this.reservoirCapacityService.update(this.reservoirCapacity));
        } else {
            this.subscribeToSaveResponse(
                this.reservoirCapacityService.create(this.reservoirCapacity));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<ReservoirCapacity>>) {
        result.subscribe((res: HttpResponse<ReservoirCapacity>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: ReservoirCapacity) {
        this.eventManager.broadcast({ name: 'reservoirCapacityListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }

    trackProductById(index: number, item: Product) {
        return item.id;
    }

    trackPersonById(index: number, item: Person) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-reservoir-capacity-popup',
    template: ''
})
export class ReservoirCapacityPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private reservoirCapacityPopupService: ReservoirCapacityPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe(params => {
            if ( params['id'] ) {
                this.reservoirCapacityPopupService
                    .open(ReservoirCapacityDialogComponent as Component, params['id']);
            } else {
                this.reservoirCapacityPopupService
                    .open(ReservoirCapacityDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
