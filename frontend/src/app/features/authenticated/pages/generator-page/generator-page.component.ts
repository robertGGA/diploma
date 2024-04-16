import {
    AfterViewInit,
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    ElementRef,
    HostListener,
    Renderer2,
    ViewChild,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { SceneDirective } from '@shared/modules/three/directives/scene.directive';
import { ThreeSceneService } from '@core/services/three-scene.service';
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
import { catchError, map, takeUntil } from 'rxjs/operators';
import { EMPTY, from, Observable, of, tap } from 'rxjs';
import { ACCEPT_TYPES } from '@shared/ui/drag-n-drop/drag-n-drop.types';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { DomSanitizer } from '@angular/platform-browser';
import { Camera, PerspectiveCamera } from 'three';
import { LoadingService } from '@core/services/loading.service';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

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
export class GeneratorPageComponent implements AfterViewInit {
    formGroup: FormGroup;
    fileList$: Observable<Map<string, File>>;
    ACCEPT_TYPES = ACCEPT_TYPES;
    isExpanded = false;

    @ViewChild('canvas', { static: false }) canvas:
        | ElementRef<HTMLCanvasElement>
        | undefined;

    constructor(
        private sceneService: ThreeSceneService,
        private fb: FormBuilder,
        private fileService: FileService,
        private destroy$: DestroyService,
        public loading$: LoadingService,
        private renderer: Renderer2,
        private cdr: ChangeDetectorRef
    ) {
        this.formGroup = fb.group({
            file: new FormControl<File[] | null>(null),
        });
        this.loading$.next(true);
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

    @HostListener('document:keydown.escape', ['$event']) onKeydownHandler(
        event: KeyboardEvent
    ) {
        if (this.isExpanded) {
            this.isExpanded = false;
            this.renderer.removeClass(
                this.canvas?.nativeElement,
                'canvas-expanded'
            );
        }
    }

    @HostListener('mouseover', ['$event']) onMouseEnter(e: MouseEvent) {
        console.log(e.y, e.x);
    }

    ngAfterViewInit(): void {
        const loader = new GLTFLoader();
        from(
            loader.loadAsync(
                'https://threejs.org/examples/models/gltf/DamagedHelmet/glTF/DamagedHelmet.gltf'
            )
        )
            .pipe(
                tap(gltf => {
                    this.loading$.next(false);
                    console.log(gltf);
                    this.sceneService.webRenderer?.setClearColor(0xffffff, 0);
                    const mesh = gltf.scene;
                    mesh.position.set(0, 1.05, -1);
                    this.sceneService.addExtension(mesh);
                    const camera = new PerspectiveCamera();

                    if (this.sceneService.currentCamera) {
                        camera.copy(
                            this.sceneService.currentCamera as PerspectiveCamera
                        );
                        camera.aspect = window.innerWidth / window.innerHeight;
                        camera.updateProjectionMatrix();
                    }

                    const controls = new OrbitControls(
                        camera,
                        this.sceneService.webRenderer!.domElement
                    );

                    function animate() {
                        controls.update();
                    }

                    this.sceneService.addExtension(camera);
                    controls.update();

                    this.sceneService.startRenderingLoop(1000, 300, animate);
                    this.cdr.detectChanges();
                }),
                catchError(err => {
                    console.log(err);
                    return EMPTY;
                }),
                takeUntil(this.destroy$)
            )
            .subscribe();
    }

    sendFile() {
        if (this.formGroup.value) {
            this.fileService
                .upload(this.formGroup.value.file[0])
                .pipe(takeUntil(this.destroy$))
                .subscribe(val => {
                    console.log(val);
                });
        }
    }

    expandCanvas(): void {
        this.isExpanded = !this.isExpanded;
        if (this.isExpanded) {
            this.renderer.addClass(
                this.canvas?.nativeElement,
                'canvas-expanded'
            );
            return;
        }
        this.renderer.removeClass(
            this.canvas?.nativeElement,
            'canvas-expanded'
        );
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

    createNewCamera(): Camera {
        return new PerspectiveCamera();
    }
}
