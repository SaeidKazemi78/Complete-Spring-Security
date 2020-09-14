import {Component, OnInit, OnDestroy} from '@angular/core';
import {ActivatedRoute} from '@angular/router';

import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {JhiEventManager} from 'ng-jhipster';

import {ExportLetter} from './export-letter.model';
import {ExportLetterPopupService} from './export-letter-popup.service';
import {ExportLetterService} from './export-letter.service';

@Component({
    selector: 'jhi-export-letter-delete-dialog',
    templateUrl: './export-letter-delete-dialog.component.html'
})
export class ExportLetterDeleteDialogComponent {

    exportLetter: ExportLetter;

    constructor(
        private exportLetterService: ExportLetterService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.exportLetterService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'exportLetterListModification',
                content: 'Deleted an exportLetter'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-export-letter-delete-popup',
    template: ''
})
export class ExportLetterDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private exportLetterPopupService: ExportLetterPopupService
    ) {
    }

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.exportLetterPopupService
                .open(ExportLetterDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
