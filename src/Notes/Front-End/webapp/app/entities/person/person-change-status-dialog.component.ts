import {Component, OnInit, OnDestroy} from '@angular/core';
import {ActivatedRoute} from '@angular/router';

import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {JhiEventManager} from 'ng-jhipster';

import {Person} from './person.model';
import {PersonPopupService} from './person-popup.service';
import {PersonService} from './person.service';

@Component({
    selector: 'jhi-person-change-status-dialog',
    templateUrl: './person-change-status-dialog.component.html'
})
export class PersonChangeStatusDialogComponent {

    person: Person;
    status: string;

    constructor(
        private personService: PersonService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {

    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirm(id: number) {
        if (this.status === 'active') {
            this.personService.active(id).subscribe(response => {
                this.eventManager.broadcast({name: 'personListModification', content: 'OK'});
                this.activeModal.dismiss(true);
            });
        } else if (this.status === 'de-active') {
            this.personService.deActive(id).subscribe(response => {
                this.eventManager.broadcast({name: 'personListModification', content: 'OK'});
                this.activeModal.dismiss(true);
            });
        } else if (this.status === 'reject') {
            this.personService.reject(id).subscribe(response => {
                this.eventManager.broadcast({name: 'personListModification', content: 'OK'});
                this.activeModal.dismiss(true);
            });
        }
    }
}

@Component({
    selector: 'jhi-person-change-status-popup',
    template: ''
})
export class PersonChangeStatusPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private personPopupService: PersonPopupService
    ) {
    }

    ngOnInit() {

        this.routeSub = this.route.params.subscribe(params => {
            this.route.data.subscribe(data => {
                status = data['status'];
                console.log(status);
                this.personPopupService
                    .open(PersonChangeStatusDialogComponent as Component, params['id'], null, status);
            });
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
