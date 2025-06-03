import { useState } from 'react';
import Link from 'next/link';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4 sm:p-24">
      <div className="z-10 w-full max-w-5xl items-center justify-between font-mono text-sm">
        <div className="flex flex-col items-center justify-center">
          <h1 className="text-4xl font-bold text-center text-primary-600 mb-6 animate-float">
            Educational App for Children
          </h1>
          <p className="text-xl text-center mb-8">
            Learn mathematics through structured practice
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 mt-6">
            <Link 
              href="/auth/login"
              className="btn-primary text-center px-8 py-3 text-lg"
            >
              Login
            </Link>
            <Link 
              href="/auth/register"
              className="btn-secondary text-center px-8 py-3 text-lg"
            >
              Sign Up
            </Link>
          </div>
          
          <div className="mt-16 grid grid-cols-1 sm:grid-cols-3 gap-8">
            <div className="card">
              <h3 className="text-xl font-bold mb-2 text-primary-600">Interactive Learning</h3>
              <p>Engage with fun, interactive content designed specifically for children.</p>
            </div>
            <div className="card">
              <h3 className="text-xl font-bold mb-2 text-primary-600">Track Progress</h3>
              <p>Monitor learning progress with detailed analytics and performance tracking.</p>
            </div>
            <div className="card">
              <h3 className="text-xl font-bold mb-2 text-primary-600">Personalized Experience</h3>
              <p>Content adapts to each child's learning pace and style.</p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
