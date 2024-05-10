import { ChangeDetectionStrategy, Component, OnDestroy } from '@angular/core';
import { DestroyService } from '@core/services/destroy.service';
import { interval, switchMap, timeout, timer } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { FileService } from '@core/services/api/file.service';
import { HttpClient } from '@angular/common/http';

@Component({
    selector: 'rg-faq-page',
    templateUrl: './faq-page.component.html',
    styleUrls: ['./faq-page.component.sass'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [DestroyService],
})
export class FaqPageComponent implements OnDestroy {
    constructor(
        private destroy$: DestroyService,
        private fileService: FileService,
        private http: HttpClient
    ) {}

    sendRequest(): void {}
    ngOnDestroy() {
        timer(5000)
            .pipe(
                switchMap(() =>
                    this.fileService.pythonExecute({ first: 1, second: 2 })
                )
            )
            .pipe(takeUntil(this.destroy$))
            .subscribe(e => {
                console.log(e);
            });
    }
}
