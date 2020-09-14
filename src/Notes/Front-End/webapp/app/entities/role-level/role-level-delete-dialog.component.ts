import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { RoleLevel } from './role-level.model';
import { RoleLevelPopupService } from './role-level-popup.service';
import { RoleLevelService } from './role-level.service';

@Component({
    selector: 'jhi-role-level-delete-dialog',
    templateUrl: './role-level-delete-dialog.component.html'
})
export class RoleLevelDeleteDialogComponent {

    roleLevel: RoleLevel;

    constructor(
        private roleLevelService: RoleLevelService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.roleLevelService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'roleLevelListModification',
                content: 'Deleted an roleLevel'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-role-level-delete-popup',
    template: ''
})
export class RoleLevelDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private roleLevelPopupService: RoleLevelPopupService
) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe(params => {
            this.roleLevelPopupService
                .open(RoleLevelDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
