import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { CartComponent } from './cart/cart.component';
import { ErrorComponent } from './error/error.component';
export const routes: Routes = [

    {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full'
    },
    {
        path: 'home',
        loadComponent: ( )=> import('./home/home.component').then(m => m.HomeComponent)
    },
    {
        path: 'cart',
        loadComponent: ( )=> import('./cart/cart.component').then(m => m.CartComponent)
    },
    {
        path: 'register',
        loadComponent: ( )=> import('./register/register.component').then(m => m.RegisterComponent)
    },
    {
        path: 'login',
        loadComponent: ( )=> import('./login/login.component').then(m => m.LoginComponent)
    },
    {
        path: '**',
        component: ErrorComponent
    }
    
];
