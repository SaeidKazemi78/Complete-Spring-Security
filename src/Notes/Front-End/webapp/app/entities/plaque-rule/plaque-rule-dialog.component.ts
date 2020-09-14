import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { PlaqueRule } from './plaque-rule.model';
import { PlaqueRulePopupService } from './plaque-rule-popup.service';
import { PlaqueRuleService } from './plaque-rule.service';
import { Plaque, PlaqueService } from '../plaque';

@Component({
    selector: 'jhi-plaque-rule-dialog',
    templateUrl: './plaque-rule-dialog.component.html'
})
export class PlaqueRuleDialogComponent implements OnInit {

    plaqueRule: PlaqueRule;
    isSaving: boolean;
    isView: boolean;

    plaques: Plaque[];

    constructor(
        public activeModal: NgbActiveModal,
    private jhiAlertService: JhiAlertService,
        private plaqueRuleService: PlaqueRuleService,
            private plaqueService: PlaqueService,
    private eventManager: JhiEventManager
) {
    }

    ngOnInit() {
        this.isView = View.isView;
        this.isSaving = false;
        this.plaqueService.query()
            .subscribe((res: HttpResponse<Plaque[]>) => { this.plaques = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.plaqueRule.id !== undefined) {
            this.subscribeToSaveResponse(
                this.plaqueRuleService.update(this.plaqueRule));
        } else {
            this.subscribeToSaveResponse(
                this.plaqueRuleService.create(this.plaqueRule));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<PlaqueRule>>) {
        result.subscribe((res: HttpResponse<PlaqueRule>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: PlaqueRule) {
        this.eventManager.broadcast({ name: 'plaqueRuleListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

private onSaveError() {
        this.isSaving = false;
    }

private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }

            trackPlaqueById(index: number, item: Plaque) {
                return item.id;
            }
}

@Component({
    selector: 'jhi-plaque-rule-popup',
    template: ''
})
export class PlaqueRulePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private plaqueRulePopupService: PlaqueRulePopupService
) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe(params => {
            View.isView = !!params['view'];

            if ( params['id'] ) {
                this.plaqueRulePopupService
                    .open(PlaqueRuleDialogComponent as Component, params['id']);
            } else if (params['plaqueId'])  {
                this.plaqueRulePopupService
                    .open(PlaqueRuleDialogComponent as Component, null, params['plaqueId']);
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
