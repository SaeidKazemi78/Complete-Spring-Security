import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';

import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {JhiEventManager} from 'ng-jhipster';

import {WaterMethanolMixer} from './water-methanol-mixer.model';
import {WaterMethanolMixerPopupService} from './water-methanol-mixer-popup.service';
import {WaterMethanolMixerService} from './water-methanol-mixer.service';

@Component({
    selector: 'jhi-water-methanol-mixer-delete-dialog',
    templateUrl: './water-methanol-mixer-delete-dialog.component.html'
})
export class WaterMethanolMixerDeleteDialogComponent {

    waterMethanolMixer: WaterMethanolMixer;

    constructor(
        private waterMethanolMixerService: WaterMethanolMixerService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.waterMethanolMixerService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'waterMethanolMixerListModification',
                content: 'Deleted an waterMethanolMixer'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-water-methanol-mixer-delete-popup',
    template: ''
})
export class WaterMethanolMixerDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private waterMethanolMixerPopupService: WaterMethanolMixerPopupService
    ) {
    }

    ngOnInit() {
        this.routeSub = this.route.params.subscribe(params => {
            this.waterMethanolMixerPopupService
                .open(WaterMethanolMixerDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
