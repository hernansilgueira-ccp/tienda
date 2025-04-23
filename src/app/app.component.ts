import { Component, ViewChild, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NgbCarouselModule } from '@ng-bootstrap/ng-bootstrap';
import { HeaderComponentComponent } from "./header-component/header-component.component";
import { MainComponentComponent } from "./main-component/main-component.component";
import { ProductListComponent } from "./product-list-component/product-list-component.component";
import { CartComponent } from './components/cart/cart.component';
import { MatIconModule } from '@angular/material/icon';
import { ProductoService, Producto } from './services/product.service';
import { CartService } from './services/cart.service';

@Component({
  standalone: true,
  selector: 'app-root',
  imports: [
    RouterOutlet,
    CommonModule,
    NgbCarouselModule,
    HeaderComponentComponent,
    MainComponentComponent,
    ProductListComponent,
    MatIconModule,
    CartComponent 
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  productos: Producto[] = [];
  title = 'tienda';
  couponCode = '';
  totalConDescuento = 0;

  @ViewChild(CartComponent) cartComponent!: CartComponent;

  constructor(
    private productoService: ProductoService,
    private cartService: CartService
  ) {}

  ngOnInit(): void {
    this.productoService.getProductos().subscribe(data => {
      this.productos = data;
    });
  }

  agregarProductoDemo() {
    const nuevoProducto: Producto = {
      nombre: 'Producto Demo',
      precio: 9.99,
      descripcion: 'Producto de prueba',
      imagen: 'demo.jpg',
      quantity: 1,
      agregado: false
    };
    this.productos.push(nuevoProducto);
  }

  aplicarCupon(): void {
    if (this.cartService.applyCoupon(this.couponCode)) {
      this.totalConDescuento = this.cartService.getTotalWithDiscount();
    } else {
      this.totalConDescuento = 0;
      alert('Cupón inválido');
    }
  }
  mostrarCarrito = false;

  toggleCart() {
  this.mostrarCarrito = !this.mostrarCarrito;
}

}
