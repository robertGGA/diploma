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
import {
    delay,
    filter,
    finalize,
    map,
    switchMap,
    takeUntil,
} from 'rxjs/operators';
import { from, Observable } from 'rxjs';
import { ACCEPT_TYPES } from '@shared/ui/drag-n-drop/drag-n-drop.types';
import { GLTF, GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import {
    AmbientLight,
    Camera,
    Color,
    GridHelper,
    PerspectiveCamera,
} from 'three';
import { LoadingService } from '@core/services/loading.service';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { GeneratorSideMenuComponent } from '@features/authenticated/components/ui/generator-side-menu/generator-side-menu.component';
import { MatIconModule } from '@angular/material/icon';
import { DownloadDialogComponent } from '@features/authenticated/pages/generator-page/components/dialogs/download-dialog/download-dialog.component';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { FileHelper } from '@shared/helpers/file.helper';

@Component({
    selector: 'rg-generator-page',
    standalone: true,
    imports: [
        CommonModule,
        SceneDirective,
        DragNDropComponent,
        ReactiveFormsModule,
        AuthenticatedModule,
        GeneratorSideMenuComponent,
        MatIconModule,
        MatDialogModule,
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
    currentModel?: GLTF;

    isExpanded = false;
    isVisibleGrid = true;
    private rotateIdAnimation: number | null = null;

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
        private cdr: ChangeDetectorRef,
        private dialog: MatDialog
    ) {
        this.formGroup = fb.group({
            file: new FormControl<File[]>([]),
        });
        this.fileList$ = this.formFileControl.valueChanges.pipe(
            map(files => {
                if (!files?.length) {
                    return new Map<string, File>();
                }
                const fileList: Map<string, File> = new Map<string, File>();
                const length = files?.length ?? 1;
                const firstFile: File | null = length
                    ? files![length - 1] ?? null
                    : null;
                files?.every(file => {
                    if (
                        firstFile &&
                        FileHelper.checkMimeTypeFile(
                            file,
                            firstFile.type.split('/')[0] as ACCEPT_TYPES
                        )
                    ) {
                        fileList.set(file.name, file);
                        return true;
                    }

                    if (!firstFile) {
                        fileList.set(file.name, file);
                        return true;
                    }
                    fileList.clear();
                    fileList.set(file.name, file);
                    return false;
                });

                this.formFileControl.reset(
                    Array.from(fileList, ([name, value]) => value),
                    { emitEvent: false }
                );
                return fileList;
            }),
            takeUntil(this.destroy$)
        );
    }

    @HostListener('document:keydown.escape', ['$event']) onKeydownHandler() {
        if (this.isExpanded) {
            this.renderer.removeClass(
                this.canvas?.nativeElement,
                'canvas-expanded'
            );
            this.sceneService.currentCamera?.updateMatrix();
            this.sceneService.webRenderer?.setSize(1000, 300);
            this.isExpanded = false;
        }
    }

    ngAfterViewInit() {
        this.sceneService.addExtension(new GridHelper(100, 100));
    }

    sendFile() {
        if (this.formGroup.value?.file) {
            this.loading$.next(true);
            const loader = new GLTFLoader();
            this.fileService
                .upload(this.formGroup.value.file[0])
                .pipe(
                    delay(1),
                    switchMap(() => {
                        return from(
                            loader.loadAsync(
                                'assets/tJny_uDJr1k_0424202348.glb'
                            )
                        );
                    }),
                    finalize(() => {
                        this.loading$.next(false);
                    }),
                    takeUntil(this.destroy$)
                )
                .subscribe(gltf => {
                    this.formFileControl.setValue([], { emitEvent: true });
                    this.loading$.next(false);
                    this.currentModel = gltf;

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
                    this.addLight();
                    function animate() {
                        controls.update();
                    }

                    this.sceneService.addExtension(camera);
                    controls.update();

                    this.sceneService.startRenderingLoop(1000, 300, animate);

                    this.cdr.markForCheck();
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

            this.sceneService.currentCamera?.updateMatrix();
            this.sceneService.webRenderer?.setSize(
                window.innerWidth,
                window.innerHeight
            );
            return;
        }
        this.renderer.removeClass(
            this.canvas?.nativeElement,
            'canvas-expanded'
        );
        this.sceneService.currentCamera?.updateMatrix();
        this.sceneService.webRenderer?.setSize(1000, 300);
    }

    removeFile(key: string): void {
        const result = this.formFileControl.value!;

        this.setAutoRotate();
        this.formFileControl.setValue(
            result.filter(file => file.name !== key),
            { emitEvent: true }
        );
    }

    addLight(): void {
        const light = new AmbientLight(new Color('hsl(0, 0%, 100%)'), 1);
        light.position.set(30, 100, 100);
        this.sceneService.addExtension(light);
    }

    get formFileControl(): AbstractControl<File[] | null> {
        return this.formGroup.get('file')!;
    }

    createNewCamera(): Camera {
        return new PerspectiveCamera();
    }

    reset(): void {
        if (this.currentModel) {
            this.sceneService.clearScene();
            this.sceneService.addExtension(new GridHelper(100, 100));
        }
    }

    setAutoRotate(): void {
        if (!this.rotateIdAnimation) {
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

            controls.autoRotate = true;

            // eslint-disable-next-line no-inner-declarations
            function animate() {
                controls.update();
            }

            this.sceneService.addExtension(camera);
            controls.update();

            this.rotateIdAnimation = this.sceneService.startRenderingLoop(
                1000,
                300,
                animate
            );
        } else {
            this.sceneService.cancelAllAnimations();
            this.rotateIdAnimation = null;
        }
    }

    showGridMatrix(): void {
        this.isVisibleGrid = !this.isVisibleGrid;

        const ext = this.sceneService
            .getAllObjects()
            .find(object => object.type === 'GridHelper');

        if (ext) {
            if (!this.isVisibleGrid) {
                this.sceneService.removeExtension(ext);
            }
        } else {
            this.sceneService.addExtension(new GridHelper(100, 100));
        }
        this.cdr.markForCheck();
    }

    download(): void {
        this.dialog.open(DownloadDialogComponent, {
            panelClass: 'dialog-overlay',
            backdropClass: 'dialog-backdrop',
            hasBackdrop: true,
            data: this.currentModel,
        });
    }
}
