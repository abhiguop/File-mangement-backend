const mongoose = require('mongoose')
const logger = require('../utils/logger')

const MongoDB_URI = process.env.MongoDB_URI

async function connectMongoDB(req,res,next){
    try{
        await mongoose.connect(MongoDB_URI);
        logger.info('Connected to MongoDB successfully');
    }
    catch(err){
        logger.error('MongoDB connection error:',error);
        process.exit(1);
    }
}

module.exports = connectMongoDB;