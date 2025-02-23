const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const generateToken = require("../utils/generateToken");

// 用户注册
const register = async (req, res) => {
    const { username, password } = req.body;

    try {
        // 检查用户是否已存在
        const userExists = await User.findOne({ username });
        if (userExists) {
            return res.status(400).json({ message: "User already exists" });
        }

        // 哈希密码
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // 创建用户
        const user = await User.create({ username, password: hashedPassword });

        // 生成 JWT
        const token = generateToken(user._id);

        res.status(201).json({ token });
    } catch (err) {
        res.status(500).json({ message: "Server error" });
    }
};

// 用户登录
const login = async (req, res) => {
    const { username, password } = req.body;

    try {
        // 查找用户
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        // 验证密码
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        // 生成 JWT
        const token = generateToken(user._id);

        res.status(200).json({ token });
    } catch (err) {
        res.status(500).json({ message: "Server error" });
    }
};

// 获取用户信息（受保护的路由）
const getProfile = (req, res) => {
    res.status(200).json({ user: req.user });
};

module.exports = {
    register,
    login,
    getProfile,
    authenticate: require("../middleware/authMiddleware"),
};
