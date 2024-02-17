import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
    selector: 'rg-header',
    standalone: true,
    imports: [CommonModule, RouterLink],
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.sass'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent {}
