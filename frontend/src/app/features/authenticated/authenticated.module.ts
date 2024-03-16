import { NgModule } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { AuthenticatedRoutingModule } from './authenticated-routing.module';
import { FaqPageComponent } from './pages/faq-page/faq-page.component';
import { ModelCardComponent } from './pages/generator-page/components/model-card/model-card.component';
import { SanitizerPipe } from './pipe/sanitizer.pipe';
import { FileTransformToUrlPipe } from './pipe/file-transform-to-url.pipe';

@NgModule({
    declarations: [
        FaqPageComponent,
        ModelCardComponent,
        SanitizerPipe,
        FileTransformToUrlPipe,
    ],
    imports: [CommonModule, AuthenticatedRoutingModule, NgOptimizedImage],
    exports: [ModelCardComponent, FileTransformToUrlPipe, SanitizerPipe],
})
export class AuthenticatedModule {}
