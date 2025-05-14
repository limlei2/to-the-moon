# to-the-moon - Machine Learning Stock Tracker

A full-stack stock tracking platform that integrates real-time market data with machine learning-based price predictions.

---

## Tech Stack

- **Frontend:** React, Redux, Recharts, Tailwind CSS
- **Backend:** Node.js, Express
- **Database:** MongoDB (via Mongoose)
- **Machine Learning:** Python, scikit-learn
- **APIs:** TwelveData API, Finnhub API
- **Deployment:** AWS, CI/CD

---

## Getting Started

### Prerequisites

- Node.js
- npm or yarn
- Python 3.x (for ML service)
- MongoDB

---

## Configuration

### Frontend

Create a `.env` file in the `frontend/` directory:

```env
REACT_APP_API_BASE_URL=http://localhost:5000
REACT_APP_FINNHUB_KEY=your_finnhub_key
REACT_APP_TWELVEDATA_KEY=your_twelvedata_key
```

### Backend

Create a `.env` file in the `backend/` directory:

```env
PORT=5000
MONGO_URI=your_mongo_connection_string
FINNHUB_API_KEY=your_finnhub_key
TWELVEDATA_API_KEY=your_twelvedata_key
```

## Installation

### Backend
```
# Navigate to backend directory
cd backend

# Install dependencies
npm install

# Start the server (in development mode)
npm run dev
```

### Frontend
```
# Navigate to frontend directory
cd frontend

# Install dependencies
npm install

# Start the React development server (runs on http://localhost:3000)
npm start
```
