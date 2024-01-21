import {
    ChangeDetectionStrategy,
    Component,
    Input,
    ViewEncapsulation,
} from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'rg-form-field',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './form-field.component.html',
    styleUrls: ['./form-field.component.sass'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
})
export class FormFieldComponent {
    /*
     * isFloatingLabel - condition to display label
     */
    @Input() isFloatingLabel = false;

    // @Input()
}
