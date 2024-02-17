import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
    selector: 'rg-faq-page',
    templateUrl: './faq-page.component.html',
    styleUrls: ['./faq-page.component.sass'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FaqPageComponent {}
