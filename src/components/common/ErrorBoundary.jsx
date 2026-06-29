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
        <div className="flex min-h-100 items-center justify-center px-4 py-12">
          <div className="flex w-full max-w-sm animate-fade-in-up flex-col items-center rounded-card border border-bordersubtle bg-surface p-8 text-center shadow-sm">
            <div className="relative mb-4">
              <div className="absolute inset-0 rounded-2xl bg-warning/15 blur-xl" />
              <div className="relative flex h-14 w-14 items-center justify-center rounded-2xl border border-warning/20 bg-warning/10">
                <AlertTriangle size={26} className="text-warning" />
              </div>
            </div>
            <p className="mb-1.5 text-base font-semibold text-textprimary">Something went wrong</p>
            <p className="mb-6 text-sm leading-relaxed text-textsecondary">
              This part of the app hit an unexpected error.
            </p>
            <button
              onClick={this.handleReset}
              className="h-10 cursor-pointer rounded-control bg-accent px-5 text-sm font-semibold text-white shadow-sm shadow-accent/20 transition-all duration-200 hover:bg-accentstrong hover:shadow-md hover:shadow-accent/25 active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/40 focus-visible:ring-offset-2 focus-visible:ring-offset-page"
            >
              Reload page
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;