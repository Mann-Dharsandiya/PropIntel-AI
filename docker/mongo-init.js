// Runs once when the mongo container is first created (via docker-entrypoint-initdb.d).
// Creates the application database and a couple of index-friendly placeholder
// collections so the DB isn't empty on first health check.
db = db.getSiblingDB('propintel_ai');

db.createCollection('_setup_check');
db._setup_check.insertOne({
  seededAt: new Date(),
  note: 'PropIntel AI database initialized successfully.',
});
