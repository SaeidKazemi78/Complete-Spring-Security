import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';

import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {JhiEventManager} from 'ng-jhipster';
import {InfringementService} from './infringement.service';
import {Infringement} from 'app/entities/infringement/infringement.model';
import {InfringementPopupService} from './infringement-popup.service';

@Component({
    selector: 'jhi-infringement-de-active-dialog',
    templateUrl: './infringement-deActive-dialog.component.html'
})
export class InfringementDeActiveDialogComponent implements OnInit {

    fileToUpload: File = null;
    fileUploading: boolean;
    customerId: number;
    id: number;
    infringement: Infringement = new  Infringement();

    constructor(
        public activeModal: NgbActiveModal,
        public infringementService: InfringementService,
        private activatedRoute: ActivatedRoute,
        private eventManager: JhiEventManager
    ) {

    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    handleFileInput(files: FileList) {
        this.fileUploading = true;
        this.fileToUpload = files.item(0);
        this.infringementService.postFile(this.fileToUpload)
            .subscribe((res) => {
                this.infringement.fileId = res.body;
                this.fileUploading = false;
            }, (error) => {
                this.fileUploading = false;
            });
    }

    save() {
        this.infringementService.deActive(this.infringement).subscribe(response => {
            this.eventManager.broadcast({
                name: 'infringementListModification',
                content: 'changePlaque an customer'
            });
            this.activeModal.dismiss(true);
        });
    }

    ngOnInit() {
    }
}

@Component({
    selector: 'jhi-infringement-de-active-dialog-popup',
    template: ''
})
export class InfringementDeActivePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private infringementPopupService: InfringementPopupService
    ) {
    }

    ngOnInit() {
        this.routeSub = this.route.params.subscribe(params => {

            this.infringementPopupService
                .open(InfringementDeActiveDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
