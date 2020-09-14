import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';

import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {JhiEventManager} from 'ng-jhipster';

import {MetreLog} from './metre-log.model';
import {MetreLogPopupService} from './metre-log-popup.service';
import {MetreLogService} from './metre-log.service';

@Component({
    selector: 'jhi-metre-log-delete-dialog',
    templateUrl: './metre-log-delete-dialog.component.html'
})
export class MetreLogDeleteDialogComponent {

    metreLog: MetreLog;

    constructor(
        private metreLogService: MetreLogService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.metreLogService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'metreLogListModification',
                content: 'Deleted an metreLog'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-metre-log-delete-popup',
    template: ''
})
export class MetreLogDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private metreLogPopupService: MetreLogPopupService
    ) {
    }

    ngOnInit() {
        this.routeSub = this.route.params.subscribe(params => {
            this.metreLogPopupService
                .open(MetreLogDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
