import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ShiftWork } from './shift-work.model';
import { ShiftWorkPopupService } from './shift-work-popup.service';
import { ShiftWorkService } from './shift-work.service';

@Component({
    selector: 'jhi-shift-work-delete-dialog',
    templateUrl: './shift-work-delete-dialog.component.html'
})
export class ShiftWorkDeleteDialogComponent {

    id;
    constructor(
        private shiftWorkService: ShiftWorkService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.shiftWorkService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'shiftWorkListModification',
                content: 'Deleted an shiftWork'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-shift-work-delete-popup',
    template: ''
})
export class ShiftWorkDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private shiftWorkPopupService: ShiftWorkPopupService
) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe(params => {
            this.shiftWorkPopupService
                .open(ShiftWorkDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
