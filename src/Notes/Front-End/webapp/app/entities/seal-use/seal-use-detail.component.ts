import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { SealUse } from './seal-use.model';
import { SealUseService } from './seal-use.service';

@Component({
    selector: 'jhi-seal-use-detail',
    templateUrl: './seal-use-detail.component.html'
})
export class SealUseDetailComponent implements OnInit, OnDestroy {

    sealUse: SealUse;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private sealUseService: SealUseService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe(params => {
            this.load(params['id']);
        });
        this.registerChangeInSealUses();
    }

    load(id) {
        this.sealUseService.find(id)
            .subscribe((sealUseResponse: HttpResponse<SealUse>) => {
                this.sealUse = sealUseResponse.body;
            });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInSealUses() {
        this.eventSubscriber = this.eventManager.subscribe(
            'sealUseListModification',response => this.load(this.sealUse.id)
        );
    }
}
