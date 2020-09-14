import {Component, OnInit, OnDestroy} from '@angular/core';
import {ActivatedRoute} from '@angular/router';

import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {JhiEventManager} from 'ng-jhipster';

import {Person, Personality} from './person.model';
import {PersonPopupService} from './person-popup.service';
import {PersonService} from './person.service';
import {Country, CountryService} from '../country';
import {UserManagementService} from 'app/entities/user-management';
import {STRONG_PASSWORD} from 'app/shared/constants/regex.constants';

@Component({
    selector: 'jhi-person-create-user-dialog',
    templateUrl: './person-create-user-dialog.component.html'
})
export class PersonCreateUserDialogComponent implements OnInit {
    patternPassword  = STRONG_PASSWORD;
    person: Person;
    existUser: boolean;
    existEmail: boolean;
    Personality = Personality;
    country: Country | null;
    nationality: Country | null;
    isSaving;
    mode: string;

    constructor(
        private personService: PersonService,
        public activeModal: NgbActiveModal,
        private userService: UserManagementService,
        private countryService: CountryService,
        private eventManager: JhiEventManager
    ) {
    }

    checkUserExistByLogin(invalid) {
        if (this.person.username && !invalid) {
            this.userService.existUserByLogin(this.person.username)
                .subscribe(value => {
                    this.existUser = value.body;
                });
        }
    }

    checkUserExistByEmail() {
        if (this.person.email) {
            this.userService.existUserByEmail(this.person.email, this.mode === 'edit' ? this.person.username : null)
                .subscribe(value => {
                    this.existEmail = value.body;
                });
        }
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    createUser() {
        this.isSaving = true;

            this.personService.createUser(this.person).subscribe(response => {
                this.eventManager.broadcast({name: 'personListModification', content: 'OK'});
                this.activeModal.dismiss(true);
                this.isSaving = false;
            },error1 => {
                this.isSaving = false;
            });

    }

    ngOnInit(): void {
        this.mode = Mode.mode;
        this.checkUserExistByEmail();
        this.checkUserExistByLogin(this.person.username);
        if (this.person.countryId) {
            this.countryService.find(this.person.countryId).subscribe(value => {
                this.country = value.body;
            });
        } else {
            this.country = null;
        }
        if (this.person.nationalityId) {
            this.countryService.find(this.person.nationalityId).subscribe(value => {
                this.nationality = value.body;
            });
        } else {
            this.nationality = null;
        }

    }
}

@Component({
    selector: 'jhi-person-create-user-popup',
    template: ''
})
export class PersonCreateUserPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private personPopupService: PersonPopupService
    ) {
    }

    ngOnInit() {
        this.routeSub = this.route.params.subscribe(params => {
            Mode.mode = params['mode'];
            this.personPopupService
                .open(PersonCreateUserDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
class Mode {
    static mode: string;
}
