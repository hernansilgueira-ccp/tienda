import { NgModule } from '@angular/core';
<<<<<<< HEAD
import { RouterModule, Routes } from '@angular/router';
import { ProductListComponent } from './product-list-component/product-list-component.component';
import { CartComponent } from './components/cart/cart.component';

const routes: Routes = [
  { path: '', component: ProductListComponent },
  { path: 'carrito', component: CartComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
=======
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  declarations: [
    // otros componentes
  ],
  imports: [
    // otros módulos
    MatIconModule,
    MatButtonModule
  ],
  // ...
>>>>>>> remotes/origin/Largo
})
export class AppRoutingModule {}