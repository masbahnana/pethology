# Student Dashboard - Production Update Plan

## Status: Ready to apply Notion design + Firebase integration

### Files:
- Source: student-dashboard-demo.html (design)
- Target: student-dashboard.html (production with Firebase)
- Backup: student-dashboard.backup.html (created)

### What needs to be done:
1. Copy all CSS from demo to production (Notion colors, module colors, etc)
2. Copy HTML structure (sidebar, announcements, calendar, modules, smart tools)
3. Keep ALL Firebase JavaScript logic from production
4. Update data attributes to match Firebase expectations
5. Test with real login

### Key Firebase functions to preserve:
- loadRealStudentData()
- updateStudentProfile()
- updateProgressCircles() 
- updateOverallStats()
- updateAchievements()
- Logout functionality
- Module navigation

Next session: Complete the integration manually or with careful edits.
