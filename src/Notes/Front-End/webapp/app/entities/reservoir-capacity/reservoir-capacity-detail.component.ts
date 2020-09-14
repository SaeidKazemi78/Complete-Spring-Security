import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { ReservoirCapacity } from './reservoir-capacity.model';
import { ReservoirCapacityService } from './reservoir-capacity.service';

@Component({
    selector: 'jhi-reservoir-capacity-detail',
    templateUrl: './reservoir-capacity-detail.component.html'
})
export class ReservoirCapacityDetailComponent implements OnInit, OnDestroy {

    reservoirCapacity: ReservoirCapacity;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private reservoirCapacityService: ReservoirCapacityService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe(params => {
            this.load(params['id']);
        });
        this.registerChangeInReservoirCapacities();
    }

    load(id) {
        this.reservoirCapacityService.find(id)
            .subscribe((reservoirCapacityResponse: HttpResponse<ReservoirCapacity>) => {
                this.reservoirCapacity = reservoirCapacityResponse.body;
            });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInReservoirCapacities() {
        this.eventSubscriber = this.eventManager.subscribe(
            'reservoirCapacityListModification',response => this.load(this.reservoirCapacity.id)
        );
    }
}
