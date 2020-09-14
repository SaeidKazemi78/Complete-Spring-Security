import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { NiopdcConfig } from './niopdc-config.model';
import { NiopdcConfigPopupService } from './niopdc-config-popup.service';
import { NiopdcConfigService } from './niopdc-config.service';

@Component({
    selector: 'jhi-niopdc-config-delete-dialog',
    templateUrl: './niopdc-config-delete-dialog.component.html'
})
export class NiopdcConfigDeleteDialogComponent {

    niopdcConfig: NiopdcConfig;

    constructor(
        private niopdcConfigService: NiopdcConfigService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.niopdcConfigService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'niopdcConfigListModification',
                content: 'Deleted an niopdcConfig'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-niopdc-config-delete-popup',
    template: ''
})
export class NiopdcConfigDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private niopdcConfigPopupService: NiopdcConfigPopupService
) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe(params => {
            this.niopdcConfigPopupService
                .open(NiopdcConfigDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
