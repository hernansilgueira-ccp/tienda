// frontend/src/app/models/cart-item.model.ts
export interface CartItem {
  id: string;
  name: string;
  price: number;
  imageUrl?: string;
  quantity: number;
}
