// migrate.js
const knex = require('knex');
const config = require('./knexfile');

const db = knex(config);

async function runMigrations() {
  try {
    await db.migrate.latest(); // Apply all pending migrations
    console.log('Migrations applied successfully!');
  } catch (err) {
    console.error('Error applying migrations:', err);
  } finally {
    db.destroy(); // Close the database connection
  }
}

runMigrations();
