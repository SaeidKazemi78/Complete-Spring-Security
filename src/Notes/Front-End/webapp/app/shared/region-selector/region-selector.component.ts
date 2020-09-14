import {
    Component,
    EventEmitter,
    forwardRef,
    Input,
    OnChanges,
    OnInit,
    Output,
    SimpleChanges,
    ViewEncapsulation
} from '@angular/core';

import {Region, RegionService} from '../../entities/region';
import {ControlValueAccessor, NG_VALIDATORS, NG_VALUE_ACCESSOR, Validator} from '@angular/forms';
import {TreeNode} from 'primeng/components/common/api';
import {HttpParams} from '@angular/common/http';

export const CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR: any = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => RegionSelectorComponent),
    multi: true
};

export const CUSTOM_INPUT_CONTROL_VALIDATOR: any = {
    provide: NG_VALIDATORS,
    useExisting: forwardRef(() => RegionSelectorComponent),
    multi: true
};

@Component({
    selector: 'app-region-selector',
    templateUrl: 'region-selector.component.html',
    styleUrls: ['region-selector.component.css'],
    encapsulation: ViewEncapsulation.None,
    providers: [CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR,
        CUSTOM_INPUT_CONTROL_VALIDATOR]
})

export class RegionSelectorComponent implements OnInit, OnChanges, ControlValueAccessor, Validator {

    @Output() selected = new EventEmitter();
    @Output() regionLoad = new EventEmitter();
    @Input() selectByPriority = false;
    @Input() message: String;
    @Input() locationIds: number[] = null;
    @Input() oneSelection = false;
    @Input() selectOfLevel: 'region' | 'subregion' | 'none' | 'all' | 0 | 1 | 2 | 3 | 4 | -1 | number[] = 'all';
    @Input() idSelector = false;
    @Input() disabled = false;
    @Input() firstSelect = false;

    @Input() counterRangeMax;
    @Input() counterRangeMin;

    selectOfLevels: number[];
    maxSelectOfLevels: number;
    regions: TreeNode[];
    fullRegion: number[][];

    selectedRegions: TreeNode[];
    selectedRegion: TreeNode;
    optionsId: number[];
    valueField: Region[] | Region | number | any;

    onChange: any = () => {
    }
    onTouched: any = () => {
    }

    constructor(private regionSelectorService: RegionService) {
    }

    get value() {
        return this.valueField;
    }

    set value(val: Region | Region[] | number | number[]) {
        this.valueField = val;
        this.onChange(val);
        this.onTouched();
    }

    ngOnInit(): void {
        this.optionsId = [];
        switch (this.selectOfLevel) {
            case 'region':
                this.selectOfLevels = [0];
                break;
            case 'subregion':
                this.selectOfLevels = [1];
                break;
            case 'none' :
            case -1:
                this.selectOfLevels = null;
                break;
            case 2:
            case 'all':
                this.selectOfLevels = [0, 1, 2, 3, 4];
                break;
        }

        if (typeof this.selectOfLevel === 'number' && this.selectOfLevel >= 0 && this.selectOfLevel < 5) {
            this.selectOfLevels = [this.selectOfLevel];
        } else if (this.selectOfLevel instanceof Array) {
            this.selectOfLevels = this.selectOfLevel;
        }

        this.maxSelectOfLevels = Math.max(...this.selectOfLevels);

        this.regions = [];

        this.regionSelectorService.querySelector(-1, {locationIds: this.locationIds, }).toPromise()
            .then(r => {
                this.regions = r.body.map(c => {
                    return <TreeNode> {
                        data: {item: c, level: 0},
                        label: c.name,
                        leaf: this.maxSelectOfLevels <= 0 || false,
                    };
                });
                if (!this.oneSelection && this.firstSelect && this.selectedRegions && !this.selectedRegions.length) {
                    this.value = (this.idSelector) ? r.body.map(l => l.id) : r.body;
                }
                this.checkSelectedRoot();
            });

    }

    ngOnChanges(changes: SimpleChanges): void {
        if (changes.options && !changes.options.isFirstChange()) {
            if (changes.options.previousValue.length === changes.options.currentValue.length) {
                for (const value of changes.options.previousValue) {
                    if (changes.options.currentValue.find(valuec => valuec.id === value.id) == null) {
                        this.ngOnInit();
                        return;
                    }
                }
            } else {
                this.ngOnInit();
            }
        }
    }

