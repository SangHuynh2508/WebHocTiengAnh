const mongoose = require('mongoose');
require('dotenv').config();

const testConnect = async () => {
    try {
        console.log('Testing connection to:', process.env.MONGODB_URI.split('@')[1]); // Log only the host for security
        await mongoose.connect(process.env.MONGODB_URI, {
            serverSelectionTimeoutMS: 5000,
        });
        console.log('Successfully connected to MongoDB Atlas!');
        await mongoose.connection.close();
        process.exit(0);
    } catch (err) {
        console.error('Connection failed:');
        console.error(err);
        process.exit(1);
    }
};

testConnect();
