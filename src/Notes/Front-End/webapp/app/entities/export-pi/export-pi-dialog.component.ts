import {Component, OnInit, OnDestroy} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {HttpResponse, HttpErrorResponse} from '@angular/common/http';

import {Observable} from 'rxjs/Observable';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {JhiEventManager, JhiAlertService} from 'ng-jhipster';

import {ExportPi} from './export-pi.model';
import {ExportPiPopupService} from './export-pi-popup.service';
import {ExportPiService} from './export-pi.service';
import {ExportLetter, ExportLetterService} from '../export-letter';

@Component({
    selector: 'jhi-export-pi-dialog',
    templateUrl: './export-pi-dialog.component.html'
})
export class ExportPiDialogComponent implements OnInit {

    exportPi: ExportPi;
    isSaving: boolean;
    isView: boolean;

    exportletter: ExportLetter;
    maxAmount = 0;

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private exportPiService: ExportPiService,
        private exportLetterService: ExportLetterService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isView = View.isView;
        this.isSaving = false;

        this.exportLetterService.find(this.exportPi.exportLetterId).subscribe(value => {
            this.exportletter = value.body;

            this.exportLetterService.totalAmountRecorded(this.exportPi.exportLetterId).subscribe(amount => {
                this.maxAmount = this.exportletter.amount - amount.body + (this.exportPi.id ? this.exportPi.amount : 0);
            });

        });

    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.exportPi.id !== undefined) {
            this.subscribeToSaveResponse(
                this.exportPiService.update(this.exportPi));
        } else {
            this.subscribeToSaveResponse(
                this.exportPiService.create(this.exportPi));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<ExportPi>>) {
        result.subscribe((res: HttpResponse<ExportPi>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: ExportPi) {
        this.eventManager.broadcast({name: 'exportPiListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }

    trackExportLetterById(index: number, item: ExportLetter) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-export-pi-popup',
    template: ''
})
export class ExportPiPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private exportPiPopupService: ExportPiPopupService
    ) {
    }

    ngOnInit() {
        this.routeSub = this.route.params.subscribe(params => {
            View.isView = !!params['view'];

            if (params['id']) {
                this.exportPiPopupService
                    .open(ExportPiDialogComponent as Component, params['id']);
            } else if (params['exportLetterId']) {
                this.exportPiPopupService
                    .open(ExportPiDialogComponent as Component, null, params['exportLetterId']);
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
}
