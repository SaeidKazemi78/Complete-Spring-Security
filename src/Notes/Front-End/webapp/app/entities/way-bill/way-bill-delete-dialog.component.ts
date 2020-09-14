import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';

import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {JhiEventManager} from 'ng-jhipster';

import {WayBill} from './way-bill.model';
import {WayBillPopupService} from './way-bill-popup.service';
import {WayBillService} from './way-bill.service';

@Component({
    selector: 'jhi-way-bill-delete-dialog',
    templateUrl: './way-bill-delete-dialog.component.html'
})
export class WayBillDeleteDialogComponent {

    wayBill: WayBill;

    constructor(
        private wayBillService: WayBillService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.wayBillService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'wayBillListModification',
                content: 'Deleted an wayBill'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-way-bill-delete-popup',
    template: ''
})
export class WayBillDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private wayBillPopupService: WayBillPopupService
    ) {
    }

    ngOnInit() {
        this.routeSub = this.route.params.subscribe(params => {
            this.wayBillPopupService
                .open(WayBillDeleteDialogComponent as Component, params['id'], null, null);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
