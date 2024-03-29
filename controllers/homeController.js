const User = require("../models/user");
const passport = require("passport");
const Product = require("../models/product");

exports.login = (req, res)=>{
    res.render("login");
};

exports.signup = (req, res)=>{
    res.render("signup");
};

exports.allProducts = (req, res)=>{
    let logStatus = req.isAuthenticated();

    if (req.isAuthenticated()){
    Product.find({})
    .then(products => res.render ("index", {products: products, name: req.user.name, logStatus}))
    .catch(error=>console.log(error));
    }else{
        Product.find({})
        .then(products => res.render ("index", {products: products, logStatus}))
        .catch(error=>console.log(error));
    }

};

exports.getSearch = (req, res)=>{
    if (req.isAuthenticated()){
        res.render("search", {product : undefined, name: req.user.name });
    }else{res.render("login");};

};

exports.getProductSearch = (req, res)=>{
        if (req.isAuthenticated()){
        const searchByCode = { code: req.query.code};
        Product.findOne(searchByCode)
        .then(product => {
            if(product){ res.render ( "search", {product: product, name: req.user.name} );}

            else{
                req.flash("error", `Aucun Produits Trouvé avec le CODE : ${searchByCode.code}`);
                res.redirect("/search");
            } 
        })             
        .catch(error=>console.log(error));  
        }else{res.render("login");};
};

exports.getNew = (req, res)=>{
    if (req.isAuthenticated()){
        res.render("new", {name: req.user.name});
    }else{res.render("login");};
    
};

exports.saveProduct = (req, res)=>{
    if (req.isAuthenticated()){
        let productParams = {
            code : req.body.code,
            description : req.body.description,
            price : req.body.price
        };
    
        const newProduct = new Product(productParams);
        newProduct.save()
        .then(()=>{
                req.flash("success", `Produit ajouté avec succès CODE : ${productParams.code}`);
                res.redirect("/index");
            })
        .catch(error=>{
            req.flash("error", `Erreur lors de la création de Produit`);
            res.redirect("/new");
        });
    }else{res.render("login");};

};

exports.putEdit = (req, res)=>{
    if (req.isAuthenticated()){
        const searchId = {_id : req.params.id};
        Product.updateOne(searchId, 
        {$set:
        {
            code : req.body.code,
            description : req.body.description,
            price : req.body.price
        }})
        .then(user =>{
            const codePut = req.body.code;
            req.flash("success", `Succes de la mise à jour du prodit CODE : ${codePut}`);
            res.redirect("/index");
        }).catch(error => {res.redirect("/index");});
    }else{res.render("login");};

};

exports.getEdit = (req, res)=>{
    if (req.isAuthenticated()){
        const searchId = {_id : req.params.id};
    
        Product.findById(searchId)
        .then(product => {res.render("edit", {product});})                  
        .catch(error=>console.log(error));    
    }else{res.render("login");};

};

exports.delete = (req, res)=>{
    if (req.isAuthenticated()){
        const searchId = {_id : req.params.id};
        Product.findById(searchId)
            .then(product => {
                    Product.deleteOne(searchId)
                    .then(() => {
                        req.flash("success", `Produit Supprimé avec succès CODE : ${product.code}` );
                        res.redirect("/index"); 
                    });          
            })            
            .catch(()=>{res.redirect("/index");});  
    }else{res.render("login");};
  
};

exports.saveUser = (req, res, next) => {

    if(req.skip)
        next();
    
        let userParams = {
                    name : {
                        first: req.body.first,
                        last: req.body.last
                    },
                    email : req.body.email,
                    password : req.body.password,
                    zipCode : req.body.zipCode
                };
                const newUser = new User(userParams);
                
                User.register(newUser, req.body.password, (error, user)=>{
                    if(error){
                        req.flash("error", `Erreur lors de la création du Compte`);
                        res.redirect("/signup");
                        next();
                    }
                    else{
                        res.render("login");
                        next();
                    }
                });
}

exports.authenticate =  passport.authenticate("local", {
    failureRedirect: "login",
    successRedirect: "/index", 
    failureFlash: true
});

exports.logout = (req, res) => {
    if (req.isAuthenticated()) {
        req.logout();
    }
    res.render("login");
};