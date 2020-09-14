import {Component, OnInit} from '@angular/core';
import {HttpErrorResponse, HttpResponse} from '@angular/common/http';
import {ActivatedRoute, Router} from '@angular/router';
import {Subscription} from 'rxjs/Subscription';
import {JhiAlertService, JhiParseLinks} from 'ng-jhipster';

import {Person, VerifyStatus} from './person.model';
import {PersonService} from './person.service';
import {Principal} from '../../shared';

import {LazyLoadEvent} from 'primeng/primeng';
import {TranslateService} from '@ngx-translate/core';

@Component({
    selector: 'jhi-person-finder',
    templateUrl: './person-finder.component.html'
})
export class PersonFinderComponent implements OnInit {

    object;
    code;

    constructor(private personService: PersonService,
                private parseLinks: JhiParseLinks,
                private jhiAlertService: JhiAlertService) {
    }

    search() {
        this.personService.finderByCode(this.code).subscribe(
            (res: HttpResponse<any>) => this.object = res.body,
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    ngOnInit() {

    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
