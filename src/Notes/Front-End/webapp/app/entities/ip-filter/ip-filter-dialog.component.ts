import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';

import {Observable} from 'rxjs/Observable';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {JhiAlertService, JhiEventManager} from 'ng-jhipster';

import {IpFilter} from './ip-filter.model';
import {IpFilterPopupService} from './ip-filter-popup.service';
import {IpFilterService} from './ip-filter.service';
import {Location, LocationService} from '../location';
import {Region, RegionService} from '../region';
import {Person, PersonService} from '../person';
import {Customer, CustomerService} from '../customer';
import {CustomerType, CustomerTypeService} from '../customer-type';
import {HttpErrorResponse, HttpResponse} from '@angular/common/http';
import {ContractType} from '../sell-contract/sell-contract.model';
import {SellContractService} from '../sell-contract/sell-contract.service';

@Component({
    selector: 'jhi-ip-filter-dialog',
    templateUrl: './ip-filter-dialog.component.html'
})
export class IpFilterDialogComponent implements OnInit {

    ipFilter: IpFilter;
    isSaving: boolean;
    isView: boolean;

    locations: Location[];

    regions: Region[] = [];

    people: Person[];
    regexCode = '((^|\\.)((25[0-5])|(2[0-4]\\d)|(1\\d\\d)|([1-9]?\\d))){4}$';

    customers: Customer[];

    customertypes: CustomerType[];
    contractTypes: ContractType[] | null;

    constructor(public activeModal: NgbActiveModal,
                private jhiAlertService: JhiAlertService,
                private ipFilterService: IpFilterService,
                private locationService: LocationService,
                private sellContractService: SellContractService,
                private regionService: RegionService,
                private personService: PersonService,
                private customerService: CustomerService,
                private customerTypeService: CustomerTypeService,
                private eventManager: JhiEventManager) {
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
        if (this.ipFilter.id !== undefined) {
            this.subscribeToSaveResponse(
                this.ipFilterService.update(this.ipFilter));
        } else {
            this.subscribeToSaveResponse(
                this.ipFilterService.create(this.ipFilter));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<IpFilter>>) {
        result.subscribe((res: HttpResponse<IpFilter>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: IpFilter) {
        this.eventManager.broadcast({name: 'ipFilterListModification', content: 'OK'});
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
    selector: 'jhi-ip-filter-popup',
    template: ''
})
export class IpFilterPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(private route: ActivatedRoute,
                private ipFilterPopupService: IpFilterPopupService) {
    }

    ngOnInit() {
        this.routeSub = this.route.params.subscribe(params => {
            View.isView = !!params['view'];

            if (params['id'] && params['username']) {
                this.ipFilterPopupService
                    .open(IpFilterDialogComponent as Component, params['id'], params['username']);
            } else if (params['username']) {
                this.ipFilterPopupService
                    .open(IpFilterDialogComponent as Component, null, params['username']);
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
