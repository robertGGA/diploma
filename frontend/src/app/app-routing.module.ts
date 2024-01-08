import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
    {
        path: 'profile',
        pathMatch: 'full',
        loadChildren: () => import('./features/authenticated/authenticated.routes').then(r => r.AUTHENTICATED_ROUTES)
    },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule {}
