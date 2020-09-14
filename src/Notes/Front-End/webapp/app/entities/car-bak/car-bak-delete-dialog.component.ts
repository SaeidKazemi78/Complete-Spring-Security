import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { CarBak } from './car-bak.model';
import { CarBakPopupService } from './car-bak-popup.service';
import { CarBakService } from './car-bak.service';

@Component({
    selector: 'jhi-car-bak-delete-dialog',
    templateUrl: './car-bak-delete-dialog.component.html'
})
export class CarBakDeleteDialogComponent {

    carBak: CarBak;

    constructor(
        private carBakService: CarBakService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.carBakService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'carBakListModification',
                content: 'Deleted an carBak'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-car-bak-delete-popup',
    template: ''
})
export class CarBakDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private carBakPopupService: CarBakPopupService
) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe(params => {
            this.carBakPopupService
                .open(CarBakDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
