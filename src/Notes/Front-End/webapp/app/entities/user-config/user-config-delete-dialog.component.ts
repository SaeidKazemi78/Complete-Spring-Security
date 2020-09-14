import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { UserConfig } from './user-config.model';
import { UserConfigPopupService } from './user-config-popup.service';
import { UserConfigService } from './user-config.service';

@Component({
    selector: 'jhi-user-config-delete-dialog',
    templateUrl: './user-config-delete-dialog.component.html'
})
export class UserConfigDeleteDialogComponent {

    userConfig: UserConfig;

    constructor(
        private userConfigService: UserConfigService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.userConfigService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'userConfigListModification',
                content: 'Deleted an userConfig'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-user-config-delete-popup',
    template: ''
})
export class UserConfigDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private userConfigPopupService: UserConfigPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.userConfigPopupService
                .open(UserConfigDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
