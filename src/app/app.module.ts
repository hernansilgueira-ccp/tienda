import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HeaderComponentComponent } from './header-component/header-component.component';
import { ProductListComponentComponent } from './product-list-component/product-list-component.component';
import { CartComponent } from './components/cart/cart.component';

// Módulos de Bootstrap y Angular Material
import { NgbCarouselModule } from '@ng-bootstrap/ng-bootstrap';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponentComponent,
    ProductListComponentComponent,
    CartComponent,
  ],
  imports: [
    BrowserModule,
    NgbCarouselModule,
    MatIconModule,
    MatButtonModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
