import {
    ChangeDetectorRef,
    ElementRef,
    Injectable,
    Renderer2,
} from '@angular/core';
import { Camera, Object3D, Scene, WebGLRenderer } from 'three';
import { AXIS_ENUM } from '@core/types/scene-types/scene.types';

@Injectable({
    providedIn: 'any',
})
export class ThreeSceneService {
    private scene: Scene;
    webGLRenderer: WebGLRenderer | null = null;
    private camera: Camera | null = null;
    private animationIds: number[] = [];

    constructor(
        private renderer: Renderer2,
        private canvas: ElementRef<HTMLCanvasElement>,
        private cdr: ChangeDetectorRef
    ) {
        this.scene = new Scene();
    }

    get threeScene(): Scene {
        return this.scene;
    }

    getAllObjects(): Object3D[] {
        return this.scene.children;
    }

    get threeCanvas(): ElementRef<HTMLCanvasElement> {
        return this.canvas;
    }

    get webRenderer(): WebGLRenderer | null {
        return this.webGLRenderer;
    }

    get currentCamera(): Camera | null {
        return this.camera;
    }

    // @description Метод, который добавляет массив объектов на сцену
    build(
        params?: Object3D[],
        canvas?: ElementRef<HTMLCanvasElement>
    ): ThreeSceneService {
        if (canvas) {
            this.canvas = canvas;
        }

        if (params) {
            this.addExtensionAsArray(params);
        }
        return this;
    }

    // @description Метод, который добавляет массив объектов на сцену

    private addExtensionAsArray(params: Object3D[]): void {
        params.forEach(extension => {
            this.addExtension(extension);
        });
    }

    // @description Метод, который добавляет объект на сцену, и вызывает Change Detector Ref для обнаружения изменений
    addExtension(ext: Object3D): ThreeSceneService {
        if (!this.isSceneCreated) throw Error('Init scene first');

        if (ext instanceof Camera) {
            this.camera = ext;
            return this;
        }

        this.scene.add(ext);
        this.cdr.detectChanges();
        return this;
    }

    // @description Метод, который удаляет один из объектов сцены
    removeExtension(ext: Object3D): ThreeSceneService {
        if (!this.isSceneCreated) throw Error('Init scene first');

        this.scene.remove(ext);
        return this;
    }

    // @description Метод для очистки сцены
    clearScene(): void {
        this.scene.clear();
    }

    // @description Геттер проверки на сцену
    get isSceneCreated(): boolean {
        return !!this.scene;
    }

    // @description Метод, который активирует переданную ей анимацию.
    // Входные параметры: ширина и высота canvas, метод для отрисовки анимации
    startRenderingLoop(
        width = 1000,
        height = 400,
        renderFunction?: () => void
    ): number | null {
        this.webGLRenderer = new WebGLRenderer({
            canvas: this.canvas.nativeElement,
            alpha: true,
        });
        this.webGLRenderer.setSize(width, height);

        if (!this.camera) {
            throw new Error('Add camera instance');
        }

        let id: number | null = null;

        this.camera.position.z = 5;
        const render = () => {
            if (renderFunction) {
                renderFunction();
            }
            id = requestAnimationFrame(render);
            this.animationIds.push(id);

            this.webGLRenderer?.render(this.scene, this.camera!);
        };

        render();

        return id;
    }

    // @description Отменяет анимацию в RAF'e по переданному id

    cancelAnimationFrame(id?: number): void {
        if (id) {
            cancelAnimationFrame(id);
            return;
        }
    }

    // @description Отменяет все анимации
    cancelAllAnimations(): void {
        this.animationIds.forEach(id => cancelAnimationFrame(id));
        this.animationIds = [];
    }

    isScene(object: Scene | Object3D): object is Scene {
        return object instanceof Scene;
    }

    isObject(object: Scene | Object3D): object is Object3D {
        return !(object as Scene).isScene;
    }

    rotate(
        scene: Scene | Object3D = this.scene,
        axis: AXIS_ENUM,
        angle: number,
        sideEffect: (...args: unknown[]) => void
    ): void {
        if (this.isScene(scene) || this.isObject(scene)) {
            switch (axis) {
                case AXIS_ENUM.X:
                    this.scene.rotateX(angle);
                    break;

                case AXIS_ENUM.Y:
                    this.scene.rotateY(angle);
                    break;

                case AXIS_ENUM.Z:
                    this.scene.rotateZ(angle);
                    break;
            }
            sideEffect();
        }
    }
}
