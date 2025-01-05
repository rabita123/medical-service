import bcrypt from "bcryptjs";

const users = [
  {
    name: "Admin User",
    email: "admin@example.com",
    phone: "01711966278",
    password: bcrypt.hashSync("123456", 10),
    isAdmin: true,
  },

  {
    name: "John Doe",
    email: "john@example.com",
    phone: "017199466279",
    password: bcrypt.hashSync("123456", 10),
  },
  {
    name: "Jane",

    email: "jane@examxple.cdom",
    phone: "01711962278",
    password: bcrypt.hashSync("123456", 10),
  },
];

export default users;
