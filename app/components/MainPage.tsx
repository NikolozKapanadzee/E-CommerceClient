import React from "react";
import Header from "./Header";
import Hero from "./Hero";
import Footer from "./Footer";
import Content from "./Content";
import { CartProvider } from "../context/CartContext";

const MainPage = () => {
  return (
    <CartProvider>
      <div>
        <Header />
        <Hero />
        <Content />
        <Footer />
      </div>
    </CartProvider>
  );
};

export default MainPage;
