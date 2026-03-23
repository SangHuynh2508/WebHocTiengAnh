require('dotenv').config();
const express = require('express');
const path = require('path');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const multer = require('multer');
const connectDB = require('./config/db');

// Connect to Database
connectDB();

const app = express();

// Multer config for certificate uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, path.join(__dirname, '../public/uploads')),
    filename: (req, file, cb) => cb(null, Date.now() + '-' + file.originalname)
});
const upload = multer({ storage });

// Body Parser Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Cookie Parser Middleware
app.use(cookieParser());

// Session Middleware
app.use(session({
    secret: process.env.SESSION_SECRET || 'secret',
    resave: false,
    saveUninitialized: false,
    cookie: {
        secure: false,
        maxAge: 24 * 60 * 60 * 1000
    }
}));

// Load user middleware
const { guest, protect, authorize, loadUser } = require('./middlewares/auth');
app.use(loadUser);

// Set View Engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Set Static Folder
app.use(express.static(path.join(__dirname, '../public')));

// Routes
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/user');
const vocabularyRoutes = require('./routes/vocabulary');
const grammarRoutes = require('./routes/grammar');
const testRoutes = require('./routes/test');
const instructorRoutes = require('./routes/instructor');
const adminRoutes = require('./routes/admin');

app.use('/auth', upload.single('certificate'), authRoutes);
const { getProgress } = require('./controllers/progressController');
const Progress = require('./models/Progress');

app.use('/profile', userRoutes);
app.get('/profile/progress', protect, getProgress);

app.use('/vocabulary', vocabularyRoutes);
app.use('/grammar', grammarRoutes);
app.use('/test', testRoutes);
app.use('/instructor', protect, authorize('instructor'), instructorRoutes);
app.use('/admin', protect, authorize('admin'), adminRoutes);

app.get('/', (req, res) => {
    res.render('index', { title: 'English Learning App' });
});

app.get('/login', guest, (req, res) => {
    res.render('auth/login', { error: req.query.error });
});

app.get('/register', guest, (req, res) => {
    res.render('auth/register', { error: req.query.error });
});

app.get('/dashboard', protect, async (req, res) => {
    try {
        const progress = await Progress.findOne({ user: req.session.userId });
        const totalTests = progress ? progress.testResults.length : 0;
        res.render('dashboard/index', { user: req.user, totalTests });
    } catch (err) {
        console.error(err);
        res.render('dashboard/index', { user: req.user, totalTests: 0 });
    }
});


const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
