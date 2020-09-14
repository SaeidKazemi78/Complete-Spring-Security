import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';

import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {JhiEventManager} from 'ng-jhipster';

import {MilliPoor} from './milli-poor.model';
import {MilliPoorPopupService} from './milli-poor-popup.service';
import {MilliPoorService} from './milli-poor.service';

@Component({
    selector: 'jhi-milli-poor-delete-dialog',
    templateUrl: './milli-poor-delete-dialog.component.html'
})
export class MilliPoorDeleteDialogComponent {

    milliPoor: MilliPoor;

    constructor(
        private milliPoorService: MilliPoorService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.milliPoorService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'milliPoorListModification',
                content: 'Deleted an milliPoor'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-milli-poor-delete-popup',
    template: ''
})
export class MilliPoorDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private milliPoorPopupService: MilliPoorPopupService
    ) {
    }

    ngOnInit() {
        this.routeSub = this.route.params.subscribe(params => {
            this.milliPoorPopupService
                .open(MilliPoorDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
