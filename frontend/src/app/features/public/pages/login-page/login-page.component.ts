import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DefaultDialogComponent } from '@features/public/components/dialog/default-dialog/default-dialog.component';
import { FormFieldComponent } from '@shared/ui/form-field/form-field.component';

@Component({
    selector: 'rg-login-page',
    standalone: true,
    imports: [CommonModule, DefaultDialogComponent, FormFieldComponent],
    templateUrl: './login-page.component.html',
    styleUrls: ['./login-page.component.sass'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginPageComponent {}
