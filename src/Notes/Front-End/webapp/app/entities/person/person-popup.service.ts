import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { DatePipe } from '@angular/common';
import { Person } from './person.model';
import { PersonService } from './person.service';
import {getPath} from 'app/core/router';

@Injectable({ providedIn: 'root' })
export class PersonPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
    private datePipe: DatePipe,
    private modalService: NgbModal,
    private router: Router,
    private personService: PersonService

    ) {
        this.ngbModalRef = null;
    }

    open(component: Component, id?: number | any, companyId?: number | any, status?: string): Promise<NgbModalRef> {
        return new Promise<NgbModalRef>((resolve, reject) => {
            const isOpen = this.ngbModalRef !== null;
            if (isOpen) {
                resolve(this.ngbModalRef);
            }

            if (id) {
                this.personService.find(id, companyId).subscribe(person => {
                    this.ngbModalRef = this.personModalRef(component, person.body, status);
                    resolve(this.ngbModalRef);
                });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    const person = new Person();
                    if (companyId) {
                        person.companyId = companyId;
                    }
                    this.ngbModalRef = this.personModalRef(component, person);
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    personModalRef(component: Component, person: Person, status?): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.person = person;
        modalRef.componentInstance.status = status;
        modalRef.result.then(result => {
            this.closeModal(person);
        },reason => {
            this.closeModal(person);
        });
        return modalRef;
    }

    closeModal(person) {
        this.router.navigate([...getPath(this.router, '/').pathParts, { outlets: { popup: null }}], { replaceUrl: true, queryParamsHandling: 'merge'});
        this.ngbModalRef = null;
    }

}
