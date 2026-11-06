import { Product } from './Product.js';
import { Order } from './Order.js';
import { OrderItem } from './OrderItem.js';

Order.hasMany(OrderItem, { as: 'items', foreignKey: 'orderId', onDelete: 'CASCADE' });
OrderItem.belongsTo(Order, { foreignKey: 'orderId' });

Product.hasMany(OrderItem, { foreignKey: 'productId' });
OrderItem.belongsTo(Product, { as: 'product', foreignKey: 'productId' });

export { Product, Order, OrderItem };
