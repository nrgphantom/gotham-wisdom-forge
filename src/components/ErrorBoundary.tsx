
import React, { Component, ErrorInfo, ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
}

class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false
  };

  public static getDerivedStateFromError(_: Error): State {
    return { hasError: true };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo);
    
    // Auto redirect to home page after a brief delay
    setTimeout(() => {
      window.location.href = '/';
    }, 1000);
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-gotham-black flex items-center justify-center">
          <div className="text-center">
            <div className="text-6xl mb-4">🦇</div>
            <h2 className="font-batman text-2xl text-bat-yellow mb-4">
              SYSTEM ERROR DETECTED
            </h2>
            <p className="text-gray-300 mb-4">
              Redirecting to Batcave...
            </p>
            <div className="w-8 h-8 border-2 border-bat-yellow border-t-transparent rounded-full animate-spin mx-auto"></div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
