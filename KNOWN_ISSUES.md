# 🐛 Known Issues & Limitations

**Last Updated:** 19 January 2026
**Current Version:** v5.5

---

## 🚨 Critical Issues

### ✅ FIXED - Teacher Login Role Assignment
**Status:** FIXED (19 Jan 2026)
**Issue:** Teachers whose emails don't contain "teacher" or "staff" keywords were being incorrectly assigned Student role.
**Root Cause:** Role determination logic checked email keywords before checking whitelist.
**Fix:** Reordered logic to check teacher whitelist FIRST, then fallback to email patterns.
**Affected:** Mary Deegan (mdeegan@stconlethcc365.ie) and any other teachers without keywords in email.
**Action Required:** Affected teachers need to logout and login again.

---

## ⚠️ Known Bugs

Currently no critical bugs known. Report issues to developer.

---

## 🔧 Limitations & Workarounds

### 1. Mobile Testing In Progress
**Status:** PARTIALLY COMPLETE
**What Works:**
- ✅ Index page and landing pages
- ✅ Hamburger navigation on all pages
- ✅ Basic responsive layout

**What's Being Tested:**
- ⏳ Teacher dashboard on mobile
- ⏳ Student dashboard on mobile
- ⏳ Quiz taking experience on mobile
- ⏳ Touch interactions

**Workaround:** Use desktop/laptop for best experience until mobile testing complete.

---

### 2. Teacher Whitelist Requirement
**Status:** BY DESIGN
**What:** Only emails in teacher whitelist can access teacher dashboard.
**Why:** Security measure to prevent unauthorized access.
**Workaround:** Contact admin to add your email to whitelist via `/admin-whitelist.html`.

---

### 3. Student Pre-Registration Required
**Status:** BY DESIGN
**What:** Students must be pre-registered by teacher before first login.
**Why:** Ensures only enrolled students can access the system.
**Workaround:** Teacher must import students via "Import Students" before they attempt login.

---

### 4. Email Domain Requirements
**Status:** BY DESIGN
**Student Pattern:** Emails starting with "plc" are automatically recognized as students (e.g., plc12345@stconlethcc365.ie).
**Teacher Pattern:** Teachers must be manually added to whitelist (no automatic detection).
**Workaround:** None needed - working as intended.

---

### 5. Browser Cache Issues
**Status:** COMMON ISSUE
**Symptoms:** Old version of site shows after updates, logout doesn't work properly.
**Cause:** Browser caching static files.
**Workaround:**
- Hard refresh: Ctrl+Shift+R (Windows) or Cmd+Shift+R (Mac)
- Clear browser cache
- Use incognito/private mode for testing

---

### 6. Firebase REST API Delays
**Status:** KNOWN LIMITATION
**What:** Occasional delays (1-3 seconds) when loading data from Firebase.
**Why:** REST API is slower than Firebase SDK, but more reliable for authentication.
**Impact:** Dashboard may take 1-2 seconds to load on first visit.
**Workaround:** None - data is cached after first load for better performance.

---

## 📱 Mobile-Specific Issues

### Screen Size Compatibility
**Tested:** Desktop (1920x1080, 1366x768), Tablet (768px)
**Not Fully Tested:** Mobile phones (375px, 414px)
**Status:** Testing in progress

### Touch Interactions
**Status:** PARTIALLY IMPLEMENTED
**What Works:** Basic taps, scrolling
**Not Tested:** Swipe gestures, multi-touch

---

## 🔐 Authentication Issues

### Auth0 Session Timeout
**Status:** BY DESIGN
**What:** Users are logged out after Auth0 session expires.
**Duration:** Configured in Auth0 (typically 7 days).
**Workaround:** Login again when session expires.

### Multiple Tabs/Windows
**Status:** KNOWN LIMITATION
**What:** Logging out in one tab doesn't immediately log out other tabs.
**Workaround:** Refresh other tabs after logout.

---

## 📊 Performance Issues

### Large Class Sizes
**Status:** NOT TESTED
**Limitation:** Teacher dashboard performance not tested with >50 students.
**Recommendation:** Test with current class sizes first.

### Quiz History
**Status:** NOT TESTED
**Limitation:** Student progress page not tested with >100 quiz attempts.
**Expected:** May slow down with very large history.

---

## 🚫 Features Not Yet Implemented

### Analytics
**Status:** PLANNED
**What's Missing:** Google Analytics not yet configured.
**Impact:** Can't track user behavior, page views, etc.
**Timeline:** To be added soon.

### Error Logging
**Status:** BASIC ONLY
**What Works:** Console.log errors for debugging.
**What's Missing:** Server-side error logging, error reporting dashboard.
**Impact:** Some errors may go unnoticed.

### Offline Support
**Status:** NOT IMPLEMENTED
**What:** App requires internet connection.
**Impact:** Can't use when offline.
**Timeline:** Future version (v6.0+).

---

## 🎯 Browser Compatibility

### Fully Tested
- ✅ Chrome 120+ (Desktop)
- ✅ Edge 120+ (Desktop)
- ✅ Safari 17+ (macOS)

### Not Fully Tested
- ⏳ Firefox (should work, not extensively tested)
- ⏳ Mobile browsers (iOS Safari, Chrome Mobile)
- ❌ Internet Explorer (NOT SUPPORTED)

**Recommendation:** Use Chrome or Edge for best experience.

---

## 📝 Reporting New Issues

### How to Report
1. **Check this document first** to see if issue is already known
2. **Gather information:**
   - What were you trying to do?
   - What happened instead?
   - Browser and device info
   - Screenshots if possible
3. **Contact:** developer or teacher coordinator

### Critical vs Non-Critical
**Critical (Report Immediately):**
- Can't login
- Data loss
- Security issues
- System crashes

**Non-Critical (Can Wait):**
- Visual glitches
- Slow performance
- Feature requests
- Minor typos

---

## 🔄 Version History

### v5.5 (Current) - 24 Oct 2025
- Pilot launch materials added
- Emergency fixes applied
- Known issues: Teacher login role assignment (FIXED 19 Jan 2026)

### v5.4 - Oct 2025
- Class management features
- Filter/sort improvements

### v5.0-5.3 - Oct 2025
- Major feature additions
- Achievements, progress tracking, adaptive quizzes

---

## ✅ Recently Fixed Issues

### Teacher Login Fix (19 Jan 2026)
**Issue:** Teachers without "teacher"/"staff" in email assigned Student role
**Fix:** Check whitelist first, then email patterns
**Status:** ✅ RESOLVED

### Mobile Navigation (Oct 2025)
**Issue:** Hard to navigate back to home on mobile
**Fix:** Added hamburger menu to all pages
**Status:** ✅ RESOLVED

### Script Errors on Index (Oct 2025)
**Issue:** Console errors on homepage (quiz.js 404)
**Fix:** Fixed script loading order
**Status:** ✅ RESOLVED

---

**Need help?** Contact the developer or check the FAQ page (coming soon).

---

*This document is updated as new issues are discovered and fixed.*
