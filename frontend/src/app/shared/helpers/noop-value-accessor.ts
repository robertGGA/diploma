import { inject } from '@angular/core';
import {
    ControlValueAccessor,
    FormControlDirective,
    FormControlName,
    NgControl,
    NgModel,
} from '@angular/forms';

export class NoopValueAccessor implements ControlValueAccessor {
    registerOnChange(fn: any): void {}

    registerOnTouched(fn: any): void {}

    writeValue(obj: any): void {}
}

export function injectNgControl() {
    const ngControl = inject(NgControl, { self: true, optional: true });

    if (!ngControl) throw new Error("ngControl doesn't exist");

    if (
        ngControl instanceof FormControlDirective ||
        ngControl instanceof FormControlName ||
        ngControl instanceof NgModel
    ) {
        ngControl.valueAccessor = new NoopValueAccessor();

        return ngControl;
    }

    throw new Error('...');
}
