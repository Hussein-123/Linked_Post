import React from "react";
import { Link } from "react-router-dom";

export default function Notfound() {
  return (
    <section className="min-h-screen page-shell flex items-center justify-center">
      <div className="w-full max-w-md surface-card p-8 md:p-12 text-center space-y-6">
        <div className="space-y-4">
          <div className="text-5xl md:text-6xl font-black text-transparent bg-gradient-to-r from-sky-400 to-blue-600 bg-clip-text leading-none">
            404
          </div>
          <h1 className="text-xl md:text-2xl font-bold text-slate-900">
            Page Not Found
          </h1>
          <p className="muted-text text-base md:text-lg leading-7">
            Oops! The page you're looking for doesn't exist or may have been
            moved.
          </p>
        </div>

        <Link to="/" className="btn-primary w-full">
          <i className="fa-solid fa-house"></i>
          Go to Home
        </Link>
      </div>
    </section>
  );
}
