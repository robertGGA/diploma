import {
    Directive,
    ElementRef,
    HostListener,
    Input,
    Renderer2,
} from '@angular/core';

@Directive({
    selector: '[rgMask]',
    standalone: true,
})
export class MaskDirective {
    @Input() rgMask!: string;
    constructor(
        private inputRef: ElementRef<HTMLInputElement>,
        private renderer: Renderer2
    ) {}

    @HostListener('input') inputListen() {
        const rgMsk = new RegExp(this.rgMask);
        // this.renderer.setProperty(
        //     this.inputRef.nativeElement,
        //     'value',
        //     this.inputRef.nativeElement.value.replace(/\D/g, '')
        // );
        console.log(this.inputRef.nativeElement.value.replace(/\D/g, ''));
    }
}
