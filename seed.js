const mongoose = require('mongoose');
const Vocabulary = require('./src/models/Vocabulary');
const Grammar = require('./src/models/Grammar');
const Question = require('./src/models/Question');
require('dotenv').config();

const words = [
    {
        word: 'Minimalist',
        definition: 'A lifestyle or design style that emphasizes simplicity and only uses essential elements.',
        vietnameseMeaning: 'Tối giản',
        example: 'The new English Learning Web App has a minimalist design.',
        topic: 'Design',
        level: 'Intermediate'
    },
    {
        word: 'Persistence',
        definition: 'The quality of continuing to do something even though it is difficult or people oppose it.',
        vietnameseMeaning: 'Sự kiên trì',
        example: 'Persistence is key when learning a new language.',
        topic: 'Motivation',
        level: 'Intermediate'
    },
    {
        word: 'Pronunciation',
        definition: 'The way in which a word is pronounced.',
        vietnameseMeaning: 'Cách phát âm',
        example: 'Our app helps you improve your English pronunciation.',
        topic: 'Phonetics',
        level: 'Beginner'
    },
    {
        word: 'Vocabulary',
        definition: 'The body of words used in a particular language.',
        vietnameseMeaning: 'Từ vựng',
        example: 'Reading books is a great way to expand your vocabulary.',
        topic: 'Phonetics',
        level: 'Beginner'
    },
    {
        word: 'Environment',
        definition: 'The surroundings or conditions in which a person, animal, or plant lives.',
        vietnameseMeaning: 'Môi trường',
        example: 'We must protect the environment for future generations.',
        topic: 'Nature',
        level: 'Beginner'
    },
    {
        word: 'Technology',
        definition: 'The application of scientific knowledge for practical purposes.',
        vietnameseMeaning: 'Công nghệ',
        example: 'Technology is changing the way we learn.',
        topic: 'Modern Life',
        level: 'Intermediate'
    },
    {
        word: 'Education',
        definition: 'The process of receiving or giving systematic instruction.',
        vietnameseMeaning: 'Giáo dục',
        example: 'Education is the most powerful weapon which you can use to change the world.',
        topic: 'Society',
        level: 'Beginner'
    },
    {
        word: 'Travel',
        definition: 'Go from one place to another, typically over a distance of some length.',
        vietnameseMeaning: 'Du lịch / Đi lại',
        example: 'I love to travel and explore new cultures.',
        topic: 'Leisure',
        level: 'Beginner'
    },
    {
        word: 'Success',
        definition: 'The accomplishment of an aim or purpose.',
        vietnameseMeaning: 'Thành công',
        example: 'Success is the result of hard work and preparation.',
        topic: 'Motivation',
        level: 'Intermediate'
    },
    {
        word: 'Opportunity',
        definition: 'A set of circumstances that makes it possible to do something.',
        vietnameseMeaning: 'Cơ hội',
        example: 'Don\'t miss this opportunity to study abroad.',
        topic: 'Business',
        level: 'Intermediate'
    },
    {
        word: 'Challenge',
        definition: 'A task or situation that tests someone\'s abilities.',
        vietnameseMeaning: 'Thách thức',
        example: 'Learning English can be a challenge, but it is worth it.',
        topic: 'Motivation',
        level: 'Intermediate'
    },
    {
        word: 'Community',
        definition: 'A group of people living in the same place or having a particular characteristic in common.',
        vietnameseMeaning: 'Cộng đồng',
        example: 'Our online community helps students support each other.',
        topic: 'Society',
        level: 'Beginner'
    },
    {
        word: 'Healthy',
        definition: 'In good health; free from disease.',
        vietnameseMeaning: 'Khỏe mạnh',
        example: 'Eating vegetables is good for a healthy lifestyle.',
        topic: 'Health',
        level: 'Beginner'
    },
    {
        word: 'Relationship',
        definition: 'The way in which two or more people or things are connected.',
        vietnameseMeaning: 'Mối quan hệ',
        example: 'Communication is key to a good relationship.',
        topic: 'Society',
        level: 'Intermediate'
    },
    {
        word: 'Language',
        definition: 'The system of communication used by a particular community or country.',
        vietnameseMeaning: 'Ngôn ngữ',
        example: 'English is a global language.',
        topic: 'Culture',
        level: 'Beginner'
    },
    {
        word: 'Culture',
        definition: 'The ideas, customs, and social behavior of a particular people or society.',
        vietnameseMeaning: 'Văn hóa',
        example: 'Understanding culture is important when learning a language.',
        topic: 'Culture',
        level: 'Intermediate'
    }
];

const grammarLessons = [
    {
        title: 'Present Simple',
        content: '<p>Use the present simple for habits and facts.</p><ul><li>I <strong>work</strong> here.</li><li>She <strong>likes</strong> coffee.</li></ul>',
        level: 'Beginner'
    },
    {
        title: 'Conditionals (Type 1)',
        content: '<p>Used for real or possible situations in the future.</p><p><em>Structure: If + Present Simple, will + base verb</em></p><ul><li>If it <strong>rains</strong>, I <strong>will stay</strong> home.</li></ul>',
        level: 'Intermediate'
    }
];

const questions = [
    {
        questionText: 'What is the opposite of "Minimalist"?',
        options: ['Simple', 'Complex', 'Essential', 'Small'],
        correctAnswer: 'Complex',
        level: 'Intermediate'
    },
    {
        questionText: 'Which sentence is in Present Simple?',
        options: ['I am working.', 'I worked.', 'I work.', 'I will work.'],
        correctAnswer: 'I work.',
        level: 'Beginner'
    },
    {
        questionText: 'Complete the sentence: If I have time, I ____ help you.',
        options: ['would', 'will', 'did', 'was'],
        correctAnswer: 'will',
        level: 'Intermediate'
    }
];

const seedDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('Connected to MongoDB for seeding...');
        
        await Vocabulary.deleteMany({});
        await Vocabulary.insertMany(words);

        await Grammar.deleteMany({});
        await Grammar.insertMany(grammarLessons);

        await Question.deleteMany({});
        await Question.insertMany(questions);

        // Create default admin account
        const User = require('./src/models/User');
        const existingAdmin = await User.findOne({ role: 'admin' });
        if (!existingAdmin) {
            await User.create({
                username: 'admin',
                email: 'admin@englishlearning.com',
                password: 'admin123',
                role: 'admin',
                isApproved: true
            });
            console.log('Admin account created: admin@englishlearning.com / admin123');
        } else {
            console.log('Admin account already exists.');
        }
        
        console.log('Database Seeded Successfully!');
        process.exit();
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
};

seedDB();

