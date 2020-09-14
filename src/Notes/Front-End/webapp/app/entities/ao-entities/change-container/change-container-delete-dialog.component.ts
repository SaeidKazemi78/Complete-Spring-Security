import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';

import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {JhiEventManager} from 'ng-jhipster';

import {ChangeContainer} from './change-container.model';
import {ChangeContainerPopupService} from './change-container-popup.service';
import {ChangeContainerService} from './change-container.service';

@Component({
    selector: 'jhi-change-container-delete-dialog',
    templateUrl: './change-container-delete-dialog.component.html'
})
export class ChangeContainerDeleteDialogComponent {

    changeContainer: ChangeContainer;

    constructor(
        private changeContainerService: ChangeContainerService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.changeContainerService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'changeContainerListModification',
                content: 'Deleted an changeContainer'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-change-container-delete-popup',
    template: ''
})
export class ChangeContainerDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private changeContainerPopupService: ChangeContainerPopupService
    ) {
    }

    ngOnInit() {
        this.routeSub = this.route.params.subscribe(params => {
            if (params['id']) {
                this.changeContainerPopupService
                    .open(ChangeContainerDeleteDialogComponent as Component, params['id']);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
