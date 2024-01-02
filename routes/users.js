const express = require('express');
const router = express.Router();
const { storeReturnTo } = require('../middleware');
const catchAsync = require('../utils/catchAsync')
const User = require('../models/user');
const passport = require('passport');
const users = require('../controllers/users');

router.route('/register')
    .get(users.renderRegisterForm)
    .post(catchAsync(users.registerUser));

router.route('/login')
    .get(users.renderLoginForm)
    .post(storeReturnTo, passport.authenticate('local', {failureFlash: true, failureRedirect: '/login'}), users.loginUser);

router.get('/logout', users.logoutUser); 

module.exports = router;