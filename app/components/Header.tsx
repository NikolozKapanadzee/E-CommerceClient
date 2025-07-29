"use client";
import { ShoppingCart, User, Menu } from "lucide-react";
import { useState, useEffect } from "react";
import { Button } from "../ui/Button";
import { useRouter } from "next/navigation";
import { useCart } from "../context/CartContext";
const Header = () => {
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState<string | null>(null);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const router = useRouter();
  const {
    totalQuantity,
    items,
    removeFromCart,
    incrementQuantity,
    decrementQuantity,
  } = useCart();
  useEffect(() => {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");
    setIsLoggedIn(!!token);
    setUserRole(role);
  }, []);
  const handleUserClick = () => router.push("/auth/signUp");
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    setIsLoggedIn(false);
    setUserRole(null);
    router.push("/auth/signIn");
  };
  const handleCheckout = () => {
    setIsCartOpen(false);
    router.push("/checkout");
  };
  const totalPrice = items.reduce(
    (sum, { product, quantity }) => sum + product.price * quantity,
    0
  );
  const renderNavLinks = () => (
    <>
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
      {userRole === "admin" && (
        <a
          href="/admin"
          className="text-blue-600 hover:text-blue-800 font-semibold transition-colors"
        >
          Admin
        </a>
      )}
    </>
  );
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="h-8 w-8 rounded-lg bg-sky-500"></div>
            <span className="text-xl font-bold text-foreground">TechStore</span>
          </div>
          <nav className="hidden md:flex items-center space-x-8">
            {renderNavLinks()}
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
                  <>
                    <div className="max-h-[280px] overflow-auto mb-4">
                      {items.map(({ product, quantity }) => (
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
                                className="px-2 py-0.5 bg-gray-200 rounded cursor-pointer"
                              >
                                −
                              </button>
                              <span>{quantity}</span>
                              <button
                                onClick={() => incrementQuantity(product.id)}
                                className="px-2 py-0.5 bg-gray-200 rounded cursor-pointer"
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
                          >
                            ×
                          </button>
                        </div>
                      ))}
                    </div>
                    <div className="border-t pt-3">
                      <div className="flex justify-between items-center mb-3">
                        <span className="font-semibold text-lg">Total:</span>
                        <span className="font-bold text-lg">
                          ${totalPrice.toFixed(2)}
                        </span>
                      </div>
                      <Button
                        onClick={handleCheckout}
                        className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg font-semibold"
                      >
                        Checkout ({totalQuantity} items)
                      </Button>
                    </div>
                  </>
                )}
              </div>
            )}
          </div>
        </div>

        {isMobileNavOpen && (
          <nav className="md:hidden mt-2 flex flex-col space-y-2 px-4 pb-4">
            {renderNavLinks()}
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;
