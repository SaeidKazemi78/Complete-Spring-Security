import {
    Component,
    ElementRef,
    EventEmitter,
    forwardRef,
    HostListener,
    Input,
    OnChanges,
    OnInit,
    Output,
    SimpleChanges,
    ViewEncapsulation
} from '@angular/core';

import {ControlValueAccessor, NG_VALIDATORS, NG_VALUE_ACCESSOR, Validator} from '@angular/forms';
import {TreeNode} from 'primeng/components/common/api';
import {Region, RegionService} from '../../../entities/region';

export const CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR: any = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => InputRegionSelectorComponent),
    multi: true
};

export const CUSTOM_INPUT_CONTROL_VALIDATOR: any = {
    provide: NG_VALIDATORS,
    useExisting: forwardRef(() => InputRegionSelectorComponent),
    multi: true
};

@Component({
    selector: 'input-region-selector',
    templateUrl: 'input-region-selector.component.html',
    styleUrls: ['input-region-selector.component.css'],
    encapsulation: ViewEncapsulation.None,
    providers: [CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR,
        CUSTOM_INPUT_CONTROL_VALIDATOR]
})

export class InputRegionSelectorComponent implements OnInit, OnChanges, ControlValueAccessor, Validator {

    @Output() selected = new EventEmitter();
    @Output() selectedObject = new EventEmitter();
    @Output() locationLoad = new EventEmitter();
    @Input() selectByPriority = false;
    @Input() message: String;
    @Input() locationIds: number[] = null;
    @Input() oneSelection = false;
    @Input() selectOfLevel: 'region' | 'subregion' | 'none' | 'all' | 0 | 1 | 2 | 3 | 4 | -1 | number[] = 'all';
    @Input() idSelector = false;
    @Input() disabled = false;
    @Input() firstSelect = false;
    @Input() countryId: number = null;
    @Input() dataAccess: boolean;

    @Input() counterRangeMax;
    @Input() counterRangeMin;

    selectOfLevels: number[];
    maxSelectOfLevels: number;
    regions: TreeNode[];
    fullRegion: any[][] = [];

    openModal: boolean;
    inputText = '';

    selectedRegions: TreeNode[];
    selectedRegion: TreeNode;
    optionsId: number[];
    valueField: Region[] | Region | number | any;
    valueObject: Region[] | Region | any;

    onChange: any = () => {
    }
    onTouched: any = () => {
    }

    constructor(private regionSelectorService: RegionService, private elementRef: ElementRef) {
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

        this.regionSelectorService.querySelector(null, {
            dataAccess: this.dataAccess,
            countryId: this.countryId,
            locationIds: this.locationIds
        }).toPromise()
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
        if (changes.countryId) { // when change country id
            this.selectedRegion = this.selectedRegions = null;
            this.fullRegion = [];
            this.value = null;
            this.inputText = '';
            this.ngOnInit();
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
            this.regionSelectorService.querySelector(event.node.data.item.id, {
                dataAccess: this.dataAccess,
                locationIds: this.locationIds
            }).toPromise()
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

                        /*this.load(event);
                        this.checkSelectedRoot();*/
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
        } else if ((!(this.value instanceof Array) || typeof(this.value) === 'number') && !this.selectedRegion) {
            for (const node of event.node.children) {
                if (!this.selectedRegion) {
                    this.checkSelected(node);
                }
            }
        }
    }

    clearSelected() {
        this.selectedRegion = this.selectedRegions = null;
        this.valueObject = null;
        this.fullRegion = [];
        this.inputText = '';
        this.value = null;
        this.selected.emit(this.oneSelection ? this.selectedRegion : this.selectedRegions);
        this.selectedObject.emit(this.valueObject);
        this.generateText();
    }

    nodeSelect(event) {
        if (!this.oneSelection) {
            if (!event.node.leaf && !event.node.children) {
                this.nodeExpand(event);
            }
            this.fullRegion[event.node.data.item.id] = this.getParent(event.node);
            this.selectedByLevel();

        } else {
            this.selectedByLevel();
        }

        if (this.oneSelection) {
            this.openModal = false;
        }
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
        this.selectedByLevel();
    }

