import mongoose from 'mongoose';

async function connectToMongoDB(url){
    return mongoose.connect(url);
}

module.exports = {connectToMongoDB};