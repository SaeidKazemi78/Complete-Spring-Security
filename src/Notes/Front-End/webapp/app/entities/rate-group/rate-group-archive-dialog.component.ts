import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { RateGroup } from './rate-group.model';
import { RateGroupPopupService } from './rate-group-popup.service';
import { RateGroupService } from './rate-group.service';

@Component({
    selector: 'jhi-rate-group-archive-dialog',
    templateUrl: './rate-group-archive-dialog.component.html'
})
export class RateGroupArchiveDialogComponent {

    rateGroup: RateGroup;

    constructor(
        private rateGroupService: RateGroupService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmArchive(id: number) {
        this.rateGroupService.archive(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'rateGroupListModification',
                content: 'Archive an rateGroup'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-rate-group-archive-popup',
    template: ''
})
export class RateGroupArchivePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private rateGroupPopupService: RateGroupPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe(params => {
            this.rateGroupPopupService
                .open(RateGroupArchiveDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
