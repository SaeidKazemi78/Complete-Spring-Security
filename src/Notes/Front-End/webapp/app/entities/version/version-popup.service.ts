import {Component, Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {NgbModal, NgbModalRef} from '@ng-bootstrap/ng-bootstrap';
import {DatePipe} from '@angular/common';
import {Version} from './version.model';
import {VersionService} from './version.service';
import {getPath} from 'app/core/router';

@Injectable({providedIn: 'root'})
export class VersionPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private datePipe: DatePipe,
        private modalService: NgbModal,
        private router: Router,
        private versionService: VersionService
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
                this.versionService.find(id).subscribe(version => {
                    this.ngbModalRef = this.versionModalRef(component, version.body);
                    resolve(this.ngbModalRef);
                });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    const version = new Version();
                    this.ngbModalRef = this.versionModalRef(component, version);
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    versionModalRef(component: Component, version: Version): NgbModalRef {
        const modalRef = this.modalService.open(component, {size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.version = version;
        modalRef.result.then(result => {
            this.closeModal(version);
        }, reason => {
            this.closeModal(version);
        });
        return modalRef;
    }

    closeModal(version) {
        const router = getPath(this.router, '/').pathParts;
        if (router.includes('version')) {
            this.router.navigate([...router, {outlets: {popup: null}}], {replaceUrl: true, queryParamsHandling: 'merge'});
        } else {
            this.router.navigate(['/']);
        }
        this.ngbModalRef = null;
    }

}
