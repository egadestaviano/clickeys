import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "@/app/hooks";
import { fetchCurrentUserThunk, loginThunk } from "@/features/auth/authThunks";
import { selectAuthError, selectAuthLoading } from "@/features/auth/authSlice";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function LoginPage() {
  const [email, setEmail] = useState("user@gmail.com");
  const [password, setPassword] = useState("password");

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const isLoading = useAppSelector(selectAuthLoading);
  const error = useAppSelector(selectAuthError);
  const [localError, setLocalError] = useState<string | null>(null);

  const validate = () => {
    const trimmedEmail = email.trim();
    const trimmedPassword = password.trim();

    if (!trimmedEmail) return "Email is required";
    if (!trimmedPassword) return "Password is required";

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(trimmedEmail)) return "Invalid email format";

    if (password.length < 6) return "Password must be at least 6 characters";

    return null;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLocalError(null);

    const validationMsg = validate();
    if (validationMsg) {
      setLocalError(validationMsg);
      return;
    }

    const result = await dispatch(loginThunk({ email, password }));

    if (loginThunk.fulfilled.match(result)) {
      const currentUserResult = await dispatch(fetchCurrentUserThunk());
      const role = result.payload?.user?.role ??
        (fetchCurrentUserThunk.fulfilled.match(currentUserResult)
          ? currentUserResult.payload?.role
          : undefined);

      navigate(role === "admin" ? "/admin" : "/my/dashboard");
    }
  };

  // FIX: langsung login tanpa setState + submit
  const handleQuickLogin = async (emailValue: string, passwordValue: string) => {
    setLocalError(null);

    const result = await dispatch(
      loginThunk({ email: emailValue, password: passwordValue })
    );

    if (loginThunk.fulfilled.match(result)) {
      const currentUserResult = await dispatch(fetchCurrentUserThunk());
      const role = result.payload?.user?.role ??
        (fetchCurrentUserThunk.fulfilled.match(currentUserResult)
          ? currentUserResult.payload?.role
          : undefined);

      navigate(role === "admin" ? "/admin" : "/my/dashboard");
    } else {
      setLocalError("Quick login failed");
    }
  };

  return (
    <div className="flex items-center justify-center px-4 animate-in fade-in slide-in-from-bottom-8 duration-700">
      <div className="w-full max-w-md bg-card border border-border rounded-2xl p-8 shadow-2xl shadow-primary/10 relative overflow-hidden">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">
            Welcome Back
          </h1>
          <p className="text-muted-foreground">
            Sign in to your NeoKeys account
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-foreground mb-1.5">
              Email Address
            </label>
            <Input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 bg-background border border-border rounded-xl"
              placeholder="name@example.com"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-1.5">
              Password
            </label>
            <Input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 bg-background border border-border rounded-xl"
              placeholder="••••••••"
            />
          </div>

          {(error || localError) && (
            <div className="text-red-600 text-sm text-center bg-red-50 p-3 rounded">
              {error || localError}
            </div>
          )}

          <Button
            type="submit"
            disabled={isLoading}
            className="w-full bg-primary text-primary-foreground py-6 rounded-xl font-bold text-lg"
          >
            {isLoading ? "Signing In..." : "Sign In"}
          </Button>
        </form>

        {/* Quick Login */}
        <div className="mt-6 space-y-3">
          <p className="text-xs text-muted-foreground text-center">
            Quick Login
          </p>

          <div className="grid grid-cols-2 gap-3">
            <button
              type="button"
              onClick={() => handleQuickLogin("admin@gmail.com", "password")}
              className="p-4 rounded-xl border border-border bg-background hover:bg-muted/50 transition text-left"
            >
              <div className="text-sm font-semibold text-foreground">Admin</div>
              <div className="text-xs text-muted-foreground">
                admin@gmail.com
              </div>
            </button>

            <button
              type="button"
              onClick={() => handleQuickLogin("user@gmail.com", "password")}
              className="p-4 rounded-xl border border-border bg-background hover:bg-muted/50 transition text-left"
            >
              <div className="text-sm font-semibold text-foreground">User</div>
              <div className="text-xs text-muted-foreground">
                user@gmail.com
              </div>
            </button>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-border text-center space-y-4">
          <Link to="/auth/forgot-password" className="block text-sm text-primary">
            Forgot your password?
          </Link>

          <div className="text-sm text-muted-foreground">
            Don’t have an account?{" "}
            <Link to="/auth/register" className="text-primary">
              Register
            </Link>
          </div>

          <Link to="/" className="text-sm text-muted-foreground">
            ← Back to Shop
          </Link>
        </div>
      </div>
    </div>
  );
}