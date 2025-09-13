# 💰 Personal Finance Tracker (MERN)

A modern full-stack **Personal Finance Tracker** built with the **MERN stack (MongoDB, Express.js, React, Node.js)**.  
This application empowers users to manage their finances effortlessly through **intuitive transaction handling, insightful analytics, and interactive visualizations**.  

🌍 **Live Demo:** [financetracker10.netlify.app](https://financetracker10.netlify.app)

---

## ✨ Key Highlights

- 🔐 **Authentication & Security** – JWT-powered login/registration with password hashing  
- ➕ **Transaction Management** – Add, update, and delete transactions seamlessly  
- 📊 **History & Filtering** – Track all past transactions with advanced filters  
- 📈 **Analytics Dashboard** – Visualize income vs. expenses with interactive graphs  
- 💹 **Insights at a Glance** – Category-based expense breakdowns  
- 📱 **Responsive UI** – Optimized for desktop, tablet, and mobile devices  
- 🔍 **Smart Search & Filters** – Quickly find transactions by category, type, or date  
- 🎨 **Modern Interface** – Built with React, Vite, TypeScript, and Tailwind CSS  

---

## 🛠️ Tech Stack

**Backend**  
- Node.js – JavaScript runtime  
- Express.js – RESTful API framework  
- MongoDB + Mongoose – NoSQL database and modeling  
- JWT – Token-based authentication  
- bcrypt.js – Secure password hashing  

**Frontend**  
- React 18 – Component-based UI  
- TypeScript – Type safety & developer productivity  
- Vite – Blazing fast build tool  
- Tailwind CSS – Utility-first styling  
- Context API – State management  
- Recharts – Interactive data visualization  

---

## 🚀 Getting Started

### ✅ Prerequisites  
- Node.js (v14+)  
- MongoDB Atlas / local MongoDB instance  
- Git  

---

### 1️⃣ Backend Setup  
\`\`\`bash
cd backend
npm install
cp .env.example .env
\`\`\`

Update \`.env\` with your configuration:
\`\`\`ini
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_super_secret_key
\`\`\`

Run backend:  
\`\`\`bash
# Development
npm run dev

# Production
npm start
\`\`\`

---

### 2️⃣ Frontend Setup  
\`\`\`bash
cd frontend
npm install
cp .env.example .env
\`\`\`

Update \`.env\` with:
\`\`\`bash
VITE_API_URL=http://localhost:5000/api
\`\`\`

Run frontend:  
\`\`\`bash
npm run dev
\`\`\`

Application will be available at:  
👉 **http://localhost:3000**

---

## 📂 Project Structure
\`\`\`
financetracker-main/
├── backend/
│   ├── controllers/   # Route handlers
│   ├── models/        # MongoDB schemas
│   ├── routes/        # API routes
│   ├── middleware/    # Custom middleware
│   └── config/        # DB configuration
├── frontend/
│   ├── src/
│   │   ├── components/ # Reusable UI components
│   │   ├── contexts/   # Context API
│   │   ├── pages/      # App pages
│   │   ├── types/      # TypeScript definitions
│   │   └── utils/      # Helper functions
│   └── public/         # Static assets
└── README.md
\`\`\`

---

## 🧪 Testing the App
1. Register a new account or use test credentials:  
   - **Email:** \`test@example.com\`  
   - **Password:** \`password123\`  
2. Add transactions using the **“+ Add Transaction”** button  
3. Explore the dashboard for **summaries & charts**  
4. Edit or delete transactions with one click  
5. Apply filters by **type, category, or date range**  

---

## 🔧 API Endpoints
| Method | Endpoint                  | Description               |
|--------|---------------------------|---------------------------|
| POST   | \`/api/auth/register\`      | Register user             |
| POST   | \`/api/auth/login\`         | Login user                |
| GET    | \`/api/transactions\`       | Get user transactions     |
| POST   | \`/api/transactions\`       | Create new transaction    |
| PUT    | \`/api/transactions/:id\`   | Update transaction        |
| DELETE | \`/api/transactions/:id\`   | Delete transaction        |
| GET    | \`/api/transactions/summary\` | Get financial summary    |

---

## 🎨 UI/UX Features 
- 📱 **Mobile-Friendly** – Works across all devices  
- ⚡ **Smooth Animations** – Enhanced user experience  
- ✅ **Form Validation** – With helpful error messages  
- 📊 **Interactive Charts** – Easy-to-read analytics  
- ✨ **Clean Layout** – Minimal & modern interface  

---

## 📦 Deployment
- **Frontend:** Netlify → [financetracker10.netlify.app](https://financetracker10.netlify.app)  
- **Backend:** Render / Railway / Heroku  
- **Database:** MongoDB Atlas  



---

## 👨‍💻 Developer
**Created with ❤️ by Sumit Chaurasiya**   

---

## 🙏 Acknowledgments
- 🎨 Icons: [Lucide Icons](https://lucide.dev)  
- 💡 UI Inspiration: Modern finance apps  
- 📚 MongoDB: Great documentation  
- ⚛️ React Community: For amazing tools  

---

## 🔄 Version History
**v1.0.0**  
- Initial release 🚀  
- Secure authentication  
- Transaction CRUD operations  
- Dashboard with financial summary  

---

💡 *Take control of your finances today with the intuitive Personal Finance Tracker!*  
