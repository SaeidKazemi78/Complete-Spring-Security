import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';

import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {JhiEventManager} from 'ng-jhipster';
import {MainDayOperation} from './main-day-operation.model';
import {MainDayOperationService} from './main-day-operation.service';
import {MainDayOperationPopupService} from './main-day-operation-popup.service';

@Component({
    selector: 'jhi-main-day-operation-update-dialog',
    templateUrl: './main-day-operation-update-dialog.component.html'
})
export class MainDayOperationUpdateDialogComponent {

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

    confirmUpdate(id: number) {
        this.mainDayOperationService.checkForUpdate(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'mainDayOperationListModification',
                content: 'updated an mainDayOperation'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-main-day-operation-update-popup',
    template: ''
})
export class MainDayOperationUpdatePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private mainDayOperationPopupService: MainDayOperationPopupService
    ) {
    }

    ngOnInit() {
        this.routeSub = this.route.params.subscribe(params => {
            this.mainDayOperationPopupService
                .open(MainDayOperationUpdateDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
