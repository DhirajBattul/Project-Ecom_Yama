import React, { useEffect, useState, useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import AppContext from "../Context/Context";
import { useAuth } from "../Context/AuthContext";
import unplugged from "../assets/unplugged.png";

const SearchResults = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [searchData, setSearchData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if search data is available in location state
    if (location.state && location.state.searchData) {
      setSearchData(location.state.searchData);
      setLoading(false);
    } else {
      // If no search data is found, redirect to home
      navigate("/");
    }
  }, [location, navigate]);

  // Function to convert base64 string to data URL
    const convertBase64ToDataURL = (base64String, mimeType = 'image/jpeg') => {
      if (!base64String) return unplugged; // Return fallback image if no data
      
      // If it's already a data URL, return as is
      if (base64String.startsWith('data:')) {
        return base64String;
      }
      
      // If it's already a URL, return as is
      if (base64String.startsWith('http')) {
        return base64String;
      }
      
      // Convert base64 string to data URL
      return `data:${mimeType};base64,${base64String}`;
    };

  const { addToCart } = useContext(AppContext);

  const handleViewProduct = (productId) => {
    navigate(`/product/${productId}`);
  };

  const { isAuthenticated } = useAuth();
  const handleAddToCart = (productId) => {
    const product = searchData.find(p => p.id === productId);
    if (!product) return;
    if (!isAuthenticated()) {
      navigate('/login', { state: { from: location } });
      return;
    }
    const success = addToCart(product);
    if (success) {
      toast.success(`${product.name} added to cart`);
    }
  };

  if (loading) {
    return (
      <div className="container mt-5 pt-5 d-flex justify-content-center align-items-center" style={{ minHeight: "50vh" }}>
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="container mt-5 pt-5">
      <h2 className="mb-4">Search Results</h2>
      
      {searchData.length === 0 ? (
        <div className="alert alert-info">
          <i className="bi bi-info-circle-fill me-2"></i>
          No products found matching your search criteria.
        </div>
      ) : (
        <>
          <p className="text-muted mb-4">{searchData.length} product(s) found</p>
          
          <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-4">
            {searchData.map((product) => {
              // Determine best image source: prefer base64 `imageData`, then `productImage`, then external URL, then image endpoint (/api/product/:id/image)
              const imgSrc = product.imageData
                ? convertBase64ToDataURL(product.imageData)
                : product.productImage
                ? convertBase64ToDataURL(product.productImage)
                : product.imageUrl
                ? product.imageUrl
                : product.imageName
                ? `/api/product/${product.id}/image`
                : null;

              return (
                <div key={product.id} className="col">
                  <div className="card h-100 shadow-sm">
                    <img
                      src={imgSrc || unplugged}
                      className="card-img-top p-3"
                      alt={product.name}
                      style={{ height: "200px", objectFit: "contain", cursor: "pointer" }}
                      onClick={() => handleViewProduct(product.id)}
                      onError={(e) => { e.target.src = unplugged; }}
                    />
                    <div className="card-body d-flex flex-column">
                      <h5 className="card-title">{product.name}</h5>
                    <p className="card-text text-muted mb-1">{product.brand}</p>
                    <div className="mb-2">
                      <span className="badge bg-secondary">{product.category}</span>
                    </div>
                    <p className="card-text small">
                      {product.description.length > 100
                        ? product.description.substring(0, 100) + "..."
                        : product.description}
                    </p>
                    <h5 className="card-text text-primary mt-auto mb-3">₹{product.price.toLocaleString('en-IN')}</h5>
                    <div className="d-flex justify-content-between mt-auto">
                      <button 
                        className="btn btn-outline-primary btn-sm"
                        onClick={() => handleViewProduct(product.id)}
                      >
                        View Details
                      </button>
                      <button 
                        className="btn btn-primary btn-sm"
                        onClick={() => handleAddToCart(product.id)}
                        disabled={!product.productAvailable || product.stockQuantity <= 0}
                      >
                        {product.productAvailable && product.stockQuantity > 0
                          ? "Add to Cart"
                          : "Out of Stock"}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
};

export default SearchResults;