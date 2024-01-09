import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'rg-header',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.sass'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent {}
