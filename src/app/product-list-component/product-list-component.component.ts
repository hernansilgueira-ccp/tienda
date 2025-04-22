import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbCarouselModule } from '@ng-bootstrap/ng-bootstrap';
import { CartService } from '../services/cart.service';
import { ProductoService, Producto } from '../services/product.service';
//import { NgbCarousel } from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CommonModule, NgbCarouselModule ],
  templateUrl: './product-list-component.component.html',
  styleUrls: ['./product-list-component.component.css']
})
export class ProductListComponent implements OnInit {
  productos: Producto[] = [];
  productosAgrupados: Producto[][] = [];

  //@ViewChild('carousel', { static: true }) carousel!: NgbCarousel;

  constructor(private productoService: ProductoService, private cartService: CartService) {}

  ngOnInit(): void {
    this.productoService.getProductos().subscribe((data: Producto[]) => {
      this.productos = data.map(p => ({
        ...p,
        quantity: 1,
        agregado: false
      }));
      this.productosAgrupados = this.agruparProductos(this.productos, 8);
    });
  }
  agruparProductos(lista: Producto[], tamañoGrupo: number): Producto[][] {
    const grupos: Producto[][] = [];
    for (let i = 0; i < lista.length; i += tamañoGrupo) {
      grupos.push(lista.slice(i, i + tamañoGrupo));
    }
    return grupos;
  }
  currentSlide = 0;
  agregado: boolean = false;
  //cart: any[] = [];


  onSlideChange(event: any) {
    const slideId = parseInt(event.current.replace('ngb-slide-', ''), 10);
    this.currentSlide = isNaN(slideId) ? 0 : slideId;
  }
  
  incrementQuantity(producto: Producto) {
    producto.quantity++;
  }
  
  decrementQuantity(producto: Producto) {
    if (producto.quantity > 1) {
      producto.quantity--;
    }
  }
  agregarAlCarrito(producto: any): void {
    this.cartService.addToCart(producto);
    producto.quantity = 1;
    producto.agregado = true;

    setTimeout(() => {
      producto.agregado = false;
    }, 1000);
  }  
  /*
  addToCart(product: any): void {
    const producto = this.productos[this.currentSlide];
    this.cartService.addToCart({ ...producto });

    this.agregado = true;
    producto.cantidad = 1;

    setTimeout(() => {
      this.agregado = false;
    }, 1000);
  }
  
  getCartTotal(): number {
    return this.cart.reduce((total, item) => total + item.price * item.quantity, 0);
  }
  mostrarCarrito: boolean = false;

  toggleCarrito() {
    this.mostrarCarrito = !this.mostrarCarrito;
  }
  eliminarDelCarrito(productId: number) {
    this.cart = this.cart.filter(item => item.id !== productId);
  }
  
  vaciarCarrito() {
    this.cart = [];
  }*/
    
}
