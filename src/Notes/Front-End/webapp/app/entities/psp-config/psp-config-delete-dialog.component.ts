import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { PspConfig } from './psp-config.model';
import { PspConfigPopupService } from './psp-config-popup.service';
import { PspConfigService } from './psp-config.service';

@Component({
    selector: 'jhi-psp-config-delete-dialog',
    templateUrl: './psp-config-delete-dialog.component.html'
})
export class PspConfigDeleteDialogComponent {

    pspConfig: PspConfig;

    constructor(
        private pspConfigService: PspConfigService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.pspConfigService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'pspConfigListModification',
                content: 'Deleted an pspConfig'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-psp-config-delete-popup',
    template: ''
})
export class PspConfigDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private pspConfigPopupService: PspConfigPopupService
) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe(params => {
            this.pspConfigPopupService
                .open(PspConfigDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
