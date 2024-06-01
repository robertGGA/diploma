import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MaskDirective } from '@shared/directives/mask.directive';

@Component({
    selector: 'rg-collection-page',
    standalone: true,
    imports: [
        CommonModule,
        MatInputModule,
        MatDatepickerModule,
        MatNativeDateModule,
        MaskDirective,
    ],
    templateUrl: './collection-page.component.html',
    styleUrls: ['./collection-page.component.sass'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CollectionPageComponent {}
