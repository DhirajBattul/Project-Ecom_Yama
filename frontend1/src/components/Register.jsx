import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../Context/AuthContext';
import { toast } from 'react-toastify';
import { validateUsername, validatePassword } from '../utils/authUtils';

const Register = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    confirmPassword: ''
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    
    // Clear specific error when user starts typing
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: ''
      });
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    // Validate username
    const usernameValidation = validateUsername(formData.username);
    if (!usernameValidation.isValid) {
      newErrors.username = usernameValidation.errors[0];
    }
    
    // Validate password
    const passwordValidation = validatePassword(formData.password);
    if (!passwordValidation.isValid) {
      newErrors.password = passwordValidation.errors.join(', ');
    }
    
    // Validate password confirmation
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setLoading(true);
    
    try {
      const result = await register(formData.username, formData.password);
      
      if (result.success) {
        toast.success(result.message);
        navigate('/login');
      } else {
        toast.error(result.error || 'Registration failed');
      }
    } catch (error) {
      console.error('Registration error:', error);
      toast.error('An unexpected error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mt-5 pt-4">
      <div className="row justify-content-center">
        <div className="col-md-6 col-lg-4">
          <div className="card shadow">
            <div className="card-body p-4">
              <h3 className="text-center mb-4">Register</h3>
              
              <form onSubmit={handleSubmit} noValidate>
                <div className="mb-3">
                  <label htmlFor="username" className="form-label">
                    Username
                  </label>
                  <input
                    type="text"
                    id="username"
                    name="username"
                    className={`form-control ${errors.username ? 'is-invalid' : ''}`}
                    value={formData.username}
                    onChange={handleInputChange}
                    placeholder="Choose a username"
                    disabled={loading}
                  />
                  {errors.username && (
                    <div className="invalid-feedback">
                      {errors.username}
                    </div>
                  )}
                </div>

                <div className="mb-3">
                  <label htmlFor="password" className="form-label">
                    Password
                  </label>
                  <input
                    type="password"
                    id="password"
                    name="password"
                    className={`form-control ${errors.password ? 'is-invalid' : ''}`}
                    value={formData.password}
                    onChange={handleInputChange}
                    placeholder="Create a password"
                    disabled={loading}
                  />
                  {errors.password && (
                    <div className="invalid-feedback">
                      {errors.password}
                    </div>
                  )}
                  <small className="form-text text-muted">
                    Password must be at least 6 characters with uppercase, lowercase, and numbers
                  </small>
                </div>

                <div className="mb-3">
                  <label htmlFor="confirmPassword" className="form-label">
                    Confirm Password
                  </label>
                  <input
                    type="password"
                    id="confirmPassword"
                    name="confirmPassword"
                    className={`form-control ${errors.confirmPassword ? 'is-invalid' : ''}`}
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    placeholder="Confirm your password"
                    disabled={loading}
                  />
                  {errors.confirmPassword && (
                    <div className="invalid-feedback">
                      {errors.confirmPassword}
                    </div>
                  )}
                </div>

                <div className="d-grid">
                  <button
                    type="submit"
                    className="btn btn-primary"
                    disabled={loading}
                  >
                    {loading ? (
                      <>
                        <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                        Registering...
                      </>
                    ) : (
                      'Register'
                    )}
                  </button>
                </div>
              </form>

              <div className="text-center mt-3">
                <small className="text-muted">
                  Already have an account?{' '}
                  <Link to="/login" className="text-decoration-none">
                    Login here
                  </Link>
                </small>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
