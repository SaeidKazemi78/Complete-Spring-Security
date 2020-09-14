import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';

import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {JhiEventManager} from 'ng-jhipster';

import {Version} from './version.model';
import {VersionPopupService} from './version-popup.service';
import {VersionService} from './version.service';

@Component({
    selector: 'jhi-version-delete-dialog',
    templateUrl: './version-delete-dialog.component.html'
})
export class VersionDeleteDialogComponent {

    version: Version;

    constructor(
        private versionService: VersionService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.versionService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'versionListModification',
                content: 'Deleted an news'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-version-delete-popup',
    template: ''
})
export class VersionDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private newsPopupService: VersionPopupService
    ) {
    }

    ngOnInit() {
        this.routeSub = this.route.params.subscribe(params => {
            this.newsPopupService
                .open(VersionDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
