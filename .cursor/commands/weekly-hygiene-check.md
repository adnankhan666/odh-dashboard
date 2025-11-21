# Weekly JIRA Hygiene Check

Run this command every **Monday at 9 AM** (or your preferred time):

## Command to Run:

```
@jirahygiene.md run hygiene check for all projects
```

## What This Does:

1. ✅ Scans all issues with "AI Core Dashboard" component
2. ✅ Analyzes 8 scrum team labels:
   - dashboard-green-scrum
   - dashboard-zaffre-scrum
   - dashboard-razzmatazz-scrum
   - dashboard-monarch-scrum
   - dashboard-crimson-scrum
   - dashboard-tangerine-scrum
   - ide_scrum:indigo
   - ide_scrum:teal

3. ✅ Generates 9 reports with today's date:
   - 8 individual team reports
   - 1 combined cross-team report

4. ✅ Saves all reports to: `/Users/adnankhan/Desktop/odh-dashboard/`

## Output Files:

- `dashboard-{team}-hygiene-report-YYYY-MM-DD.md` (8 files)
- `COMBINED-hygiene-report-YYYY-MM-DD.md` (1 file)

## After Generation:

1. Review the COMBINED report first for overview
2. Share individual reports with each team
3. Track improvements week-over-week

---

**Last Run:** November 17, 2025  
**Next Run:** November 24, 2025

