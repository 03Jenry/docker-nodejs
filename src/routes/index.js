const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const amqp = require('amqplib');
const { Router } = require('express');
const { route } = require('../app');
const config = require('config');
const cors = require('cors')
const router = Router();

router.use(bodyParser.urlencoded({ extended: false }));                                                                                                                 
router.use(bodyParser.json());

//Activar cors
router.use(cors());

    //Connect to rabbitmq
    connect();
    async function connect() {
        try {
            const conn = await amqp.connect(rabbitSettings);
            console.log("Connection Created......");
        } catch (err) {
            console.error(`Error => ${err}`);
        }
    };

//Controllers
const HomeController = require("../controllers/HomeController.js");

//Routes
router.get('/', HomeController.index);

module.exports = router;