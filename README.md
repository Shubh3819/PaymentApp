**LINK OF THE SITE**=https://payment-app-frontend-kappa.vercel.app/

**Payment App**

A secure and scalable full-stack payment application that allows users to:
- Create an account
- Log in securely
- View wallet balance
- Search other users
- Transfer money
- View transaction history

**Built with React, Node.js, Express, MongoDB, JWT, and MongoDB Transactions.**

**Tech Stack**

**Frontend**
- React + Vite
- Axios (API client)
- Tailwind / Custom Styling
- JWT-based auth (via Axios interceptor)

**Backend**
- Node.js + Express
- MongoDB + Mongoose
- JWT Authentication
- Bcrypt Password Hashing
- Zod Input Validation
- Helmet + CORS + Rate Limiting
- MongoDB Transactions for funds transfer

**Key Features**

**1. Secure Authentication**
- Signup & Signin with password hashing
- JWT-based login
- Middleware to protect private endpoints

**2. Wallet System**
- Every user has an account with a starting balance
- View real-time balance
- Protected balance endpoint

**3. Money Transfer (Atomic & Safe)**
- MongoDB transactions ensure no partial updates
- Deducts from sender & adds to receiver atomically
- Prevents inconsistent balances

**4. Transaction History**
- Paginated transaction list
- Includes sender/receiver names
- Sorted by timestamp

**5. User Search**
- Search users by name or email
- Regex search with proper escaping
- Excludes current user

**6. Production-grade Backend Setup**
- Helmet security headers
- CORS with restricted origin
- Morgan request logging
- Graceful server shutdown
- Centralized error handling

**Folder Structure**
backend/<br>
├─ ─ controllers/        # Business logic (auth, account, users)<br>
├─ ─ models/             # Mongoose schemas<br>
├─ ─ routes/             # Route definitions<br>
├─ ─ middlewares/        # JWT auth middleware<br>
├─ ─ db.js               # MongoDB connection<br>
├─ ─ config.js           # Environment variables<br>
└─ ─ server.js           # Express app entry<br>

frontend/<br>
├── src/<br>
│   ├─ ─ components/     # UI components<br>
│   ├─ ─ pages/          # Screens<br>
│   ├─ ─ api.js          # Axios client with token interceptor<br>
│   ├─ ─ App.jsx<br>
│   └─ ─ main.jsx<br>



**API Endpoints**

**Auth**
Method&nbsp;&nbsp;	Endpoint&nbsp;&nbsp;	Description

POST&nbsp;&nbsp; /user/signup&nbsp;&nbsp; Create account<br>
POST&nbsp;&nbsp; /user/signin&nbsp;&nbsp; Login & get JWT<br>

**Account**<br>
Method&nbsp;&nbsp;	Endpoint&nbsp;&nbsp;	Description

GET&nbsp;&nbsp;	/account/balance&nbsp;&nbsp;	Get wallet balance<br>
POST&nbsp;&nbsp;	/account/transfer&nbsp;&nbsp;	Send money<br>
GET&nbsp;&nbsp;	/account/transactions	View&nbsp;&nbsp; transaction history<br>

Users<br>
Method&nbsp;&nbsp;	Endpoint&nbsp;&nbsp;	Description<br>

GET&nbsp;&nbsp;	/user/bulk&nbsp;&nbsp;	Search users<br>

**Screenshots**
<img width="1920" height="1008" alt="1" src="https://github.com/user-attachments/assets/eb7b55b2-0045-469c-a26a-2ea89490b560" />
<img width="1920" height="1008" alt="2" src="https://github.com/user-attachments/assets/2833d488-f9a0-42b6-8863-8375ef2db1cf" />
<img width="1920" height="1008" alt="3" src="https://github.com/user-attachments/assets/66f958b3-13b3-4e1c-be06-6c5c5d792613" />
<img width="1920" height="1008" alt="4" src="https://github.com/user-attachments/assets/4eb82beb-dfb5-479c-bfac-e15c5cb280b2" />


**Security Considerations**
- Bcrypt hashing for passwords
- JWT authentication for protected actions
- Rate limiter to prevent brute-force attacks
- Helmet for OWASP-standard security headers
- Zod for strict validation
- Regex escaping to prevent injection

**Future Improvements**
- Access + Refresh token system
- Push notifications for transactions
- Real-time balance updates (WebSockets)
- Transaction categories & notes
- Email/phone OTP login

