import { Routes } from '@angular/router';
import { ProductsComponent } from './products/products.component';
import { CheckoutComponent } from './checkout/checkout.component';

export const routes: Routes = [
    {
        path: '',
        component: ProductsComponent
    },
    {
        path: 'products',
        component: ProductsComponent
    },
    {
        path: 'checkout',
        component: CheckoutComponent
    }
];
