const Product = require("../model/product");

exports.login = (req, res)=>{
    res.render("login");
};

exports.signup = (req, res)=>{
    res.render("signup");
};

exports.allProducts = (req, res)=>{
    Product.find({})
    .then(products => res.render ("index", {products}))
    .catch(error=>console.log(error));
};

exports.getSearch = (req, res)=>{
    res.render("search", {product : undefined});
};
exports.getProductSearch = (req, res)=>{

        const searchByCode = { code: req.query.code};
        Product.findOne(searchByCode)
        .then(product => {
            if(product){ res.render ( "search", {product} );}

            else{
                req.flash("error", `Aucun Produits Trouvé avec le CODE : ${searchByCode.code}`);
                res.redirect("/search");
            } 
        })             
        .catch(error=>console.log(error));       
};

exports.getNew = (req, res)=>{
    res.render("new");
};
exports.saveProduct = (req, res)=>{

    let productParams = {
        code : req.body.code,
        description : req.body.description,
        price : req.body.price
    };

    const newProduct = new Product(productParams);
    newProduct.save()
    .then(()=>{
            req.flash("success", `Produit ajouté avec succès CODE : ${productParams.code}`);
            res.redirect("/");
        })
    .catch(error=>{
        req.flash("error", `Erreur lors de la création de Produit`);
        res.redirect("/new");
    });
};

exports.putEdit = (req, res)=>{
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
        res.redirect("/");
    }).catch(error => {res.redirect("/");});
};

exports.getEdit = (req, res)=>{
    const searchId = {_id : req.params.id};
    
        Product.findById(searchId)
        .then(product => {res.render("edit", {product});})                  
        .catch(error=>console.log(error));    
};

exports.delete = (req, res)=>{
    const searchId = {_id : req.params.id};
    Product.findById(searchId)
        .then(product => {
                Product.deleteOne(searchId)
                .then(() => {
                    req.flash("success", `Produit Supprimé avec succès CODE : ${product.code}` );
                    res.redirect("/"); 
                });          
        })            
        .catch(()=>{res.redirect("/");});    
};
