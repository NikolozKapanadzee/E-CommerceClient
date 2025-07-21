"use client";
import { ShoppingCart, User, Menu } from "lucide-react";
import { useState, useEffect } from "react";
import { Button } from "../ui/Button";
import { useRouter } from "next/navigation";

const Header = () => {
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
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
          <div className="flex items-center space-x-2">
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
            <Button className="relative">
              <ShoppingCart className="h-5 w-5" />
              <span className="absolute -top-1 -right-1 h-5 w-5 bg-[blue] text-white text-xs rounded-full flex items-center justify-center">
                2
              </span>
            </Button>
            <Button
              className="md:hidden"
              onClick={() => setIsMobileNavOpen(!isMobileNavOpen)}
            >
              <Menu className="h-5 w-5" />
            </Button>
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
