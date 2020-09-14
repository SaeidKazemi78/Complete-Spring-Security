import {AfterViewInit, Directive, ElementRef, EventEmitter, Input, Output} from '@angular/core';
import {NgModel} from '@angular/forms';
import {Observable} from 'rxjs';

@Directive({
    selector: '[search-after-typed]'
})
export class InputSearchAfterTypedDirective implements AfterViewInit {
    @Input() delay = 1500;
    @Output() onSearch: EventEmitter<any> = new EventEmitter();

    constructor(private element: ElementRef) {
    }

    public ngAfterViewInit(): void {
        Observable.fromEvent(this.element.nativeElement, 'input')
            .map((event: Event) => (<HTMLInputElement>event.target).value)
            .debounceTime(this.delay)
            .distinctUntilChanged()
            .subscribe(data => this.onSearch.emit(data));
    }
}
