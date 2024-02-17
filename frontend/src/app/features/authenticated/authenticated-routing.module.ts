import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProfileLayoutComponent } from '@features/authenticated/components/layout/profile-layout/profile-layout.component';
import { ProfileComponent } from '@features/authenticated/pages/profile/profile.component';
import { FaqPageComponent } from '@features/authenticated/pages/faq-page/faq-page.component';

const routes: Routes = [
    {
        path: '',
        component: ProfileLayoutComponent,
        children: [
            {
                path: 'profile',
                component: ProfileComponent,
            },
            {
                path: 'generator',
                loadChildren: () =>
                    import(
                        './pages/generator-page/generator-page.routing'
                    ).then(m => m),
            },
            {
                path: 'collection',
                loadChildren: () =>
                    import(
                        './pages/collection-page/collection-page.routing'
                    ).then(m => m),
            },
            {
                path: 'faq',
                component: FaqPageComponent,
            },
        ],
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class AuthenticatedRoutingModule {}
