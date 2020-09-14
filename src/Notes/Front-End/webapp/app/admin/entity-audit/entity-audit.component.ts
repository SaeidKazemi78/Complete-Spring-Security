import {Component, OnInit} from '@angular/core';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {JhiAlertService} from 'ng-jhipster';

import {EntityAuditService} from './entity-audit.service';
import {EntityAuditEvent} from './entity-audit-event.model';
import {EntityAuditModalComponent} from './entity-audit-modal.component';

@Component({
    selector: 'jhi-entity-audit',
    templateUrl: './entity-audit.component.html',
    styles: [`
        .code {
            background: #dcdada;
            padding: 10px;
        }
    `]
})
export class EntityAuditComponent implements OnInit {
    audits: EntityAuditEvent[];
    entities: string[] = [];
    selectedEntity: string;
    limits = [25, 50, 100, 200];
    selectedLimit = this.limits[0];
    loading = false;
    filterEntityId = '';
    orderProp: string;
    reverse = false;
    microServiceName: string;
    startTime: any;
    endTime: any;
    package: any;
    ip: string;
    convertedArr = [];
    username: string;
    usernames: any[];
    id: number;
    actions: string;
    eventOptions: any[] = [];

    constructor(
        private modalService: NgbModal,
        private service: EntityAuditService,
        private alertService: JhiAlertService
    ) {
        this.eventOptions.push({label: '', value: null});
        this.eventOptions.push({label: 'ایجاد', value: 'INITIAL'});
        this.eventOptions.push({label: 'ویرایش', value: 'UPDATE'});
        this.eventOptions.push({label: 'حذف', value: 'TERMINAL'});
    }

    ngOnInit() {
    }

    loadChanges() {
        this.loading = true;
        this.service.findByEntity(this.microServiceName, this.selectedEntity, this.username, this.selectedLimit, this.startTime, this.endTime, this.actions, this.ip, this.id)
            .subscribe(audits => {
                this.audits = audits.body.map(it => {
                    it.entityValue = JSON.parse(it.entityValue);
                    return it;
                });
                this.loading = false;
            }, err => this.loading = false);
    }

    trackId(index: number, item: EntityAuditEvent) {
        return item.id;
    }

    openChange(audit: EntityAuditEvent) {

        const modalRef = this.modalService.open(EntityAuditModalComponent);
        modalRef.componentInstance.openChange(this.microServiceName, audit, audit.commitVersion < 2);
    }

    onChangeMicroService(data) {
        this.entities = [];
        this.convertedArr = [];
        this.selectedEntity = null;
        this.microServiceName = data;
        this.service.getAllAudited(data).subscribe(entities => {
            this.entities = entities;
            this.entities.forEach(value => {
                const arr = value.split('.');
                let name = arr[arr.length - 1];
                name = name.charAt(0).toLowerCase() + name.substring(1, name.length);
                let packageName = '';
                for (let i = 0; i < arr.length; i++) {
                    if (i !== arr.length - 1) {
                        packageName += arr[i] + '.';
                    } else {
                        packageName += arr[i];
                    }
                }
                this.convertedArr.push({
                    name,
                    packageName
                });

                console.log(name);
                console.log(packageName);
            });
            /* for (let i = 0; i < convertedArr.length - 1; i++) {
                 if (i !== convertedArr.length - 1) {
                     this.package += convertedArr[i] + '.';
                 } else {
                     this.package += convertedArr[i];
                 }
             }
             console.log(this.package);
             this.entities = convertedArr;*/
        });
    }

    camelize(str) {
        return str.replace(/(?:^\w|[A-Z]|\b\w)/g, function (letter, index) {
            return index === 0 ? letter.toLowerCase() : letter.toUpperCase();
        }).replace(/\s+/g, '');
    }
}
