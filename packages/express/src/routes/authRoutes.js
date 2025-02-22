const express = require('express');
const authController = require('../controllers/authController');

const router = express.Router();

// 用户注册
router.post('/register', authController.register);

// 用户登陆
router.post('/login', authController.login);

// 受保护的路由（需要身份认证）
router.get('/profile', authController.authenticate, authController.getProfile);

module.exports = router;

