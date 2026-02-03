# Database Setup with Sequelize

This project uses Sequelize ORM with PostgreSQL.

## Configuration

The database configuration is managed through environment variables defined in `.env` file:

```bash
DB_HOST=localhost
DB_PORT=5432
DB_NAME=your_database_name
DB_USER=your_database_user
DB_PASSWORD=your_database_password
```

## Files Structure

```
src/
├── config/
│   ├── database.js      # Sequelize configuration for all environments
│   └── env.js           # Environment variables loader
├── models/
│   └── index.js         # Sequelize instance and model loader
├── migrations/          # Database migrations
└── seeders/            # Database seeders
```

## Usage

### Testing Connection

The application will automatically test the database connection on startup:

```bash
npm start
```

### Creating Models

Create a new model file in `src/models/`:

```javascript
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    }
  }, {
    tableName: 'users',
    timestamps: true
  });

  User.associate = (models) => {
    // Define associations here
  };

  return User;
};
```

### Sequelize CLI Commands

```bash
# Create a new migration
npx sequelize-cli migration:generate --name migration-name

# Run migrations
npx sequelize-cli db:migrate

# Undo last migration
npx sequelize-cli db:migrate:undo

# Create a new seeder
npx sequelize-cli seed:generate --name seeder-name

# Run all seeders
npx sequelize-cli db:seed:all

# Undo last seeder
npx sequelize-cli db:seed:undo
```

## Environment-Specific Configuration

The `src/config/database.js` includes configurations for:
- **Development**: Full logging, standard connection pool
- **Test**: No logging, separate test database
- **Production**: No logging, larger connection pool, SSL support

## Best Practices

1. Always use environment variables for credentials
2. Never commit `.env` file to the repository
3. Define model associations in the `associate` method
4. Use migrations for schema changes
5. Use seeders for initial data
