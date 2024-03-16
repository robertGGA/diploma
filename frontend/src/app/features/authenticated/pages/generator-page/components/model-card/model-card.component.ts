import {
    ChangeDetectionStrategy,
    Component,
    EventEmitter,
    Input,
    Output,
} from '@angular/core';

@Component({
    selector: 'rg-model-card',
    templateUrl: './model-card.component.html',
    styleUrls: ['./model-card.component.sass'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ModelCardComponent {
    @Input() image!: File;
    @Output() imageClick: EventEmitter<string> = new EventEmitter<string>();

    click(): void {
        this.imageClick.emit(this.image.name);
    }
}
