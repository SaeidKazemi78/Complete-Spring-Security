import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { SealUse } from './seal-use.model';
import { SealUsePopupService } from './seal-use-popup.service';
import { SealUseService } from './seal-use.service';

@Component({
    selector: 'jhi-seal-use-delete-dialog',
    templateUrl: './seal-use-delete-dialog.component.html'
})
export class SealUseDeleteDialogComponent {

    sealUse: SealUse;

    constructor(
        private sealUseService: SealUseService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.sealUseService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'sealUseListModification',
                content: 'Deleted an sealUse'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-seal-use-delete-popup',
    template: ''
})
export class SealUseDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private sealUsePopupService: SealUsePopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe(params => {
            this.sealUsePopupService
                .open(SealUseDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
