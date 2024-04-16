import {
    AfterViewInit,
    Directive,
    ElementRef,
    Input,
    OnInit,
    SkipSelf,
} from '@angular/core';
import { ThreeSceneService } from '@core/services/three-scene.service';
import { Camera, PerspectiveCamera } from 'three';

@Directive({
    selector: '[rgScene]',
    standalone: true,
})
export class SceneDirective implements AfterViewInit, OnInit {
    @Input() camera?: Camera;

    constructor(
        private canvas: ElementRef<HTMLCanvasElement>,
        @SkipSelf() private sceneService: ThreeSceneService
    ) {
        this.sceneService.build([], this.canvas);
    }

    ngOnInit(): void {
        const camera = this.camera
            ? this.camera
            : new PerspectiveCamera(
                  75,
                  window.innerWidth / window.innerHeight,
                  0.1,
                  1000
              );

        if (!this.camera) {
            camera.position.setZ(5);
        }
        this.sceneService.addExtension(camera);
    }

    ngAfterViewInit(): void {
        this.sceneService.startRenderingLoop();
    }
}
