import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {HttpErrorResponse, HttpResponse} from '@angular/common/http';

import {Observable} from 'rxjs/Observable';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {JhiAlertService, JhiEventManager} from 'ng-jhipster';

import {Location, TranshipType} from './location.model';
import {LocationPopupService} from './location-popup.service';
import {LocationService} from './location.service';
import {Depot} from '../depot';
import {TranslateService} from '@ngx-translate/core';
import {Country, CountryService} from '../country';
import {RateGroup, RateGroupService} from '../rate-group';
import {NiopdcBankAccountType, NiopdcBankAccountTypeService} from '../niopdc-bank-account-type';

@Component({
    styleUrls: ['./location-dialog.css'],
    selector: 'jhi-location-dialog',
    templateUrl: './location-dialog.component.html'
})
export class LocationDialogComponent implements OnInit {

    regexCode = /^[\d]{2}$/;
    location: Location;
    isSaving: boolean;
    isView: boolean;
    depot: any;
    // selectedDepots: number[];
    hiddenFinancialCode: boolean;
    placeholder: string;
    title: string;
    parentLocation: Location;
    parentCode = '';
    codeLen = 2;

    countries: Country[] = [];
    customCountries: any[];

    rateGroups: RateGroup[] = [];
    customRateGroups: any[];

    niopdcbankaccounttypes: NiopdcBankAccountType[];
    customBankAccountType: any[];
    TranshipType = TranshipType;

    constructor(public activeModal: NgbActiveModal,
                private rateGroupService: RateGroupService,
                private jhiAlertService: JhiAlertService,
                private niopdcBankAccountTypeService: NiopdcBankAccountTypeService,
                private locationService: LocationService,
                private countryService: CountryService,
                private translateService: TranslateService,
                private eventManager: JhiEventManager) {
    }

    ngOnInit() {
        this.isView = View.isView;
        this.isSaving = false;
        this.niopdcBankAccountTypeService.query()
            .subscribe((res: HttpResponse<NiopdcBankAccountType[]>) => {
                this.niopdcbankaccounttypes = res.body;
                this.customBankAccountType = [];
                for (let i = 0; i < this.niopdcbankaccounttypes.length; i++) {
                    this.customBankAccountType.push({
                        value: this.niopdcbankaccounttypes[i].id,
                        label: this.niopdcbankaccounttypes[i].title
                    });
                }
            }, (res: HttpErrorResponse) => this.onError(res.message));
        if (this.location.locationId) {
            this.locationService.queryByRecursiveToUp(this.location.locationId).subscribe(locations => {
                this.parentCode = locations.body.map(value => value.code).reduce((previousValue, currentValue) => {
                    return previousValue + currentValue;
                });
                this.parentLocation = locations.body.sort((a, b) => {
                    return b.level - a.level;
                })[0];

                if (this.parentLocation.level === 0) {
                    this.hiddenFinancialCode = true;
                    this.location.financialCode = null;
                } else {
                    this.hiddenFinancialCode = false;
                }
            });
            if (this.location.level === 3) {

                this.countryService.findAll()
                    .subscribe(value => {
                        this.countries = value.body.filter(value1 => !value1.checkNationalCode);
                        const country = {
                            value: '',
                            label: ''
                        };
                        this.customCountries = [];
                        this.customCountries.push(country);
                        for (let i = 0; i < this.countries.length; i++) {
                            this.customCountries.push({
                                value: this.countries[i].id,
                                label: this.countries[i].name
                            });
                        }
                    });
            }
        }
        if ((!this.location.id || (this.location.id && !this.location.country)) && this.location.level === 3) {
            this.location.country = new Country();
        }
        this.returnTitle();
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        if (this.parentLocation && this.parentLocation.level === 0) {
            this.location.startOrderNumber = null;
            this.location.currentOrderNumber = null;
            this.location.endOrderNumber = null;
        }
        if (this.location.transhipType === this.TranshipType[this.TranshipType.INSIDE_TO_INSIDE]) {
            this.location.beforeControl = null;
        }
        this.isSaving = true;
        if (this.location.id !== undefined) {
            this.subscribeToSaveResponse(
                this.locationService.update(this.location));
        } else {
            this.subscribeToSaveResponse(
                this.locationService.create(this.location));
        }
    }

    onChangeCountry(data) {
        this.countries.forEach(country => {
            if (country.id === data) {
                this.location.country = country;
            }
        });
    }

    changeStartOrderNumber(data) {
        this.location.currentOrderNumber = data;
    }

    trackLocationById(index: number, item: Location) {
        return item.id;
    }

    trackDepotById(index: number, item: Depot) {
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

    private subscribeToSaveResponse(result: Observable<HttpResponse<Location>>) {
        result.subscribe((res: HttpResponse<Location>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: Location) {
        this.eventManager.broadcast({name: 'locationListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }

    returnTitle() {
        let result = '';
        if (!this.location.id) {
            result = 'niopdcgatewayApp.location.home.createLabel';
            if (this.location.locationId) {
                this.locationService.find(this.location.locationId)
                    .subscribe((res: HttpResponse<Location>) => {
                        if (res.body.level === 0) {
                            result += 'Area';
                        } else if (res.body.level === 1) {
                            result += 'Zone';
                        } else if (res.body.level === 2) {
                            result += 'BoundarySell';
                        }
                        this.translateService.get(result).subscribe(title => {
                            this.title = title;
                        });
                    });

            } else {
                this.translateService.get(result).subscribe(title => {
                    this.title = title;
                });
            }
        } else if (this.location.id && !this.isView) {
            result = 'niopdcgatewayApp.location.home.createOrEditLabel';
            if (this.location.locationId) {
                this.locationService.find(this.location.locationId)
                    .subscribe((res: HttpResponse<Location>) => {
                        if (res.body.level === 0) {
                            result += 'Area';
                        } else if (res.body.level === 1) {
                            result += 'Zone';
                        } else if (res.body.level === 1) {
                            result += 'BoundarySell';
                        } else if (res.body.level === 2) {
                            result += 'BoundarySell';
                        }
                        this.translateService.get(result).subscribe(title => {
                            this.title = title;
                        });
                    });

            } else {
                this.translateService.get(result).subscribe(title => {
                    this.title = title;
                });
            }
        } else if (this.location.id && this.isView) {
            result = 'niopdcgatewayApp.location.home.view';
            if (this.location.locationId) {
                this.locationService.find(this.location.locationId)
                    .subscribe((res: HttpResponse<Location>) => {
                        if (res.body.level === 0) {
                            result += 'Area';
                        } else if (res.body.level === 1) {
                            result += 'Zone';
                        } else if (res.body.level === 2) {
                            result += 'BoundarySell';
                        }
                        this.translateService.get(result).subscribe(title => {
                            this.title = title;
                        });
                    });
            } else {
                this.translateService.get(result).subscribe(title => {
                    this.title = title;
                });
            }
        }
    }
}

@Component({
    selector: 'jhi-location-popup',
    template: ''
})
export class LocationPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(private route: ActivatedRoute,
                private locationPopupService: LocationPopupService) {
    }

    ngOnInit() {
        this.routeSub = this.route.params.subscribe(params => {
            View.isView = !!params['view'];

            if (params['id']) {
                this.locationPopupService
                    .open(LocationDialogComponent as Component, params['id']);
            } else if (params['locationId']) {
                this.locationPopupService
                    .open(LocationDialogComponent as Component, null, params['locationId']);
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
