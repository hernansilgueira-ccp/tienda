import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbCarouselModule } from '@ng-bootstrap/ng-bootstrap';
import { CartService } from '../services/cart.service';


@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CommonModule, NgbCarouselModule],
  templateUrl: './product-list-component.component.html',
  styleUrls: ['./product-list-component.component.css']
})
export class ProductListComponent {
  products = [
    { id: 91, name: 'Peso', price: 250,quantity: 1  },
    { id: 2, name: 'Computadora', price: 400,quantity: 1  },
    { id: 3, name: 'Celular', price: 600,quantity: 1  },
    { id: 4, name: 'Reloj', price: 350,quantity: 1  }
  ].map(p => ({ ...p, image: `https://picsum.photos/id/${p.id}/900/500` }));

  constructor(private cartService: CartService) {}

  currentSlide = 0;
  agregado: boolean = false;
  cart: any[] = [];


  onSlideChange(event: any) {
    const slideId = parseInt(event.current.replace('ngb-slide-', ''), 10);
    this.currentSlide = isNaN(slideId) ? 0 : slideId;
  }
  
  
  
  
  incrementQuantity(index: number) {
    this.products[index].quantity++;
  }
  
  decrementQuantity(index: number) {
    if (this.products[index].quantity > 1) {
      this.products[index].quantity--;
    }
  }
  addToCart(product: any) {
    const producto = this.products[this.currentSlide];
    const productoExistente = this.cart.find(item => item.id === producto.id);
  
    if (productoExistente) {
      productoExistente.quantity += producto.quantity;
    } else {
      this.cart.push({ ...producto });
    }
  
    this.agregado = true;
    producto.quantity = 1;
  
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
  }
}
