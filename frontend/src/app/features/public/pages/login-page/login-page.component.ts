import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'rg-login-page',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './login-page.component.html',
    styleUrls: ['./login-page.component.sass'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginPageComponent {}
