import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);
  const [rememberedUser, setRememberedUser] = useState(null);

  // Check for remembered user on component mount
  useEffect(() => {
    const savedUser = localStorage.getItem("rememberedUser");
    if (savedUser) {
      const user = JSON.parse(savedUser);
      setRememberedUser(user);
      // Auto-login if user is remembered
      localStorage.setItem("userId", user.id);
      localStorage.setItem("userName", user.name);
      localStorage.setItem("userUsername", user.username);
      localStorage.setItem("userRole", user.role || "customer");
      localStorage.setItem("userAccountType", user.accountType || "individual");
      navigate("/dashboard");
    }
  }, [navigate]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex">
      {/* Left Side - Truck Background */}
      <div 
        className="hidden lg:flex lg:w-1/2 p-12 flex-col justify-between text-white relative"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url('https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2069&q=80')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}
      >
        <div>
          <div className="flex items-center space-x-3 mb-8">
            <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center">
              <span className="text-blue-600 text-xl font-bold">🚛</span>
            </div>
            <h1 className="text-2xl font-bold">Fresh Movers Kenya</h1>
          </div>
          
          <div className="space-y-6">
            <h2 className="text-4xl font-bold leading-tight">
              Revolutionize Your Logistics Experience
            </h2>
            <p className="text-xl text-blue-100">
              Fast, reliable, and affordable cargo transportation across Kenya. 
              Join thousands of satisfied customers.
            </p>
          </div>
        </div>
        
        <div className="grid grid-cols-3 gap-6 text-center">
          <div>
            <div className="text-3xl font-bold">500+</div>
            <div className="text-blue-200 text-sm">Happy Clients</div>
          </div>
          <div>
            <div className="text-3xl font-bold">50+</div>
            <div className="text-blue-200 text-sm">Active Trucks</div>
          </div>
          <div>
            <div className="text-3xl font-bold">24/7</div>
            <div className="text-blue-200 text-sm">Support</div>
          </div>
        </div>
      </div>

      {/* Right Side - Auth Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          {/* Mobile Logo */}
          <div className="lg:hidden text-center mb-8">
            <div className="inline-flex items-center space-x-2">
              <span className="text-3xl">🚛</span>
              <span className="text-2xl font-bold text-gray-800">Fresh Movers</span>
            </div>
          </div>

          {/* Auth Toggle */}
          <div className="bg-gray-100 p-1 rounded-lg mb-8 flex">
            <button
              onClick={() => setIsLogin(true)}
              className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-all ${
                isLogin 
                  ? 'bg-white text-gray-900 shadow-sm' 
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              Sign In
            </button>
            <button
              onClick={() => setIsLogin(false)}
              className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-all ${
                !isLogin 
                  ? 'bg-white text-gray-900 shadow-sm' 
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              Sign Up
            </button>
          </div>

          {isLogin ? (
            <LoginForm 
              navigate={navigate} 
              setIsLogin={setIsLogin}
            />
          ) : (
            <SignupForm 
              navigate={navigate} 
              setIsLogin={setIsLogin}
            />
          )}
        </div>
      </div>
    </div>
  );
}

function LoginForm({ navigate, setIsLogin }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);

  const handleLogin = () => {
    if (!username.trim() || !password.trim()) {
      alert("Please fill in all fields");
      return;
    }

    // Check localStorage for registered users
    const registeredUsers = JSON.parse(localStorage.getItem("registeredUsers") || "[]");
    const user = registeredUsers.find(u => u.username === username && u.password === password);
    
    if (!user) {
      alert("Invalid username or password. Please sign up if you don't have an account.");
      setIsLogin(false);
      return;
    }

    setLoading(true);
    setTimeout(() => {
      localStorage.setItem("userId", user.id);
      localStorage.setItem("userName", user.name);
      localStorage.setItem("userUsername", user.username);
      localStorage.setItem("userRole", user.role || "customer");
      localStorage.setItem("userAccountType", user.accountType || "individual");
      
      // Remember user if checkbox is checked
      if (rememberMe) {
        localStorage.setItem("rememberedUser", JSON.stringify(user));
      }
      
      navigate("/dashboard");
      setLoading(false);
    }, 1500);
  };

  return (
    <div>
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900">Welcome back</h2>
        <p className="text-gray-600 mt-2">Please sign in to your account</p>
      </div>

      <form className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Username
          </label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
            placeholder="Enter your username"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Password
          </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
            placeholder="Enter your password"
          />
        </div>

        <div className="flex items-center justify-between">
          <label className="flex items-center">
            <input 
              type="checkbox" 
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
              className="rounded border-gray-300 text-blue-600 focus:ring-blue-500" 
            />
            <span className="ml-2 text-sm text-gray-600">Remember me</span>
          </label>
          <button
            type="button"
            onClick={() => setIsLogin(false)}
            className="text-sm text-blue-600 hover:text-blue-500"
          >
            Don't have an account? Sign up
          </button>
        </div>

        <button
          type="button"
          onClick={handleLogin}
          disabled={loading}
          className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 flex items-center justify-center"
        >
          {loading ? (
            <>
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
              Signing in...
            </>
          ) : (
            "Sign in"
          )}
        </button>
      </form>
    </div>
  );
}

