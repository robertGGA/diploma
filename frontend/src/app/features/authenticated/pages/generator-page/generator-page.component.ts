import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'rg-generator-page',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './generator-page.component.html',
    styleUrls: ['./generator-page.component.sass'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GeneratorPageComponent {}
