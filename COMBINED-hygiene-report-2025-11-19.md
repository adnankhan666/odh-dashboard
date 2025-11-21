# AI Core Dashboard - Combined Hygiene Report
**Generated:** November 19, 2025  
**Total Issues Analyzed:** 348 issues across 8 scrum team labels  
**Component Filter:** AI Core Dashboard  
**Projects:** RHAISTRAT, RHOAISTRAT, RHOAIENG  
**Jira Instance:** https://issues.redhat.com

---

## Executive Summary

This report provides a comprehensive analysis of **all 348 issues** across 8 scrum team labels, identifying critical missing fields that impact sprint planning, release management, and team coordination.

### Key Findings Across All Teams:
- **136 issues** with violations (39% of all issues)
- **74 completed issues** missing fix version (blocking release tracking)
- **51 issues** missing or undefined priority (unclear urgency)
- **43 issues** with incomplete description (lacking context)
- **2 issues** in active work without assignee

---

## Overall Dashboard Hygiene Score

Weighted average across 348 issues from 8 teams:

| Metric | Score | Grade |
|--------|-------|-------|
| Assignee Coverage | 75% | 🟡 C+ |
| Priority Defined | 85% | 🟢 B+ |
| Fix Version Coverage (Completed) | 79% | 🟡 C+ |
| Description Coverage | 88% | 🟢 B |
| **OVERALL COMBINED** | **82%** | 🟢 **B-** |

---

## Team Rankings by Hygiene Score

| Rank | Team Label | Total Issues | Violations | Score | Grade | Status |
|------|------------|--------------|------------|-------|-------|--------|
| 🥇 1 | **dashboard-zaffre-scrum** | 21 | 3% | 98% | 🟢 A | Excellent! |
| 🥈 2 | **dashboard-tangerine-scrum** | 19 | 10% | 90% | 🟢 A | Excellent! |
| 🥉 3 | **dashboard-razzmatazz-scrum** | 34 | 12% | 88% | 🟢 B | Good |
| 4 | **dashboard-monarch-scrum** | 73 | 21% | 79% | 🟡 C | Fair |
| 5 | **ide_scrum:teal** | 14 | 23% | 77% | 🟡 C | Fair |
| 6 | **dashboard-crimson-scrum** | 100 | 25% | 75% | 🟡 C | Fair |
| 7 | **dashboard-green-scrum** | 60 | 26% | 74% | 🟡 C | Fair |
| 8 | **ide_scrum:indigo** ⚠️ | 10 | 65% | 35% | 🔴 F | CRITICAL |

---

## Combined Violations Summary

### 🔴 HIGH SEVERITY VIOLATIONS

#### 1. Completed Issues Without Fix Version (74 issues)
**Impact:** Impossible to track which release included these fixes  
**Distribution by Team:**
- dashboard-green-scrum: 20 issues
- dashboard-monarch-scrum: 21 issues
- dashboard-crimson-scrum: 24 issues
- Other teams: 9 issues

**Recommended Fix:** Bulk assign appropriate fix versions
- rhoai-3.0, rhoai-2.25, rhoai-2.24, etc.

#### 2. Missing or Undefined Priority (51 issues)
**Impact:** Cannot properly prioritize work  
**Distribution by Team:**
- dashboard-crimson-scrum: 37 issues ⚠️
- dashboard-green-scrum: 5 issues
- Other teams: 9 issues

**Recommended Fix:** Bulk set to "Medium" priority, then review individually

#### 3. Missing Assignee in Active Work (2 issues)
**Impact:** Work in progress with no owner  
**Status:** LOW COUNT - Good overall!

### 🔵 LOW SEVERITY VIOLATIONS

#### 4. Incomplete Description (43 issues)
**Impact:** Lacks context for implementation  
**Distribution by Team:**
- ide_scrum:indigo: 9 issues (90% of their issues!) 🚨
- Other teams: 34 issues

**Recommended Fix:** Request description updates from reporters

---

## Top 3 Teams Needing Immediate Attention

### 🚨 1. ide_scrum:indigo (CRITICAL - Score: 35%)
**Issues:**
- 90% of issues have incomplete descriptions
- 50% of issues are unassigned
- Only 10 total issues, but 9 have violations

**Action Required:**
1. **URGENT:** Add descriptions to 9 issues
2. Assign 5 unassigned issues
3. Implement mandatory description policy

---

