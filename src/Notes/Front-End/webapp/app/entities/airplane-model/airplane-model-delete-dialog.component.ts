import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { AirplaneModel } from './airplane-model.model';
import { AirplaneModelPopupService } from './airplane-model-popup.service';
import { AirplaneModelService } from './airplane-model.service';

@Component({
    selector: 'jhi-airplane-model-delete-dialog',
    templateUrl: './airplane-model-delete-dialog.component.html'
})
export class AirplaneModelDeleteDialogComponent {

    airplaneModel: AirplaneModel;

    constructor(
        private airplaneModelService: AirplaneModelService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.airplaneModelService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'airplaneModelListModification',
                content: 'Deleted an airplaneModel'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-airplane-model-delete-popup',
    template: ''
})
export class AirplaneModelDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private airplaneModelPopupService: AirplaneModelPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe(params => {
            this.airplaneModelPopupService
                .open(AirplaneModelDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
