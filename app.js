const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const Menu = require("./models/Menu");

app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/public"));
app.set("view engine", "ejs");
mongoose.set("useNewUrlParser", true);
mongoose.set("useFindAndModify", false);
mongoose.set("useCreateIndex", true);
mongoose.set("useUnifiedTopology", true);
mongoose
  .connect(
    "mongodb+srv://merazmi:tg035b035@bazaar-269gr.mongodb.net/bazaar?retryWrites=true&w=majority"
  )
  .then(() => console.log("DB Connected..."))
  .catch((err) => console.log(err));

app.get("/", (req, res) => {
  Menu.find({}, (err, allMenus) => {
    if (err) {
      console.log(err);
    } else {
      res.render("menu", { menus: allMenus });
    }
  });
});
app.post("/", (req, res) => {
  let menuName = req.body.menuName;
  let menuPrice = req.body.menuPrice;
  let menuImage = req.body.menuImage;
  let menuDesc = req.body.menuDesc;
  let menuCategory = req.body.menuCategory;
  const newMenu = { menuName, menuPrice, menuImage, menuDesc, menuCategory };
  Menu.create(newMenu, (err, newCreateMenu) => {
    if (err) {
      console.log(err);
    } else {
      res.redirect("/");
    }
  });
});
app.get("/add-menu", (req, res) => {
  res.render("add-menu");
});

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server connected to port ${port}...`));
