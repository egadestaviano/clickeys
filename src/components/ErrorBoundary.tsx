import { useRouteError, isRouteErrorResponse, Link } from "react-router-dom";

export default function ErrorBoundary() {
  const error = useRouteError();
  console.error("Router Boundary Error:", error);

  let title = "Unexpected Error";
  let message = "An unexpected error occurred. Our engineers have been notified.";

  if (isRouteErrorResponse(error)) {
    if (error.status === 404) {
      title = "Page Not Found";
      message = "We couldn't find the page you're looking for.";
    } else {
      title = `${error.status} Error`;
      if (typeof error.data === 'string') {
          message = error.data;
      } else if (error.statusText) {
          message = error.statusText;
      }
    }
  } else if (error instanceof Error) {
    message = error.message;
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-lg bg-card border border-border/50 rounded-2xl shadow-xl overflow-hidden p-8 sm:p-10 text-center animate-in fade-in zoom-in duration-500">
        <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-red-100 dark:bg-red-900/30 mb-8">
          <svg className="h-10 w-10 text-red-600 dark:text-red-500" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"/><path d="M12 9v4"/><path d="M12 17h.01"/></svg>
        </div>
        
        <h1 className="text-3xl font-bold tracking-tight text-foreground mb-3">{title}</h1>
        <p className="text-base text-muted-foreground mb-8 break-words text-balance leading-relaxed">
          {message}
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={() => window.location.reload()}
            className="inline-flex items-center justify-center gap-2 px-6 py-3 border border-input rounded-xl text-sm font-medium text-foreground bg-background hover:bg-accent hover:text-accent-foreground transition-all duration-200"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/><path d="M3 3v5h5"/></svg>
            Try again
          </button>
          
          <Link
            to="/"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl text-sm font-medium text-primary-foreground bg-primary hover:bg-primary/90 transition-all duration-200 shadow-lg shadow-primary/25 hover:shadow-primary/40"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
            Back to Home
          </Link>
        </div>

        {import.meta.env.DEV && error instanceof Error && (
            <div className="mt-8 text-left">
                <p className="text-sm font-semibold text-red-500 mb-2">Developer Details:</p>
                <div className="bg-black/5 dark:bg-white/5 p-4 rounded-lg overflow-x-auto">
                  <pre className="text-xs text-muted-foreground break-all whitespace-pre-wrap">
                      {error.stack}
                  </pre>
                </div>
            </div>
        )}
      </div>
    </div>
  );
}
