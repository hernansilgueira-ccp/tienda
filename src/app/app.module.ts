import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductListComponent } from './product-list-component/product-list-component.component';
import { CartComponent } from './components/cart/cart.component';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { AppRoutingModule } from './app-routing.module';
import { BrowserModule } from '@angular/platform-browser';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

const routes: Routes = [
  { path: '', component: ProductListComponent },
  { path: 'carrito', component: CartComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes),MatIconModule,
    MatButtonModule,AppRoutingModule, BrowserModule,NgbModalModule,BrowserAnimationsModule],
  exports: [RouterModule]

})
export class AppModule {}