import {Component, Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {NgbModal, NgbModalRef} from '@ng-bootstrap/ng-bootstrap';
import {DatePipe} from '@angular/common';
import {Customer} from './customer.model';
import {CustomerService} from './customer.service';
import {getPath} from 'app/core/router';

@Injectable({ providedIn: 'root' })
export class CustomerPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(private datePipe: DatePipe,
                private modalService: NgbModal,
                private router: Router,
                private customerService: CustomerService) {
        this.ngbModalRef = null;
    }

    open(component: Component, id?: number | any): Promise<NgbModalRef> {
        return new Promise<NgbModalRef>((resolve, reject) => {
            const isOpen = this.ngbModalRef !== null;
            if (isOpen) {
                resolve(this.ngbModalRef);
            }

            if (id) {
                this.customerService.find(id).subscribe(customer => {
                    this.ngbModalRef = this.customerModalRef(component, customer.body);
                    resolve(this.ngbModalRef);
                },error1 => {

                });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    const customer2 = new Customer();
                    customer2.registerDate = Date.now();

                    this.ngbModalRef = this.customerModalRef(component, customer2);
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    customerModalRef(component: Component, customer: Customer): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.customer = customer;
        modalRef.result.then(result => {
            this.closeModal(customer);
        },reason => {
            this.closeModal(customer);
        });
        return modalRef;
    }

    closeModal(customer) {
        this.router.navigate([...getPath(this.router, '/').pathParts, { outlets: { popup: null }}], { replaceUrl: true, queryParamsHandling: 'merge'});
        this.ngbModalRef = null;
    }

}
