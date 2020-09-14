import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { AirplaneModel } from './airplane-model.model';
import { AirplaneModelService } from './airplane-model.service';

@Component({
    selector: 'jhi-airplane-model-detail',
    templateUrl: './airplane-model-detail.component.html'
})
export class AirplaneModelDetailComponent implements OnInit, OnDestroy {

    airplaneModel: AirplaneModel;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private airplaneModelService: AirplaneModelService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe(params => {
            this.load(params['id']);
        });
        this.registerChangeInAirplaneModels();
    }

    load(id) {
        this.airplaneModelService.find(id)
            .subscribe((airplaneModelResponse: HttpResponse<AirplaneModel>) => {
                this.airplaneModel = airplaneModelResponse.body;
            });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInAirplaneModels() {
        this.eventSubscriber = this.eventManager.subscribe(
            'airplaneModelListModification',response => this.load(this.airplaneModel.id)
        );
    }
}
