import { Component } from '@angular/core';
import { TestService } from '@core/services/test.service';
import { catchError, of } from 'rxjs';

@Component({
    selector: 'rg-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.sass'],
})
export class AppComponent {
    title = 'frontend';

    constructor(private testService: TestService) {
        this.testService
            .testBackend()
            .pipe(catchError(err => of(err)))
            .subscribe(value => {
                console.log(value);
            });
    }
}
