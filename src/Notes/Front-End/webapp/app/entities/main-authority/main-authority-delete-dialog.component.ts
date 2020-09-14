import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { MainAuthority } from './main-authority.model';
import { MainAuthorityPopupService } from './main-authority-popup.service';
import { MainAuthorityService } from './main-authority.service';

@Component({
    selector: 'jhi-main-authority-delete-dialog',
    templateUrl: './main-authority-delete-dialog.component.html'
})
export class MainAuthorityDeleteDialogComponent {

    mainAuthority: MainAuthority;

    constructor(
        private mainAuthorityService: MainAuthorityService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(name: string) {
        this.mainAuthorityService.delete(name).subscribe(response => {
            this.eventManager.broadcast({
                name: 'mainAuthorityListModification',
                content: 'Deleted an mainAuthority'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-main-authority-delete-popup',
    template: ''
})
export class MainAuthorityDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private mainAuthorityPopupService: MainAuthorityPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe(params => {
            this.mainAuthorityPopupService
                .open(MainAuthorityDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
