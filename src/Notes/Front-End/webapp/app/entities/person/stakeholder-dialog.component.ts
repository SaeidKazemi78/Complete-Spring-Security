import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { Stakeholder } from './stakeholder.model';
import { StakeholderPopupService } from './stakeholder-popup.service';
import { StakeholderService } from './stakeholder.service';
import { Person, PersonService } from '../person';

@Component({
    selector: 'jhi-stakeholder-dialog',
    templateUrl: './stakeholder-dialog.component.html'
})
export class StakeholderDialogComponent implements OnInit {

    stakeholder: Stakeholder;
    isSaving: boolean;

    people: Person[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private stakeholderService: StakeholderService,
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
        if (this.stakeholder.id !== undefined) {
            this.subscribeToSaveResponse(
                this.stakeholderService.update(this.stakeholder));
        } else {
            this.subscribeToSaveResponse(
                this.stakeholderService.create(this.stakeholder));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<Stakeholder>>) {
        result.subscribe((res: HttpResponse<Stakeholder>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: Stakeholder) {
        this.eventManager.broadcast({ name: 'stakeholderListModification', content: 'OK'});
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
    selector: 'jhi-stakeholder-popup',
    template: ''
})
export class StakeholderPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private stakeholderPopupService: StakeholderPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe(params => {
            if ( params['id'] ) {
                this.stakeholderPopupService
                    .open(StakeholderDialogComponent as Component, params['id']);
            } else {
                this.stakeholderPopupService
                    .open(StakeholderDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
