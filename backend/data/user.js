import bcrypt from 'bcryptjs'
const users = [
  {
    name: 'Admin User',
    email: 'admin@wxample.com',
    password: bcrypt.hashSync('123456',10),
    isAdmin: true,
  },
  {
    name: 'Deshitha',
    email: 'deshitha@wxample.com',
    password:bcrypt.hashSync('123456',10),
    isAdmin: true,
  },
  {
    name: 'ddthilindra',
    email: 'ddthilindra@wxample.com',
    password:bcrypt.hashSync('123456',10),
    isAdmin: true,
  },
];

export default users
