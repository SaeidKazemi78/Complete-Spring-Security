import {Component, OnInit, OnDestroy, ViewChild} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {HttpResponse, HttpErrorResponse} from '@angular/common/http';

import {Observable} from 'rxjs/Observable';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {JhiEventManager} from 'ng-jhipster';

import {Country} from './country.model';
import {CountryPopupService} from './country-popup.service';
import {CountryService} from './country.service';
import {HotkeysService, Hotkey} from 'angular2-hotkeys';
import {NgForm} from '@angular/forms';

@Component({
    selector: 'jhi-country-dialog',
    templateUrl: './country-dialog.component.html'
})
export class CountryDialogComponent implements OnInit {

    regexCode = /^\d{1,4}$/;
    country: Country;
    isSaving: boolean;
    isView: boolean;

    @ViewChild('editForm') editForm: NgForm;

    constructor(
        public activeModal: NgbActiveModal,
        private _hotkeysService: HotkeysService,
        private countryService: CountryService,
        private eventManager: JhiEventManager
    ) {
        this._hotkeysService.add(new Hotkey(['ins', 'enter'], (event: KeyboardEvent, k: string): boolean => {
           if (k === 'enter') {
                this.editForm.onSubmit(null);
                return false;
            }
        }));

    }

    ngOnInit() {
        this.isView = View.isView;
        this.isSaving = false;
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.country.id !== undefined) {
            this.subscribeToSaveResponse(
                this.countryService.update(this.country));
        } else {
            this.subscribeToSaveResponse(
                this.countryService.create(this.country));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<Country>>) {
        result.subscribe((res: HttpResponse<Country>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: Country) {
        this.eventManager.broadcast({name: 'countryListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }
}

@Component({
    selector: 'jhi-country-popup',
    template: ''
})
export class CountryPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private countryPopupService: CountryPopupService
    ) {
    }

    ngOnInit() {
        this.routeSub = this.route.params.subscribe(params => {
            View.isView = !!params['view'];
            if (params['id']) {
                this.countryPopupService
                    .open(CountryDialogComponent as Component, params['id']);
            } else {
                this.countryPopupService
                    .open(CountryDialogComponent as Component);
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
