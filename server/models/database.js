const mongoose = require("mongoose");

mongoose.connect(process.env.MONGO_URI, {useNewUrlParser: true,   useUnifiedTopology: true});



// Models
 require('./Category');
require('./Post');
require('./Chronicle');
