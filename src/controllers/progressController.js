const Progress = require('../models/Progress');
const User = require('../models/User');

// @desc    Get user progress dashboard
// @route   GET /profile/progress
// @access  Private
exports.getProgress = async (req, res) => {
    try {
        const userId = req.session.userId;
        const user = await User.findById(userId);
        
        let progress = await Progress.findOne({ user: userId });
        
        if (!progress) {
            progress = { testResults: [], completedLessons: [] };
        }

        // Calculate stats
        const testResults = progress.testResults.sort((a, b) => b.date - a.date);
        const totalTests = testResults.length;
        
        let avgScore = 0;
        if (totalTests > 0) {
            const sum = testResults.reduce((acc, result) => acc + (result.score / result.totalQuestions), 0);
            avgScore = Math.round((sum / totalTests) * 100);
        }

        // Calculate level completion (mock logic based on scores at that level)
        // In a real app, this would be more complex
        const levelData = {
            'Beginner': 0,
            'Intermediate': 0,
            'Advanced': 0
        };

        // Simple mock progress calculation
        const levelBonus = { 'Beginner': 20, 'Intermediate': 15, 'Advanced': 10 };
        testResults.forEach(r => {
            // Assume we can't easily track the level of the question here without more DB lookups
            // but we'll use the user's current level as a proxy for most tests taken
            levelData[user.level] = Math.min(100, (levelData[user.level] || 0) + 10);
        });

        res.render('dashboard/progress', {
            user,
            stats: {
                totalTests,
                avgScore,
                testResults: testResults.slice(0, 10), // Latest 10
                levelData
            }
        });
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
};
