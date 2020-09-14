import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { BoundaryTag } from './boundary-tag.model';
import { BoundaryTagPopupService } from './boundary-tag-popup.service';
import { BoundaryTagService } from './boundary-tag.service';

@Component({
    selector: 'jhi-boundary-tag-delete-dialog',
    templateUrl: './boundary-tag-delete-dialog.component.html'
})
export class BoundaryTagDeleteDialogComponent {

    boundaryTag: BoundaryTag;

    constructor(
        private boundaryTagService: BoundaryTagService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.boundaryTagService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'boundaryTagListModification',
                content: 'Deleted an boundaryTag'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-boundary-tag-delete-popup',
    template: ''
})
export class BoundaryTagDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private boundaryTagPopupService: BoundaryTagPopupService
) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe(params => {
            this.boundaryTagPopupService
                .open(BoundaryTagDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
