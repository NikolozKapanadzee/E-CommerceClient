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

export interface ProductFormData {
  title: string;
  description: string;
  price: string;
  img: string;
  category: string;
}
export interface ValidationErrors {
  title?: string;
  description?: string;
  price?: string;
  img?: string;
  category?: string;
  [key: string]: string | undefined;
}
