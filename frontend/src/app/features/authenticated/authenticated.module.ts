import { NgModule } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { AuthenticatedRoutingModule } from './authenticated-routing.module';
import { FaqPageComponent } from './pages/faq-page/faq-page.component';
import { ModelCardComponent } from './pages/generator-page/components/model-card/model-card.component';
import { SanitizerPipe } from './pipe/sanitizer.pipe';
import { FileTransformToUrlPipe } from './pipe/file-transform-to-url.pipe';
import { FaqStepComponent } from '@features/authenticated/pages/faq-page/components/faq-step/faq-step.component';
import { LineDrawerDirective } from './pages/faq-page/directives/line-drawer.directive';

@NgModule({
    declarations: [
        FaqPageComponent,
        ModelCardComponent,
        SanitizerPipe,
        FileTransformToUrlPipe,
        LineDrawerDirective,
    ],
    imports: [
        CommonModule,
        AuthenticatedRoutingModule,
        NgOptimizedImage,
        FaqStepComponent,
    ],
    exports: [ModelCardComponent, FileTransformToUrlPipe, SanitizerPipe],
})
export class AuthenticatedModule {}
