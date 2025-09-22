"use client";

import { useState } from "react";

export default function LoginPage(): JSX.Element {
  const [email, setEmail] = useState<string>("");
  const [pass, setPass] = useState<string>("");

  return (
    <div className="max-w-md mx-auto">
      <div className="card">
        <h1 className="text-2xl font-bold">Welcome back</h1>
        <p className="text-gray-600 dark:text-gray-400 mt-1">Log in to your account</p>
        <form className="mt-6 grid gap-4" onSubmit={(e) => e.preventDefault()}>
          <div>
            <label className="label">Email</label>
            <input
              className="input"
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <label className="label">Password</label>
            <input
              className="input"
              type="password"
              placeholder="••••••••"
              value={pass}
              onChange={(e) => setPass(e.target.value)}
            />
          </div>
          <button className="btn btn-primary" type="submit">Log in</button>
        </form>
        <p className="mt-4 text-sm text-gray-600 dark:text-gray-400">
          Don’t have an account? <a className="text-[rgb(var(--primary))]" href="/auth/register">Sign up</a>
        </p>
      </div>
    </div>
  );
}
