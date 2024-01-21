import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DefaultDialogComponent } from '@features/public/components/dialog/default-dialog/default-dialog.component';

@Component({
    selector: 'rg-login-page',
    standalone: true,
    imports: [CommonModule, DefaultDialogComponent],
    templateUrl: './login-page.component.html',
    styleUrls: ['./login-page.component.sass'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginPageComponent {}
