import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { PlaqueRule } from './plaque-rule.model';
import { PlaqueRuleService } from './plaque-rule.service';
import {getPath} from 'app/core/router';

@Injectable({ providedIn: 'root' })
export class PlaqueRulePopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
    private modalService: NgbModal,
    private router: Router,
    private plaqueRuleService: PlaqueRuleService

    ) {
        this.ngbModalRef = null;
    }

    open(component: Component, id?: number | any, plaqueId?: number | any): Promise<NgbModalRef> {
        return new Promise<NgbModalRef>((resolve, reject) => {
            const isOpen = this.ngbModalRef !== null;
            if (isOpen) {
                resolve(this.ngbModalRef);
            }

            if (id) {
                this.plaqueRuleService.find(id).subscribe(plaqueRule => {
                    this.ngbModalRef = this.plaqueRuleModalRef(component, plaqueRule.body);
                    resolve(this.ngbModalRef);
                });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    const plaqueRule = new PlaqueRule();
                    plaqueRule.plaqueId = plaqueId;
                    this.ngbModalRef = this.plaqueRuleModalRef(component, plaqueRule);
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    plaqueRuleModalRef(component: Component, plaqueRule: PlaqueRule): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.plaqueRule = plaqueRule;
        modalRef.result.then(result => {
            this.closeModal(plaqueRule);
        },reason => {
            this.closeModal(plaqueRule);
        });
        return modalRef;
    }

    closeModal(plaqueRule) {
        this.router.navigate([...getPath(this.router, '/').pathParts, { outlets: { popup: null }}], { replaceUrl: true, queryParamsHandling: 'merge'});
        this.ngbModalRef = null;
    }

}
