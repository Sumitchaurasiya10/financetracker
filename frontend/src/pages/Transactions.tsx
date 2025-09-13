import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

// Replace this with your actual API
import api from "../api/api";

type Transaction = {
  _id: string;
  title: string;
  amount: number;
  type: string;
  category: string;
  date: string;
};

// Icon components
const DollarSign = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
  </svg>
);

const TrendingUp = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
  </svg>
);

const TrendingDown = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 17h8m0 0V9m0 8l-8-8-4 4-6-6" />
  </svg>
);

const Edit = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
  </svg>
);

const Trash2 = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
  </svg>
);

const Calendar = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
  </svg>
);

const Tag = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
  </svg>
);

const Plus = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
  </svg>
);

const Search = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
  </svg>
);

const Filter = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.707A1 1 0 013 7V4z" />
  </svg>
);

const SortAsc = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 4h13M3 8h9m-9 4h6m4 0l4-4m0 0l4 4m-4-4v12" />
  </svg>
);

const SortDesc = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 4h13M3 8h9m-9 4h9m5-4v12m0 0l-4-4m4 4l4-4" />
  </svg>
);

const X = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
  </svg>
);

const RotateCcw = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 4v6h6m16 10v-6h-6M7.7 7.7A9 9 0 1016.3 16.3 9 9 0 007.7 7.7z" />
  </svg>
);

const Eye = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
  </svg>
);

const Grid = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
  </svg>
);

const List = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h2M9 5a2 2 0 012 2v10a2 2 0 01-2 2M9 5a2 2 0 012-2h10a2 2 0 012 2v10a2 2 0 01-2 2H11a2 2 0 01-2-2" />
  </svg>
);

