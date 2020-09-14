import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { Infringement } from './infringement.model';
import { InfringementPopupService } from './infringement-popup.service';
import { InfringementService } from './infringement.service';

@Component({
    selector: 'jhi-infringement-delete-dialog',
    templateUrl: './infringement-delete-dialog.component.html'
})
export class InfringementDeleteDialogComponent {

    infringement: Infringement;

    constructor(
        private infringementService: InfringementService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.infringementService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'infringementListModification',
                content: 'Deleted an infringement'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-infringement-delete-popup',
    template: ''
})
export class InfringementDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private infringementPopupService: InfringementPopupService
) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe(params => {
            this.infringementPopupService
                .open(InfringementDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
