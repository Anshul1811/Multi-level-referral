import express from 'express';
import reportRoutes from './routes/reportRoutes.js'; 
import notificationRoutes from './routes/notificationRoutes.js';

const app = express();
app.use(express.json());

// routes
app.use('/api', reportRoutes);
app.use('/api/notifications', notificationRoutes);

export default app;
