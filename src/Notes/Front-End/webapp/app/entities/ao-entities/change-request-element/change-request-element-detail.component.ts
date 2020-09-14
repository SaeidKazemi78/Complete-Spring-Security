import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {HttpResponse} from '@angular/common/http';
import {Subscription} from 'rxjs/Subscription';
import {JhiEventManager} from 'ng-jhipster';

import {ChangeRequestElement} from './change-request-element.model';
import {ChangeRequestElementService} from './change-request-element.service';

@Component({
    selector: 'jhi-change-request-element-detail',
    templateUrl: './change-request-element-detail.component.html'
})
export class ChangeRequestElementDetailComponent implements OnInit, OnDestroy {

    changeRequestElement: ChangeRequestElement;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private changeRequestElementService: ChangeRequestElementService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe(params => {
            this.load(params['id']);
        });
        this.registerChangeInChangeRequestElements();
    }

    load(id) {
        this.changeRequestElementService.find(id)
            .subscribe((changeRequestElementResponse: HttpResponse<ChangeRequestElement>) => {
                this.changeRequestElement = changeRequestElementResponse.body;
            });
    }

    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInChangeRequestElements() {
        this.eventSubscriber = this.eventManager.subscribe(
            'changeRequestElementListModification',response => this.load(this.changeRequestElement.id)
        );
    }
}
