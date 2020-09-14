import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import {JhiAlertService, JhiEventManager} from 'ng-jhipster';

import { ProductGroup } from './product-group.model';
import { ProductGroupPopupService } from './product-group-popup.service';
import { ProductGroupService } from './product-group.service';

@Component({
    selector: 'jhi-product-group-dialog',
    templateUrl: './product-group-dialog.component.html'
})
export class ProductGroupDialogComponent implements OnInit {

    regexCode = /\d*/;
    productGroup: ProductGroup;
    isSaving: boolean;
    isView: boolean;

    constructor(public activeModal: NgbActiveModal,
                private jhiAlertService: JhiAlertService,
                private productGroupService: ProductGroupService,
                private eventManager: JhiEventManager) {
    }

    ngOnInit() {
        this.isView = View.isView;
        this.isSaving = false;
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.productGroup.id !== undefined) {
            this.subscribeToSaveResponse(
                this.productGroupService.update(this.productGroup));
        } else {
            this.subscribeToSaveResponse(
                this.productGroupService.create(this.productGroup));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<ProductGroup>>) {
        result.subscribe((res: HttpResponse<ProductGroup>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: ProductGroup) {
        this.eventManager.broadcast({ name: 'productGroupListModification', content: 'OK'});
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
    selector: 'jhi-product-group-popup',
    template: ''
})
export class ProductGroupPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(private route: ActivatedRoute,
                private productGroupPopupService: ProductGroupPopupService) {
    }

    ngOnInit() {
        this.routeSub = this.route.params.subscribe(params => {
            View.isView = !!params['view'];

            if (params['id']) {
                this.productGroupPopupService
                    .open(ProductGroupDialogComponent as Component, params['id']);
            } else {
                this.productGroupPopupService
                    .open(ProductGroupDialogComponent as Component);
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
