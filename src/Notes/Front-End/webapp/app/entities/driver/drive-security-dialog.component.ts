import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {HttpErrorResponse, HttpResponse} from '@angular/common/http';

import {Observable} from 'rxjs/Observable';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {JhiAlertService, JhiEventManager} from 'ng-jhipster';

import {Driver, DriverPopupService, DriverService, DriveSecurity} from './index';
import {Country, CountryService} from '../country';
import {DriveSecurityService} from './drive-security.service';

@Component({
    selector: 'jhi-drive-security-dialog',
    templateUrl: './drive-security-dialog.component.html'
})
export class DriveSecurityDialogComponent implements OnInit {

    driveSecurity: DriveSecurity;
    isSaving: boolean;
    isView: boolean;

    nationality: Country[];
    driverId: number;

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private driveSecurityService: DriveSecurityService,
        private driverService: DriverService,
        private countryService: CountryService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.driverId = this.driveSecurity.driverId;
        this.isView = View.isView;
        this.isSaving = false;
        this.countryService.query()
            .subscribe((res: HttpResponse<Country[]>) => {
                this.nationality = res.body;
            }, (res: HttpErrorResponse) => this.onError(res.message));
        this.driveSecurityService.findByDriverId(this.driveSecurity.driverId)
            .subscribe(value => {
                if (value.body && value.body.id) {
                    this.driveSecurity = value.body;
                } else {
                    this.driveSecurity = new DriveSecurity();
                    this.driveSecurity.driverId = this.driverId;
                }
            });
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.driveSecurity.id !== undefined) {
            this.subscribeToSaveResponse(
                this.driveSecurityService.update(this.driveSecurity));
        } else {
            this.subscribeToSaveResponse(
                this.driveSecurityService.create(this.driveSecurity));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<DriveSecurity>>) {
        result.subscribe((res: HttpResponse<DriveSecurity>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: DriveSecurity) {
        this.eventManager.broadcast({name: 'driveSecurityListModification', content: 'OK'});
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

    trackCountryById(index: number, item: Country) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-drive-security-popup',
    template: ''
})
export class DriveSecurityPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private driveSecurityPopupService: DriverPopupService
    ) {
    }

    ngOnInit() {
        this.routeSub = this.route.params.subscribe(params => {
            View.isView = !!params['view'];

            if (params['id']) {
                this.driveSecurityPopupService
                    .open(DriveSecurityDialogComponent as Component, params['id']);
            } else if (params['driverId']) {
                this.driveSecurityPopupService
                    .open(DriveSecurityDialogComponent as Component, null, params['driverId']);
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
