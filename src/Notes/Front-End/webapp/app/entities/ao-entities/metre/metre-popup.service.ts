import {Component, Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {NgbModal, NgbModalRef} from '@ng-bootstrap/ng-bootstrap';
import {HttpResponse} from '@angular/common/http';
import {Metre} from './metre.model';
import {MetreService} from './metre.service';
import {getPath} from 'app/core/router';

@Injectable({ providedIn: 'root' })
export class MetrePopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private modalService: NgbModal,
        private router: Router,
        private metreService: MetreService
    ) {
        this.ngbModalRef = null;
    }

    open(component: Component, id?: number | any, oilTankId?: number | any): Promise<NgbModalRef> {
        return new Promise<NgbModalRef>((resolve, reject) => {
            const isOpen = this.ngbModalRef !== null;
            if (isOpen) {
                resolve(this.ngbModalRef);
            }

            if (id) {
                this.metreService.find(id)
                    .subscribe((metreResponse: HttpResponse<Metre>) => {
                        const metre: Metre = metreResponse.body;
                        this.ngbModalRef = this.metreModalRef(component, metre);
                        resolve(this.ngbModalRef);
                    });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    const metre = new Metre();
                    metre.oilTankId = oilTankId;
                    metre.active = true;
                    this.ngbModalRef = this.metreModalRef(component, metre);
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    metreModalRef(component: Component, metre: Metre): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.metre = metre;
        modalRef.result.then(result => {
            this.closeModal(metre);
        },reason => {
            this.closeModal(metre);
        });
        return modalRef;
    }

    closeModal(metre) {
        this.router.navigate([...getPath(this.router, '/').pathParts, { outlets: { popup: null }}], { replaceUrl: true, queryParamsHandling: 'merge'});
        this.ngbModalRef = null;
    }

}
