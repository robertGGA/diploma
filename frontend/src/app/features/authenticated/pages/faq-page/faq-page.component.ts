import { ChangeDetectionStrategy, Component } from '@angular/core';
import { DestroyService } from '@core/services/destroy.service';

@Component({
    selector: 'rg-faq-page',
    templateUrl: './faq-page.component.html',
    styleUrls: ['./faq-page.component.sass'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [DestroyService],
})
export class FaqPageComponent {}
