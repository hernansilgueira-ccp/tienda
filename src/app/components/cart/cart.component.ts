// cart.component.ts
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; 
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';




@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, FormsModule ],
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  cartItems: any[] = [];
  couponCode: string = '';
  discountApplied: boolean = false;
  total: number = 0;
  totalWithDiscount: number = 0;
  descuento: number = 0;

  couponFeedback: string = '';
  


  @Output() cerrarCarrito = new EventEmitter<void>();

  constructor(private cartService: CartService) {}

  ngOnInit() {
    this.loadCart();
  }

  loadCart() {
    this.cartItems = this.cartService.getCart();
    console.log("🛒 Items en el carrito:", this.cartItems);
    this.calculateTotal();
  }

  increaseQty(item: any) {
    this.cartService.updateQuantity(item.id, item.quantity + 1);
    this.loadCart();
  }

  decreaseQty(item: any) {
    if (item.quantity > 1) {
      this.cartService.updateQuantity(item.id, item.quantity - 1);
      this.loadCart();
    }
  }

  removeItem(id: number) {
    this.cartService.removeFromCart(id);
    this.loadCart();
  }

  applyCoupon() {
    const code = this.couponCode.trim();
    const applied = this.cartService.applyCoupon(code);
  
    this.discountApplied = applied;
  
    if (applied) {
      this.totalWithDiscount = this.cartService.getTotalWithDiscount();
      this.couponFeedback = `✅ Cupón aplicado: ${this.cartService.getDescuento()}% de descuento.`;
    } else {
      this.totalWithDiscount = 0;
      this.couponFeedback = '❌ Cupón inválido. Usa un código válido de 8 caracteres, como MITIENDA25.';
    }
  }
  
  
  

  calculateTotal() {
    this.total = this.cartService.getTotal();
    if (this.discountApplied) {
      this.totalWithDiscount = this.cartService.getTotalWithDiscount();
    }
  }
  
  cerrar() {
    this.cerrarCarrito.emit();
  }


  compraFinalizada: boolean = false;

finalizarCompra() {
  // Aquí puedes simular el envío o resetear el carrito
  this.cartService.clearCart();
  this.loadCart();
  this.compraFinalizada = true;

  // Ocultar el mensaje después de unos segundos
  setTimeout(() => {
    this.compraFinalizada = false;
  }, 2000);
}


}
