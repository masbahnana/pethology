# 🏆 Pethology Achievement System

## Overview

The Achievement System is a gamification feature designed to engage students and encourage consistent learning. Students unlock achievements by completing quizzes, maintaining streaks, and excelling in different modules.

## Features

### 19 Achievements Across 4 Categories

#### 📚 Learning Achievements (8)
- **First Steps** 🎓 - Complete your first quiz (Common)
- **Knowledge Seeker** 📖 - Complete 5 quizzes (Common)
- **Dedicated Learner** 📚 - Complete 10 quizzes (Uncommon)
- **Quiz Master** 👑 - Complete 25 quizzes (Rare)
- **Brain Master** 🧠 - Complete all 10 modules (Legendary)
- **Perfect Score** 🔥 - Score 100% on a quiz (Rare)
- **Excellence** ⭐ - Score 90%+ on 5 quizzes (Rare)
- **Perfectionist** 💯 - Score 100% on 3 different quizzes (Legendary)

#### ⚡ Consistency Achievements (4)
- **Early Bird** 🌅 - Complete 3 quizzes before noon (Uncommon)
- **Streak Master** 🔄 - Study for 7 consecutive days (Rare)
- **Speed Demon** 🚀 - Complete a quiz in under 5 minutes with 80%+ (Rare)
- **Focused** 🎯 - Complete 3 quizzes in the same day (Uncommon)

#### 🎯 Specialized Achievements (5)
- **Animal Lover** 🐾 - Complete all animal-related modules (Rare)
- **Vet Pro** ⚕️ - Complete all clinical modules (Rare)
- **Nutrition Expert** 🥗 - Score 90%+ on Nutrition module (Uncommon)
- **Grooming Guru** ✂️ - Score 90%+ on Grooming module (Uncommon)
- **Communication Pro** 💬 - Score 90%+ on Communications module (Uncommon)
- **Biology Boss** 🔬 - Score 90%+ on Biology module (Uncommon)

#### 🌟 Special Achievements (2)
- **Overachiever** 🌟 - Maintain 85%+ average across all quizzes (Rare)
- **Comeback Kid** 💪 - Improve your score by 20% on a retake (Uncommon)

### Rarity Levels
- **Common** - Easy to unlock (gray)
- **Uncommon** - Requires dedication (blue)
- **Rare** - Challenging to achieve (pink)
- **Legendary** - Ultimate accomplishments (gold gradient)

## How It Works

### 1. Automatic Detection
When a student completes a quiz, the system:
1. Saves the quiz result to Firebase
2. Calculates updated statistics (total quizzes, scores, streaks, etc.)
3. Checks all achievement conditions
4. Unlocks any newly earned achievements
5. Shows toast notifications for new achievements

### 2. Toast Notifications
When an achievement is unlocked:
- An animated toast slides in from the right
- Shows the achievement emoji, name, and rarity
- Plays a subtle sound effect
- Auto-dismisses after 4 seconds
- Multiple achievements are staggered (500ms apart)

### 3. Student Dashboard Display
The Achievements section shows:
- **All 19 achievements** in a responsive grid
- **Locked state**: Grayscale, opacity 50%
- **Unlocked state**: Full color, animated, with checkmark badge
- **Filter buttons**: View by category (All, Learning, Consistency, Specialized, Special)
- **Progress counter**: "X/19 unlocked"

## Technical Implementation

### Files Structure
```
assets/js/
├── achievements.js              # Achievement definitions and logic
├── firebase-service.js          # Firebase integration (updated)
└── quiz/
    └── quiz.js                  # Quiz completion handler (updated)

student-dashboard.html           # Achievement UI (updated)
```

### Key Functions

#### `achievements.js`
- `ACHIEVEMENTS` - Object with all 19 achievement definitions
- `checkAchievements(userId, stats)` - Returns newly unlocked achievements
- `showAchievementToast(achievement)` - Displays toast notification
- `calculateStudentStats(quizResults, moduleProgress)` - Calculates stats for checking
- `getAchievementStats(unlockedAchievements)` - Returns achievement statistics

#### `firebase-service.js`
- `updateStudentAchievements(userId, newAchievements)` - Saves achievements to Firebase
- `saveQuizResultWithAchievements(resultData)` - Saves quiz and checks achievements
- `getStudentQuizHistory(userId)` - Gets all quiz results for stats
- `initializeStudentProgress(userId)` - Initializes progress with achievements array

#### `student-dashboard.html`
- `loadAchievements()` - Loads student achievements from Firebase
- `renderAchievements()` - Renders achievement cards
- `filterAchievements(category)` - Filters achievements by category
- `updateAchievementStats()` - Updates progress counter

