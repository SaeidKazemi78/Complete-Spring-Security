import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { Manufacture } from './manufacture.model';
import { ManufacturePopupService } from './manufacture-popup.service';
import { ManufactureService } from './manufacture.service';

@Component({
    selector: 'jhi-manufacture-dialog',
    templateUrl: './manufacture-dialog.component.html'
})
export class ManufactureDialogComponent implements OnInit {

    manufacture: Manufacture;
    isSaving: boolean;
    isView: boolean;

    constructor(
        public activeModal: NgbActiveModal,
        private manufactureService: ManufactureService,
    private eventManager: JhiEventManager
) {
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
        if (this.manufacture.id !== undefined) {
            this.subscribeToSaveResponse(
                this.manufactureService.update(this.manufacture));
        } else {
            this.subscribeToSaveResponse(
                this.manufactureService.create(this.manufacture));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<Manufacture>>) {
        result.subscribe((res: HttpResponse<Manufacture>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: Manufacture) {
        this.eventManager.broadcast({ name: 'manufactureListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }
}

@Component({
    selector: 'jhi-manufacture-popup',
    template: ''
})
export class ManufacturePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private manufacturePopupService: ManufacturePopupService
) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe(params => {
            View.isView = !!params['view'];

            if ( params['id'] ) {
                this.manufacturePopupService
                    .open(ManufactureDialogComponent as Component, params['id']);
            } else {
                this.manufacturePopupService
                    .open(ManufactureDialogComponent as Component);
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
