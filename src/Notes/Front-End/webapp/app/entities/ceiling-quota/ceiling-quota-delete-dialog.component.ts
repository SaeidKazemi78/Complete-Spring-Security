import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { CeilingQuota } from './ceiling-quota.model';
import { CeilingQuotaPopupService } from './ceiling-quota-popup.service';
import { CeilingQuotaService } from './ceiling-quota.service';

@Component({
    selector: 'jhi-ceiling-quota-delete-dialog',
    templateUrl: './ceiling-quota-delete-dialog.component.html'
})
export class CeilingQuotaDeleteDialogComponent {

    ceilingQuota: CeilingQuota;

    constructor(
        private ceilingQuotaService: CeilingQuotaService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.ceilingQuotaService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'ceilingQuotaListModification',
                content: 'Deleted an ceilingQuota'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-ceiling-quota-delete-popup',
    template: ''
})
export class CeilingQuotaDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private ceilingQuotaPopupService: CeilingQuotaPopupService
) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe(params => {
            this.ceilingQuotaPopupService
                .open(CeilingQuotaDeleteDialogComponent as Component, params['customerId'],  params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