### Firebase Structure

#### `/student_progress/{userId}`
```javascript
{
  achievements: ['first_steps', 'knowledge_seeker', 'perfect_score'],
  lastAchievementUnlocked: Timestamp,
  overallStats: {
    totalQuizzes: 10,
    averageScore: 85,
    currentStreak: 3
  },
  moduleProgress: {
    biology: {
      completion: 100,
      averageScore: 92
    }
  }
}
```

#### `/quiz_results/{resultId}`
```javascript
{
  userId: 'user123',
  quizId: 'biology',
  score: 0.95,
  totalQuestions: 20,
  correctAnswers: 19,
  timeSpent: 245, // seconds
  completedAt: Timestamp,
  answers: [...]
}
```

## Testing

### Manual Testing
1. Open browser console
2. Uncomment the test function in `student-dashboard.html`
3. Run: `testAchievement()`
4. Should see a toast notification appear

### Live Testing
1. Login to student dashboard
2. Complete a quiz
3. Check console for achievement logs
4. View unlocked achievements in dashboard
5. Verify toast appears (if new achievement)

### Test Scenarios

#### Test First Steps Achievement
1. Create new student account
2. Complete any quiz
3. Should unlock "First Steps" 🎓

#### Test Perfect Score Achievement
1. Complete quiz with 100% score
2. Should unlock "Perfect Score" 🔥

#### Test Multiple Achievements
1. Complete 5 quizzes with high scores
2. Should unlock multiple achievements at once
3. Toasts should appear staggered

## Styling

All achievement CSS is in `student-dashboard.html`:
- `.achievement-card` - Card styling
- `.achievement-card.locked` - Grayscale locked state
- `.achievement-card.unlocked` - Colorful unlocked state
- `.achievement-toast` - Toast notification
- `.achievement-filter` - Filter buttons

### Color Scheme
- Common: Gray (`#e5e7eb`, `#6b7280`)
- Uncommon: Blue (`#dbeafe`, `#1e40af`)
- Rare: Pink (`#fce7f3`, `#be185d`)
- Legendary: Gold gradient (`#fbbf24`, `#f59e0b`)

## Future Enhancements

### Planned Features
- [ ] Achievement badges in student profile
- [ ] Social sharing (share your achievements)
- [ ] Leaderboard (most achievements unlocked)
- [ ] Seasonal/Limited-time achievements
- [ ] Achievement points/XP system
- [ ] Achievement showcase on profile
- [ ] Email notifications for rare achievements

### Advanced Achievement Ideas
- **Night Owl** - Complete 5 quizzes after 10pm
- **Weekend Warrior** - Complete 10 quizzes on weekends
- **Module Master** - Score 100% on all quizzes in a module
- **Helping Hand** - Share study notes with classmates
- **Streak Legend** - 30-day study streak

## Troubleshooting

### Achievements not loading
- Check browser console for errors
- Verify Firebase connection
- Check `student_progress` exists in Firestore
- Ensure `achievements` array is initialized

### Toast not appearing
- Check if new achievements were actually unlocked
- Verify console logs show achievement unlock
- Check if toast CSS is loaded
- Test with `testAchievement()` function

### Wrong achievement count
- Verify `achievements` array in Firebase
- Check for duplicate achievement IDs
- Ensure achievement conditions are correct

## Code Examples

### Adding a New Achievement

1. Add to `achievements.js`:
```javascript
new_achievement: {
  id: 'new_achievement',
  name: 'Achievement Name',
  emoji: '🎉',
  description: 'Do something cool',
  condition: (stats) => stats.someStat >= 10,
  rarity: 'rare',
  category: 'learning'
}
```

2. Update total count in dashboard:
```html
<span id="achievementCount">0/20</span> unlocked
```

### Manually Unlock Achievement (Testing)

```javascript
// In browser console
const { PethologyFirebaseService } = await import('./assets/js/firebase-service.js');
const { ACHIEVEMENTS } = await import('./assets/js/achievements.js');

await PethologyFirebaseService.updateStudentAchievements(
  'user_id_here',
  [ACHIEVEMENTS.perfect_score]
);
```

## Performance Considerations

- Achievement checking happens **after** quiz save (non-blocking)
- Toast notifications use CSS animations (GPU-accelerated)
- Achievement cards use `transform` for hover effects
- Firebase queries are optimized with indexes

## Accessibility

- All emojis have proper alt text context
- Achievement cards are keyboard navigable
- Toast notifications don't interfere with page interaction
- Color contrast meets WCAG AA standards
- Rarity badges use both color and text

---

**Created:** October 16, 2025
**Version:** 1.0
**Author:** Pethology Development Team
