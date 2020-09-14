import {
    Component, OnInit, Input, forwardRef, ViewEncapsulation,
    HostListener, ElementRef, OnChanges, SimpleChanges
} from '@angular/core';

import {NG_VALUE_ACCESSOR} from '@angular/forms';
import {CostResponse} from '../../../entities/order';
import {CostGroupService} from '../../../entities/cost-group';

export const CUSTOM_ORDER_COST_INPUT_CONTROL_VALUE_ACCESSOR: any = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => OrderCostTableComponent),
    multi: true
};

@Component({
    selector: 'app-order-cost-table',
    templateUrl: 'order-cost-table.component.html',
    styleUrls: ['order-cost-table.component.css'],
    providers: [CUSTOM_ORDER_COST_INPUT_CONTROL_VALUE_ACCESSOR],
    encapsulation: ViewEncapsulation.None

})
export class OrderCostTableComponent implements OnInit, OnChanges {

    @Input() companyId;

    @Input() disabled = false;
    @Input() widthGrid = '100%';
    @Input() costResponses: CostResponse[];
    @Input() productColor: string;
    sumCost: number;

    overlayVisible: boolean;

    constructor(private elementRef: ElementRef,
                private costGroupService: CostGroupService) {
    }

    ngOnChanges(changes: SimpleChanges): void {
        if (changes.costResponses && !changes.costResponses.isFirstChange()) {
            this.calc();
        }
    }

    ngOnInit() {
        this.calc();
    }

    calc() {
        this.sumCost = 0;
        if (this.costResponses) {
            this.costResponses.forEach(value => {
                if (!value.productRateEffect) {
                    this.sumCost += value.price;
                }
                if (!value.costGroupTitle) {
                    this.costGroupService.findCostGroupByCostId(value.costId).subscribe(costGroup => {
                        value.costGroupTitle = costGroup.body.title;
                    });
                }
            });
        }
    }

    showTable() {
        if (this.disabled) {
            return;
        }
        this.overlayVisible = !this.overlayVisible;
    }

    close() {
        this.overlayVisible = false;
    }

    @HostListener('document:click', ['$event'])
    handleClick(event) {
        let clickedComponent = event.target;
        let inside = false;
        do {
            if (clickedComponent === this.elementRef.nativeElement) {
                inside = true;
            }
            clickedComponent = clickedComponent.parentNode;
        } while (clickedComponent);
        if (!inside) {
            this.close();
        }
    }

}
