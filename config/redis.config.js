const redis =require('redis');
const logger = require('../utils/logger');

const REDIS_URL=process.env.REDIS_URL

const redisClient = redis.createClient({url: REDIS_URL});

async function connectRedis(req,res,next){
    try{
        await redisClient.connect(REDIS_URL)
        logger.info('Connected to Redis scuccessfully');
    }
    catch(err){
        logger.error('Redis connection error:', error)
    }
}
module.exports={connectRedis,redisClient}