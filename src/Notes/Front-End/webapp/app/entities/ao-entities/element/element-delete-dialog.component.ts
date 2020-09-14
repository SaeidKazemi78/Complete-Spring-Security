import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';

import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {JhiEventManager} from 'ng-jhipster';

import {Element} from './element.model';
import {ElementPopupService} from './element-popup.service';
import {ElementService} from './element.service';

@Component({
    selector: 'jhi-element-delete-dialog',
    templateUrl: './element-delete-dialog.component.html'
})
export class ElementDeleteDialogComponent {

    element: Element;

    constructor(
        private elementService: ElementService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.elementService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'elementListModification',
                content: 'Deleted an element'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-element-delete-popup',
    template: ''
})
export class ElementDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private elementPopupService: ElementPopupService
    ) {
    }

    ngOnInit() {
        this.routeSub = this.route.params.subscribe(params => {
            this.elementPopupService
                .open(ElementDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
