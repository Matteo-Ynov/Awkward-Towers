const mongoose = require('mongoose');

//Connection à mongoose
mongoose.connect("mongodb://localhost/api", {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

// Export du module 
module.exports = mongoose;