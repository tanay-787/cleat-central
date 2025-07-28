
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingPage from "./src/pages/home-page/LandingPage";
import UserSignUp from "./src/pages/user-auth/UserSignUp";
import UserLogIn from "./src/pages/user-auth/UserLogIn";
import AuthProvider from './src/context/AuthContext'; 
import ProductsPage from "./src/pages/products-page/ProductsPage";
import ProductDetails from "./src/pages/product-details/ProductDetails";
import Cart from "./src/pages/cart/Cart";
import { CartProvider } from './src/context/CartContext';
import UserProfilePage from "./src/pages/user-profile/UserProfilePage";
import KnowYourBoots from "./src/pages/blog/KnowYourBoots";

export default function App() {
 
  return (
    <AuthProvider>
      <CartProvider>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/signup-user" element={<UserSignUp />} />
        <Route path="/login-user" element={<UserLogIn />} />
        <Route path="/products-page" element={<ProductsPage />} />
        <Route path="/product-details/:productId" element={<ProductDetails />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/profile" element={<UserProfilePage />} />
        <Route path="/blog" element={<KnowYourBoots />} />
       
      </Routes>
      </CartProvider>
    </AuthProvider>
  );
}
