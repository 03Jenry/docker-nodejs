const mongoose = require('mongoose');
const config = require('config');

// .env file
const env = require('node-env-file');
env('./.env.dist');

const url = config.get('mongodb');

// connect to Mongo daemon
function mongoconnect(){
    mongoose.connect(url, { useNewUrlParser: true
        ,  useUnifiedTopology: true})
    .then(() => {
        console.log("************************************")
        console.log("*          MongoDB Connected       *")
        console.log("************************************")
    }).catch(err => {

    });
}

mongoconnect(); 