function SignupForm({ navigate, setIsLogin }) {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "customer",
    accountType: "individual"
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validateName = (name) => {
    return /^[a-zA-Z\s]+$/.test(name);
  };

  const handleSignup = () => {
    if (!formData.firstName || !formData.lastName || !formData.username || !formData.email || !formData.password) {
      alert("Please fill in all fields");
      return;
    }
    
    if (!validateName(formData.firstName) || !validateName(formData.lastName)) {
      alert("Names should only contain letters and spaces");
      return;
    }
    
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    const registeredUsers = JSON.parse(localStorage.getItem("registeredUsers") || "[]");
    
    if (registeredUsers.find(u => u.username === formData.username)) {
      alert("Username already taken. Please choose a different username.");
      return;
    }
    
    if (registeredUsers.find(u => u.email === formData.email)) {
      alert("User with this email already exists. Please sign in.");
      setIsLogin(true);
      return;
    }

    setLoading(true);
    setTimeout(() => {
      const newUser = {
        id: Date.now(),
        name: `${formData.firstName} ${formData.lastName}`,
        username: formData.username,
        email: formData.email,
        password: formData.password,
        role: formData.role,
        accountType: formData.accountType
      };

      const updatedUsers = [...registeredUsers, newUser];
      localStorage.setItem("registeredUsers", JSON.stringify(updatedUsers));
      
      localStorage.setItem("rememberedUser", JSON.stringify(newUser));
      localStorage.setItem("userId", newUser.id);
      localStorage.setItem("userName", newUser.name);
      localStorage.setItem("userUsername", newUser.username);
      localStorage.setItem("userRole", newUser.role);
      localStorage.setItem("userAccountType", newUser.accountType);

      alert("Account created successfully! You are now logged in.");
      navigate("/dashboard");
      setLoading(false);
    }, 1500);
  };

  return (
    <div>
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900">Create account</h2>
        <p className="text-gray-600 mt-2">Join Fresh Movers Kenya today</p>
      </div>

      <form className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Account Type
          </label>
          <select
            name="accountType"
            value={formData.accountType}
            onChange={handleChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
          >
            <option value="individual">Individual</option>
            <option value="company">Company</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            User Role
          </label>
          <select
            name="role"
            value={formData.role}
            onChange={handleChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
          >
            <option value="customer">Customer/Farmer</option>
            <option value="driver">Driver</option>
            <option value="logistics_manager">Logistics Manager</option>
          </select>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              First name
            </label>
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              pattern="[a-zA-Z\s]+"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
              placeholder="John"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Last name
            </label>
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              pattern="[a-zA-Z\s]+"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
              placeholder="Doe"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Username
          </label>
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
            placeholder="Choose a username"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Email address
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
            placeholder="john@example.com"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Password
          </label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
            placeholder="Create a password"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Confirm password
          </label>
          <input
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
            placeholder="Confirm your password"
          />
        </div>

        <button
          type="button"
          onClick={handleSignup}
          disabled={loading}
          className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 flex items-center justify-center"
        >
          {loading ? (
            <>
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
              Creating account...
            </>
          ) : (
            "Create account"
          )}
        </button>

        <div className="text-center">
          <button
            type="button"
            onClick={() => setIsLogin(true)}
            className="text-sm text-blue-600 hover:text-blue-500"
          >
            Already have an account? Sign in
          </button>
        </div>
      </form>
    </div>
  );
}

export default Home;