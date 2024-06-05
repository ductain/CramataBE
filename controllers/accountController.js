const Accounts = require("../models/Account");
const Points = require("../models/Points");
const bcrypt = require("bcrypt");

class AccountController {
  async getAccountById(req, res, next) {
    const id = req.query.id;
    Accounts.findOne({ _id: id })
      .select("-password")
      .then((user) => {
        if (!user) {
          res.status(400).json({ error: "Tài khoản không tồn tại" });
        } else {
          res.status(200).json({ user: user });
        }
      });
  }
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
    if (!username || !password || !firstName || !lastName || !phone || !email) {
      res.status(400).json({ error: "Xin hãy nhập tất cả thông tin" });
    } else if (password.length < 6) {
      res.status(400).json({ error: "Password phải có ít nhất 6 ký tự" });
    } else {
      Accounts.findOne({ username: username }).then((user) => {
        if (user) {
          res.status(400).json({ error: "Username đã tồn tại" });
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
                res
                  .status(200)
                  .json({ message: "Đăng kí tài khoản thành công" });
              })
              .catch(next);
          });
        }
      });
    }
  }

  async registerChild(req, res, next) {
    try {
      const { username, password, firstName, lastName, image, phone, email } =
        req.body;

      // Validate the input
      if (
        !username ||
        !password ||
        !firstName ||
        !lastName ||
        !phone ||
        !email
      ) {
        return res.status(400).json({ error: "Xin hãy nhập tất cả thông tin" });
      }

      if (password.length < 6) {
        return res
          .status(400)
          .json({ error: "Password phải có ít nhất 6 ký tự" });
      }

      // Check if the username already exists
      const existingUser = await Accounts.findOne({ username });
      if (existingUser) {
        return res.status(400).json({ error: "Username đã tồn tại" });
      }

      // Hash the password
      const hashedPassword = await bcrypt.hash(password, 10);

      // Create a new account with the role 'Children'
      const newChildAccount = new Accounts({
        username,
        password: hashedPassword,
        firstName,
        lastName,
        image,
        phone,
        email,
        role: "Children", // Set the role to 'Children'
      });

      const savedChildAccount = await newChildAccount.save();

      // Create a new Points document for the child account
      const newPoints = new Points({
        childId: savedChildAccount._id, // Set the childId to the new account's ID
        points: 0,
      });

      // Save the new Points document
      await newPoints.save();

      res.status(200).json({
        message: "Tạo tài khoản và điểm cho trẻ em thành công",
      });
    } catch (err) {
      next(err);
    }
  }

  async changePassword(req, res, next) {
    const { accountId } = req.query;
    const { oldPassword, newPassword } = req.body;

    if (!oldPassword || !newPassword) {
      return res
        .status(400)
        .json({ error: "Xin hãy nhập mật khẩu cũ và mới." });
    }

    if (newPassword.length < 6) {
      return res
        .status(400)
        .json({ error: "Mật khẩu phải có ít nhất 6 ký tự." });
    }

    try {
      const account = await Accounts.findById(accountId);

      if (!account) {
        return res.status(404).json({ error: "Tài khoản không tồn tại." });
      }

      const isMatch = await bcrypt.compare(oldPassword, account.password);

      if (!isMatch) {
        return res.status(401).json({ error: "Mật khẩu cũ không chính xác." });
      }

      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(newPassword, salt);

      account.password = hashedPassword;
      await account.save();

      res.status(200).json({
        message: "Mật khẩu thay đổi thành công. Xin hãy đăng nhập lại.",
      });
    } catch (err) {
      next(err);
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

      return res.status(200).json({
        user: { ...user.toObject(), password: undefined },
        message: "Đăng nhập thành công",
      });
    } catch (err) {
      next(err);
    }
  }

  async getChildrenAccountsByPhone(req, res, next) {
    const phone = req.query.phone;
    try {
      // First, find all accounts with the role "Children" and the given phone number
      const childrenAccounts = await Accounts.find({
        role: "Children",
        phone: phone,
      }).select("-password"); // Exclude the password field

      if (!childrenAccounts.length) {
        return res.status(404).json({
          message: "No children accounts found with the provided phone number.",
        });
      }

      // Then, find all points associated with these children accounts
      const childrenIds = childrenAccounts.map((account) => account._id);
      const childrenPoints = await Points.find({
        childId: { $in: childrenIds },
      }).select("points childId -_id"); // Select only the 'points' and 'childId' fields, exclude the '_id' field

      // Combine the accounts with their points
      const combinedResults = childrenAccounts.map((account) => {
        const accountPoints = childrenPoints.find((points) =>
          points.childId.equals(account._id)
        );
        return {
          ...account.toObject(),
          points: accountPoints ? accountPoints.points : null,
        };
      });

      res.status(200).json({ accounts: combinedResults });
    } catch (err) {
      next(err);
    }
  }
}

module.exports = new AccountController();
