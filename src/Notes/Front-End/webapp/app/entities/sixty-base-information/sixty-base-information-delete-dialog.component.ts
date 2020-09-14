import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { SixtyBaseInformation } from './sixty-base-information.model';
import { SixtyBaseInformationPopupService } from './sixty-base-information-popup.service';
import { SixtyBaseInformationService } from './sixty-base-information.service';

@Component({
    selector: 'jhi-sixty-base-information-delete-dialog',
    templateUrl: './sixty-base-information-delete-dialog.component.html'
})
export class SixtyBaseInformationDeleteDialogComponent {

    sixtyBaseInformation: SixtyBaseInformation;

    constructor(
        private sixtyBaseInformationService: SixtyBaseInformationService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.sixtyBaseInformationService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'sixtyBaseInformationListModification',
                content: 'Deleted an sixtyBaseInformation'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-sixty-base-information-delete-popup',
    template: ''
})
export class SixtyBaseInformationDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private sixtyBaseInformationPopupService: SixtyBaseInformationPopupService
) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe(params => {
            this.sixtyBaseInformationPopupService
                .open(SixtyBaseInformationDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
