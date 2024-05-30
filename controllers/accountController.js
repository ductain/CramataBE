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
    if (!username || !password || !firstName || !lastName || !phone) {
      res.status(400).json({error: "Please enter all fields"});
    }
    if (password.length < 6) {
      res.status(400).json({error: "Password must be at least 6 characters"});
    }
    else {
      Accounts.findOne({ username: username }).then((user) => {
        if (user) {
          res.status(400).json({error: "Username already exists"});
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
                res.status(200).json({message: "Đăng kí tài khoản thành công"});
              })
              .catch(next);
          });
        }
      });
    }
  }

  async login(req, res, next) {
    const { username, password } = req.body;

    try {
      const user = await Accounts.findOne({ username });

      if (!user) {
        return res
          .status(401)
          .json({ error: "Tên đăng nhập hoặc mật khẩu không chính xác" });
      }

      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) {
        return res
          .status(401)
          .json({ error: "Tên đăng nhập hoặc mật khẩu không chính xác" });
      }

      if (!user.status) {
        return res.status(403).json({ error: "Tài khoản của bạn đã bị khoá" });
      }

      return res
        .status(200)
        .json({
          user: { ...user.toObject(), password: undefined },
          message: "Đăng nhập thành công",
        });
    } catch (err) {
      next(err);
    }
  }
}

module.exports = new AccountController();
