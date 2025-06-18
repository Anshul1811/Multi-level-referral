import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middlewares
app.use(cors());
app.use(express.json()); // for parsing application/json

// Sample route
app.get('/', (req, res) => {
  res.json({ message: 'Sports Dunia!!' });
});

app.listen(PORT, () => {
  console.log(`Server started on port:${PORT}`);
});