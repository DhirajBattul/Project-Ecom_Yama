import React, { useState } from "react";
import Home from "./components/Home";
import Navbar from "./components/Navbar";
import Cart from "./components/Cart";
import AddProduct from "./components/AddProduct";
import Product from "./components/Product";
import Login from "./components/Login";
import Register from "./components/Register";
import ProtectedRoute from "./components/ProtectedRoute";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AppProvider } from "./Context/Context";
import { AuthProvider } from "./Context/AuthContext";
import UpdateProduct from "./components/UpdateProduct";
import Order from "./components/Order";

import SearchResults from "./components/SearchResults";
 
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import { ToastContainer } from "react-toastify";

function App() {
  const [selectedCategory, setSelectedCategory] = useState("");

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
    console.log("Selected category:", category);
  };

  return (
    <AuthProvider>
      <AppProvider>
        <BrowserRouter>
          <ToastContainer autoClose={2000}
            hideProgressBar={true} />
          <Navbar onSelectCategory={handleCategorySelect} />
          <div className="min-vh-100 bg-light">
            <Routes>
              <Route
                path="/"
                element={
                  <Home selectedCategory={selectedCategory} />
                }
              />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/product" element={<Product />} />
              <Route path="product/:id" element={<Product />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/search-results" element={<SearchResults />} />
              
              {/* Protected Routes */}
              <Route 
                path="/add_product" 
                element={
                  <ProtectedRoute>
                    <AddProduct />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/product/update/:id" 
                element={
                  <ProtectedRoute>
                    <UpdateProduct />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/orders" 
                element={
                  <ProtectedRoute>
                    <Order />
                  </ProtectedRoute>
                } 
              />
            </Routes>
          </div>
        </BrowserRouter>
      </AppProvider>
    </AuthProvider>
  );
}

export default App;