import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { Manufacture } from './manufacture.model';
import { ManufacturePopupService } from './manufacture-popup.service';
import { ManufactureService } from './manufacture.service';

@Component({
    selector: 'jhi-manufacture-delete-dialog',
    templateUrl: './manufacture-delete-dialog.component.html'
})
export class ManufactureDeleteDialogComponent {

    manufacture: Manufacture;

    constructor(
        private manufactureService: ManufactureService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.manufactureService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'manufactureListModification',
                content: 'Deleted an manufacture'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-manufacture-delete-popup',
    template: ''
})
export class ManufactureDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private manufacturePopupService: ManufacturePopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe(params => {
            this.manufacturePopupService
                .open(ManufactureDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
