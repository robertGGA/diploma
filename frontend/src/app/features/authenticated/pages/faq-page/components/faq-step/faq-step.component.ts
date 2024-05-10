import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'rg-faq-step',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './faq-step.component.html',
    styleUrls: ['./faq-step.component.sass'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FaqStepComponent {}
