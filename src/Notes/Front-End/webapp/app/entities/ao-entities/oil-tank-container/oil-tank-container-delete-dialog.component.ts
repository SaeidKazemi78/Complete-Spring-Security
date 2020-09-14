import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';

import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {JhiEventManager} from 'ng-jhipster';

import {OilTankContainer} from './oil-tank-container.model';
import {OilTankContainerPopupService} from './oil-tank-container-popup.service';
import {OilTankContainerService} from './oil-tank-container.service';

@Component({
    selector: 'jhi-oil-tank-container-delete-dialog',
    templateUrl: './oil-tank-container-delete-dialog.component.html'
})
export class OilTankContainerDeleteDialogComponent {

    oilTankContainer: OilTankContainer;

    constructor(
        private oilTankContainerService: OilTankContainerService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.oilTankContainerService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'oilTankContainerListModification',
                content: 'Deleted an oilTankContainer'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-oil-tank-container-delete-popup',
    template: ''
})
export class OilTankContainerDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private oilTankContainerPopupService: OilTankContainerPopupService
    ) {
    }

    ngOnInit() {
        this.routeSub = this.route.params.subscribe(params => {
            this.oilTankContainerPopupService
                .open(OilTankContainerDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
