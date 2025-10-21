# Student Dashboard - Apply Notion Design to Production

## Status: Ready to Apply (Next Session)

### Files Prepared:
- ✅ `student-dashboard-demo.html` - Complete design with all features
- ✅ `student-dashboard.backup.html` - Backup of current production
- ✅ `student-dashboard.html` - Target for updates

### What Needs to be Done:

#### Step 1: Add Lucide Icons CDN
Add after line 7 in `student-dashboard.html`:
```html
<!-- Lucide Icons -->
<script src="https://unpkg.com/lucide@latest"></script>
```

#### Step 2: Replace CSS (lines 8-700+)
Copy ALL CSS from `student-dashboard-demo.html` lines 11-1000+ to replace the existing `<style>` section.

This includes:
- Notion color variables (--gray-50 through --gray-700)
- Module colors (10 modules with unique colors)
- All component styles (sidebar, nav, cards, announcements, calendar, etc.)
- Achievement rarity badges
- Module color variants
- Smart Learning Tools card styles

#### Step 3: Update HTML Structure
Keep the Firebase script at the bottom, but update the body HTML:

**Sidebar (around line 710):**
- Add Lucide icons to nav items (home, book-open, trophy, bar-chart-2)
- Add "Content" and "Tools" menu items under "Learning" section
- Update module icons in collapsible section

**Main Content:**
- Add Announcements section (banner + list)
- Add Calendar grid (2fr 1fr) with calendar widget + deadlines
- Add Smart Learning Tools cards (3 cards: Smart Review, Adaptive Quiz, Exam Mode)
- Update Stats Grid with Lucide icons
- Update Achievements section with rarity filters
- Update module cards with 10 modules + color classes

#### Step 4: Update Firebase Integration Points

**User Avatar (line ~720):**
```html
<div class="user-avatar" id="studentAvatar">JD</div>
```

**Stats Values (line ~1230+):**
Keep existing selectors:
- `.total-quizzes`, `[data-stat="totalQuizzes"]`
- `.average-score`, `[data-stat="averageScore"]`
- `.current-streak`, `[data-stat="streak"]`

**Progress Circles Container (line ~1194):**
Keep: `.progress-circles` - Firebase will populate this dynamically

**Achievements Grid (line ~1330+):**
Keep: `.achievements-grid` - Firebase will populate with rarity badges

**Module Cards:**
Add data attributes for Firebase to populate:
```html
<div class="module-card biology" data-module="biology">
```

#### Step 5: Add JavaScript for New Features

At the end of the existing Firebase script (before `</script>`), add:

```javascript
// Initialize Lucide icons after DOM loads
document.addEventListener('DOMContentLoaded', () => {
  if (typeof lucide !== 'undefined') {
    lucide.createIcons();
  }
});

// Toggle collapsible sections
window.toggleCollapsible = function(id) {
  const content = document.getElementById(id + '-content');
  const icon = document.getElementById(id + '-icon');

  if (content.classList.contains('open')) {
    content.classList.remove('open');
    icon.classList.remove('open');
  } else {
    content.classList.add('open');
    icon.classList.add('open');
  }
};

// Filter achievements by rarity
window.filterAchievements = function(filter) {
  document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.classList.remove('active');
  });
  event.target.classList.add('active');

  const cards = document.querySelectorAll('.achievement-card');

  cards.forEach(card => {
    const isUnlocked = card.classList.contains('unlocked');
    const isLocked = card.classList.contains('locked');
    const rarityBadge = card.querySelector('.achievement-rarity');
    const rarity = rarityBadge ? rarityBadge.textContent.toLowerCase() : '';

    let shouldShow = false;

    switch(filter) {
      case 'all':
        shouldShow = true;
        break;
      case 'unlocked':
        shouldShow = isUnlocked;
        break;
      case 'locked':
        shouldShow = isLocked;
        break;
      case 'common':
      case 'rare':
      case 'epic':
      case 'legendary':
        shouldShow = rarity === filter;
        break;
    }

    card.style.display = shouldShow ? 'block' : 'none';
  });
};
```

#### Step 6: Update Achievement Rendering

In the `updateAchievements()` function (around line 1330), add rarity badges:

```javascript
const rarityClass = `rarity-${achievement.rarity || 'common'}`;
const rarityLabel = (achievement.rarity || 'common').charAt(0).toUpperCase() +
                    (achievement.rarity || 'common').slice(1);

// Add to achievement card HTML:
<span class="achievement-rarity ${rarityClass}">${rarityLabel}</span>
```

#### Step 7: Test Everything
1. Login with PLC email
2. Check if Lucide icons load
3. Verify Firebase data populates correctly
4. Test achievement filters
5. Check module colors display
6. Verify announcements/calendar sections (even if empty initially)

### Module Name Mapping (for Firebase integration):
```javascript
const moduleIcons = {
  'biology': 'dna',
  'animal-welfare': 'heart',
  'grooming': 'scissors',
  'animal-anatomy': 'bone',
  'small-animals': 'rabbit',
  'vet-assistant': 'stethoscope',
  'animal-behaviour': 'dog',
  'communications': 'message-circle',
  'word-processing': 'file-text',
  'nutrition': 'salad',
  'parasitology': 'bug'
};
```

### CSS Class Names for Module Colors:
- biology → `.module-card.biology`
- animal-welfare → `.module-card.welfare`
- grooming → `.module-card.grooming`
- animal-anatomy → `.module-card.anatomy`
- small-animals → `.module-card.small-animals`
- vet-assistant → `.module-card.vet-skills`
- animal-behaviour → `.module-card.behaviour`
- communications → `.module-card.communications`
- word-processing → `.module-card.word-processing`

### Backup Plan:
If anything breaks, restore from backup:
```bash
cp student-dashboard.backup.html student-dashboard.html
```

## Next Session Checklist:
- [ ] Add Lucide CDN
- [ ] Replace CSS completely
- [ ] Update HTML structure
- [ ] Add new JavaScript functions
- [ ] Update Firebase integration points
- [ ] Test with real login
- [ ] Commit if successful

---

**Note:** All design is ready in `student-dashboard-demo.html`. The work is primarily copy-paste with careful integration of Firebase hooks.
