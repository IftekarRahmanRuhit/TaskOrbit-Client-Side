
import React, { useContext, useRef, useState } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import toast from "react-hot-toast";
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { AuthContext } from '../../Provider/AuthProvider';

const Login = () => {
  const { signINUser , signInWithGoogle, loading, setLoading } = useContext(AuthContext);
  const [showPassword, setShowPassword] = useState(false);
  const emailRef = useRef();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location?.state || '/';

  const handleLogin = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;

    if (password.length < 6) {
      toast.error("Password should be at least 6 characters long");
      return;
    }

    setLoading(true);
    signINUser (email, password)
      .then(() => {
        toast.success("Welcome Back to TaskMaster!");
        e.target.reset();
        navigate('/');
      })
      .catch(() => {
        toast.error("Incorrect email or password. Please try again.");
        setLoading(false);
      });
  };

  const handleGoogleSignIn = () => {
    setLoading(true);
    signInWithGoogle()
      .then(() => navigate(from, { replace: true }))
      .catch(() => toast.error("Unable to sign in with Google. Please try again."))
      .finally(() => setLoading(false));
  };

  const handleForgetPassword = () => {
    const email = emailRef.current.value;
    if (!email) {
      toast.error("Please provide a valid email address");
    } else {
      navigate("/forgetpassword", { state: { email } });
    }
  };

  return (
    <div className="bg-[#efedf0] relative overflow-hidden flex items-center justify-center  pt-10 pb-10 max-w-screen-2xl mx-auto">
      {/* Decorative Elements */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(#38A1DB_0.5px,transparent_0.5px)] [background-size:24px_24px] opacity-[0.15]"></div>
      </div>

      <div className="container px-4 mx-auto relative z-10">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col lg:flex-row gap-8 items-center">
            {/* Left Section */}
            <div className="w-full lg:w-1/2 text-center lg:text-left hidden lg:block">
              <div className="max-w-xl mx-auto lg:mx-0">
                <h1 className="text-4xl lg:text-5xl font-bold text-[#38A1DB] mb-6">
                  Welcome to TaskMaster
                </h1>
                <p className="text-lg text-gray-600 mb-8">
                  Your ultimate solution for efficient task management.
                  Stay organized and boost your productivity.
                </p>
                <div className="hidden lg:block">
                  <div className="flex gap-4 items-center justify-start">
                    <div className="p-4 bg-white rounded-lg shadow-lg border border-gray-100">
                      <p className="text-2xl font-bold text-gray-800 mb-1">5K+</p>
                      <p className="text-sm text-gray-600">Active Users</p>
                    </div>
                    <div className="p-4 bg-white rounded-lg shadow-lg border border-gray-100">
                      <p className="text-2xl font-bold text-gray-800 mb-1">1M+</p>
                      <p className="text-sm text-gray-600">Tasks Completed</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Section - Login Form */}
            <div className="w-full lg:w-1/2 max-w-lg mx-auto">
              <div className="bg-white rounded-2xl shadow-xl border border-gray-100">
                <div className="p-8">
                  <div className="text-center mb-8">
                    <h2 className="text-2xl font-bold text-gray-800 mb-2">Sign in to your account</h2>
                    <p className="text-gray-600">Access your task management dashboard</p>
                  </div>

                  <form onSubmit={handleLogin} className="space-y-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Email Address
                      </label>
                      <input
                        type="email"
                        name="email"
                        placeholder="Enter your email"
                        
                        ref={emailRef}
                        className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-200 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
                        required
                      />
                    </div>

                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <label className="block text-sm font-medium text-gray-700">
                          Password
                        </label>
                        <button
                          type="button"
                          onClick={handleForgetPassword}
                          className="text-sm text-blue-600 hover:text-blue-700 transition duration-200"
                        >
                          Forgot password?
                        </button>
                      </div>
                      <div className="relative">
                        <input
                          type={showPassword ? "text" : "password"}
                          name="password"
                          placeholder="Enter your password"
                          
                          className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-200 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
                          required
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-blue-600 transition duration-200"
                        >
                          {showPassword ? <FaEyeSlash size={20} /> : <FaEye size={20} />}
                        </button>
                      </div>
                    </div>

                    <button
                      type="submit"
                      className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 rounded-lg shadow-lg hover:shadow-xl transition duration-200 flex items-center justify-center"
                      disabled={loading}
                    >
                      {loading ? (
                        <div className="flex items-center space-x-2">
                          <div className="w-5 h-5 border-t-2 border-b-2 border-white rounded-full animate-spin"></div>
                          <span>Signing in...</span>
                        </div>
                      ) : (
                        "Sign in"
                      )}
                    </button>

                    <div className="relative flex items-center justify-center">
                      <div className="border-t border-gray-200 w-full"></div>
                      <div className="bg-white px-4 text-sm text-gray-500">or</div>
                      <div className="border-t border-gray-200 w-full"></div>
                    </div>

                    <button
                      type="button"
                      onClick={handleGoogleSignIn}
                      className="w-full bg-white hover:bg-gray-50 text-gray-700 font-medium py-3 rounded-lg border border-gray-200 shadow-md hover:shadow-lg transition duration-200 flex items-center justify-center space-x-2"
                      disabled={loading}
                    >
                      <img
                        src="" // Add Google logo URL here
                        alt="Google"
                        className="w-5 h-5"
                      />
                      <span>Continue with Google</span>
                    </button>
                  </form>

                  <p className="text-center mt-8 text-gray-600">
                    Don't have an account?{" "}
                    <Link
                      to="/register"
                      className="text-blue-600 hover:text-blue-700 font-medium transition duration-200"
                    >
                      Create an account
                    </Link>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;