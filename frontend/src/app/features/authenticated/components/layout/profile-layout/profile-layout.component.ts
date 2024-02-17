import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from '@features/authenticated/components/ui/header/header.component';
import { PageComponent } from '@shared/ui/page/page.component';

@Component({
    selector: 'rg-profile-layout',
    standalone: true,
    imports: [CommonModule, RouterOutlet, HeaderComponent, PageComponent],
    templateUrl: './profile-layout.component.html',
    styleUrls: ['./profile-layout.component.sass'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProfileLayoutComponent {}
