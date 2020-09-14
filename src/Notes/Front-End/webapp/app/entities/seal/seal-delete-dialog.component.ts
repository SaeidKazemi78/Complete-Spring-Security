import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { Seal } from './seal.model';
import { SealPopupService } from './seal-popup.service';
import { SealService } from './seal.service';

@Component({
    selector: 'jhi-seal-delete-dialog',
    templateUrl: './seal-delete-dialog.component.html'
})
export class SealDeleteDialogComponent {

    seal: Seal;

    constructor(
        private sealService: SealService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.sealService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'sealListModification',
                content: 'Deleted an seal'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-seal-delete-popup',
    template: ''
})
export class SealDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private sealPopupService: SealPopupService
) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.sealPopupService
                .open(SealDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
