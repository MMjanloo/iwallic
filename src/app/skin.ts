import {
    Directive, Input, OnChanges, SimpleChanges, ElementRef, Pipe, PipeTransform,
    ChangeDetectorRef
} from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { ThemeService } from '../core';
import { Observable } from 'rxjs/Observable';

const skin = {
    light: {
        primary:    '#3e64ad',
        secondary:  '#3e8fad',
        danger:     '#ab4e4e',
        default:    '#282939',
        default2:   '#333448',
        line:       '#88adf4',
        line2:      '#dfedf2',
        font:       'rgba(255, 255, 255, 0.85)',
        font2:      'rgba(255, 255, 255, 0.85)'
    },
    dark: {
        primary:    '#3e64ad',
        secondary:  '#3e8fad',
        danger:     '#ab4e4e',
        default:    '#282939',
        default2:   '#333448',
        line:       '#88adf4',
        line2:      '#dfedf2',
        font:       'rgba(255, 255, 255, 0.85)',
        font2:      'rgba(255, 255, 255, 0.85)'
    }
};

@Directive({
    selector: '[icolor]'
})
export class IColorDirective implements OnChanges {
    private skin: string;
    @Input() public icolor: string;
    constructor(
        private elemRef: ElementRef,
        private theme: ThemeService
    ) {
        this.theme.get().subscribe((res) => {
            this.skin = res;
            if (skin[this.skin]) {
                this.elemRef.nativeElement.style.color = skin[this.skin][this.icolor];
            }
        });
    }
    public ngOnChanges(changes: SimpleChanges) {
        if (
            changes.icolor &&
            changes.icolor.previousValue !== changes.icolor.currentValue &&
            skin[this.skin]
        ) {
            this.elemRef.nativeElement.style.color = skin[this.skin][changes.icolor.currentValue];
        }
    }
}

@Directive({
    selector: '[ibg]'
})
export class IBgDirective implements OnChanges {
    private skin: string;
    @Input() public ibg: string;
    constructor(
        private elemRef: ElementRef,
        private theme: ThemeService
    ) {
        this.theme.get().subscribe((res) => {
            this.skin = res;
            if (skin[this.skin]) {
                this.elemRef.nativeElement.style.backgroundColor = skin[this.skin][this.ibg];
            }
        });
    }
    public ngOnChanges(changes: SimpleChanges) {
        if (
            changes.ibg &&
            changes.ibg.previousValue !== changes.ibg.currentValue &&
            skin[this.skin]
        ) {
            this.elemRef.nativeElement.style.backgroundColor = skin[this.skin][changes.ibg.currentValue];
        }
    }
}

// tslint:disable-next-line:use-pipe-transform-interface
@Pipe({
    name: 'theme'
})
export class ThemePipe implements PipeTransform {
    private skin: string;
    constructor(
        private theme: ThemeService
    ) {}
    public transform(value: Observable<string>): any {
        return this.theme.get().map((res => `${res}-${value}`));
    }
}
