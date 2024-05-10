import {
    ChangeDetectionStrategy,
    Component,
    EventEmitter,
    inject,
    Input,
    OnInit,
    Output,
} from '@angular/core';
import { DestroyService } from '@core/services/destroy.service';

@Component({
    selector: 'rg-model-card',
    templateUrl: './model-card.component.html',
    styleUrls: ['./model-card.component.sass'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [DestroyService],
})
export class ModelCardComponent {
    @Input() image!: File;
    @Output() imageClick: EventEmitter<string> = new EventEmitter<string>();
    destroy$ = inject(DestroyService);

    click(): void {
        this.imageClick.emit(this.image.name);
    }

    isVideo(): boolean {
        return this.image.type.includes('video');
    }

    playVideo(): void {}

    get videoPath(): string | null {
        if (this.isVideo()) {
            return '';
        }
        return null;
    }
}
