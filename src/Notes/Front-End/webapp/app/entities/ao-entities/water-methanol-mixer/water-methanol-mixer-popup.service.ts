import {Component, Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {NgbModal, NgbModalRef} from '@ng-bootstrap/ng-bootstrap';
import {HttpResponse} from '@angular/common/http';
import {WaterMethanolMixer} from './water-methanol-mixer.model';
import {WaterMethanolMixerService} from './water-methanol-mixer.service';

@Injectable({ providedIn: 'root' })
export class WaterMethanolMixerPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private modalService: NgbModal,
        private router: Router,
        private waterMethanolMixerService: WaterMethanolMixerService
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
                this.waterMethanolMixerService.find(id)
                    .subscribe((waterMethanolMixerResponse: HttpResponse<WaterMethanolMixer>) => {
                        const waterMethanolMixer: WaterMethanolMixer = waterMethanolMixerResponse.body;
                        this.ngbModalRef = this.waterMethanolMixerModalRef(component, waterMethanolMixer);
                        resolve(this.ngbModalRef);
                    });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    const waterMethanolMixer = new WaterMethanolMixer();
                    this.ngbModalRef = this.waterMethanolMixerModalRef(component, waterMethanolMixer);
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    waterMethanolMixerModalRef(component: Component, waterMethanolMixer: WaterMethanolMixer): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.waterMethanolMixer = waterMethanolMixer;
        modalRef.result.then(result => {
            this.closeModal(waterMethanolMixer);
        },reason => {
            this.closeModal(waterMethanolMixer);
        });
        return modalRef;
    }

    closeModal(waterMethanolMixer) {
        this.router.navigate(['water-methanol-mixer', { outlets: { popup: null }}], { replaceUrl: true, queryParamsHandling: 'merge'});
        this.ngbModalRef = null;
    }

}
