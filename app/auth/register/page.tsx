"use client";

import { useState } from "react";

export default function RegisterPage(): JSX.Element {
  const [email, setEmail] = useState<string>("");
  const [pass, setPass] = useState<string>("");
  const [name, setName] = useState<string>("");

  return (
    <div className="max-w-md mx-auto">
      <div className="card">
        <h1 className="text-2xl font-bold">Create your account</h1>
        <p className="text-gray-600 dark:text-gray-400 mt-1">Start your financial journey</p>
        <form className="mt-6 grid gap-4" onSubmit={(e) => e.preventDefault()}>
          <div>
            <label className="label">Name</label>
            <input
              className="input"
              placeholder="Jane Doe"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
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
          <button className="btn btn-primary" type="submit">Sign up</button>
        </form>
        <p className="mt-4 text-sm text-gray-600 dark:text-gray-400">
          Already have an account? <a className="text-[rgb(var(--primary))]" href="/auth/login">Log in</a>
        </p>
      </div>
    </div>
  );
}
