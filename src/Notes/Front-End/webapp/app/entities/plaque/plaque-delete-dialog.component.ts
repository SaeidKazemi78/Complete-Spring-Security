import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { Plaque } from './plaque.model';
import { PlaquePopupService } from './plaque-popup.service';
import { PlaqueService } from './plaque.service';

@Component({
    selector: 'jhi-plaque-delete-dialog',
    templateUrl: './plaque-delete-dialog.component.html'
})
export class PlaqueDeleteDialogComponent {

    plaque: Plaque;

    constructor(
        private plaqueService: PlaqueService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.plaqueService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'plaqueListModification',
                content: 'Deleted an plaque'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-plaque-delete-popup',
    template: ''
})
export class PlaqueDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private plaquePopupService: PlaquePopupService
) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe(params => {
            this.plaquePopupService
                .open(PlaqueDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
