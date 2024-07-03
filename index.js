const express = require("express");
const port = 5000;
const mongoose = require("mongoose");
const accountRouter = require("./routes/accountRouter");
const taskRouter = require("./routes/taskRouter");
const videoCategoryRouter = require("./routes/videoCategoryRouter");
const videoRouter = require("./routes/videoRouter");
const productCategoryRouter = require("./routes/productCategoryRouter");
const productRouter = require("./routes/productRouter");
const pointRouter = require("./routes/pointRouter");
const requestRouter = require('./routes/requestRouter')
const requestForBuyingRouter = require('./routes/requestForBuyingRouter')
const requestForCustomProductRouter = require('./routes/requestForCustomProductRouter')
const requestForWishlistRouter = require('./routes/requestForWishlistRouter')
const wishlistRouter = require("./routes/wishlistRouter")
const notiRouter = require("./routes/notificationRouter")


const app = express();

const connect = mongoose.connect(
  "mongodb+srv://ductaikhua:ductaikhua@cluster0.amqjyng.mongodb.net/Cramata?retryWrites=true&w=majority"
);
connect.then(
  (db) => {
    console.log("Database connected correctly to server");
  },
  (err) => {
    console.log(err);
  }
);

app.use(express.json());

app.use("/auth", accountRouter);
app.use("/tasks", taskRouter);
app.use("/videoCategories", videoCategoryRouter);
app.use("/videos", videoRouter);
app.use("/productCategories", productCategoryRouter);
app.use("/products", productRouter);
app.use("/points", pointRouter);
app.use("/requests", requestRouter);
app.use("/requestForWishlist", requestForWishlistRouter);
app.use("/requestForCustomProduct", requestForCustomProductRouter);
app.use("/requestForBuying", requestForBuyingRouter);
app.use("/wishlists", wishlistRouter);
app.use("/notifications", notiRouter);

app.listen(port, () => {
  console.log("Server is running.");
});
