const mongoose = require('mongoose');
const connectDB = async () => {
    const maxRetries = 3;
    let retries = 0;

    while (retries < maxRetries) {
        try {
            const conn = await mongoose.connect(process.env.MONGODB_URI, {
                family: 4,
                serverSelectionTimeoutMS: 5000,
                connectTimeoutMS: 10000,
                socketTimeoutMS: 45000,
                tlsAllowInvalidCertificates: true, // Workaround for SSL alert 80 on some Windows/Node environments
            });
            console.log(`MongoDB Connected: ${conn.connection.host}`);
            return;
        } catch (error) {
            retries++;
            console.error(`Connection attempt ${retries} failed: ${error.message}`);
            if (retries >= maxRetries) {
                console.error(`Max retries reached. Exiting...`);
                process.exit(1);
            }
            console.log(`Retrying in 2 seconds...`);
            await new Promise(resolve => setTimeout(resolve, 2000));
        }
    }
};

module.exports = connectDB;
