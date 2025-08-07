const { sequelize } = require('../models/index');

async function syncDatabase() {
  try {
    await sequelize.sync({ force: true }); // Use { force: true } only in development
    console.log('✅ Database synced successfully');
  } catch (error) {
    console.error('❌ Database sync failed:', error);
  }
}

syncDatabase();
