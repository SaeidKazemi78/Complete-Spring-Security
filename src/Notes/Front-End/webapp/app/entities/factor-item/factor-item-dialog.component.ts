
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { FactorItem } from './factor-item.model';
import { FactorItemPopupService } from './factor-item-popup.service';
import { FactorItemService } from './factor-item.service';
            import { Factor, FactorService } from '../factor';

@Component({
    selector: 'jhi-factor-item-dialog',
    templateUrl: './factor-item-dialog.component.html'
})
export class FactorItemDialogComponent implements OnInit {

    factorItem: FactorItem;
    isSaving: boolean;
    isView: boolean;

        factors: Factor[];

    constructor(
        public activeModal: NgbActiveModal,
    private jhiAlertService: JhiAlertService,
        private factorItemService: FactorItemService,
            private factorService: FactorService,
    private eventManager: JhiEventManager
) {
    }

    ngOnInit() {
        this.isView = View.isView;
        this.isSaving = false;
        this.factorService.query()
            .subscribe((res: HttpResponse<Factor[]>) => { this.factors = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.factorItem.id !== undefined) {
            this.subscribeToSaveResponse(
                this.factorItemService.update(this.factorItem));
        } else {
            this.subscribeToSaveResponse(
                this.factorItemService.create(this.factorItem));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<FactorItem>>) {
        result.subscribe((res: HttpResponse<FactorItem>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: FactorItem) {
        this.eventManager.broadcast({ name: 'factorItemListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

private onSaveError() {
        this.isSaving = false;
    }

private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }

    trackFactorById(index: number, item: Factor) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-factor-item-popup',
    template: ''
})
export class FactorItemPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private factorItemPopupService: FactorItemPopupService
) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe(params => {
            View.isView = !!params['view'];

            if ( params['id'] ) {
                this.factorItemPopupService
                    .open(FactorItemDialogComponent as Component, params['id']);
            } else if (params['factorId'])  {
                this.factorItemPopupService
                    .open(FactorItemDialogComponent as Component, null, params['factorId']);
            } else { console.log('not be'); }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
class View {
    static isView: boolean;
}
