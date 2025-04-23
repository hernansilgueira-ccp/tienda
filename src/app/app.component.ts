import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponentComponent } from './header-component/header-component.component';
import { ProductListComponent } from './product-list-component/product-list-component.component';
import { RouterOutlet } from '@angular/router';
import { MainComponentComponent } from './main-component/main-component.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    HeaderComponentComponent,
    ProductListComponent,
    MainComponentComponent,
    RouterOutlet
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {}
