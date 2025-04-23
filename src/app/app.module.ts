import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { ProductListComponent } from './product-list-component/product-list-component.component';
import { CartComponent } from './components/cart/cart.component';
// Importar módulos de Angular Material necesarios:
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  declarations: [
    AppComponent,
    ProductListComponent,
    CartComponent,
    // ... otros componentes ...
  ],
  imports: [
    BrowserModule,
    // ... otros módulos como FormsModule/HttpClientModule si se usan ...
    MatIconModule,
    MatButtonModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
