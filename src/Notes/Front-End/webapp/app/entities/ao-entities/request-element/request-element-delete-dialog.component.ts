import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';

import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {JhiEventManager} from 'ng-jhipster';

import {RequestElement} from './request-element.model';
import {RequestElementPopupService} from './request-element-popup.service';
import {RequestElementService} from './request-element.service';

@Component({
    selector: 'jhi-request-element-delete-dialog',
    templateUrl: './request-element-delete-dialog.component.html'
})
export class RequestElementDeleteDialogComponent {

    requestElement: RequestElement;

    constructor(
        private requestElementService: RequestElementService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.requestElementService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'requestElementListModification',
                content: 'Deleted an requestElement'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-request-element-delete-popup',
    template: ''
})
export class RequestElementDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private requestElementPopupService: RequestElementPopupService
    ) {
    }

    ngOnInit() {
        this.routeSub = this.route.params.subscribe(params => {
            this.requestElementPopupService
                .open(RequestElementDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
