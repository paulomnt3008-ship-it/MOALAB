import { DataTypes } from 'sequelize';
import { sequelize } from '../config/database.js';

export const Product = sequelize.define('Product', {
  id: { type: DataTypes.INTEGER.UNSIGNED, autoIncrement: true, primaryKey: true },
  slug: { type: DataTypes.STRING(120), allowNull: false, unique: true },
  name: { type: DataTypes.STRING(120), allowNull: false },
  tagline: { type: DataTypes.STRING(255) },
  description: { type: DataTypes.TEXT },
  price: { type: DataTypes.DECIMAL(10, 2), allowNull: false },
  compareAtPrice: { type: DataTypes.DECIMAL(10, 2) },
  currency: { type: DataTypes.STRING(3), allowNull: false, defaultValue: 'MXN' },
  volume: { type: DataTypes.STRING(40) },
  stock: { type: DataTypes.INTEGER.UNSIGNED, allowNull: false, defaultValue: 0 },
  isFeatured: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: false },
  images: {
    type: DataTypes.JSON,
    allowNull: false,
    defaultValue: [],
    // MariaDB (XAMPP) stores JSON as text, so it can come back as a string.
    get() {
      const value = this.getDataValue('images');
      return typeof value === 'string' ? JSON.parse(value) : value;
    },
  },
}, {
  tableName: 'products',
});
