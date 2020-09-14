import {Component, ElementRef, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {HttpErrorResponse, HttpResponse} from '@angular/common/http';

import {Observable} from 'rxjs/Observable';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {JhiAlertService, JhiDataUtils, JhiEventManager} from 'ng-jhipster';

import {MenuPopupService} from './menu-popup.service';
import {MenuService} from './menu.service';
import {Location} from '../location/location.model';
import {LocationService} from '../location/location.service';
import {Principal} from 'app/shared';
import {Menu} from 'app/entities/menu/menu.model';
import {ParentAuthority, ParentAuthorityService} from 'app/entities/parent-authority';
import {MainAuthority} from 'app/entities/main-authority';
import {FormControl} from '@angular/forms';

@Component({
    selector: 'jhi-menu-dialog',
    templateUrl: './menu-dialog.component.html'
})
export class MenuDialogComponent implements OnInit {

    menu: Menu;
    isSaving: boolean;
    isView: boolean;
    parentAuthorities: ParentAuthority[];
    authorities: any[];
    iconCss = new FormControl();
    fallbackIcon = 'fas fa-user';
    icon: string;

    constructor(public activeModal: NgbActiveModal,
                private dataUtils: JhiDataUtils,
                private jhiAlertService: JhiAlertService,
                private menuService: MenuService,
                private locationService: LocationService,
                private principal: Principal,
                private elementRef: ElementRef,
                private eventManager: JhiEventManager,
                private parentAuthorityService: ParentAuthorityService
    ) {
    }

    ngOnInit() {
        this.isView = View.isView;
        if (!this.menu.id) {
            this.menu.level = View.lvl;
            this.menu.parentId = !View.parentId ? null : View.parentId;
        } else {
            this.authorities = this.menu.auth.map(s => new MainAuthority(s));
        }
        this.parentAuthorityService.query(
            {
                sort: ['persianName,asc']
            }
        ).subscribe(
            (res: HttpResponse<ParentAuthority[]>) => {
                this.parentAuthorities = res.body;
            }, (res: HttpErrorResponse) => this.onError(res.message));
    }

    onIconPickerSelect(icon: string): void {
        this.menu.icon = icon;
        this.iconCss.setValue(icon);
    }

    save() {
        this.isSaving = true;
        if (this.menu.id !== undefined) {
            this.subscribeToSaveResponse(
                this.menuService.update(this.menu));
        } else {
            this.subscribeToSaveResponse(
                this.menuService.create(this.menu));
        }
    }

    trackLocationById(index: number, item: Location) {
        return item.id;
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<Menu>>) {
        result.subscribe((res: HttpResponse<Menu>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: Menu) {
        this.eventManager.broadcast({name: 'menuListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }

    authoritiesSelected(event: any[]) {
        this.menu.auth = event.map(value => value.name);
    }
}

@Component({
    selector: 'jhi-menu-popup',
    template: ''
})
export class MenuPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(private route: ActivatedRoute,
                private menuPopupService: MenuPopupService) {
    }

    ngOnInit() {
        this.routeSub = this.route.params.subscribe(params => {
            View.isView = !!params['view'];
            View.lvl = params['lvl'];
            View.parentId = params['parentId'];
            if (params['parentId'] === 'NaN') {
                View.parentId = null;
            }

            if (params['id']) {
                this.menuPopupService
                    .open(MenuDialogComponent as Component, params['id']);
            } else {
                this.menuPopupService
                    .open(MenuDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}

class View {
    static isView: boolean;
    static parentId: number;
    static lvl: number;
}
