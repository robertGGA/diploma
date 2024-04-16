import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DestroyService } from '@core/services/destroy.service';
import { FileService } from '@core/services/api/file.service';
import { takeUntil } from 'rxjs/operators';

@Component({
    selector: 'rg-collection-page',
    standalone: true,
    imports: [CommonModule],
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
