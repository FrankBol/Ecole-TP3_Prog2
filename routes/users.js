const express = require('express');
const router = express.Router();
const homeController = require('./homeController');

router.get("/", homeController.allProducts);

router.get("/new", homeController.getNew);
router.post("/product/new", homeController.saveProduct);

router.get("/search", homeController.getSearch);
router.get("/product/search", homeController.getProductSearch);

router.get("/edit/:id", homeController.getEdit);
router.put("/editPut/:id", homeController.putEdit);

router.delete("/delete/:id", homeController.delete);


module.exports = router;