import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { DangerousCertificate } from './dangerous-certificate.model';
import { DangerousCertificatePopupService } from './dangerous-certificate-popup.service';
import { DangerousCertificateService } from './dangerous-certificate.service';

@Component({
    selector: 'jhi-dangerous-certificate-delete-dialog',
    templateUrl: './dangerous-certificate-delete-dialog.component.html'
})
export class DangerousCertificateDeleteDialogComponent {

    dangerousCertificate: DangerousCertificate;

    constructor(
        private dangerousCertificateService: DangerousCertificateService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.dangerousCertificateService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'dangerousCertificateListModification',
                content: 'Deleted an dangerousCertificate'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-dangerous-certificate-delete-popup',
    template: ''
})
export class DangerousCertificateDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private dangerousCertificatePopupService: DangerousCertificatePopupService
) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe(params => {
            this.dangerousCertificatePopupService
                .open(DangerousCertificateDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
