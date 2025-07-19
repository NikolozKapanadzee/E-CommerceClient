import { Button } from "../ui/Button";
import { Input } from "../ui/Input";
import { Mail, Phone, MapPin } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-muted/30 border-t">
      <div className="container mx-auto px-4 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="h-8 w-8 rounded-lg  from-primary  bg-sky-500 to-accent"></div>
              <span className="text-xl font-bold text-foreground">
                TechStore
              </span>
            </div>
            <p className="text-muted-foreground">
              Your trusted destination for the latest technology products. We
              bring you cutting-edge devices at competitive prices.
            </p>
          </div>
          <div className="space-y-4">
            <h3 className="font-semibold text-foreground">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="#"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  About Us
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  Products
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  Categories
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  Deals
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  Support
                </a>
              </li>
            </ul>
          </div>
          <div className="space-y-4">
            <h3 className="font-semibold text-foreground">Categories</h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="#"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  Smartphones
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  Laptops
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  Tablets
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  Accessories
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  Gaming
                </a>
              </li>
            </ul>
          </div>
          <div className="space-y-4">
            <h3 className="font-semibold text-foreground">Get in Touch</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <Phone className="h-4 w-4 text-muted-foreground" />
                <span className="text-muted-foreground">
                  +995 (555) 49-16-12
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <Mail className="h-4 w-4 text-muted-foreground" />
                <span className="text-muted-foreground">
                  support@techstore.com
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <MapPin className="h-4 w-4 text-muted-foreground" />
                <span className="text-muted-foreground">Georgia, Kutaisi</span>
              </div>
            </div>
            <div className="space-y-2">
              <h4 className="font-medium text-foreground">Newsletter</h4>
              <div className="flex space-x-2">
                <Input placeholder="Enter your email" className="flex-1" />
                <Button className="bg-primary hover:bg-primary-dark">
                  Subscribe
                </Button>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col lg:flex-row justify-between items-center space-y-4 lg:space-y-0">
          <p className="text-muted-foreground text-sm">
            © 2025 TechStore. All rights reserved.
          </p>
          <div className="flex space-x-6">
            <a
              href="#"
              className="text-muted-foreground hover:text-primary transition-colors text-sm"
            >
              Privacy Policy
            </a>
            <a
              href="#"
              className="text-muted-foreground hover:text-primary transition-colors text-sm"
            >
              Terms of Service
            </a>
            <a
              href="#"
              className="text-muted-foreground hover:text-primary transition-colors text-sm"
            >
              Cookie Policy
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
