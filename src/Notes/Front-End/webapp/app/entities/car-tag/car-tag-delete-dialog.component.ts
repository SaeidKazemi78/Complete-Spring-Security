import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { CarTag } from './car-tag.model';
import { CarTagPopupService } from './car-tag-popup.service';
import { CarTagService } from './car-tag.service';

@Component({
    selector: 'jhi-car-tag-delete-dialog',
    templateUrl: './car-tag-delete-dialog.component.html'
})
export class CarTagDeleteDialogComponent {

    carTag: CarTag;

    constructor(
        private carTagService: CarTagService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.carTagService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'carTagListModification',
                content: 'Deleted an carTag'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-car-tag-delete-popup',
    template: ''
})
export class CarTagDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private carTagPopupService: CarTagPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.carTagPopupService
                .open(CarTagDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
