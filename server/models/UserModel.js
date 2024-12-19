// const mongoose = require('mongoose');
// const bcrypt = require('bcrypt');
import mongoose from 'mongoose';
import bcrypt from 'bcrypt';


// import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
}, { timestamps: true });

export default mongoose.model('User', userSchema);

