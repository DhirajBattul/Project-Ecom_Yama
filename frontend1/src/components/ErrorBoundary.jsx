import React from 'react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, info: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, info) {
    // You can send error logs to a remote logging service here
    console.error('Unhandled error caught by ErrorBoundary:', error, info);
    this.setState({ info });
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="container mt-5 pt-5">
          <div className="alert alert-danger text-center">
            <h4 className="mb-3">Something went wrong</h4>
            <p className="mb-3">An unexpected error occurred while rendering the app. Check the browser console for details.</p>
            <div>
              <button className="btn btn-primary me-2" onClick={() => window.location.reload()}>Reload</button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children; 
  }
}

export default ErrorBoundary;
