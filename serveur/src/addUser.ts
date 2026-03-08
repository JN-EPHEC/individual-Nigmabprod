import User from './models/User.js';
import sequelize from './config/database.js';

await sequelize.sync();

await User.create({
  nom: 'Doe',
  prenom: 'John'
});

const users = await User.findAll();
console.log('Users:', JSON.stringify(users, null, 2));

process.exit(0);
