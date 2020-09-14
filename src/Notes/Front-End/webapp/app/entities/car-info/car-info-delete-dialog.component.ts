import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { CarInfo } from './car-info.model';
import { CarInfoPopupService } from './car-info-popup.service';
import { CarInfoService } from './car-info.service';

@Component({
    selector: 'jhi-car-info-delete-dialog',
    templateUrl: './car-info-delete-dialog.component.html'
})
export class CarInfoDeleteDialogComponent {

    carInfo: CarInfo;

    constructor(
        private carInfoService: CarInfoService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.carInfoService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'carInfoListModification',
                content: 'Deleted an carInfo'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-car-info-delete-popup',
    template: ''
})
export class CarInfoDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private carInfoPopupService: CarInfoPopupService
) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe(params => {
            this.carInfoPopupService
                .open(CarInfoDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
