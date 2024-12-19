import express from 'express'
import User from '../models/UserModel.js'
import jwt from 'jsonwebtoken'
import crypto from 'crypto'
import nodemailer from 'nodemailer'

const router = express.Router()

// Email transporter
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

// Register
router.post('/register', async (req, res) => {
    try {
        const verificationToken = crypto.randomBytes(32).toString('hex');
        const user = new User({
            ...req.body,
            verificationToken
        });
        await user.save();

        // Send verification email
        const verificationLink = `${process.env.BASE_URL}/verify/${verificationToken}`;
        await transporter.sendMail({
            to: user.email,
            subject: 'Verify your email',
            html: `Click <a href="${verificationLink}">here</a> to verify your email`
        });

        res.status(201).json({
            status: 'Success',
            message: 'Please check your email to verify your account'
        });
    } catch (err) {
        res.status(500).json({
            status: 'Failed',
            message: err.message
        });
    }
});

// Login
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        
        if (!user || !await bcrypt.compare(password, user.password)) {
            return res.status(401).json({
                status: 'Failed',
                message: 'Invalid email or password'
            });
        }

        if (!user.isVerified) {
            return res.status(401).json({
                status: 'Failed',
                message: 'Please verify your email first'
            });
        }

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
            expiresIn: '1d'
        });

        res.status(200).json({
            status: 'Success',
            token
        });
    } catch (err) {
        res.status(500).json({
            status: 'Failed',
            message: err.message
        });
    }
});

// Forgot Password
router.post('/forgot-password', async (req, res) => {
    try {
        const user = await User.findOne({ email: req.body.email });
        if (!user) {
            return res.status(404).json({
                status: 'Failed',
                message: 'User not found'
            });
        }

        const resetToken = crypto.randomBytes(32).toString('hex');
        user.resetPasswordToken = resetToken;
        user.resetPasswordExpires = Date.now() + 3600000; // 1 hour
        await user.save();

        const resetLink = `${process.env.BASE_URL}/reset-password/${resetToken}`;
        await transporter.sendMail({
            to: user.email,
            subject: 'Password Reset',
            html: `Click <a href="${resetLink}">here</a> to reset your password`
        });

        res.status(200).json({
            status: 'Success',
            message: 'Password reset link sent to email'
        });
    } catch (err) {
        res.status(500).json({
            status: 'Failed',
            message: err.message
        });
    }
});

// module.exports = router;
export default router;