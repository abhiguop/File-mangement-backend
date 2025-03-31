const fileService = require('../services/file.service');
const socketHandlers = require('../socket/socket.handlers');

async function uploadFile(res,req,next){
    try{
        if(!req.file){
            res.status(400).json({message:'No file uploaded'})
        }
        const{buffer,originalName,size}=req.file;
        const userEmail =req.user.email

        const file= await fileService.uploadFile(buffer,originalName,size,userEmail);
    }   
    catch(error){
        logger.error('Error uploading file:',error)
        res.status(500).json({message:error.message})
    } 
}