import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';

import {Observable} from 'rxjs/Observable';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {JhiAlertService, JhiEventManager} from 'ng-jhipster';

import {MetreLog} from './metre-log.model';
import {MetreLogPopupService} from './metre-log-popup.service';
import {MetreLogService} from './metre-log.service';
import {HttpErrorResponse, HttpResponse} from '@angular/common/http';
import {Transfer, TransferService} from '../transfer';
import {TransferPlatformToUnit, TransferPlatformToUnitService} from '../transfer-platform-to-unit';
import {LogBook, LogBookService} from '../log-book';
import {Metre, MetreService} from '../metre';

@Component({
    selector: 'jhi-metre-log-dialog',
    templateUrl: './metre-log-dialog.component.html'
})
export class MetreLogDialogComponent implements OnInit {

    metreLog: MetreLog;
    isSaving: boolean;
    isView: boolean;

    transfers: Transfer[];

    transferplatformtounits: TransferPlatformToUnit[];

    logbooks: LogBook[];

    metres: Metre[];

    constructor(public activeModal: NgbActiveModal,
                private jhiAlertService: JhiAlertService,
                private metreLogService: MetreLogService,
                private transferService: TransferService,
                private transferPlatformToUnitService: TransferPlatformToUnitService,
                private logBookService: LogBookService,
                private metreService: MetreService,
                private eventManager: JhiEventManager) {
    }

    ngOnInit() {
        this.isView = View.isView;
        this.isSaving = false;
        this.transferService
            .query({filter: 'metrelog-is-null'})
            .subscribe((res: HttpResponse<Transfer[]>) => {
                if (!this.metreLog.transferId) {
                    this.transfers = res.body;
                } else {
                    this.transferService
                        .find(this.metreLog.transferId)
                        .subscribe((subRes: HttpResponse<Transfer>) => {
                            this.transfers = [subRes.body].concat(res.body);
                        }, (subRes: HttpErrorResponse) => this.onError(subRes.message));
                }
            }, (res: HttpErrorResponse) => this.onError(res.message));
        this.transferPlatformToUnitService
            .query({filter: 'metrelog-is-null'})
            .subscribe((res: HttpResponse<TransferPlatformToUnit[]>) => {
                if (!this.metreLog.transferPlatformToUnitId) {
                    this.transferplatformtounits = res.body;
                } else {
                    this.transferPlatformToUnitService
                        .find(this.metreLog.transferPlatformToUnitId)
                        .subscribe((subRes: HttpResponse<TransferPlatformToUnit>) => {
                            this.transferplatformtounits = [subRes.body].concat(res.body);
                        }, (subRes: HttpErrorResponse) => this.onError(subRes.message));
                }
            }, (res: HttpErrorResponse) => this.onError(res.message));
        this.logBookService
            .query(null, {filter: 'metrelog-is-null'})
            .subscribe((res: HttpResponse<LogBook[]>) => {
                if (!this.metreLog.logBookId) {
                    this.logbooks = res.body;
                } else {
                    this.logBookService
                        .find(this.metreLog.logBookId)
                        .subscribe((subRes: HttpResponse<LogBook>) => {
                            this.logbooks = [subRes.body].concat(res.body);
                        }, (subRes: HttpErrorResponse) => this.onError(subRes.message));
                }
            }, (res: HttpErrorResponse) => this.onError(res.message));
        this.metreService.query()
            .subscribe((res: HttpResponse<Metre[]>) => {
                this.metres = res.body;
            }, (res: HttpErrorResponse) => this.onError(res.message));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.metreLog.id !== undefined) {
            this.subscribeToSaveResponse(
                this.metreLogService.update(this.metreLog));
        } else {
            this.subscribeToSaveResponse(
                this.metreLogService.create(this.metreLog));
        }
    }

    trackTransferById(index: number, item: Transfer) {
        return item.id;
    }

    trackTransferPlatformToUnitById(index: number, item: TransferPlatformToUnit) {
        return item.id;
    }

    trackLogBookById(index: number, item: LogBook) {
        return item.id;
    }

    trackMetreById(index: number, item: Metre) {
        return item.id;
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<MetreLog>>) {
        result.subscribe((res: HttpResponse<MetreLog>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: MetreLog) {
        this.eventManager.broadcast({name: 'metreLogListModification', content: 'OK'});
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
    selector: 'jhi-metre-log-popup',
    template: ''
})
export class MetreLogPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(private route: ActivatedRoute,
                private metreLogPopupService: MetreLogPopupService) {
    }

    ngOnInit() {
        this.routeSub = this.route.params.subscribe(params => {
            View.isView = !!params['view'];

            if (params['id']) {
                this.metreLogPopupService
                    .open(MetreLogDialogComponent as Component, params['id']);
            } else {
                this.metreLogPopupService
                    .open(MetreLogDialogComponent as Component);
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
