import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';

import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {JhiEventManager} from 'ng-jhipster';

import {SellGroundFuel} from './sell-ground-fuel.model';
import {SellGroundFuelPopupService} from './sell-ground-fuel-popup.service';
import {SellGroundFuelService} from './sell-ground-fuel.service';

@Component({
    selector: 'jhi-sell-ground-fuel-delete-dialog',
    templateUrl: './sell-ground-fuel-delete-dialog.component.html'
})
export class SellGroundFuelDeleteDialogComponent {

    sellGroundFuel: SellGroundFuel;

    constructor(
        private sellGroundFuelService: SellGroundFuelService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.sellGroundFuelService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'sellGroundFuelListModification',
                content: 'Deleted an sellGroundFuel'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-sell-ground-fuel-delete-popup',
    template: ''
})
export class SellGroundFuelDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private sellGroundFuelPopupService: SellGroundFuelPopupService
    ) {
    }

    ngOnInit() {
        this.routeSub = this.route.params.subscribe(params => {
            this.sellGroundFuelPopupService
                .open(SellGroundFuelDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
