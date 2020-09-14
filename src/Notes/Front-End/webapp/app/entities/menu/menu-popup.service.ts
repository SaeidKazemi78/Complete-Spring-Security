import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { DatePipe } from '@angular/common';
import { Menu } from './menu.model';
import { MenuService } from './menu.service';
import {getPath} from 'app/core/router';

@Injectable({ providedIn: 'root' })
export class MenuPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
    private datePipe: DatePipe,
    private modalService: NgbModal,
    private router: Router,
    private menuService: MenuService

    ) {
        this.ngbModalRef = null;
    }

    open(component: Component, id?: number | any): Promise<NgbModalRef> {
        return new Promise<NgbModalRef>((resolve, reject) => {
            const isOpen = this.ngbModalRef !== null;
            if (isOpen) {
                resolve(this.ngbModalRef);
            }

            if (id) {
                this.menuService.find(id).subscribe(menu => {
                    this.ngbModalRef = this.menuModalRef(component, menu.body);
                    resolve(this.ngbModalRef);
                });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    const menu = new Menu();
                    this.ngbModalRef = this.menuModalRef(component, menu);
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    menuModalRef(component: Component, menu: Menu): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.menu = menu;
        modalRef.result.then(result => {
            this.closeModal(menu);
        },reason => {
            this.closeModal(menu);
        });
        return modalRef;
    }

    closeModal(menu) {
        this.router.navigate([...getPath(this.router, '/').pathParts, { outlets: { popup: null }}], { replaceUrl: true, queryParamsHandling: 'merge'});
        this.ngbModalRef = null;
    }

}
