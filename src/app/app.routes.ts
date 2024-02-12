import { Route } from '@angular/router';


export const appRoutes: Route[] = [
    {path: '', loadComponent: () => import('./register/register.component').then(mod => mod.RegisterComponent)}
];
