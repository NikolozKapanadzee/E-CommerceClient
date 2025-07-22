"use client";
import { ShoppingCart, User, Menu } from "lucide-react";
import { useState, useEffect } from "react";
import { Button } from "../ui/Button";
import { useRouter } from "next/navigation";
import { useCart } from "../context/CartContext";
const Header = () => {
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const {
    totalQuantity,
    items,
    removeFromCart,
    incrementQuantity,
    decrementQuantity,
  } = useCart();

  useEffect(() => {
    setIsLoggedIn(!!localStorage.getItem("token"));
  }, []);

  const handleUserClick = () => {
    router.push("/auth/signUp");
  };
  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    router.push("/auth/signIn");
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="h-8 w-8 rounded-lg from-primary to-accent bg-sky-500"></div>
            <span className="text-xl font-bold text-foreground">TechStore</span>
          </div>
          <nav className="hidden md:flex items-center space-x-8">
            <a
              href="#"
              className="text-foreground hover:text-primary transition-colors"
            >
              Home
            </a>
            <a
              href="#"
              className="text-muted-foreground hover:text-primary transition-colors"
            >
              Products
            </a>
            <a
              href="#"
              className="text-muted-foreground hover:text-primary transition-colors"
            >
              Categories
            </a>
            <a
              href="#"
              className="text-muted-foreground hover:text-primary transition-colors"
            >
              About
            </a>
            <a
              href="#"
              className="text-muted-foreground hover:text-primary transition-colors hidden"
            >
              Admin
            </a>
          </nav>
          <div className="flex items-center space-x-2 relative">
            {!isLoggedIn && (
              <Button onClick={handleUserClick}>
                <User className="h-5 w-5" />
              </Button>
            )}
            {isLoggedIn && (
              <Button onClick={handleLogout} className="ml-2">
                Logout
              </Button>
            )}
            <Button
              className="relative"
              onClick={() => setIsCartOpen((prev) => !prev)}
              aria-label="Toggle cart popup"
            >
              <ShoppingCart className="h-5 w-5" />
              {totalQuantity > 0 && (
                <span className="absolute -top-1 -right-1 h-5 w-5 bg-blue-600 text-white text-xs rounded-full flex items-center justify-center">
                  {totalQuantity}
                </span>
              )}
            </Button>
            <Button
              className="md:hidden"
              onClick={() => setIsMobileNavOpen(!isMobileNavOpen)}
            >
              <Menu className="h-5 w-5" />
            </Button>
            {isCartOpen && (
              <div className="absolute right-0 top-14 w-80 bg-white shadow-lg rounded-lg p-4 z-50 max-h-[400px] overflow-auto">
                {items.length === 0 ? (
                  <p className="text-center text-gray-500">
                    Your cart is empty.
                  </p>
                ) : (
                  items.map(({ product, quantity }) => (
                    <div
                      key={product.id}
                      className="flex items-center mb-4 border-b pb-2 last:border-none"
                    >
                      <img
                        src={product.img}
                        alt={product.title}
                        className="w-12 h-12 object-cover rounded"
                      />
                      <div className="ml-3 flex-1">
                        <p className="font-semibold">{product.title}</p>
                        <div className="flex items-center space-x-2 mt-1">
                          <button
                            onClick={() => decrementQuantity(product.id)}
                            className="px-2 py-0.5 bg-gray-200 rounded"
                            aria-label={`Decrease quantity of ${product.title}`}
                          >
                            −
                          </button>
                          <span>{quantity}</span>
                          <button
                            onClick={() => incrementQuantity(product.id)}
                            className="px-2 py-0.5 bg-gray-200 rounded"
                            aria-label={`Increase quantity of ${product.title}`}
                          >
                            +
                          </button>
                        </div>
                        <p className="mt-1">
                          ${(product.price * quantity).toFixed(2)}
                        </p>
                      </div>
                      <button
                        onClick={() => removeFromCart(product.id)}
                        className="text-red-500 hover:text-red-700 font-bold ml-2"
                        aria-label={`Remove ${product.title} from cart`}
                      >
                        ×
                      </button>
                    </div>
                  ))
                )}
              </div>
            )}
          </div>
        </div>
        {isMobileNavOpen && (
          <nav className="md:hidden mt-2 flex flex-col space-y-2 px-4 pb-4">
            <a
              href="#"
              className="text-foreground hover:text-primary transition-colors"
            >
              Home
            </a>
            <a
              href="#"
              className="text-muted-foreground hover:text-primary transition-colors"
            >
              Products
            </a>
            <a
              href="#"
              className="text-muted-foreground hover:text-primary transition-colors"
            >
              Categories
            </a>
            <a
              href="#"
              className="text-muted-foreground hover:text-primary transition-colors"
            >
              About
            </a>
            <a
              href="#"
              className="text-muted-foreground hover:text-primary transition-colors hidden"
            >
              Admin
            </a>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;
