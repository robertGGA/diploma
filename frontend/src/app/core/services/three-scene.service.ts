import {
    ChangeDetectorRef,
    ElementRef,
    Injectable,
    Renderer2,
} from '@angular/core';
import { Camera, Object3D, Scene, WebGLRenderer } from 'three';

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

    private addExtensionAsArray(params: Object3D[]): void {
        params.forEach(extension => {
            this.addExtension(extension);
        });
    }

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

    removeExtension(ext: Object3D): ThreeSceneService {
        if (!this.isSceneCreated) throw Error('Init scene first');

        this.scene.remove(ext);
        return this;
    }

    clearScene(): void {
        this.scene.clear();
    }

    get isSceneCreated(): boolean {
        return !!this.scene;
    }

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

    cancelAnimationFrame(id?: number): void {
        if (id) {
            cancelAnimationFrame(id);
            return;
        }
    }

    cancelAllAnimations(): void {
        this.animationIds.forEach(id => cancelAnimationFrame(id));
        this.animationIds = [];
    }
}