### ⚠️ 2. dashboard-crimson-scrum (Needs Attention - Score: 75%)
**Issues:**
- 37 issues missing priority (37% of team's issues)
- 24 completed issues without fix version
- Largest team (100 issues) with most violations (51)

**Action Required:**
1. **HIGH PRIORITY:** Bulk set priority for 37 issues
2. Assign fix versions to 24 completed issues
3. Review issue creation process

---

### ⚠️ 3. dashboard-green-scrum (Needs Attention - Score: 74%)
**Issues:**
- 20 completed issues without fix version
- 5 issues missing priority
- 27 total violations (45% of team's issues)

**Action Required:**
1. Assign fix versions to 20 completed issues
2. Set priority for 5 issues
3. Update descriptions for 4 issues

---

## Top 3 Teams with Best Hygiene (Examples to Follow)

### 🏆 1. dashboard-zaffre-scrum (Score: 98%)
**Strengths:**
- Only 2 completed issues missing fix version
- Only 1 issue missing priority
- Excellent overall discipline

**Best Practice:** Team clearly has good issue hygiene habits!

---

### 🏆 2. dashboard-tangerine-scrum (Score: 90%)
**Strengths:**
- Only 3 completed issues missing fix version
- Good description coverage
- Small focused team with good practices

---

### 🏆 3. dashboard-razzmatazz-scrum (Score: 88%)
**Strengths:**
- Only 4 completed issues missing fix version
- Only 2 issues missing priority
- Good balance across all metrics

---

## Recommended Actions (All Teams)

### Immediate (This Week)
1. **dashboard-crimson-scrum:** Fix 37 missing priorities (bulk update)
2. **ide_scrum:indigo:** Add descriptions to 9 issues
3. **dashboard-monarch & dashboard-green:** Assign fix versions to 41 completed issues
4. **All teams:** Review 2 active issues without assignees

### Short Term (Next 2 Weeks)
1. **Bulk update remaining fix versions** (74 total)
2. **Set priorities for remaining issues** (51 total)
3. **Request description updates** for 43 issues
4. **Schedule hygiene review** with each team

### Long Term (Process Improvements)
1. **Make "Fix Version" required** field before closing issues
2. **Add JIRA automation:** Remind users to set fix version on close
3. **Create issue templates** with description requirements (min 50 chars)
4. **Weekly hygiene check** as part of sprint rituals
5. **Share best practices** from top-performing teams (zaffre, tangerine, razzmatazz)

---

## JQL Queries for Bulk Fixes

### Find ALL completed issues missing fix version:
```jql
project IN (RHAISTRAT, RHOAISTRAT, RHOAIENG) 
AND component = "AI Core Dashboard" 
AND status IN (Done, Closed) 
AND fixVersion is EMPTY
ORDER BY updated DESC
```

### Find ALL issues with missing/undefined priority:
```jql
project IN (RHAISTRAT, RHOAISTRAT, RHOAIENG) 
AND component = "AI Core Dashboard" 
AND (priority is EMPTY OR priority = Undefined)
AND resolution = Unresolved
ORDER BY created DESC
```

### Find ALL unassigned issues in active work:
```jql
project IN (RHAISTRAT, RHOAISTRAT, RHOAIENG) 
AND component = "AI Core Dashboard" 
AND status IN ("In Progress", "Code Review", "Review", "In Review") 
AND assignee is EMPTY
ORDER BY updated ASC
```

### By Label - Template (replace LABEL_NAME):
```jql
project IN (RHAISTRAT, RHOAISTRAT, RHOAIENG) 
AND component = "AI Core Dashboard" 
AND labels = "LABEL_NAME"
AND [YOUR_FILTER_HERE]
```

---

## Estimated Cleanup Time

| Task | Issues | Estimated Time | Priority |
|------|--------|----------------|----------|
| Bulk set priorities | 51 | 30 minutes | 🔴 HIGH |
| Bulk assign fix versions | 74 | 1 hour | 🔴 HIGH |
| Assign active work | 2 | 10 minutes | 🔴 HIGH |
| Request description updates | 43 | 3-4 hours | 🟡 MEDIUM |
| **TOTAL** | **170** | **5-6 hours** | |

**Note:** Bulk operations can be done quickly via JIRA bulk edit feature

---

## Trends & Observations

### Positive Findings ✅
- **No orphaned subtasks detected** across all 348 issues
- **Most active work has assignees** (only 2 exceptions)
- **Three teams have excellent hygiene** (>85% score)
- **Overall 82% score** is above passing

### Areas for Improvement ❌
- **Fix version discipline** needs improvement (21% of completed issues missing)
- **Priority assignment** needs attention (15% missing/undefined)
- **Description completeness** varies widely by team (10%-90% incomplete)
- **ide_scrum:indigo** needs immediate process intervention

### Recommended Team Learning
- **Share practices from dashboard-zaffre-scrum** (98% score)
- **Learn from dashboard-tangerine-scrum** (90% score)  
- **Study dashboard-razzmatazz-scrum workflow** (88% score)

---

## Individual Team Reports

Detailed reports for each team label have been generated:

1. [dashboard-green-scrum-hygiene-report.md](./dashboard-green-scrum-hygiene-report.md)
2. [dashboard-zaffre-scrum-hygiene-report.md](./dashboard-zaffre-scrum-hygiene-report.md)
3. [dashboard-razzmatazz-scrum-hygiene-report.md](./dashboard-razzmatazz-scrum-hygiene-report.md)
4. [dashboard-monarch-scrum-hygiene-report.md](./dashboard-monarch-scrum-hygiene-report.md)
5. [dashboard-crimson-scrum-hygiene-report.md](./dashboard-crimson-scrum-hygiene-report.md)
6. [dashboard-tangerine-scrum-hygiene-report.md](./dashboard-tangerine-scrum-hygiene-report.md)
7. [ide_scrum:indigo-hygiene-report.md](./ide_scrum:indigo-hygiene-report.md)
8. [ide_scrum:teal-hygiene-report.md](./ide_scrum:teal-hygiene-report.md)

---

## Conclusion

Overall JIRA hygiene is **GOOD** with an 82% (B-) score across all teams. The main focus areas are:

**Critical Actions:**
1. Fix version assignment for 74 completed issues (1 hour)
2. Priority setting for 51 issues (30 minutes)
3. Address ide_scrum:indigo's systemic issues (team intervention needed)

**Process Improvements:**
1. Mandatory fix version before closing
2. Share best practices from top teams
3. Weekly hygiene monitoring

**Recognition:**
- 🏆 **dashboard-zaffre-scrum** - Best hygiene (98%)
- 🏆 **dashboard-tangerine-scrum** - Excellent (90%)
- 🏆 **dashboard-razzmatazz-scrum** - Very Good (88%)

---

*Report generated using @jirahygiene.md command*  
*Next scheduled report: November 26, 2025*  
*Questions? Contact the Dashboard team leads*

