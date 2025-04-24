import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CartComponent } from './components/cart/cart.component';
import { MainComponentComponent } from './main-component/main-component.component';

const routes: Routes = [
  { path: '', component: MainComponentComponent },
  { path: 'carrito', component: CartComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
