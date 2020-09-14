import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { SafetyCard } from './safety-card.model';
import { SafetyCardPopupService } from './safety-card-popup.service';
import { SafetyCardService } from './safety-card.service';

@Component({
    selector: 'jhi-safety-card-delete-dialog',
    templateUrl: './safety-card-delete-dialog.component.html'
})
export class SafetyCardDeleteDialogComponent {

    safetyCard: SafetyCard;

    constructor(
        private safetyCardService: SafetyCardService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.safetyCardService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'safetyCardListModification',
                content: 'Deleted an safetyCard'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-safety-card-delete-popup',
    template: ''
})
export class SafetyCardDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private safetyCardPopupService: SafetyCardPopupService
) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe(params => {
            this.safetyCardPopupService
                .open(SafetyCardDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
