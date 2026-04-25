# PostgreSQL Local Setup Guide

Follow these steps to set up PostgreSQL locally for the Zosterix platform.

## 1. Install PostgreSQL

### Linux (Ubuntu/Debian)
```bash
sudo apt update
sudo apt install postgresql postgresql-contrib
```

### macOS (Homebrew)
```bash
brew install postgresql@15
brew services start postgresql@15
```

### Windows
Download the installer from [postgresql.org](https://www.postgresql.org/download/windows/) and follow the setup wizard.

## 2. Create Database and User

Access the PostgreSQL prompt:
```bash
sudo -u postgres psql
```

Run the following SQL commands:
```sql
-- Create the database
CREATE DATABASE zosterix;

-- Create the user (replace 'password' with your desired password)
CREATE USER zosterix_user WITH ENCRYPTED PASSWORD 'password';

-- Grant privileges
GRANT ALL PRIVILEGES ON DATABASE zosterix TO zosterix_user;

-- Allow the user to create tables (Postgres 15+)
\c zosterix
GRANT ALL ON SCHEMA public TO zosterix_user;
```

Exit psql:
```bash
\q
```

## 3. Configure Backend

Update your `backend/.env` file:
```env
DATABASE_URL=postgresql://zosterix_user:password@localhost:5432/zosterix?sslmode=disable
```

## 4. Run Migrations

From the `backend` directory:
```bash
make migrate-up
```
*(Note: You may need to install `golang-migrate` if not already available)*
