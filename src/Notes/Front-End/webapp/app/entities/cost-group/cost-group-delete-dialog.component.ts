import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { CostGroup } from './cost-group.model';
import { CostGroupPopupService } from './cost-group-popup.service';
import { CostGroupService } from './cost-group.service';

@Component({
    selector: 'jhi-cost-group-delete-dialog',
    templateUrl: './cost-group-delete-dialog.component.html'
})
export class CostGroupDeleteDialogComponent {

    costGroup: CostGroup;

    constructor(
        private costGroupService: CostGroupService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.costGroupService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'costGroupListModification',
                content: 'Deleted an costGroup'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-cost-group-delete-popup',
    template: ''
})
export class CostGroupDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private costGroupPopupService: CostGroupPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe(params => {
            this.costGroupPopupService
                .open(CostGroupDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
