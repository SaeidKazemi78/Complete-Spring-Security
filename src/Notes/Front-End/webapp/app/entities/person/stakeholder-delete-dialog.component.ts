import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { Stakeholder } from './stakeholder.model';
import { StakeholderPopupService } from './stakeholder-popup.service';
import { StakeholderService } from './stakeholder.service';

@Component({
    selector: 'jhi-stakeholder-delete-dialog',
    templateUrl: './stakeholder-delete-dialog.component.html'
})
export class StakeholderDeleteDialogComponent {

    stakeholder: Stakeholder;

    constructor(
        private stakeholderService: StakeholderService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.stakeholderService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'stakeholderListModification',
                content: 'Deleted an stakeholder'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-stakeholder-delete-popup',
    template: ''
})
export class StakeholderDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private stakeholderPopupService: StakeholderPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe(params => {
            this.stakeholderPopupService
                .open(StakeholderDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
