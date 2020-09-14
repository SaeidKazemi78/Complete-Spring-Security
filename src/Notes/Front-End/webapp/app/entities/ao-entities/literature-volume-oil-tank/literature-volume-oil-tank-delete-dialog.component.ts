import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';

import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {JhiEventManager} from 'ng-jhipster';

import {LiteratureVolumeOilTank} from './literature-volume-oil-tank.model';
import {LiteratureVolumeOilTankPopupService} from './literature-volume-oil-tank-popup.service';
import {LiteratureVolumeOilTankService} from './literature-volume-oil-tank.service';

@Component({
    selector: 'jhi-literature-volume-oil-tank-delete-dialog',
    templateUrl: './literature-volume-oil-tank-delete-dialog.component.html'
})
export class LiteratureVolumeOilTankDeleteDialogComponent {

    literatureVolumeOilTank: LiteratureVolumeOilTank;

    constructor(
        private literatureVolumeOilTankService: LiteratureVolumeOilTankService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.literatureVolumeOilTankService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'literatureVolumeOilTankListModification',
                content: 'Deleted an literatureVolumeOilTank'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-literature-volume-oil-tank-delete-popup',
    template: ''
})
export class LiteratureVolumeOilTankDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private literatureVolumeOilTankPopupService: LiteratureVolumeOilTankPopupService
    ) {
    }

    ngOnInit() {
        this.routeSub = this.route.params.subscribe(params => {
            this.literatureVolumeOilTankPopupService
                .open(LiteratureVolumeOilTankDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
