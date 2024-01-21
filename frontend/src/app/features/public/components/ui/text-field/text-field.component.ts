import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'rg-text-field',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './text-field.component.html',
    styleUrls: ['./text-field.component.sass'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TextFieldComponent {}
