export interface Product {
  id: string;
  title: string;
  price: number;
  img: string;
  category: string;
  description: string;
}
export interface CartItem {
  product: Product;
  quantity: number;
}

export interface CartContextType {
  items: CartItem[];
  totalQuantity: number;
  addToCart: (product: Product) => void;
  removeFromCart: (productId: string) => void;
  incrementQuantity: (productId: string) => void;
  decrementQuantity: (productId: string) => void;
}
