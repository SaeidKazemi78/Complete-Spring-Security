import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ExportPi } from './export-pi.model';
import { ExportPiPopupService } from './export-pi-popup.service';
import { ExportPiService } from './export-pi.service';

@Component({
    selector: 'jhi-export-pi-delete-dialog',
    templateUrl: './export-pi-delete-dialog.component.html'
})
export class ExportPiDeleteDialogComponent {

    exportPi: ExportPi;

    constructor(
        private exportPiService: ExportPiService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.exportPiService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'exportPiListModification',
                content: 'Deleted an exportPi'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-export-pi-delete-popup',
    template: ''
})
export class ExportPiDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private exportPiPopupService: ExportPiPopupService
) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe(params => {
            this.exportPiPopupService
                .open(ExportPiDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
