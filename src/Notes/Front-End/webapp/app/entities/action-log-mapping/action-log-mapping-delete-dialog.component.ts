import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';

import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {JhiEventManager} from 'ng-jhipster';

import {ActionLogMapping} from './action-log-mapping.model';
import {ActionLogMappingService} from 'app/entities/action-log-mapping/action-log-mapping.service';
import {ActionLogMappingPopupService} from 'app/entities/action-log-mapping/action-log-mapping-popup.service';

@Component({
    selector: 'jhi-action-log-mapping-delete-dialog',
    templateUrl: './action-log-mapping-delete-dialog.component.html'
})
export class ActionLogMappingDeleteDialogComponent {

    actionLogMapping: ActionLogMapping;

    constructor(
        private actionLogMappingService: ActionLogMappingService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.actionLogMappingService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'actionLogMappingListModification',
                content: 'Deleted an news'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-action-log-mapping-delete-popup',
    template: ''
})
export class ActionLogMappingDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private actionLogMapping: ActionLogMappingPopupService
    ) {
    }

    ngOnInit() {
        this.routeSub = this.route.params.subscribe(params => {
            this.actionLogMapping
                .open(ActionLogMappingDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
