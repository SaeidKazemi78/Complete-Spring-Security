import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {HttpResponse} from '@angular/common/http';
import {Subscription} from 'rxjs/Subscription';
import {JhiEventManager} from 'ng-jhipster';

import {LastChangeDateElement} from './last-change-date-element.model';
import {LastChangeDateElementService} from './last-change-date-element.service';

@Component({
    selector: 'jhi-last-change-date-element-detail',
    templateUrl: './last-change-date-element-detail.component.html'
})
export class LastChangeDateElementDetailComponent implements OnInit, OnDestroy {

    lastChangeDateElement: LastChangeDateElement;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private lastChangeDateElementService: LastChangeDateElementService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe(params => {
            this.load(params['id']);
        });
        this.registerChangeInLastChangeDateElements();
    }

    load(id) {
        this.lastChangeDateElementService.find(id)
            .subscribe((lastChangeDateElementResponse: HttpResponse<LastChangeDateElement>) => {
                this.lastChangeDateElement = lastChangeDateElementResponse.body;
            });
    }

    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInLastChangeDateElements() {
        this.eventSubscriber = this.eventManager.subscribe(
            'lastChangeDateElementListModification',response => this.load(this.lastChangeDateElement.id)
        );
    }
}
