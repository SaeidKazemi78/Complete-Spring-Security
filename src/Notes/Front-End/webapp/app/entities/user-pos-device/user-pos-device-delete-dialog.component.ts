import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { UserPosDevice } from './user-pos-device.model';
import { UserPosDevicePopupService } from './user-pos-device-popup.service';
import { UserPosDeviceService } from './user-pos-device.service';

@Component({
    selector: 'jhi-user-pos-device-delete-dialog',
    templateUrl: './user-pos-device-delete-dialog.component.html'
})
export class UserPosDeviceDeleteDialogComponent {

    userPosDevice: UserPosDevice;

    constructor(
        private userPosDeviceService: UserPosDeviceService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.userPosDeviceService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'userPosDeviceListModification',
                content: 'Deleted an userPosDevice'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-user-pos-device-delete-popup',
    template: ''
})
export class UserPosDeviceDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private userPosDevicePopupService: UserPosDevicePopupService
) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe(params => {
            this.userPosDevicePopupService
                .open(UserPosDeviceDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
