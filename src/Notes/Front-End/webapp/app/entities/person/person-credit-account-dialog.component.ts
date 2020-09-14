import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';

import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {JhiEventManager} from 'ng-jhipster';
import {Person, Personality} from './person.model';
import {PersonService} from './person.service';
import {PersonPopupService} from './person-popup.service';

@Component({
    selector: 'jhi-person-credit-account-dialog',
    templateUrl: './person-credit-account-dialog.component.html'
})
export class PersonCreditAccountDialogComponent implements OnInit {

    person: Person;
    Personality = Personality;

    constructor(
        private personService: PersonService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.personService.updateCreditAccount(this.person).subscribe(response => {
            this.eventManager.broadcast({
                name: 'personListModification',
                content: 'Deleted an customer'
            });
            this.activeModal.dismiss(true);
        });
    }

    ngOnInit(): void {

    }
}

@Component({
    selector: 'jhi-person-credit-account-popup',
    template: ''
})
export class PersonCreditAccountPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private personPopupService: PersonPopupService
    ) {
    }

    ngOnInit() {
        this.routeSub = this.route.params.subscribe(params => {
            this.personPopupService
                .open(PersonCreditAccountDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
