import { Routes } from '@angular/router';
import { ProfileComponent } from './pages/profile/profile.component';
import { AuthenticatedComponent } from '@features/authenticated/authenticated.component';

export const AUTHENTICATED_ROUTES: Routes = [
    {
        path: '',
        component: AuthenticatedComponent,
        pathMatch: 'full',
        children: [
            {
                path: '',
                component: ProfileComponent,
            },
        ],
    },
];
