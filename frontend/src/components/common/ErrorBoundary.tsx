import { Component, ErrorInfo, ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

/**
 * Top-level error boundary. Catches render-time errors anywhere in the
 * component tree below it and shows a recovery screen instead of a blank page.
 */
export class ErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false, error: null };

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, info: ErrorInfo): void {
    // In a later module this can be wired to a logging/monitoring service.
    // eslint-disable-next-line no-console
    console.error('Uncaught application error:', error, info.componentStack);
  }

  handleReload = (): void => {
    this.setState({ hasError: false, error: null });
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex min-h-screen flex-col items-center justify-center bg-blueprint-900 px-6 text-center">
          <span className="font-mono text-sm uppercase tracking-[0.3em] text-brass-300">
            System Fault
          </span>
          <h1 className="mt-4 font-display text-4xl text-paper">Something broke the blueprint.</h1>
          <p className="mt-3 max-w-md text-slate-300">
            An unexpected error stopped this page from rendering. Reloading usually fixes it.
          </p>
          <button
            onClick={this.handleReload}
            className="mt-8 rounded-sm border border-brass-500 px-6 py-3 font-mono text-sm uppercase tracking-wider text-brass-300 transition hover:bg-brass-500 hover:text-blueprint-900"
          >
            Reload page
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}
