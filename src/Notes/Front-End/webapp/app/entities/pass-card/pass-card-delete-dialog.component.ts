import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { PassCard } from './pass-card.model';
import { PassCardPopupService } from './pass-card-popup.service';
import { PassCardService } from './pass-card.service';

@Component({
    selector: 'jhi-pass-card-delete-dialog',
    templateUrl: './pass-card-delete-dialog.component.html'
})
export class PassCardDeleteDialogComponent {

    passCard: PassCard;

    constructor(
        private passCardService: PassCardService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.passCardService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'passCardListModification',
                content: 'Deleted an passCard'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-pass-card-delete-popup',
    template: ''
})
export class PassCardDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private passCardPopupService: PassCardPopupService
) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe(params => {
            this.passCardPopupService
                .open(PassCardDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
