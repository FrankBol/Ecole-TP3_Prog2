const express = require("express");
let router = express.Router();
const homeController = require("./homeController");


router.get("/", homeController.login);
router.get("/signup", homeController.signup);

router.get("/index", homeController.allProducts);

router.get("/new", homeController.getNew);
router.post("/product/new", homeController.saveProduct);

router.get("/search", homeController.getSearch);
router.get("/product/search", homeController.getProductSearch);

router.get("/edit/:id", homeController.getEdit);
router.put("/editPut/:id", homeController.putEdit);
router.delete("/delete/:id", homeController.delete);


router.post("/users/create", homeController.saveUser);
router.get("/user/login", homeController.login);
router.post("/user/login", homeController.authenticate);


router.get("/logout",(req, res)=>{
    req.logout();
})

module.exports = router;