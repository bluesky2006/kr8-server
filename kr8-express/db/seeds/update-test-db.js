require('dotenv').config({ path: `.env.test` }); // ✅ Load test env
const { createTables } = require('../models/index'); // adjust path if needed

(async () => {
  try {
    console.log('Updating test database schema...');
    await createTables({ force: true });
    console.log('✅ Test DB schema updated!');
    process.exit(0);
  } catch (err) {
    console.error('❌ Failed to update test DB schema:', err);
    process.exit(1);
  }
})();
