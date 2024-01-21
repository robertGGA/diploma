import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
    {
        path: '**',
        redirectTo: 'login',
    },
    {
        path: 'profile',
        pathMatch: 'full',
        loadChildren: () =>
            import('./features/authenticated/authenticated.routes').then(
                r => r.AUTHENTICATED_ROUTES
            ),
    },
    {
        path: 'login',
        pathMatch: 'full',
        loadComponent: () =>
            import(
                './features/public/pages/login-page/login-page.component'
            ).then(c => c.LoginPageComponent),
    },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule {}
