import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';

import {Observable} from 'rxjs/Observable';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {JhiAlertService, JhiEventManager} from 'ng-jhipster';

import {UserToken} from './user-token.model';
import {UserTokenPopupService} from './user-token-popup.service';
import {UserTokenService} from './user-token.service';
import {Location, LocationService} from '../location';
import {Region, RegionService} from '../region';
import {Person, PersonService} from '../person';
import {Customer, CustomerService} from '../customer';
import {CustomerType, CustomerTypeService} from '../customer-type';
import {HttpErrorResponse, HttpResponse} from '@angular/common/http';
import {ContractType} from '../sell-contract/sell-contract.model';
import {SellContractService} from '../sell-contract/sell-contract.service';

@Component({
    selector: 'jhi-user-token-dialog',
    templateUrl: './user-token-dialog.component.html'
})
export class UserTokenDialogComponent implements OnInit {

    userToken: UserToken;
    isSaving: boolean;
    isView: boolean;

    locations: Location[];

    regions: Region[] = [];

    people: Person[];
    regexCode= '((^|\\.)((25[0-5])|(2[0-4]\\d)|(1\\d\\d)|([1-9]?\\d))){4}$';

    customers: Customer[];

    customertypes: CustomerType[];
    contractTypes: ContractType[] | null;

    constructor(public activeModal: NgbActiveModal,
                private jhiAlertService: JhiAlertService,
                private userTokenService: UserTokenService,
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
        if (this.userToken.id !== undefined) {
            this.subscribeToSaveResponse(
                this.userTokenService.update(this.userToken));
        } else {
            this.subscribeToSaveResponse(
                this.userTokenService.create(this.userToken));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<UserToken>>) {
        result.subscribe((res: HttpResponse<UserToken>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: UserToken) {
        this.eventManager.broadcast({name: 'userTokenListModification', content: 'OK'});
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
    selector: 'jhi-user-token-popup',
    template: ''
})
export class UserTokenPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(private route: ActivatedRoute,
                private userTokenPopupService: UserTokenPopupService) {
    }

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            View.isView = !!params['view'];

            if (params['id'] && params['username']) {
                this.userTokenPopupService
                    .open(UserTokenDialogComponent as Component, params['id'], params['username']);
            } else if (params['username']) {
                this.userTokenPopupService
                    .open(UserTokenDialogComponent as Component, null, params['username']);
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
