import React from 'react';
import { Loader2 } from 'lucide-react';

interface Props {
  children: React.ReactNode;
  maxRetries?: number;
}

interface State {
  hasError: boolean;
  retryCount: number;
}

/**
 * Error boundary that auto-retries up to maxRetries times with a 1.5s delay.
 * Shows a subtle spinner during retry rather than a full error page.
 */
export class AutoRetryErrorBoundary extends React.Component<Props, State> {
  static defaultProps = { maxRetries: 3 };
  private timer: ReturnType<typeof setTimeout> | null = null;

  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, retryCount: 0 };
  }

  static getDerivedStateFromError(): Partial<State> {
    return { hasError: true };
  }

  componentDidCatch(error: Error) {
    console.warn('[AutoRetryErrorBoundary]', error.message);
    const { maxRetries = 3 } = this.props;
    if (this.state.retryCount < maxRetries) {
      this.timer = setTimeout(() => {
        this.setState(prev => ({ hasError: false, retryCount: prev.retryCount + 1 }));
      }, 1500);
    }
  }

  componentWillUnmount() {
    if (this.timer) clearTimeout(this.timer);
  }

  render() {
    if (this.state.hasError) {
      const { maxRetries = 3 } = this.props;
      if (this.state.retryCount >= maxRetries) {
        return (
          <div className="w-full h-full min-h-[360px] flex items-center justify-center text-sm text-muted-foreground bg-[hsl(0_0%_7%)]">
            3D viewer unavailable — please reload.
          </div>
        );
      }
      return (
        <div className="w-full h-full min-h-[360px] flex items-center justify-center bg-[hsl(0_0%_7%)]">
          <Loader2 className="h-5 w-5 animate-spin text-muted-foreground" />
        </div>
      );
    }
    return this.props.children;
  }
}
