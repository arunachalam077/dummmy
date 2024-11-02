'use client'

import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { auth } from '@/config/firebase-config';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

const words = ['Automate', 'Grow', 'Engage', 'Analyze'];

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState(null);
  const [wordIndex, setWordIndex] = useState(0);
  const [scrollY, setScrollY] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const interval = setInterval(() => {
      setWordIndex((prevIndex) => (prevIndex + 1) % words.length);
    }, 2000);

    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      clearInterval(interval);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleSignIn = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      console.log('Successfully signed in');
      navigate('/front');
    } catch (err) {
      console.error('Error signing in:', err.message);
      setError(err.message);
    }
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      console.log('Successfully signed up');
      setIsLogin(true);
      setError('Account created successfully. Please log in.');
    } catch (err) {
      console.error('Error signing up:', err.message);
      setError(err.message);
    }
  };

  const handleGoogleSignIn = async () => {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
      console.log('Successfully signed in with Google');
      navigate('/front');
    } catch (err) {
      console.error('Error signing in with Google:', err.message);
      setError(err.message);
    }
  };

  return (
    <div className="flex min-h-screen">
      {/* Left column */}
      <div className="w-full max-w-md bg-white p-8 flex flex-col justify-between">
        <div>
          <h1 className="text-2xl font-bold mb-8 bg-gradient-to-r from-purple-600 to-pink-500 bg-clip-text text-transparent">InstaX bot</h1>
          <h2 className="text-3xl font-bold mb-6 text-gray-800">{isLogin ? 'Log in' : 'Sign up'}</h2>
          <Button onClick={handleGoogleSignIn} variant="outline" className="w-full mb-4 flex items-center justify-center gap-2 text-gray-700 border-gray-300 hover:bg-gray-50">
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              {/* Google icon SVG path */}
            </svg>
            Sign {isLogin ? 'in' : 'up'} with Google
          </Button>
          <div className="text-center my-4 text-gray-500">or</div>
          <form className="space-y-4" onSubmit={isLogin ? handleSignIn : handleSignUp}>
            {!isLogin && (
              <div>
                <Label htmlFor="name" className="text-gray-700">Name</Label>
                <Input
                  id="name"
                  placeholder="John Doe"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="border-gray-300 focus:border-purple-500 focus:ring-purple-500"
                />
              </div>
            )}
            <div>
              <Label htmlFor="email" className="text-gray-700">E-mail address</Label>
              <Input
                id="email"
                type="email"
                placeholder="john@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="border-gray-300 focus:border-purple-500 focus:ring-purple-500"
              />
            </div>
            <div>
              <Label htmlFor="password" className="text-gray-700">Password</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="border-gray-300 focus:border-purple-500 focus:ring-purple-500"
              />
            </div>
            {error && <p className={`text-${error.includes('successfully') ? 'green' : 'red'}-500`}>{error}</p>}
            <Button type="submit" className="w-full bg-gradient-to-r from-purple-600 to-pink-500 hover:from-purple-700 hover:to-pink-600 text-white">
              {isLogin ? 'Log in' : 'Create account'}
            </Button>
          </form>
        </div>
        <div className="text-center mt-6">
          <span className="text-gray-600">
            {isLogin ? "Don't have an account? " : 'Already have an account? '}
          </span>
          <button className="text-purple-600 hover:underline" onClick={() => setIsLogin(!isLogin)}>
            {isLogin ? 'Sign up' : 'Log in'}
          </button>
        </div>
      </div>

      {/* Right column with parallax effect */}
      <div className="w-full bg-gradient-to-br from-purple-600 via-pink-500 to-orange-400 p-12 flex items-center justify-center">
        <div className="text-white max-w-2xl">
          <h2 className="text-6xl font-bold mb-8">
            Instagram
            <br />
            Automation
            <br />
            <span className="inline-block w-[300px]">{words[wordIndex]}</span>
          </h2>
          <p className="text-2xl mb-12 leading-relaxed">
            Boost your Instagram presence with our powerful automation tools. Grow your audience, engage with followers, and analyze your performance - all in one place.
          </p>
          <div className="flex items-center gap-6">
            <div className="flex -space-x-4">
              {['A', 'B', 'C'].map((letter, i) => (
                <div key={i} className="w-14 h-14 rounded-full bg-white/30 border-3 border-white flex items-center justify-center text-xl font-bold">
                  {letter}
                </div>
              ))}
            </div>
            <span className="text-xl">Join thousands of successful Instagram creators</span>
          </div>
        </div>
      </div>
    </div>
  );
}