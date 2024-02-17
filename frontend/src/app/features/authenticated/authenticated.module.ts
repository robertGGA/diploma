import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthenticatedRoutingModule } from './authenticated-routing.module';
import { FaqPageComponent } from './pages/faq-page/faq-page.component';

@NgModule({
    declarations: [FaqPageComponent],
    imports: [CommonModule, AuthenticatedRoutingModule],
})
export class AuthenticatedModule {}
