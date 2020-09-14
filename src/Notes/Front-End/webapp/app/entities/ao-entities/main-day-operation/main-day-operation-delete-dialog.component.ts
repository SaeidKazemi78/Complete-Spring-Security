import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';

import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {JhiEventManager} from 'ng-jhipster';

import {MainDayOperation} from './main-day-operation.model';
import {MainDayOperationPopupService} from './main-day-operation-popup.service';
import {MainDayOperationService} from './main-day-operation.service';

@Component({
    selector: 'jhi-main-day-operation-delete-dialog',
    templateUrl: './main-day-operation-delete-dialog.component.html'
})
export class MainDayOperationDeleteDialogComponent {

    mainDayOperation: MainDayOperation;

    constructor(
        private mainDayOperationService: MainDayOperationService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.mainDayOperationService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'mainDayOperationListModification',
                content: 'Deleted an mainDayOperation'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-main-day-operation-delete-popup',
    template: ''
})
export class MainDayOperationDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private mainDayOperationPopupService: MainDayOperationPopupService
    ) {
    }

    ngOnInit() {
        this.routeSub = this.route.params.subscribe(params => {
            this.mainDayOperationPopupService
                .open(MainDayOperationDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
