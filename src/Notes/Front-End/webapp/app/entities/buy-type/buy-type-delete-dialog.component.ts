import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { BuyType } from './buy-type.model';
import { BuyTypePopupService } from './buy-type-popup.service';
import { BuyTypeService } from './buy-type.service';

@Component({
    selector: 'jhi-buy-type-delete-dialog',
    templateUrl: './buy-type-delete-dialog.component.html'
})
export class BuyTypeDeleteDialogComponent {

    buyType: BuyType;

    constructor(
        private buyTypeService: BuyTypeService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.buyTypeService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'buyTypeListModification',
                content: 'Deleted an buyType'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-buy-type-delete-popup',
    template: ''
})
export class BuyTypeDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private buyTypePopupService: BuyTypePopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe(params => {
            this.buyTypePopupService
                .open(BuyTypeDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
