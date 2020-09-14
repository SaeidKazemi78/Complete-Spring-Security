import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { User } from '../../shared';
import { UserManagementPopupService } from './user-management-popup.service';
import { UserManagementService } from './user-management.service';

@Component({
    selector: 'jhi-user-management-delete-dialog',
    templateUrl: './user-management-delete-dialog.component.html'
})
export class UserManagementDeleteDialogComponent {

    user: User;

    constructor(
        private userManagementService: UserManagementService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: string) {
        this.userManagementService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'userManagementListModification',
                content: 'Deleted an userManagement'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-user-management-delete-popup',
    template: ''
})
export class UserManagementDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private userManagementPopupService: UserManagementPopupService
) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe(params => {
            this.userManagementPopupService
                .open(UserManagementDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
