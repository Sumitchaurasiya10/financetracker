import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useState, useEffect } from "react";

// Icon components
const CreditCard = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
  </svg>
);

const Home = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
  </svg>
);

const Transaction = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
  </svg>
);

const Plus = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
  </svg>
);

const LogOut = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
  </svg>
);

const Menu = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
  </svg>
);

const X = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
  </svg>
);

const Sparkles = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 3l1.5 6L5 15l-1.5-6L5 3zM19 3l1.5 6L19 15l-1.5-6L19 3zM12 7l1 4-1 4-1-4 1-4z" />
  </svg>
);

const User = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
  </svg>
);

const UserPlus = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
  </svg>
);

export default function Navbar() {
  const { user, logout } = useAuth();
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap');
        
        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateY(-20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        @keyframes scaleIn {
          from {
            opacity: 0;
            transform: scale(0.9);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
        
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        
        @keyframes pulse-glow {
          0%, 100% { box-shadow: 0 0 20px rgba(99, 102, 241, 0.3); }
          50% { box-shadow: 0 0 40px rgba(99, 102, 241, 0.6), 0 0 60px rgba(99, 102, 241, 0.3); }
        }
        
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-3px); }
        }
        
        .animate-slide-down {
          animation: slideDown 0.3s ease-out;
        }
        
        .animate-fade-in {
          animation: fadeIn 0.3s ease-out;
        }
        
        .animate-scale-in {
          animation: scaleIn 0.2s ease-out;
        }
        
        .animate-pulse-glow {
          animation: pulse-glow 3s ease-in-out infinite;
        }
        
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
        
        .glass-morphism {
          background: rgba(255, 255, 255, 0.1);
          backdrop-filter: blur(20px);
          border: 1px solid rgba(255, 255, 255, 0.2);
        }
        
        .glass-morphism-white {
          background: rgba(255, 255, 255, 0.95);
          backdrop-filter: blur(20px);
          border: 1px solid rgba(255, 255, 255, 0.3);
        }
        
        .shimmer {
          position: relative;
          overflow: hidden;
        }
        
        .shimmer::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(
            90deg,
            transparent,
            rgba(255, 255, 255, 0.4),
            transparent
          );
          animation: shimmer 2s infinite;
        }
        
        .nav-gradient {
          background: linear-gradient(135deg, 
            rgba(99, 102, 241, 0.1) 0%,
            rgba(168, 85, 247, 0.1) 25%,
            rgba(236, 72, 153, 0.1) 50%,
            rgba(59, 130, 246, 0.1) 75%,
            rgba(99, 102, 241, 0.1) 100%
          );
        }
        
        .nav-item-hover {
          position: relative;
          overflow: hidden;
        }
        
        .nav-item-hover::before {
          content: '';
          position: absolute;
          bottom: 0;
          left: 50%;
          width: 0;
          height: 2px;
          background: linear-gradient(90deg, #6366f1, #a855f7, #ec4899);
          transition: all 0.3s ease;
          transform: translateX(-50%);
        }
        
        .nav-item-hover:hover::before {
          width: 100%;
        }
        
        body {
          font-family: 'Inter', sans-serif;
        }
      `}</style>
      
      <nav className={`fixed top-0 w-full z-50 transition-all duration-500 ${scrolled ? 'glass-morphism-white shadow-2xl' : 'glass-morphism'}`}>
        {/* Animated background gradient */}
        <div className="absolute inset-0 nav-gradient opacity-50"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="flex justify-between items-center h-20">
            {/* Logo and Navigation Links */}
            <div className="flex items-center animate-fade-in">
              <Link 
                to="/" 
                className="flex items-center text-transparent bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text font-bold text-2xl mr-8 group transform transition-all duration-300 hover:scale-105"
              >
                <div className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 p-2.5 rounded-2xl mr-3 transition-all duration-500 group-hover:rotate-12 group-hover:shadow-lg animate-pulse-glow">
                  <CreditCard className="w-7 h-7 text-white animate-float" />
                </div>
                <span className="relative shimmer">
                  FinanceApp
                </span>
              </Link>
              
              <div className="hidden md:flex items-center space-x-2">
                <NavLink to="/" currentPath={location.pathname} icon={Home}>
                  Dashboard
                </NavLink>
                <NavLink to="/transactions" currentPath={location.pathname} icon={Transaction}>
                  Transactions
                </NavLink>
                <NavLink to="/add" currentPath={location.pathname} icon={Plus}>
                  Add Transaction
                </NavLink>
              </div>
            </div>

            {/* User Section */}
            <div className="hidden md:flex items-center space-x-4 animate-fade-in">
              {user ? (
                <>
                  <div className="flex items-center space-x-4">
                    {/* User Avatar */}
                    <div className="relative group">
                      <div className="w-12 h-12 rounded-2xl bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 flex items-center justify-center text-white font-bold text-lg shadow-lg transition-all duration-300 hover:scale-110 hover:rotate-3 animate-pulse-glow">
                        {user.name.charAt(0).toUpperCase()}
                      </div>
                      {/* Tooltip */}
                      <div className="absolute -bottom-12 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none animate-scale-in">
                        <div className="glass-morphism text-xs text-white px-3 py-2 rounded-lg whitespace-nowrap shadow-lg">
                          {user.name}
                          <div className="absolute -top-1 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-white/20 rotate-45"></div>
                        </div>
                      </div>
                    </div>
                    
                    {/* Logout Button */}
                    <button 
                      onClick={logout} 
                      className="relative overflow-hidden group flex items-center space-x-2 glass-morphism hover:bg-gradient-to-r hover:from-red-500/20 hover:to-pink-500/20 text-gray-700 hover:text-white px-6 py-3 rounded-2xl transition-all duration-300 border border-white/20 hover:border-red-400/30 transform hover:-translate-y-1 hover:shadow-lg"
                    >
                      <LogOut className="w-5 h-5 transform group-hover:translate-x-1 transition-transform duration-300" />
                      <span className="font-medium">Logout</span>
                      <div className="absolute inset-0 bg-gradient-to-r from-red-400/0 via-pink-400/0 to-red-400/0 group-hover:from-red-400/20 group-hover:via-pink-400/20 group-hover:to-red-400/20 rounded-2xl transition-all duration-300"></div>
                    </button>
                  </div>
                </>
              ) : (
                <>
                  <Link 
                    to="/login" 
                    className="relative nav-item-hover group px-6 py-3 rounded-2xl text-gray-700 hover:text-indigo-600 transition-all duration-300 font-medium transform hover:-translate-y-1 flex items-center space-x-2"
                  >
                    <User className="w-5 h-5" />
                    <span>Login</span>
                  </Link>
                  <Link 
                    to="/register" 
                    className="relative overflow-hidden group bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 hover:from-indigo-600 hover:via-purple-600 hover:to-pink-600 px-6 py-3 rounded-2xl text-white font-semibold transition-all duration-300 shadow-lg hover:shadow-2xl transform hover:-translate-y-1 hover:scale-105 flex items-center space-x-2"
                  >
                    <UserPlus className="w-5 h-5" />
                    <span>Register</span>
                    <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
                  </Link>
                </>
              )}
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden flex items-center">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="text-gray-700 hover:text-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-400/50 p-3 rounded-2xl glass-morphism transition-all duration-300 hover:scale-110"
              >
                {isMenuOpen ? (
                  <X className="h-6 w-6 transform rotate-180 transition-transform duration-300" />
                ) : (
                  <Menu className="h-6 w-6 transition-transform duration-300" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="md:hidden glass-morphism-white border-t border-white/30 shadow-2xl animate-slide-down">
            <div className="px-4 pt-4 pb-6 space-y-3">
              <MobileNavLink 
                to="/" 
                currentPath={location.pathname} 
                onClick={() => setIsMenuOpen(false)}
                icon={Home}
              >
                Dashboard
              </MobileNavLink>
              <MobileNavLink 
                to="/transactions" 
                currentPath={location.pathname} 
                onClick={() => setIsMenuOpen(false)}
                icon={Transaction}
              >
                Transactions
              </MobileNavLink>
              <MobileNavLink 
                to="/add" 
                currentPath={location.pathname} 
                onClick={() => setIsMenuOpen(false)}
                icon={Plus}
              >
                Add Transaction
              </MobileNavLink>
              
              {user ? (
                <div className="pt-6 pb-4 border-t border-white/30 mt-4">
                  <div className="flex items-center px-4 pb-4">
                    <div className="w-12 h-12 rounded-2xl bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 flex items-center justify-center text-white font-bold text-lg mr-4 shadow-lg">
                      {user.name.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <div className="text-gray-800 font-semibold text-lg">{user.name}</div>
                      <div className="text-gray-500 text-sm">Welcome back!</div>
                    </div>
                  </div>
                  <button 
                    onClick={() => {
                      logout();
                      setIsMenuOpen(false);
                    }} 
                    className="w-full flex items-center justify-center space-x-2 glass-morphism hover:bg-gradient-to-r hover:from-red-500/20 hover:to-pink-500/20 text-gray-700 hover:text-red-600 px-6 py-4 rounded-2xl transition-all duration-300 border border-white/20 hover:border-red-400/30 group"
                  >
                    <LogOut className="w-5 h-5 group-hover:scale-110 transition-transform duration-300" />
                    <span className="font-medium">Logout</span>
                  </button>
                </div>
              ) : (
                <div className="pt-6 pb-4 border-t border-white/30 mt-4 space-y-3">
                  <Link 
                    to="/login" 
                    onClick={() => setIsMenuOpen(false)}
                    className="flex items-center space-x-3 text-gray-700 hover:text-indigo-600 px-4 py-3 rounded-2xl transition-all duration-300 font-medium group"
                  >
                    <User className="w-5 h-5 group-hover:scale-110 transition-transform duration-300" />
                    <span>Login</span>
                  </Link>
                  <Link 
                    to="/register" 
                    onClick={() => setIsMenuOpen(false)}
                    className="flex items-center justify-center space-x-2 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 hover:from-indigo-600 hover:via-purple-600 hover:to-pink-600 text-white px-6 py-4 rounded-2xl transition-all duration-300 font-semibold shadow-lg group"
                  >
                    <UserPlus className="w-5 h-5 group-hover:scale-110 transition-transform duration-300" />
                    <span>Register</span>
                  </Link>
                </div>
              )}
            </div>
          </div>
        )}
      </nav>
      
      {/* Spacer to prevent content overlap */}
      <div className="h-20"></div>
    </>
  );
}

// Navigation link component for desktop
function NavLink({ to, currentPath, children, icon: Icon }) {
  const isActive = currentPath === to;
  
  return (
    <Link 
      to={to} 
      className={`relative flex items-center space-x-2 px-4 py-3 rounded-2xl text-sm font-medium transition-all duration-300 group transform hover:-translate-y-1 ${
        isActive 
          ? 'text-indigo-600 glass-morphism shadow-lg' 
          : 'text-gray-700 hover:text-indigo-600 hover:glass-morphism'
      }`}
    >
      <Icon className={`w-5 h-5 transition-all duration-300 ${isActive ? 'text-indigo-600' : 'group-hover:text-indigo-600 group-hover:scale-110'}`} />
      <span className="relative z-10">{children}</span>
      
      {/* Active indicator */}
      {isActive && (
        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-6 h-1 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full animate-scale-in"></div>
      )}
      
      {/* Hover effect */}
      <div className={`absolute inset-0 bg-gradient-to-r from-indigo-50/50 via-purple-50/50 to-pink-50/50 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${isActive ? 'opacity-100' : ''}`}></div>
    </Link>
  );
}

// Navigation link component for mobile
function MobileNavLink({ to, currentPath, children, onClick, icon: Icon }) {
  const isActive = currentPath === to;
  
  return (
    <Link 
      to={to} 
      onClick={onClick}
      className={`flex items-center space-x-3 px-4 py-4 rounded-2xl text-base font-medium transition-all duration-300 group ${
        isActive 
          ? 'text-indigo-600 glass-morphism shadow-lg' 
          : 'text-gray-700 hover:text-indigo-600 hover:glass-morphism'
      }`}
    >
      <Icon className={`w-6 h-6 transition-all duration-300 ${isActive ? 'text-indigo-600' : 'group-hover:text-indigo-600 group-hover:scale-110'}`} />
      <span>{children}</span>
      {isActive && <Sparkles className="w-4 h-4 text-indigo-400 animate-pulse ml-auto" />}
    </Link>
  );
}