    writeValue(val: any) {
        if (val == null) {
            val = this.oneSelection ? null : [];
        }

        if (val !== this.value) {
            this.value = val;
            this.select();
        }
    }

    registerOnChange(fn: any) {
        this.onChange = fn;
    }

    registerOnTouched(fn: any) {
        this.onTouched = fn;
    }

    nodeExpand(event) {
        if (event.node && !event.node.children) {
            this.regionSelectorService.query(event.node.data.item.id, null, {locationIds: this.locationIds}).toPromise()
                .then(nodes => {
                        event.node.children = nodes.body
                            .map(c => {
                                return <TreeNode> {
                                    data: {item: c, level: event.node.data.level + 1},
                                    label: c.name,
                                    leaf: this.maxSelectOfLevels <= event.node.data.level + 1 || false,
                                    parent: event.node
                                };
                            });

                        this.load(event);
                        this.checkSelectedRoot();
                    }
                );
        }
    }

    load(event) {
        if (this.value instanceof Array &&
            this.selectedRegions.length < this.value.length) {
            for (const node of event.node.children) {
                this.checkSelected(node);
            }
        } else if ((this.value instanceof Region || typeof(this.value) === 'number') && !this.selectedRegion) {
            for (const node of event.node.children) {
                if (!this.selectedRegion) {
                    this.checkSelected(node);
                }
            }
        }
    }

    clearSelected() {
        this.selectedRegion = this.selectedRegions = null;
        this.fullRegion = [];
        this.value = null;
        this.selected.emit(this.value);
    }

    nodeSelect(event) {
        if (!this.oneSelection) {
            this.fullRegion[event.node.data.item.id] = this.getParent(event.node);
            this.nodeExpand(event);
        }
        this.selectedByLevel(event);
    }

    getParent(node: TreeNode): number[] {
        if (node.parent) {
            const parent1 = this.getParent(node.parent);
            parent1.push(node.data.item.id);
            return parent1;
        }
        return [node.data.item.id];
    }

    nodeUnSelect(event) {
        if (!this.oneSelection) {
            delete this.fullRegion[event.node.data.item.id];
        }
        this.selectedByLevel(event);
    }

    selectedByLevel(event ?) {
        if (!this.oneSelection) {
            this.valueField = [];
        }

        // در حالت یک انتخابی باشد
        if (this.oneSelection) {
            if (this.selectedRegion && this.selectedRegion.data
                && this.selectOfLevels.indexOf(this.selectedRegion.data.level) >= 0) {
                this.value = typeof(this.value) === 'number' || this.idSelector === true
                    ? this.selectedRegion.data.item.id
                    : this.selectedRegion.data.item;
            } else {
                this.selectedRegion = null;
                this.value = null;
            }
        } else if (this.valueField instanceof Array && this.regions && this.regions.length) {
            if (this.selectByPriority) {
                // منطقه ها بارگذاری شده باشند
                if (this.regions && this.regions.length) {
                    for (const l of this.regions) {
                        // آیا ایتم در لیست انتخاب شده ها وجود دارد.
                        let ex = false;
                        if (this.selectedRegions && this.selectedRegions.length) {
                            for (const sel of this.selectedRegions) {
                                if (sel.data.item.id === l.data.item.id) {
                                    ex = true;
                                }
                            }
                        }
                        // در صورت وجود و لول آن در لیست لول ها باشد اضافه شود
                        if (ex && this.selectOfLevels.indexOf(l.data.level) >= 0) {
                            this.valueField.push(this.idSelector ? l.data.item.id : l.data.item);
                        } else if (l.children && l.children.length && l.children.length > 0) {
                            this.addChildrenSelected(l);
                        }
                    }
                }
            } else {
                if (this.selectedRegions && this.selectedRegions.length) {
                    if (this.valueField instanceof Array) {
                        for (const l of this.selectedRegions) {
                            if (this.selectOfLevels.indexOf(l.data.level) >= 0) {
                                this.valueField.push(this.idSelector ? l.data.item.id : l.data.item);
                            }
                        }
                    }
                }
            }
        }
        this.value = this.valueField;
        this.selected.emit(this.oneSelection ? this.selectedRegion : this.selectedRegions);
    }

