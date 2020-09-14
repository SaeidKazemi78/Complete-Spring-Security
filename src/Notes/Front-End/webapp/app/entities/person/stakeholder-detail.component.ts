import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { Stakeholder } from './stakeholder.model';
import { StakeholderService } from './stakeholder.service';

@Component({
    selector: 'jhi-stakeholder-detail',
    templateUrl: './stakeholder-detail.component.html'
})
export class StakeholderDetailComponent implements OnInit, OnDestroy {

    stakeholder: Stakeholder;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private stakeholderService: StakeholderService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe(params => {
            this.load(params['id']);
        });
        this.registerChangeInStakeholders();
    }

    load(id) {
        this.stakeholderService.find(id)
            .subscribe((stakeholderResponse: HttpResponse<Stakeholder>) => {
                this.stakeholder = stakeholderResponse.body;
            });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInStakeholders() {
        this.eventSubscriber = this.eventManager.subscribe(
            'stakeholderListModification',response => this.load(this.stakeholder.id)
        );
    }
}
