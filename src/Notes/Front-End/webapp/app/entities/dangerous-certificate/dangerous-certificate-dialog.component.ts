import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {HttpErrorResponse, HttpResponse} from '@angular/common/http';

import {Observable} from 'rxjs/Observable';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {JhiAlertService, JhiEventManager} from 'ng-jhipster';

import {DangerousCertificate} from './dangerous-certificate.model';
import {DangerousCertificatePopupService} from './dangerous-certificate-popup.service';
import {DangerousCertificateService} from './dangerous-certificate.service';
import {Driver, DriverService} from '../driver';
import {Depot, DepotService} from '../depot';

@Component({
    selector: 'jhi-dangerous-certificate-dialog',
    templateUrl: './dangerous-certificate-dialog.component.html'
})
export class DangerousCertificateDialogComponent implements OnInit {

    dangerousCertificate: DangerousCertificate;
    isSaving: boolean;
    isView: boolean;

    depot: Depot[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private dangerousCertificateService: DangerousCertificateService,
        private driverService: DriverService,
        private depotService: DepotService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isView = View.isView;
        this.isSaving = false;
        this.depotService.query()
            .subscribe((res: HttpResponse<Depot[]>) => {
                this.depot = res.body;
            }, (res: HttpErrorResponse) => this.onError(res.message));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.dangerousCertificate.id !== undefined) {
            this.subscribeToSaveResponse(
                this.dangerousCertificateService.update(this.dangerousCertificate));
        } else {
            this.subscribeToSaveResponse(
                this.dangerousCertificateService.create(this.dangerousCertificate));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<DangerousCertificate>>) {
        result.subscribe((res: HttpResponse<DangerousCertificate>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: DangerousCertificate) {
        this.eventManager.broadcast({name: 'dangerousCertificateListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }

    trackDriverById(index: number, item: Driver) {
        return item.id;
    }

    trackDepotById(index: number, item: Depot) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-dangerous-certificate-popup',
    template: ''
})
export class DangerousCertificatePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private dangerousCertificatePopupService: DangerousCertificatePopupService
    ) {
    }

    ngOnInit() {
        this.routeSub = this.route.params.subscribe(params => {
            View.isView = !!params['view'];

            if (params['id']) {
                this.dangerousCertificatePopupService
                    .open(DangerousCertificateDialogComponent as Component, params['id']);
            } else if (params['driverId']) {
                this.dangerousCertificatePopupService
                    .open(DangerousCertificateDialogComponent as Component, null, params['driverId']);
            } else {
                console.log('not be');
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}

class View {
    static isView: boolean;
}
