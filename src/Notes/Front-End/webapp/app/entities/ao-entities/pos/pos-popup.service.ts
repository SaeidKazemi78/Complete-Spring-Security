import {Component, Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {NgbModal, NgbModalRef} from '@ng-bootstrap/ng-bootstrap';
import {Pos} from './pos.model';
import {PosService} from './pos.service';
import {getPath} from 'app/core/router';

@Injectable({ providedIn: 'root' })
export class PosPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private modalService: NgbModal,
        private router: Router,
        private posService: PosService
    ) {
        this.ngbModalRef = null;
    }

    open(component: Component, id?: number | any, airportId?: number | any): Promise<NgbModalRef> {
        return new Promise<NgbModalRef>((resolve, reject) => {
            const isOpen = this.ngbModalRef !== null;
            if (isOpen) {
                resolve(this.ngbModalRef);
            }

            if (id) {
                this.posService.find(id).subscribe(pos => {
                    this.ngbModalRef = this.posModalRef(component, pos.body);
                    resolve(this.ngbModalRef);
                });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    const pos = new Pos();
                    pos.airportId = airportId;
                    this.ngbModalRef = this.posModalRef(component, pos);
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    posModalRef(component: Component, pos: Pos): NgbModalRef {
        const modalRef = this.modalService.open(component, {size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.pos = pos;
        modalRef.result.then(result => {
            this.router.navigate([...getPath(this.router, '/').pathParts, {outlets: {popup: null}}], {replaceUrl: true});
            this.ngbModalRef = null;
        },reason => {
            this.router.navigate([...getPath(this.router, '/').pathParts, {outlets: {popup: null}}], {replaceUrl: true});
            this.ngbModalRef = null;
        });
        return modalRef;
    }
}
