import { useState } from 'react';
import SignUpForm from '../../components/SignUpForm/SignUpForm';
import LoginForm from '../../components/LoginForm/LoginForm';

export default function AuthPage({ setUser }) {
  const [showSignUp, setShowSignUp] = useState(false);
  
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h1 className="text-3xl font-bold mb-6 text-center">Welcome</h1>
        <button 
          className="w-full mb-4 bg-violet-500 text-white py-2 rounded hover:bg-violet-600 transition duration-300"
          onClick={() => setShowSignUp(!showSignUp)}
        >
          {showSignUp ? 'Log In' : 'Sign Up'}
        </button>
        {showSignUp ? 
          <SignUpForm setUser={setUser} />
          :
          <LoginForm setUser={setUser} />
        }
      </div>
    </div>
  );
}