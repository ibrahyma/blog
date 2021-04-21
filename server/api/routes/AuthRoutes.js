'use strict';

module.exports = app => {
    const authController = require('../controllers/AuthController');
    
    app.route('/login')
        .post(authController.login)
};
