import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';

import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {JhiEventManager} from 'ng-jhipster';

import {ChangeRequestElement} from './change-request-element.model';
import {ChangeRequestElementPopupService} from './change-request-element-popup.service';
import {ChangeRequestElementService} from './change-request-element.service';

@Component({
    selector: 'jhi-change-request-element-delete-dialog',
    templateUrl: './change-request-element-delete-dialog.component.html'
})
export class ChangeRequestElementDeleteDialogComponent {

    changeRequestElement: ChangeRequestElement;

    constructor(
        private changeRequestElementService: ChangeRequestElementService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.changeRequestElementService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'changeRequestElementListModification',
                content: 'Deleted an changeRequestElement'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-change-request-element-delete-popup',
    template: ''
})
export class ChangeRequestElementDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private changeRequestElementPopupService: ChangeRequestElementPopupService
    ) {
    }

    ngOnInit() {
        this.routeSub = this.route.params.subscribe(params => {
            this.changeRequestElementPopupService
                .open(ChangeRequestElementDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
