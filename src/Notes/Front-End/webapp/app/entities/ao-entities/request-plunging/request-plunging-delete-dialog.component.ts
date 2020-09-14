import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';

import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {JhiEventManager} from 'ng-jhipster';

import {RequestPlunging} from './request-plunging.model';
import {RequestPlungingPopupService} from './request-plunging-popup.service';
import {RequestPlungingService} from './request-plunging.service';

@Component({
    selector: 'jhi-request-plunging-delete-dialog',
    templateUrl: './request-plunging-delete-dialog.component.html'
})
export class RequestPlungingDeleteDialogComponent {

    requestPlunging: RequestPlunging;

    constructor(
        private requestPlungingService: RequestPlungingService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.requestPlungingService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'requestPlungingListModification',
                content: 'Deleted an requestPlunging'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-request-plunging-delete-popup',
    template: ''
})
export class RequestPlungingDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private requestPlungingPopupService: RequestPlungingPopupService
    ) {
    }

    ngOnInit() {
        this.routeSub = this.route.params.subscribe(params => {
            this.requestPlungingPopupService
                .open(RequestPlungingDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
