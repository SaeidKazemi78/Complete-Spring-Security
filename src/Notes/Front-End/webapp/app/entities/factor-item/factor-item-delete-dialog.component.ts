import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { FactorItem } from './factor-item.model';
import { FactorItemPopupService } from './factor-item-popup.service';
import { FactorItemService } from './factor-item.service';

@Component({
    selector: 'jhi-factor-item-delete-dialog',
    templateUrl: './factor-item-delete-dialog.component.html'
})
export class FactorItemDeleteDialogComponent {

    factorItem: FactorItem;

    constructor(
        private factorItemService: FactorItemService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.factorItemService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'factorItemListModification',
                content: 'Deleted an factorItem'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-factor-item-delete-popup',
    template: ''
})
export class FactorItemDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private factorItemPopupService: FactorItemPopupService
) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe(params => {
            this.factorItemPopupService
                .open(FactorItemDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
