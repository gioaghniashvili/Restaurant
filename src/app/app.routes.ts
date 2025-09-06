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
        path: '**',
        loadComponent: ( )=> import('./error/error.component').then(m => m.ErrorComponent)
    }
    
];
