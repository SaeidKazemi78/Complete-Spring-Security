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

@Component({
    selector: 'jhi-region-dialog',
    templateUrl: './region-dialog.component.html',
    styleUrls: ['./region-dialog.css']
})
export class RegionDialogComponent implements OnInit {

    codeLen = 2;
    regexCode = /^[\d]{2}$/;
    region: Region;
    isSaving: boolean;
    isView: boolean;

    parentCodeLen: number;

    constructor(public activeModal: NgbActiveModal,
                private jhiAlertService: JhiAlertService,
                private regionService: RegionService,
                private locationService: LocationService,
                private eventManager: JhiEventManager) {
    }

    ngOnInit() {
        this.isView = View.isView;
        this.isSaving = false;

        switch (this.region.level) {
            case 0:
                this.codeLen = 2;
                this.parentCodeLen = 0;
                this.regexCode = /^[\d]{2}$/;
                break;
            case 1:
                this.codeLen = 2;
                this.parentCodeLen = 2;
                this.regexCode = /^[\d]{2}$/;
                break;
            case 2:
                this.codeLen = 2;
                this.parentCodeLen = 4;
                this.regexCode = /^[\d]{2}$/;
                break;
            case 3:
                this.codeLen = 4;
                this.parentCodeLen = 6;
                this.regexCode = /^[\d]{4}$/;
                break;
            case 4:
                this.codeLen = 6;
                this.parentCodeLen = 10;
                this.regexCode = /^[\d]{6}$/;
                break;
        }

        if (this.region.id) {
            this.region.parentCode = this.region.code.substring(0, this.parentCodeLen);
            this.region.code = this.region.code.substring(this.parentCodeLen);
        }
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.region.code = this.region.parentCode + this.region.code;
        this.isSaving = true;
        if (this.region.id !== undefined) {
            this.subscribeToSaveResponse(
                this.regionService.update(this.region));
        } else {
            this.subscribeToSaveResponse(
                this.regionService.create(this.region));
        }
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

    private subscribeToSaveResponse(result: Observable<HttpResponse<Region>>) {
        result.subscribe((res: HttpResponse<Region>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: Region) {
        this.region.code = this.region.code.substring(this.parentCodeLen);
        this.eventManager.broadcast({name: 'regionListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.region.code = this.region.code.substring(this.parentCodeLen);
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }
}

@Component({
    selector: 'jhi-region-popup',
    template: ''
})
export class RegionPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(private route: ActivatedRoute,
                private regionPopupService: RegionPopupService) {
        console.log('ddddddddddddddddddddddddddd');
    }

    ngOnInit() {
        this.routeSub = this.route.params.subscribe(params => {
            View.isView = !!params['view'];

            if (params['id']) {
                this.regionPopupService
                    .open(RegionDialogComponent as Component, params['id']);
            } else if (params['parent']) {
                if (params['parent'] === 'region') {
                    this.regionPopupService
                        .open(RegionDialogComponent as Component, null, params['parentId'], params['countryId']);
                } else {
                    this.regionPopupService
                        .open(RegionDialogComponent as Component, null, null, params['parentId']);
                }

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
