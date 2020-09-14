import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { VoucherTemplate } from './voucher-template.model';
import { VoucherTemplatePopupService } from './voucher-template-popup.service';
import { VoucherTemplateService } from './voucher-template.service';

@Component({
    selector: 'jhi-voucher-template-delete-dialog',
    templateUrl: './voucher-template-delete-dialog.component.html'
})
export class VoucherTemplateDeleteDialogComponent {

    voucherTemplate: VoucherTemplate;

    constructor(
        private voucherTemplateService: VoucherTemplateService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.voucherTemplateService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'voucherTemplateListModification',
                content: 'Deleted an voucherTemplate'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-voucher-template-delete-popup',
    template: ''
})
export class VoucherTemplateDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private voucherTemplatePopupService: VoucherTemplatePopupService
) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.voucherTemplatePopupService
                .open(VoucherTemplateDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
