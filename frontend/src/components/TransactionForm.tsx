import { useState, useEffect } from "react";
import api from "../api/api";
import { useNavigate, useParams } from "react-router-dom";

// Icon components
const FileText = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
  </svg>
);

const DollarSign = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
  </svg>
);

const TrendingUp = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
  </svg>
);

const TrendingDown = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 17h8m0 0V9m0 8l-8-8-4 4-6-6" />
  </svg>
);

const Tag = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
  </svg>
);

const Calendar = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
  </svg>
);

const CreditCard = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
  </svg>
);

const Check = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
  </svg>
);

const X = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
  </svg>
);

const Info = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

const Plus = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
  </svg>
);

const Minus = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 12H4" />
  </svg>
);

const Sparkles = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 3l1.5 6L5 15l-1.5-6L5 3zM19 3l1.5 6L19 15l-1.5-6L19 3zM12 7l1 4-1 4-1-4 1-4z" />
  </svg>
);

export default function TransactionForm({ isEdit = false }) {
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState(0);
  const [type, setType] = useState("expense");
  const [category, setCategory] = useState("");
  const [newCategory, setNewCategory] = useState("");
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);
  const [categories, setCategories] = useState([]);
  const [paymentMethod, setPaymentMethod] = useState("cash");
  const [tags, setTags] = useState("");
  const [loading, setLoading] = useState(false);
  const [focusedField, setFocusedField] = useState("");

  const navigate = useNavigate();
  const { id } = useParams();

  // Fetch all unique categories
  const fetchCategories = async () => {
    try {
      const res = await api.get("/transactions");
      const uniqueCategories = Array.from(new Set(res.data.map((t) => t.category)));
      setCategories(uniqueCategories);
    } catch (err) {
      console.error(err);
    }
  };

  // Fetch transaction if editing
  useEffect(() => {
    fetchCategories();
    if (isEdit && id) {
      api.get("/transactions").then((res) => {
        const tx = res.data.find((t) => t._id === id);
        if (tx) {
          setTitle(tx.title);
          setAmount(tx.amount);
          setType(tx.type);
          setCategory(tx.category);
          setDate(tx.date.split("T")[0]);
          setPaymentMethod(tx.paymentMethod || "cash");
          setTags(tx.tags?.join(", ") || "");
        }
      });
    }
  }, [id, isEdit]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const finalCategory = category === "new" ? newCategory.trim() : category;

    // Client-side validation
    if (!title.trim() || amount <= 0 || !finalCategory.trim() || !type) {
      return alert("Please fill all required fields and ensure amount > 0");
    }

    const payload = {
      title,
      amount,
      type,
      category: finalCategory,
      date,
      paymentMethod,
      tags: tags.split(",").map(t => t.trim()).filter(Boolean),
    };

    setLoading(true);
    try {
      if (isEdit && id) {
        await api.put(`/transactions/${id}`, payload);
      } else {
        await api.post("/transactions", payload);
      }
      navigate("/transactions");
    } catch (err) {
      console.error(err);
      alert("Failed to save transaction");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap');
        
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
        
        @keyframes slideInRight {
          from {
            opacity: 0;
            transform: translateX(30px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        
        @keyframes pulse-glow {
          0%, 100% { 
            box-shadow: 0 0 20px rgba(99, 102, 241, 0.3);
          }
          50% { 
            box-shadow: 0 0 40px rgba(99, 102, 241, 0.6), 0 0 60px rgba(99, 102, 241, 0.3);
          }
        }
        
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          33% { transform: translateY(-10px) rotate(2deg); }
          66% { transform: translateY(-5px) rotate(-1deg); }
        }
        
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
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
        
        @keyframes bounce {
          0%, 20%, 50%, 80%, 100% { transform: translateY(0); }
          40% { transform: translateY(-10px); }
          60% { transform: translateY(-5px); }
        }
        
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        
        .animate-fade-in-up {
          animation: fadeInUp 0.6s ease-out forwards;
        }
        
        .animate-slide-in-right {
          animation: slideInRight 0.6s ease-out forwards;
        }
        
        .animate-pulse-glow {
          animation: pulse-glow 3s ease-in-out infinite;
        }
        
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        
        .animate-scale-in {
          animation: scaleIn 0.3s ease-out;
        }
        
        .animate-bounce-subtle {
          animation: bounce 2s ease-in-out infinite;
        }
        
        .animate-spin-slow {
          animation: spin-slow 20s linear infinite;
        }
        
        .animation-delay-100 { animation-delay: 0.1s; }
        .animation-delay-200 { animation-delay: 0.2s; }
        .animation-delay-300 { animation-delay: 0.3s; }
        .animation-delay-400 { animation-delay: 0.4s; }
        .animation-delay-500 { animation-delay: 0.5s; }
        .animation-delay-600 { animation-delay: 0.6s; }
        
        .glass-morphism {
          background: rgba(255, 255, 255, 0.1);
          backdrop-filter: blur(20px);
          border: 1px solid rgba(255, 255, 255, 0.2);
        }
        
        .glass-morphism-strong {
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
          animation: shimmer 3s infinite;
        }
        
        .form-field-hover {
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }
        
        .form-field-hover:hover {
          transform: translateY(-2px);
          box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
        }
        
        .gradient-border {
          position: relative;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          padding: 2px;
          border-radius: 1rem;
        }
        
        .gradient-border-content {
          background: white;
          border-radius: calc(1rem - 2px);
          padding: 1.5rem;
        }
        
        body {
          font-family: 'Inter', sans-serif;
        }
      `}</style>
      
      <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-slate-900 via-purple-900 to-indigo-900">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-20 left-20 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse-glow"></div>
          <div className="absolute bottom-20 right-20 w-80 h-80 bg-indigo-500/20 rounded-full blur-3xl animate-pulse-glow animation-delay-300"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-pink-500/15 rounded-full blur-3xl animate-spin-slow"></div>
          
          {/* Floating Particles */}
          {[...Array(30)].map((_, i) => (
            <div
              key={i}
              className="absolute w-2 h-2 bg-white/30 rounded-full animate-bounce-subtle"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 3}s`,
                animationDuration: `${2 + Math.random() * 3}s`
              }}
            />
          ))}
          
          {/* Geometric Shapes */}
          <div className="absolute top-1/4 right-1/4 w-20 h-20 border border-white/10 rotate-45 animate-spin-slow"></div>
          <div className="absolute bottom-1/3 left-1/5 w-16 h-16 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-full animate-float animation-delay-200"></div>
          <div className="absolute top-1/5 left-1/3 w-8 h-8 bg-indigo-500/40 transform rotate-45 animate-bounce-subtle animation-delay-400"></div>
        </div>

        <div className="relative z-10 container mx-auto px-4 py-12 max-w-4xl">
          {/* Header */}
          <div className="text-center mb-12 animate-fade-in-up">
            <div className="inline-flex items-center justify-center mb-6">
              <div className="w-20 h-20 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-3xl shadow-2xl flex items-center justify-center animate-float">
                {type === "income" ? (
                  <TrendingUp className="w-10 h-10 text-white" />
                ) : (
                  <TrendingDown className="w-10 h-10 text-white" />
                )}
              </div>
            </div>
            <h1 className="text-5xl font-bold bg-gradient-to-r from-white via-purple-200 to-indigo-200 bg-clip-text text-transparent mb-4 shimmer">
              {isEdit ? "Edit Transaction" : "New Transaction"}
            </h1>
            <p className="text-gray-300 text-xl animate-fade-in-up animation-delay-200">
              {isEdit ? "Update your transaction details" : "Add a new financial transaction"}
            </p>
          </div>

          {/* Form Container */}
          <div className="glass-morphism-strong rounded-3xl shadow-2xl overflow-hidden transform transition-all duration-500 hover:scale-[1.02] animate-fade-in-up animation-delay-300">
            {/* Dynamic Header */}
            <div className={`p-8 bg-gradient-to-r transition-all duration-500 ${
              type === "income" 
                ? "from-emerald-500 via-green-500 to-teal-500" 
                : "from-rose-500 via-red-500 to-pink-500"
            } text-white relative overflow-hidden`}>
              <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent animate-shimmer"></div>
              <div className="flex flex-col lg:flex-row items-center justify-between relative z-10">
                <div className="flex items-center mb-4 lg:mb-0">
                  <div className="w-16 h-16 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center mr-6 animate-pulse-glow">
                    {type === "income" ? (
                      <Plus className="w-8 h-8 text-white" />
                    ) : (
                      <Minus className="w-8 h-8 text-white" />
                    )}
                  </div>
                  <div>
                    <h2 className="text-3xl font-bold capitalize">{type} Transaction</h2>
                    <p className="text-white/80 text-lg">Fill in the details below</p>
                  </div>
                </div>
                <div className="text-center lg:text-right">
                  <div className="text-4xl font-bold mb-2">
                    {type === "income" ? "+" : "-"}₹{amount?.toLocaleString() || "0"}
                  </div>
                  <div className="text-white/80 text-sm uppercase tracking-wide">Amount</div>
                </div>
              </div>
            </div>

            {/* Form Content */}
            <form className="p-8 space-y-8" onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Title */}
                <div className="lg:col-span-2 animate-slide-in-right animation-delay-400">
                  <label className="block text-sm font-semibold text-gray-700 mb-3 flex items-center">
                    <FileText className="w-5 h-5 mr-2 text-indigo-600" />
                    Transaction Title *
                  </label>
                  <div className="relative group">
                    <input
                      className={`w-full px-6 py-4 rounded-2xl border-2 transition-all duration-300 form-field-hover ${
                        focusedField === 'title' 
                          ? 'border-indigo-500 ring-4 ring-indigo-200/50 bg-indigo-50/50' 
                          : 'border-gray-200 hover:border-indigo-300 bg-white/80'
                      } backdrop-blur-sm placeholder-gray-400 text-gray-800 font-medium`}
                      placeholder="e.g., Grocery Shopping, Salary Payment"
                      value={title}
                      onChange={e => setTitle(e.target.value)}
                      onFocus={() => setFocusedField('title')}
                      onBlur={() => setFocusedField('')}
                      required
                    />
                    <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-indigo-400/0 via-purple-400/0 to-pink-400/0 group-hover:from-indigo-400/5 group-hover:via-purple-400/5 group-hover:to-pink-400/5 transition-all duration-300 pointer-events-none"></div>
                  </div>
                </div>

                {/* Amount */}
                <div className="animate-slide-in-right animation-delay-500">
                  <label className="block text-sm font-semibold text-gray-700 mb-3 flex items-center">
                    <DollarSign className="w-5 h-5 mr-2 text-indigo-600" />
                    Amount (₹) *
                  </label>
                  <div className="relative group">
                    <input
                      type="number"
                      className={`w-full px-6 py-4 rounded-2xl border-2 transition-all duration-300 form-field-hover ${
                        focusedField === 'amount' 
                          ? 'border-indigo-500 ring-4 ring-indigo-200/50 bg-indigo-50/50' 
                          : 'border-gray-200 hover:border-indigo-300 bg-white/80'
                      } backdrop-blur-sm placeholder-gray-400 text-gray-800 font-medium`}
                      placeholder="Enter amount"
                      value={amount}
                      onChange={e => setAmount(Number(e.target.value))}
                      onFocus={() => setFocusedField('amount')}
                      onBlur={() => setFocusedField('')}
                      required
                      min="0"
                      step="0.01"
                    />
                    <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-indigo-400/0 via-purple-400/0 to-pink-400/0 group-hover:from-indigo-400/5 group-hover:via-purple-400/5 group-hover:to-pink-400/5 transition-all duration-300 pointer-events-none"></div>
                  </div>
                </div>

                {/* Type */}
                <div className="animate-slide-in-right animation-delay-500">
                  <label className="block text-sm font-semibold text-gray-700 mb-3 flex items-center">
                    <Tag className="w-5 h-5 mr-2 text-indigo-600" />
                    Transaction Type *
                  </label>
                  <select
                    className={`w-full px-6 py-4 rounded-2xl border-2 border-gray-200 hover:border-indigo-300 bg-white/80 backdrop-blur-sm transition-all duration-300 form-field-hover font-medium ${
                      type === "income" ? "text-emerald-600" : "text-rose-600"
                    }`}
                    value={type}
                    onChange={e => setType(e.target.value)}
                    required
                  >
                    <option value="income" className="text-emerald-600">💰 Income</option>
                    <option value="expense" className="text-rose-600">💸 Expense</option>
                  </select>
                </div>

                {/* Category */}
                <div className="animate-slide-in-right animation-delay-600">
                  <label className="block text-sm font-semibold text-gray-700 mb-3 flex items-center">
                    <Tag className="w-5 h-5 mr-2 text-indigo-600" />
                    Category *
                  </label>
                  <select
                    className="w-full px-6 py-4 rounded-2xl border-2 border-gray-200 hover:border-indigo-300 bg-white/80 backdrop-blur-sm transition-all duration-300 form-field-hover font-medium text-gray-800"
                    value={category}
                    onChange={e => setCategory(e.target.value)}
                    required
                  >
                    <option value="">🏷️ Select category</option>
                    {categories.map((c, idx) => (
                      <option key={idx} value={c}>{c}</option>
                    ))}
                    <option value="new">➕ Add New Category</option>
                  </select>
                  {category === "new" && (
                    <div className="mt-4 animate-scale-in">
                      <input
                        type="text"
                        className="w-full px-6 py-4 rounded-2xl border-2 border-indigo-300 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-200/50 bg-gradient-to-r from-indigo-50 to-purple-50 transition-all duration-300 form-field-hover placeholder-gray-400 font-medium"
                        placeholder="Enter new category name"
                        value={newCategory}
                        onChange={e => setNewCategory(e.target.value)}
                        required
                      />
                    </div>
                  )}
                </div>

                {/* Date */}
                <div className="animate-slide-in-right animation-delay-600">
                  <label className="block text-sm font-semibold text-gray-700 mb-3 flex items-center">
                    <Calendar className="w-5 h-5 mr-2 text-indigo-600" />
                    Transaction Date *
                  </label>
                  <input
                    type="date"
                    className="w-full px-6 py-4 rounded-2xl border-2 border-gray-200 hover:border-indigo-300 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-200/50 bg-white/80 backdrop-blur-sm transition-all duration-300 form-field-hover font-medium text-gray-800"
                    value={date}
                    onChange={e => setDate(e.target.value)}
                    required
                  />
                </div>

                {/* Payment Method */}
                <div className="animate-slide-in-right animation-delay-600">
                  <label className="block text-sm font-semibold text-gray-700 mb-3 flex items-center">
                    <CreditCard className="w-5 h-5 mr-2 text-indigo-600" />
                    Payment Method
                  </label>
                  <select
                    className="w-full px-6 py-4 rounded-2xl border-2 border-gray-200 hover:border-indigo-300 bg-white/80 backdrop-blur-sm transition-all duration-300 form-field-hover font-medium text-gray-800"
                    value={paymentMethod}
                    onChange={e => setPaymentMethod(e.target.value)}
                  >
                    <option value="cash">💵 Cash</option>
                    <option value="card">💳 Card</option>
                    <option value="upi">📱 UPI</option>
                    <option value="bank">🏦 Bank Transfer</option>
                  </select>
                </div>

                {/* Tags */}
                <div className="lg:col-span-2 animate-slide-in-right animation-delay-600">
                  <label className="block text-sm font-semibold text-gray-700 mb-3 flex items-center">
                    <Tag className="w-5 h-5 mr-2 text-indigo-600" />
                    Tags <span className="text-gray-400 font-normal">(comma separated)</span>
                  </label>
                  <input
                    type="text"
                    className="w-full px-6 py-4 rounded-2xl border-2 border-gray-200 hover:border-indigo-300 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-200/50 bg-white/80 backdrop-blur-sm transition-all duration-300 form-field-hover placeholder-gray-400 font-medium"
                    placeholder="e.g., groceries, monthly, essential"
                    value={tags}
                    onChange={e => setTags(e.target.value)}
                  />
                  {tags && (
                    <div className="mt-4 flex flex-wrap gap-3 animate-scale-in">
                      {tags.split(",").map((tag, idx) => tag.trim() && (
                        <span key={idx} className="inline-flex items-center px-4 py-2 rounded-full text-sm font-semibold bg-gradient-to-r from-indigo-100 to-purple-100 text-indigo-800 border border-indigo-200 transform hover:scale-105 transition-all duration-200">
                          <Sparkles className="w-3 h-3 mr-1" />
                          #{tag.trim()}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-8 border-t-2 border-gray-100 animate-fade-in-up animation-delay-600">
                <div className="flex flex-col sm:flex-row gap-6">
                  <button
                    type="button"
                    onClick={() => navigate("/transactions")}
                    className="flex-1 px-8 py-4 rounded-2xl border-2 border-gray-300 text-gray-700 font-semibold hover:bg-gray-50 hover:border-gray-400 transition-all duration-300 transform hover:scale-105 hover:-translate-y-1 flex items-center justify-center group"
                  >
                    <X className="w-6 h-6 mr-2 group-hover:rotate-90 transition-transform duration-300" />
                    Cancel
                  </button>
                  
                  <button
                    type="submit"
                    disabled={loading}
                    className={`flex-1 px-8 py-4 rounded-2xl font-semibold text-white transition-all duration-300 transform hover:scale-105 hover:-translate-y-1 flex items-center justify-center group relative overflow-hidden ${
                      type === "income" 
                        ? "bg-gradient-to-r from-emerald-500 via-green-600 to-teal-600 hover:from-emerald-600 hover:via-green-700 hover:to-teal-700 shadow-lg shadow-emerald-200/50" 
                        : "bg-gradient-to-r from-rose-500 via-red-600 to-pink-600 hover:from-rose-600 hover:via-red-700 hover:to-pink-700 shadow-lg shadow-rose-200/50"
                    } ${loading ? "opacity-50 cursor-not-allowed transform-none" : "hover:shadow-2xl"}`}
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
                    <div className="relative flex items-center">
                      {loading ? (
                        <>
                          <div className="animate-spin rounded-full h-6 w-6 border-2 border-white/30 border-t-white mr-3"></div>
                          Saving...
                        </>
                      ) : (
                        <>
                          <Check className="w-6 h-6 mr-2 group-hover:scale-110 transition-transform duration-300" />
                          {isEdit ? "Update Transaction" : "Create Transaction"}
                        </>
                      )}
                    </div>
                  </button>
                </div>
              </div>
            </form>
          </div>

          {/* Quick Tips */}
          <div className="mt-12 glass-morphism rounded-2xl p-8 border border-white/20 animate-fade-in-up animation-delay-600">
            <h3 className="font-bold text-white mb-6 flex items-center text-xl">
              <Info className="w-6 h-6 mr-3 text-indigo-400" />
              Quick Tips
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-gray-300">
              <div className="flex items-start group hover:transform hover:scale-105 transition-all duration-300">
                <div className="w-3 h-3 rounded-full bg-gradient-to-r from-indigo-400 to-purple-400 mr-3 mt-2 flex-shrink-0 group-hover:animate-pulse"></div>
                <span className="group-hover:text-white transition-colors duration-300">Use descriptive titles to easily identify transactions later</span>
              </div>
              <div className="flex items-start group hover:transform hover:scale-105 transition-all duration-300">
                <div className="w-3 h-3 rounded-full bg-gradient-to-r from-purple-400 to-pink-400 mr-3 mt-2 flex-shrink-0 group-hover:animate-pulse animation-delay-100"></div>
                <span className="group-hover:text-white transition-colors duration-300">Tags help organize and filter your transactions</span>
              </div>
              <div className="flex items-start group hover:transform hover:scale-105 transition-all duration-300">
                <div className="w-3 h-3 rounded-full bg-gradient-to-r from-pink-400 to-red-400 mr-3 mt-2 flex-shrink-0 group-hover:animate-pulse animation-delay-200"></div>
                <span className="group-hover:text-white transition-colors duration-300">Categories can be reused across multiple transactions</span>
              </div>
              <div className="flex items-start group hover:transform hover:scale-105 transition-all duration-300">
                <div className="w-3 h-3 rounded-full bg-gradient-to-r from-red-400 to-indigo-400 mr-3 mt-2 flex-shrink-0 group-hover:animate-pulse animation-delay-300"></div>
                <span className="group-hover:text-white transition-colors duration-300">Double-check the amount and date before saving</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}