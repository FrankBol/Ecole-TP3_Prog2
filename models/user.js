const mongoose = require("mongoose");
passportLocalMongoose = require("passport-local-mongoose");

const userSchema = new mongoose.Schema({
    name : {
        first : {
            type: String,
            trim : true

        },
        last: {
            type: String,
            trim : true

        }
    },
    email: {
        type: String,
        required: true,
        lowercase: true,
        unique: true
    },

    zipCode : {
        type: Number,
        min : [10000, "Zip code too short"],
        max : 99999
    },

    
}, {
    timestamps: true
}
  
);



userSchema.plugin(passportLocalMongoose, {usernameField: "email"});
module.exports = mongoose.model("User", userSchema);