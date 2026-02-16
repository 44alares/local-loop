import React from 'react';
import { Button } from '@/components/ui/button';

interface Props {
  children: React.ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, info: React.ErrorInfo) {
    console.error('[ErrorBoundary]', {
      error: error.message,
      stack: error.stack,
      componentStack: info.componentStack,
      translationEnabled: document.documentElement.classList.contains('translated-ltr') ||
        document.documentElement.classList.contains('translated-rtl') ||
        !!document.querySelector('.goog-te-banner-frame'),
    });
  }

  handleReset = () => {
    this.setState({ hasError: false, error: null });
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex flex-col items-center justify-center min-h-[40vh] p-8 text-center gap-4">
          <p className="text-lg font-semibold">Something went wrong.</p>
          <p className="text-sm text-muted-foreground">Please refresh the page or try again.</p>
          <div className="flex gap-3">
            <Button variant="outline" onClick={this.handleReset}>
              Try Again
            </Button>
            <Button onClick={() => window.location.reload()}>
              Refresh Page
            </Button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}
