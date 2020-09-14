import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { TagRate } from './tag-rate.model';
import { TagRatePopupService } from './tag-rate-popup.service';
import { TagRateService } from './tag-rate.service';

@Component({
    selector: 'jhi-tag-rate-delete-dialog',
    templateUrl: './tag-rate-delete-dialog.component.html'
})
export class TagRateDeleteDialogComponent {

    tagRate: TagRate;

    constructor(
        private tagRateService: TagRateService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.tagRateService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'tagRateListModification',
                content: 'Deleted an tagRate'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-tag-rate-delete-popup',
    template: ''
})
export class TagRateDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private tagRatePopupService: TagRatePopupService
) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe(params => {
            this.tagRatePopupService
                .open(TagRateDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
