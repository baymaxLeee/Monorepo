const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

// 用户注册
router.post('/register', authController.register);

// 用户登录
router.post('/login', authController.login);

// 受保护的路由（需要身份认证）
router.get('/profile', authController.authenticate, authController.getProfile);

module.exports = router;