    addChildrenSelected(treenode: TreeNode) {
        if (this.valueField instanceof Array && treenode.children && treenode.children.length) {
            for (const l of treenode.children) {
                let ex = false;
                if (this.selectedRegions && this.selectedRegions.length) {
                    for (const sel of this.selectedRegions) {
                        if (sel.data.item.id === l.data.item.id) {
                            ex = true;
                        }
                    }
                }

                if (ex && this.selectOfLevels.indexOf(l.data.level) >= 0) {
                    this.valueField.push(this.idSelector ? l.data.item.id : l.data.item);
                } else if (l.children && l.children.length && l.children.length > 0) {
                    this.addChildrenSelected(l);
                }

            }
        }
    }

    validate() {
        const err = {
            rangeError: {
                given: this.value,
                max: this.counterRangeMax || 10,
                min: this.counterRangeMin || 0
            }
        };

        return (this.value instanceof Array) ? (this.value.length > +this.counterRangeMax || this.value.length < +this.counterRangeMin) ? err : null : null;
    }

    private select() {
        if (this.value) {
            this.regionSelectorService.findAllRecursiveParent(
                this.getValueOfArrayList()).subscribe(value1 => {
                this.fullRegion = value1.body;
                this.checkSelectedRoot();

            });
        }
    }

    private getValueOfArrayList(): number[] {
        if (this.value) {
            return (this.value instanceof Array && this.oneSelection === false) ?
                this.valueField.map(val => {
                    return (typeof val === 'number') ? val : val.id;
                }) : this.value instanceof Region ? [this.value.id] : [this.value];
        }
    }

    private checkSelectedRoot() {
        this.selectedRegions = [];
        if (this.fullRegion && this.value) {
            const valueOfArrayList = this.getValueOfArrayList();
            for (const id of valueOfArrayList) {
                if (this.fullRegion[id] && this.fullRegion[id][0]) {
                    if (!this.findNodeExpand(this.fullRegion[id], this.fullRegion[id][0], 0, this.regions)) {
                        break;
                    }
                }
            }
        }
    }

    private findNodeExpand(fullRegion: number[], region: number, regionIndex: number, regions: TreeNode[]) {
        for (const node of regions) {
            if (node.data.level === regionIndex && node.data.item.id === region) {
                if (this.getValueOfArrayList().includes(region)) {
                    this.checkSelected(node);
                } else {
                    if (node && !node.children) {
                        this.nodeExpand({node});
                        return false;
                    } else if (node.children && node.children.length) {
                        node.expanded = true;
                        if (!this.findNodeExpand(fullRegion, fullRegion[regionIndex + 1], regionIndex + 1, node.children)) {
                            return false;
                        }
                    }
                }
            }
        }
        return true;
    }

    private checkSelected(node) {
        if (this.value) {
            if (this.value instanceof Array && this.oneSelection === false) {

                let pushed = false;
                for (const select of this.value) {
                    if (node.data.item.id === ((typeof select === 'number') ? select : select.id)) {
                        this.selectedRegions.push(node);
                        pushed = true;
                        break;
                    }
                }
                // آیا آیتمی که باز میشود قبلا انتخاب شده است...
                let is_selected = false;

                if (this.selectedRegions && this.selectedRegions.length) {
                    for (const sel of this.selectedRegions) {
                        if (sel.data.item.id === node.data.item.id) {
                            is_selected = true;
                            break;
                        }
                    }
                }

                // انتخاب آیتم های فرزند در صورتی که ایتم پدر انتخاب شده باشد.
                if (is_selected && node.children && node.children.length) {
                    for (const loc of node.children) {
                        this.selectedRegions.push(loc);
                        this.checkSelected(loc);
                    }
                }

            } else if (this.value instanceof Region || typeof this.value === 'number') {
                if (node.data.item.id === (this.value instanceof Region ? this.value.id : this.value)) {
                    this.selectedRegion = node;
                }
                /*else {
                                   this.expandRecursive(node, true);
                               }*/
            }
        }
    }

    private expandRecursive(node: TreeNode, isExpand: boolean) {
        node.expanded = isExpand;
        // this.nodeExpand({node});
        if (node.children) {
            node.children.forEach(childNode => {
                this.expandRecursive(childNode, isExpand);
            });
        }
    }
}
