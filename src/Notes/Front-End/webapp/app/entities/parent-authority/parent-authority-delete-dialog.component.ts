import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ParentAuthority } from './parent-authority.model';
import { ParentAuthorityPopupService } from './parent-authority-popup.service';
import { ParentAuthorityService } from './parent-authority.service';

@Component({
    selector: 'jhi-parent-authority-delete-dialog',
    templateUrl: './parent-authority-delete-dialog.component.html'
})
export class ParentAuthorityDeleteDialogComponent {

    parentAuthority: ParentAuthority;

    constructor(
        private parentAuthorityService: ParentAuthorityService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(name: string) {
        this.parentAuthorityService.delete(name).subscribe(() => {
            this.eventManager.broadcast({
                name: 'parentAuthorityListModification',
                content: 'Deleted an parentAuthority'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-parent-authority-delete-popup',
    template: ''
})
export class ParentAuthorityDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private parentAuthorityPopupService: ParentAuthorityPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe(params => {
            this.parentAuthorityPopupService
                .open(ParentAuthorityDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
