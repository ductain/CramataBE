const Accounts = require("../models/Account");
const bcrypt = require("bcrypt");

class AccountController {
  async register(req, res, next) {
    const {
      username,
      password,
      firstName,
      lastName,
      image,
      phone,
      email,
      role,
    } = req.body;
    let errors = [];
    if (!username || !password || !firstName || !lastName || !phone) {
      errors.push("Please enter all fields");
    }
    if (password.length < 6) {
      errors.push("Password must be at least 6 characters");
    }
    if (errors.length > 0) {
      res.status(400).json(errors);
    } else {
      Accounts.findOne({ username: username }).then((user) => {
        if (user) {
          errors.push("Username already exists");
          res.status(400).json(errors);
        } else {
          const newUser = new Accounts({
            ...req.body,
          });
          // Hash password
          bcrypt.hash(newUser.password, 10, function (err, hash) {
            if (err) throw err;
            newUser.password = hash;
            newUser
              .save()
              .then((user) => {
                res.status(200).json("User registered successfully");
              })
              .catch(next);
          });
        }
      });
    }
  }
}

module.exports = new AccountController();