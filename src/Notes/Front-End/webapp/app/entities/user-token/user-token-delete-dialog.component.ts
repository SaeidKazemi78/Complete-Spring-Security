import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { UserToken } from './user-token.model';
import { UserTokenPopupService } from './user-token-popup.service';
import { UserTokenService } from './user-token.service';

@Component({
    selector: 'jhi-user-token-delete-dialog',
    templateUrl: './user-token-delete-dialog.component.html'
})
export class UserTokenDeleteDialogComponent {

    userToken: UserToken;

    constructor(
        private userTokenService: UserTokenService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.userTokenService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'userTokenListModification',
                content: 'Deleted an userToken'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-user-token-delete-popup',
    template: ''
})
export class UserTokenDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private userTokenPopupService: UserTokenPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.userTokenPopupService
                .open(UserTokenDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
