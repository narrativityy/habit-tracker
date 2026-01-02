# Habit Tracker - Brainstorming

## Core Concept

**What problem are we solving?**
Tracking daily habits and visualizing progress over time to build consistency.

---

## Features

### Must Have (MVP)
- [ ] Add/remove habits
- [ ] Mark habits as complete for a given day
- [ ] View habit completion history
- [ ] Basic visualization of streaks/progress

### Nice to Have
- [ ] Categories/tags for habits
- [ ] Reminder notifications
- [ ] Weekly/monthly statistics
- [ ] Export data
- [ ] Dark mode

### Future Ideas
- [ ]
- [ ]

---

## Habits - What Do We Track?

**Per habit:**
| Field | Example | Required? |
|-------|---------|-----------|
| Name | "Exercise" | Yes |
| Description | "30 min workout" | No |
| Frequency | Daily / Weekdays / Custom | ? |
| Color/Icon | For visual distinction | ? |
| Created date | Auto-generated | Yes |

**Per completion:**
| Field | Example |
|-------|---------|
| Habit ID | Reference to habit |
| Date | 2026-01-01 |
| Completed | true/false |
| Notes | "Ran 5k today" (optional) |

---

## Data Storage

**Options to consider:**

| Option | Pros | Cons |
|--------|------|------|
| LocalStorage | Simple, no backend needed | Limited to one browser, 5MB limit |
| IndexedDB | More storage, structured | More complex API |
| JSON file | Exportable, simple | Need backend to persist |
| Backend + DB | Sync across devices | More complexity |

**Decision:** MongoDB + Express backend for cross-device sync

---

## Visualization Ideas

### Streak Calendar (GitHub-style)
```
Jan 2026
Mo Tu We Th Fr Sa Su
      1  2  3  4  5
 6  7  8  9 10 11 12
13 14 15 16 17 18 19
...

[■] = completed  [□] = missed  [·] = future
```

### Progress Charts
- Weekly completion rate (bar chart)
- Monthly trends (line chart)
- Current streak counter
- Best streak record

### Other Visual Elements
- Color-coded habit cards
- Completion percentage rings
- Daily checklist view

---

## UI Structure

### Pages/Views

1. **Dashboard**
   - Today's habits checklist
   - Current streaks summary
   - Quick stats

2. **Calendar View**
   - Month view with completion indicators
   - Click day to see/edit that day's completions

3. **Habits Management**
   - List of all habits
   - Add/edit/delete habits

4. **Statistics** (optional)
   - Charts and detailed analytics

### Layout Sketch
```
┌─────────────────────────────────────┐
│  Habit Tracker          [+ Add]    │
├─────────────────────────────────────┤
│                                     │
│  Today - January 1, 2026            │
│                                     │
│  [ ] Exercise         🔥 5 days     │
│  [✓] Read 30 mins     🔥 12 days    │
│  [ ] Meditate         🔥 0 days     │
│                                     │
├─────────────────────────────────────┤
│  [Dashboard] [Calendar] [Settings]  │
└─────────────────────────────────────┘
```

---

## Tech Stack

| Layer | Choice | Notes |
|-------|--------|-------|
| Framework | React + Vite | Already set up |
| Styling | Tailwind | Utility-first CSS |
| State | useState + Context | Built-in React, no extra deps |
| Charts | ? | Recharts / Chart.js / Visx |
| Date handling | ? | date-fns / dayjs / native |
| Backend | Express.js | REST API |
| Database | MongoDB | Cross-device sync |
| Auth | ? | JWT / Session-based |

### Architecture Overview

```
┌─────────────────┐      ┌─────────────────┐      ┌─────────────────┐
│                 │      │                 │      │                 │
│  React Frontend │ ──── │  Express API    │ ──── │    MongoDB      │
│  (Vite + Docker)│ HTTP │  (Node.js)      │      │                 │
│                 │      │                 │      │                 │
└─────────────────┘      └─────────────────┘      └─────────────────┘
     Port 5173                Port 3001              Port 27017
```

### API Endpoints (Planned)

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | /api/habits | Get all habits |
| POST | /api/habits | Create a habit |
| PUT | /api/habits/:id | Update a habit |
| DELETE | /api/habits/:id | Delete a habit |
| POST | /api/habits/:id/complete | Mark habit complete for a date |
| DELETE | /api/habits/:id/complete | Unmark completion |

---

## Questions to Decide

1. **Frequency options:** Daily only, or support weekly/custom schedules?
2. ~~**Data persistence:** Local-only or plan for sync later?~~ → MongoDB for sync
3. ~~**Styling approach:** Utility-first (Tailwind) or component CSS?~~ → Tailwind
4. **Chart library:** Which one fits our visualization needs?
5. **Mobile:** Responsive web or consider PWA features?
6. **Authentication:** Do we need user accounts? (Required for multi-device sync)

---

## Next Steps

1. [ ] Finalize MVP feature list
2. [ ] Choose tech stack decisions above
3. [ ] Design data structures
4. [ ] Build component hierarchy
5. [ ] Start implementation

---

## Notes

*Add any other thoughts, inspiration, or references here*

-
-
