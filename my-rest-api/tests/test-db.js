// scripts/test-db.js
// PURPOSE: Quickly verify DB credentials and connection

const sequelize = require('../config/db');

(async () => {
  try {
    await sequelize.authenticate();
    console.log('✅ Database connection established successfully!');
  } catch (err) {
    console.error('❌ Unable to connect to the database:', err);
  } finally {
    process.exit();
  }
})();
