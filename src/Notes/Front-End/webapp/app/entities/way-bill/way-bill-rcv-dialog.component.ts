import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';

import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {JhiEventManager} from 'ng-jhipster';
import {WayBillPopupService} from './way-bill-popup.service';
import {WayBillService} from './way-bill.service';
import {WayBill} from './way-bill.model';
import {saveAs} from 'file-saver/FileSaver';

@Component({
    selector: 'jhi-way-bill-rcv-dialog',
    templateUrl: './way-bill-rcv-dialog.component.html'
})
export class WayBillRcvDialogComponent {

    startTime: any;
    endTime: any;
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
        this.wayBillService.downloadRcv(this.startTime, this.endTime, id).subscribe(value => {
            saveAs(value.body, 'rcx.txt');
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-way-bill-rcv-popup',
    template: ''
})
export class WayBillRcvPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private wayBillPopupService: WayBillPopupService
    ) {
    }

    ngOnInit() {
        this.routeSub = this.route.params.subscribe(params => {
            this.wayBillPopupService
                .open(WayBillRcvDialogComponent as Component, null, params['id'], null);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
