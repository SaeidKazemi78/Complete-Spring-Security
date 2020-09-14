import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {HttpErrorResponse, HttpResponse} from '@angular/common/http';

import {Observable} from 'rxjs/Observable';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {JhiAlertService, JhiEventManager} from 'ng-jhipster';

import {LogBook} from './log-book.model';
import {LogBookPopupService} from './log-book-popup.service';
import {LogBookService} from './log-book.service';
import {MetreLog, MetreLogService} from '../metre-log';
import {DayDepot, DayDepotService} from '../day-depot';

@Component({
    selector: 'jhi-log-book-dialog',
    templateUrl: './log-book-dialog.component.html'
})
export class LogBookDialogComponent implements OnInit {

    logBook: LogBook;
    isSaving: boolean;
    isView: boolean;

    metrelogs: MetreLog[];

    daydepots: DayDepot[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private logBookService: LogBookService,
        private metreLogService: MetreLogService,
        private dayDepotService: DayDepotService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isView = View.isView;
        this.isSaving = false;
        this.metreLogService
            .query({filter: 'logbook-is-null'})
            .subscribe((res: HttpResponse<MetreLog[]>) => {
                if (!this.logBook.metreLogId) {
                    this.metrelogs = res.body;
                } else {
                    this.metreLogService
                        .find(this.logBook.metreLogId)
                        .subscribe((subRes: HttpResponse<MetreLog>) => {
                            this.metrelogs = [subRes.body].concat(res.body);
                        }, (subRes: HttpErrorResponse) => this.onError(subRes.message));
                }
            }, (res: HttpErrorResponse) => this.onError(res.message));
        this.dayDepotService.query()
            .subscribe((res: HttpResponse<DayDepot[]>) => {
                this.daydepots = res.body;
            }, (res: HttpErrorResponse) => this.onError(res.message));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.logBook.id !== undefined) {
            this.subscribeToSaveResponse(
                this.logBookService.update(this.logBook));
        } else {
            this.subscribeToSaveResponse(
                this.logBookService.create(this.logBook));
        }
    }

    trackMetreLogById(index: number, item: MetreLog) {
        return item.id;
    }

    trackDayDepotById(index: number, item: DayDepot) {
        return item.id;
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<LogBook>>) {
        result.subscribe((res: HttpResponse<LogBook>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: LogBook) {
        this.eventManager.broadcast({name: 'logBookListModification', content: 'OK'});
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
    selector: 'jhi-log-book-popup',
    template: ''
})
export class LogBookPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private logBookPopupService: LogBookPopupService
    ) {
    }

    ngOnInit() {
        this.routeSub = this.route.params.subscribe(params => {
            View.isView = !!params['view'];

            if (params['id']) {
                this.logBookPopupService
                    .open(LogBookDialogComponent as Component, params['id']);
            } else if (params['dayDepotId']) {
                this.logBookPopupService
                    .open(LogBookDialogComponent as Component, null, params['dayDepotId']);
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
