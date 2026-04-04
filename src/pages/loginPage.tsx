import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "@/app/hooks";
import { loginThunk } from "@/features/auth/authThunks";
import {
  selectAuthError,
  selectAuthLoading,
} from "@/features/auth/authSlice";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function LoginPage() {
  const [email, setEmail] = useState("admin@gmail.com");
  const [password, setPassword] = useState("password");

  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const isLoading = useAppSelector(selectAuthLoading);
  const error = useAppSelector(selectAuthError);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const result = await dispatch(loginThunk({ email, password }));

    if (loginThunk.fulfilled.match(result)) {
      const redirectTarget =
        typeof location.state === "object" &&
        location.state !== null &&
        "from" in location.state &&
        typeof location.state.from === "object" &&
        location.state.from !== null &&
        "pathname" in location.state.from &&
        typeof location.state.from.pathname === "string"
          ? location.state.from.pathname
          : "/";

      navigate(redirectTarget, { replace: true });
    }
  };

  return (
    <div className="flex items-center justify-center px-4 py-20 animate-in fade-in slide-in-from-bottom-8 duration-700">
      <div className="relative w-full max-w-md overflow-hidden rounded-2xl border border-border bg-card p-8 shadow-2xl shadow-primary/10">
        <div className="absolute left-0 top-0 h-1 w-full bg-primary" />

        <div className="mb-8 text-center">
          <h1 className="mb-2 text-3xl font-bold text-foreground">Welcome Back</h1>
          <p className="text-muted-foreground">Sign in to your Clickeys account</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label
              htmlFor="email"
              className="mb-1.5 block text-sm font-medium text-foreground"
            >
              Email Address
            </label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-xl border border-border bg-background px-4 py-3 shadow-sm transition-all focus:border-primary focus:ring-2 focus:ring-primary"
              placeholder="name@example.com"
              autoComplete="email"
              required
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="mb-1.5 block text-sm font-medium text-foreground"
            >
              Password
            </label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-xl border border-border bg-background px-4 py-3 shadow-sm transition-all focus:border-primary focus:ring-2 focus:ring-primary"
              placeholder="••••••••"
              autoComplete="current-password"
              required
            />
          </div>

          {error && (
            <div className="rounded bg-red-50 p-3 text-center text-sm text-red-600" role="alert">
              {error}
            </div>
          )}

          <Button
            type="submit"
            disabled={isLoading}
            className="w-full rounded-xl bg-primary py-6 text-lg font-bold text-primary-foreground shadow-lg shadow-primary/20 transition-all hover:scale-[1.02] hover:bg-primary/90 active:scale-[0.98]"
          >
            {isLoading ? "Signing In..." : "Sign In"}
          </Button>
        </form>

        <div className="mt-8 space-y-4 border-t border-border pt-6 text-center">
          <Link
            to="/auth/forgot-password"
            className="block text-sm font-medium text-primary transition-colors hover:text-primary/80"
          >
            Forgot your password?
          </Link>
          <div className="text-sm text-muted-foreground">
            Don&apos;t have an account?{" "}
            <Link
              to="/auth/register"
              className="font-medium text-primary transition-colors hover:text-primary/80"
            >
              Register
            </Link>
          </div>
          <Link
            to="/"
            className="inline-block mt-4 text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            ← Back to Shop
          </Link>
        </div>
      </div>
    </div>
  );
}
