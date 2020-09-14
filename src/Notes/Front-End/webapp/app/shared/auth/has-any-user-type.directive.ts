import {Directive, Input, OnChanges, SimpleChanges, TemplateRef, ViewContainerRef} from '@angular/core';
import {Principal} from './principal.service';

type UserTypeIf = { userTypes: string[], andIf?: boolean, ifOr?: boolean };

@Directive({
    selector: '[jhiHasAnyUserType]'
})
export class HasAnyUserTypeDirective implements OnChanges {

    private inputUserTypes: string[];
    private userTypes: string[];
    private andIf = true;
    private ifOr = true;


    constructor(private principal: Principal, private templateRef: TemplateRef<any>, private viewContainerRef: ViewContainerRef) {
    }

    @Input()
    set jhiHasAnyUserType(value: string | string[] | UserTypeIf) {
        if (typeof value === 'object' && !(value instanceof Array)) {
            this.inputUserTypes = value.userTypes;
            this.andIf = value.andIf;
            this.ifOr = value.ifOr;
        } else {
            this.inputUserTypes = typeof value === 'string' ? [<string>value] : <string[]>value;
            this.andIf = true;
            this.ifOr = true;
        }
        this.updateView();
        // Get notified each time level  changes.
        this.principal.identity().then(account => {
            this.userTypes = account.userTypes;
            this.updateView()
        });
    }

    ngOnChanges(changes: SimpleChanges): void {
        if (changes.ngIf && !changes.ngIf.isFirstChange()) {

            this.updateView();
        }
    }

    private updateView(): void {
       this.hasAnyUserType(this.inputUserTypes).then(result => {
            this.viewContainerRef.clear();
            if (result && this.andIf) {
                this.viewContainerRef.createEmbeddedView(this.templateRef);
            }
        });
    }


   public hasAnyUserType(inputTypes: string[]): Promise<boolean> {
        return Promise.resolve(this.hasAnyUserTypeDirective(inputTypes));
    }


    private hasAnyUserTypeDirective(inputTypes: string[]) : boolean{
        if (!this.userTypes || !inputTypes || !inputTypes.length || inputTypes.length == 0) {
            return false;
        }

        for (let i = 0; i < inputTypes.length; i++) {
            if (this.userTypes.includes(inputTypes[i]) || inputTypes[i] === null) {
                return true;
            }
        }

        return false;
    }
}
