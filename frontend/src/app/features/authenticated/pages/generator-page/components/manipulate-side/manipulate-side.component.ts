import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'rg-manipulate-side',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './manipulate-side.component.html',
    styleUrls: ['./manipulate-side.component.sass'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ManipulateSideComponent {}
