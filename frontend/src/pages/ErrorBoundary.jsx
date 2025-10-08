import React from "react";

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, errorInfo: error };
  }

  componentDidCatch(error, info) {
    console.error(" ErrorBoundary caught an error:", error, info);
  }

  handleHardRefresh = () => {
   
    if (window.caches) {
      caches.keys().then(names => names.forEach(name => caches.delete(name)));
    }
    window.location.reload(true);
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen container flex flex-col items-center justify-center bg-white text-center p-6">
          <h1 className="text-2xl font-semibold text-red-600 mb-2">
            Oops! Something went wrong.
          </h1>
          <p className="text-gray-600 mb-6">
            The app ran into a problem. Try refreshing to fix it.
          </p>
          <button
            onClick={this.handleHardRefresh}
            className="  bg-primary px-10 py-5 mt-15 cursor-pointer rounded text-white font-medium hover:bg-indigo-700 transition-all"
          >
              Refresh
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
