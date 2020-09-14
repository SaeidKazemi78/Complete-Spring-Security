import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { BaseQuery } from './base-query.model';
import { BaseQueryPopupService } from './base-query-popup.service';
import { BaseQueryService } from './base-query.service';

@Component({
    selector: 'jhi-base-query-delete-dialog',
    templateUrl: './base-query-delete-dialog.component.html'
})
export class BaseQueryDeleteDialogComponent {

    baseQuery: BaseQuery;

    constructor(
        private baseQueryService: BaseQueryService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.baseQueryService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'baseQueryListModification',
                content: 'Deleted an baseQuery'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-base-query-delete-popup',
    template: ''
})
export class BaseQueryDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private baseQueryPopupService: BaseQueryPopupService
) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe(params => {
            this.baseQueryPopupService
                .open(BaseQueryDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
