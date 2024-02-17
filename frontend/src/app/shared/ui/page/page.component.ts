import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'rg-page',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './page.component.html',
    styleUrls: ['./page.component.sass'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PageComponent {}
