import dotenv from 'dotenv';
import app from './app.js';
import { sequelize } from './models/index.js';
import { seed } from './models/seed.js';

dotenv.config();

const PORT = process.env.PORT;

(async () => {
  try {
    await sequelize.authenticate();
    console.log('DB connected!');
    await sequelize.sync();
    await seed();
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  } catch (err) {
    console.error('Unable to connect to DB:', err);
  }
})();