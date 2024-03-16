import {
    AfterContentInit,
    ChangeDetectionStrategy,
    Component,
    OnInit,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { SceneDirective } from '@shared/modules/three/directives/scene.directive';
import { ThreeSceneService } from '@core/services/three-scene.service';
import { BoxGeometry, Mesh, MeshBasicMaterial, PerspectiveCamera } from 'three';
import { DragNDropComponent } from '@shared/ui/drag-n-drop/drag-n-drop.component';
import {
    AbstractControl,
    FormBuilder,
    FormControl,
    FormGroup,
    ReactiveFormsModule,
} from '@angular/forms';
import { FileService } from '@core/services/api/file.service';
import { DestroyService } from '@core/services/destroy.service';
import { AuthenticatedModule } from '@features/authenticated/authenticated.module';
import { map, takeUntil } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { ACCEPT_TYPES } from '@shared/ui/drag-n-drop/drag-n-drop.types';

@Component({
    selector: 'rg-generator-page',
    standalone: true,
    imports: [
        CommonModule,
        SceneDirective,
        DragNDropComponent,
        ReactiveFormsModule,
        AuthenticatedModule,
    ],
    templateUrl: './generator-page.component.html',
    styleUrls: ['./generator-page.component.sass'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [ThreeSceneService, DestroyService],
})
export class GeneratorPageComponent implements OnInit {
    formGroup: FormGroup;
    fileList$: Observable<Map<string, File>>;
    ACCEPT_TYPES = ACCEPT_TYPES;

    constructor(
        private sceneService: ThreeSceneService,
        private fb: FormBuilder,
        private fileService: FileService,
        private destroy$: DestroyService
    ) {
        this.formGroup = fb.group({
            file: new FormControl<File[] | null>(null),
        });

        this.fileList$ = this.formFileControl.valueChanges.pipe(
            map(files => {
                const fileList: Map<string, File> = new Map<string, File>();
                files?.forEach(file => {
                    fileList.set(file.name, file);
                });
                return fileList;
            }),
            takeUntil(this.destroy$)
        );
    }

    ngOnInit(): void {
        const geometry = new BoxGeometry(1, 1, 1);
        const material = new MeshBasicMaterial({ color: 'rgb(255, 0, 0)' });
        const cube = new Mesh(geometry, material);
        this.sceneService.addExtension(cube);
    }

    sendFile() {
        // if (this.formGroup.value) {
        //     this.fileService
        //         .upload(this.formGroup.value.file[0])
        //         .pipe(takeUntil(this.destroy$))
        //         .subscribe(val => {
        //             console.log(val);
        //         });
        // }
    }

    removeFile(key: string): void {
        const result = this.formFileControl.value!;

        this.formFileControl.setValue(
            result.filter(file => file.name !== key),
            { emitEvent: true }
        );
    }

    get formFileControl(): AbstractControl<File[] | null> {
        return this.formGroup.get('file')!;
    }
}
