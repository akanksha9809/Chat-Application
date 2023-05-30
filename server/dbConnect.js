const mongoose = require('mongoose'); 
const dotenv = require("dotenv");
dotenv.config("./.env");

module.exports = async() => {
    const mongoUri = `mongodb+srv://aakanksha:x9jlbwOnVY4s8osr@cluster0.bo6yofb.mongodb.net/?retryWrites=true&w=majority`;
    
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

