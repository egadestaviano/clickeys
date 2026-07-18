import { Link } from "react-router-dom";

export default function NotFoundPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background text-center p-6">
      <h1 className="text-6xl font-bold text-foreground mb-4">404</h1>
      <p className="text-muted-foreground mb-6">Page not found</p>
      <Link
        to="/"
        className="text-sm bg-primary text-primary-foreground px-4 py-2 hover:bg-brand-strong"
      >
        Go Back Home
      </Link>
    </div>
  );
}
