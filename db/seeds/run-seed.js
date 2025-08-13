const db = require('../seeds/connections');
const { user, playlist } = require('../data/test-data/index');
const seed = require('./seed');
const runSeed = async () => {
  try {
    await seed({ user, playlist });
    console.log('db seeded succesfully');
  } catch (err) {
    console.log(err);
  } finally {
    await db.close();
  }
};

runSeed();