    selectedByLevel() {
        if (!this.oneSelection) {
            this.valueField = [];
            this.valueObject = [];
        }

        // در حالت یک انتخابی باشد
        if (this.oneSelection) {
            if (this.selectedRegion && this.selectedRegion.data
                && this.selectOfLevels.indexOf(this.selectedRegion.data.level) >= 0) {
                this.value = typeof(this.value) === 'number' || this.idSelector === true
                    ? this.selectedRegion.data.item.id
                    : this.selectedRegion.data.item;
                this.valueObject = this.selectedRegion.data.item;
            } else {
                this.selectedRegion = null;
                this.value = null;
                this.valueObject = null;
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
                            this.valueObject.push(l.data.item);
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
                                this.valueObject.push(l.data.item);
                            }
                        }
                    }
                }
            }
        }
        this.value = this.valueField;
        this.selected.emit(this.oneSelection ? this.selectedRegion : this.selectedRegions);
        this.selectedObject.emit(this.valueObject);
        this.generateText();
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
                    this.valueObject.push(l.data.item);
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

    clickInput() {
        this.openModal = true;
    }

    @HostListener('document:click', ['$event'])
    blurInput(event) {
        let clickedComponent = event.target;
        let inside = false;
        do {
            if (clickedComponent === this.elementRef.nativeElement) {
                inside = true;
            }
            clickedComponent = clickedComponent.parentNode;
        } while (clickedComponent);
        if (!inside) {
            this.openModal = false;
        }
    }

    private generateText() {
        this.inputText = '';
        if (this.oneSelection) {
             if (this.valueObject) {
              this.inputText = this.valueObject.name;
             }
        } else {
            if (this.valueObject) {
                this.valueObject.forEach(region => {
                    this.inputText += region.name + '،';
                });
                this.inputText = this.inputText.slice(0, -1);
            }
        }
    }

    private select() {
        if (this.value) {
            const valueOfArrayList = this.getValueOfArrayList();
            if (valueOfArrayList && valueOfArrayList.length) {
                this.regionSelectorService.findAllRecursiveParent(
                    valueOfArrayList).subscribe(value1 => {
                    this.fullRegion = value1.body;
                    for (const value2 in  this.fullRegion) {
                        if (!this.regions || !this.regions.length) {
                            console.log('empty regions ----------------------------------------');
                        }
                        this.setLoadedLocationToLocationsTree(this.regions, this.fullRegion[value2]);
                    }
                    this.checkSelectedRoot();
                });
            } else {
                this.clearSelected();
            }

        }
    }

    setLoadedLocationToLocationsTree(regions: TreeNode[], loadedRegions: Region[]) {
        regions.forEach(treeNode => {
            loadedRegions.forEach((region: Region) => {
                if (treeNode.data.item.id === region.id) {
                    if (treeNode && (!treeNode.children || !treeNode.children.length)) {
                        treeNode.children = region.subRegions
                            .map(c => {
                                return <TreeNode> {
                                    data: {item: c, level: treeNode.data.level + 1},
                                    label: c.name,
                                    leaf: this.maxSelectOfLevels <= treeNode.data.level + 1 || false,
                                    parent: treeNode
                                };
                            });
                    }
                }
            });
            if (treeNode.children && treeNode.children.length) {
                this.setLoadedLocationToLocationsTree(treeNode.children, loadedRegions);
            }
        });

    }

    private getValueOfArrayList(): number[] {
        if (this.value) {
            return (this.value instanceof Array && this.oneSelection === false) ?
                this.valueField.map(val => {
                    return (typeof val === 'number') ? val : val.id;
                }) : typeof this.value !== 'number' && !(this.value instanceof Array) ? [this.value.id] : [this.value];
        }
    }

    private checkSelectedRoot() {
        this.selectedRegions = [];
        if (this.fullRegion && this.value) {
            const valueOfArrayList = this.getValueOfArrayList();
            let allLoaded = true;
            for (const id of valueOfArrayList) {
                if (this.fullRegion[id] && this.fullRegion[id][0]) {
                    if (!this.findNodeExpand(this.fullRegion[id], this.fullRegion[id][0], 0, this.regions)) {
                        allLoaded = false;
                        break;
                    }
                }
            }
            if (allLoaded && ((!this.oneSelection && this.selectedRegions && this.selectedRegions.length) || (this.oneSelection && this.selectedRegion))) {
                this.selectedByLevel();
            }
        }
    }

    private findNodeExpand(fullRegion: Region[], region: Region, regionIndex: number, regions: TreeNode[]) {
        for (const node of regions) {
            if (node.data.level === regionIndex && node.data.item.id === region.id) {
                if (this.getValueOfArrayList().includes(region.id)) {
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

            } else if (!(this.value instanceof Array) || typeof this.value === 'number') {
                if (node.data.item.id === (typeof this.value !== 'number' ? this.value.id : this.value)) {
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
