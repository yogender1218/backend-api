const express = require('express');
const app = express();
const dotenv = require('dotenv');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const connectDB = require('./db/db');

dotenv.config();

// Middlewares
app.use(cors());
app.use(express.json());
app.use(cookieParser());

// Routes Import
const authRoutes = require('./routes/auth.routes');
const postRoutes = require('./routes/post.routes');
const cardRoutes = require('./routes/card.routes');

// Routes Setup
app.use('/api/auth', authRoutes);
app.use('/api/posts', postRoutes);
app.use('/api/cards', cardRoutes);

// Connect to MongoDB
connectDB();

// Server Listen
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`✅ Server chal raha hai port ${PORT} pe 📢`);
});
