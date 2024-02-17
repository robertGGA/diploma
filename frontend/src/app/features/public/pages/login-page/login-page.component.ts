import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DefaultDialogComponent } from '@features/public/components/dialog/default-dialog/default-dialog.component';
import { FormFieldComponent } from '@shared/ui/form-field/form-field.component';
import {
    FormBuilder,
    FormGroup,
    ReactiveFormsModule,
    Validators,
} from '@angular/forms';
import { AuthService } from '@core/services/api/auth.service';
import { catchError, takeUntil } from 'rxjs/operators';
import { DestroyService } from '@core/services/destroy.service';
import { EMPTY } from 'rxjs';
import { LoginData } from '@core/types/authorize-types/authorize.types';

@Component({
    selector: 'rg-login-page',
    standalone: true,
    imports: [
        CommonModule,
        DefaultDialogComponent,
        FormFieldComponent,
        ReactiveFormsModule,
    ],
    templateUrl: './login-page.component.html',
    styleUrls: ['./login-page.component.sass'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [DestroyService],
})
export class LoginPageComponent {
    loginFormGroup: FormGroup;

    constructor(
        private fb: FormBuilder,
        private authService: AuthService,
        private destroy$: DestroyService
    ) {
        this.loginFormGroup = fb.group({
            username: ['', [Validators.required]],
            password: ['', [Validators.required]],
        });
    }

    submit(): void {
        if (this.loginFormGroup.valid) {
            this.authService
                .login(this.loginFormGroup.value as LoginData)
                .pipe(
                    catchError(() => {
                        return EMPTY;
                    }),
                    takeUntil(this.destroy$)
                )
                .subscribe(v => {
                    console.log(v);
                });
        }
    }

    get isValid(): boolean {
        return this.loginFormGroup.valid;
    }
}
