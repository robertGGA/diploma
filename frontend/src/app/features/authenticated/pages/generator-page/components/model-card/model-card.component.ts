import {
    ChangeDetectionStrategy,
    Component,
    EventEmitter,
    inject,
    Input,
    Output,
} from '@angular/core';
import { DestroyService } from '@core/services/destroy.service';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';

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
    sanitizer = inject(DomSanitizer);

    click(): void {
        this.imageClick.emit(this.image.name);
    }

    isVideo(): boolean {
        return this.image.type.includes('video');
    }

    playVideo(): SafeUrl {
        return this.sanitizer.bypassSecurityTrustUrl(
            URL.createObjectURL(this.image)
        );
    }

    get videoPath(): string | null {
        if (this.isVideo()) {
            return '';
        }
        return null;
    }
}
