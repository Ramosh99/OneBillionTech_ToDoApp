import express from 'express'
import User from '../models/UserModel.js'
import jwt from 'jsonwebtoken'
import nodemailer from 'nodemailer'
import crypto from 'crypto'
import mongoose from 'mongoose'
import bcrypt from 'bcrypt'

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
        const saltRounds = 10;
        // const verificationToken = crypto.randomBytes(32).toString('hex');
        const hashedPassword = await bcrypt.hash(req.body.password, saltRounds);
        // const verificationToken = crypto.randomBytes(32).toString('hex');
        const user = new User({
            ...req.body,
            password: hashedPassword,
        });
        await user.save();

        // Send verification email
        // const verificationLink = `${process.env.BASE_URL}/verify/${verificationToken}`;
        await transporter.sendMail({
            to: user.email,
            subject: 'Verify your email',
            // html: `Click <a href="${verificationLink}">here</a> to verify your email`
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

        console.log("x", password);
        console.log(user.password);

        // console.log(email, password);
        
        if (!user) {
            return res.status(401).json({
                status: 'Failed',
                message: 'User not found'
            });
        }
        
        // Check if password is correct
        const isPasswordValid = await bcrypt.compare(password, user.password);
        // console.log(password, user.password);
        console.log(isPasswordValid);




        if (!isPasswordValid) {
            console.log('Invalid password attempt for user:', email);
            return res.status(401).json({
                status: 'Failed',
                message: 'Invalid email or password'
            });
        }

        // Generate JWT token
        const token = jwt.sign({ id: user._id}, process.env.JWT_SECRET, {
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

// Update forgot-password route
router.post('/forgot-password', async (req, res) => {
    try {
        const user = await User.findOne({ email: req.body.email });
        if (!user) {
            return res.status(404).json({
                status: 'Failed',
                message: 'User not found'
            });
        }

          // Generate JWT token with user ID
    const resetToken = jwt.sign(
        { userId: user._id },
        process.env.JWT_SECRET,
        { expiresIn: '1h' }
      );  
        // Update user with reset token
        user.resetPasswordToken = resetToken;
        await user.save();

        // Create reset link
        const resetLink = `http://localhost:3000/reset-password/${resetToken}`;

        // Send email
        try {
            await transporter.sendMail({
                to: user.email,
                subject: 'Password Reset Request',
                html: `
                    <h1>Password Reset Request</h1>
                    <p>You requested a password reset. Click the link below to reset your password:</p>
                    <a href="${resetLink}">Reset Password</a>
                    <p>If you didn't request this, please ignore this email.</p>
                `
            });

            res.status(200).json({
                status: 'Success',
                message: 'Password reset link sent to email'
            });
        } catch (emailError) {
            user.resetPasswordToken = undefined;
            user.resetPasswordExpires = undefined;
            await user.save();
            
            throw new Error('Failed to send reset email');
        }
    } catch (err) {
        res.status(500).json({
            status: 'Failed',
            message: err.message
        });
    }
});

router.post('/reset-password', async (req, res) => {
    try {
        const { token, password } = req.body;

        console.log("token is ", token);
        console.log("password is ", password);

        // Generate JWT token with user ID
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        // Extract userId from decoded token
        const userId = decoded.userId;
        console.log("userId is: ", userId);

        // Find user with valid token
        const user = await User.findOne({
            _id: new mongoose.Types.ObjectId(userId)
        });

        console.log('user is', user);

        if (!user) {
            return res.status(400).json({
                status: 'Failed',
                message: 'Password reset token is invalid or has expired'
            });
        }
        
        // Clear reset token fields
        const saltRounds = 10;
        // const verificationToken = crypto.randomBytes(32).toString('hex');
        const hashedPassword = await bcrypt.hash(password, saltRounds);
        user.password = hashedPassword;

        console.log("y", user.password);
        
        await user.save();

        res.status(200).json({
            status: 'Success',
            message: 'Password has been reset successfully'
        });
    } catch (err) {
        console.error('Reset password error:', err);
        res.status(500).json({
            status: 'Failed',
            message: 'Error resetting password',
            error: err.message
        });
    }
});

export default router;