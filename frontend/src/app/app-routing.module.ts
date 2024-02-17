import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
    {
        path: '',
        loadChildren: () =>
            import('@features/authenticated/authenticated-routing.module').then(
                r => r.AuthenticatedRoutingModule
            ),
    },
    {
        path: 'login',
        pathMatch: 'full',
        loadComponent: () =>
            import(
                '@features/public/pages/login-page/login-page.component'
            ).then(c => c.LoginPageComponent),
    },
    {
        path: '**',
        redirectTo: 'login',
    },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule {}
