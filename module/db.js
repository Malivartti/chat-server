const mongoose = require("mongoose");
mongoose.set('strictQuery', false);

async function connectDB() {
    try {
        const url = process.env.DB_CONNECT;
        mongoose.connect(url, {useNewUrlParser: true, useUnifiedTopology: true});
        console.log("BD connected");
    } catch(e) {
        console.log("DB failed");
    }   
}

module.exports = {
    connectDB,
    mongoose
};
