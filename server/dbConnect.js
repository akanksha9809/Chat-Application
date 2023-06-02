const mongoose = require('mongoose'); 
const dotenv = require("dotenv");
dotenv.config("./.env");

module.exports = async() => {
    const mongoUri = process.env.MONGODB_URI;
    
    try {
        const connect = await mongoose.connect(
            mongoUri,
            {
                useNewUrlParser: true, 
                useUnifiedTopology: true
            });
        console.log(`MongoDB connected: ${connect.connection.host}`);    
    } catch (error) {
        console.log(error);
        process.exit(1);
    }  
}

