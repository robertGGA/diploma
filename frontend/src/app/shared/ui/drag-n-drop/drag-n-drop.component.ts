import {
    ChangeDetectionStrategy,
    Component,
    forwardRef,
    Inject,
    Injector,
    Input,
    OnInit,
    TemplateRef,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import {
    ControlValueAccessor,
    FormControl,
    FormControlDirective,
    FormControlName,
    FormGroupDirective,
    FormsModule,
    NG_VALUE_ACCESSOR,
    NgControl,
    NgModel,
    ReactiveFormsModule,
} from '@angular/forms';
import { tap } from 'rxjs';
import { DestroyService } from '@core/services/destroy.service';
import { takeUntil } from 'rxjs/operators';
import { ACCEPT_TYPES } from '@shared/ui/drag-n-drop/drag-n-drop.types';

@Component({
    selector: 'rg-drag-n-drop',
    standalone: true,
    imports: [CommonModule, ReactiveFormsModule, FormsModule],
    templateUrl: './drag-n-drop.component.html',
    styleUrls: ['./drag-n-drop.component.sass'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => DragNDropComponent),
            multi: true,
        },
        DestroyService,
    ],
})
export class DragNDropComponent<T> implements ControlValueAccessor, OnInit {
    @Input() labelTemplate: TemplateRef<any> | null = null;
    @Input() hoveredTemplate: TemplateRef<any> | null = null;
    @Input() multiple = false;
    @Input() removePreviousValue = true;
    @Input() accept: ACCEPT_TYPES[] = [ACCEPT_TYPES.EMPTY];
    // eslint-disable-next-line no-use-before-define
    onChange = (value: any) => {};
    // eslint-disable-next-line no-use-before-define
    onTouched = () => {};
    value: File[] | null = null;
    public control!: FormControl;
    isHovered = false;

    constructor(
        @Inject(Injector) private injector: Injector,
        private destroy$: DestroyService
    ) {}

    ngOnInit(): void {
        const injectedControl = this.injector.get(NgControl);

        switch (injectedControl.constructor) {
            case NgModel: {
                const { control, update } = injectedControl as NgModel;
                this.control = control;
                this.control.valueChanges
                    .pipe(
                        tap((value: T) => update.emit(value)),
                        takeUntil(this.destroy$)
                    )
                    .subscribe();
                break;
            }
            case FormControlName: {
                this.control = this.injector
                    .get(FormGroupDirective)
                    .getControl(injectedControl as FormControlName);
                break;
            }
            default: {
                this.control = (injectedControl as FormControlDirective)
                    .form as FormControl;
                break;
            }
        }
    }

    registerOnChange(fn: any): void {
        this.onChange = fn;
    }

    changeOnLoad(event: Event): void {
        let array: File[] = [];
        const files: FileList | null = (event.target as HTMLInputElement).files;
        if (files) {
            array = this.fileListToArray(files ?? []);
        }

        this.emit(array);
    }

    registerOnTouched(fn: any): void {
        this.onTouched = fn;
    }

    private fileListToArray(fileList: FileList): Array<File> {
        const array: File[] = [];
        for (let i = 0; i < fileList?.length; i++) {
            array.push(fileList.item(i)!);
        }
        return array;
    }

    private emit(array: File[]): void {
        let result: File[] = [];

        if (!this.removePreviousValue && this.value) {
            result = [...array, ...this.value];
        } else {
            result = array;
        }

        this.writeValue(result);
        this.onChange(result);
    }

    writeValue(value: any): void {
        if (value !== undefined) {
            this.value = value;
        }
    }

    onDrag(event: DragEvent) {
        event.preventDefault();
        this.isHovered = true;
    }

    onDragLeave(event: DragEvent) {
        event.preventDefault();
        this.isHovered = false;
    }

    onDragEnd(event: DragEvent) {
        event.preventDefault();
        this.isHovered = false;
    }

    onDrop(event: DragEvent) {
        event.preventDefault();
        if (event.dataTransfer?.files) {
            const files: File[] = this.fileListToArray(
                event.dataTransfer?.files ?? []
            );
            this.emit(files);
        }
        this.isHovered = false;
    }
}