export default function TransactionList() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("all");
  const [filterCategory, setFilterCategory] = useState("all");
  const [dateRange, setDateRange] = useState("all");
  const [amountRange, setAmountRange] = useState({ min: "", max: "" });
  const [sortBy, setSortBy] = useState("date");
  const [sortOrder, setSortOrder] = useState("desc");
  const [viewMode, setViewMode] = useState<"table" | "cards">("table");
  const [isLoading, setIsLoading] = useState(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [showFilters, setShowFilters] = useState(false);

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const res = await api.get("/transactions");
      setTransactions(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    setDeleteId(id);
    try {
      await api.delete(`/transactions/${id}`);
      await fetchData();
    } catch (err) {
      console.error(err);
    } finally {
      setDeleteId(null);
    }
  };

  const clearAllFilters = () => {
    setSearchTerm("");
    setFilterType("all");
    setFilterCategory("all");
    setDateRange("all");
    setAmountRange({ min: "", max: "" });
    setSortBy("date");
    setSortOrder("desc");
  };

  useEffect(() => {
    api.get("/transactions")
      .then(res => setTransactions(res.data))
      .catch(err => console.error(err));
  }, []);

  // Get unique categories for filter dropdown
  const uniqueCategories = [...new Set(transactions.map(t => t.category))];

  // Apply all filters and sorting
  const filteredTransactions = transactions
    .filter(transaction => {
      // Search filter
      const matchesSearch = transaction.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           transaction.category.toLowerCase().includes(searchTerm.toLowerCase());
      
      // Type filter
      const matchesType = filterType === "all" || transaction.type === filterType;
      
      // Category filter
      const matchesCategory = filterCategory === "all" || transaction.category === filterCategory;
      
      // Date range filter
      const transactionDate = new Date(transaction.date);
      const now = new Date();
      let matchesDate = true;
      
      if (dateRange === "today") {
        matchesDate = transactionDate.toDateString() === now.toDateString();
      } else if (dateRange === "week") {
        const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
        matchesDate = transactionDate >= weekAgo;
      } else if (dateRange === "month") {
        const monthAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
        matchesDate = transactionDate >= monthAgo;
      } else if (dateRange === "year") {
        const yearAgo = new Date(now.getTime() - 365 * 24 * 60 * 60 * 1000);
        matchesDate = transactionDate >= yearAgo;
      }
      
      // Amount range filter
      const matchesAmount = 
        (!amountRange.min || transaction.amount >= parseFloat(amountRange.min)) &&
        (!amountRange.max || transaction.amount <= parseFloat(amountRange.max));
      
      return matchesSearch && matchesType && matchesCategory && matchesDate && matchesAmount;
    })
    .sort((a, b) => {
      let comparison = 0;
      
      switch (sortBy) {
        case "date":
          comparison = new Date(a.date).getTime() - new Date(b.date).getTime();
          break;
        case "amount":
          comparison = a.amount - b.amount;
          break;
        case "title":
          comparison = a.title.localeCompare(b.title);
          break;
        case "category":
          comparison = a.category.localeCompare(b.category);
          break;
        default:
          comparison = 0;
      }
      
      return sortOrder === "asc" ? comparison : -comparison;
    });

  const totalIncome = filteredTransactions.filter(t => t.type === 'income').reduce((sum, t) => sum + t.amount, 0);
  const totalExpense = filteredTransactions.filter(t => t.type === 'expense').reduce((sum, t) => sum + t.amount, 0);
  const balance = totalIncome - totalExpense;

  const activeFiltersCount = [
    searchTerm,
    filterType !== "all" ? filterType : null,
    filterCategory !== "all" ? filterCategory : null,
    dateRange !== "all" ? dateRange : null,
    amountRange.min || amountRange.max ? "amount" : null
  ].filter(Boolean).length;

  const TransactionCard = ({ transaction, index }: { transaction: Transaction; index: number }) => (
    <div
      className="glass-morphism rounded-2xl p-6 transform transition-all duration-500 hover:scale-105 hover:shadow-indigo-500/25 animate-fade-in-up group"
      style={{ animationDelay: `${index * 0.1}s` }}
    >
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center">
          <div className={`w-12 h-12 rounded-xl flex items-center justify-center mr-4 ${transaction.type === 'income' ? 'bg-green-500/20' : 'bg-red-500/20'}`}>
            {transaction.type === 'income' ? 
              <TrendingUp className="w-6 h-6 text-green-400" /> :
              <TrendingDown className="w-6 h-6 text-red-400" />
            }
          </div>
          <div>
            <h3 className="text-white font-semibold text-lg group-hover:text-indigo-200 transition-colors duration-200">
              {transaction.title}
            </h3>
            <p className="text-gray-400 text-sm">
              {transaction.type.charAt(0).toUpperCase() + transaction.type.slice(1)}
            </p>
          </div>
        </div>
        <span className={`text-2xl font-bold ${transaction.type === 'income' ? 'text-green-400' : 'text-red-400'}`}>
          {transaction.type === "expense" ? "-" : "+"}${transaction.amount.toLocaleString()}
        </span>
      </div>
      
      <div className="flex items-center justify-between text-sm text-gray-300 mb-4">
        <div className="flex items-center">
          <Tag className="w-4 h-4 mr-2" />
          {transaction.category}
        </div>
        <div className="flex items-center">
          <Calendar className="w-4 h-4 mr-2" />
          {new Date(transaction.date).toLocaleDateString()}
        </div>
      </div>
      
      <div className="flex items-center justify-end space-x-3">
        <Link
          to={`/${transaction._id}/edit`}
          className="p-2 bg-indigo-500/20 hover:bg-indigo-500/30 rounded-lg text-indigo-400 hover:text-indigo-300 transition-all duration-200 hover:scale-110"
        >
          <Edit className="w-4 h-4" />
        </Link>
        <button
          onClick={() => handleDelete(transaction._id)}
          disabled={deleteId === transaction._id}
          className="p-2 bg-red-500/20 hover:bg-red-500/30 rounded-lg text-red-400 hover:text-red-300 transition-all duration-200 hover:scale-110 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {deleteId === transaction._id ? (
            <div className="w-4 h-4 animate-spin rounded-full border-2 border-red-400/30 border-t-red-400"></div>
          ) : (
            <Trash2 className="w-4 h-4" />
          )}
        </button>
      </div>
    </div>
  );

  return (
    <>
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap');
        
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-15px); }
        }
        
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes slideInLeft {
          from {
            opacity: 0;
            transform: translateX(-50px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        
        @keyframes slideInRight {
          from {
            opacity: 0;
            transform: translateX(50px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        
        @keyframes pulse-slow {
          0%, 100% { opacity: 0.4; }
          50% { opacity: 0.8; }
        }
        
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        
        @keyframes glow {
          0%, 100% { box-shadow: 0 0 20px rgba(168, 85, 247, 0.4); }
          50% { box-shadow: 0 0 40px rgba(168, 85, 247, 0.8), 0 0 60px rgba(168, 85, 247, 0.4); }
        }
        
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        
        .animate-fade-in-up {
          animation: fadeInUp 0.6s ease-out forwards;
        }
        
        .animate-slide-in-left {
          animation: slideInLeft 0.8s ease-out forwards;
        }
        
        .animate-slide-in-right {
          animation: slideInRight 0.8s ease-out forwards;
        }
        
        .animate-pulse-slow {
          animation: pulse-slow 4s ease-in-out infinite;
        }
        
        .animate-spin-slow {
          animation: spin-slow 25s linear infinite;
        }
        
        .animate-glow {
          animation: glow 3s ease-in-out infinite;
        }
        
        .animation-delay-100 { animation-delay: 0.1s; }
        .animation-delay-200 { animation-delay: 0.2s; }
        .animation-delay-300 { animation-delay: 0.3s; }
        .animation-delay-400 { animation-delay: 0.4s; }
        .animation-delay-500 { animation-delay: 0.5s; }
        .animation-delay-600 { animation-delay: 0.6s; }
        .animation-delay-700 { animation-delay: 0.7s; }
        
        .glass-morphism {
          background: rgba(255, 255, 255, 0.1);
          backdrop-filter: blur(20px);
          border: 1px solid rgba(255, 255, 255, 0.2);
        }
        
        .glass-morphism-dark {
          background: rgba(0, 0, 0, 0.2);
          backdrop-filter: blur(20px);
          border: 1px solid rgba(255, 255, 255, 0.1);
        }
        
        body {
          font-family: 'Inter', sans-serif;
        }
      `}</style>

      <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-10 left-10 w-96 h-96 bg-indigo-500/20 rounded-full blur-3xl animate-pulse-slow"></div>
          <div className="absolute bottom-10 right-10 w-80 h-80 bg-purple-500/20 rounded-full blur-3xl animate-pulse-slow animation-delay-300"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-pink-500/15 rounded-full blur-3xl animate-spin-slow"></div>
          
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-white/40 rounded-full animate-pulse-slow"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 5}s`,
                animationDuration: `${2 + Math.random() * 4}s`
              }}
            />
          ))}
          
          <div className="absolute top-20 right-20 w-24 h-24 border border-white/10 rotate-45 animate-spin-slow"></div>
          <div className="absolute bottom-20 left-20 w-20 h-20 bg-gradient-to-r from-indigo-500/30 to-purple-500/30 rounded-full animate-float animation-delay-200"></div>
        </div>

        <div className="relative z-10 p-6 max-w-7xl mx-auto">
          {/* Header Section */}
          <div className="text-center mb-8 animate-fade-in-up">
            <div className="relative inline-block mb-6 animate-float">
              <div className="w-20 h-20 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-3xl shadow-2xl flex items-center justify-center transform transition-all duration-500 hover:rotate-12 hover:scale-110 animate-glow">
                <DollarSign className="w-10 h-10 text-white animate-pulse" />
              </div>
              <div className="absolute -inset-3 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-3xl blur opacity-20 animate-pulse-slow"></div>
            </div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-white via-indigo-200 to-purple-200 bg-clip-text text-transparent mb-3 animate-fade-in-up animation-delay-100">
              Transaction Overview
            </h1>
            <p className="text-gray-300 text-lg animate-fade-in-up animation-delay-200">
              Track your financial journey with advanced filtering
            </p>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="glass-morphism rounded-2xl p-6 transform transition-all duration-500 hover:scale-105 hover:shadow-green-500/25 animate-slide-in-left animation-delay-300">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-300 text-sm font-medium mb-2">Total Income</p>
                  <p className="text-2xl font-bold text-green-400">₹{totalIncome.toLocaleString()}</p>
                </div>
                <div className="w-12 h-12 bg-green-500/20 rounded-xl flex items-center justify-center">
                  <TrendingUp className="w-6 h-6 text-green-400" />
                </div>
              </div>
            </div>

            <div className="glass-morphism rounded-2xl p-6 transform transition-all duration-500 hover:scale-105 hover:shadow-red-500/25 animate-fade-in-up animation-delay-400">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-300 text-sm font-medium mb-2">Total Expenses</p>
                  <p className="text-2xl font-bold text-red-400">₹{totalExpense.toLocaleString()}</p>
                </div>
                <div className="w-12 h-12 bg-red-500/20 rounded-xl flex items-center justify-center">
                  <TrendingDown className="w-6 h-6 text-red-400" />
                </div>
              </div>
            </div>

            <div className="glass-morphism rounded-2xl p-6 transform transition-all duration-500 hover:scale-105 hover:shadow-indigo-500/25 animate-slide-in-right animation-delay-500">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-300 text-sm font-medium mb-2">Balance</p>
                  <p className={`text-2xl font-bold ${balance >= 0 ? 'text-indigo-400' : 'text-red-400'}`}>
                    ₹{balance.toLocaleString()}
                  </p>
                </div>
                <div className="w-12 h-12 bg-indigo-500/20 rounded-xl flex items-center justify-center">
                  <DollarSign className="w-6 h-6 text-indigo-400" />
                </div>
              </div>
            </div>

            <div className="glass-morphism rounded-2xl p-6 transform transition-all duration-500 hover:scale-105 hover:shadow-purple-500/25 animate-slide-in-right animation-delay-600">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-300 text-sm font-medium mb-2">Filtered Results</p>
                  <p className="text-2xl font-bold text-purple-400">{filteredTransactions.length}</p>
                </div>
                <div className="w-12 h-12 bg-purple-500/20 rounded-xl flex items-center justify-center">
                  <Eye className="w-6 h-6 text-purple-400" />
                </div>
              </div>
            </div>
          </div>

          {/* Controls Section */}
          <div className="space-y-6 mb-8">
            {/* Primary Controls */}
            <div className="glass-morphism rounded-2xl p-6 animate-fade-in-up animation-delay-600">
              <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
                <div className="flex flex-col md:flex-row gap-4 items-start md:items-center flex-1">
                  {/* Search */}
                  <div className="relative group">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                      type="text"
                      placeholder="Search transactions..."
                      className="pl-10 pr-4 py-3 glass-morphism-dark rounded-xl text-white placeholder-gray-400 focus:border-indigo-400 focus:ring-2 focus:ring-indigo-400/50 focus:outline-none transition-all duration-300 w-64"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>

                  {/* Filter Toggle */}
                  <button
                    onClick={() => setShowFilters(!showFilters)}
                    className={`flex items-center px-4 py-3 rounded-xl font-medium transition-all duration-300 transform hover:scale-105 ${
                      showFilters || activeFiltersCount > 0
                        ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg'
                        : 'glass-morphism-dark text-gray-300 hover:text-white'
                    }`}
                  >
                    <Filter className="w-5 h-5 mr-2" />
                    Filters {activeFiltersCount > 0 && `(${activeFiltersCount})`}
                  </button>

                  {/* Clear Filters */}
                  {activeFiltersCount > 0 && (
                    <button
                      onClick={clearAllFilters}
                      className="flex items-center px-4 py-3 glass-morphism-dark rounded-xl text-gray-300 hover:text-white transition-all duration-300 transform hover:scale-105"
                    >
                      <RotateCcw className="w-5 h-5 mr-2" />
                      Clear All
                    </button>
                  )}
                </div>

                <div className="flex items-center gap-4">
                  {/* View Toggle */}
                  <div className="flex items-center glass-morphism-dark rounded-xl p-1">
                    <button
                      onClick={() => setViewMode("table")}
                      className={`p-2 rounded-lg transition-all duration-300 ${
                        viewMode === "table" 
                          ? 'bg-indigo-500 text-white shadow-lg' 
                          : 'text-gray-400 hover:text-white'
                      }`}
                    >
                      <List className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => setViewMode("cards")}
                      className={`p-2 rounded-lg transition-all duration-300 ${
                        viewMode === "cards" 
                          ? 'bg-indigo-500 text-white shadow-lg' 
                          : 'text-gray-400 hover:text-white'
                      }`}
                    >
                      <Grid className="w-5 h-5" />
                    </button>
                  </div>

                  {/* Add Transaction Button */}
                  <Link
                    to="/add"
                    className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white py-3 px-6 rounded-xl font-semibold shadow-lg hover:shadow-indigo-500/50 transition-all duration-300 transform hover:-translate-y-1 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-indigo-400/50 group relative overflow-hidden flex items-center"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <div className="relative flex items-center">
                      <Plus className="w-5 h-5 mr-2" />
                      Add Transaction
                    </div>
                  </Link>
                </div>
              </div>
            </div>

            {/* Advanced Filters Panel */}
            {showFilters && (
              <div className="glass-morphism rounded-2xl p-6 animate-fade-in-up">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-6 gap-4">
                  {/* Type Filter */}
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-200">Type</label>
                    <select
                      className="w-full px-3 py-3 glass-morphism-dark rounded-xl text-white focus:border-indigo-400 focus:ring-2 focus:ring-indigo-400/50 focus:outline-none transition-all duration-300"
                      value={filterType}
                      onChange={(e) => setFilterType(e.target.value)}
                    >
                      <option value="all">All Types</option>
                      <option value="income">Income</option>
                      <option value="expense">Expense</option>
                    </select>
                  </div>

                  {/* Category Filter */}
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-200">Category</label>
                    <select
                      className="w-full px-3 py-3 glass-morphism-dark rounded-xl text-white focus:border-indigo-400 focus:ring-2 focus:ring-indigo-400/50 focus:outline-none transition-all duration-300"
                      value={filterCategory}
                      onChange={(e) => setFilterCategory(e.target.value)}
                    >
                      <option value="all">All Categories</option>
                      {uniqueCategories.map(category => (
                        <option key={category} value={category}>{category}</option>
                      ))}
                    </select>
                  </div>

                  {/* Date Range Filter */}
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-200">Date Range</label>
                    <select
                      className="w-full px-3 py-3 glass-morphism-dark rounded-xl text-white focus:border-indigo-400 focus:ring-2 focus:ring-indigo-400/50 focus:outline-none transition-all duration-300"
                      value={dateRange}
                      onChange={(e) => setDateRange(e.target.value)}
                    >
                      <option value="all">All Time</option>
                      <option value="today">Today</option>
                      <option value="week">Last 7 Days</option>
                      <option value="month">Last 30 Days</option>
                      <option value="year">Last Year</option>
                    </select>
                  </div>

                  {/* Amount Range Min */}
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-200">Min Amount</label>
                    <input
                      type="number"
                      placeholder="0"
                      className="w-full px-3 py-3 glass-morphism-dark rounded-xl text-white placeholder-gray-400 focus:border-indigo-400 focus:ring-2 focus:ring-indigo-400/50 focus:outline-none transition-all duration-300"
                      value={amountRange.min}
                      onChange={(e) => setAmountRange(prev => ({ ...prev, min: e.target.value }))}
                    />
                  </div>

                  {/* Amount Range Max */}
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-200">Max Amount</label>
                    <input
                      type="number"
                      placeholder="∞"
                      className="w-full px-3 py-3 glass-morphism-dark rounded-xl text-white placeholder-gray-400 focus:border-indigo-400 focus:ring-2 focus:ring-indigo-400/50 focus:outline-none transition-all duration-300"
                      value={amountRange.max}
                      onChange={(e) => setAmountRange(prev => ({ ...prev, max: e.target.value }))}
                    />
                  </div>

                  {/* Sort Options */}
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-200">Sort By</label>
                    <div className="flex gap-2">
                      <select
                        className="flex-1 px-3 py-3 glass-morphism-dark rounded-xl text-white focus:border-indigo-400 focus:ring-2 focus:ring-indigo-400/50 focus:outline-none transition-all duration-300"
                        value={sortBy}
                        onChange={(e) => setSortBy(e.target.value)}
                      >
                        <option value="date">Date</option>
                        <option value="amount">Amount</option>
                        <option value="title">Title</option>
                        <option value="category">Category</option>
                      </select>
                      <button
                        onClick={() => setSortOrder(sortOrder === "asc" ? "desc" : "asc")}
                        className="p-3 glass-morphism-dark rounded-xl text-gray-300 hover:text-white transition-all duration-300 transform hover:scale-110"
                      >
                        {sortOrder === "asc" ? <SortAsc className="w-5 h-5" /> : <SortDesc className="w-5 h-5" />}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Transactions Display */}
          <div className="animate-fade-in-up animation-delay-700">
            {isLoading ? (
              <div className="glass-morphism rounded-2xl p-12 text-center">
                <div className="animate-spin rounded-full h-12 w-12 border-2 border-indigo-500/30 border-t-indigo-500 mx-auto mb-4"></div>
                <p className="text-gray-300">Loading transactions...</p>
              </div>
            ) : filteredTransactions.length === 0 ? (
              <div className="glass-morphism rounded-2xl p-12 text-center">
                <DollarSign className="w-16 h-16 text-gray-400 mx-auto mb-4 animate-pulse" />
                <p className="text-gray-300 text-lg">No transactions found</p>
                <p className="text-gray-400 text-sm mt-2">
                  {activeFiltersCount > 0 ? "Try adjusting your filters" : "Start by adding your first transaction"}
                </p>
              </div>
            ) : viewMode === "cards" ? (
              /* Cards View */
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredTransactions.map((transaction, index) => (
                  <TransactionCard key={transaction._id} transaction={transaction} index={index} />
                ))}
              </div>
            ) : (
              /* Table View */
              <div className="glass-morphism rounded-2xl overflow-hidden shadow-2xl">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="bg-black/20 backdrop-blur-sm border-b border-white/10">
                        <th className="px-6 py-4 text-left text-sm font-semibold text-gray-200 uppercase tracking-wider">Transaction</th>
                        <th className="px-6 py-4 text-left text-sm font-semibold text-gray-200 uppercase tracking-wider">Amount</th>
                        <th className="px-6 py-4 text-left text-sm font-semibold text-gray-200 uppercase tracking-wider">Category</th>
                        <th className="px-6 py-4 text-left text-sm font-semibold text-gray-200 uppercase tracking-wider">Date</th>
                        <th className="px-6 py-4 text-left text-sm font-semibold text-gray-200 uppercase tracking-wider">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/10">
                      {filteredTransactions.map((transaction, index) => (
                        <tr 
                          key={transaction._id} 
                          className="hover:bg-white/5 transition-all duration-300 group animate-fade-in-up"
                          style={{ animationDelay: `${index * 0.05}s` }}
                        >
                          <td className="px-6 py-4">
                            <div className="flex items-center">
                              <div className={`w-10 h-10 rounded-xl flex items-center justify-center mr-4 ${transaction.type === 'income' ? 'bg-green-500/20' : 'bg-red-500/20'}`}>
                                {transaction.type === 'income' ? 
                                  <TrendingUp className="w-5 h-5 text-green-400" /> :
                                  <TrendingDown className="w-5 h-5 text-red-400" />
                                }
                              </div>
                              <div>
                                <p className="text-white font-medium group-hover:text-indigo-200 transition-colors duration-200">
                                  {transaction.title}
                                </p>
                                <p className="text-gray-400 text-sm">
                                  {transaction.type.charAt(0).toUpperCase() + transaction.type.slice(1)}
                                </p>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <span className={`text-lg font-bold ${transaction.type === 'income' ? 'text-green-400' : 'text-red-400'}`}>
                              {transaction.type === "expense" ? "-" : "+"}₹{transaction.amount.toLocaleString()}
                            </span>
                          </td>
                          <td className="px-6 py-4">
                            <div className="flex items-center">
                              <Tag className="w-4 h-4 text-gray-400 mr-2" />
                              <span className="text-gray-300">{transaction.category}</span>
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <div className="flex items-center">
                              <Calendar className="w-4 h-4 text-gray-400 mr-2" />
                              <span className="text-gray-300">
                                {new Date(transaction.date).toLocaleDateString()}
                              </span>
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <div className="flex items-center space-x-3">
                              <Link
                                to={`/${transaction._id}/edit`}
                                className="p-2 bg-indigo-500/20 hover:bg-indigo-500/30 rounded-lg text-indigo-400 hover:text-indigo-300 transition-all duration-200 hover:scale-110 group"
                              >
                                <Edit className="w-4 h-4" />
                              </Link>
                              <button
                                onClick={() => handleDelete(transaction._id)}
                                disabled={deleteId === transaction._id}
                                className="p-2 bg-red-500/20 hover:bg-red-500/30 rounded-lg text-red-400 hover:text-red-300 transition-all duration-200 hover:scale-110 disabled:opacity-50 disabled:cursor-not-allowed group"
                              >
                                {deleteId === transaction._id ? (
                                  <div className="w-4 h-4 animate-spin rounded-full border-2 border-red-400/30 border-t-red-400"></div>
                                ) : (
                                  <Trash2 className="w-4 h-4" />
                                )}
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>

          {/* Footer Stats */}
          <div className="mt-8 text-center text-gray-400 text-sm animate-pulse-slow animate-fade-in-up animation-delay-700">
            <div className="flex items-center justify-center space-x-6 flex-wrap gap-2">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-indigo-400 rounded-full animate-pulse"></div>
                <span>Showing: {filteredTransactions.length} of {transactions.length} transactions</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse animation-delay-200"></div>
                <span>Sorted by: {sortBy} ({sortOrder})</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-pink-400 rounded-full animate-pulse animation-delay-400"></div>
                <span>View: {viewMode}</span>
              </div>
              {activeFiltersCount > 0 && (
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse animation-delay-600"></div>
                  <span>{activeFiltersCount} filters active</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}