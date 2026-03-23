require('dotenv').config();
const mongoose = require('mongoose');
const User = require('./src/models/User');

const checkUsers = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        const users = await User.find({});
        console.log('Total users:', users.length);
        users.forEach(u => console.log(`- ${u.username} (${u.email})`));
        process.exit(0);
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
};

checkUsers();
