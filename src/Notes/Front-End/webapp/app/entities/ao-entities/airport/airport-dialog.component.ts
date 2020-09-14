import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {HttpErrorResponse, HttpResponse} from '@angular/common/http';

import {Observable} from 'rxjs/Observable';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {JhiAlertService, JhiEventManager} from 'ng-jhipster';

import {Airport} from './airport.model';
import {AirportPopupService} from './airport-popup.service';
import {AirportService} from './airport.service';
import {Region, RegionService} from '../../region/index';
import {Country, CountryService} from '../../country/index';
import {HotkeyService} from '../../../shared/hotkey/HotkeyService';
import {NgForm} from '@angular/forms';

@Component({
    selector: 'jhi-airport-dialog',
    templateUrl: './airport-dialog.component.html'
})
export class AirportDialogComponent implements OnInit {

    airport: Airport;
    isSaving: boolean;
    isView: boolean;
    countries: Country[];
    regions: Region[] = [];
    selectedAirport: any[];

    airports: any[];
    @ViewChild('editForm') editForm: NgForm;

    constructor(
        public activeModal: NgbActiveModal,
        private regionService: RegionService,
        private jhiAlertService: JhiAlertService,
        private airportService: AirportService,
        private eventManager: JhiEventManager,
        private hotKeyService: HotkeyService,
        private countryService: CountryService,
    ) {
        this.hotKeyService.add('enter', null, this.editForm, false);
    }

    ngOnInit() {
        this.isView = View.isView;
        this.isSaving = false;
        /*this.airportService.query()
            .subscribe((res: HttpResponse<Airport[]>) => {
                if (this.airport.id) {
                    this.airports = res.body.filter(value => value.id !== this.airport.id);
                } else {
                    this.airports = res.body;
                }
                for (let i = 0; i < this.airports.length; i++) {
                    this.airports[i].value = this.airports[i].id;
                    this.airports[i].label = this.airports[i].persianTitle;
                }
                if (this.airport.id) {
                    this.selectedAirport = [];
                    for (let i = 0; i < this.airport.targetAirports.length; i++) {
                        this.selectedAirport.push(this.airport.targetAirports[i]);
                    }
                }
            }, (res: HttpErrorResponse) => this.onError(res.message));*/
        this.countryService.findAll().subscribe(value => {
            this.countries = value.body;
            if (!this.airport.id) {
                const find = this.countries.find(v => v.checkNationalCode);
                if (find) {
                    this.airport.countryId = find.id;
                }
            }
        });
    }

    /*onChangeTargetAirport(data) {
        this.airport.targetAirports = [];
        console.log(this.selectedAirport);
        for (let i = 0; i < this.selectedAirport.length; i++) {
            for (let j = 0; j < this.airports.length; j++) {
                if (this.selectedAirport[i] === this.airports[j].id) {
                    this.airport.targetAirports[i] = this.airports[j].id;
                }
            }
        }
    }*/

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.airport.id !== undefined) {
            this.subscribeToSaveResponse(
                this.airportService.update(this.airport));
        } else {
            this.subscribeToSaveResponse(
                this.airportService.create(this.airport));
        }
    }

    trackCountryById(index: number, item: Country) {
        return item.id;
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<Airport>>) {
        result.subscribe((res: HttpResponse<Airport>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: Airport) {
        this.eventManager.broadcast({name: 'airportListModification', content: 'OK'});
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
    selector: 'jhi-airport-popup',
    template: ''
})
export class AirportPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private airportPopupService: AirportPopupService
    ) {
    }

    ngOnInit() {
        this.routeSub = this.route.params.subscribe(params => {
            View.isView = !!params['view'];

            if (params['id']) {
                this.airportPopupService
                    .open(AirportDialogComponent as Component, params['id']);
            } else {
                this.airportPopupService
                    .open(AirportDialogComponent as Component);
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
