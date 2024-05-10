import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DestroyService } from '@core/services/destroy.service';
import { MatIconModule } from '@angular/material/icon';
import { animate, style, transition, trigger } from '@angular/animations';

@Component({
    selector: 'rg-generator-side-menu',
    standalone: true,
    imports: [CommonModule, MatIconModule],
    templateUrl: './generator-side-menu.component.html',
    styleUrls: ['./generator-side-menu.component.sass'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    animations: [
        trigger('inOutAnimation', [
            transition(':enter', [
                style({ height: 0, opacity: 0 }),
                animate('1s ease-out', style({ height: 300, opacity: 1 })),
            ]),
            transition(':leave', [
                style({ height: 300, opacity: 1 }),
                animate('1s ease-in', style({ height: 0, opacity: 0 })),
            ]),
        ]),
    ],
})
export class GeneratorSideMenuComponent {
    isOpened = false;
    disabled = false;

    constructor(private destroy$: DestroyService) {}
    switchMenu(): void {
        // this.disabled = true;
        this.isOpened = !this.isOpened;

        // timer(1000)
        //     .pipe(takeUntil(this.destroy$))
        //     .subscribe(() => {
        //         this.disabled = false;
        //     });
    }
}
