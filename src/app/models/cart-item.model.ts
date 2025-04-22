export interface CartItem {
  id: string;           // string para coincidir con la sesión
  name: string;
  price: number;
  quantity: number;
  imageUrl?: string;
}
