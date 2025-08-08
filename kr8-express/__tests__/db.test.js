const db = require('../db/seeds/connections');

describe('testing db', () => {
  test('test script', () => {
    console.log(`Running in ${process.env.NODE_ENV} mode`);
    console.log(`PGDATABASE: ${process.env.PGDATABASE}`);
  });
});
