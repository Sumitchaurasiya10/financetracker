import { useEffect, useState } from "react";
import api from "../api/api";
import {
  PieChart, Pie, Cell, Tooltip as RechartsTooltip,
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Legend, ResponsiveContainer
} from "recharts";

const COLORS = ["#4caf50", "#f44336", "#2196f3", "#ff9800", "#9c27b0", "#00bcd4", "#ff5722", "#795548", "#607d8b"];
const MONTHS = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];

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

const BarChart3 = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
  </svg>
);

const PieChart3 = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z" />
  </svg>
);

const Target = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

const Calendar = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
  </svg>
);

const Filter = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.707A1 1 0 013 7V4z" />
  </svg>
);

const X = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
  </svg>
);

const Activity = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M22 12h-4l-3 9L9 3l-3 9H2" />
  </svg>
);

const Shield = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
  </svg>
);

const Zap = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
  </svg>
);

export default function Dashboard() {
  const [summary, setSummary] = useState<any>(null);
  const [categoryData, setCategoryData] = useState<any[]>([]);
  const [monthlyData, setMonthlyData] = useState<any[]>([]);
  const [recentTx, setRecentTx] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  
  const [filterType, setFilterType] = useState<"day"|"month"|"year">("month");
  const [filterDate, setFilterDate] = useState<Date>(new Date());
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedMonth, setSelectedMonth] = useState<number | null>(null);

  const buildQuery = () => {
    let query = `?filter=${filterType}`;
    if (filterType === "day") query += `&date=${filterDate.toISOString().slice(0,10)}`;
    if (filterType === "month") query += `&month=${filterDate.getMonth()+1}&year=${filterDate.getFullYear()}`;
    if (filterType === "year") query += `&year=${filterDate.getFullYear()}`;
    if (selectedCategory) query += `&category=${selectedCategory}`;
    if (selectedMonth) query += `&month=${selectedMonth}&year=${filterDate.getFullYear()}`;
    return query;
  }

  const fetchData = async () => {
    setLoading(true);
    try {
      const [totalRes, catRes, monthRes, txRes] = await Promise.all([
        api.get(`/summary/total${buildQuery()}`),
        api.get(`/summary/categories${buildQuery()}`),
        api.get(`/summary/monthly${buildQuery()}`),
        api.get(`/transactions${buildQuery()}&limit=10&sort=desc`)
      ]);

      setSummary(totalRes.data);
      setCategoryData(Object.keys(catRes.data).map(key => ({ name: key, value: catRes.data[key] })));
      setMonthlyData(monthRes.data.map((item:any) => ({
        month: MONTHS[item.month-1],
        income: item.income,
        expense: item.expense,
        monthNumber: item.month
      })));
      setRecentTx(txRes.data);
    } catch (error) {
      console.error("Error fetching dashboard data:", error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchData();
  }, [filterType, filterDate, selectedCategory, selectedMonth]);

  if (loading) {
    return (
      <>
        <style jsx global>{`
          @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap');
          
          @keyframes pulse-slow {
            0%, 100% { opacity: 0.4; }
            50% { opacity: 0.8; }
          }
          
          @keyframes spin-slow {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
          }
          
          .animate-pulse-slow {
            animation: pulse-slow 4s ease-in-out infinite;
          }
          
          .animate-spin-slow {
            animation: spin-slow 25s linear infinite;
          }
          
          body {
            font-family: 'Inter', sans-serif;
          }
        `}</style>
        
        <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900">
          {/* Animated Background Elements */}
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-10 left-10 w-96 h-96 bg-indigo-500/20 rounded-full blur-3xl animate-pulse-slow"></div>
            <div className="absolute bottom-10 right-10 w-80 h-80 bg-purple-500/20 rounded-full blur-3xl animate-pulse-slow"></div>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-pink-500/15 rounded-full blur-3xl animate-spin-slow"></div>
          </div>

          <div className="relative z-10 min-h-screen flex items-center justify-center p-6">
            <div className="bg-white/10 backdrop-blur-20 border border-white/20 p-12 rounded-3xl shadow-2xl flex flex-col items-center max-w-md w-full">
              <div className="w-20 h-20 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-3xl shadow-2xl flex items-center justify-center mb-6 animate-spin">
                <Shield className="w-10 h-10 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-white mb-4">Loading Dashboard</h2>
              <p className="text-gray-300 text-center mb-8">Preparing your financial insights...</p>
              <div className="w-full bg-white/20 rounded-full h-2 overflow-hidden">
                <div className="bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 h-full rounded-full animate-pulse"></div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }

  if (!summary) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 flex items-center justify-center">
        <p className="text-white text-xl">Loading...</p>
      </div>
    );
  }

  const topCategory = categoryData.sort((a,b) => b.value - a.value)[0]?.name || "N/A";
  const savingsPercent = summary.income ? Math.round(((summary.income - summary.expense)/summary.income)*100) : 0;

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
        .animation-delay-800 { animation-delay: 0.8s; }
        .animation-delay-900 { animation-delay: 0.9s; }
        .animation-delay-1000 { animation-delay: 1.0s; }
        
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
        
        /* Custom scrollbar */
        ::-webkit-scrollbar {
          width: 8px;
        }
        
        ::-webkit-scrollbar-track {
          background: rgba(255, 255, 255, 0.1);
          border-radius: 4px;
        }
        
        ::-webkit-scrollbar-thumb {
          background: rgba(255, 255, 255, 0.3);
          border-radius: 4px;
        }
        
        ::-webkit-scrollbar-thumb:hover {
          background: rgba(255, 255, 255, 0.5);
        }
      `}</style>

      <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 pointer-events-none">
          {/* Large Background Orbs */}
          <div className="absolute top-10 left-10 w-96 h-96 bg-indigo-500/20 rounded-full blur-3xl animate-pulse-slow"></div>
          <div className="absolute bottom-10 right-10 w-80 h-80 bg-purple-500/20 rounded-full blur-3xl animate-pulse-slow animation-delay-300"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-pink-500/15 rounded-full blur-3xl animate-spin-slow"></div>
          
          {/* Floating Particles */}
          {[...Array(25)].map((_, i) => (
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
          
          {/* Geometric Shapes */}
          <div className="absolute top-20 right-20 w-24 h-24 border border-white/10 rotate-45 animate-spin-slow"></div>
          <div className="absolute bottom-20 left-20 w-20 h-20 bg-gradient-to-r from-indigo-500/30 to-purple-500/30 rounded-full animate-float animation-delay-200"></div>
          <div className="absolute top-1/4 left-1/4 w-12 h-12 bg-pink-500/20 transform rotate-45 animate-pulse"></div>
          <div className="absolute bottom-1/4 right-1/4 w-16 h-16 border-2 border-indigo-400/20 rounded-full animate-pulse animation-delay-400"></div>
        </div>

        <div className="relative z-10 p-6 max-w-7xl mx-auto">
          {/* Header Section */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-8 animate-fade-in-up">
            <div className="text-center md:text-left">
              <div className="relative inline-block mb-4 animate-float">
                <div className="w-16 h-16 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-2xl shadow-2xl flex items-center justify-center transform transition-all duration-500 hover:rotate-12 hover:scale-110 animate-glow">
                  <BarChart3 className="w-8 h-8 text-white animate-pulse" />
                </div>
                <div className="absolute -inset-2 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-2xl blur opacity-20 animate-pulse-slow"></div>
              </div>
              <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-white via-indigo-200 to-purple-200 bg-clip-text text-transparent mb-2 animate-fade-in-up animation-delay-100">
                Financial Dashboard
              </h1>
              <p className="text-gray-300 text-lg animate-fade-in-up animation-delay-200">
                Track and analyze your financial activities
              </p>
            </div>
            
            {/* Filters */}
            <div className="glass-morphism rounded-2xl p-4 animate-slide-in-right animation-delay-300">
              <div className="flex flex-wrap gap-3 items-center">
                <div className="relative group">
                  <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <select 
                    className="pl-10 pr-8 py-3 glass-morphism-dark rounded-xl text-white focus:border-indigo-400 focus:ring-2 focus:ring-indigo-400/50 focus:outline-none transition-all duration-300 appearance-none cursor-pointer"
                    value={filterType} 
                    onChange={e => setFilterType(e.target.value as any)}
                  >
                    <option value="day">Day</option>
                    <option value="month">Month</option>
                    <option value="year">Year</option>
                  </select>
                </div>
                
                <div className="relative group">
                  <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type={filterType==="day"?"date":filterType==="month"?"month":"number"}
                    className="pl-10 pr-4 py-3 glass-morphism-dark rounded-xl text-white focus:border-indigo-400 focus:ring-2 focus:ring-indigo-400/50 focus:outline-none transition-all duration-300 w-40"
                    value={filterType==="year"?filterDate.getFullYear():filterType==="month"?`${filterDate.getFullYear()}-${String(filterDate.getMonth()+1).padStart(2, '0')}`:filterDate.toISOString().slice(0,10)}
                    onChange={e => {
                      if (filterType === "year") {
                        setFilterDate(new Date(parseInt(e.target.value), 0, 1));
                      } else {
                        setFilterDate(new Date(e.target.value));
                      }
                    }}
                  />
                </div>
                
                {selectedCategory && (
                  <button 
                    className="flex items-center px-4 py-3 bg-red-500/20 hover:bg-red-500/30 rounded-xl text-red-300 hover:text-red-200 transition-all duration-300 transform hover:scale-105"
                    onClick={()=>setSelectedCategory(null)}
                  >
                    Clear Category
                    <X className="w-4 h-4 ml-2" />
                  </button>
                )}
                
                {selectedMonth && (
                  <button 
                    className="flex items-center px-4 py-3 bg-red-500/20 hover:bg-red-500/30 rounded-xl text-red-300 hover:text-red-200 transition-all duration-300 transform hover:scale-105"
                    onClick={()=>setSelectedMonth(null)}
                  >
                    Clear Month
                    <X className="w-4 h-4 ml-2" />
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Summary Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
            <div className="glass-morphism rounded-2xl p-6 transform transition-all duration-500 hover:scale-105 hover:shadow-green-500/25 animate-slide-in-left animation-delay-400 group">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-300 text-sm font-medium mb-2">Income</p>
                  <p className="text-2xl font-bold text-green-400">₹{summary.income.toLocaleString()}</p>
                </div>
                <div className="w-12 h-12 bg-green-500/20 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <TrendingUp className="w-6 h-6 text-green-400" />
                </div>
              </div>
            </div>
            
            <div className="glass-morphism rounded-2xl p-6 transform transition-all duration-500 hover:scale-105 hover:shadow-red-500/25 animate-fade-in-up animation-delay-500 group">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-300 text-sm font-medium mb-2">Expenses</p>
                  <p className="text-2xl font-bold text-red-400">₹{summary.expense.toLocaleString()}</p>
                </div>
                <div className="w-12 h-12 bg-red-500/20 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <TrendingDown className="w-6 h-6 text-red-400" />
                </div>
              </div>
            </div>
            
            <div className="glass-morphism rounded-2xl p-6 transform transition-all duration-500 hover:scale-105 hover:shadow-blue-500/25 animate-slide-in-right animation-delay-600 group">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-300 text-sm font-medium mb-2">Balance</p>
                  <p className={`text-2xl font-bold ${summary.balance >= 0 ? 'text-blue-400' : 'text-red-400'}`}>
                    ₹{summary.balance.toLocaleString()}
                  </p>
                </div>
                <div className="w-12 h-12 bg-blue-500/20 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <DollarSign className="w-6 h-6 text-blue-400" />
                </div>
              </div>
            </div>
            
            <div className="glass-morphism rounded-2xl p-6 transform transition-all duration-500 hover:scale-105 hover:shadow-purple-500/25 animate-slide-in-left animation-delay-700 group">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-300 text-sm font-medium mb-2">Top Category</p>
                  <p className="text-xl font-bold text-purple-400 truncate">{topCategory}</p>
                </div>
                <div className="w-12 h-12 bg-purple-500/20 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <Zap className="w-6 h-6 text-purple-400" />
                </div>
              </div>
            </div>
            
            <div className="glass-morphism rounded-2xl p-6 transform transition-all duration-500 hover:scale-105 hover:shadow-yellow-500/25 animate-fade-in-up animation-delay-800 group">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-300 text-sm font-medium mb-2">Savings %</p>
                  <p className={`text-2xl font-bold ${savingsPercent >= 0 ? 'text-yellow-400' : 'text-red-400'}`}>
                    {savingsPercent}%
                  </p>
                </div>
                <div className="w-12 h-12 bg-yellow-500/20 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <Target className="w-6 h-6 text-yellow-400" />
                </div>
              </div>
            </div>
          </div>

          {/* Charts */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            {/* Pie Chart */}
            <div className="glass-morphism rounded-2xl p-6 shadow-2xl transform transition-all duration-500 hover:scale-[1.02] hover:shadow-indigo-500/25 animate-slide-in-left animation-delay-900">
              <h3 className="text-xl font-semibold text-white mb-6 flex items-center">
                <PieChart3 className="w-6 h-6 mr-3 text-indigo-400" />
                Spending by Category
              </h3>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={categoryData}
                      dataKey="value"
                      nameKey="name"
                      cx="50%"
                      cy="50%"
                      outerRadius={100}
                      innerRadius={70}
                      label={({ name, percent }) => `${name} (${(percent * 100).toFixed(0)}%)`}
                      labelLine={false}
                      onClick={d=>setSelectedCategory(d.name)}
                    >
                      {categoryData.map((_, i)=><Cell key={i} fill={COLORS[i%COLORS.length]} cursor="pointer" />)}
                    </Pie>
                    <RechartsTooltip 
                      formatter={(value:number)=>`₹${value.toLocaleString()}`}
                      contentStyle={{
                        backgroundColor: 'rgba(0, 0, 0, 0.8)',
                        border: '1px solid rgba(255, 255, 255, 0.2)',
                        borderRadius: '12px',
                        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)',
                        backdropFilter: 'blur(20px)',
                        color: 'white'
                      }}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <p className="text-sm text-gray-300 text-center mt-4 bg-white/5 rounded-lg py-2 px-4">
                Click on a category to filter transactions
              </p>
            </div>

            {/* Bar Chart */}
            <div className="glass-morphism rounded-2xl p-6 shadow-2xl transform transition-all duration-500 hover:scale-[1.02] hover:shadow-purple-500/25 animate-slide-in-right animation-delay-1000">
              <h3 className="text-xl font-semibold text-white mb-6 flex items-center">
                <BarChart3 className="w-6 h-6 mr-3 text-purple-400" />
                Monthly Trends
              </h3>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={monthlyData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255, 255, 255, 0.1)" />
                    <XAxis 
                      dataKey="month" 
                      axisLine={false}
                      tickLine={false}
                      tick={{ fill: '#e5e7eb', fontSize: 12 }}
                    />
                    <YAxis 
                      axisLine={false}
                      tickLine={false}
                      tick={{ fill: '#e5e7eb', fontSize: 12 }}
                    />
                    <RechartsTooltip 
                      formatter={(value:number)=>`₹${value.toLocaleString()}`}
                      contentStyle={{
                        backgroundColor: 'rgba(0, 0, 0, 0.8)',
                        border: '1px solid rgba(255, 255, 255, 0.2)',
                        borderRadius: '12px',
                        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)',
                        backdropFilter: 'blur(20px)',
                        color: 'white'
                      }}
                    />
                    <Legend 
                      wrapperStyle={{ color: '#e5e7eb' }}
                    />
                    <Bar 
                      dataKey="income" 
                      fill="#4ade80" 
                      onClick={d => setSelectedMonth(d.payload?.monthNumber)} 
                      cursor="pointer" 
                      radius={[6, 6, 0, 0]}
                      name="Income"
                    />
                    <Bar 
                      dataKey="expense" 
                      fill="#f87171" 
                      onClick={d => setSelectedMonth(d.payload?.monthNumber)} 
                      cursor="pointer" 
                      radius={[6, 6, 0, 0]}
                      name="Expense"
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>
              <p className="text-sm text-gray-300 text-center mt-4 bg-white/5 rounded-lg py-2 px-4">
                Click on a bar to filter transactions by month
              </p>
            </div>
          </div>

          {/* Recent Transactions */}
          <div className="glass-morphism rounded-2xl p-6 shadow-2xl transform transition-all duration-500 hover:scale-[1.01] hover:shadow-pink-500/25 animate-fade-in-up animation-delay-1000">
            <h3 className="text-xl font-semibold text-white mb-6 flex items-center">
              <Activity className="w-6 h-6 mr-3 text-pink-400" />
              Recent Transactions 
              {selectedCategory && (
                <span className="ml-2 px-3 py-1 bg-indigo-500/20 rounded-full text-sm text-indigo-300">
                  {selectedCategory}
                </span>
              )}
              {selectedMonth && (
                <span className="ml-2 px-3 py-1 bg-purple-500/20 rounded-full text-sm text-purple-300">
                  {MONTHS[selectedMonth-1]}
                </span>
              )}
            </h3>
            
            <div className="overflow-x-auto rounded-2xl glass-morphism-dark">
              <table className="min-w-full">
                <thead>
                  <tr className="border-b border-white/10">
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-200 uppercase tracking-wider">Title</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-200 uppercase tracking-wider">Amount</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-200 uppercase tracking-wider">Type</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-200 uppercase tracking-wider">Category</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-200 uppercase tracking-wider">Date</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/10">
                  {recentTx.map((tx, index)=>(
                    <tr 
                      key={tx._id} 
                      className="transition-all duration-300 hover:bg-white/5 group animate-fade-in-up"
                      style={{ animationDelay: `${1.1 + index * 0.1}s` }}
                    >
                      <td className="px-6 py-4">
                        <div className="flex items-center">
                          <div className={`w-10 h-10 rounded-xl flex items-center justify-center mr-4 ${tx.type==="income"?"bg-green-500/20":"bg-red-500/20"}`}>
                            {tx.type==="income" ? 
                              <TrendingUp className="w-5 h-5 text-green-400" /> :
                              <TrendingDown className="w-5 h-5 text-red-400" />
                            }
                          </div>
                          <span className="text-white font-medium group-hover:text-indigo-200 transition-colors duration-200">
                            {tx.title}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`text-lg font-bold ${tx.type==="income"?"text-green-400":"text-red-400"}`}>
                          ₹{tx.amount.toLocaleString()}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${tx.type==="income"?"bg-green-500/20 text-green-300":"bg-red-500/20 text-red-300"}`}>
                          {tx.type}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-gray-300">{tx.category}</span>
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-gray-300">{new Date(tx.date).toLocaleDateString()}</span>
                      </td>
                    </tr>
                  ))}
                  {recentTx.length===0 && (
                    <tr>
                      <td colSpan={5} className="px-6 py-12 text-center">
                        <div className="flex flex-col items-center">
                          <div className="w-16 h-16 bg-gray-500/20 rounded-full flex items-center justify-center mb-4">
                            <Activity className="w-8 h-8 text-gray-400" />
                          </div>
                          <p className="text-gray-300 text-lg font-medium mb-2">No transactions found</p>
                          <p className="text-gray-400 text-sm">Try adjusting your filters or add some transactions</p>
                        </div>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* Footer Stats */}
          <div className="mt-8 text-center text-gray-400 text-sm animate-pulse-slow animate-fade-in-up animation-delay-1000">
            <div className="flex items-center justify-center space-x-6 flex-wrap gap-2">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-indigo-400 rounded-full animate-pulse"></div>
                <span>Dashboard Updated</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse animation-delay-200"></div>
                <span>Real-time Data</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-pink-400 rounded-full animate-pulse animation-delay-400"></div>
                <span>Interactive Charts</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse animation-delay-600"></div>
                <span>Smart Insights</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}