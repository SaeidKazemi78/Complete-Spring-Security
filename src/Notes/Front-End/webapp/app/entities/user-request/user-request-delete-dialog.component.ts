import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';

import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {JhiEventManager} from 'ng-jhipster';

import {UserRequestPopupService} from './user-request-popup.service';
import {UserRequestService} from './user-request.service';
import {UserRequest} from 'app/entities/user-request/user-request.model';

@Component({
    selector: 'jhi-user-request-delete-dialog',
    templateUrl: './user-request-delete-dialog.component.html'
})
export class UserRequestDeleteDialogComponent {

    userRequest: UserRequest;

    constructor(
        private userRequestService: UserRequestService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.userRequestService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'userRequestListModification',
                content: 'Deleted an userRequest'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-user-request-delete-popup',
    template: ''
})
export class UserRequestDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private userRequestPopupService: UserRequestPopupService
    ) {
    }

    ngOnInit() {
        this.routeSub = this.route.params.subscribe(params => {
            this.userRequestPopupService
                .open(UserRequestDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
