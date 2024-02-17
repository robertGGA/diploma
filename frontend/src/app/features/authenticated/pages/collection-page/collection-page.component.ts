import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'rg-collection-page',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './collection-page.component.html',
    styleUrls: ['./collection-page.component.sass'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CollectionPageComponent {}
