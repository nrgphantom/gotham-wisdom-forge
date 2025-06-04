
import React, { useState, useEffect } from 'react';

interface AccessControlProps {
  children: React.ReactNode;
}

const AccessControl: React.FC<AccessControlProps> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [accessKey, setAccessKey] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const ADMIN_ACCESS_KEY = 'admin@batcoin#123';

  useEffect(() => {
    // Check if user is already authenticated
    const savedAuth = localStorage.getItem('batcoin_authenticated');
    if (savedAuth === 'true') {
      setIsAuthenticated(true);
    }
    setIsLoading(false);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (accessKey === ADMIN_ACCESS_KEY) {
      setIsAuthenticated(true);
      localStorage.setItem('batcoin_authenticated', 'true');
    } else {
      setError('Invalid access key. Access denied.');
      setAccessKey('');
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('batcoin_authenticated');
    setAccessKey('');
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gotham-black flex items-center justify-center">
        <div className="w-16 h-16 border-4 border-bat-yellow border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gotham-black flex items-center justify-center">
        <div className="max-w-md w-full mx-4">
          <div className="gotham-card p-8 rounded-lg">
            <div className="text-center mb-8">
              <div className="w-20 h-20 flex items-center justify-center mx-auto mb-6">
                <img 
                  src="/lovable-uploads/bb67fb31-0dc2-4b9e-8027-8461a0dfc6fc.png" 
                  alt="Batcoin Logo" 
                  className="w-16 h-16 object-contain"
                />
              </div>
              <h1 className="font-batman font-black text-3xl text-bat-yellow mb-2">
                RESTRICTED ACCESS
              </h1>
              <p className="text-gray-300 text-sm">
                Enter access key to continue
              </p>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <input
                  type="password"
                  value={accessKey}
                  onChange={(e) => setAccessKey(e.target.value)}
                  placeholder="Enter access key"
                  className="w-full px-4 py-3 bg-gotham-dark border border-gotham-gray rounded-lg text-white placeholder-gray-500 focus:border-bat-yellow focus:outline-none"
                  required
                />
              </div>

              {error && (
                <div className="mb-4 p-3 bg-red-900/20 border border-red-500 rounded-lg text-red-400 text-sm">
                  {error}
                </div>
              )}

              <button
                type="submit"
                className="w-full batman-button py-3 rounded-lg font-batman font-bold text-gotham-black uppercase tracking-wide"
              >
                Access System
              </button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-gray-500 text-xs">
                "I am vengeance, I am the night, I am Batman."
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      {children}
      {/* Hidden logout button for testing - can be accessed via browser console */}
      <button
        onClick={handleLogout}
        style={{ display: 'none' }}
        id="batcoin-logout"
      >
        Logout
      </button>
    </div>
  );
};

export default AccessControl;
