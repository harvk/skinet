import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { TestErrorComponent } from './core/test-error/test-error.component';
import { ServerErrorComponent } from './core/server-error/server-error.component';
import { NotFoundComponent } from './core/not-found/not-found.component';
import { AuthGuard } from './core/guards/auth.guard';

const routes: Routes = [
  { path: '', component: HomeComponent, data: { breadcrumb: 'Home' } },
  { path: 'test-error', component: TestErrorComponent, data: { breadcrumb: 'Test Errors' } },
  { path: 'server-error', component: ServerErrorComponent, data: { breadcrumb: 'Server Error' } },
  { path: 'not-found', component: NotFoundComponent, data: { breadcrumb: 'Not Found' } },
  { path: 'shop', loadChildren: () => import('./shop/shop.module').then(mod => mod.ShopModule), 
    data: { breadcrumb: 'Shop' } }, // lazy loading
  { path: 'basket', loadChildren: () => import('./basket/basket.module').then(mod => mod.BasketModule), 
    data: { breadcrumb: 'Basket' } }, // lazy loading

  {
    path: 'checkout',
    canActivate: [AuthGuard],
    loadChildren: () => import('./checkout/checkout.module').then(mod => mod.CheckoutModule), // lazy loading
    data: { breadcrumb: 'Checkout' }
  },

  { path: 'account', loadChildren: () => import('./account/account.module').then(mod => mod.AccountModule), 
    data: { breadcrumb: { skip: true } } }, // lazy loading, prevent breadcrumb from giving breadcrumb
  
  { path: '**', redirectTo: 'not-found', pathMatch: 'full' } // important to include pathMatch for empty path redirects
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
