import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';

import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {JhiEventManager} from 'ng-jhipster';

import {ResponsePlunging} from './response-plunging.model';
import {ResponsePlungingPopupService} from './response-plunging-popup.service';
import {ResponsePlungingService} from './response-plunging.service';

@Component({
    selector: 'jhi-response-plunging-delete-dialog',
    templateUrl: './response-plunging-delete-dialog.component.html'
})
export class ResponsePlungingDeleteDialogComponent {

    responsePlunging: ResponsePlunging;

    constructor(
        private responsePlungingService: ResponsePlungingService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.responsePlungingService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'responsePlungingListModification',
                content: 'Deleted an responsePlunging'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-response-plunging-delete-popup',
    template: ''
})
export class ResponsePlungingDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private responsePlungingPopupService: ResponsePlungingPopupService
    ) {
    }

    ngOnInit() {
        this.routeSub = this.route.params.subscribe(params => {
            this.responsePlungingPopupService
                .open(ResponsePlungingDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
