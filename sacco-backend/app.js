require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use('/api/auth', require('./routes/auth'));
app.use('/api/contribution', require('./routes/contribution'));
app.use('/api/loan', require('./routes/loan'));
app.use('/api/user', require('./routes/user'));
const documentRoutes = require('./routes/document');
app.use('/api/documents', documentRoutes);
app.use('/api/support', require('./routes/support'));
const memberRoutes = require('./routes/member');
app.use('/api/member', memberRoutes);
const memberDashboardRoutes = require('./routes/memberDashboard')
app.use('/api/dashboard/members', memberDashboardRoutes)
const notificationRoutes = require('./routes/notification')
app.use('/api/notifications', notificationRoutes)
const dashboardRoutes = require('./routes/dashboard');
const analyticsRoutes = require('./routes/analytics');
const systemRoutes = require('./routes/system');

app.use('/api/dashboard', dashboardRoutes);
app.use('/api/analytics', analyticsRoutes);
app.use('/api/system', systemRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));