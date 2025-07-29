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
  itemName: string;
  description: string;
  price: string;
  category: string;
  img: File | null;
}
export interface ValidationErrors {
  itemName?: string;
  description?: string;
  price?: string;
  category?: string;
  img?: string;
  [key: string]: string | undefined;
}
