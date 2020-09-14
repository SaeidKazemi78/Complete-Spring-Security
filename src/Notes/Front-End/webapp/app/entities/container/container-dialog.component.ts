import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { Container } from './container.model';
import { ContainerPopupService } from './container-popup.service';
import { ContainerService } from './container.service';
import { ProductUnit, ProductUnitService } from '../product-unit';

@Component({
    selector: 'jhi-container-dialog',
    templateUrl: './container-dialog.component.html'
})
export class ContainerDialogComponent implements OnInit {

    regexCode = /^[\d]{4}$/;
    container: Container;
    isSaving: boolean;

    productunits: ProductUnit[];
    isView: boolean;

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private containerService: ContainerService,
        private productUnitService: ProductUnitService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isView = View.isView;
        this.isSaving = false;
        this.productUnitService.query()
            .subscribe((res: HttpResponse<ProductUnit[]>) => { this.productunits = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.container.id !== undefined) {
            this.subscribeToSaveResponse(
                this.containerService.update(this.container));
        } else {
            this.subscribeToSaveResponse(
                this.containerService.create(this.container));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<Container>>) {
        result.subscribe((res: HttpResponse<Container>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: Container) {
        this.eventManager.broadcast({ name: 'containerListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }

    trackProductUnitById(index: number, item: ProductUnit) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-container-popup',
    template: ''
})
export class ContainerPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private containerPopupService: ContainerPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe(params => {
            View.isView = !!params['view'];
            if ( params['id'] ) {
                this.containerPopupService
                    .open(ContainerDialogComponent as Component, params['id']);
            } else {
                this.containerPopupService
                    .open(ContainerDialogComponent as Component);
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
