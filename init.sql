    CREATE TABLE IF NOT EXISTS users (
  username VARCHAR(50) PRIMARY KEY,
  password VARCHAR(50),
  CONSTRAINT unique_password UNIQUE (password)
);