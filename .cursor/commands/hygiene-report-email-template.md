# JIRA Hygiene Report - Universal Email Template

## Universal Template (Adapt for Any Audience)

**To:** `[RECIPIENT]` ← Team / All Teams / Leadership  
**Subject:** `📊 [Weekly/URGENT] JIRA Hygiene Report - [SCOPE] - [DATE]`  
**Priority:** `Normal / High (if critical issues)`

---

Hi `[RECIPIENT NAME]`,

`[OPENING LINE - Choose one:]`
- Your weekly JIRA hygiene report is ready!
- This week's JIRA hygiene check is complete!
- Here's this week's JIRA hygiene summary:
- ⚠️ Your report flagged critical issues needing immediate attention:

---

### 📊 Quick Stats

`[FOR INDIVIDUAL TEAMS:]`
- **Team Score:** [XX]% ([GRADE]) `[trend: ↑↓→]`
- **Total Issues:** [XX] issues analyzed
- **Violations:** [XX] issues need attention

`[FOR ALL TEAMS/LEADERSHIP:]`
- **Overall Score:** [XX]% ([GRADE]) across [X] teams
- **Total Issues:** [XXX] issues analyzed  
- **Violations:** [XX] issues need attention ([XX]%)

`[OPTIONAL - Team Rankings:]`
| Rank | Team | Score | Grade |
|------|------|-------|-------|
| 🥇 1 | [team-name] | XX% | A |
| 🥈 2 | [team-name] | XX% | A |
| 🥉 3 | [team-name] | XX% | B |

---

### 🎯 Top Action Items

`[List 3-5 most critical issues:]`

1. **[Violation Type]:** [XX] issues `[urgency: 🚨⚠️📌]`
   - Impact: [Brief description]
   - Fix: [Specific action]
   - Time: [Estimated time]

2. **[Violation Type]:** [XX] issues
   - Impact: [Brief description]
   - Fix: [Specific action]
   - Time: [Estimated time]

3. **[Violation Type]:** [XX] issues
   - Impact: [Brief description]
   - Fix: [Specific action]
   - Time: [Estimated time]

`[FOR URGENT ISSUES - Add timeline:]`
### ⏰ Timeline
- **Today:** [Immediate actions]
- **This Week:** [Short-term fixes]
- **Next Week:** [Follow-up items]

---

### `[OPTIONAL SECTIONS - Include as needed:]`

`[A. Highlights/Wins:]`
### 🎉 Highlights
- 🏆 **Star Team:** [team-name] ([score]% - Excellent!)
- 📈 **Most Improved:** [team-name] (+[X]% this week!)
- 🚨 **Needs Support:** [team-name] ([score]% - requires attention)

`[B. Business Impact (for leadership):]`
### 💰 Business Impact
- **Release Tracking:** [X] issues can't be tracked to releases
- **Sprint Planning:** [X] issues lack proper prioritization
- **Knowledge Transfer:** [X] issues missing documentation

`[C. Quick Win:]`
### ⚡ Quick Win (< 30 min)
[Specific actionable task with immediate impact]

---

### 📎 Full Reports

`[Single team:]`
View your detailed report: `[team]-hygiene-report-[DATE].md`

`[All teams:]`
- **Combined:** `COMBINED-hygiene-report-[DATE].md`
- **Individual:** `[team]-hygiene-report-[DATE].md`

**Reports include:**
✅ Detailed violation breakdown
✅ Direct JIRA issue links
✅ Ready-to-use JQL queries
✅ Recommended action plan

---

### `[CLOSING - Choose based on tone:]`

`[Supportive:]`
🤝 **Need Help?**  
Happy to schedule 15 min to knock out bulk fixes together!

`[Motivational:]`
💡 **This Week's Challenge:**  
Can we get [team/all teams] above 80%? 🚀

`[Urgent:]`
🆘 **Action Required:**  
Please complete the timeline items above. Let's sync if you need support.

`[Professional:]`
Let me know if you have questions or need assistance with the fixes.

---

Thanks `[for keeping our JIRA clean / for your attention to this / team]`! `[emoji: 🙌✅👍]`

Best,  
[Your Name]

---
*Generated: [DATE] | Next report: [NEXT DATE]*

---

## How to Use This Template

### Step 1: Choose Your Audience
- **Individual Team:** Use team-specific stats, skip rankings
- **All Teams:** Include rankings table and highlights
- **Leadership:** Add business impact section
- **Urgent Alert:** Add timeline section, use urgent opening

### Step 2: Fill in the Blanks
Replace `[PLACEHOLDER]` with actual values from your reports:

**Required Fields:**
- `[RECIPIENT NAME]` - Team name or "Dashboard Teams" or "Leadership Team"
- `[DATE]` - e.g., "November 17, 2025"
- `[XX]` - Actual numbers from the report
- `[GRADE]` - e.g., "A", "B", "C", "F"

**Optional Sections:**
- Include `[OPTIONAL SECTIONS]` as needed for your audience
- Choose one `[OPENING LINE]` and one `[CLOSING]`
- Add/remove sections marked with backticks

