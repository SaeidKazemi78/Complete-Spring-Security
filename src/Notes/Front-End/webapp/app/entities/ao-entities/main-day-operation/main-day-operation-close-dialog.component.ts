import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';

import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {JhiEventManager} from 'ng-jhipster';
import {MainDayOperation} from './main-day-operation.model';
import {MainDayOperationService} from './main-day-operation.service';
import {MainDayOperationPopupService} from './main-day-operation-popup.service';

@Component({
    selector: 'jhi-main-day-operation-close-dialog',
    templateUrl: './main-day-operation-close-dialog.component.html'
})
export class MainDayOperationCloseDialogComponent {

    mainDayOperation: MainDayOperation;

    constructor(private mainDayOperationService: MainDayOperationService,
                public activeModal: NgbActiveModal,
                private eventManager: JhiEventManager) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmClose(id: number) {
        this.mainDayOperationService.close(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'mainDayOperationListModification',
                content: 'Closed an mainDayOperation'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-main-day-operation-close-popup',
    template: ''
})
export class MainDayOperationClosePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(private route: ActivatedRoute,
                private mainDayOperationPopupService: MainDayOperationPopupService) {
    }

    ngOnInit() {
        this.routeSub = this.route.params.subscribe(params => {
            this.mainDayOperationPopupService
                .open(MainDayOperationCloseDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
