import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DestroyService } from '@core/services/destroy.service';
import { FileService } from '@core/services/api/file.service';
import { takeUntil } from 'rxjs/operators';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MaskDirective } from '@shared/directives/mask.directive';

@Component({
    selector: 'rg-collection-page',
    standalone: true,
    imports: [
        CommonModule,
        MatInputModule,
        MatDatepickerModule,
        MatNativeDateModule,
        MaskDirective,
    ],
    templateUrl: './collection-page.component.html',
    styleUrls: ['./collection-page.component.sass'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CollectionPageComponent implements OnInit {
    constructor(
        private destroy$: DestroyService,
        private fileService: FileService
    ) {}

    ngOnInit(): void {
        this.fileService
            .pythonExecute({ first: 5, second: 2 })
            .pipe(takeUntil(this.destroy$))
            .subscribe(val => {
                console.log(val);
            });
    }
}
