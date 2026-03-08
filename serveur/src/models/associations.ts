import User from './User.js';
import Group from './Group.js';

Group.hasMany(User, { foreignKey: 'groupId', as: 'users' });
User.belongsTo(Group, { foreignKey: 'groupId', as: 'group' });

export { User, Group };
