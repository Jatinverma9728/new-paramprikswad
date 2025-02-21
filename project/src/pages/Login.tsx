import React, { useState } from "react";
import { SignIn, SignUp, useUser, useClerk } from '@clerk/clerk-react';
import { useNavigate } from "react-router-dom";
import { UserSettings } from "../components/UserSettings";
import { OrderHistory } from "../components/OrderHistory";

export const Login = () => {
  const [activeTab, setActiveTab] = useState<'account' | 'orders' | 'settings'>('account');
  const [isLogin, setIsLogin] = useState(true);
  const { isLoaded, isSignedIn, user } = useUser();
  const navigate = useNavigate();
  const { signOut } = useClerk();

  // Mock Orders Data
  const mockOrders = [
    // ...existing mock orders...
  ];

  const handleSignOut = async () => {
    try {
      await signOut();
      navigate('/');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] relative overflow-hidden bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gradient-to-br from-amber-300/30 to-orange-300/30 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-gradient-to-tr from-yellow-300/30 to-orange-300/30 rounded-full blur-3xl animate-pulse"></div>
      </div>

      {/* Main Content */}
      <div className="relative flex items-center justify-center min-h-full p-4">
        <div className="bg-white/40 backdrop-blur-xl p-8 rounded-3xl shadow-2xl w-full max-w-4xl">
          {/* Main Navigation Tabs */}
          <div className="flex justify-center mb-8">
            <div className="bg-white/50 p-1.5 rounded-2xl flex space-x-2 shadow-lg shadow-amber-100/20">
              {['Account', 'Orders', 'Settings'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab.toLowerCase() as 'account' | 'orders' | 'settings')}
                  className={`px-8 py-3 rounded-xl transition-all duration-300 font-medium ${
                    activeTab === tab.toLowerCase()
                      ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-white shadow-lg shadow-amber-200/50 scale-105'
                      : 'text-amber-700 hover:bg-white/50'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>

          {/* Content Area */}
          <div className="relative">
            {activeTab === 'account' && (
              <div className="max-w-md mx-auto">
                {isLoaded && !isSignedIn ? (
                  <>
                    <div className="text-center mb-8">
                      <h2 className="text-3xl font-bold text-amber-800">
                        {isLogin ? "Welcome Back!" : "Create Account"}
                      </h2>
                      <p className="text-amber-600 mt-2">
                        {isLogin ? "Sign in to your account" : "Sign up for a new account"}
                      </p>
                    </div>

                    {isLogin ? (
                      <SignIn 
                        appearance={{
                          elements: {
                            rootBox: "w-full",
                            card: "bg-transparent shadow-none",
                            headerTitle: "",
                            headerSubtitle: "",
                            formButtonPrimary: "bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 w-full py-3 rounded-xl",
                            formFieldInput: "w-full px-4 py-2 rounded-xl border-2 border-amber-200 focus:border-amber-500 bg-white/50",
                            socialButtonsBlockButton: "hover:bg-white/60",
                            dividerLine: "bg-amber-200",
                            dividerText: "text-amber-600",
                            footer: "hidden"
                          }
                        }}
                      />
                    ) : (
                      <SignUp 
                        appearance={{
                          // ... same appearance as SignIn
                        }}
                      />
                    )}

                    <div className="mt-6 text-center">
                      <button
                        onClick={() => setIsLogin(!isLogin)}
                        className="text-amber-700 hover:text-amber-900 font-medium"
                      >
                        {isLogin ? "Need an account? Sign up" : "Have an account? Sign in"}
                      </button>
                    </div>
                  </>
                ) : (
                  <div className="text-center space-y-4">
                    <div className="p-4 bg-white/50 rounded-xl">
                      <p className="text-lg text-amber-800 font-medium">
                        Welcome, {user?.firstName || 'User'}!
                      </p>
                      <p className="text-amber-600 text-sm mt-1">
                        {user?.primaryEmailAddress?.emailAddress}
                      </p>
                    </div>
                    <button
                      onClick={handleSignOut}
                      className="w-full bg-gradient-to-r from-amber-500 to-orange-500 text-white py-3 rounded-xl hover:from-amber-600 hover:to-orange-600"
                    >
                      Sign Out
                    </button>
                  </div>
                )}
              </div>
            )}

            {/* Orders Tab */}
            {activeTab === 'orders' && (
              <OrderHistory
                orders={mockOrders}
                onClose={() => setActiveTab('account')}
              />
            )}

            {/* Settings Tab */}
            {activeTab === 'settings' && (
              <UserSettings onClose={() => setActiveTab('account')} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
