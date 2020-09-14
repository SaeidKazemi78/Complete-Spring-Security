import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { SalesCode } from './sales-code.model';
import { SalesCodePopupService } from './sales-code-popup.service';
import { SalesCodeService } from './sales-code.service';
import { Person, PersonService } from '../person';

@Component({
    selector: 'jhi-sales-code-dialog',
    templateUrl: './sales-code-dialog.component.html'
})
export class SalesCodeDialogComponent implements OnInit {

    salesCode: SalesCode;
    isSaving: boolean;

    people: Person[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private salesCodeService: SalesCodeService,
        private personService: PersonService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.personService.query()
            .subscribe((res: HttpResponse<Person[]>) => { this.people = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.salesCode.id !== undefined) {
            this.subscribeToSaveResponse(
                this.salesCodeService.update(this.salesCode));
        } else {
            this.subscribeToSaveResponse(
                this.salesCodeService.create(this.salesCode));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<SalesCode>>) {
        result.subscribe((res: HttpResponse<SalesCode>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: SalesCode) {
        this.eventManager.broadcast({ name: 'salesCodeListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }

    trackPersonById(index: number, item: Person) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-sales-code-popup',
    template: ''
})
export class SalesCodePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private salesCodePopupService: SalesCodePopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe(params => {
            if ( params['id'] ) {
                this.salesCodePopupService
                    .open(SalesCodeDialogComponent as Component, params['id']);
            } else {
                this.salesCodePopupService
                    .open(SalesCodeDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
