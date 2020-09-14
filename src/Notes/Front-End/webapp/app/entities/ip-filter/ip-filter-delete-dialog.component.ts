import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IpFilter } from './ip-filter.model';
import { IpFilterPopupService } from './ip-filter-popup.service';
import { IpFilterService } from './ip-filter.service';

@Component({
    selector: 'jhi-ip-filter-delete-dialog',
    templateUrl: './ip-filter-delete-dialog.component.html'
})
export class IpFilterDeleteDialogComponent {

    ipFilter: IpFilter;

    constructor(
        private ipFilterService: IpFilterService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.ipFilterService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'ipFilterListModification',
                content: 'Deleted an ipFilter'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-ip-filter-delete-popup',
    template: ''
})
export class IpFilterDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private ipFilterPopupService: IpFilterPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe(params => {
            this.ipFilterPopupService
                .open(IpFilterDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
