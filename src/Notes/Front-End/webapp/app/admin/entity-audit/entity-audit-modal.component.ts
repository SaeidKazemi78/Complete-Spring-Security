import {Component} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';

import {EntityAuditService} from './entity-audit.service';
import {EntityAuditEvent} from './entity-audit-event.model';
import {TranslateService} from '@ngx-translate/core';

@Component({
    selector: 'jhi-entity-audit-modal',
    templateUrl: './entity-audit-modal.component.html',
    styles: [`
        /* NOTE: for now the /deep/ shadow-piercing descendant combinator is
         * required because Angular defaults to emulated view encapsulation and
         * preprocesses all component styles to approximate shadow scoping
         * rules. This means these styles wouldn't apply to the HTML generated
         * by ng-diff-match-patch.
         *
         * This shouldn't be required when browsers support native
         * encapsulation, at which point /deep/ will also be deprecated/removed
         * see https://angular.io/guide/component-styles
         */

        :host /deep/ ins {
            color: black;
            background: #bbffbb;
        }

        :host /deep/ del {
            color: black;
            background: #ffbbbb;
        }

        .code {
            background: #dcdada;
            padding: 10px;
        }
    `]
})
export class EntityAuditModalComponent {
    action: string;
    left: string;
    right: string;
    currentAudit: any;
    previousAudit: any;
    previousModifiedDate: any;
    currentModifiedDate: any;
    result: string;

    constructor(
        private service: EntityAuditService,
        public activeModal: NgbActiveModal,
        private translateService: TranslateService
    ) {
    }

    openChange(microServiceChange: any, audit: EntityAuditEvent, isFirst: boolean) {
        this.service.getLogDetail(microServiceChange, audit.entityId, audit.commitVersion, audit.entityType)
            .subscribe(value => {
                this.result = value.body.entityValue;
                this.translateFields(value.body.entityType, value.body.entityValue);
            });
        /* if (!isFirst) {
             this.service.getPrevVersion(microServiceChange,
                 audit.entityType, audit.entityId, audit.commitVersion
             ).subscribe((data: EntityAuditEvent) => {
                 console.log(audit);
                 this.previousAudit = JSON.parse(data.entityValue);
                 this.currentAudit = JSON.parse(JSON.stringify(audit.entityValue));
                 this.previousModifiedDate = this.previousAudit.lastModifiedDate;
                 this.currentModifiedDate = this.currentAudit.lastModifiedDate;
                 delete this.previousAudit.lastModifiedDate;
                 delete this.previousAudit.createdDate;
                 delete this.previousAudit.createdBy;
                 delete this.previousAudit.lastModifiedBy;
                 delete this.previousAudit.id;
                 delete this.currentAudit.lastModifiedDate;
                 delete this.currentAudit.createdDate;
                 delete this.currentAudit.createdBy;
                 delete this.currentAudit.lastModifiedBy;
                 delete this.currentAudit.id;

                 this.getProperty(this.previousAudit, audit.entityType, null);
                 this.getProperty(this.currentAudit, audit.entityType, null);
                 const previousVersion = JSON.stringify(this.previousAudit, null, 2);
                 const currentVersion = JSON.stringify(this.currentAudit, null, 2);

                 this.action = audit.action;
                 this.left = previousVersion;
                 this.right = currentVersion;
             });
         } else {
             console.log(audit);
             this.previousAudit = JSON.parse(JSON.stringify(audit.entityValue));
             this.currentAudit = JSON.parse(JSON.stringify(audit.entityValue));
             this.previousModifiedDate = this.previousAudit.lastModifiedDate;
             this.currentModifiedDate = this.currentAudit.lastModifiedDate;
             delete this.previousAudit.lastModifiedDate;
             delete this.previousAudit.createdDate;
             delete this.previousAudit.createdBy;
             delete this.previousAudit.lastModifiedBy;
             delete this.previousAudit.id;
             delete this.currentAudit.lastModifiedDate;
             delete this.currentAudit.createdDate;
             delete this.currentAudit.createdBy;
             delete this.currentAudit.lastModifiedBy;
             delete this.currentAudit.id;

             this.getProperty(this.previousAudit, audit.entityType, null);
             this.getProperty(this.currentAudit, audit.entityType, null);
             const previousVersion = JSON.stringify(this.previousAudit, null, 2);
             const currentVersion = JSON.stringify(this.currentAudit, null, 2);

             this.action = audit.action;
             this.left = previousVersion;
             this.right = currentVersion;
         }*/
    }

    private convertEntityType(entityType) {
        if (entityType) {
            const arr = entityType.split('.');
            let name = arr[arr.length - 1];
            name = name.charAt(0).toLowerCase() + name.substring(1, name.length);
            return name;
        }

    }

    private translateFields(entityType: string, value: string) {
        const et = this.convertEntityType(entityType);
        const fields = this.getFields(value);
        console.log(fields);
        fields.forEach(f => {
            let translate = this.translateService.instant(`niopdcgatewayApp.${et}.${f}`);
            if (!translate.includes('translation-not-found')) {
                value = value.replace('\'' + f + '\'', translate);
            }
        });
        this.result = value;
    }

    private getFields(value: string) {
        let fields = [];
        const line = value.split('\n');
        if (line && line.length > 0) {
            line.forEach(l => {
                const reg = new RegExp('\\s*\'([^\']+)').exec(l);
                if (reg && reg[1]) {
                    fields.push(reg[1]);
                }
            });
            return fields;
        }
        return [];
    }

    private getProperty(obj, entityType, child) {
        const et = this.convertEntityType((entityType) ? entityType : child);
        for (const p in obj) {
            if (obj.hasOwnProperty(p)) {
                this.translateService.get(`niopdcgatewayApp.${et}.${p}`).subscribe(title => {
                    if (!title.includes('translation-not-found')) {
                        obj[title] = obj[p];
                        console.log(typeof obj[p]);
                        if (obj[p].hasOwnProperty('cdoId')) {
                            obj[title]['شناسه'] = obj[p]['cdoId'];
                            delete obj[title]['entity'];
                            delete obj[title]['cdoId'];
                        } else if (typeof obj[p] === 'object') {
                            for (const childP in obj[p]) {
                                if (obj[p].hasOwnProperty(childP)) {
                                    this.getProperty(obj[p], null, obj[p][childP]['entity']);
                                }
                            }
                        }
                        delete obj[p];
                    }

                });
            }
        }
    }

}