### Step 3: Quick Copy-Paste Values (from latest report):
```
Date: November 17, 2025
Next Date: November 24, 2025

Team Scores:
- dashboard-zaffre-scrum: 98% (A)
- dashboard-tangerine-scrum: 90% (A)
- dashboard-razzmatazz-scrum: 88% (B)
- dashboard-monarch-scrum: 79% (C)
- ide_scrum:teal: 77% (C)
- dashboard-crimson-scrum: 75% (C)
- dashboard-green-scrum: 74% (C)
- ide_scrum:indigo: 35% (F)

Overall: 82% (B-)
Total Issues: 348
```

---

## Practical Examples

### Example 1: Individual Team Email (dashboard-green-scrum)

**To:** Dashboard Green Scrum Team  
**Subject:** 📊 Weekly JIRA Hygiene Report - Dashboard Green Scrum - Nov 17, 2025

Hi Dashboard Green Team,

Your weekly JIRA hygiene report is ready!

### 📊 Quick Stats
- **Team Score:** 74% (C) ↑ +4%
- **Total Issues:** 60 issues analyzed
- **Violations:** 27 issues need attention

### 🎯 Top Action Items

1. **Completed Issues Missing Fix Version:** 20 issues 🚨
   - Impact: Can't track which release these shipped in
   - Fix: Bulk assign fix versions using JQL query
   - Time: 30 minutes

2. **Missing Priority:** 5 issues
   - Impact: Cannot properly prioritize sprint work
   - Fix: Review and set priority for each
   - Time: 10 minutes

3. **Incomplete Descriptions:** 4 issues
   - Impact: Team lacks context for implementation
   - Fix: Request updates from reporters
   - Time: 15 minutes

### ⚡ Quick Win (< 30 min)
Bulk assign fix versions to 20 completed issues - JQL query in full report!

### 📎 Full Report
View: `dashboard-green-scrum-hygiene-report-2025-11-17.md`

🤝 **Need Help?**  
Happy to schedule 15 min to knock out bulk fixes together!

Thanks for keeping our JIRA clean! 🙌

---
*Generated: Nov 17, 2025 | Next report: Nov 24, 2025*

---

### Example 2: All Teams Email

**To:** Dashboard Teams  
**Subject:** 📊 Weekly JIRA Hygiene Report - All Teams - Nov 17, 2025

Hi Dashboard Teams,

This week's JIRA hygiene check is complete!

### 📊 Quick Stats
- **Overall Score:** 82% (B-) across 8 teams
- **Total Issues:** 348 issues analyzed
- **Violations:** 136 issues need attention (39%)

### 🏆 Team Rankings

| Rank | Team | Score | Grade |
|------|------|-------|-------|
| 🥇 1 | dashboard-zaffre-scrum | 98% | A |
| 🥈 2 | dashboard-tangerine-scrum | 90% | A |
| 🥉 3 | dashboard-razzmatazz-scrum | 88% | B |

### 🎉 Highlights
- 🏆 **Star Team:** dashboard-zaffre-scrum (98% - Excellent!)
- 📈 **Most Improved:** dashboard-crimson-scrum (+5% this week!)
- 🚨 **Needs Support:** ide_scrum:indigo (35% - requires attention)

### 🎯 Top Action Items

1. **Completed Issues Missing Fix Version:** 74 issues 🚨
   - Impact: Can't track releases
   - Fix: Bulk assign fix versions
   - Time: 1 hour

2. **Missing Priority:** 51 issues
   - Impact: Cannot prioritize work properly
   - Fix: Bulk set priorities
   - Time: 30 minutes

3. **Incomplete Descriptions:** 43 issues
   - Impact: Lacks implementation context
   - Fix: Request updates from reporters
   - Time: 1-2 hours

### 📎 Full Reports
- **Combined:** `COMBINED-hygiene-report-2025-11-17.md`
- **Individual:** `[team]-hygiene-report-2025-11-17.md`

💡 **This Week's Challenge:**  
Can we get all teams above 80%? 🚀

Let me know if you need help with bulk updates!

---
*Generated: Nov 17, 2025 | Next report: Nov 24, 2025*

---

### Example 3: Slack Quick Message

```
📊 Weekly JIRA Hygiene - Nov 17

🏆 Top 3 Teams:
1. dashboard-zaffre-scrum (98%) 🥇
2. dashboard-tangerine-scrum (90%) 🥈
3. dashboard-razzmatazz-scrum (88%) 🥉

📈 Overall: 82% (B-) - Great work! ↑

🎯 Quick Fixes Available:
• 74 issues need Fix Version (30 min bulk fix)
• 51 issues need Priority (15 min bulk fix)

📎 Reports: /odh-dashboard/*-hygiene-report-2025-11-17.md

💡 Goal: Get all teams above 80% next week! 🚀
```

---

## Quick Tips

### ✅ Best Practices
- **Be specific:** Include exact numbers and timelines
- **Be positive:** Celebrate improvements and wins
- **Be actionable:** Provide clear next steps with time estimates
- **Offer help:** Make it easy for teams to get support

### 🎯 When to Send
- **Weekly Reports:** Monday mornings (start of sprint)
- **Urgent Alerts:** Within 24 hours of finding critical issues
- **Follow-ups:** Mid-week check-ins for teams with critical issues

### 📊 What to Track
- Week-over-week score changes
- Time to fix violations
- Team improvement trends
- Most common violation types

---

*Use this single template for all your JIRA hygiene communications!*

