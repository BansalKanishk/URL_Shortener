exports.up = function (knex) {
    return knex.schema.createTable('users', (table) => {
      table.increments('id').primary(); // Auto-incrementing primary key
      table.string('username').notNullable(); // Username column
      table.string('email').notNullable().unique(); // Email column with unique constraint
      table.string('password').notNullable(); // Password column
      table.timestamps(true, true); // Timestamps for created_at and updated_at
    });
  };
  
  exports.down = function (knex) {
    return knex.schema.dropTableIfExists('users'); // Drop the 'users' table if rolling back
  };
  