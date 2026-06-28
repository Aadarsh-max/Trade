import { Component } from 'react';
import { AlertTriangle } from 'lucide-react';

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, info) {
    console.error('Caught by ErrorBoundary:', error, info);
  }

  handleReset = () => {
    this.setState({ hasError: false });
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-100 flex flex-col items-center justify-center text-center px-4">
          <AlertTriangle size={28} className="text-warning mb-3" />
          <p className="text-textprimary text-base font-medium mb-1">Something went wrong</p>
          <p className="text-textsecondary text-sm mb-5">This part of the app hit an unexpected error.</p>
          <button
            onClick={this.handleReset}
            className="h-9 px-4 rounded-control bg-accent text-white text-sm hover:bg-accentstrong transition-colors"
          >
            Reload page
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;