import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { SalesCode } from './sales-code.model';
import { SalesCodePopupService } from './sales-code-popup.service';
import { SalesCodeService } from './sales-code.service';

@Component({
    selector: 'jhi-sales-code-delete-dialog',
    templateUrl: './sales-code-delete-dialog.component.html'
})
export class SalesCodeDeleteDialogComponent {

    salesCode: SalesCode;

    constructor(
        private salesCodeService: SalesCodeService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.salesCodeService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'salesCodeListModification',
                content: 'Deleted an salesCode'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-sales-code-delete-popup',
    template: ''
})
export class SalesCodeDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private salesCodePopupService: SalesCodePopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe(params => {
            this.salesCodePopupService
                .open(SalesCodeDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
