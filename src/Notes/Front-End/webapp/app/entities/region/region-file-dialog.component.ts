import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';

import {Observable} from 'rxjs/Observable';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {JhiAlertService, JhiEventManager} from 'ng-jhipster';

import {Region} from './region.model';
import {RegionPopupService} from './region-popup.service';
import {RegionService} from './region.service';
import {Location, LocationService} from '../location';
import {HttpErrorResponse, HttpResponse} from '@angular/common/http';
import {CookieService} from 'ngx-cookie';
import {SERVER_API_URL} from '../../app.constants';

@Component({
    selector: 'jhi-region-file-dialog',
    templateUrl: './region-file-dialog.component.html'
})
export class RegionFileDialogComponent implements OnInit {

    isSaving: boolean;
    isView: boolean;
    uploadUrl = SERVER_API_URL + '/niopdcbase/api/regions/excel';

    constructor(public activeModal: NgbActiveModal,
                private jhiAlertService: JhiAlertService,
                private regionService: RegionService,
                private locationService: LocationService,
                private eventManager: JhiEventManager,
                private cookieService: CookieService) {
    }

    ngOnInit() {
        this.isSaving = false;
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
/*
        let fileBrowser = this.fileInput.nativeElement;
        if (fileBrowser.files && fileBrowser.files[0]) {
            const formData = new FormData();
            formData.append('image', fileBrowser.files[0]);
            this.projectService.upload(formData, this.project.id).subscribe(res => {
                // do stuff w/my uploaded file
            });
        }*/

        /*if (this.region.id !== undefined) {
            this.subscribeToSaveResponse(
                this.regionService.update(this.region));
        } else {
            this.subscribeToSaveResponse(
                this.regionService.create(this.region));
        }*/
    }

    trackRegionById(index: number, item: Region) {
        return item.id;
    }

    trackLocationById(index: number, item: Location) {
        return item.id;
    }

    getSelected(selectedVals: Array<any>, option: any) {
        if (selectedVals) {
            for (let i = 0; i < selectedVals.length; i++) {
                if (option.id === selectedVals[i].id) {
                    return selectedVals[i];
                }
            }
        }
        return option;
    }
    myUploader(event, i) {
        console.log(event.file);
        console.log(i);
        // event.files == files to upload
    }

    onBeforeSend(event: any) {
        event.xhr.open('POST', this.uploadUrl, true);

        event.xhr.setRequestHeader('X-XSRF-TOKEN', this.cookieService.get('XSRF-TOKEN'));
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<Region>>) {
        result.subscribe((res: HttpResponse<Region>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: Region) {
        this.eventManager.broadcast({name: 'regionListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }
}

@Component({
    selector: 'jhi-region-file-popup',
    template: ''
})
export class RegionFilePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(private route: ActivatedRoute,
                private regionPopupService: RegionPopupService) {
    }

    ngOnInit() {
        this.routeSub = this.route.params.subscribe(params => {
            this.regionPopupService
                .open(RegionFileDialogComponent as Component, null, null, params['countryId']);
        });

    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
